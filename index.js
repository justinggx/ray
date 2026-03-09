import { eventSource, event_types, setExtensionPrompt, extension_prompt_types } from '../../../../script.js';
import { getContext } from '../../../extensions.js';

// ================================================================
//  DEFAULT THREADS FACTORY
// ================================================================
function DEFAULT_THREADS() {
  return {
    raymond: {
      id: 'raymond',
      name: 'Raymond Augustine',
      initials: 'RA',
      avatarBg: 'linear-gradient(145deg,#1c1c2e,#2c2c4e)',
      messages: [],
      unread: 0,
    },
    gaspard: {
      id: 'gaspard',
      name: 'Gaspard de Valois',
      initials: 'GV',
      avatarBg: 'linear-gradient(145deg,#1a2e1a,#2a4a2a)',
      messages: [],
      unread: 0,
    },
  };
}

// ================================================================
//  STATE
// ================================================================
const STATE = {
  currentView: 'lock',
  currentThread: null,
  threads: DEFAULT_THREADS(),
  notifications: [],
  sync: { stage: 1, progress: 0, status: '乖巧' },
  chatId: null,
  pendingMessages: [], // FIX3: 多条消息队列
};

// FIX2: 按 chatId 存储各窗口的手机状态（内存缓存）
const CHAT_STORE = {};

// ================================================================
//  PERSISTENCE (localStorage)
// ================================================================
function saveState() {
  if (!STATE.chatId) return;
  try {
    localStorage.setItem(`rp-phone-v1-${STATE.chatId}`, JSON.stringify({
      threads: STATE.threads,
      notifications: STATE.notifications,
      sync: STATE.sync,
    }));
  } catch(e) { console.warn('[Raymond Phone] saveState failed', e); }
}

