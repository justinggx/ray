import { eventSource, event_types } from '../../../../script.js';
import { getContext } from '../../../extensions.js';

// ================================================================
//  STATE
// ================================================================
const STATE = {
  currentView: 'lock',   // lock | home | messages | thread
  currentThread: null,   // 'raymond' | 'gaspard'
  threads: {
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
  },
  notifications: [],
  sync: { stage: 1, progress: 0, status: '乖巧' },
};

// ================================================================
//  HTML
// ================================================================
const HTML = `
<div id="rp-wrapper">
  <!-- 浮动触发按钮 -->
  <div id="rp-fab" title="打开手机">📱</div>

  <!-- 手机本体 -->
  <div id="rp-phone" style="display:none">
    <div id="rp-frame">
      <div class="rp-btn rp-vol-up"></div>
      <div class="rp-btn rp-vol-dn"></div>
      <div class="rp-btn rp-power"></div>

      <div id="rp-screen">
        <!-- Dynamic Island -->
        <div id="rp-island"></div>

        <!-- 状态栏 -->
        <div id="rp-sbar">
          <span id="rp-sbar-time"></span>
          <div class="rp-sbar-r">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="white" opacity=".8">
              <rect x="0" y="4" width="3" height="6" rx="1"/>
              <rect x="4" y="2" width="3" height="8" rx="1"/>
              <rect x="8" y="0" width="3" height="10" rx="1"/>
              <rect x="12" y="0" width="3" height="10" rx="1" opacity=".3"/>
            </svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="white" opacity=".8">
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
                <div class="rp-app-ico" style="background:linear-gradient(145deg,#555,#333)">📷</div>
                <div class="rp-app-lbl">相机</div>
              </div>
              <div class="rp-app rp-app-off">
                <div class="rp-app-ico" style="background:linear-gradient(145deg,#555,#3a3a3a)">⚙️</div>
                <div class="rp-app-lbl">设置</div>
              </div>
            </div>

            <!-- 关系进度小组件 -->
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
            <span></span>
          </div>
          <div id="rp-thread-list">
            <div class="rp-thread" data-thread="raymond">
              <div class="rp-av" style="background:linear-gradient(145deg,#1c1c2e,#2c2c4e)">RA</div>
              <div class="rp-ti">
                <div class="rp-tn">Raymond Augustine</div>
                <div class="rp-tp" id="rp-tp-raymond">暂无消息</div>
              </div>
              <div class="rp-tm">
                <div class="rp-tt" id="rp-tt-raymond"></div>
                <div class="rp-tbadge" id="rp-tbadge-raymond" style="display:none">0</div>
              </div>
            </div>
            <div class="rp-thread" data-thread="gaspard">
              <div class="rp-av" style="background:linear-gradient(145deg,#1a2e1a,#2a4a2a)">GV</div>
              <div class="rp-ti">
                <div class="rp-tn">Gaspard de Valois</div>
                <div class="rp-tp" id="rp-tp-gaspard">暂无消息</div>
              </div>
              <div class="rp-tm">
                <div class="rp-tt" id="rp-tt-gaspard"></div>
                <div class="rp-tbadge" id="rp-tbadge-gaspard" style="display:none">0</div>
              </div>
            </div>
          </div>
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
          <div id="rp-composer">
            <input id="rp-input" type="text" placeholder="iMessage" autocomplete="off"/>
            <button id="rp-send">↑</button>
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

        <!-- Home Indicator -->
        <div id="rp-home-ind" style="display:none"></div>
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

  updateClock();
  setInterval(updateClock, 1000);

  bindUI();
  makeDraggable();

  eventSource.on(event_types.MESSAGE_RECEIVED, onAIMessage);

  console.log('[Raymond Phone] ✅ loaded');
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
  // FAB 开关
  $('#rp-fab').on('click', () => {
    const phone = $('#rp-phone');
    phone.is(':visible') ? phone.hide() : phone.show();
  });

  // 锁屏解锁
  $('#rp-swipe-zone, #rp-lock-time, #rp-lock-date').on('click', () => go('home'));

  // App 图标
  $(document).on('click', '.rp-app[data-app]', function () {
    go($(this).data('app'));
  });

  // 对话列表
  $(document).on('click', '.rp-thread[data-thread]', function () {
    openThread($(this).data('thread'));
  });

  // 返回按钮
  $(document).on('click', '.rp-back[data-to]', function () {
    go($(this).data('to'));
  });

  // 发送
  $('#rp-send').on('click', sendSMS);
  $('#rp-input').on('keydown', e => { if (e.key === 'Enter') sendSMS(); });
}

// ================================================================
//  NAVIGATION
// ================================================================
function go(view) {
  $('.rp-view').hide();
  $(`#rp-view-${view}`).show();
  $('#rp-home-ind').toggle(view !== 'lock');
  STATE.currentView = view;
}

function openThread(threadId) {
  STATE.currentThread = threadId;
  const th = STATE.threads[threadId];

  // 清未读
  th.unread = 0;
  refreshBadges();

  // 设置头部
  $('#rp-hd-av').text(th.initials).css('background', th.avatarBg);
  $('#rp-hd-name').text(th.name);

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
//  SEND SMS (user → char)
// ================================================================
function sendSMS() {
  const text = $('#rp-input').val().trim();
  if (!text || !STATE.currentThread) return;

  const th  = STATE.threads[STATE.currentThread];
  const now = new Date();
  const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  th.messages.push({ from: 'user', text, time: ts });
  $('#rp-input').val('');
  renderBubbles(STATE.currentThread);
  updatePreviews();

  // 注入到 ST 聊天
  const inject = `*{{user}}拿起手机，给${th.name}发了一条短信：「${text}」*`;
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    ta.value = inject;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
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

    // 找最后一条 AI 消息
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
  // SMS
  const smsRe = /<SMS\s+FROM="([^"]+)"\s+TIME="([^"]+)">([\s\S]*?)<\/SMS>/gi;
  let m;
  while ((m = smsRe.exec(block)) !== null) {
    const fromRaw = m[1].toLowerCase();
    const time    = m[2];
    const text    = m[3].trim();
    const threadId = fromRaw.includes('gaspard') ? 'gaspard' : 'raymond';
    incomingMsg(threadId, text, time);
  }

  // NOTIFY
  const notifRe = /<NOTIFY\s+TYPE="([^"]+)"\s+TEXT="([^"]+)"\/>/gi;
  while ((m = notifRe.exec(block)) !== null) {
    addLockNotif(m[1], m[2]);
  }

  // SYNC
  const sync = block.match(/<SYNC\s+STAGE="(\d+)"\s+PROGRESS="(\d+)"\s+STATUS="([^"]+)"\/>/i);
  if (sync) {
    STATE.sync = { stage: +sync[1], progress: +sync[2], status: sync[3] };
    refreshWidget();
  }
}

// ================================================================
//  INCOMING MESSAGE
// ================================================================
function incomingMsg(threadId, text, time) {
  const th = STATE.threads[threadId];
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
    th.unread > 0 ? el.text(th.unread).show() : el.hide();
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
