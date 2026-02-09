(() => {
  const MODULE = 'ray_mobile';
  const S = () => SillyTavern.getContext();

  // 角色配置
  const characters = {
    raymond: {
      name: 'Raymond',
      avatar: 'https://i.postimg.cc/50H4ky1R/5e22d430e6a72b4ad5bb75e11531c863(20260209-114057).jpg',
      charId: null
    },
    gaspard: {
      name: 'Gaspard',
      avatar: 'https://i.postimg.cc/RFjSrmZC/46296D95-1C47-41CE-8F60-694E5A452352(20260209-114.jpg',
      charId: null
    }
  };

  let currentChat = 'raymond';

  // UI样式
  const STYLE = `
    #rayFab{position:fixed;right:20px;bottom:20px;z-index:99999}
    #rayFab button{width:56px;height:56px;border-radius:50%;border:none;box-shadow:0 4px 12px rgba(0,0,0,.3);background:#1c1c1e;color:#fff;font-size:24px;cursor:pointer;transition:transform .2s}
    #rayFab button:hover{transform:scale(1.05)}
    
    #rayPhone{position:fixed;inset:0;display:none;place-items:center;background:rgba(0,0,0,.5);backdrop-filter:blur(8px);z-index:99998}
    #rayPhone.show{display:grid}
    
    #rayPhone .phone{
      width:min(390px,95vw);
      height:min(844px,90vh);
      border-radius:40px;
      background:#000;
      box-shadow:0 20px 60px rgba(0,0,0,.8);
      position:relative;
      overflow:hidden;
      display:flex;
      flex-direction:column;
    }
    
    #rayPhone .status-bar{
      height:44px;
      background:#000;
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:0 20px;
      color:#fff;
      font-size:15px;
      font-weight:500;
      position:relative;
      z-index:10;
    }
    
    #rayPhone .notch{
      position:absolute;
      top:0;
      left:50%;
      transform:translateX(-50%);
      width:120px;
      height:30px;
      background:#000;
      border-radius:0 0 20px 20px;
    }
    
    #rayPhone .chat-header{
      background:#1c1c1e;
      padding:12px 16px;
      display:flex;
      align-items:center;
      gap:12px;
      border-bottom:1px solid #2c2c2e;
    }
    
    #rayPhone .chat-header .back{
      background:none;
      border:none;
      color:#0a84ff;
      font-size:20px;
      cursor:pointer;
      padding:4px;
    }
    
    #rayPhone .chat-header .avatar{
      width:36px;
      height:36px;
      border-radius:50%;
      object-fit:cover;
    }
    
    #rayPhone .chat-header .name{
      flex:1;
      color:#fff;
      font-size:17px;
      font-weight:600;
    }
    
    #rayPhone .chat-header .close{
      background:none;
      border:none;
      color:#ff3b30;
      font-size:28px;
      cursor:pointer;
      padding:0;
      line-height:1;
      width:28px;
      height:28px;
    }
    
    #rayPhone .chat-list{
      flex:1;
      overflow-y:auto;
      background:#000;
    }
    
    #rayPhone .chat-item{
      display:flex;
      align-items:center;
      gap:12px;
      padding:12px 16px;
      border-bottom:1px solid #1c1c1e;
      cursor:pointer;
      transition:background .2s;
    }
    
    #rayPhone .chat-item:hover{
      background:#1c1c1e;
    }
    
    #rayPhone .chat-item .avatar{
      width:50px;
      height:50px;
      border-radius:50%;
      object-fit:cover;
    }
    
    #rayPhone .chat-item .info{
      flex:1;
    }
    
    #rayPhone .chat-item .name{
      color:#fff;
      font-size:16px;
      font-weight:600;
      margin-bottom:4px;
    }
    
    #rayPhone .chat-item .preview{
      color:#8e8e93;
      font-size:14px;
    }
    
    #rayPhone .messages{
      flex:1;
      overflow-y:auto;
      padding:16px;
      background:#000;
      display:flex;
      flex-direction:column;
      gap:12px;
    }
    
    #rayPhone .message{
      display:flex;
      gap:8px;
      max-width:75%;
    }
    
    #rayPhone .message.received{
      align-self:flex-start;
    }
    
    #rayPhone .message.sent{
      align-self:flex-end;
      flex-direction:row-reverse;
    }
    
    #rayPhone .message .avatar{
      width:32px;
      height:32px;
      border-radius:50%;
      object-fit:cover;
      flex-shrink:0;
    }
    
    #rayPhone .message .bubble{
      padding:10px 14px;
      border-radius:18px;
      word-wrap:break-word;
      font-size:15px;
      line-height:1.4;
    }
    
    #rayPhone .message.received .bubble{
      background:#1c1c1e;
      color:#fff;
      border-top-left-radius:4px;
    }
    
    #rayPhone .message.sent .bubble{
      background:#0a84ff;
      color:#fff;
      border-top-right-radius:4px;
    }
    
    #rayPhone .input-area{
      padding:8px 12px 20px;
      background:#1c1c1e;
      display:flex;
      align-items:flex-end;
      gap:8px;
    }
    
    #rayPhone .input-box{
      flex:1;
      background:#2c2c2e;
      border:1px solid #3a3a3c;
      border-radius:20px;
      padding:8px 16px;
      color:#fff;
      font-size:15px;
      resize:none;
      max-height:100px;
      min-height:36px;
      outline:none;
    }
    
    #rayPhone .send-btn{
      width:36px;
      height:36px;
      border-radius:50%;
      background:#0a84ff;
      border:none;
      color:#fff;
      font-size:18px;
      cursor:pointer;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
    }
    
    #rayPhone .send-btn:disabled{
      background:#3a3a3c;
      cursor:not-allowed;
    }
    
    #rayPhone .screen{
      display:none;
      flex-direction:column;
      flex:1;
      overflow:hidden;
    }
    
    #rayPhone .screen.active{
      display:flex;
    }
  `;

  function mountUI() {
    if (document.getElementById('rayFab')) return;

    const style = document.createElement('style');
    style.id = 'rayMobileStyle';
    style.textContent = STYLE;
    document.head.appendChild(style);

    const fab = document.createElement('div');
    fab.id = 'rayFab';
    fab.innerHTML = `<button title="打开消息">📱</button>`;
    document.body.appendChild(fab);

    const overlay = document.createElement('div');
    overlay.id = 'rayPhone';
    overlay.innerHTML = `
      <div class="phone">
        <div class="status-bar">
          <span>9:41</span>
          <div class="notch"></div>
          <span>⚡ 100%</span>
        </div>
        
        <div class="screen active" id="chatListScreen">
          <div class="chat-header">
            <div class="name">消息</div>
            <button class="close" title="关闭">×</button>
          </div>
          <div class="chat-list">
            <div class="chat-item" data-chat="raymond">
              <img class="avatar" src="${characters.raymond.avatar}" alt="Raymond">
              <div class="info">
                <div class="name">Raymond</div>
                <div class="preview">点击开始聊天...</div>
              </div>
            </div>
            <div class="chat-item" data-chat="gaspard">
              <img class="avatar" src="${characters.gaspard.avatar}" alt="Gaspard">
              <div class="info">
                <div class="name">Gaspard</div>
                <div class="preview">点击开始聊天...</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="screen" id="raymondScreen">
          <div class="chat-header">
            <button class="back" onclick="window.rayMobile.showList()">‹</button>
            <img class="avatar" src="${characters.raymond.avatar}" alt="Raymond">
            <div class="name">Raymond</div>
            <button class="close" title="关闭">×</button>
          </div>
          <div class="messages" id="raymondMessages"></div>
          <div class="input-area">
            <textarea class="input-box" id="raymondInput" placeholder="消息" rows="1"></textarea>
            <button class="send-btn" id="raymondSend">↑</button>
          </div>
        </div>
        
        <div class="screen" id="gaspardScreen">
          <div class="chat-header">
            <button class="back" onclick="window.rayMobile.showList()">‹</button>
            <img class="avatar" src="${characters.gaspard.avatar}" alt="Gaspard">
            <div class="name">Gaspard</div>
            <button class="close" title="关闭">×</button>
          </div>
          <div class="messages" id="gaspardMessages"></div>
          <div class="input-area">
            <textarea class="input-box" id="gaspardInput" placeholder="消息" rows="1"></textarea>
            <button class="send-btn" id="gaspardSend">↑</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    fab.querySelector('button').addEventListener('click', () => showPhone(true));
    
    overlay.querySelectorAll('.close').forEach(btn => {
      btn.addEventListener('click', () => showPhone(false));
    });
    
    overlay.querySelectorAll('.chat-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const chatType = e.currentTarget.dataset.chat;
        showChat(chatType);
      });
    });

    document.getElementById('raymondSend').addEventListener('click', () => sendMessage('raymond'));
    document.getElementById('gaspardSend').addEventListener('click', () => sendMessage('gaspard'));
    
    document.getElementById('raymondInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage('raymond');
      }
    });
    
    document.getElementById('gaspardInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage('gaspard');
      }
    });

    ['raymondInput', 'gaspardInput'].forEach(id => {
      const textarea = document.getElementById(id);
      textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
      });
    });

    initCharacters();
  }

  function showPhone(show) {
    const el = document.getElementById('rayPhone');
    if (el) {
      if (show) {
        el.classList.add('show');
        showList();
      } else {
        el.classList.remove('show');
      }
    }
  }

  function showList() {
    document.querySelectorAll('#rayPhone .screen').forEach(s => s.classList.remove('active'));
    document.getElementById('chatListScreen').classList.add('active');
  }

  function showChat(chatType) {
    document.querySelectorAll('#rayPhone .screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`${chatType}Screen`).classList.add('active');
    currentChat = chatType;
  }

  function addMessage(chatType, text, isSent = false) {
    const messagesDiv = document.getElementById(`${chatType}Messages`);
    const char = characters[chatType];
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isSent ? 'sent' : 'received'}`;
    
    const avatar = isSent ? '' : `<img class="avatar" src="${char.avatar}" alt="${char.name}">`;
    
    msgDiv.innerHTML = `
      ${avatar}
      <div class="bubble">${escapeHtml(text)}</div>
    `;
    
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  async function sendMessage(chatType) {
    const input = document.getElementById(`${chatType}Input`);
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage(chatType, message, true);
    input.value = '';
    input.style.height = 'auto';
    
    try {
      const context = S();
      const char = characters[chatType];
      
      const messagesDiv = document.getElementById(`${chatType}Messages`);
      const typingDiv = document.createElement('div');
      typingDiv.className = 'message received';
      typingDiv.id = `typing-${chatType}`;
      typingDiv.innerHTML = `
        <img class="avatar" src="${char.avatar}" alt="${char.name}">
        <div class="bubble" style="color:#8e8e93">正在输入...</div>
      `;
      messagesDiv.appendChild(typingDiv);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      
      // 查找角色
      const charData = context.characters.find(c => 
        c.name.toLowerCase() === char.name.toLowerCase()
      );
      
      if (!charData) {
        typingDiv.remove();
        addMessage(chatType, `未找到角色 ${char.name},请在酒馆中加载该角色`, false);
        return;
      }
      
      // 切换到该角色
      await context.selectCharacterById(charData.avatar);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 使用酒馆的发送功能
      const textarea = document.getElementById('send_textarea');
      const sendButton = document.getElementById('send_but');
      
      if (textarea && sendButton) {
        textarea.value = message;
        
        // 触发输入事件
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        
        // 点击发送
        sendButton.click();
        
        // 等待回复
        waitForResponse(chatType, typingDiv);
      } else {
        typingDiv.remove();
        addMessage(chatType, '无法访问酒馆发送功能', false);
      }
      
    } catch (error) {
      console.error('发送失败:', error);
      document.getElementById(`typing-${chatType}`)?.remove();
      addMessage(chatType, '发送出错: ' + error.message, false);
    }
  }

  function waitForResponse(chatType, typingDiv) {
    const context = S();
    let checkCount = 0;
    const maxChecks = 60;
    
    const interval = setInterval(() => {
      checkCount++;
      
      // 检查是否还在生成
      const isGenerating = context.streamingProcessor?.isGenerating || 
                          context.generationInProgress;
      
      if (!isGenerating) {
        // 获取最新消息
        const chat = context.chat;
        if (chat && chat.length > 0) {
          const lastMsg = chat[chat.length - 1];
          
          if (!lastMsg.is_user && lastMsg.mes) {
            clearInterval(interval);
            typingDiv.remove();
            addMessage(chatType, lastMsg.mes, false);
            return;
          }
        }
      }
      
      if (checkCount >= maxChecks) {
        clearInterval(interval);
        typingDiv.remove();
        addMessage(chatType, '等待回复超时', false);
      }
    }, 500);
  }

  function initCharacters() {
    try {
      const context = S();
      const chars = context.characters || [];
      
      chars.forEach(char => {
        if (char.name === 'Raymond') {
          characters.raymond.charId = char.avatar;
        } else if (char.name === 'Gaspard') {
          characters.gaspard.charId = char.avatar;
        }
      });
    } catch (error) {
      console.error('初始化角色失败:', error);
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  window.rayMobile = {
    showList,
    showChat,
    sendMessage
  };

  const { eventSource, event_types } = S();
  eventSource.on(event_types.APP_READY, mountUI);
})();