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
  padding:10px 14px; display:flex; gap:10px; align-items:flex-start;
  box-shadow:0 2px 8px rgba(0,0,0,.08);
}
.rp-ln-type { font-size:10px; font-weight:700; color:rgba(0,0,0,.4); text-transform:uppercase; letter-spacing:.6px; white-space:nowrap; }
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
#rp-app-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; padding:0 18px; width:100%; }
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
/* ── NIGHT MODE TOGGLE ── */
.rp-dm-btn{position:absolute;top:58px;right:-14px;z-index:400;width:28px;height:28px;border-radius:14px;background:rgba(240,240,240,.95);border:1px solid rgba(0,0,0,.1);display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.18);transition:background .25s,border-color .25s}
.rp-dark .rp-dm-btn{background:rgba(20,22,42,.9);border-color:rgba(255,255,255,.15)}
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

`;

function injectStyles() {
  if (window._rpPhoneSheet || document.getElementById('rp-phone-css')) return;
  try {
    // Use adoptedStyleSheets: creates NO <style> DOM element,
    // so SillyTavern CSS parser cannot scan or interfere with it.
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(RP_PHONE_CSS);
    document.adoptedStyleSheets = [...(document.adoptedStyleSheets || []), sheet];
    window._rpPhoneSheet = true;
  } catch(e) {
    // Fallback for older Electron builds
    console.warn('[Raymond Phone] adoptedStyleSheets unavailable, using style tag fallback');
    const el = document.createElement('style');
    el.id = 'rp-phone-css';
    el.textContent = RP_PHONE_CSS;
    document.body.appendChild(el);
  }
}

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
  moments: [],
  darkMode: false,
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
      moments: STATE.moments,
      darkMode: STATE.darkMode,
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

      <button class="rp-dm-btn" id="rp-dm-btn" title="夜间模式">🌙</button>
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
              <div class="rp-app" data-app="moments">
                <div class="rp-app-ico" style="background:linear-gradient(145deg,#ff6b35,#f7931e)">
                  <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="url(#mcg)"/><defs><linearGradient id="mcg" x1="0" y1="0" x2="40" y2="40"><stop offset="0%" stop-color="#ff7043"/><stop offset="100%" stop-color="#ff8f00"/></linearGradient></defs><ellipse cx="17" cy="18" rx="9" ry="7" fill="white" opacity=".95"/><path d="M26 24l4 5-7-2" fill="white" opacity=".95"/><circle cx="14" cy="18" r="1.3" fill="#ff7043"/><circle cx="17" cy="18" r="1.3" fill="#ff7043"/><circle cx="20" cy="18" r="1.3" fill="#ff7043"/></svg>
                </div>
                <div class="rp-app-lbl">朋友圈</div>
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

        <!-- 朋友圈 -->
        <div id="rp-view-moments" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">朋友圈</span>
            <span></span>
          </div>
          <div id="rp-moments-list"></div>
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
  injectStyles(); // FIX: inject CSS via JS, bypass ST extension CSS pipeline
  $('body').append(HTML);

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

  if (STATE.darkMode) { $('#rp-phone').addClass('rp-dark'); $('#rp-dm-btn').text('☀️'); }

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
    STATE.currentThread = s.currentThread;
  } else {
    const persisted = loadState(newChatId);
    if (persisted) {
      STATE.threads = persisted.threads;
      STATE.notifications = persisted.notifications || [];
      STATE.sync = persisted.sync || { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments = persisted.moments || [];
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

  // Dark mode toggle
  $('#rp-dm-btn').on('click', toggleDarkMode);

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

  // FIX4+FIX1: 判断联系人是否为主角，生成不同的 OOC 指令
  // 修复：mainCharName 为空时，仅将内置线程 raymond/gaspard 视为主角，避免把所有 NPC 错误归为主角
  const ctx = getContext();
  const mainCharName = ctx?.name2 || '';
  let isMainChar;
  if (mainCharName) {
    isMainChar = th.name.toLowerCase().includes(mainCharName.toLowerCase()) ||
      mainCharName.toLowerCase().includes(th.name.toLowerCase());
  } else {
    // 无法获取主角名时，只有内置预设线程才视为主角
    isMainChar = (th.id === 'raymond' || th.id === 'gaspard');
  }

  let oocText;
  if (isMainChar) {
    // 对话对象是主角：根据场景决定口头还是短信回复
    oocText = `[场景判断：${th.name}，若你与{{user}}不在同一场景（不同地点或不同房间均算），必须通过手机短信格式回复：<PHONE><SMS FROM="${th.name}" TIME="${ts}">回复内容</SMS></PHONE>；若在同一场景中，可口头回复，无需手机格式。]`;
  } else {
    // FIX1（加强版）: NPC联系人——明确告知 AI 此 NPC 真实存在，主角完全不知情
    // 同时显式覆盖世界书中"FROM字段仅限Raymond/Gaspard"的限制，要求 AI 代写 NPC 回复
    const charName = mainCharName || '主角';
    oocText = `[高优先级叙事指令（覆盖其他规则）：{{user}}刚才私下给独立NPC"${th.name}"发了一条手机短信。"${th.name}"是故事中真实存在的NPC角色，不是幻想或虚构出来的人物。${charName}完全不知道这条短信的存在，没有看到它，本轮回复中${charName}绝对不能提及、评论、质疑、否认或以任何方式回应这条短信——请将其视为${charName}感知范围之外发生的事。请立即以叙事者/旁白身份，代写"${th.name}"收到短信后的回复（语气符合"${th.name}"的人设，用中文），并使用以下格式输出（此格式此刻优先级高于世界书中任何FROM字段的限制规则）：\n<PHONE><SMS FROM="${th.name}" TIME="${ts}">（此处填写${th.name}的回复内容）</SMS></PHONE>\n正文可继续推进主线剧情，但${charName}在这一轮中不得以任何形式知晓或提及这条短信。]`;
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

  const momentsRe = /<MOMENTS\s+FROM="([^"]+)"\s+TIME="([^"]+)">([\s\S]*?)<\/MOMENTS>/gi;
  while ((m = momentsRe.exec(block)) !== null) {
    incomingMoment(m[1].trim(), m[2].trim(), m[3].trim());
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
//  DARK MODE
// ================================================================
function toggleDarkMode() {
  STATE.darkMode = !STATE.darkMode;
  $('#rp-phone').toggleClass('rp-dark', STATE.darkMode);
  $('#rp-dm-btn').text(STATE.darkMode ? '☀️' : '🌙');
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
          <div class="rp-moment-av" style="background:${moment.avatarBg}">${moment.initials}</div>
          <div class="rp-moment-meta">
            <div class="rp-moment-name">${escHtml(moment.name)}</div>
            <div class="rp-moment-time">${moment.time}</div>
          </div>
        </div>
        <div class="rp-moment-text">${escHtml(moment.text)}</div>
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

function incomingMoment(fromRaw, time, text) {
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
    likes: [],
    comments: [],
  });
  if (STATE.currentView === 'moments') renderMoments();
  showBanner((th ? th.name : fromRaw), '发了朋友圈：' + text.slice(0,25) + (text.length>25?'…':''), time);
  saveState();
}

function incomingComment(momentId, fromRaw, time, text, replyTo) {
  const moment = STATE.moments && STATE.moments.find(m => m.id === momentId || m.id.includes(momentId));
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
  document.querySelector('#send_but')?.click();
}

// ================================================================
//  ENTRY
// ================================================================
jQuery(async () => { await init(); });