function loadState(chatId) {
  try {
    const raw = localStorage.getItem(`rp-phone-v1-${chatId}`);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

// ================================================================
//  HTML
// ================================================================
const HTML = `
<div id="rp-wrapper">
  <div id="rp-fab" title="打开手机">📱</div>

  <div id="rp-phone" style="display:none">
    <div id="rp-frame">
      <div class="rp-btn rp-vol-up"></div>
      <div class="rp-btn rp-vol-dn"></div>
      <div class="rp-btn rp-power"></div>

      <div id="rp-screen">
        <div id="rp-island"></div>

        <div id="rp-sbar">
          <span id="rp-sbar-time"></span>
          <div class="rp-sbar-r">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" opacity=".8">
              <rect x="0" y="4" width="3" height="6" rx="1"/>
              <rect x="4" y="2" width="3" height="8" rx="1"/>
              <rect x="8" y="0" width="3" height="10" rx="1"/>
              <rect x="12" y="0" width="3" height="10" rx="1" opacity=".3"/>
            </svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" opacity=".8">
              <path d="M7 2C9.5 2 11.7 3.1 13.2 4.8L14 4C12.3 2 9.8 1 7 1S1.7 2 0 4l.8.8C2.3 3.1 4.5 2 7 2z"/>
              <path d="M7 4c1.7 0 3.2.7 4.3 1.8L12 5c-1.3-1.3-3-2-5-2S3.3 3.7 2 5l.7.8C3.8 4.7 5.3 4 7 4z"/>
              <circle cx="7" cy="9" r="1.2"/>
            </svg>
            <div id="rp-bat">
              <div id="rp-bat-fill"></div>
            </div>
          </div>
        </div>

        <!-- 锁屏 -->
        <div id="rp-view-lock" class="rp-view">
          <div class="rp-lock-bg"></div>
          <div class="rp-lock-body">
            <div id="rp-lock-time"></div>
            <div id="rp-lock-date"></div>
            <div id="rp-lock-notifs"></div>
          </div>
          <div id="rp-swipe-hint">向上轻扫以解锁</div>
          <div id="rp-swipe-zone"></div>
        </div>

        <!-- 主屏 -->
        <div id="rp-view-home" class="rp-view" style="display:none">
          <div class="rp-home-bg"></div>
          <div class="rp-home-body">
            <div id="rp-home-clock"></div>
            <div id="rp-app-grid">
              <div class="rp-app" data-app="messages">
                <div class="rp-app-ico rp-ico-msg">
                  <div class="rp-badge" id="rp-main-badge" style="display:none">0</div>
                  <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="url(#mg)"/><defs><linearGradient id="mg" x1="0" y1="0" x2="40" y2="40"><stop offset="0%" stop-color="#34c759"/><stop offset="100%" stop-color="#25a244"/></linearGradient></defs><path d="M8 14a4 4 0 014-4h16a4 4 0 014 4v10a4 4 0 01-4 4H14l-4 4v-4a4 4 0 01-2-3.5V14z" fill="white"/></svg>
                </div>
                <div class="rp-app-lbl">信息</div>
              </div>
              <div class="rp-app rp-app-off">
                <div class="rp-app-ico rp-ico-phone">
                  <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="url(#ph)"/><defs><linearGradient id="ph" x1="0" y1="0" x2="40" y2="40"><stop offset="0%" stop-color="#34c759"/><stop offset="100%" stop-color="#25a244"/></linearGradient></defs><path d="M14 10h-2a2 2 0 00-2 2v.5C10 22 18 30 27.5 30H28a2 2 0 002-2v-2a2 2 0 00-2-2h-3a2 2 0 00-2 2c-3-1-5.5-3.5-6.5-6.5a2 2 0 002-2V14a2 2 0 00-2-2h-.5" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
                </div>
                <div class="rp-app-lbl">电话</div>
              </div>
              <div class="rp-app rp-app-off">
                <div class="rp-app-ico" style="background:linear-gradient(145deg,#999,#777)">📷</div>
                <div class="rp-app-lbl">相机</div>
              </div>
              <div class="rp-app rp-app-off">
                <div class="rp-app-ico" style="background:linear-gradient(145deg,#888,#666)">⚙️</div>
                <div class="rp-app-lbl">设置</div>
              </div>
            </div>

            <div id="rp-widget">
              <div class="rp-wd-label">Augustine · 关系进度</div>
              <div class="rp-wd-stage" id="rp-wd-stage">Stage 1 · 初识</div>
              <div class="rp-wd-track"><div class="rp-wd-fill" id="rp-wd-fill"></div></div>
              <div class="rp-wd-status">当前状态：<span id="rp-wd-status">乖巧</span></div>
            </div>
          </div>
          <div class="rp-home-indicator"></div>
        </div>

        <!-- 信息列表 -->
        <div id="rp-view-messages" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">信息</span>
            <button class="rp-nav-add" id="rp-add-btn">+</button>
          </div>
          <div id="rp-thread-list"></div>
        </div>

        <!-- 对话线程 -->
        <div id="rp-view-thread" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="messages">‹</button>
            <div class="rp-thread-hd">
              <div class="rp-hd-av" id="rp-hd-av"></div>
              <span class="rp-hd-name" id="rp-hd-name"></span>
            </div>
            <span></span>
          </div>
          <div id="rp-bubbles"></div>
          <!-- FIX3: 待发消息队列预览区 -->
          <div id="rp-pending-queue" style="display:none"></div>
          <div id="rp-composer">
            <input id="rp-input" type="text" placeholder="iMessage（回车暂存）" autocomplete="off"/>
            <button id="rp-send" type="button">↑</button>
          </div>
        </div>

        <!-- 通知横幅 -->
        <div id="rp-notif-banner" style="display:none">
          <div class="rp-nb-ico">💬</div>
          <div class="rp-nb-body">
            <div class="rp-nb-from" id="rp-nb-from"></div>
            <div class="rp-nb-text" id="rp-nb-text"></div>
          </div>
          <div class="rp-nb-time" id="rp-nb-time"></div>
        </div>

        <div id="rp-home-ind" style="display:none"></div>

        <!-- 添加好友弹窗（位于 #rp-screen 内部） -->
        <div id="rp-add-modal" style="display:none">
          <div id="rp-add-form">
            <h3>添加联系人</h3>
            <input type="text" id="rp-add-name" placeholder="姓名" maxlength="30"/>
            <input type="text" id="rp-add-initials" placeholder="缩写 (如: ZS)" maxlength="3"/>
            <div id="rp-add-btns">
              <button id="rp-add-cancel" type="button">取消</button>
              <button id="rp-add-confirm" type="button">添加</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
`;

// ================================================================
//  INIT
// ================================================================
async function init() {
  $('body').append(HTML);

  // FIX2: 记录初始 chatId 并从 localStorage 恢复状态
  const ctx = getContext();
  STATE.chatId = ctx?.chatId || `char_${ctx?.characterId}` || 'default';

  const saved = loadState(STATE.chatId);
  if (saved) {
    STATE.threads = saved.threads;
    STATE.notifications = saved.notifications || [];
    STATE.sync = saved.sync || { stage: 1, progress: 0, status: '乖巧' };
    console.log('[Raymond Phone] 已恢复历史状态 chatId:', STATE.chatId);
  }

  updateClock();
  setInterval(updateClock, 1000);

  bindUI();
  makeDraggable();
  renderThreadList();
  refreshWidget();
  refreshLockNotifs();

  eventSource.on(event_types.MESSAGE_RECEIVED, onAIMessage);
  // FIX2: 监听聊天窗口切换
  eventSource.on(event_types.CHAT_CHANGED, onChatChanged);

  console.log('[Raymond Phone] ✅ loaded');
}

// ================================================================
//  FIX2: 聊天切换 - 保存/恢复各窗口的手机状态
// ================================================================
function onChatChanged() {
  const ctx = getContext();
  const newChatId = ctx?.chatId || `char_${ctx?.characterId}` || 'default';

  if (newChatId === STATE.chatId) return;

  // 保存当前窗口状态（内存 + localStorage）
  if (STATE.chatId) {
    CHAT_STORE[STATE.chatId] = {
      threads: JSON.parse(JSON.stringify(STATE.threads)),
      notifications: [...STATE.notifications],
      sync: { ...STATE.sync },
      currentThread: STATE.currentThread,
    };
    saveState();
  }

  // 切换到新窗口
  STATE.chatId = newChatId;
  STATE.pendingMessages = [];

  // 优先从内存缓存恢复，其次从 localStorage，最后初始化
  if (CHAT_STORE[newChatId]) {
    const s = CHAT_STORE[newChatId];
    STATE.threads = s.threads;
    STATE.notifications = s.notifications;
    STATE.sync = { ...s.sync };
    STATE.currentThread = s.currentThread;
  } else {
    const persisted = loadState(newChatId);
    if (persisted) {
      STATE.threads = persisted.threads;
      STATE.notifications = persisted.notifications || [];
      STATE.sync = persisted.sync || { stage: 1, progress: 0, status: '乖巧' };
      STATE.currentThread = null;
    } else {
      STATE.threads = DEFAULT_THREADS();
      STATE.notifications = [];
      STATE.sync = { stage: 1, progress: 0, status: '乖巧' };
      STATE.currentThread = null;
    }
  }

  // 重置 UI
  go('lock');
  renderThreadList();
  refreshBadges();
  refreshWidget();
  refreshLockNotifs();
  renderPendingQueue();
}

// ================================================================
//  CLOCK
// ================================================================
function updateClock() {
  const now  = new Date();
  const h    = String(now.getHours()).padStart(2, '0');
  const m    = String(now.getMinutes()).padStart(2, '0');
  const t    = `${h}:${m}`;
  const days = ['周日','周一','周二','周三','周四','周五','周六'];
  const d    = `${days[now.getDay()]}  ${now.getMonth()+1}月${now.getDate()}日`;

  $('#rp-sbar-time, #rp-lock-time, #rp-home-clock').text(t);
  $('#rp-lock-date').text(d);
}

// ================================================================
//  UI BINDING
// ================================================================
function bindUI() {
  $('#rp-fab').on('click', () => {
    const phone = $('#rp-phone');
    phone.is(':visible') ? phone.hide() : phone.show();
  });

  $('#rp-swipe-zone, #rp-lock-time, #rp-lock-date').on('click', () => go('home'));

  $(document).on('click', '.rp-app[data-app]', function () {
    go($(this).data('app'));
  });

  $(document).on('click', '.rp-thread[data-thread]', function () {
    openThread($(this).data('thread'));
  });

  $(document).on('click', '.rp-back[data-to]', function () {
    go($(this).data('to'));
  });

  // FIX3: 发送按钮 → 统一发出所有排队消息
  $('#rp-send').on('click', sendSMS);

  // FIX3: 回车键 → 暂存到队列，不立即发送
  $('#rp-input').on('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addToQueue();
    }
  });

  $('#rp-add-btn').on('click', (e) => {
    e.stopPropagation();
    $('#rp-add-name').val('');
    $('#rp-add-initials').val('');
    $('#rp-add-modal').show();
  });

  $('#rp-add-cancel').on('click', () => {
    $('#rp-add-modal').hide();
  });

  $('#rp-add-confirm').on('click', addContact);

  $('#rp-add-modal').on('click', function (e) {
    if (e.target === this) $(this).hide();
  });
}

