// ================================================================
//  INJECT STYLES
//  CSS 从 manifest 的 css 字段移至此处 JS 注入，
//  彻底绕开 SillyTavern 扩展 CSS 加载管线，
//  避免与终端正则美化 <style> 标签的 CSS 解析器产生冲突。
// ================================================================
const RP_PHONE_CSS = `/* ── wrapper ── */
#rp-wrapper { position:fixed; right:20px; bottom:20px; z-index:9998; }

/* ── FAB ── */
#rp-fab {
  position:fixed; right:20px; bottom:20px; z-index:10001;
  width:52px; height:52px; border-radius:50%;
  background:rgba(255,255,255,.95); backdrop-filter:blur(12px);
  border:1px solid rgba(0,0,0,.08);
  display:flex; align-items:center; justify-content:center;
  font-size:24px; cursor:pointer;
  box-shadow:0 4px 24px rgba(0,0,0,.15);
  transition:transform .15s;
}
#rp-fab:hover { transform:scale(1.1); }

/* ── phone container ── */
#rp-phone {
  position:fixed; right:84px; bottom:20px; z-index:10000;
  cursor:default;
}

/* ── frame (iPhone 15 Pro) ── */
#rp-frame {
  position:relative; width:286px; height:580px;
  background:linear-gradient(160deg,#e8e8e8,#d0d0d0);
  border-radius:50px;
  box-shadow:
    0 0 0 1.5px rgba(0,0,0,.12),
    0 0 0 9px #f5f5f5,
    0 0 0 10px rgba(0,0,0,.08),
    0 36px 80px rgba(0,0,0,.25),
    inset 0 1px 0 rgba(255,255,255,.5);
  padding:11px;
}

/* side buttons */
.rp-btn { position:absolute; border-radius:2px; background:#c0c0c0; }
.rp-vol-up  { left:-3px; top:88px;  width:3px; height:34px; }
.rp-vol-dn  { left:-3px; top:130px; width:3px; height:34px; }
.rp-power   { right:-3px; top:106px; width:3px; height:46px; }

/* ── screen ── */
#rp-screen {
  width:100%; height:100%;
  background:#fff; border-radius:40px; overflow:hidden;
  position:relative;
  font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
}

/* Dynamic Island */
#rp-island {
  position:absolute; top:11px; left:50%; transform:translateX(-50%);
  width:86px; height:28px; background:#000; border-radius:20px; z-index:200;
  box-shadow:0 0 0 2px #f5f5f5;
}

/* ── status bar ── */
#rp-sbar {
  position:absolute; top:0; left:0; right:0; height:48px;
  display:flex; align-items:flex-end; justify-content:space-between;
  padding:0 20px 7px; z-index:199; color:#000;
  font-size:12px; font-weight:600; letter-spacing:-.2px;
}
.rp-sbar-r { display:flex; align-items:center; gap:6px; }
#rp-bat { width:22px; height:11px; border:1.5px solid rgba(0,0,0,.4); border-radius:3px; padding:1.5px; position:relative; }
#rp-bat::after { content:''; position:absolute; right:-4px; top:50%; transform:translateY(-50%); width:2px; height:5px; background:rgba(0,0,0,.3); border-radius:0 1px 1px 0; }
#rp-bat-fill { height:100%; width:85%; background:#34c759; border-radius:1.5px; }

/* ── views ── */
.rp-view { position:absolute; inset:0; overflow:hidden; }

/* ── LOCK SCREEN ── */
.rp-lock-bg {
  position:absolute; inset:0;
  background:
    radial-gradient(ellipse 120% 80% at 30% 15%, rgba(200,220,255,.6), transparent 55%),
    radial-gradient(ellipse 100% 80% at 80% 85%, rgba(220,230,255,.5), transparent 55%),
    linear-gradient(180deg,#e8f0ff,#f0f5ff,#e8f0ff);
}
.rp-lock-body {
  position:absolute; inset:0;
  display:flex; flex-direction:column; align-items:center; padding-top:64px;
  cursor:pointer; color:#000;
}
#rp-lock-time {
  font-size:70px; font-weight:100; letter-spacing:-4px; line-height:1;
  text-shadow:0 2px 8px rgba(0,0,0,.08);
}
#rp-lock-date {
  font-size:15px; font-weight:400; opacity:.6; margin-top:6px;
  letter-spacing:.3px;
}
#rp-lock-notifs { width:100%; padding:14px 16px; display:flex; flex-direction:column; gap:8px; margin-top:10px; }
.rp-ln {
  background:rgba(255,255,255,.85); backdrop-filter:blur(24px);
  border:1px solid rgba(0,0,0,.06); border-radius:14px;
  padding:10px 14px; display:flex; flex-direction:column; gap:4px;
  box-shadow:0 2px 8px rgba(0,0,0,.08);
}
.rp-ln-type { font-size:10px; font-weight:700; color:rgba(0,0,0,.4); text-transform:uppercase; letter-spacing:.6px; }
.rp-ln-text { font-size:12px; color:rgba(0,0,0,.85); line-height:1.4; }

#rp-swipe-hint {
  position:absolute; bottom:30px; left:0; right:0; text-align:center;
  font-size:12px; color:rgba(0,0,0,.3);
  animation:rp-breathe 2.2s ease-in-out infinite;
}
@keyframes rp-breathe { 0%,100%{opacity:.2} 50%{opacity:.5} }
#rp-swipe-zone { position:absolute; inset:0; cursor:pointer; }

/* ── HOME SCREEN ── */
.rp-home-bg {
  position:absolute; inset:0;
  background:
    radial-gradient(ellipse 100% 70% at 20% 10%, rgba(220,235,255,.7), transparent 50%),
    radial-gradient(ellipse 100% 70% at 80% 90%, rgba(230,240,255,.6), transparent 50%),
    linear-gradient(170deg,#e8f2ff,#f0f6ff,#e8f2ff);
}
.rp-home-body { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; padding-top:54px; }
#rp-home-clock { font-size:52px; font-weight:100; color:#000; letter-spacing:-3px; margin-bottom:22px; }

/* app grid */
#rp-app-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; padding:0 18px; width:100%; }
.rp-app { display:flex; flex-direction:column; align-items:center; gap:5px; cursor:pointer; transition:transform .12s; }
.rp-app:active { transform:scale(.88); }
.rp-app-off { opacity:.35; pointer-events:none; }
.rp-app-ico {
  width:52px; height:52px; border-radius:13px;
  display:flex; align-items:center; justify-content:center; font-size:26px;
  position:relative; box-shadow:0 2px 10px rgba(0,0,0,.15);
}
.rp-app-ico svg { width:100%; height:100%; }
.rp-app-lbl { font-size:10px; color:rgba(0,0,0,.85); text-shadow:0 1px 2px rgba(255,255,255,.8); }
.rp-badge {
  position:absolute; top:-5px; right:-5px;
  background:#ff3b30; color:#fff; font-size:10px; font-weight:700;
  min-width:17px; height:17px; border-radius:9px; padding:0 4px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid #fff;
}

/* widget */
#rp-widget {
  background:rgba(255,255,255,.75); backdrop-filter:blur(20px);
  border:1px solid rgba(0,0,0,.08); border-radius:18px;
  margin:18px 16px 0; padding:13px 16px; width:calc(100% - 32px); color:#000;
  box-shadow:0 2px 12px rgba(0,0,0,.08);
}
.rp-wd-label { font-size:10px; text-transform:uppercase; letter-spacing:.8px; opacity:.45; font-weight:600; }
.rp-wd-stage { font-size:14px; font-weight:600; margin:5px 0 7px; }
.rp-wd-track { height:3px; background:rgba(0,0,0,.08); border-radius:2px; overflow:hidden; }
.rp-wd-fill  { height:100%; width:0%; background:linear-gradient(90deg,#2563eb,#60a5fa); border-radius:2px; transition:width .9s ease; }
.rp-wd-status { font-size:11px; opacity:.55; margin-top:7px; }

.rp-home-indicator { position:absolute; bottom:8px; left:50%; transform:translateX(-50%); width:90px; height:4px; background:rgba(0,0,0,.25); border-radius:2px; }

/* ── MESSAGES VIEW ── */
#rp-view-messages { background:#fff; display:flex; flex-direction:column; }
#rp-thread-list { flex:1; overflow-y:auto; scrollbar-width:none; }
#rp-thread-list::-webkit-scrollbar { display:none; }

.rp-thread {
  display:flex; align-items:center; gap:12px;
  padding:11px 16px; border-bottom:1px solid rgba(0,0,0,.08);
  cursor:pointer; transition:background .12s;
}
.rp-thread:hover { background:rgba(0,0,0,.03); }

.rp-av { width:46px; height:46px; border-radius:23px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:#fff; }
.rp-ti { flex:1; min-width:0; }
.rp-tn { font-size:14px; font-weight:600; color:#000; }
.rp-tp { font-size:12px; color:rgba(0,0,0,.5); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; margin-top:2px; }
.rp-tm { display:flex; flex-direction:column; align-items:flex-end; gap:5px; }
.rp-tt { font-size:11px; color:rgba(0,0,0,.4); }
.rp-tbadge { background:#2563eb; color:#fff; font-size:10px; font-weight:700; min-width:19px; height:19px; border-radius:10px; padding:0 5px; display:flex; align-items:center; justify-content:center; }

/* ── THREAD VIEW ── */
#rp-view-thread { background:#fff; display:flex; flex-direction:column; }

/* bubbles */
#rp-bubbles { flex:1; overflow-y:auto; padding:10px; display:flex; flex-direction:column; gap:3px; scrollbar-width:none; }
#rp-bubbles::-webkit-scrollbar { display:none; }

/* FIX3: 待发消息队列预览 */
#rp-pending-queue {
  padding:6px 12px 4px;
  display:flex; flex-direction:column; gap:3px;
  flex-shrink:0;
  max-height:76px; overflow-y:auto;
  border-top:1px solid rgba(37,99,235,.15);
  background:rgba(37,99,235,.04);
  scrollbar-width:none;
}
#rp-pending-queue::-webkit-scrollbar { display:none; }
.rp-pending-item {
  font-size:11px; color:#1d4ed8;
  background:rgba(37,99,235,.1);
  border-radius:8px; padding:3px 10px;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.rp-pending-hint {
  font-size:10px; color:rgba(0,0,0,.35);
  text-align:center; padding:1px 0 2px;
}

.rp-bwrap { display:flex; flex-direction:column; gap:2px; }
.rp-out { align-items:flex-end; }
.rp-in  { align-items:flex-start; }
.rp-bubble { max-width:72%; padding:9px 13px; border-radius:19px; font-size:13px; line-height:1.45; word-break:break-word; }
.rp-sent { background:#2563eb; color:#fff; border-bottom-right-radius:5px; }
.rp-recv { background:#e9ecef; color:#000; border-bottom-left-radius:5px; }
.rp-bts  { font-size:10px; color:rgba(0,0,0,.4); padding:0 4px; }

/* composer */
#rp-composer {
  display:flex !important;
  align-items:center !important;
  gap:8px !important;
  padding:8px 12px 22px !important;
  border-top:1px solid rgba(0,0,0,.08) !important;
  flex-shrink:0 !important;
  background:#fff !important;
}
#rp-input {
  flex:1 !important;
  background:rgba(0,0,0,.04) !important;
  border:1px solid rgba(0,0,0,.12) !important;
  border-radius:22px !important;
  padding:9px 16px !important;
  color:#000 !important;
  font-size:13px !important;
  outline:none !important;
  font-family:inherit !important;
  min-width:0 !important;
  box-sizing:border-box !important;
}
#rp-input::placeholder { color:rgba(0,0,0,.4); }

/* ✅ FIX2: 强制显示发送按钮，防止 SillyTavern 全局 CSS 覆盖 */
#rp-send {
  width:32px !important;
  height:32px !important;
  min-width:32px !important;
  border-radius:16px !important;
  background:#2563eb !important;
  border:none !important;
  color:#fff !important;
  font-size:16px !important;
  font-weight:700 !important;
  cursor:pointer !important;
  display:flex !important;
  align-items:center !important;
  justify-content:center !important;
  flex-shrink:0 !important;
  transition:opacity .15s;
  visibility:visible !important;
  opacity:1 !important;
  pointer-events:auto !important;
  padding:0 !important;
  margin:0 !important;
  line-height:1 !important;
  box-shadow:none !important;
  outline:none !important;
}
#rp-send:hover { opacity:.82 !important; }

/* ── NAV BAR (共用) ── */
.rp-nav-bar {
  height:92px; padding-top:46px; flex-shrink:0;
  display:flex; align-items:center; justify-content:space-between;
  padding-left:6px; padding-right:16px;
  border-bottom:1px solid rgba(0,0,0,.08);
  background:#fff;
}
.rp-nav-title { font-size:17px; font-weight:600; color:#000; }
.rp-back {
  background:none !important; border:none !important;
  color:#2563eb !important; font-size:30px !important;
  line-height:1 !important; cursor:pointer !important;
  padding:0 6px !important; font-family:inherit !important;
  display:inline-flex !important; visibility:visible !important;
  opacity:1 !important; pointer-events:auto !important;
}
.rp-nav-add {
  background:none !important; border:none !important;
  color:#2563eb !important; font-size:28px !important;
  line-height:1 !important; cursor:pointer !important;
  padding:0 6px !important; font-family:inherit !important;
  font-weight:300 !important; display:inline-flex !important;
  visibility:visible !important; opacity:1 !important;
  pointer-events:auto !important;
}
.rp-thread-hd { display:flex; flex-direction:column; align-items:center; gap:4px; }
.rp-hd-av { width:32px; height:32px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff; }
.rp-hd-name { font-size:11px; color:rgba(0,0,0,.6); }

/* ── ADD CONTACT MODAL ── */
/* ✅ FIX3: modal 已移至 #rp-screen 内部，position:absolute; inset:0 现在正确覆盖手机屏幕 */
#rp-add-modal {
  position:absolute; inset:0; z-index:600;
  background:rgba(0,0,0,.4); backdrop-filter:blur(8px);
  display:flex; align-items:center; justify-content:center;
  padding:20px;
}
#rp-add-form {
  background:#fff; border-radius:18px;
  padding:20px; width:100%; max-width:240px;
  box-shadow:0 12px 40px rgba(0,0,0,.3);
}
#rp-add-form h3 {
  margin:0 0 16px; font-size:18px; font-weight:600; color:#000; text-align:center;
}
#rp-add-form input {
  width:100%; padding:10px 12px; margin-bottom:12px;
  border:1px solid rgba(0,0,0,.15); border-radius:10px;
  font-size:14px; font-family:inherit; color:#000;
  background:rgba(0,0,0,.02); outline:none; box-sizing:border-box;
}
#rp-add-form input::placeholder { color:rgba(0,0,0,.4); }
#rp-add-btns {
  display:flex; gap:10px; margin-top:16px;
}
#rp-add-btns button {
  flex:1 !important; padding:10px !important; border:none !important; border-radius:10px !important;
  font-size:14px !important; font-weight:600 !important; cursor:pointer !important;
  font-family:inherit !important; transition:opacity .15s;
  display:flex !important; align-items:center !important; justify-content:center !important;
  visibility:visible !important; opacity:1 !important; pointer-events:auto !important;
}
#rp-add-btns button:hover { opacity:.8 !important; }
#rp-add-cancel { background:#e9ecef !important; color:#000 !important; }
#rp-add-confirm { background:#2563eb !important; color:#fff !important; }

/* ── NOTIFICATION BANNER ── */
#rp-notif-banner {
  position:absolute; top:52px; left:10px; right:10px;
  background:rgba(255,255,255,.95); backdrop-filter:blur(24px);
  border:1px solid rgba(0,0,0,.08); border-radius:15px;
  padding:11px 13px; display:flex; align-items:center; gap:10px;
  z-index:500; box-shadow:0 6px 24px rgba(0,0,0,.2);
  transform:translateY(-130%); transition:transform .38s cubic-bezier(.34,1.56,.64,1);
}
#rp-notif-banner.rp-nb-in { transform:translateY(0); }
.rp-nb-ico { font-size:22px; flex-shrink:0; }
.rp-nb-body { flex:1; min-width:0; }
.rp-nb-from { font-size:11px; font-weight:600; color:rgba(0,0,0,.5); }
.rp-nb-text { font-size:13px; color:#000; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.rp-nb-time { font-size:11px; color:rgba(0,0,0,.4); align-self:flex-start; flex-shrink:0; }

/* ── home indicator ── */
#rp-home-ind { position:absolute; bottom:7px; left:50%; transform:translateX(-50%); width:90px; height:4px; background:rgba(0,0,0,.25); border-radius:2px; z-index:300; }
/* dark mode toggle is now an app icon on home screen */
/* ── DARK FRAME ── */
.rp-dark #rp-frame{background:linear-gradient(160deg,#1e1e1e,#101010);box-shadow:0 0 0 1.5px rgba(255,255,255,.06),0 0 0 9px #0c0c0c,0 0 0 10px rgba(255,255,255,.04),0 36px 80px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.06)}
.rp-dark .rp-btn{background:#2c2c2c}
.rp-dark #rp-screen{background:#050508}
.rp-dark #rp-island{background:#0a0a0a}
/* ── DARK LOCK ── */
.rp-dark .rp-lock-bg{background:radial-gradient(ellipse 120% 80% at 30% 15%,rgba(80,60,200,.35),transparent 55%),radial-gradient(ellipse 100% 80% at 80% 85%,rgba(40,60,200,.25),transparent 55%),linear-gradient(180deg,#0c0c1a,#08080f,#0c0c1a)}
.rp-dark .rp-lock-body{color:#e0e2f0}
.rp-dark #rp-lock-time{color:#eef0ff}
.rp-dark #rp-lock-date{color:rgba(200,210,255,.55)}
.rp-dark .rp-ln{background:rgba(12,12,24,.88);border-color:rgba(255,255,255,.07)}
.rp-dark .rp-ln-type{color:rgba(160,175,255,.45)}
.rp-dark .rp-ln-text{color:rgba(210,218,255,.85)}
.rp-dark #rp-swipe-hint{color:rgba(180,195,255,.3)}
.rp-dark #rp-sbar{color:#dde0f2}
/* ── DARK HOME ── */
.rp-dark .rp-home-bg{background:radial-gradient(ellipse 100% 70% at 20% 10%,rgba(50,60,140,.38),transparent 50%),radial-gradient(ellipse 100% 70% at 80% 90%,rgba(30,50,130,.28),transparent 50%),linear-gradient(170deg,#0c0c1a,#090912,#0c0c1a)}
.rp-dark #rp-home-clock{color:#eef0ff}
.rp-dark .rp-app-lbl{color:rgba(210,218,255,.88);text-shadow:0 1px 3px rgba(0,0,0,.7)}
.rp-dark .rp-app-ico{box-shadow:0 2px 10px rgba(0,0,0,.5)}
.rp-dark .rp-app-off{opacity:.2}
.rp-dark #rp-widget{background:rgba(12,12,24,.78);border-color:rgba(255,255,255,.07);box-shadow:0 2px 12px rgba(0,0,0,.4)}
.rp-dark .rp-wd-label{color:rgba(160,175,255,.4)}
.rp-dark .rp-wd-stage{color:#dde0f2}
.rp-dark .rp-wd-track{background:rgba(255,255,255,.1)}
.rp-dark .rp-wd-status{color:rgba(160,175,255,.52)}
.rp-dark .rp-home-indicator{background:rgba(255,255,255,.22)}
/* ── DARK MESSAGES ── */
.rp-dark #rp-view-messages{background:#07070e}
.rp-dark .rp-thread{border-bottom-color:rgba(255,255,255,.05)}
.rp-dark .rp-thread:hover{background:rgba(255,255,255,.03)}
.rp-dark .rp-tn{color:#dde0f2}
.rp-dark .rp-tp{color:rgba(160,175,255,.46)}
.rp-dark .rp-tt{color:rgba(160,175,255,.36)}
.rp-dark .rp-nav-bar{background:#0c0c1a;border-bottom-color:rgba(255,255,255,.07)}
.rp-dark .rp-nav-title{color:#dde0f2}
.rp-dark .rp-back{color:#7090f0 !important}
.rp-dark .rp-nav-add{color:#7090f0 !important}
.rp-dark .rp-hd-name{color:rgba(160,175,255,.62)}
/* ── DARK THREAD ── */
.rp-dark #rp-view-thread{background:#050510}
.rp-dark #rp-bubbles{background:#050510}
.rp-dark .rp-recv{background:#161628;color:#dde0f2}
.rp-dark .rp-bts{color:rgba(160,175,255,.3)}
.rp-dark #rp-composer{background:#0c0c1a !important;border-top-color:rgba(255,255,255,.06) !important}
.rp-dark #rp-input{background:rgba(255,255,255,.05) !important;border-color:rgba(255,255,255,.1) !important;color:#dde0f2 !important}
.rp-dark #rp-input::placeholder{color:rgba(160,175,255,.3)}
.rp-dark #rp-pending-queue{background:rgba(37,99,235,.05);border-top-color:rgba(37,99,235,.1)}
.rp-dark .rp-pending-item{color:#8aaef0;background:rgba(37,99,235,.12)}
.rp-dark .rp-pending-hint{color:rgba(160,175,255,.3)}
.rp-dark #rp-add-form{background:#12122a}
.rp-dark #rp-add-form h3{color:#dde0f2}
.rp-dark #rp-add-form input{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-dark #rp-add-cancel{background:#1c1c38 !important;color:#dde0f2 !important}
.rp-dark #rp-notif-banner{background:rgba(8,8,20,.95);border-color:rgba(255,255,255,.08)}
.rp-dark .rp-nb-from{color:rgba(160,175,255,.5)}
.rp-dark .rp-nb-text{color:#dde0f2}
.rp-dark .rp-nb-time{color:rgba(160,175,255,.36)}
.rp-dark #rp-home-ind{background:rgba(255,255,255,.22)}
/* ── MOMENTS VIEW ── */
#rp-view-moments{background:#f2f3f7;display:flex;flex-direction:column}
.rp-dark #rp-view-moments{background:#050510}
#rp-moments-list{flex:1;overflow-y:auto;scrollbar-width:none;padding-bottom:8px}
#rp-moments-list::-webkit-scrollbar{display:none}
.rp-moment{background:#fff;margin-bottom:8px;padding:14px 16px}
.rp-dark .rp-moment{background:#0e0e20}
.rp-moment-hd{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.rp-moment-av{width:42px;height:42px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}
.rp-moment-meta{flex:1;min-width:0}
.rp-moment-name{font-size:14px;font-weight:700;color:#2563eb}
.rp-dark .rp-moment-name{color:#8aaef0}
.rp-moment-time{font-size:10.5px;color:rgba(0,0,0,.38);margin-top:2px;font-weight:600}
.rp-dark .rp-moment-time{color:rgba(160,175,255,.38)}
.rp-moment-text{font-size:14px;color:#1a1a1a;line-height:1.65;margin-bottom:10px;word-break:break-word}
.rp-dark .rp-moment-text{color:#d5d8f0}
.rp-moment-bar{display:flex;align-items:center;justify-content:flex-end;gap:2px;padding:6px 0 2px;border-top:1px solid rgba(0,0,0,.06)}
.rp-dark .rp-moment-bar{border-top-color:rgba(255,255,255,.06)}
.rp-moment-act{display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:8px;font-size:12px;font-weight:600;color:rgba(0,0,0,.42);cursor:pointer;transition:background .12s,color .12s;border:none;background:none;font-family:inherit}
.rp-dark .rp-moment-act{color:rgba(160,175,255,.42)}
.rp-moment-act:hover{background:rgba(0,0,0,.04)}
.rp-dark .rp-moment-act:hover{background:rgba(255,255,255,.04)}
.rp-moment-act.rp-liked{color:#e53e3e !important}
.rp-moment-comments-wrap{background:rgba(0,0,0,.03);border-radius:10px;padding:8px 12px;margin-top:8px;display:flex;flex-direction:column;gap:5px}
.rp-dark .rp-moment-comments-wrap{background:rgba(255,255,255,.04)}
.rp-moment-comment{font-size:13px;color:#222;line-height:1.55}
.rp-dark .rp-moment-comment{color:#c0c8e8}
.rp-moment-cname{color:#2563eb;font-weight:700}
.rp-dark .rp-moment-cname{color:#8aaef0}
.rp-moment-reply-btn{color:rgba(0,0,0,.35);font-size:11px;cursor:pointer;margin-left:6px}
.rp-dark .rp-moment-reply-btn{color:rgba(160,175,255,.35)}
.rp-moment-input-row{display:flex;gap:6px;margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,0,0,.06)}
.rp-dark .rp-moment-input-row{border-top-color:rgba(255,255,255,.06)}
.rp-moment-cinput{flex:1;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:6px 10px;font-size:12.5px;color:#1a1a1a;font-family:inherit;outline:none}
.rp-dark .rp-moment-cinput{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#d5d8f0}
.rp-moment-csend{background:#2563eb;color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;flex-shrink:0}
.rp-moment-csend:hover{opacity:.85}
.rp-moments-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;color:rgba(0,0,0,.3);font-size:13px;gap:8px}
.rp-dark .rp-moments-empty{color:rgba(160,175,255,.3)}

/* ── AVATAR IMAGES ── */
.rp-av-img,.rp-moment-av.rp-av-img{overflow:hidden;padding:0}
.rp-av-photo{width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit}
/* ── SETTINGS VIEW ── */
#rp-view-settings{background:#f2f3f7;display:flex;flex-direction:column;overflow-y:auto}
.rp-dark #rp-view-settings{background:#060610}
.rp-set-section{background:#fff;border-radius:12px;margin:10px 12px 0;padding:0 14px;overflow:hidden}
.rp-dark .rp-set-section{background:rgba(255,255,255,.04)}
.rp-set-section-title{font-size:11.5px;font-weight:600;color:#8a8a9a;text-transform:uppercase;letter-spacing:.04em;margin:14px 12px 4px;padding:0}
.rp-dark .rp-set-section-title{color:#6a6a7a}
.rp-set-row{display:flex;align-items:center;padding:11px 0;border-bottom:1px solid rgba(0,0,0,.06);gap:10px;min-height:44px}
.rp-dark .rp-set-row{border-bottom-color:rgba(255,255,255,.05)}
.rp-set-row:last-child{border-bottom:none}
.rp-set-key{font-size:14px;color:#1a1a2e;flex:1}
.rp-dark .rp-set-key{color:#c8cce8}
.rp-set-select{font-size:13px;color:#3a3a5e;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:4px 8px;font-family:inherit;max-width:140px;outline:none}
.rp-dark .rp-set-select{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.1);color:#c0c4e0}
.rp-avatar-upload-btn{font-size:12.5px;color:#2563eb;background:rgba(37,99,235,.08);border:1px solid rgba(37,99,235,.18);border-radius:8px;padding:5px 10px;cursor:pointer;flex-shrink:0;display:inline-flex;align-items:center}
.rp-dark .rp-avatar-upload-btn{color:#7090f0;background:rgba(112,144,240,.12);border-color:rgba(112,144,240,.2)}
.rp-set-avatar-preview{width:38px;height:38px;border-radius:19px;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff}

/* ── COMPOSE MODAL ── */
#rp-compose-modal{position:absolute;inset:0;z-index:700;background:#f2f3f7;display:flex;flex-direction:column}
.rp-dark #rp-compose-modal{background:#06060e}
.rp-compose-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px}
#rp-compose-text{width:100%;min-height:80px;border:none;background:transparent;font-size:15px;color:#1a1a1a;resize:none;outline:none;font-family:inherit;line-height:1.65;box-sizing:border-box}
.rp-dark #rp-compose-text{color:#dde0f2}
.rp-compose-sep{height:1px;background:rgba(0,0,0,.08);margin:0 -16px}
.rp-dark .rp-compose-sep{background:rgba(255,255,255,.06)}
.rp-compose-cancel{background:none !important;border:none !important;color:rgba(0,0,0,.5) !important;font-size:14px !important;font-weight:400 !important;cursor:pointer !important;padding:0 6px !important;font-family:inherit !important;display:inline-flex !important;align-items:center !important;visibility:visible !important;opacity:1 !important;pointer-events:auto !important}
.rp-dark .rp-compose-cancel{color:rgba(180,190,255,.55) !important}
.rp-compose-post-btn{background:none !important;border:none !important;color:#2563eb !important;font-size:15px !important;font-weight:700 !important;cursor:pointer !important;padding:0 10px !important;font-family:inherit !important;display:inline-flex !important;align-items:center !important;visibility:visible !important;opacity:1 !important;pointer-events:auto !important}
.rp-dark .rp-compose-post-btn{color:#7090f0 !important}
/* ── MOMENT IMAGE ── */
.rp-moment-img-wrap{margin-bottom:10px;border-radius:8px;overflow:hidden;max-width:180px}
.rp-moment-img{width:100%;display:block;border-radius:8px}
/* ── MOMENTS send button fix ── */
.rp-moment-input-row{display:flex;gap:6px;margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,0,0,.06);align-items:center}
.rp-dark .rp-moment-input-row{border-top-color:rgba(255,255,255,.06)}
.rp-moment-cinput{flex:1;min-width:0;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:6px 10px;font-size:12.5px;color:#1a1a1a;font-family:inherit;outline:none}
.rp-dark .rp-moment-cinput{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#d5d8f0}
.rp-moment-csend{flex-shrink:0;background:#2563eb !important;color:#fff !important;border:none !important;border-radius:8px !important;padding:6px 12px !important;font-size:12px !important;font-weight:700 !important;cursor:pointer !important;font-family:inherit !important;display:inline-flex !important;align-items:center !important;visibility:visible !important;opacity:1 !important;pointer-events:auto !important}
.rp-moment-csend:hover{opacity:.85 !important}

/* ── INCOMING CALL OVERLAY ── */
#rp-call-overlay{position:absolute;top:0;right:0;bottom:0;left:0;z-index:800;background:linear-gradient(180deg,#0d0d1a,#1a1a2e);display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:60px 20px 50px}
.rp-call-av{width:88px;height:88px;border-radius:44px;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:700;color:#fff;margin-bottom:14px;animation:rp-cpulse 1.8s ease-in-out infinite}
@keyframes rp-cpulse{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,.08),0 0 0 14px rgba(255,255,255,.04)}60%{box-shadow:0 0 0 14px rgba(255,255,255,.1),0 0 0 28px rgba(255,255,255,.04)}}
.rp-call-name{font-size:24px;font-weight:700;color:#fff;letter-spacing:.01em;text-align:center}
.rp-call-sub{font-size:13px;color:rgba(255,255,255,.45);margin-top:6px;text-align:center}
.rp-call-btns{display:flex;gap:56px;align-items:flex-start}
.rp-call-btn-wrap{display:flex;flex-direction:column;align-items:center;gap:8px}
.rp-call-dec{width:64px;height:64px;border-radius:32px;background:#e53935;display:flex;align-items:center;justify-content:center;font-size:26px;cursor:pointer;box-shadow:0 6px 24px rgba(229,57,53,.45);transition:transform .15s}
.rp-call-dec:active{transform:scale(.92)}
.rp-call-ans{width:64px;height:64px;border-radius:32px;background:#43a047;display:flex;align-items:center;justify-content:center;font-size:26px;cursor:pointer;box-shadow:0 6px 24px rgba(67,160,71,.45);transition:transform .15s}
.rp-call-ans:active{transform:scale(.92)}
.rp-call-lbl{font-size:11px;color:rgba(255,255,255,.45)}
/* ── CALL RECORD ── */
.rp-sys-msg{display:flex;justify-content:center;margin:8px 0}
.rp-call-rec{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;background:rgba(0,0,0,.04);color:rgba(0,0,0,.4)}
.rp-dark .rp-call-rec{background:rgba(255,255,255,.06);color:rgba(255,255,255,.35)}
.rp-call-rec.missed{color:#e53935;background:rgba(229,57,53,.07)}
/* ── HONGBAO ── */
.rp-hongbao{background:linear-gradient(145deg,#c62828,#b71c1c);border-radius:16px;overflow:hidden;cursor:pointer;box-shadow:0 4px 20px rgba(183,28,28,.4);width:200px;user-select:none;transition:opacity .2s}
.rp-hb-top{padding:14px 16px 12px;display:flex;align-items:center;gap:12px}
.rp-hb-ico{width:44px;height:44px;border-radius:22px;background:rgba(255,213,79,.18);border:1.5px solid rgba(255,213,79,.4);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.rp-hb-info{flex:1;min-width:0}
.rp-hb-from{font-size:13px;font-weight:700;color:#fff;margin-bottom:3px}
.rp-hb-note{font-size:11.5px;color:rgba(255,255,255,.65);line-height:1.35}
.rp-hb-bot{background:rgba(0,0,0,.22);padding:9px 16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px}
.rp-hb-action{font-size:13px;font-weight:700;color:#ffd54f;letter-spacing:.02em}
.rp-hb-tag{font-size:10.5px;color:rgba(255,213,79,.5)}
.rp-hongbao.opened{cursor:default}
.rp-hongbao.opened .rp-hb-top{background:rgba(0,0,0,.1)}
.rp-hb-amount{font-size:26px;font-weight:900;color:#ffd54f;text-align:center;padding:6px 0 2px;letter-spacing:.02em;width:100%}
.rp-hb-amount small{font-size:14px;font-weight:600}
/* ── VOICE MESSAGE ── */
.rp-voice-wrap{display:flex;flex-direction:column;gap:0}
.rp-voice-bbl{display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(0,0,0,.05);border-radius:14px;cursor:pointer;min-width:150px;transition:background .15s}
.rp-dark .rp-voice-bbl{background:rgba(255,255,255,.07)}
.rp-voice-bbl:active{background:rgba(0,0,0,.09)}
.rp-voice-play{width:30px;height:30px;border-radius:15px;background:#2563eb;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;color:#fff;transition:background .2s}
.rp-voice-bbl.played .rp-voice-play{background:#94a3b8}
.rp-wave{flex:1;display:flex;align-items:center;gap:2px;height:22px}
.rp-wb{width:3px;border-radius:2px;background:rgba(37,99,235,.65)}
.rp-voice-bbl:not(.played) .rp-wb{animation:rp-wv 1.3s ease-in-out infinite}
.rp-voice-bbl.played .rp-wb{animation:none;opacity:.3}
@keyframes rp-wv{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
.rp-wb:nth-child(2){animation-delay:.07s}.rp-wb:nth-child(3){animation-delay:.14s}.rp-wb:nth-child(4){animation-delay:.21s}.rp-wb:nth-child(5){animation-delay:.28s}.rp-wb:nth-child(6){animation-delay:.14s}.rp-wb:nth-child(7){animation-delay:.07s}
.rp-voice-dur{font-size:11.5px;color:rgba(0,0,0,.4);flex-shrink:0}
.rp-dark .rp-voice-dur{color:rgba(255,255,255,.35)}
.rp-voice-txt{font-size:13px;color:#333;line-height:1.65;padding:8px 14px 2px;display:none}
.rp-dark .rp-voice-txt{color:#c8cce8}
.rp-voice-bbl.played~.rp-voice-txt{display:block}
/* ── GROUP CHAT ── */
.rp-bwrap.rp-in.rp-grp{flex-direction:row;align-items:flex-start;gap:8px}
.rp-bwrap.rp-out.rp-grp{flex-direction:row-reverse;align-items:flex-start;gap:8px}
.rp-bwrap.rp-grp>div:not(.rp-grp-av){flex:1;min-width:0}
.rp-bwrap.rp-grp .rp-bubble{max-width:100%}
.rp-grp-sender{font-size:11px;font-weight:700;color:rgba(0,0,0,.45);margin-bottom:3px}
.rp-dark .rp-grp-sender{color:rgba(255,255,255,.4)}
.rp-grp-av{width:34px;height:34px;border-radius:17px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0;margin-top:2px;overflow:hidden}

/* ── ATTACH PANEL ── */
#rp-attach-btn{width:30px;height:30px;border-radius:15px;background:rgba(0,0,0,.07);border:none;font-size:18px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#555;transition:background .15s}
#rp-attach-btn:active{background:rgba(0,0,0,.13)}
.rp-dark #rp-attach-btn{background:rgba(255,255,255,.1);color:#c8cce8}
#rp-attach-panel{position:absolute;bottom:100%;left:0;right:0;background:#fff;border-top:1px solid rgba(0,0,0,.08);padding:6px 0 10px;z-index:50;display:none}
.rp-dark #rp-attach-panel{background:#111128;border-top-color:rgba(255,255,255,.07)}
.rp-attach-row{display:grid;grid-template-columns:repeat(3,1fr);gap:0;padding:4px 0}
.rp-attach-item{display:flex;flex-direction:column;align-items:center;gap:7px;padding:14px 8px;cursor:pointer;font-size:12px;color:#555;font-weight:500}
.rp-dark .rp-attach-item{color:#9aa0c0}
.rp-attach-item:active{background:rgba(0,0,0,.04)}
.rp-attach-ico{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;background:rgba(0,0,0,.05)}
.rp-dark .rp-attach-ico{background:rgba(255,255,255,.07)}
.rp-hb-modal{position:absolute;top:0;right:0;bottom:0;left:0;z-index:600;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}
.rp-hb-sheet{background:#fff;border-radius:18px 18px 0 0;padding:20px 20px 32px;width:100%;box-sizing:border-box}
.rp-dark .rp-hb-sheet{background:#13132a}
.rp-hb-sheet h3{margin:0 0 16px;font-size:16px;font-weight:700;color:#222;text-align:center}
.rp-dark .rp-hb-sheet h3{color:#e0e4ff}
.rp-hb-sheet input{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px 14px;font-size:14px;outline:none;margin-bottom:10px;background:#fafafa}
.rp-dark .rp-hb-sheet input{background:#1c1c38;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-hb-send-btn{width:100%;padding:12px;background:#c62828;color:#ffd54f;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer}
.rp-hb-cancel-btn{width:100%;padding:10px;background:none;color:rgba(0,0,0,.4);border:none;font-size:13px;cursor:pointer;margin-top:4px}
.rp-dark .rp-hb-cancel-btn{color:rgba(255,255,255,.3)}
.rp-loc-card{display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(0,0,0,.04);border-radius:12px;max-width:220px}
.rp-dark .rp-loc-card{background:rgba(255,255,255,.06)}
.rp-loc-ico{font-size:22px;flex-shrink:0}
.rp-loc-txt{font-size:13px;color:#333;font-weight:500}
.rp-dark .rp-loc-txt{color:#c8cce8}
.rp-img-bbl{max-width:180px;border-radius:12px;overflow:hidden}
.rp-img-bbl img{width:100%;display:block}
/* ── ADD CHOICE ── */
.rp-add-choice{position:absolute;top:0;right:0;bottom:0;left:0;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,.35);gap:10px}
.rp-add-choice-box{background:#fff;border-radius:16px;overflow:hidden;width:80%;max-width:240px;box-shadow:0 8px 32px rgba(0,0,0,.2)}
.rp-dark .rp-add-choice-box{background:#1c1c38}
.rp-add-choice-item{padding:16px 20px;font-size:15px;font-weight:600;color:#222;cursor:pointer;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(0,0,0,.06)}
.rp-dark .rp-add-choice-item{color:#e0e4ff;border-bottom-color:rgba(255,255,255,.06)}
.rp-add-choice-item:last-child{border-bottom:none}
.rp-add-choice-item:active{background:rgba(0,0,0,.04)}
.rp-add-choice-cancel{padding:14px 20px;font-size:14px;color:rgba(0,0,0,.4);cursor:pointer;text-align:center;background:#fff;border-radius:12px;width:80%;max-width:240px;box-sizing:border-box;box-shadow:0 4px 16px rgba(0,0,0,.15)}
.rp-dark .rp-add-choice-cancel{background:#111128;color:rgba(255,255,255,.3)}
/* ── LIVE CHAT OVERLAY ── */
#rp-live-chat{position:fixed;bottom:80px;right:18px;width:280px;z-index:9990;pointer-events:none;display:flex;flex-direction:column;gap:8px;align-items:flex-end}
.rp-lc-bubble{display:flex;align-items:flex-start;gap:8px;pointer-events:auto;animation:rp-lc-in .28s cubic-bezier(.34,1.56,.64,1) both;position:relative}
@keyframes rp-lc-in{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}
.rp-lc-av{width:32px;height:32px;border-radius:16px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;overflow:hidden}
.rp-lc-body{background:rgba(20,20,40,.88);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:4px 14px 14px 14px;padding:8px 12px;max-width:208px;box-shadow:0 4px 16px rgba(0,0,0,.25)}
.rp-lc-name{font-size:10.5px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:3px}
.rp-lc-text{font-size:13px;color:#fff;line-height:1.55;word-break:break-word}
.rp-lc-dismiss{position:absolute;top:-4px;right:-4px;width:16px;height:16px;border-radius:8px;background:rgba(0,0,0,.4);color:rgba(255,255,255,.6);font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer}

/* ── ATTACH PANEL ── */
#rp-attach-btn{width:30px;height:30px;border-radius:15px;background:rgba(0,0,0,.07);border:none;font-size:18px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#555;transition:background .15s}
#rp-attach-btn:active{background:rgba(0,0,0,.13)}
.rp-dark #rp-attach-btn{background:rgba(255,255,255,.1);color:#c8cce8}
#rp-attach-panel{position:absolute;bottom:100%;left:0;right:0;background:#fff;border-top:1px solid rgba(0,0,0,.08);padding:6px 0 10px;z-index:50;display:none}
.rp-dark #rp-attach-panel{background:#111128;border-top-color:rgba(255,255,255,.07)}
.rp-attach-row{display:grid;grid-template-columns:repeat(3,1fr);gap:0;padding:4px 0}
.rp-attach-item{display:flex;flex-direction:column;align-items:center;gap:7px;padding:14px 8px;cursor:pointer;font-size:12px;color:#555;font-weight:500}
.rp-dark .rp-attach-item{color:#9aa0c0}
.rp-attach-item:active{background:rgba(0,0,0,.04)}
.rp-attach-ico{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;background:rgba(0,0,0,.05)}
.rp-dark .rp-attach-ico{background:rgba(255,255,255,.07)}
.rp-hb-modal{position:absolute;top:0;right:0;bottom:0;left:0;z-index:600;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}
.rp-hb-sheet{background:#fff;border-radius:18px 18px 0 0;padding:20px 20px 32px;width:100%;box-sizing:border-box}
.rp-dark .rp-hb-sheet{background:#13132a}
.rp-hb-sheet h3{margin:0 0 16px;font-size:16px;font-weight:700;color:#222;text-align:center}
.rp-dark .rp-hb-sheet h3{color:#e0e4ff}
.rp-hb-sheet input{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px 14px;font-size:14px;outline:none;margin-bottom:10px;background:#fafafa}
.rp-dark .rp-hb-sheet input{background:#1c1c38;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-hb-send-btn{width:100%;padding:12px;background:#c62828;color:#ffd54f;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer}
.rp-hb-cancel-btn{width:100%;padding:10px;background:none;color:rgba(0,0,0,.4);border:none;font-size:13px;cursor:pointer;margin-top:4px}
.rp-dark .rp-hb-cancel-btn{color:rgba(255,255,255,.3)}
.rp-loc-card{display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(0,0,0,.04);border-radius:12px;max-width:220px}
.rp-dark .rp-loc-card{background:rgba(255,255,255,.06)}
.rp-loc-ico{font-size:22px;flex-shrink:0}
.rp-loc-txt{font-size:13px;color:#333;font-weight:500}
.rp-loc-modal{position:absolute;inset:0;z-index:600;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}
.rp-loc-sheet{background:#fff;border-radius:18px 18px 0 0;padding:20px 20px 32px;width:100%;box-sizing:border-box}
.rp-dark .rp-loc-sheet{background:#13132a}
.rp-loc-sheet h3{margin:0 0 14px;font-size:16px;font-weight:700;color:#222;text-align:center}
.rp-dark .rp-loc-sheet h3{color:#e0e4ff}
.rp-loc-sheet input{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:12px;padding:10px 14px;font-size:14px;outline:none;background:#fafafa;margin-bottom:12px}
.rp-dark .rp-loc-sheet input{background:#1c1c38;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-loc-send-btn{width:100%;padding:12px;background:#2563eb;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer}
.rp-loc-cancel-btn{width:100%;padding:10px;background:none;border:none;color:rgba(0,0,0,.35);font-size:14px;cursor:pointer;margin-top:6px}
.rp-dark .rp-loc-cancel-btn{color:rgba(255,255,255,.3)}
.rp-dark .rp-loc-txt{color:#c8cce8}
.rp-img-bbl{max-width:180px;border-radius:12px;overflow:hidden}
.rp-img-bbl img{width:100%;display:block}
/* ── ADD CHOICE ── */
.rp-add-choice{position:absolute;top:0;right:0;bottom:0;left:0;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,.35);gap:10px}
.rp-add-choice-box{background:#fff;border-radius:16px;overflow:hidden;width:80%;max-width:240px;box-shadow:0 8px 32px rgba(0,0,0,.2)}
.rp-dark .rp-add-choice-box{background:#1c1c38}
.rp-add-choice-item{padding:16px 20px;font-size:15px;font-weight:600;color:#222;cursor:pointer;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(0,0,0,.06)}
.rp-dark .rp-add-choice-item{color:#e0e4ff;border-bottom-color:rgba(255,255,255,.06)}
.rp-add-choice-item:last-child{border-bottom:none}
.rp-add-choice-item:active{background:rgba(0,0,0,.04)}
.rp-add-choice-cancel{padding:14px 20px;font-size:14px;color:rgba(0,0,0,.4);cursor:pointer;text-align:center;background:#fff;border-radius:12px;width:80%;max-width:240px;box-sizing:border-box;box-shadow:0 4px 16px rgba(0,0,0,.15)}
.rp-dark .rp-add-choice-cancel{background:#111128;color:rgba(255,255,255,.3)}
/* ── LIVE CHAT OVERLAY ── */
#rp-live-chat{position:fixed;bottom:80px;right:18px;width:280px;z-index:9990;pointer-events:none;display:flex;flex-direction:column;gap:8px;align-items:flex-end}
.rp-lc-bubble{display:flex;align-items:flex-start;gap:8px;pointer-events:auto;animation:rp-lc-in .28s cubic-bezier(.34,1.56,.64,1) both;position:relative}
@keyframes rp-lc-in{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}
.rp-lc-av{width:32px;height:32px;border-radius:16px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;overflow:hidden}
.rp-lc-body{background:rgba(20,20,40,.88);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:4px 14px 14px 14px;padding:8px 12px;max-width:208px;box-shadow:0 4px 16px rgba(0,0,0,.25)}
.rp-lc-name{font-size:10.5px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:3px}
.rp-lc-text{font-size:13px;color:#fff;line-height:1.55;word-break:break-word}
.rp-lc-dismiss{position:absolute;top:-4px;right:-4px;width:16px;height:16px;border-radius:8px;background:rgba(0,0,0,.4);color:rgba(255,255,255,.6);font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer}

/* ── GROUP PICKER ── */
.rp-grp-pick-item{display:flex;align-items:center;gap:10px;padding:11px 16px;cursor:pointer;border-bottom:1px solid rgba(0,0,0,.04);transition:background .12s}
.rp-grp-pick-item.selected{background:rgba(37,99,235,.06)}
.rp-grp-pick-av{width:34px;height:34px;border-radius:17px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}
.rp-grp-pick-name{flex:1;font-size:14px;font-weight:500;color:#222}
.rp-dark .rp-grp-pick-name{color:#e0e4ff}
.rp-grp-pick-chk{width:22px;height:22px;border-radius:11px;border:1.5px solid rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-size:13px;color:transparent;flex-shrink:0;transition:all .15s}
.rp-grp-pick-item.selected .rp-grp-pick-chk{background:#2563eb;border-color:#2563eb;color:#fff}
.rp-grp-modal{background:#fff;border-radius:16px;overflow:hidden;width:90%;max-width:290px;box-shadow:0 8px 32px rgba(0,0,0,.2)}
.rp-dark .rp-grp-modal{background:#1c1c38}
.rp-grp-modal-hd{padding:14px 16px;font-size:15px;font-weight:700;color:#222;border-bottom:1px solid rgba(0,0,0,.06);text-align:center}
.rp-dark .rp-grp-modal-hd{color:#e0e4ff;border-bottom-color:rgba(255,255,255,.06)}
.rp-grp-name-inp{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:8px;padding:8px 12px;font-size:13px;outline:none;background:#fafafa}
.rp-dark .rp-grp-name-inp{background:#131328;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-grp-modal-ft{display:flex;border-top:1px solid rgba(0,0,0,.06)}
.rp-dark .rp-grp-modal-ft{border-top-color:rgba(255,255,255,.06)}
.rp-grp-ft-btn{flex:1;padding:12px;border:none;background:none;font-size:14px;font-weight:600;cursor:pointer}
.rp-grp-ft-cancel{color:rgba(0,0,0,.35);border-right:1px solid rgba(0,0,0,.06)}
.rp-grp-ft-ok{color:#2563eb}
.rp-dark .rp-grp-ft-cancel{color:rgba(255,255,255,.25);border-right-color:rgba(255,255,255,.06)}
/* ── CHAT BUBBLE INSET ── */
.rp-cb{display:flex;align-items:flex-start;gap:8px;margin:8px 0;clear:both}
.rp-cb-av{width:28px;height:28px;border-radius:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;overflow:hidden;margin-top:1px}
.rp-cb-av img{width:100%;height:100%;object-fit:cover}
.rp-cb-txt{background:rgba(0,0,0,.07);border-radius:3px 14px 14px 14px;padding:8px 12px;font-size:13.5px;line-height:1.6;color:#1a1a2e;max-width:78%;word-break:break-word;font-style:normal}
/* ── WALLPAPER ── */
.rp-wall-preview-img{width:100%;height:80px;border-radius:10px;object-fit:cover;display:block;border:1px solid rgba(0,0,0,.08);margin-bottom:10px}

/* FIX #3: hide terminal SMS inbox panel */
.p4{display:none!important}
/* FIX #5: attach panel - position relative to composer */
#rp-composer{position:relative}
#rp-attach-panel{position:absolute;bottom:100%;left:0;right:0;background:#fff;border-top:1px solid rgba(0,0,0,.08);padding:6px 0 10px;z-index:500;display:none;border-radius:12px 12px 0 0;box-shadow:0 -4px 20px rgba(0,0,0,.08)}
.rp-dark #rp-attach-panel{background:#111128;border-top-color:rgba(255,255,255,.07)}
/* FIX #4: wallpaper layer */
#rp-wallpaper-layer{position:absolute;top:0;right:0;bottom:0;left:0;z-index:0;background-size:cover;background-position:center;background-repeat:no-repeat;pointer-events:none}
.rp-view{z-index:1}

/* ── LUDO GAME ── */
#rp-view-game{background:#fef0f5;display:flex;flex-direction:column}
.rp-dark #rp-view-game{background:#0d080e}
#rp-game-board-wrap{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:6px 0 0;overflow:hidden;min-height:0}
#rp-ludo-canvas{border-radius:10px;max-width:260px;max-height:260px;display:block}
#rp-game-controls{display:flex;align-items:center;justify-content:space-between;padding:5px 14px;border-top:1px solid rgba(0,0,0,.08);background:#fff;flex-shrink:0;gap:8px}
.rp-dark #rp-game-controls{background:#0c0c1a;border-top-color:rgba(255,255,255,.07)}
#rp-dice-btn{width:46px;height:46px;border-radius:23px;background:linear-gradient(145deg,#ff6b8a,#e0407a);border:none;color:#fff;font-size:22px;cursor:pointer;display:flex!important;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(224,64,122,.38);transition:transform .15s;flex-shrink:0;visibility:visible!important;opacity:1!important;pointer-events:auto!important}
#rp-dice-btn:active{transform:scale(.88)}
#rp-dice-btn:disabled{opacity:.45!important;cursor:default}
.rp-game-info{flex:1;min-width:0}
.rp-game-players{font-size:11.5px;font-weight:600;color:#1a1a2e}
.rp-dark .rp-game-players{color:#c8cce8}
.rp-game-status{font-size:11px;color:#888;margin-top:1px}
.rp-dark .rp-game-status{color:#6a6a8a}
#rp-dice-face{font-size:28px;min-width:34px;text-align:center;flex-shrink:0}
#rp-game-chat{max-height:68px;overflow-y:auto;padding:6px 12px;display:flex;flex-direction:column;gap:1px;flex-shrink:0;border:1.5px solid #e0407a;border-radius:8px;margin:0 10px 4px;background:rgba(255,255,255,.9);scrollbar-width:none;cursor:pointer;transition:border-color .2s}
#rp-game-chat:hover{border-color:#ff6b8a}
.rp-dark #rp-game-chat{border-color:#e0407a;background:rgba(12,12,26,.9)}
#rp-game-chat-fs{position:absolute;top:12%;bottom:0;left:0;right:0;z-index:200;background:#fff;display:flex;flex-direction:column}
.rp-dark #rp-game-chat-fs{background:#0c0c1a}
#rp-game-chat-fs-header{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid rgba(0,0,0,.08);flex-shrink:0}
.rp-dark #rp-game-chat-fs-header{border-bottom-color:rgba(255,255,255,.07)}
#rp-game-chat-fs-title{font-size:14px;font-weight:600;color:#1a1a2e}
.rp-dark #rp-game-chat-fs-title{color:#dde0f2}
#rp-game-chat-fs-close{width:30px;height:30px;border-radius:15px;background:rgba(0,0,0,.06);border:none;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#1a1a2e;position:relative;z-index:10;pointer-events:auto}
.rp-dark #rp-game-chat-fs-close{background:rgba(255,255,255,.1);color:#dde0f2}
#rp-game-chat-fs-body{flex:1;overflow-y:auto;padding:10px 14px;display:flex;flex-direction:column;gap:4px}
#rp-game-chat-fs-body .game-msg{font-size:13px;line-height:1.6;padding:3px 0}
#rp-game-chat-fs-hint{font-size:10px;color:rgba(224,64,122,.7);text-align:center;padding:2px 0 1px;flex-shrink:0}
#rp-game-chat::-webkit-scrollbar{display:none}
.rp-dark #rp-game-chat{background:rgba(12,12,26,.9);border-top-color:rgba(255,255,255,.05)}
.game-msg{font-size:11px;line-height:1.45;padding:1px 0}
.game-msg-user{color:#e0407a;text-align:right}
.game-msg-char{color:#2563eb}
.rp-dark .game-msg-char{color:#7ab8ff}
.game-msg-sys{color:#888;text-align:center;font-style:italic}
.rp-dark .game-msg-sys{color:#666}
/* ── Square Event Popup ── */
#rp-sq-event{position:absolute;inset:0;z-index:60;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;border-radius:48px;}
#rp-sq-event-box{background:#fff;border-radius:20px;padding:20px 18px;max-width:220px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,.25);}
#rp-sq-event-sq{font-size:10px;color:#aaa;margin-bottom:6px;letter-spacing:.5px;}
#rp-sq-event-emoji{font-size:36px;margin-bottom:8px;line-height:1;}
#rp-sq-event-text{font-size:14px;font-weight:700;color:#1a1a2e;margin-bottom:8px;line-height:1.5;}
#rp-sq-event-note{font-size:10px;color:#999;margin-bottom:14px;line-height:1.4;}
#rp-sq-event-done{background:linear-gradient(135deg,#e0407a,#ff7aaa);color:#fff;border:none;border-radius:20px;padding:8px 22px;font-size:13px;cursor:pointer;font-weight:600;}
#rp-sq-event-done:active{transform:scale(.96);}
.rp-dark #rp-sq-event-box{background:#1a1a2e;color:#e0e2f0;}
.rp-dark #rp-sq-event-text{color:#e0e2f0;}
.rp-dark #rp-sq-event-sq{color:#666;}
.rp-dark #rp-sq-event-note{color:#555;}

#rp-game-input-row{display:flex;gap:6px;padding:6px 10px 22px;border-top:1px solid rgba(0,0,0,.06);background:#fff;flex-shrink:0;align-items:center}
.rp-dark #rp-game-input-row{background:#0c0c1a;border-top-color:rgba(255,255,255,.06)}
#rp-game-input{flex:1;min-width:0;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.12);border-radius:18px;padding:7px 12px;font-size:12px;font-family:inherit;color:#1a1a2e;outline:none}
.rp-dark #rp-game-input{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.1);color:#dde0f2}
#rp-game-input::placeholder{color:rgba(0,0,0,.38)}
#rp-game-send{width:28px!important;height:28px!important;min-width:28px!important;border-radius:14px!important;background:#e0407a!important;border:none!important;color:#fff!important;font-size:14px!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;padding:0!important;margin:0!important}
#rp-game-send:hover{opacity:.82!important}
#rp-game-win{position:absolute;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(5px);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:100}
.game-win-box{background:#fff;border-radius:24px;padding:26px 22px;text-align:center;max-width:220px;width:88%;box-shadow:0 16px 48px rgba(0,0,0,.25)}
.rp-dark .game-win-box{background:#16162a}
.game-win-emoji{font-size:56px;margin-bottom:8px;line-height:1}
.game-win-title{font-size:20px;font-weight:700;color:#1a1a2e;margin-bottom:6px}
.rp-dark .game-win-title{color:#eef0ff}
.game-win-sub{font-size:13px;color:#666;margin-bottom:16px;line-height:1.55}
.rp-dark .game-win-sub{color:#9090b0}
.game-win-btn{width:100%!important;padding:12px!important;background:linear-gradient(135deg,#ff6b8a,#e0407a)!important;color:#fff!important;border:none!important;border-radius:14px!important;font-size:15px!important;font-weight:700!important;cursor:pointer!important;font-family:inherit!important;display:block!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important}
.game-win-btn:hover{opacity:.88!important}
@keyframes rp-dice-roll{0%{transform:rotate(0deg) scale(1)}25%{transform:rotate(90deg) scale(1.3)}50%{transform:rotate(180deg) scale(1)}75%{transform:rotate(270deg) scale(1.3)}100%{transform:rotate(360deg) scale(1)}}
.ludo-rolling{animation:rp-dice-roll .4s ease-in-out 3}

`;

