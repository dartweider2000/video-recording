(function(){"use strict";var e=(s=>(s.Init="init",s.Working="working",s.Pause="pause",s))(e||{});let i=0,t=e.Pause;const n=10,u=()=>{if(t===e.Pause)return;i+=n;const s={status:t,milliseconds:i};self.postMessage(s),setTimeout(u,n)};self.addEventListener("message",({data:s})=>{const{status:a,milliseconds:o}=s;a===e.Init?(i=o,t=e.Working,setTimeout(u,n)):a===e.Pause&&(t=e.Pause)})})();