// ================================================================
//  FIX3: 消息队列
// ================================================================
function addToQueue() {
  const text = $('#rp-input').val().trim();
  if (!text || !STATE.currentThread) return;
  STATE.pendingMessages.push(text);
  $('#rp-input').val('');
  renderPendingQueue();
}

function renderPendingQueue() {
  const container = $('#rp-pending-queue');
  container.empty();
  if (STATE.pendingMessages.length === 0) {
    container.hide();
    return;
  }
  container.show();
  STATE.pendingMessages.forEach((msg) => {
    const short = msg.length > 30 ? msg.slice(0, 30) + '…' : msg;
    container.append(`<div class="rp-pending-item">${short}</div>`);
  });
  container.append(`<div class="rp-pending-hint">点击 ↑ 发送全部 ${STATE.pendingMessages.length} 条</div>`);
}

// ================================================================
//  ADD CONTACT
// ================================================================
function generateAvatarBg() {
  const colors = [
    ['#2e1c1c','#4e2c2c'],
    ['#1c2e2e','#2c4e4e'],
    ['#2e2e1c','#4e4e2c'],
    ['#1c1c2e','#2c2c4e'],
    ['#2e1c2e','#4e2c4e'],
    ['#1c2e1c','#2c4a2c'],
    ['#2e251c','#4e3c2c'],
    ['#1c252e','#2c3c4e'],
  ];
  const pair = colors[Math.floor(Math.random() * colors.length)];
  return `linear-gradient(145deg,${pair[0]},${pair[1]})`;
}