function injectStyles() {
  if (document.getElementById('rp-phone-css')) return;
  const style = document.createElement('style');
  style.id = 'rp-phone-css';
  style.textContent = RP_PHONE_CSS;
  document.head.appendChild(style);
  console.log('[Raymond Phone] CSS injected');
}

// ST extensions use global variables, not ES6 modules
const eventSource = window.eventSource || SillyTavern?.eventSource;
const event_types = window.event_types || SillyTavern?.eventTypes;
const setExtensionPrompt = window.setExtensionPrompt || SillyTavern?.setExtensionPrompt;
const extension_prompt_types = window.extension_prompt_types || SillyTavern?.extensionPromptTypes;
const getContext = window.getContext || SillyTavern?.getContext || (() => ({}));

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
  moments: [],
  wallpaper: null,
  darkMode: false,
  avatars: {},
};

// FIX2: 按 chatId 存储各窗口的手机状态（内存缓存）
const CHAT_STORE = {};

/* ── HELPER: findOrCreateThread ── */
function findOrCreateThread(nameRaw) {
  const lower = nameRaw.toLowerCase();
  for (const th of Object.values(STATE.threads)) {
    if (th.name && th.name.toLowerCase() === lower) return th;
  }
  const _colors = ['#7c3aed','#0891b2','#0d9488','#b45309','#be185d','#1d4ed8'];
  const colorIdx = Object.keys(STATE.threads).length % _colors.length;
  const tempId = `contact_${lower.replace(/\s+/g, '_')}`;
  if (!STATE.threads[tempId]) {
    STATE.threads[tempId] = {
      id: tempId, name: nameRaw,
      initials: nameRaw.slice(0, 2),
      avatarBg: `linear-gradient(145deg,${_colors[colorIdx]},${_colors[(colorIdx+1)%_colors.length]})`,
      type: 'contact', messages: [], unread: 0
    };
  }
  return STATE.threads[tempId];
}