function addContact() {
  const name = $('#rp-add-name').val().trim();
  let initials = $('#rp-add-initials').val().trim().toUpperCase();

  if (!name) return;

  if (!initials) {
    initials = name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }
  if (!initials) initials = name.slice(0, 2).toUpperCase();

  const id = 'custom_' + Date.now();

  STATE.threads[id] = {
    id: id,
    name: name,
    initials: initials,
    avatarBg: generateAvatarBg(),
    messages: [],
    unread: 0,
  };

  $('#rp-add-modal').hide();
  renderThreadList();
  saveState(); // FIX2: 持久化新联系人

  console.log(`[Raymond Phone] 添加联系人: ${name} (${id})`);
}

// ================================================================
//  RENDER THREAD LIST
// ================================================================
function renderThreadList() {
  const container = $('#rp-thread-list').empty();

  Object.values(STATE.threads).forEach(th => {
    const lastMsg = th.messages.at(-1);
    const preview = lastMsg ? (lastMsg.text.slice(0, 28) + (lastMsg.text.length > 28 ? '…' : '')) : '暂无消息';
    const time    = lastMsg ? lastMsg.time : '';
    const badgeDisplay = th.unread > 0 ? '' : 'display:none';
    const badgeCount   = th.unread;

    container.append(`
      <div class="rp-thread" data-thread="${th.id}">
        <div class="rp-av" style="background:${th.avatarBg}">${th.initials}</div>
        <div class="rp-ti">
          <div class="rp-tn">${th.name}</div>
          <div class="rp-tp" id="rp-tp-${th.id}">${preview}</div>
        </div>
        <div class="rp-tm">
          <div class="rp-tt" id="rp-tt-${th.id}">${time}</div>
          <div class="rp-tbadge" id="rp-tbadge-${th.id}" style="${badgeDisplay}">${badgeCount}</div>
        </div>
      </div>
    `);
  });
}

// ================================================================
//  NAVIGATION
// ================================================================
function go(view) {
  $('.rp-view').hide();
  $(`#rp-view-${view}`).show();
  $('#rp-home-ind').toggle(view !== 'lock');
  STATE.currentView = view;

  if (view === 'messages') {
    renderThreadList();
  }
}

function openThread(threadId) {
  STATE.currentThread = threadId;
  const th = STATE.threads[threadId];
  if (!th) return;

  th.unread = 0;
  refreshBadges();

  $('#rp-hd-av').text(th.initials).css('background', th.avatarBg);
  $('#rp-hd-name').text(th.name);

  // FIX3: 切换对话时清空待发队列
  STATE.pendingMessages = [];
  renderPendingQueue();

  renderBubbles(threadId);
  go('thread');
}

// ================================================================
//  BUBBLE RENDERER
// ================================================================
function renderBubbles(threadId) {
  const area = $('#rp-bubbles').empty();
  STATE.threads[threadId].messages.forEach(msg => {
    const wrap = $('<div>').addClass('rp-bwrap ' + (msg.from === 'user' ? 'rp-out' : 'rp-in'));
    const bbl  = $('<div>').addClass('rp-bubble ' + (msg.from === 'user' ? 'rp-sent' : 'rp-recv')).text(msg.text);
    const ts   = $('<div>').addClass('rp-bts').text(msg.time);
    area.append(wrap.append(bbl, ts));
  });
  area.scrollTop(area[0].scrollHeight);
}