// ================================================================
//  PERSISTENCE (localStorage)
// ================================================================
function saveState() {
  if (!STATE.chatId) return;
  try {
    // Deep-copy and strip base64 image src to avoid localStorage QuotaExceededError
    const threads = JSON.parse(JSON.stringify(STATE.threads));
    for (const th of Object.values(threads)) {
      if (th.messages) th.messages = th.messages.map(m =>
        (m.type === 'image' && m.src?.startsWith('data:')) ? { ...m, src: '__img_expired__' } : m
      );
    }
    localStorage.setItem(`rp-phone-v1-${STATE.chatId}`, JSON.stringify({
      threads,
      notifications: STATE.notifications,
      sync: STATE.sync,
      moments: STATE.moments,
      darkMode: STATE.darkMode,
      avatars: STATE.avatars || {},
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
        <div id="rp-wallpaper-layer"></div>
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
              <!-- row 1: 信息 朋友圈 夜间 -->
              <div class="rp-app" data-app="messages">
                <div class="rp-app-ico rp-ico-msg">
                  <div class="rp-badge" id="rp-main-badge" style="display:none">0</div>
                  <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="url(#mg)"/><defs><linearGradient id="mg" x1="0" y1="0" x2="40" y2="40"><stop offset="0%" stop-color="#34c759"/><stop offset="100%" stop-color="#25a244"/></linearGradient></defs><path d="M8 14a4 4 0 014-4h16a4 4 0 014 4v10a4 4 0 01-4 4H14l-4 4v-4a4 4 0 01-2-3.5V14z" fill="white"/></svg>
                </div>
                <div class="rp-app-lbl">信息</div>
              </div>
              <div class="rp-app" data-app="moments">
                <div class="rp-app-ico" style="background:linear-gradient(145deg,#3d8b65,#2d7a55)">
                  <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="url(#mcg2)"/><defs><linearGradient id="mcg2" x1="0" y1="0" x2="40" y2="40"><stop offset="0%" stop-color="#3d8b65"/><stop offset="100%" stop-color="#2d7a55"/></linearGradient></defs><circle cx="20" cy="14" r="3.5" fill="white" opacity=".9"/><rect x="10" y="20" width="20" height="2" rx="1" fill="white" opacity=".7"/><rect x="12" y="24" width="16" height="2" rx="1" fill="white" opacity=".5"/><rect x="14" y="28" width="12" height="2" rx="1" fill="white" opacity=".35"/></svg>
                </div>
                <div class="rp-app-lbl">朋友圈</div>
              </div>
              <div class="rp-app" id="rp-dm-app" data-app="darkmode">
                <div class="rp-app-ico rp-dm-ico" style="background:linear-gradient(145deg,#4a4a6a,#32324e)">🌙</div>
                <div class="rp-app-lbl" id="rp-dm-lbl">夜间</div>
              </div>
              <!-- row 2: 设置 飞行棋 占位 -->
              <div class="rp-app" data-app="settings">
                <div class="rp-app-ico" style="background:linear-gradient(145deg,#636380,#48485e)">⚙️</div>
                <div class="rp-app-lbl">设置</div>
              </div>
              <div class="rp-app" data-app="ludo">
                <div class="rp-app-ico" style="background:linear-gradient(145deg,#ff6b8a,#c0294a)">🎲</div>
                <div class="rp-app-lbl">飞行棋</div>
              </div>
              <div class="rp-app rp-app-off" style="pointer-events:none;visibility:hidden">
                <div class="rp-app-ico" style="background:rgba(0,0,0,.06)"></div>
                <div class="rp-app-lbl"></div>
              </div>
            </div>

          <!-- 格子事件弹窗 -->
          <div id="rp-sq-event" style="display:none">
            <div id="rp-sq-event-box">
              <div id="rp-sq-event-sq">第 X 格</div>
              <div id="rp-sq-event-emoji">💬</div>
              <div id="rp-sq-event-text">事件内容</div>
              <div id="rp-sq-event-note">备注</div>
              <button id="rp-sq-event-done" type="button">✅ 已完成</button>
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
            <div id="rp-attach-panel"></div>
            <button id="rp-attach-btn" type="button">＋</button>
            <input id="rp-input" type="text" placeholder="iMessage（回车暂存）" autocomplete="off"/>
            <button id="rp-send" type="button">↑</button>
          </div>
        </div>

        <!-- 朋友圈 -->
        <div id="rp-view-moments" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">朋友圈</span>
            <button class="rp-nav-add" id="rp-moments-add" title="发朋友圈">+</button>
          </div>
          <div id="rp-moments-list"></div>
        </div>

        <!-- 发朋友圈 -->
        <div id="rp-compose-modal" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" id="rp-compose-cancel" style="font-size:14px;color:#2563eb !important">取消</button>
            <span class="rp-nav-title">发朋友圈</span>
            <button class="rp-compose-post-btn" id="rp-compose-post">发布</button>
          </div>
          <div class="rp-compose-body">
            <textarea id="rp-compose-text" placeholder="这一刻的想法…" rows="4"></textarea>
          </div>
        </div>

        <div style="display:none">
        </div>

                <!-- 设置 -->
        <div id="rp-view-settings" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">设置</span>
            <span></span>
          </div>
          <div style="overflow-y:auto;flex:1">
            <div class="rp-set-section-title">头像管理</div>
            <div class="rp-set-section">
              <div class="rp-set-row">
                <span class="rp-set-key">修改对象</span>
                <select id="rp-avatar-select" class="rp-set-select">
                  <option value="user">我（User）</option>
                </select>
              </div>
              <div class="rp-set-row">
                <div id="rp-avatar-preview-swatch" class="rp-set-avatar-preview" style="background:linear-gradient(145deg,#64748b,#475569)">我</div>
                <span class="rp-set-key" style="font-size:12px;color:#8a8a9a">点击右侧上传图片</span>
                <label class="rp-avatar-upload-btn" for="rp-avatar-file-input">📷 选择</label>
                <input type="file" id="rp-avatar-file-input" accept="image/*" style="display:none">
              </div>
            </div>

            <div class="rp-set-section-title">壁纸管理</div>
            <div class="rp-set-section">
              <div class="rp-set-row" style="flex-direction:column;align-items:stretch;gap:8px">
                <img id="rp-wall-preview" class="rp-wall-preview-img" style="display:none" alt=""/>
                <div style="display:flex;gap:8px">
                  <button id="rp-wall-upload" class="rp-set-upload-btn" style="flex:1">📷 上传壁纸</button>
                  <button id="rp-wall-reset"  class="rp-set-upload-btn" style="flex:1;background:rgba(0,0,0,.06);color:#555">恢复默认</button>
                </div>
                <input id="rp-wall-file" type="file" accept="image/*" style="display:none"/>
              </div>
            </div>
          </div>
        </div>

        <!-- 飞行棋 -->
        <div id="rp-view-game" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">🎲 飞行棋</span>
            <span></span>
          </div>
          <div id="rp-game-board-wrap">
            <canvas id="rp-ludo-canvas" width="260" height="260"></canvas>
          </div>
          <div id="rp-game-controls">
            <div class="rp-game-info">
              <div class="rp-game-players">❤️ 你 vs 💙 <span id="rp-game-char-name">对方</span></div>
              <div class="rp-game-status" id="rp-game-status-text">按骰子开始！</div>
            </div>
            <button id="rp-dice-btn" type="button" title="掷骰子">🎲</button>
            <div id="rp-dice-face"></div>
          </div>
          <div id="rp-game-chat-hint" style="font-size:9.5px;color:rgba(224,64,122,.65);text-align:right;padding:0 14px 1px;flex-shrink:0">点击展开 ↗</div>
          <div id="rp-game-chat"></div>
          <div id="rp-game-input-row">
            <input id="rp-game-input" type="text" placeholder="游戏中聊天..." autocomplete="off"/>
            <button id="rp-game-send" type="button">↑</button>
          </div>
          <div id="rp-game-win" style="display:none">
            <div class="game-win-box">
              <div class="game-win-emoji" id="game-win-emoji">🎉</div>
              <div class="game-win-title" id="game-win-title">恭喜你赢了！</div>
              <div class="game-win-sub" id="game-win-sub">你率先抵达终点，赢得了这场飞行棋！</div>
              <button class="game-win-btn" id="game-restart-btn" type="button">再来一局</button>
            </div>
          </div>
          <!-- 全屏聊天记录 -->
          <div id="rp-game-chat-fs" style="display:none">
            <div id="rp-game-chat-fs-header">
              <span id="rp-game-chat-fs-title">💬 游戏聊天记录</span>
              <button id="rp-game-chat-fs-close" type="button">✕</button>
            </div>
            <div id="rp-game-chat-fs-body"></div>
          </div>
        </div>

        <!-- 来电遮罩 -->
        <div id="rp-call-overlay" style="display:none"></div>

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
  // Hot-reload safety: remove stale phone element & force CSS re-inject
  const stale = document.getElementById('rp-wrapper');
  if (stale) stale.remove();
  window._rpPhoneSheet = false;

  injectStyles(); // FIX: inject CSS via JS, bypass ST extension CSS pipeline
  $('body').append(HTML);
  if (!document.getElementById('rp-live-chat')) {
    $('body').append('<div id="rp-live-chat"></div>');
  }

  // FIX2: 记录初始 chatId 并从 localStorage 恢复状态
  const ctx = getContext();
  STATE.chatId = ctx?.chatId || `char_${ctx?.characterId}` || 'default';

  const saved = loadState(STATE.chatId);
  if (saved) {
    STATE.threads = saved.threads;
    STATE.notifications = saved.notifications || [];
    STATE.sync = saved.sync || { stage: 1, progress: 0, status: '乖巧' };
    STATE.moments = saved.moments || [];
    STATE.darkMode = saved.darkMode || false;
    console.log('[Raymond Phone] 已恢复历史状态 chatId:', STATE.chatId);
  }

  if (STATE.darkMode) { $('#rp-phone').addClass('rp-dark'); $('.rp-dm-ico').text('☀️'); $('#rp-dm-lbl').text('日间'); }

  updateClock();
  setInterval(updateClock, 1000);

  bindUI();
  makeDraggable();
  renderThreadList();
  refreshWidget();
  refreshLockNotifs();

  if (eventSource && event_types) eventSource.on(event_types.MESSAGE_RECEIVED, onAIMessage);
  // FIX2: 监听聊天窗口切换
  if (eventSource && event_types) eventSource.on(event_types.CHAT_CHANGED, onChatChanged);

  go('lock'); // Explicitly reset to lock screen on every init/reload
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
      moments: JSON.parse(JSON.stringify(STATE.moments || [])),
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
    STATE.moments = JSON.parse(JSON.stringify(s.moments || []));
    STATE.avatars = Object.assign({}, s.avatars || {});
    STATE.currentThread = s.currentThread;
  } else {
    const persisted = loadState(newChatId);
    if (persisted) {
      STATE.threads = persisted.threads;
      STATE.notifications = persisted.notifications || [];
      STATE.sync = persisted.sync || { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments = persisted.moments || [];
      STATE.avatars = persisted.avatars || {};
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
  // 来电：接听 / 拒绝（事件委托）
  $(document).on('click', '#rp-call-ans', () => resolveCall('answered'));
  $(document).on('click', '#rp-call-dec', () => resolveCall('declined'));

  $('#rp-fab').on('click', (e) => {
    e.stopPropagation();
    $('#rp-phone').show();
  });

  // Click outside phone → close
  $(document).on('click', (e) => {
    const phone = $('#rp-phone');
    if (phone.is(':visible') && !$(e.target).closest('#rp-phone, #rp-fab').length) {
      phone.hide();
    }
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
    showAddChoice();
  });

  // Attach panel (event delegation - button lives inside dynamically built HTML)
  $(document).on('click', '#rp-attach-btn', (e) => {
    e.stopPropagation();
    toggleAttachPanel();
  });
  $(document).on('click', (e) => {
    if (!$(e.target).closest('#rp-attach-panel, #rp-attach-btn').length) {
      $('#rp-attach-panel').hide();
    }
  });

  $('#rp-add-cancel').on('click', () => {
    $('#rp-add-modal').hide();
  });

  $('#rp-add-confirm').on('click', addContact);

  $('#rp-add-modal').on('click', function (e) {
    if (e.target === this) $(this).hide();
  });

  // ── Ludo game ────────────────────────────────────────────────
  $(document).on('click', '[data-app="ludo"]', function(e) {
    e.stopPropagation();
    if (!LG.active) lgInit();
    else lgRender();
    go('game');
  });

  $(document).on('click', '#rp-dice-btn', function() {
    if (LG.turn === 'user' && !LG.rolling && LG.active) lgUserRoll();
  });

  $(document).on('click', '#rp-game-send', function() {
    const t = $('#rp-game-input').val().trim();
    if (t) { lgGameChat(t); $('#rp-game-input').val(''); }
  });

  $(document).on('keydown', '#rp-game-input', function(e) {
    if (e.key === 'Enter') {
      const t = $(this).val().trim();
      if (t) { lgGameChat(t); $(this).val(''); }
    }
  });

  $(document).on('click', '#game-restart-btn', function() {
    lgInit();
  });

  // ── 全屏查看聊天记录 ─────────────────────────────────────────
  $(document).on('click', '#rp-game-chat', function() {
    const body = document.getElementById('rp-game-chat-fs-body');
    if (!body) return;
    body.innerHTML = document.getElementById('rp-game-chat').innerHTML;
    jQuery('#rp-game-chat-fs').show();
    body.scrollTop = body.scrollHeight;
    
    // Bind close button directly (not via delegation)
    jQuery('#rp-game-chat-fs-close').off('click').on('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      jQuery('#rp-game-chat-fs').hide();
      console.log('[Ludo] Fullscreen closed');
    });
  });

  // ─────────────────────────────────────────────────────────────



  // Settings: avatar select change
  $(document).on('change', '#rp-avatar-select', function() {
    updateAvatarPreviewSwatch($(this).val());
  });

  // Settings: file input change - read image and store
  $(document).on('change', '#rp-avatar-file-input', function(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const who = $('#rp-avatar-select').val();
    const reader = new FileReader();
    reader.onload = function(ev) {
      STATE.avatars = STATE.avatars || {};
      STATE.avatars[who] = ev.target.result;
      saveState();
      updateAvatarPreviewSwatch(who);
      renderMoments();
      renderThreadList();
      if (STATE.currentView === 'thread' && STATE.currentThread) {
        openThread(STATE.currentThread);
      }
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be selected again
    $(this).val('');
  });

  // Settings app - go to settings view (override data-app handler)
  $(document).on('click', '[data-app="settings"]', function(e) {
    e.stopPropagation();
    openSettings();
  });

  // Compose moment
  $(document).on('click', '#rp-moments-add', openCompose);
  $(document).on('click', '#rp-compose-cancel, #rp-compose-modal .rp-back', closeCompose);
  $(document).on('click', '#rp-compose-post', postUserMoment);

  // 来电：接听 / 拒绝（事件委托）
  $(document).on('click', '#rp-call-ans', () => resolveCall('answered'));
  $(document).on('click', '#rp-call-dec', () => resolveCall('declined'));

  // Dark mode is handled via data-app='darkmode' in the app grid

  // Moments: like
  $(document).on('click', '.rp-like-btn', function() {
    toggleLike($(this).data('moment'));
  });

  // Moments: comment toggle
  $(document).on('click', '.rp-comment-toggle', function() {
    const id = $(this).data('moment');
    const row = $(`#rp-ci-${id}`);
    row.toggle();
    if (row.is(':visible')) {
      row.find('.rp-moment-cinput').removeData('reply-to').attr('placeholder','发表评论…').focus();
    }
  });

  // Moments: reply
  $(document).on('click', '.rp-moment-reply-btn', function() {
    const momentId = $(this).data('moment');
    const rname = $(this).data('rname');
    const row = $(`#rp-ci-${momentId}`);
    row.show();
    row.find('.rp-moment-cinput').data('reply-to', rname).attr('placeholder', `回复 ${rname}…`).focus();
  });

  // Moments: send comment via button
  $(document).on('click', '.rp-moment-csend', function() {
    const momentId = $(this).data('moment');
    const row = $(`#rp-ci-${momentId}`);
    const input = row.find('.rp-moment-cinput');
    const text = input.val().trim();
    const replyTo = input.data('reply-to') || null;
    if (!text) return;
    sendMomentComment(momentId, text, replyTo);
    input.val('').removeData('reply-to').attr('placeholder','发表评论…');
    row.hide();
  });

  // Moments: send comment via enter
  $(document).on('keydown', '.rp-moment-cinput', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const momentId = $(this).closest('.rp-moment').data('mid');
      const text = $(this).val().trim();
      const replyTo = $(this).data('reply-to') || null;
      if (!text) return;
      sendMomentComment(momentId, text, replyTo);
      $(this).val('').removeData('reply-to').attr('placeholder','发表评论…');
      $(`#rp-ci-${momentId}`).hide();
    }
  });


  // ── 添加联系人 / 创建群聊 choice overlay (event delegation) ──
  $(document).on('click', '#rp-add-choice .rp-add-choice-item', function(e) {
    e.stopPropagation();
    const action = $(this).data('action');
    $('#rp-add-choice').remove();
    if (action === 'contact') {
      $('#rp-add-name').val('');
      $('#rp-add-initials').val('');
      $('#rp-add-modal').show();
    } else if (action === 'group') {
      showGroupPicker();
    }
  });
  $(document).on('click', '#rp-add-choice .rp-add-choice-cancel', (e) => {
    e.stopPropagation();
    $('#rp-add-choice').remove();
  });
  $(document).on('click', '#rp-add-choice', function(e) {
    if (e.target === this) $('#rp-add-choice').remove();
  });

  // ── Group picker: toggle selection ──
  $(document).on('click', '#rp-grp-pick-list .rp-grp-pick-item', function(e) {
    e.stopPropagation();
    $(this).toggleClass('selected');
  });
  $(document).on('click', '[data-action="grp-cancel"]', () => $('#rp-grp-create').remove());
  $(document).on('click', '[data-action="grp-confirm"]', () => confirmCreateGroup());
  $(document).on('click', '#rp-grp-create', function(e) {
    if (e.target === this) $(this).remove();
  });

  // ── Wallpaper upload / reset ──
  $(document).on('click', '#rp-wall-upload', () => $('#rp-wall-file').trigger('click'));
  $(document).on('change', '#rp-wall-file', function() {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      STATE.wallpaper = e.target.result;
      saveState();
      applyWallpaper();
    };
    reader.readAsDataURL(file);
    this.value = '';
  });
  $(document).on('click', '#rp-wall-reset', () => {
    STATE.wallpaper = null;
    saveState();
    applyWallpaper();
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
    const senderLabel = lastMsg ? (lastMsg.from === 'user' ? '我' : th.name.split(' ')[0]) : '';
    const previewFull = lastMsg ? (senderLabel + '：' + lastMsg.text) : '暂无消息';
    const preview = previewFull.length > 28 ? previewFull.slice(0, 27) + '…' : previewFull;
    const time    = lastMsg ? lastMsg.time : '';
    const badgeDisplay = th.unread > 0 ? '' : 'display:none';
    const badgeCount   = th.unread;

    container.append(`
      <div class="rp-thread" data-thread="${th.id}">
        ${(()=>{const ci=STATE.avatars&&STATE.avatars[th.name];return ci?`<div class="rp-av rp-av-img"><img class="rp-av-photo" src="${ci}" alt=""/></div>`:`<div class="rp-av" style="background:${th.avatarBg}">${th.initials}</div>`;})()}
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
  if (view === 'darkmode') { toggleDarkMode(); return; }
  if (view === 'ludo') { try { if (!LG.active) lgInit(); else lgRender(); } catch(e) { console.warn('[Ludo]', e); } view = 'game'; }
  $('.rp-view').hide();
  $(`#rp-view-${view}`).show();
  $('#rp-home-ind').toggle(view !== 'lock');
  STATE.currentView = view;

  if (view === 'messages') {
    renderThreadList();
  }
  if (view === 'moments') {
    renderMoments();
  }
}

function openThread(threadId) {
  STATE.currentThread = threadId;
  const th = STATE.threads[threadId];
  if (!th) return;

  th.unread = 0;
  refreshBadges();

  const _hdImg = STATE.avatars && STATE.avatars[th.name];
  if (_hdImg) {
    $('#rp-hd-av').empty().append(`<img class="rp-av-photo" src="${_hdImg}" alt=""/>`).css('background', 'transparent');
  } else {
    $('#rp-hd-av').empty().text(th.initials).css('background', th.avatarBg);
  }
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
  const thread = STATE.threads[threadId];
  if (!thread) return;

  thread.messages.forEach(msg => {
    // ── 通话记录 ──
    if (msg.type === 'call_rec') {
      const icon = msg.result === 'answered' ? '📞' : '📵';
      const cls  = msg.result === 'missed' ? 'rp-call-rec missed' : 'rp-call-rec';
      area.append(`<div class="rp-sys-msg"><div class="${cls}">${icon} ${msg.label} · ${msg.time}</div></div>`);
      return;
    }
    // ── 红包 ──
    if (msg.type === 'hongbao') {
      const openedHtml = msg.opened
        ? `<div class="rp-hb-amount"><small>¥</small>${escHtml(msg.amount)}</div>` : '';
      const wrap = $(`<div class="rp-bwrap rp-in"></div>`);
      const onclick = msg.opened ? '' : `openHongbao('${threadId}','${msg.id}')`;
      wrap.html(`
        <div class="rp-hongbao ${msg.opened?'opened':''}" ${onclick?`onclick="${onclick}"`:''}">
          <div class="rp-hb-top">
            <div class="rp-hb-ico">🧧</div>
            <div class="rp-hb-info">
              <div class="rp-hb-from">${escHtml(msg.name)}</div>
              <div class="rp-hb-note">${escHtml(msg.note||'恭喜发财')}</div>
            </div>
          </div>
          <div class="rp-hb-bot">
            <div class="rp-hb-action">${msg.opened?'已领取':'点击领取红包'}</div>
            ${openedHtml}
            <div class="rp-hb-tag">微信红包</div>
          </div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 语音消息 ──
    if (msg.type === 'voice') {
      const playedCls = msg.played ? 'played' : '';
      const heights = [35,70,55,90,45,65,30];
      const bars = heights.map(h => `<div class="rp-wb" style="height:${h}%"></div>`).join('');
      const wrap = $(`<div class="rp-bwrap rp-in"></div>`);
      wrap.html(`
        <div class="rp-voice-wrap">
          <div class="rp-voice-bbl ${playedCls}" onclick="playVoice('${threadId}','${msg.id}')">
            <div class="rp-voice-play">${msg.played?'✓':'▶'}</div>
            <div class="rp-wave">${bars}</div>
            <div class="rp-voice-dur">${escHtml(msg.duration)}</div>
          </div>
          <div class="rp-voice-txt">${msg.played?escHtml(msg.text):''}</div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 群聊消息 ──
    if (msg.type === 'group_msg') {
      const customImg = STATE.avatars && STATE.avatars[msg.name];
      const avHtml = customImg
        ? `<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${customImg}" alt=""/></div>`
        : `<div class="rp-grp-av" style="background:${msg.avatarBg}">${msg.initials}</div>`;
      const wrap = $(`<div class="rp-bwrap rp-in rp-grp"></div>`);
      wrap.html(`
        ${avHtml}
        <div>
          <div class="rp-grp-sender">${escHtml(msg.name)}</div>
          <div class="rp-bubble rp-recv">${escHtml(msg.text)}</div>
          <div class="rp-bts">${msg.time}</div>
        </div>
      `);
      area.append(wrap); return;
    }
    // ── user 发的红包 ──
    if (msg.type === 'hongbao' && msg.from === 'user') {
      const wrap = $(`<div class="rp-bwrap rp-out"></div>`);
      wrap.html(`
        <div class="rp-hongbao opened" style="cursor:default">
          <div class="rp-hb-top">
            <div class="rp-hb-ico">🧧</div>
            <div class="rp-hb-info">
              <div class="rp-hb-from">我</div>
              <div class="rp-hb-note">${escHtml(msg.note||'恭喜发财')}</div>
            </div>
          </div>
          <div class="rp-hb-bot">
            <div class="rp-hb-action">已发送</div>
            <div class="rp-hb-amount"><small>¥</small>${escHtml(msg.amount)}</div>
            <div class="rp-hb-tag">微信红包</div>
          </div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 图片 ──
    if (msg.type === 'image') {
      const isUser = msg.from === 'user';
      const wrap = $(`<div class="rp-bwrap ${isUser?'rp-out':'rp-in'}"></div>`);
      wrap.html(`
        <div class="rp-img-bbl"><img src="${msg.src}" alt="图片"/></div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 位置 ──
    if (msg.type === 'location') {
      const isUser = msg.from === 'user';
      const wrap = $(`<div class="rp-bwrap ${isUser?'rp-out':'rp-in'}"></div>`);
      wrap.html(`
        <div class="rp-loc-card">
          <div class="rp-loc-ico">📍</div>
          <div class="rp-loc-txt">${escHtml(msg.place)}</div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── user 发的红包 ──
    if (msg.type === 'hongbao' && msg.from === 'user') {
      const wrap = $(`<div class="rp-bwrap rp-out"></div>`);
      wrap.html(`
        <div class="rp-hongbao opened" style="cursor:default">
          <div class="rp-hb-top">
            <div class="rp-hb-ico">🧧</div>
            <div class="rp-hb-info">
              <div class="rp-hb-from">我</div>
              <div class="rp-hb-note">${escHtml(msg.note||'恭喜发财')}</div>
            </div>
          </div>
          <div class="rp-hb-bot">
            <div class="rp-hb-action">已发送</div>
            <div class="rp-hb-amount"><small>¥</small>${escHtml(msg.amount)}</div>
            <div class="rp-hb-tag">微信红包</div>
          </div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 图片 ──
    if (msg.type === 'image') {
      const _iu = msg.from === 'user';
      const wrap = $(`<div class="rp-bwrap ${_iu?'rp-out':'rp-in'}"></div>`);
      wrap.html(`
        <div class="rp-img-bbl"><img src="${msg.src}" alt="图片"/></div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 位置 ──
    if (msg.type === 'location') {
      const _lu = msg.from === 'user';
      const wrap = $(`<div class="rp-bwrap ${_lu?'rp-out':'rp-in'}"></div>`);
      wrap.html(`
        <div class="rp-loc-card">
          <div class="rp-loc-ico">📍</div>
          <div class="rp-loc-txt">${escHtml(msg.place)}</div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 普通消息 ──
    const isUser = msg.from === 'user';
    const isGrpThread = thread.type === 'group' || (threadId && threadId.startsWith('grp_'));
    const wrap = $('<div>').addClass('rp-bwrap ' + (isUser ? 'rp-out' : 'rp-in') + (isGrpThread ? ' rp-grp' : ''));
    if (isGrpThread && isUser) {
      const uImg = STATE.avatars && STATE.avatars['user'];
      const uAvHtml = uImg
        ? `<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${uImg}" alt=""/></div>`
        : `<div class="rp-grp-av" style="background:linear-gradient(145deg,#64748b,#475569)">我</div>`;
      const inner = $('<div>');
      inner.append($('<div>').addClass('rp-bubble rp-sent').text(msg.text));
      inner.append($('<div>').addClass('rp-bts').text(msg.time));
      wrap.append(inner, $(uAvHtml));
    } else {
      const bbl = $('<div>').addClass('rp-bubble ' + (isUser ? 'rp-sent' : 'rp-recv')).text(msg.text);
      const ts  = $('<div>').addClass('rp-bts').text(msg.time);
      wrap.append(bbl, ts);
    }
    area.append(wrap);
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

  // FIX4+FIX1: 判断联系人是否为主角，生成不同的 OOC 指令
  // 修复：mainCharName 为空时，仅将内置线程 raymond/gaspard 视为主角，避免把所有 NPC 错误归为主角
  const ctx = getContext();
  const mainCharName = ctx?.name2 || '';
  const isGroupThread = th.type === 'group' || th.id.startsWith('grp_');

  let oocText;

  if (isGroupThread) {
    // ── 群聊线程：要求 AI 用 GMSG 格式回复 ──
    const groupName = th.name;
    const memberNames = (th.members || [])
      .map(id => STATE.threads[id]?.name || id)
      .filter(Boolean);
    const memberDesc = memberNames.length ? `群成员包括：${memberNames.join('、')}。` : '';
    // 格式协议已在世界书[手机UI输出协议]中定义，OOC只传动态变量
    oocText = `[手机群聊提示：{{user}}在群聊「${groupName}」发了消息，当前时间${ts}。请按世界书手机UI协议，输出GMSG格式，GROUP字段必须为"${groupName}"，至少一条，不得沉默。]`;
  } else {
    let isMainChar;
    if (mainCharName) {
      isMainChar = th.name.toLowerCase().includes(mainCharName.toLowerCase()) ||
        mainCharName.toLowerCase().includes(th.name.toLowerCase());
    } else {
      isMainChar = (th.id === 'raymond' || th.id === 'gaspard');
    }

    if (isMainChar) {
      // 对话对象是主角：根据场景决定口头还是短信回复
      // 格式协议已在世界书中定义，OOC只传动态变量
      oocText = `[手机短信提示：${th.name}收到{{user}}的短信，当前时间${ts}。若不在同场景，按世界书手机UI协议输出SMS格式回复。]`;
    } else {
      // FIX1（加强版）: NPC联系人——明确告知 AI 此 NPC 真实存在，主角完全不知情
      const charName = mainCharName || '主角';
      // 格式协议已在世界书中定义，只保留NPC身份隔离指令
      oocText = `[叙事指令：{{user}}私下给NPC"${th.name}"发了手机短信（时间${ts}）。${charName}完全不知情，本轮不得提及此短信。请以旁白身份代写"${th.name}"的回复，按世界书手机UI协议输出SMS格式。]`;
    }
  }

  // FIX1: 用 setExtensionPrompt 注入隐藏 OOC，不在聊天框显示
  const hasExtPrompt = typeof setExtensionPrompt === 'function' && extension_prompt_types;
  console.log('[Raymond Phone] sendSMS triggered', {
    threadId: STATE.currentThread,
    threadType: th.type,
    isGroupThread,
    hasExtPrompt,
    oocText,
  });
  if (hasExtPrompt) {
    setExtensionPrompt('rp-phone-ooc', oocText, extension_prompt_types.BEFORE_PROMPT, 0, false, 0);
    console.log('[Raymond Phone] setExtensionPrompt called with BEFORE_PROMPT, depth=0');
    ta.value = mainText ? `${mainText}\n${smsLine}` : smsLine;
  } else {
    // 降级：OOC 直接写入消息（旧版 ST 兼容）
    console.warn('[Raymond Phone] setExtensionPrompt not available, falling back to inline OOC');
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
    beautifySMSInChat();
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

  const momentsRe = /<MOMENTS\s+FROM="([^"]+)"\s+TIME="([^"]+)"(?:\s+IMG="([^"]*)")?\s*>([\s\S]*?)<\/MOMENTS>/gi;
  while ((m = momentsRe.exec(block)) !== null) {
    incomingMoment(m[1].trim(), m[2].trim(), m[4].trim(), m[3] ? m[3].trim() : null);
  }

  const commentRe = /<COMMENT\s+MOMENT_ID="([^"]+)"\s+FROM="([^"]+)"\s+TIME="([^"]+)"(?:\s+REPLY_TO="([^"]*)")?\s*>([\s\S]*?)<\/COMMENT>/gi;
  while ((m = commentRe.exec(block)) !== null) {
    incomingComment(m[1].trim(), m[2].trim(), m[3].trim(), m[5].trim(), m[4] ? m[4].trim() : null);
  }

  const sync = block.match(/<SYNC\s+STAGE="(\d+)"\s+PROGRESS="(\d+)"\s+STATUS="([^"]+)"\/>/i);
  if (sync) {
    STATE.sync = { stage: +sync[1], progress: +sync[2], status: sync[3] };
    refreshWidget();
    saveState(); // FIX2: 持久化关系进度
  }

  // ── CALL ──
  const callRe = /<CALL\s+FROM="([^"]+)"\s+TIME="([^"]+)"\s*\/?>/gi;
  while ((m = callRe.exec(block)) !== null) {
    incomingCall(m[1].trim(), m[2].trim());
  }
  // ── HONGBAO ──
  const hongbaoRe = /<HONGBAO\s+FROM="([^"]+)"\s+AMOUNT="([^"]+)"(?:\s+NOTE="([^"]*)")?\s*\/?>/gi;
  while ((m = hongbaoRe.exec(block)) !== null) {
    incomingHongbao(m[1].trim(), m[2].trim(), m[3] ? m[3].trim() : '恭喜发财');
  }
  // ── VOICE ──
  const voiceRe = /<VOICE\s+FROM="([^"]+)"\s+TIME="([^"]+)"\s+DURATION="([^"]+)">([\s\S]*?)<\/VOICE>/gi;
  while ((m = voiceRe.exec(block)) !== null) {
    incomingVoice(m[1].trim(), m[2].trim(), m[3].trim(), m[4].trim());
  }
  // ── GROUP MSG ──
  const gmsgRe = /<GMSG\s+FROM="([^"]+)"\s+GROUP="([^"]+)"\s+TIME="([^"]+)">([\s\S]*?)<\/GMSG>/gi;
  while ((m = gmsgRe.exec(block)) !== null) {
    incomingGroupMsg(m[1].trim(), m[2].trim(), m[3].trim(), m[4].trim());
  }}

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

  showLiveChat(th.name, th.avatarBg, STATE.avatars?.[th.name] || null, text);
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
    const sl = last.from === 'user' ? '我' : th.name.split(' ')[0];
    const pf = sl + '：' + last.text;
    $(`#rp-tp-${th.id}`).text(pf.length > 28 ? pf.slice(0, 27) + '…' : pf);
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
//  COMPOSE MOMENT
// ================================================================
function openCompose() {
  $('#rp-compose-modal').show();
  $('#rp-compose-text').val('').focus();
}

function closeCompose() {
  $('#rp-compose-modal').hide();
}

function postUserMoment() {
  const text = $('#rp-compose-text').val().trim();
  if (!text) return;
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const momentId = `user_${now.getTime()}`;
  STATE.moments = STATE.moments || [];
  STATE.moments.push({
    id: momentId,
    from: 'user',
    name: '我',
    initials: '我',
    avatarBg: 'linear-gradient(145deg,#64748b,#475569)',
    time: ts,
    text,
    img: null,
    likes: [],
    comments: [],
  });
  closeCompose();
  go('moments');
  saveState();
  const ta = document.querySelector('#send_textarea');
  if (!ta) return;
  // Force char/NPC to reply with COMMENT — set OOC BEFORE send
  const hasEP = typeof setExtensionPrompt === 'function' && extension_prompt_types;
  if (hasEP) {
    const oocM = `[朋友圈发布强制指令：{{user}}刚发布了一条朋友圈，MOMENT_ID="${momentId}"，内容：「${text}」。角色必须在本轮<PHONE>块内用<COMMENT MOMENT_ID="${momentId}" FROM="角色名" TIME="HH:MM">评论内容</COMMENT>格式回应，至少1条至多3条，不得省略。]`;
    setExtensionPrompt('rp-moments-post-ooc', oocM, extension_prompt_types.IN_CHAT, 0, false, 0);
  }
  const action = `*{{user}}发布了一条朋友圈：「${text}」*`;
  const main = ta.value.trim();
  ta.value = main ? `${main}\n${action}` : action;
  ta.dispatchEvent(new Event('input', { bubbles: true }));
  document.querySelector('#send_but')?.click();
  if (hasEP) {
    setTimeout(() => setExtensionPrompt('rp-moments-post-ooc', ''), 300);
  }
}

// ================================================================
//  SETTINGS / AVATAR MANAGEMENT
// ================================================================
function openSettings() {
  populateAvatarSelect();
  updateAvatarPreviewSwatch($('#rp-avatar-select').val());
  go('settings');
}

function populateAvatarSelect() {
  const sel = $('#rp-avatar-select');
  sel.empty().append('<option value="user">我（User）</option>');
  // Add NPCs from threads
  Object.values(STATE.threads).forEach(th => {
    sel.append(`<option value="${th.name}">${th.name}</option>`);
  });
  // Add NPCs from moments (unique)
  const seen = new Set(['user', ...Object.values(STATE.threads).map(t => t.name)]);
  (STATE.moments || []).forEach(m => {
    if (m.from !== 'user' && !seen.has(m.name)) {
      seen.add(m.name);
      sel.append(`<option value="${m.name}">${m.name}</option>`);
    }
  });
}

function updateAvatarPreviewSwatch(who) {
  const swatch = $('#rp-avatar-preview-swatch');
  const ci = STATE.avatars && STATE.avatars[who];
  if (ci) {
    swatch.html(`<img class="rp-av-photo" src="${ci}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:19px"/>`);
    swatch.css('background', 'transparent');
  } else if (who === 'user') {
    swatch.text('我').css('background', 'linear-gradient(145deg,#64748b,#475569)');
  } else {
    const th = Object.values(STATE.threads).find(t => t.name === who);
    swatch.text(th ? th.initials : who.slice(0,2).toUpperCase()).css('background', th ? th.avatarBg : 'linear-gradient(145deg,#555,#333)');
  }
}

// ================================================================
//  CALL
// ================================================================
function incomingCall(fromRaw, time) {
  const thread = findOrCreateThread(fromRaw);
  const customImg = STATE.avatars && STATE.avatars[thread.name];
  const avHtml = customImg
    ? `<div class="rp-call-av rp-av-img" style="background:transparent;overflow:hidden"><img class="rp-av-photo" src="${customImg}" alt=""/></div>`
    : `<div class="rp-call-av" style="background:${thread.avatarBg}">${thread.initials}</div>`;
  $('#rp-call-overlay').html(`
    <div style="display:flex;flex-direction:column;align-items:center">
      ${avHtml}
      <div class="rp-call-name">${escHtml(thread.name)}</div>
      <div class="rp-call-sub">来电中…</div>
    </div>
    <div class="rp-call-btns">
      <div class="rp-call-btn-wrap">
        <div class="rp-call-dec" id="rp-call-dec">📵</div>
        <div class="rp-call-lbl">拒绝</div>
      </div>
      <div class="rp-call-btn-wrap">
        <div class="rp-call-ans" id="rp-call-ans">📞</div>
        <div class="rp-call-lbl">接听</div>
      </div>
    </div>
  `).show();
  STATE._pendingCall = { fromRaw, time, threadId: thread.id };
  clearTimeout(STATE._callTimer);
  STATE._callTimer = setTimeout(() => resolveCall('missed'), 15000);
  showBanner(thread.name, '📞 来电中…');
}

function resolveCall(result) {
  clearTimeout(STATE._callTimer);
  const call = STATE._pendingCall;
  $('#rp-call-overlay').hide().empty();
  if (!call) return;
  const thread = STATE.threads[call.threadId];
  if (!thread) return;
  const labels = { missed: '未接来电', declined: '已拒绝', answered: '已接听' };
  thread.messages.push({
    id: `call_${Date.now()}`, from: 'system',
    type: 'call_rec', result, time: call.time,
    label: labels[result]
  });
  if (result === 'missed') {
    thread.unread = (thread.unread || 0) + 1;
    refreshBadges();
  }
  renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  saveState();
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const actions = {
      missed:   `*${thread.name}拨打了电话，{{user}}未接听*`,
      declined: `*{{user}}拒绝了${thread.name}的来电*`,
      answered: `*{{user}}接听了${thread.name}的来电*`
    };
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${actions[result]}` : actions[result];
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
  STATE._pendingCall = null;
}

// ================================================================
//  HONGBAO
// ================================================================
function incomingHongbao(fromRaw, amount, note) {
  const thread = findOrCreateThread(fromRaw);
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  thread.messages.push({
    id: `hb_${Date.now()}`, from: 'incoming',
    type: 'hongbao', name: fromRaw, time: ts,
    amount, note, opened: false
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges(); renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  showBanner(thread.name, '🧧 发来了一个红包');
  showLiveChat(thread.name, thread.avatarBg, STATE.avatars?.[thread.name] || null, `🧧 红包：${note}`);
  saveState();
}

function openHongbao(threadId, msgId) {
  const thread = STATE.threads[threadId];
  if (!thread) return;
  const msg = thread.messages.find(m => m.id === msgId);
  if (!msg || msg.opened) return;
  msg.opened = true;
  saveState();
  renderBubbles(threadId);
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const action = `*{{user}}打开了${msg.name}发来的红包，领到了¥${msg.amount}*`;
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${action}` : action;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
}

// ================================================================
//  VOICE MESSAGE
// ================================================================
function incomingVoice(fromRaw, time, duration, text) {
  const thread = findOrCreateThread(fromRaw);
  thread.messages.push({
    id: `vc_${Date.now()}`, from: 'incoming',
    type: 'voice', name: fromRaw, time,
    duration, text, played: false
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges(); renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  showBanner(thread.name, `🎤 语音消息 ${duration}`);
  showLiveChat(thread.name, thread.avatarBg, STATE.avatars?.[thread.name] || null, `🎤 ${duration}`);
  saveState();
}

function playVoice(threadId, msgId) {
  const thread = STATE.threads[threadId];
  if (!thread) return;
  const msg = thread.messages.find(m => m.id === msgId);
  if (!msg || msg.played) return;
  msg.played = true;
  saveState();
  renderBubbles(threadId);
}

// ================================================================
//  GROUP CHAT
// ================================================================
const GROUP_COLORS = ['#7c3aed','#0891b2','#0d9488','#b45309','#be185d','#1d4ed8'];

function incomingGroupMsg(fromRaw, groupName, time, text) {
  const groupId = `grp_${groupName}`;
  if (!STATE.threads[groupId]) {
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
    STATE.threads[groupId] = {
      id: groupId, name: groupName,
      initials: groupName.slice(0, 2),
      avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
      type: 'group', messages: [], unread: 0
    };
  }
  const thread = STATE.threads[groupId];
  const senderTh = findOrCreateThread(fromRaw);
  thread.messages.push({
    id: `gm_${Date.now()}`, from: 'incoming',
    type: 'group_msg', name: fromRaw, time, text,
    initials: senderTh.initials, avatarBg: senderTh.avatarBg
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges(); renderThreadList();
  if (STATE.currentThread === groupId) renderBubbles(groupId);
  showBanner(groupName, `${fromRaw}：${text.slice(0,22)}${text.length>22?'…':''}`);
  const _sth = senderTh;
  showLiveChat(fromRaw, _sth.avatarBg, STATE.avatars?.[fromRaw] || null, text);
  saveState();
}

// ================================================================
//  ATTACH MENU
// ================================================================
function toggleAttachPanel() {
  const p = $('#rp-attach-panel');
  if (p.is(':visible')) { p.hide(); return; }
  p.html(`
    <div class="rp-attach-row">
      <div class="rp-attach-item" onclick="showHongbaoSheet()">
        <div class="rp-attach-ico">🧧</div><span>红包</span>
      </div>
      <div class="rp-attach-item" onclick="triggerImagePick()">
        <div class="rp-attach-ico">🖼️</div><span>图片</span>
      </div>
      <div class="rp-attach-item" onclick="showLocationInput()">
        <div class="rp-attach-ico">📍</div><span>位置</span>
      </div>
    </div>
  `).show();
}

function showHongbaoSheet() {
  $('#rp-attach-panel').hide();
  $('#rp-screen').append(`
    <div class="rp-hb-modal" id="rp-hb-modal">
      <div class="rp-hb-sheet">
        <h3>🧧 发红包</h3>
        <input id="rp-hb-amount" type="number" placeholder="金额（¥）" min="1"/>
        <input id="rp-hb-note"   type="text"   placeholder="祝福语（选填）" maxlength="15"/>
        <button class="rp-hb-send-btn" onclick="sendUserHongbao()">发送红包</button>
        <button class="rp-hb-cancel-btn" onclick="$('#rp-hb-modal').remove()">取消</button>
      </div>
    </div>
  `);
}

function sendUserHongbao() {
  const amount = $('#rp-hb-amount').val().trim();
  const note   = $('#rp-hb-note').val().trim() || '恭喜发财';
  if (!amount) return;
  const thread = STATE.threads[STATE.currentThread];
  if (!thread) return;
  const now = new Date();
  const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  thread.messages.push({
    id: `uhb_${Date.now()}`, from: 'user',
    type: 'hongbao', name: '我', time: ts,
    amount, note, opened: true
  });
  $('#rp-hb-modal').remove();
  renderBubbles(thread.id);
  saveState();
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const action = `*{{user}}发给${thread.name}一个¥${amount}的红包，备注"${note}"*`;
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${action}` : action;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
}

function triggerImagePick() {
  console.log('[Raymond Phone] triggerImagePick called');
  $('#rp-attach-panel').hide();
  const fi = $('<input type="file" accept="image/*" style="display:none">');
  $('body').append(fi);
  fi.on('change', function() {
    const file = this.files[0];
    console.log('[Raymond Phone] File selected:', file?.name, file?.type);
    if (!file) { fi.remove(); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const thread = STATE.threads[STATE.currentThread];
      if (!thread) { fi.remove(); return; }
      const now = new Date();
      const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      const src = e.target.result;
      thread.messages.push({ id: `uimg_${Date.now()}`, from: 'user', type: 'image', time: ts, src });
      renderBubbles(thread.id);
      saveState();
      fi.remove();
      // Attach image to ST's #file_form_input (confirmed: used by 附加文件 button)
      try {
        const stImgInput = document.getElementById('file_form_input');
        if (stImgInput) {
          const blob = dataURLtoBlob(src);
          const dt = new DataTransfer();
          dt.items.add(new File([blob], 'photo.jpg', { type: file.type }));
          stImgInput.files = dt.files;
          stImgInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('[Raymond Phone] Image attached to ST #file_form_input ✓');
        } else {
          console.warn('[Raymond Phone] #file_form_input not found');
        }
      } catch(err) { console.warn('[Raymond Phone] Vision attach failed:', err); }
      // Delay send to let ST's async FileReader process the attachment before API call
      setTimeout(() => sendImageMessage(thread, src, file.type), 600);
    };
    reader.readAsDataURL(file);
  });
  fi.trigger('click');
}

function dataURLtoBlob(dataURL) {
  const [header, base64] = dataURL.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const bytes = atob(base64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

function sendImageMessage(thread, src, mimeType) {
  const ta = document.querySelector('#send_textarea');
  if (!ta) { console.warn('[Raymond Phone] send_textarea not found'); return; }
  const action = `*{{user}}向${thread.name}发送了一张图片，请认真观看并以${thread.name}的视角做出符合人设的回应*`;
  ta.value = ta.value.trim() ? `${ta.value.trim()}\n${action}` : action;
  ta.dispatchEvent(new Event('input', { bubbles: true }));
  document.querySelector('#send_but')?.click();
}

function showLocationInput() {
  $('#rp-attach-panel').hide();
  $('#rp-loc-modal').remove();
  const dark = $('#rp-phone').hasClass('rp-dark') ? 'rp-dark' : '';
  $('#rp-screen').append(`
    <div class="rp-loc-modal ${dark}" id="rp-loc-modal" onclick="if(event.target===this)$('#rp-loc-modal').remove()">
      <div class="rp-loc-sheet">
        <h3>📍 发送位置</h3>
        <input id="rp-loc-inp" type="text" placeholder="输入你的位置…"/>
        <button class="rp-loc-send-btn" onclick="sendLocation()">发送</button>
        <button class="rp-loc-cancel-btn" onclick="$('#rp-loc-modal').remove()">取消</button>
      </div>
    </div>
  `);
  setTimeout(() => document.getElementById('rp-loc-inp')?.focus(), 60);
}

function sendLocation() {
  const place = $('#rp-loc-inp').val().trim();
  if (!place) return;
  const thread = STATE.threads[STATE.currentThread];
  if (!thread) return;
  const now = new Date();
  const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  thread.messages.push({
    id: `uloc_${Date.now()}`, from: 'user',
    type: 'location', time: ts, place
  });
  $('#rp-loc-modal').remove();
  $('#rp-attach-panel').hide();
  renderBubbles(thread.id);
  saveState();
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const action = `*{{user}}向${thread.name}共享了位置：${place}*`;
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${action}` : action;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
}

// ================================================================
//  ADD CHOICE / CREATE GROUP
// ================================================================
function showAddChoice() {
  $('#rp-add-choice').remove();
  $('#rp-screen').append(`
    <div class="rp-add-choice" id="rp-add-choice">
      <div class="rp-add-choice-box">
        <div class="rp-add-choice-item" data-action="contact">👤 添加联系人</div>
        <div class="rp-add-choice-item" data-action="group">👥 创建群聊</div>
      </div>
      <div class="rp-add-choice-cancel" data-action="cancel">取消</div>
    </div>
  `);
}

function hideAddChoice() { $('#rp-add-choice').remove(); }

function showGroupPicker() {
  $('#rp-grp-create').remove();
  const contacts = Object.values(STATE.threads).filter(t => !t.id.startsWith('grp_'));
  const items = contacts.map(t => {
    const img = STATE.avatars?.[t.name];
    const avHtml = img
      ? `<div class="rp-grp-pick-av rp-av-img" style="overflow:hidden"><img src="${img}" style="width:100%;height:100%;object-fit:cover"/></div>`
      : `<div class="rp-grp-pick-av" style="background:${t.avatarBg}">${t.initials}</div>`;
    return `<div class="rp-grp-pick-item" data-tid="${t.id}">${avHtml}<span class="rp-grp-pick-name">${escHtml(t.name)}</span><div class="rp-grp-pick-chk">✓</div></div>`;
  }).join('');
  $('#rp-screen').append(`
    <div class="rp-add-choice" id="rp-grp-create">
      <div class="rp-grp-modal">
        <div class="rp-grp-modal-hd">选择群聊成员</div>
        <div id="rp-grp-pick-list" style="max-height:220px;overflow-y:auto">
          ${items || '<div style="padding:16px;color:rgba(0,0,0,.4);text-align:center;font-size:13px">暂无联系人</div>'}
        </div>
        <div style="padding:10px 14px;border-top:1px solid rgba(0,0,0,.06)">
          <input id="rp-grp-name-inp" class="rp-grp-name-inp" type="text" placeholder="群聊名称（留空则自动生成）" maxlength="20"/>
        </div>
        <div class="rp-grp-modal-ft">
          <button class="rp-grp-ft-btn rp-grp-ft-cancel" data-action="grp-cancel">取消</button>
          <button class="rp-grp-ft-btn rp-grp-ft-ok"     data-action="grp-confirm">创建</button>
        </div>
      </div>
    </div>
  `);
  setTimeout(() => $('#rp-grp-name-inp').focus(), 80);
}

function confirmCreateGroup() {
  const selected = $('#rp-grp-pick-list .rp-grp-pick-item.selected');
  if (!selected.length) return;
  const memberIds = selected.map((_, el) => $(el).data('tid')).get();
  let name = $('#rp-grp-name-inp').val().trim();
  if (!name) name = memberIds.map(id => STATE.threads[id]?.name || id).join('、');
  $('#rp-grp-create').remove();
  const groupId = `grp_${name}`;
  const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
  STATE.threads[groupId] = {
    id: groupId, name, initials: name.slice(0,2),
    avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
    type: 'group', members: memberIds, messages: [], unread: 0
  };
  saveState(); renderThreadList(); openThread(groupId);
}

// ================================================================
//  LIVE CHAT OVERLAY
// ================================================================
const LC_TTL = 6000;
const LC_MAX = 3;

function showLiveChat(name, avatarBg, customImg, text) {
  const lc = $('#rp-live-chat');
  if (!lc.length) return;
  const id = `lc_${Date.now()}`;
  const avHtml = customImg
    ? `<div class="rp-lc-av"><img src="${customImg}" style="width:100%;height:100%;object-fit:cover"/></div>`
    : `<div class="rp-lc-av" style="background:${avatarBg}">${escHtml((name||'?').slice(0,2))}</div>`;
  lc.append(`
    <div class="rp-lc-bubble" id="${id}">
      ${avHtml}
      <div class="rp-lc-body">
        <div class="rp-lc-name">${escHtml(name)}</div>
        <div class="rp-lc-text">${escHtml(text.slice(0,80))}${text.length>80?'…':''}</div>
      </div>
      <div class="rp-lc-dismiss" onclick="$('#${id}').remove()">×</div>
    </div>
  `);
  const all = lc.children();
  if (all.length > LC_MAX) all.first().remove();
  setTimeout(() => $(`#${id}`).fadeOut(400, function(){ $(this).remove(); }), LC_TTL);
}

// ================================================================
//  CHAT BUBBLE BEAUTIFICATION
// ================================================================
function beautifySMSInChat() {
  try {
    const ctx = getContext();
    if (!ctx?.name) return;
    const charName = ctx.name;
    const allMsgs = document.querySelectorAll('.mes:not([is_user="true"])');
    if (!allMsgs.length) return;
    const lastMsg = allMsgs[allMsgs.length - 1];
    const textEl  = lastMsg?.querySelector('.mes_text');
    if (!textEl || textEl.dataset.rpDone) return;
    textEl.dataset.rpDone = '1';

    const thread   = Object.values(STATE.threads).find(t => t.name === charName);
    const avatarBg = thread?.avatarBg || 'linear-gradient(145deg,#555,#333)';
    const initials = charName.slice(0, 2);
    const customImg = STATE.avatars?.[charName];
    const avHtml = customImg
      ? `<div class="rp-cb-av"><img src="${customImg}" alt=""/></div>`
      : `<div class="rp-cb-av" style="background:${avatarBg}">${initials}</div>`;
    const mkBubble = (text) => {
      const d = document.createElement('div');
      d.className = 'rp-cb';
      d.innerHTML = `${avHtml}<div class="rp-cb-txt">${escHtml(text.trim())}</div>`;
      return d;
    };
    // Match em/i elements: curly quotes, straight quotes, or brackets
    textEl.querySelectorAll('em, i').forEach(el => {
      if (el.closest('.rp-cb')) return;
      const raw = el.textContent.trim();
      const isDialogue = /^["\u201c\u00ab\u300c\u300e\u300a\uff02]/.test(raw)
                      || /["\u201d\u00bb\u300d\u300f\u300b\uff02\u300c]$/.test(raw)
                      || /^\u300c|\u300d$/.test(raw);
      if (!isDialogue && raw.length < 3) return;
      // Strip wrapping quote chars
      const inner = raw.replace(/^["\u201c\u00ab\u300c\u300e\u300a\uff02\u300c]/, '')
                       .replace(/["\u201d\u00bb\u300d\u300f\u300b\uff02]$/, '');
      if (inner.trim().length > 0) el.replaceWith(mkBubble(inner));
    });
    // Match text nodes with curly-quote spans
    const walkText = (node) => {
      if (node.nodeType === 3) {
        const txt = node.textContent;
        const re = /[\u201c"][^\u201d"\n]{2,}[\u201d"]|[\u300c\u300e][^\u300d\u300f\n]{2,}[\u300d\u300f]/g;
        if (!re.test(txt)) return;
        re.lastIndex = 0;
        const frag = document.createDocumentFragment();
        let last = 0, m;
        while ((m = re.exec(txt)) !== null) {
          if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
          const inner = m[0].slice(1, -1);
          frag.appendChild(mkBubble(inner));
          last = m.index + m[0].length;
        }
        if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
        node.replaceWith(frag);
      } else if (node.nodeType === 1 && !node.classList.contains('rp-cb')) {
        Array.from(node.childNodes).forEach(walkText);
      }
    };
    Array.from(textEl.childNodes).forEach(walkText);
  } catch(e) {
    console.warn('[Raymond Phone] beautify:', e);
  }
}

// ================================================================
//  WALLPAPER
// ================================================================
function applyWallpaper() {
  const wp   = STATE.wallpaper;
  const prev = document.getElementById('rp-wall-preview');
  // Apply wallpaper directly onto the view bg layers (home + lock)
  // #rp-wallpaper-layer is behind z-index:1 views and never visible — bypass it
  document.querySelectorAll('.rp-home-bg, .rp-lock-bg').forEach(el => {
    if (wp) {
      // wallpaper image + semi-transparent white overlay for readability
      el.style.backgroundImage = `linear-gradient(rgba(255,255,255,.18),rgba(255,255,255,.18)), url(${wp})`;
      el.style.backgroundSize   = 'auto, cover';
      el.style.backgroundPosition = 'auto, center';
    } else {
      el.style.backgroundImage  = '';
      el.style.backgroundSize   = '';
      el.style.backgroundPosition = '';
    }
  });
  // Keep the separate layer in sync (used by settings preview)
  const layer = document.getElementById('rp-wallpaper-layer');
  if (layer) layer.style.backgroundImage = wp ? `url(${wp})` : '';
  if (prev) { prev.src = wp || ''; prev.style.display = wp ? 'block' : 'none'; }
}

// ================================================================
//  DARK MODE
// ================================================================
function toggleDarkMode() {
  STATE.darkMode = !STATE.darkMode;
  $('#rp-phone').toggleClass('rp-dark', STATE.darkMode);
  $('.rp-dm-ico').text(STATE.darkMode ? '☀️' : '🌙');
  $('#rp-dm-lbl').text(STATE.darkMode ? '日间' : '夜间');
  saveState();
}

// ================================================================
//  MOMENTS
// ================================================================
function renderMoments() {
  const container = $('#rp-moments-list').empty();
  if (!STATE.moments || STATE.moments.length === 0) {
    container.append('<div class="rp-moments-empty"><span>📭</span><span>暂无动态</span></div>');
    return;
  }
  [...STATE.moments].reverse().forEach(moment => {
    const likeCount = moment.likes.length;
    const liked = moment.likes.includes('user');
    let commentsHtml = '';
    if (moment.comments && moment.comments.length > 0) {
      const items = moment.comments.map((cm, idx) => {
        const replyPart = cm.replyTo !== null && cm.replyTo !== undefined
          ? `回复 <span class="rp-moment-cname">${moment.comments[cm.replyTo]?.name || '?'}</span>：`
          : '';
        return `<div class="rp-moment-comment">
          <span class="rp-moment-cname">${escHtml(cm.name)}</span>：${replyPart}${escHtml(cm.text)}
          <span class="rp-moment-reply-btn" data-moment="${moment.id}" data-cidx="${idx}" data-rname="${escHtml(cm.name)}">回复</span>
        </div>`;
      }).join('');
      commentsHtml = `<div class="rp-moment-comments-wrap">${items}</div>`;
    }
    container.append(`
      <div class="rp-moment" data-mid="${moment.id}">
        <div class="rp-moment-hd">
          ${(()=>{const k=moment.from==='user'?'user':moment.name;const ci=STATE.avatars&&STATE.avatars[k];return ci?`<div class="rp-moment-av rp-av-img"><img class="rp-av-photo" src="${ci}" alt=""/></div>`:`<div class="rp-moment-av" style="background:${moment.avatarBg}">${moment.initials}</div>`;})()}
          <div class="rp-moment-meta">
            <div class="rp-moment-name">${escHtml(moment.name)}</div>
            <div class="rp-moment-time">${moment.time}</div>
          </div>
        </div>
        <div class="rp-moment-text">${escHtml(moment.text)}</div>
        ${moment.img ? `<div class="rp-moment-img-wrap"><img class="rp-moment-img" src="${escHtml(moment.img)}" alt=""/></div>` : ''}
        <div class="rp-moment-bar">
          <button class="rp-moment-act rp-like-btn${liked ? ' rp-liked' : ''}" data-moment="${moment.id}">${liked ? '❤️' : '🤍'} ${likeCount > 0 ? likeCount : '点赞'}</button>
          <button class="rp-moment-act rp-comment-toggle" data-moment="${moment.id}">💬 评论</button>
        </div>
        ${commentsHtml}
        <div class="rp-moment-input-row" id="rp-ci-${moment.id}" style="display:none">
          <input class="rp-moment-cinput" type="text" placeholder="发表评论…" autocomplete="off"/>
          <button class="rp-moment-csend" data-moment="${moment.id}">发送</button>
        </div>
      </div>
    `);
  });
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function incomingMoment(fromRaw, time, text, img) {
  const momentId = fromRaw.toLowerCase().replace(/\s+/g,'_') + '_' + time.replace(':','');
  if (STATE.moments.find(m => m.id === momentId)) return;
  const threadId = matchThread(fromRaw);
  const th = STATE.threads[threadId];
  STATE.moments = STATE.moments || [];
  STATE.moments.push({
    id: momentId,
    from: threadId || fromRaw,
    name: th ? th.name : fromRaw,
    initials: th ? th.initials : fromRaw.slice(0,2).toUpperCase(),
    avatarBg: th ? th.avatarBg : 'linear-gradient(145deg,#555,#333)',
    time, text,
    img: img || null,
    likes: [],
    comments: [],
  });
  if (STATE.currentView === 'moments') renderMoments();
  showBanner((th ? th.name : fromRaw), '发了朋友圈：' + text.slice(0,25) + (text.length>25?'…':''), time);
  saveState();
}

function incomingComment(momentId, fromRaw, time, text, replyTo) {
  let moment = STATE.moments && STATE.moments.find(m => m.id === momentId || m.id.includes(momentId));
  if (!moment) {
    // Fallback: apply to most recent user moment if any exist
    const userMoments = (STATE.moments || []).filter(m => m.from === 'user');
    moment = userMoments.length > 0 ? userMoments[userMoments.length - 1] : null;
  }
  if (!moment) return;
  const threadId = matchThread(fromRaw);
  const th = STATE.threads[threadId];
  const name = th ? th.name : fromRaw;
  let replyToIdx = null;
  if (replyTo) {
    replyToIdx = moment.comments.findIndex(cm => cm.name === replyTo);
    if (replyToIdx < 0) replyToIdx = null;
  }
  moment.comments = moment.comments || [];
  moment.comments.push({ from: threadId || fromRaw, name, text, time, replyTo: replyToIdx });
  if (STATE.currentView === 'moments') renderMoments();
  saveState();
}

function toggleLike(momentId) {
  const moment = STATE.moments && STATE.moments.find(m => m.id === momentId);
  if (!moment) return;
  const idx = moment.likes.indexOf('user');
  if (idx >= 0) moment.likes.splice(idx, 1);
  else moment.likes.push('user');
  renderMoments();
  saveState();
}

function sendMomentComment(momentId, text, replyToName) {
  const moment = STATE.moments && STATE.moments.find(m => m.id === momentId);
  if (!moment || !text.trim()) return;
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  let replyToIdx = null;
  if (replyToName) {
    replyToIdx = moment.comments.findIndex(cm => cm.name === replyToName);
    if (replyToIdx < 0) replyToIdx = null;
  }
  moment.comments = moment.comments || [];
  moment.comments.push({ from: 'user', name: '我', text: text.trim(), time: ts, replyTo: replyToIdx });
  renderMoments();
  saveState();
  const ta = document.querySelector('#send_textarea');
  if (!ta) return;
  const mainText = ta.value.trim();
  const action = replyToName
    ? `*{{user}}在${moment.name}的朋友圈下回复${replyToName}：「${text.trim()}」*`
    : `*{{user}}在${moment.name}的朋友圈下评论：「${text.trim()}」*`;
  ta.value = mainText ? `${mainText}\n${action}` : action;
  ta.dispatchEvent(new Event('input', { bubbles: true }));

  // Force NPC/char reply - OOC must be set BEFORE send (same as SMS pattern)
  const hasEP = typeof setExtensionPrompt === 'function' && extension_prompt_types;
  if (hasEP) {
    const oocM = `[朋友圈回复指令：${moment.name}或相关角色必须在本轮<PHONE>块内使用<COMMENT MOMENT_ID="${moment.id}" FROM="角色名" TIME="HH:MM">内容</COMMENT>标签回复{{user}}的评论，至少1条至多3条，不得省略。]`;
    setExtensionPrompt('rp-moments-ooc', oocM, extension_prompt_types.IN_CHAT, 0, false, 0);
  }

  ta.value = mainText ? `${mainText}\n${action}` : action;
  ta.dispatchEvent(new Event('input', { bubbles: true }));
  document.querySelector('#send_but')?.click();

  if (hasEP) {
    setTimeout(() => setExtensionPrompt('rp-moments-ooc', ''), 300);
  }
}

// ================================================================
//  LUDO GAME
// ================================================================

// 13×13 board, CELL=20px → 260px
// Common path: 48 squares [row, col], clockwise from User entry
const LUDO_PATH = [
  [12,5],[11,5],[10,5],[9,5],[8,5],            // 0-4  : up left col of bottom arm
  [7,5],[7,4],[7,3],[7,2],[7,1],[7,0],          // 5-10 : left across row7
  [6,0],[5,0],                                  // 11-12: up left side
  [5,1],[5,2],[5,3],[5,4],[5,5],                // 13-17: right across row5
  [4,5],[3,5],[2,5],[1,5],[0,5],                // 18-22: up left col of top arm
  [0,6],                                        // 23   : top centre
  [0,7],[1,7],[2,7],[3,7],[4,7],                // 24-28: down right col of top arm ← Char entry
  [5,7],[5,8],[5,9],[5,10],[5,11],[5,12],       // 29-34: right across row5
  [6,12],[7,12],                                // 35-36: down right side
  [7,11],[7,10],[7,9],[7,8],[7,7],              // 37-41: left across row7
  [8,7],[9,7],[10,7],[11,7],[12,7],             // 42-46: down right col of bottom arm
  [12,6],                                       // 47   : bottom centre ← User re-entry / home start
];
const LUDO_PATH_LEN = LUDO_PATH.length; // 48

// Home-run lanes (5 squares, col6, toward centre row6)
const USER_HOME_RUN = [[11,6],[10,6],[9,6],[8,6],[7,6]];  // up col6
const CHAR_HOME_RUN = [[1,6],[2,6],[3,6],[4,6],[5,6]];    // down col6

// Absolute path indices that are "safe" squares (can't eat)
const LUDO_SAFE = new Set([0, 12, 24, 36]);
// ── Square events (格子事件) ───────────────────────────────────────
const SQUARE_EVENTS = {
  2:  { emoji:'💬', text:'说一句情话', note:'请在下方对话框分享', type:'talk' },
  3:  { emoji:'💭', text:'回忆第一次心动', note:'请在下方对话框分享', type:'talk' },
  5:  { emoji:'🤗', text:'给对方一个拥抱', note:'请在对话框互动（需有动作描写）', type:'action' },
  6:  { emoji:'🤫', text:'分享一个秘密', note:'请在下方对话框分享', type:'talk' },
  8:  { emoji:'✨', text:'赞美对方一句话', note:'请在下方对话框说', type:'talk' },
  10: { emoji:'📖', text:'说一件难忘往事', note:'请在下方对话框分享', type:'talk' },
  11: { emoji:'⬅️', text:'后退三格', note:'', type:'move', delta:-3 },
  13: { emoji:'😘', text:'轻轻吻对方脸颊', note:'请在对话框互动（需有动作描写）', type:'action' },
  15: { emoji:'💗', text:'说一句有关对方的真心话', note:'请在下方对话框说', type:'talk' },
  16: { emoji:'🍜', text:'喜欢吃什么？', note:'请在下方对话框回答', type:'talk' },
  18: { emoji:'❤️', text:'喜欢对方哪一点？', note:'请在下方对话框回答', type:'talk' },
  19: { emoji:'🥹', text:'分享一个感动瞬间', note:'请在下方对话框分享', type:'talk' },
  21: { emoji:'🥰', text:'叫对方最可爱的昵称', note:'请在下方对话框说', type:'talk' },
  23: { emoji:'🎁', text:'如果可以无条件提一个要求，会提什么？', note:'请在下方对话框回答', type:'talk' },
  24: { emoji:'💆', text:'给对方按摩肩膀1分钟', note:'请在对话框互动（需有动作描写）', type:'action' },
  26: { emoji:'🙈', text:'分享一个不为人知的小习惯', note:'请在下方对话框分享', type:'talk' },
  27: { emoji:'🌈', text:'对彼此未来的幻想是什么样的？', note:'请在下方对话框分享', type:'talk' },
  29: { emoji:'⏩', text:'前进六格', note:'', type:'move', delta:6 },
  31: { emoji:'🤝', text:'十指相扣30秒', note:'请在对话框互动（需有动作描写）', type:'action' },
  32: { emoji:'🎀', text:'最想收到什么礼物？', note:'请在下方对话框回答', type:'talk' },
  34: { emoji:'😊', text:'跟对方一起发生过的最开心的事是什么？', note:'请在下方对话框分享', type:'talk' },
  36: { emoji:'🎵', text:'给对方唱一小段情歌', note:'请在对话框互动（需有动作描写）', type:'action' },
  37: { emoji:'💫', text:'对方的存在让自己变成了更好的人了吗？', note:'请在下方对话框回答', type:'talk' },
  39: { emoji:'🫂', text:'亲密动作：轻轻拥抱并从背后环住', note:'请在对话框互动（需有动作描写）', type:'action' },
  40: { emoji:'👀', text:'对方什么时候看起来最好看？', note:'请在下方对话框回答', type:'talk' },
  42: { emoji:'⏸️', text:'停留此格，跳过下一轮', note:'', type:'skip' },
  44: { emoji:'🌟', text:'对对方连说三句夸奖的话', note:'请在下方对话框说', type:'talk' },
  45: { emoji:'⏩', text:'前进三格', note:'', type:'move', delta:3 },
  47: { emoji:'🏷️', text:'你最想给对方起的绰号是什么？', note:'请在下方对话框分享', type:'talk' },
  49: { emoji:'🎲', text:'幸运格！再掷一次骰子', note:'', type:'reroll' },
  50: { emoji:'🤏', text:'轻轻捏对方脸蛋保持三秒', note:'请在对话框互动（需有动作描写）', type:'action' },
  52: { emoji:'🧧', text:'给对方发个红包', note:'请在对话框互动', type:'action' },
  53: { emoji:'💍', text:'最终告白：说出"无论走到第几格，我都想和你一起"', note:'到达终点！', type:'talk' },
};


// Player entry indices into LUDO_PATH
const USER_ENTRY = 0;   // (12,5)
const CHAR_ENTRY = 24;  // (0,7)

// Positions: 0=home yard, 1-48=common path, 49-53=home run, 54=WIN
const LG = {
  active: false,
  userPos: 0,
  charPos: 0,
  turn: 'user',      // 'user'|'char'
  rolling: false,
  lastDice: 0,
  charName: '对方',
  chatLog: [],
};

const DICE_EMOJI = ['','⚀','⚁','⚂','⚃','⚄','⚅'];

function lgInit() {
  LG.active   = true;
  LG.userPos  = 0;
  LG.charPos  = 0;
  LG.turn     = 'user';
  LG.rolling  = false;
  LG.lastDice = 0;
  LG.chatLog     = [];
  LG.userSkip   = false;
  LG.charSkip   = false;
  LG.pendingReroll = null;

  const ctx = getContext();
  LG.charName = ctx?.name2 || ctx?.name || '对方';
  $('#rp-game-char-name').text(LG.charName);
  $('#rp-game-win').hide();
  $('#rp-game-chat').empty();
  $('#rp-dice-btn').prop('disabled', false);

  lgRender();
  lgStatus('你先出手 — 按🎲掷骰子！');
  lgMsg('sys', `游戏开始！掷骰子即可出发，先到终点者胜。❤️=你  💙=${LG.charName}`);
  setTimeout(() => lgCharComment('game_start'), 900);
}

// Convert player position → canvas pixel coords
function lgCoords(player, pos) {
  const CELL = 20, H = CELL / 2;
  if (pos === 0) {
    // sitting in home yard
    return player === 'user' ? {x:2*CELL+H, y:10*CELL+H} : {x:10*CELL+H, y:2*CELL+H};
  }
  if (pos >= 54) {
    return {x:6*CELL+H, y:6*CELL+H}; // centre finish
  }
  if (pos >= 49) {
    const hr = player === 'user' ? USER_HOME_RUN : CHAR_HOME_RUN;
    const [r,c] = hr[pos - 49] || hr[hr.length-1];
    return {x:c*CELL+H, y:r*CELL+H};
  }
  const entry = player === 'user' ? USER_ENTRY : CHAR_ENTRY;
  const idx   = (entry + pos - 1) % LUDO_PATH_LEN;
  const [r,c] = LUDO_PATH[idx];
  return {x:c*CELL+H, y:r*CELL+H};
}

function lgRender() {
  const canvas = document.getElementById('rp-ludo-canvas');
  if (!canvas) return;
  const C = canvas.getContext('2d');
  const CELL = 20, N = 13, W = N * CELL;

  C.clearRect(0, 0, W, W);

  // ── Background ──
  C.fillStyle = '#fef5f8';
  C.fillRect(0, 0, W, W);

  // ── Cross arms (white) ──
  C.fillStyle = '#ffffff';
  C.fillRect(5*CELL, 0, 3*CELL, W);    // vertical
  C.fillRect(0, 5*CELL, W, 3*CELL);    // horizontal

  // ── Home zones ──
  // User  (bottom-left) pink
  C.fillStyle = '#ffd6e7';
  C.fillRect(0, 8*CELL, 5*CELL, 5*CELL);
  // Char  (top-right) blue
  C.fillStyle = '#d6e8ff';
  C.fillRect(8*CELL, 0, 5*CELL, 5*CELL);
  // Other two (greyed)
  C.fillStyle = '#f0f0f0';
  C.fillRect(0, 0, 5*CELL, 5*CELL);
  C.fillRect(8*CELL, 8*CELL, 5*CELL, 5*CELL);

  // ── Centre finish (gradient) ──
  const grad = C.createRadialGradient(6.5*CELL,6.5*CELL,4, 6.5*CELL,6.5*CELL,32);
  grad.addColorStop(0, '#ffd700');
  grad.addColorStop(.5,'#ff9de2');
  grad.addColorStop(1, '#9de2ff');
  C.fillStyle = grad;
  C.fillRect(5*CELL, 5*CELL, 3*CELL, 3*CELL);

  // ── Path squares ──
  C.lineWidth = .5;
  LUDO_PATH.forEach(([r,c], idx) => {
    let fill = '#ffffff';
    if (c === 6 && r > 6) fill = '#ffe0ee';  // User home-run approach
    if (c === 6 && r < 6) fill = '#e0eeff';  // Char home-run approach
    if (LUDO_SAFE.has(idx)) fill = '#fff8dc';
    C.fillStyle = fill;
    C.strokeStyle = 'rgba(0,0,0,.1)';
    C.fillRect(c*CELL+.5, r*CELL+.5, CELL-1, CELL-1);
    C.strokeRect(c*CELL, r*CELL, CELL, CELL);
    if (LUDO_SAFE.has(idx)) {
      C.fillStyle = '#cca800';
      C.font = `${CELL*.52}px serif`;
      C.textAlign = 'center'; C.textBaseline = 'middle';
      C.fillText('★', c*CELL+CELL/2, r*CELL+CELL/2);
    }
  });

  // ── Home-run lanes ──
  USER_HOME_RUN.forEach(([r,c]) => {
    C.fillStyle = '#ffb3c8'; C.strokeStyle = 'rgba(220,40,100,.2)';
    C.fillRect(c*CELL+.5, r*CELL+.5, CELL-1, CELL-1);
    C.strokeRect(c*CELL, r*CELL, CELL, CELL);
  });
  CHAR_HOME_RUN.forEach(([r,c]) => {
    C.fillStyle = '#b3c8ff'; C.strokeStyle = 'rgba(40,100,220,.2)';
    C.fillRect(c*CELL+.5, r*CELL+.5, CELL-1, CELL-1);
    C.strokeRect(c*CELL, r*CELL, CELL, CELL);
  });

  // ── Home zone labels ──
  C.textAlign = 'center'; C.textBaseline = 'middle';
  C.font = `${CELL*1.6}px serif`;
  C.fillText('❤️', 2.5*CELL, 10.5*CELL);
  C.fillText('💙', 10.5*CELL, 2.5*CELL);

  // ── Centre heart ──
  C.font = `${CELL*1.8}px serif`;
  C.fillText('💗', 6.5*CELL, 6.5*CELL);

  // ── Pieces ──
  lgDrawPiece(C, 'user', LG.userPos, CELL);
  lgDrawPiece(C, 'char', LG.charPos, CELL);
}

function lgDrawPiece(C, player, pos, CELL) {
  if (pos >= 54) return;
  const {x, y} = lgCoords(player, pos);
  // shadow
  C.shadowColor = 'rgba(0,0,0,.25)';
  C.shadowBlur  = 4;
  C.font = `${CELL*.78}px serif`;
  C.textAlign = 'center'; C.textBaseline = 'middle';
  C.fillText(player === 'user' ? '❤️' : '💙', x, y);
  C.shadowBlur = 0;
}

function lgRoll() { return Math.floor(Math.random() * 6) + 1; }

async function lgAnimDice() {
  for (let i = 0; i < 8; i++) {
    $('#rp-dice-face').text(DICE_EMOJI[Math.floor(Math.random()*6)+1]);
    await new Promise(r => setTimeout(r, 90));
  }
}

async function lgUserRoll() {
  if (!LG.active || LG.rolling || LG.turn !== 'user') return;
  // Check skip
  if (LG.userSkip) {
    LG.userSkip = false;
    lgMsg('sys', '⏸️ 你本轮停留，轮到对方了');
    LG.turn = 'char';
    lgStatus(`${LG.charName} 的回合...`);
    setTimeout(() => lgCharTurn(), 1200);
    return;
  }
  LG.rolling = true;
  $('#rp-dice-btn').prop('disabled', true).addClass('ludo-rolling');

  await lgAnimDice();
  $('#rp-dice-btn').removeClass('ludo-rolling');

  const n = lgRoll();
  LG.lastDice = n;
  $('#rp-dice-face').text(DICE_EMOJI[n]);
  lgMsg('sys', `你掷出 ${n} ${DICE_EMOJI[n]}`);

  await lgMove('user', n);

  // Pending reroll from square event
  if (LG.pendingReroll === 'user') {
    LG.pendingReroll = null;
    LG.rolling = false;
    lgStatus('🎲 幸运！再掷一次！');
    $('#rp-dice-btn').prop('disabled', false);
    return;
  }

  if (LG.userPos >= 53) { lgWin('user'); LG.rolling = false; return; }

  LG.rolling = false;
  if (n === 6) {
    lgStatus('掷出6！再来一次！');
    lgMsg('sys', '掷出6，再掷一次！');
    $('#rp-dice-btn').prop('disabled', false);
    setTimeout(() => lgCharComment(`dice_6`), 500);
  } else {
    LG.turn = 'char';
    lgStatus(`${LG.charName} 的回合...`);
    // ~50% chance: char reacts to user's dice roll before taking their turn
    if (Math.random() < 0.5) {
      setTimeout(() => lgCharComment(`dice_${n}`), 400);
    }
    setTimeout(() => lgCharTurn(), 1100 + Math.random()*500);
  }
}

async function lgCharTurn() {
  if (!LG.active) return;
  // Check skip
  if (LG.charSkip) {
    LG.charSkip = false;
    lgMsg('sys', `⏸️ ${LG.charName}本轮停留，轮到你了`);
    LG.turn = 'user';
    lgStatus('你的回合 — 按🎲掷骰子！');
    $('#rp-dice-btn').prop('disabled', false);
    return;
  }
  await lgAnimDice();

  const n = lgRoll();
  LG.lastDice = n;
  $('#rp-dice-face').text(DICE_EMOJI[n]);
  lgMsg('sys', `${LG.charName} 掷出 ${n} ${DICE_EMOJI[n]}`);

  await lgMove('char', n);

  // Pending reroll from square event
  if (LG.pendingReroll === 'char') {
    LG.pendingReroll = null;
    lgMsg('sys', `🎲 ${LG.charName}获得额外一次掷骰！`);
    setTimeout(() => lgCharTurn(), 800);
    return;
  }

  if (LG.charPos >= 53) { lgWin('char'); return; }

  setTimeout(() => lgCharComment(`dice_${n}_char`), 400);

  if (n === 6) {
    lgMsg('sys', `${LG.charName} 掷出6，再掷！`);
    setTimeout(() => lgCharTurn(), 1000);
  } else {
    LG.turn = 'user';
    lgStatus('你的回合 — 按🎲掷骰子！');
    $('#rp-dice-btn').prop('disabled', false);
  }
}

async function lgMove(player, steps) {
  const isUser = player === 'user';
  const cur    = isUser ? LG.userPos : LG.charPos;

  let next = cur === 0 ? steps : cur + steps;

  // Home-run overflow: bounce back
  if (next > 53) next = 53 - (next - 53);
  if (next < 0)  next = 0;

  // Animate step-by-step
  const start = Math.max(cur, 1);
  for (let p = start + 1; p <= next; p++) {
    if (isUser) LG.userPos = p; else LG.charPos = p;
    lgRender();
    await new Promise(r => setTimeout(r, 170));
  }
  // If entering board from yard, set to 1 first
  if (cur === 0) { if (isUser) LG.userPos = 1; else LG.charPos = 1; lgRender(); await new Promise(r=>setTimeout(r,170)); }

  if (isUser) LG.userPos = next; else LG.charPos = next;
  lgRender();

  // Home-run entry announcement
  if (next >= 49 && cur < 49) {
    lgMsg('sys', isUser ? '✨ 进入回家路！' : `✨ ${LG.charName}进入回家路！`);
  }

  // Eat check (only on common path 1-48)
  if (next >= 1 && next <= 48) {
    const myAbs  = ((isUser ? USER_ENTRY : CHAR_ENTRY) + next - 1) % LUDO_PATH_LEN;
    const opPos  = isUser ? LG.charPos : LG.userPos;
    if (opPos >= 1 && opPos <= 48) {
      const opAbs = ((!isUser ? USER_ENTRY : CHAR_ENTRY) + opPos - 1) % LUDO_PATH_LEN;
      if (myAbs === opAbs && !LUDO_SAFE.has(myAbs)) {
        if (isUser) { LG.charPos = 0; lgMsg('sys', `💥 你吃掉了${LG.charName}的棋子！`); }
        else        { LG.userPos = 0; lgMsg('sys', `💥 ${LG.charName}吃掉了你的棋子！`); }
        lgRender();
        await new Promise(r => setTimeout(r, 300));
        if (!isUser) lgCharComment('eaten_user');
      }
    }
  }

  // Trigger square event if applicable
  const finalPos = isUser ? LG.userPos : LG.charPos;
  if (finalPos > 0 && finalPos <= 53 && SQUARE_EVENTS[finalPos]) {
    await lgTriggerSquareEvent(player, finalPos);
  }
}

function lgStatus(txt) { $('#rp-game-status-text').text(txt); }

function lgMsg(type, text) {
  const cls = type === 'user' ? 'game-msg-user' : type === 'char' ? 'game-msg-char' : 'game-msg-sys';
  const pre  = type === 'char' ? `${LG.charName}: ` : '';
  const msgHtml = `<div class="game-msg ${cls}">${pre}${text}</div>`;
  $('#rp-game-chat').append(msgHtml);
  const el = document.getElementById('rp-game-chat');
  if (el) el.scrollTop = el.scrollHeight;
  // sync to fullscreen if open
  const fs = document.getElementById('rp-game-chat-fs');
  if (fs && fs.style.display !== 'none') {
    const body = document.getElementById('rp-game-chat-fs-body');
    if (body) { body.insertAdjacentHTML('beforeend', msgHtml); body.scrollTop = body.scrollHeight; }
  }
}

function lgWin(winner) {
  LG.active = false;
  const isUser = winner === 'user';
  $('#game-win-emoji').text(isUser ? '🎉' : '😅');
  $('#game-win-title').text(isUser ? '你赢了！' : `${LG.charName} 赢了！`);
  $('#game-win-sub').text(isUser
    ? `你率先抵达终点！${LG.charName}甘拜下风～`
    : `${LG.charName}率先抵达终点！再来一局？`);
  $('#rp-game-win').show();
  lgCharComment(isUser ? 'user_win' : 'char_win');
}

// ── AI commentary (calls ST generate pipeline silently) ──────────
// ── Strip AI noise, keep only first clean dialogue line ──────────────────────
function cleanGameReply(raw) {
  // 1. Remove <think>...</think> reasoning chains
  let text = raw.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  // 2. Remove <PHONE>...</PHONE> terminal blocks
  text = text.replace(/<PHONE>[\s\S]*?<\/PHONE>/gi, '').trim();
  // 3. Remove XML/HTML-like tags (e.g. <创作规则>, <POWER:...>)
  text = text.replace(/<[^>]{1,60}>/g, '').trim();
  // 4. Strip markdown headings and bold/italic markers
  text = text.replace(/^#{1,6}\s*/gm, '').replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1').trim();
  // 5. Remove 【tag】 tokens and [ALL_CAPS_TAG] patterns at line start
  text = text.replace(/^【[^】]{1,15}】[：:＊]?\s*/gm, '').trim();
  text = text.replace(/^\[[A-Z][A-Z\s:_\-]{1,30}\]\s*/gm, '').trim();
  // 6. Try to extract quoted dialogue first (prompt ends with open ", AI fills in)
  // Match content between Chinese/English quotes, prefer shortest complete quote
  const quoteMatch = text.match(/["""「]([^"""」\n]{1,60})["""」]/);
  if (quoteMatch) {
    const q = quoteMatch[1].trim();
    if (q.length > 0 && q.length <= 60) return q;
  }
  // 7. Split lines, skip noise/meta/structured lines
  const noiseRe = /^(\d+[.)、]\s*[\[（【]|摘要[：:]|未解决|故事走向|DAILY_NOTE|FLASH_MEMORY|BROKEN_RULES|INBOX|jianbao|STATUS|GUANXI|POWER|DETOX|RULE|[★▌▶◆#\[<【]|---|我已|我必须|本轮我将|创作规则|遵循|以下是|如下[是：]|根据规则|落实[：:])/i;
  const isHeader = l => /[：:]\s*$/.test(l);
  const lines = text.split(/\n+/).map(l => l.trim()).filter(Boolean);
  // clean line: short (≤35 chars), not noise, not a header
  const clean = lines.find(l => l.length > 0 && l.length <= 60 && !noiseRe.test(l) && !isHeader(l));
  if (clean) return clean.replace(/^["""'「」]+|["""'「」]+$/g, '').trim();
  // fallback: try up to 50 chars, truncate at sentence boundary
  const clean2 = lines.find(l => l.length > 0 && l.length <= 80 && !noiseRe.test(l) && !isHeader(l));
  if (clean2) {
    const trimmed = clean2.replace(/^["""'「」]+|["""'「」]+$/g, '').trim();
    // cut at first sentence-ending punctuation within 35 chars
    const m = trimmed.match(/^.{1,35}[。！？…～]/);
    return m ? m[0] : trimmed.substring(0, 60);
  }
  // last resort: first line, strip leading noise symbols, truncate
  return (lines[0] || '').replace(/^[\d.、）)★▌▶◆#【\["'「]+\s*/, '').trim().substring(0, 50);
}

// ── Extract compact persona snippet from current ST character ─────────────────
function lgGetPersona() {
  try {
    console.log("[Ludo] lgGetPersona called");
    // Try multiple ways to get context
    const ctx = getContext?.() || window.SillyTavern?.getContext?.() || {};
    
    // Try to get character from multiple sources
    let char = null;
    if (ctx.characters && ctx.characterId !== undefined) {
      char = ctx.characters[ctx.characterId];
    }
    // Fallback: try global this_chid
    if (!char && typeof this_chid !== 'undefined' && window.characters) {
      char = window.characters[this_chid];
    }
    
    if (!char) {
      console.warn('[Ludo] No character data found');
      return '';
    }
    
    const personality = (char.personality || '').replace(/\s+/g, ' ').trim();
    const description = (char.description || '').replace(/\s+/g, ' ').trim();
    const src = personality || description.substring(0, 200);
    
    if (src) {
      console.log('[Ludo] Persona loaded:', src.substring(0, 50) + '...');
      return `【角色人设】${src}。`;
    }
    return '';
  } catch(e) {
    console.error('[Ludo] lgGetPersona error:', e);
    return '';
  }
}
// Style pools for different character personalities
const LG_FALLBACK_POOLS = {
  // Formal/Upper-class (上位者, 严肃, 高傲)
  formal: {
    game_start : ['开始。','准备就绪。','公平竞争。','我先手。'],
    eaten_user : ['棋子被吃。','下次注意。','重来。'],
    user_win   : ['你赢了。下次不会如此。','运气不错。','承让。'],
    char_win   : ['我赢了。','实力使然。','还需进步。'],
    dice_1     : ['一点。','最小步数。','谨慎。'],
    dice_2     : ['两步。','稳步。','尚可。'],
    dice_3     : ['三点。','继续。','保持。'],
    dice_4     : ['四点。','不错。','进展。'],
    dice_5     : ['五点。','良好。','肯定。'],
    dice_6     : ['六点。出发。','最大。','很好。'],
  },
  // Casual/Friendly (轻松, 友好)
  casual: {
    game_start : ['开始吧！','准备好输了吗？','公平竞争哦~','我先出手？'],
    eaten_user : ['被你吃掉了...','下次我要报仇！','好过分，重来！'],
    user_win   : ['恭喜你赢了…下次我不会手软','你运气好','哎呀输了'],
    char_win   : ['我赢了～','看到没，就是这么强','你还需要练习哦'],
    dice_1     : ['才1步，加油！','哈，1点~','慢慢来'],
    dice_2     : ['2步，稳稳的','小步前进~','2点不错'],
    dice_3     : ['3步，继续！','走3格~','加油'],
    dice_4     : ['4步，有点猛','4格！','哦哦4点'],
    dice_5     : ['5步！势头不错','哇5点！','厉害5格'],
    dice_6     : ['哇！6！出发咯！','6最大！走起！','6点棒！'],
  },
  // Neutral (中性)
  neutral: {
    game_start : ['游戏开始。','掷出6出发。','先到终点胜。'],
    eaten_user : ['棋子被吃。','位置重置。','重新开始。'],
    user_win   : ['你赢了。','游戏结束。','恭喜。'],
    char_win   : ['我赢了。','游戏结束。','胜利。'],
    dice_1     : ['掷出1点。','前进1格。','1点。'],
    dice_2     : ['掷出2点。','前进2格。','2点。'],
    dice_3     : ['掷出3点。','前进3格。','3点。'],
    dice_4     : ['掷出4点。','前进4格。','4点。'],
    dice_5     : ['掷出5点。','前进5格。','5点。'],
    dice_6     : ['掷出6点。','前进6格。','6点。'],
  },
};

// Default to formal (most common for ST characters)
var LG_FALLBACK = LG_FALLBACK_POOLS.formal;

// Function to select pool based on persona
function lgSelectPool(personaText) {
  if (!personaText) return;
  const lower = personaText.toLowerCase();
  // Check for upper-class/formal keywords
  if (/上位者|高傲|严肃|端庄|威严|贵族|精英|总裁|老板|领导|冷酷|冷漠/.test(lower)) {
    LG_FALLBACK = LG_FALLBACK_POOLS.formal;
    console.log('[Ludo] Using formal pool (upper-class character)');
  } else if (/活泼|开朗|可爱|温柔|友好|亲切|热情|元气/.test(lower)) {
    LG_FALLBACK = LG_FALLBACK_POOLS.casual;
    console.log('[Ludo] Using casual pool (friendly character)');
  } else {
    LG_FALLBACK = LG_FALLBACK_POOLS.neutral;
    console.log('[Ludo] Using neutral pool (default)');
  }
}


// ── Square event trigger ─────────────────────────────────────────
async function lgTriggerSquareEvent(player, pos) {
  const ev = SQUARE_EVENTS[pos];
  if (!ev) return;
  const isUser = player === 'user';
  const moverName = isUser ? '你' : LG.charName;

  // Populate popup
  document.getElementById('rp-sq-event-sq').textContent = `第 ${pos} 格`;
  document.getElementById('rp-sq-event-emoji').textContent = ev.emoji;
  document.getElementById('rp-sq-event-text').textContent = ev.text;
  document.getElementById('rp-sq-event-note').textContent = ev.note || '';

  lgMsg('sys', `📍 第${pos}格 ${ev.emoji} — ${ev.text}`);

  // Show popup and wait for done click
  await new Promise(resolve => {
    const overlay = document.getElementById('rp-sq-event');
    const btn = document.getElementById('rp-sq-event-done');
    overlay.style.display = 'flex';
    const handler = () => {
      btn.removeEventListener('click', handler);
      overlay.style.display = 'none';
      resolve();
    };
    btn.addEventListener('click', handler);
  });

  // Apply special mechanics after popup closed
  if (ev.type === 'move') {
    const curPos = isUser ? LG.userPos : LG.charPos;
    let newPos = curPos + ev.delta;
    if (newPos < 1) newPos = 1;
    if (newPos > 53) newPos = 53;
    if (isUser) LG.userPos = newPos; else LG.charPos = newPos;
    const dir = ev.delta > 0 ? `前进${ev.delta}格` : `后退${Math.abs(ev.delta)}格`;
    lgMsg('sys', `${moverName}${dir}，到达第${newPos}格`);
    lgRender();
  } else if (ev.type === 'skip') {
    if (isUser) LG.userSkip = true; else LG.charSkip = true;
    lgMsg('sys', `⏸️ ${moverName}下一轮停留`);
  } else if (ev.type === 'reroll') {
    LG.pendingReroll = player;
    lgMsg('sys', `🎲 ${moverName}获得额外一次掷骰！`);
  }
}

function lgCharComment(event) {
  if (!LG.active && !event.endsWith('_win')) return;

  const n      = LG.lastDice;
  const cPos   = LG.charPos;
  const uPos   = LG.userPos;
  const isCharTurn = event.endsWith('_char');
  const lead   = cPos > uPos + 5 ? '，我目前领先' : cPos < uPos - 5 ? '，我目前落后' : '';
  const subject = isCharTurn
    ? `我掷出了${n}点${lead}`
    : `对方掷出了${n}点${lead}`;
  const persona = lgGetPersona();
  const prompt  = `${persona}
[飞行棋游戏]当前状况：${subject}。
${LG.charName}对玩家说一句简短的游戏内评论（15字以内，语气自然贴合角色）：`;

  // 异步 AI 生成，不阻塞游戏流程
  (async () => {
    try {
      let resp = null;
      if (typeof generateRaw === 'function') {
        resp = await generateRaw(prompt, '', false, false, undefined, 'quiet');
      } else if (typeof window.generateQuietPrompt === 'function') {
        resp = await window.generateQuietPrompt(prompt, false, false);
      }
      if (resp && resp.trim()) { lgMsg('char', cleanGameReply(resp)); return; }
    } catch(e) { /* ignore */ }
    // 兜底：pool 回复
    const dKey = `dice_${n}`;
    const pool = LG_FALLBACK[event] || LG_FALLBACK[dKey] || ['继续！', '加油！'];
    lgMsg('char', pool[Math.floor(Math.random() * pool.length)]);
  })();
}

async function lgGameChat(text) {
  if (!text.trim()) return;
  lgMsg('user', text);

  // quick in-character reply via OOC injection (doesn't advance story)
  const ctx    = getContext();
  const cName  = LG.charName;
  const persona = lgGetPersona();
  // Completion-style prompt: AI fills dialogue directly after open quote
  const prompt = `${persona}\n[游戏中聊天]用户对${cName}说："${text}"\n${cName}简短回应："`;

  try {
    const { generateRaw } = await import('../../../../script.js').catch(()=>({}));
    if (typeof generateRaw === 'function') {
      const resp = await generateRaw({ prompt, max_new_tokens: 150, quiet: true });
      if (resp && resp.trim()) { lgMsg('char', cleanGameReply(resp)); return; }
    }
  } catch(e) { /* fallback */ }

  // Fallback replies
  const fallbacks = ['嗯嗯~','专注游戏！','别分心，来追我','说什么，快走棋！','哈哈，继续玩！'];
  setTimeout(() => lgMsg('char', fallbacks[Math.floor(Math.random()*fallbacks.length)]), 500+Math.random()*300);
}

// ================================================================
//  GLOBAL SCOPE EXPORTS  (required: onclick="" attrs run in window scope)
// ================================================================
Object.assign(window, {
  openHongbao, playVoice, sendUserHongbao,
  toggleAttachPanel, showHongbaoSheet, sendLocation,
  showLocationInput, triggerImagePick,
  showAddChoice, confirmCreateGroup,
  openThread, openSettings,
  lgUserRoll,
});

// ================================================================
//  ENTRY
// ================================================================
jQuery(async () => { await init(); });