// ================================================================
//  SEND SMS
// ================================================================
function sendSMS() {
  // FIX3: 先把输入框当前内容并入队列
  const currentText = $('#rp-input').val().trim();
  if (currentText) {
    STATE.pendingMessages.push(currentText);
    $('#rp-input').val('');
  }

  if (!STATE.currentThread || STATE.pendingMessages.length === 0) return;

  const th  = STATE.threads[STATE.currentThread];
  const now = new Date();
  const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  // 写入手机 UI（全部排队消息）
  const allMessages = [...STATE.pendingMessages];
  STATE.pendingMessages = [];
  renderPendingQueue();

  allMessages.forEach(text => {
    th.messages.push({ from: 'user', text, time: ts });
  });
  renderBubbles(STATE.currentThread);
  updatePreviews();
  saveState(); // FIX2: 持久化发出的消息

  const ta = document.querySelector('#send_textarea');
  if (!ta) return;

  const mainText = ta.value.trim();

  // 拼装可见行动描述
  let smsLine;
  if (allMessages.length === 1) {
    smsLine = `*{{user}}拿起手机，给${th.name}发了一条短信：「${allMessages[0]}」*`;
  } else {
    const msgList = allMessages.map(m => `「${m}」`).join('、');
    smsLine = `*{{user}}拿起手机，给${th.name}连续发了${allMessages.length}条短信：${msgList}*`;
  }

  // FIX4: 判断联系人是否为主角，生成不同的 OOC 指令
  const ctx = getContext();
  const mainCharName = ctx?.name2 || '';
  const isMainChar = mainCharName
    ? th.name.toLowerCase().includes(mainCharName.toLowerCase()) ||
      mainCharName.toLowerCase().includes(th.name.toLowerCase())
    : true;

  let oocText;
  if (isMainChar) {
    // 对话对象是主角：根据场景决定口头还是短信回复
    oocText = `[场景判断：${th.name}，若你与{{user}}不在同一场景（不同地点或不同房间均算），必须通过手机短信格式回复：<PHONE><SMS FROM="${th.name}" TIME="${ts}">回复内容</SMS></PHONE>；若在同一场景中，可口头回复，无需手机格式。]`;
  } else {
    // FIX1: NPC联系人——明确告知AI这是独立NPC，让AI代写回复，主角完全不知情
    oocText = `[叙事指令：{{user}}刚刚给"${th.name}"发了短信。重要说明："${th.name}"是故事中一个独立的NPC角色，与${mainCharName}是完全不同的两个人，${mainCharName}并未收到这条短信，也不知道这条短信的存在。请你以叙事者身份，代写"${th.name}"收到短信后的手机回复，格式如下：<PHONE><SMS FROM="${th.name}" TIME="${ts}">此处填写${th.name}的回复内容</SMS></PHONE>。请勿让${mainCharName}对这条短信做出任何反应、评论或提及。]`;
  }

  // FIX1: 用 setExtensionPrompt 注入隐藏 OOC，不在聊天框显示
  const hasExtPrompt = typeof setExtensionPrompt === 'function' && extension_prompt_types;
  if (hasExtPrompt) {
    setExtensionPrompt('rp-phone-ooc', oocText, extension_prompt_types.IN_CHAT, 0, false, 0);
    ta.value = mainText ? `${mainText}\n${smsLine}` : smsLine;
  } else {
    // 降级：OOC 直接写入消息（旧版 ST 兼容）
    ta.value = mainText ? `${mainText}\n${smsLine}\n${oocText}` : `${smsLine}\n${oocText}`;
  }

  ta.dispatchEvent(new Event('input', { bubbles: true }));
  document.querySelector('#send_but')?.click();

  // 发送后清除隐藏提示
  if (hasExtPrompt) {
    setTimeout(() => setExtensionPrompt('rp-phone-ooc', ''), 300);
  }
}

// ================================================================
//  AI MESSAGE PARSER
// ================================================================
function onAIMessage() {
  try {
    const ctx  = getContext();
    const chat = ctx?.chat;
    if (!chat?.length) return;

    const last = [...chat].reverse().find(m => !m.is_user);
    if (!last?.mes) return;

    const raw   = last.mes;
    const match = raw.match(/<PHONE>([\s\S]*?)<\/PHONE>/i);
    if (!match) return;

    parsePhone(match[1]);
  } catch (e) {
    console.warn('[Raymond Phone]', e);
  }
}

function parsePhone(block) {
  const smsRe = /<SMS\s+FROM="([^"]+)"\s+TIME="([^"]+)">([\s\S]*?)<\/SMS>/gi;
  let m;
  while ((m = smsRe.exec(block)) !== null) {
    const fromRaw  = m[1].trim();
    const time     = m[2];
    const text     = m[3].trim();
    const threadId = matchThread(fromRaw);
    if (threadId) {
      incomingMsg(threadId, text, time);
    }
  }

  const notifRe = /<NOTIFY\s+TYPE="([^"]+)"\s+TEXT="([^"]+)"\/>/gi;
  while ((m = notifRe.exec(block)) !== null) {
    addLockNotif(m[1], m[2]);
  }

  const sync = block.match(/<SYNC\s+STAGE="(\d+)"\s+PROGRESS="(\d+)"\s+STATUS="([^"]+)"\/>/i);
  if (sync) {
    STATE.sync = { stage: +sync[1], progress: +sync[2], status: sync[3] };
    refreshWidget();
    saveState(); // FIX2: 持久化关系进度
  }
}

// ================================================================
//  MATCH THREAD
// ================================================================
function matchThread(fromRaw) {
  const lower = fromRaw.toLowerCase();

  for (const th of Object.values(STATE.threads)) {
    if (th.name.toLowerCase() === lower) return th.id;
  }

  for (const th of Object.values(STATE.threads)) {
    const thName = th.name.toLowerCase();
    if (lower.includes(thName) || thName.includes(lower)) return th.id;
  }

  if (lower.includes('gaspard')) return 'gaspard';
  if (lower.includes('raymond')) return 'raymond';

  return null;
}

// ================================================================
//  INCOMING MESSAGE
// ================================================================
function incomingMsg(threadId, text, time) {
  const th = STATE.threads[threadId];
  if (!th) return;

  th.messages.push({ from: threadId, text, time });

  if (STATE.currentView !== 'thread' || STATE.currentThread !== threadId) {
    th.unread++;
  }

  refreshBadges();
  updatePreviews();

  if (STATE.currentView === 'thread' && STATE.currentThread === threadId) {
    renderBubbles(threadId);
  }

  showBanner(th.name, text, time);
  saveState(); // FIX2: 持久化收到的消息
}

// ================================================================
//  NOTIFICATION BANNER
// ================================================================
function showBanner(from, text, time) {
  const b = $('#rp-notif-banner');
  $('#rp-nb-from').text(from);
  $('#rp-nb-text').text(text.length > 45 ? text.slice(0, 45) + '…' : text);
  $('#rp-nb-time').text(time);

  b.stop(true).show().addClass('rp-nb-in');
  setTimeout(() => {
    b.removeClass('rp-nb-in');
    setTimeout(() => b.hide(), 400);
  }, 3500);
}

function addLockNotif(type, text) {
  STATE.notifications.push({ type, text });
  refreshLockNotifs();
}

// FIX2: 抽出 DOM 刷新，方便聊天切换时重建锁屏通知
function refreshLockNotifs() {
  const c = $('#rp-lock-notifs').empty();
  STATE.notifications.slice(-3).forEach(n => {
    c.append(`<div class="rp-ln">
      <span class="rp-ln-type">${n.type}</span>
      <span class="rp-ln-text">${n.text}</span>
    </div>`);
  });
}

// ================================================================
//  UI REFRESH HELPERS
// ================================================================
function refreshBadges() {
  let total = 0;
  Object.values(STATE.threads).forEach(th => {
    const el = $(`#rp-tbadge-${th.id}`);
    if (el.length) {
      th.unread > 0 ? el.text(th.unread).show() : el.hide();
    }
    total += th.unread;
  });
  total > 0 ? $('#rp-main-badge').text(total).show() : $('#rp-main-badge').hide();
}

function updatePreviews() {
  Object.values(STATE.threads).forEach(th => {
    const last = th.messages.at(-1);
    if (!last) return;
    $(`#rp-tp-${th.id}`).text(last.text.slice(0, 28) + (last.text.length > 28 ? '…' : ''));
    $(`#rp-tt-${th.id}`).text(last.time);
  });
}

const STAGE_NAMES = { 1: '初识 · 试探', 2: '增进 · 主导', 3: '陷落 · 占有' };
function refreshWidget() {
  const { stage, progress, status } = STATE.sync;
  $('#rp-wd-stage').text(`Stage ${stage} · ${(STAGE_NAMES[stage] || '').split('·')[1]?.trim()}`);
  $('#rp-wd-fill').css('width', (progress / 99 * 100).toFixed(1) + '%');
  $('#rp-wd-status').text(status);
}

// ================================================================
//  DRAGGABLE
// ================================================================
function makeDraggable() {
  const phone = document.querySelector('#rp-phone');
  if (!phone) return;
  let dragging = false, ox, oy, ex, ey;

  phone.addEventListener('mousedown', e => {
    if (e.target.closest('input,button,.rp-view')) return;
    dragging = true;
    const r = phone.getBoundingClientRect();
    ox = r.left; oy = r.top; ex = e.clientX; ey = e.clientY;
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    phone.style.cssText += `left:${ox + e.clientX - ex}px;top:${oy + e.clientY - ey}px;right:auto;bottom:auto;`;
  });
  document.addEventListener('mouseup', () => { dragging = false; });
}

// ================================================================
//  ENTRY
// ================================================================
jQuery(async () => { await init(); });
