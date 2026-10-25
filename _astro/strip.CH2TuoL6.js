var e=matchMedia(`(hover: none) and (pointer: coarse)`).matches,t=null;function n(){return e?(t||(t=document.createElement(`div`),t.style.cssText=`position:fixed;left:0;top:0;width:0;height:100lvh;visibility:hidden;pointer-events:none`,document.documentElement.append(t)),Math.max(innerHeight,t.offsetHeight||0)):innerHeight}function r(t){let r=innerWidth,i=n();addEventListener(`resize`,()=>{let a=innerWidth,o=n();e&&a===r&&o===i||(r=a,i=o,t())})}function i(t=n()){return e?Math.round(t*.3):120}function a(e,t=0){let n=Math.round(scrollY)-e;return t?Math.min(n,Math.floor(document.body.offsetHeight-t)):n}function o(e,t){return e<=760&&!(e>t&&t<=500)||e>760&&e<=1100&&t>=e*1.2}function s(e,t){let n=e<=760?16:48,r=e<=760?240:280;return Math.max(0,Math.min(t,Math.round(e*.625),e-2*n-r))}var c=`(max-width: 760px) and (max-height: 340px) and (orientation: landscape)`,l=typeof location<`u`&&new URLSearchParams(location.search).has(`diag`),u=null,d=null,f=[];function p(){if(u||!document.body)return u;u=document.createElement(`div`),u.setAttribute(`aria-hidden`,`true`),u.style.cssText=`position:fixed;right:8px;top:8px;z-index:9999;max-width:min(320px,calc(100vw - 16px));max-height:30vh;overflow:hidden;padding:6px 8px;border-radius:6px;background:rgba(29,29,21,.86);color:#f4f1e8;font:10.5px/1.35 ui-monospace,Menlo,monospace;pointer-events:none;white-space:pre-wrap`,d=document.createElement(`div`),u.append(d),document.body.append(u);let e=()=>{d&&(d.textContent=`live WebGL contexts: ${window.__glLive?.()??`?`}`),setTimeout(e,500)};return e(),u}function m(e,t=!1){if(!l)return;let n=(performance.now()/1e3).toFixed(1);f.push(`${n}s ${t?`! `:``}${e}`);let r=p();if(!r)return;let i=document.createElement(`div`);for(i.textContent=f[f.length-1],t&&(i.style.color=`#ff8a7a`),d.after(i);r.childNodes.length>16;)r.lastChild.remove()}l&&(addEventListener(`error`,e=>m(`${e.message}${e.filename?` (${e.filename.split(`/`).pop()}:${e.lineno})`:``}`,!0)),addEventListener(`unhandledrejection`,e=>m(`rejection: ${(e.reason&&(e.reason.message||e.reason))??`?`}`,!0)),document.readyState===`loading`?addEventListener(`DOMContentLoaded`,()=>{p(),m(`diag on`)}):(p(),m(`diag on`)));var h=new WeakMap,g=new WeakMap,_=(e,t)=>e+`\0`+t;function v(e,t,n){let r=_(t,n),i=g.get(e);i||g.set(e,i=new Map),i.set(r,[t,n]);let a=h.get(e)?.get(r);if(a&&!e.isContextLost())return h.get(e).delete(r),a;let o=(t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:null},s=o(e.VERTEX_SHADER,t),c=o(e.FRAGMENT_SHADER,n);if(!s||!c)return null;let l=e.createProgram();return e.attachShader(l,s),e.attachShader(l,c),e.linkProgram(l),e.getProgramParameter(l,e.LINK_STATUS)?l:null}var y=e=>{let t=window.requestIdleCallback;t?t(e,{timeout:400}):setTimeout(e,40)},b=[],x=!1,S=e=>{if(b.push(e),x)return;x=!0;let t=()=>{let e=b.shift();if(!e){x=!1;return}y(()=>{e(),requestAnimationFrame(t)})};t()};function C(e,t){let n=t??[...g.get(e)?.values()??[]],r=h.get(e);r||h.set(e,r=new Map);let i=r,a=e.getExtension(`KHR_parallel_shader_compile`),o=([t,n])=>{let r=e.createProgram(),i=e.createShader(e.VERTEX_SHADER),a=e.createShader(e.FRAGMENT_SHADER);return!r||!i||!a?null:(e.shaderSource(i,t),e.compileShader(i),e.shaderSource(a,n),e.compileShader(a),e.attachShader(r,i),e.attachShader(r,a),e.linkProgram(r),r)},s=(t,n)=>{n&&!e.isContextLost()&&e.getProgramParameter(n,e.LINK_STATUS)&&i.set(t,n)};if(a){let t=n.map(e=>[_(...e),o(e)]);return new Promise(n=>{let r=()=>{if(e.isContextLost()){n();return}t.every(([,t])=>!t||e.getProgramParameter(t,a.COMPLETION_STATUS_KHR))?(t.forEach(([e,t])=>s(e,t)),n()):requestAnimationFrame(r)};requestAnimationFrame(r)})}return n.reduce((t,n)=>t.then(()=>new Promise(t=>y(()=>{e.isContextLost()||s(_(...n),o(n)),t()}))),Promise.resolve())}function w(e,t,n=`p`){let r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);let i=e.getAttribLocation(t,n);e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0)}var T=0,E=.3,ee=[],D=new WeakSet,te=e=>!!e&&!e.isContextLost()&&!D.has(e);window.__glLive=()=>ee.filter(e=>e.canvas.isConnected&&!e.gl.isContextLost()).length;var O=[],ne=0,re=()=>{ne=0;for(let e of O)e()},k=()=>{ne||=requestAnimationFrame(re)},A=0;addEventListener(`scroll`,()=>{A=performance.now(),O.length&&k()},{passive:!0}),addEventListener(`resize`,k);function ie(e,t,n,r,i){let a=t.getExtension(`WEBGL_lose_context`);ee.push({name:n.name,gl:t,canvas:e});let o=!1,s=!1,c=!0,l=!1,u=0;e.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),o=!0,D.add(t),s&&c&&setTimeout(()=>{c&&t.isContextLost()&&a?.restoreContext()}),u++,h.delete(t),s||(l=!0,m(`${n.name}: context lost`,!0))});let d=()=>{let e=n.near;if(!e)return!0;if(typeof e==`function`)return e(0);let t=e.getBoundingClientRect();return t.bottom>0&&t.top<innerHeight};if(e.addEventListener(`webglcontextrestored`,()=>{if(!c){s=!0,o=!1,D.add(t),a?.loseContext();return}s=!1;let e=++u,f=()=>{if(e!==u||t.isContextLost())return;D.delete(t);let a=performance.now();try{r(),i()}catch(e){m(`${n.name}: restore failed: ${e.message}`,!0)}let o=performance.now()-a;(window.__glRestore??=[]).push([n.name,Math.round(o)]),o>16&&m(`${n.name}: rebuild took ${Math.round(o)} ms`,!0),l&&(l=!1,m(`${n.name}: restored`))};d()?f():C(t).then(()=>S(f))}),!n.near||!a)return;let f=n.near,p=n.margin??1,g=!1,_=()=>{if(c){g=!1;return}if(performance.now()-A<150){y(_);return}g=!1,t.isContextLost()||(s=!0,o=!1,D.add(t),a.loseContext())},v=(e,n)=>{(c?!n:e)&&(c=!c,c?s&&t.isContextLost()&&o&&a.restoreContext():g||(g=!0,y(_)))};if(typeof f!=`function`&&`IntersectionObserver`in window){let e=!0,t=!0,n=(n,r)=>new IntersectionObserver(n=>{r(n[n.length-1].isIntersecting),v(e,t)},{rootMargin:`${Math.round((p+n)*100)}% 0px`}).observe(f);n(T,t=>{e=t}),n(E,e=>{t=e});return}let b=e=>{if(typeof f==`function`)return f(p+e);let t=f.getBoundingClientRect(),n=innerHeight;return t.bottom>-n*(p+e)&&t.top<n*(1+p+e)};O.push(()=>v(b(T),b(E))),requestAnimationFrame(k)}var j=new WeakMap;function M(e,t,n){let r=j.get(e);r||j.set(e,r=new Map),r.get(t)!==n&&(r.set(t,n),t.startsWith(`--`)?e.style.setProperty(t,n):e.style[t]=n)}function ae(e,t){M(e,`display`,t?``:`none`)}function oe(e,t,n=`150%`){if(!(`IntersectionObserver`in window)){t();return}let r=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(r.disconnect(),t())},{rootMargin:`${n} 0px ${n} 0px`});r.observe(e)}async function se(e){if(`createImageBitmap`in window)try{let t=await(await fetch(e)).blob();return await createImageBitmap(t,{premultiplyAlpha:`none`,colorSpaceConversion:`none`})}catch{}let t=new Image;return t.src=e,await t.decode(),t}var N=0;addEventListener(`scroll`,()=>{N=performance.now()},{passive:!0});function ce(e){return new Promise(t=>{let n=()=>{performance.now()-N>120||e.getBoundingClientRect().top<innerHeight*1.2?t():requestAnimationFrame(n)};requestAnimationFrame(n)})}var P=(e,t=0,n=1)=>Math.min(n,Math.max(t,e)),F=e=>(e=P(e),e*e*(3-2*e)),I=(e,t,n)=>F((n-e)/(t-e)),L=(e,t,n)=>e+(t-e)*n,R=.15,z=matchMedia(`(prefers-reduced-motion: reduce)`).matches;function le(e=R,t=5e-4){let n=NaN,r=0,i=!0;return{step(a,o=performance.now(),s=1){let c=o===r?0:i?1/60:Math.min(.1,Math.max(0,(o-r)/1e3));return r=o,z||n!==n?n=a:(n+=(a-n)*(1-Math.exp(-c/e)),n=a+(n-a)*Math.min(1,Math.max(0,s)),Math.abs(a-n)<t&&(n=a)),i=n===a,n},snap(){n=NaN},get easing(){return!i}}}var B=.05,V=matchMedia(`(hover: none) and (pointer: coarse)`).matches,H=le(V?B:R,.05),U=-1,W=0,G=()=>{let e=document.timeline?.currentTime;return typeof e==`number`?e:performance.now()};function K(){let e=G();return e===U?W:(U=e,Math.abs(scrollY-W)>innerHeight*2&&H.snap(),W=H.step(scrollY,e),W)}var ue=.64,de=.8,q=matchMedia(`(max-width: 760px)`);function J(){return q.matches?de:ue}function fe(){return Math.min(q.matches?1.5:2,devicePixelRatio||1)}function pe(){let e=NaN;return{at(t,n){return Math.abs(t-e)<n*.5||(e=t),e},reset(){e=NaN}}}function me(){return scrollY-K()}function he(){return K(),H.easing}addEventListener(`hashchange`,()=>H.snap()),r(()=>H.snap()),window.__scrub=()=>({y:W,scrollY,easing:H.easing});var Y=null;function X(){let e=()=>{};return Y=new Promise(t=>{e=t,setTimeout(t,15e3)}),e}function ge(){return Y??Promise.resolve()}var Z=matchMedia(`(prefers-reduced-motion: reduce)`).matches,Q=Math.max(1,Number(new URLSearchParams(location.search).get(`bleedslow`))||1),_e=.7*Q,ve=.38*Q,$={bw:1,line:2}[document.documentElement.dataset.dm??``]??0,ye=`attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`,be=`precision highp float;
uniform vec2 u_res;
uniform vec4 u_rect;        // slice in device px, top-left origin: x0 y0 x1 y1
uniform vec4 u_uv;          // the part of the square crop the slice shows: x y w h
uniform sampler2D u_bw, u_col, u_dist, u_sk;
uniform vec2 u_origin;      // device px
uniform float u_fill;       // the hover bleed, 0..1
uniform float u_recede;     // the retract on leave, 0..1 (0 while hovered)
uniform float u_sfill;      // ?dm=bw / line: the river's shock, flooding in from u_sorigin (the top edge), 0..1
uniform float u_srec;       // its scroll-linked retract, 0..1, draining out toward u_rorigin (below the bottom edge)
uniform vec2 u_sorigin, u_rorigin; // device px
uniform float u_arr;        // this slice's arrival, 0..1
uniform float u_flash;      // false colour carried by the arrival, 0..1
uniform float u_seed, u_dpr, u_time;
uniform float u_solid;      // a phone: the slice is its colour photograph, as it is, with no front (Evan, 2026-10-22)
uniform float u_mode;       // 0 the Earth as Art strip; 1 black and white, 2 line, developing into true colour
const vec3 BONE = vec3(.933,.933,.902);
const vec3 INK  = vec3(.114,.114,.082);
float h21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),u.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; mat2 r=mat2(.8,-.6,.6,.8); for(int k=0;k<5;k++){ v+=a*vnoise(p); p=r*p*2.03+17.1; a*=.5; } return v; }
float farFrom(vec2 o){ vec2 a = u_rect.xy - o, b = u_rect.zw - o;
  return max(max(length(a), length(b)), max(length(vec2(a.x,b.y)), length(vec2(b.x,a.y)))); }
float farCorner(){ return farFrom(u_origin); }
void main(){
  vec2 p = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec2 r = (p - u_rect.xy) / (u_rect.zw - u_rect.xy);
  vec2 uv = u_uv.xy + clamp(r, 0., 1.) * u_uv.zw;
  float lum = texture2D(u_bw, uv).r;
  vec3 col = texture2D(u_col, uv).rgb;
  if (u_solid > .5) { gl_FragColor = vec4(col, 1.); return; }
  vec2 q = p / u_dpr;                                   // css px, so the texture of the edge is the same at any dpr
  vec3 tone = mix(INK, BONE, smoothstep(.02, .98, lum));

  // ---- the final landscapes: the arrival's wet front runs down from the top edge carrying the true colour in,
  // over-bright at its edge (the shock), and leaves the place in true colour. Before it: the warm black and white
  // (warm black to bone, the post images' tone), or bone under the line drawing (an overlay).
  if (u_mode > .5) {
    vec3 pre = u_mode < 1.5 ? mix(vec3(.094, .082, .071), vec3(.933, .925, .886), lum) : BONE;
    // the river's arrival: a short pulse of the place's own colour runs down at the wet edge and is gone (only with
    // u_flash, which these modes keep at 0: skipping its two fbm saves a third of the shader's cost per pixel)
    vec3 mb = pre;
    if (u_flash > 0.) {
      float ft = smoothstep(.12, .92, u_arr);
      float lead = r.y * .9 + .14 * (fbm(q * .010 + u_seed + 1.3) - .5) + .05 * (fbm(q * .055 + u_seed + 8.1) - .5);
      float wetP = ft * 1.25 - lead;
      float pulse = smoothstep(0., .02, wetP) * (1. - smoothstep(.03, .2, wetP)) * (1. - smoothstep(.8, 1., ft)) * u_flash;
      float tideP = exp(-pow(wetP / .02, 2.)) * step(0., wetP) * (1. - smoothstep(.85, 1., ft)) * u_flash;
      mb = mix(pre, mix(col, pre, .2), pulse * .75);
      mb *= 1. - .1 * tideP;
    }
    // Two sources of colour, each with its own front: the river's shock (from the top edge; its retract drains the
    // colour out through the bottom edge, so the grey comes in from the top) and the hover bleed (from the pointer).
    // What shows is the union of the two (max). The wet edge, the tide lines and the fresh wash's thinness belong to a
    // front only where it moves into paper the other source hasn't coloured, so hovering a slice already in colour
    // changes nothing, hovering a part-retracted one bleeds only into its grey, and leaving takes back only what the
    // hover added (Evan, 2026-10-22).
    float mS = 0., wetS = -1., tideS = 0., tideRS = 0.;
    if (u_sfill > 0. && u_srec < 1.) {
      float frac = length(p - u_sorigin) / farFrom(u_sorigin);
      frac *= .82 + .36 * fbm(q * .006 + u_seed);
      frac += .09 * (lum - .5);
      frac += .05 * (fbm(q * .045 + u_seed + 3.7 + u_time * .02) - .5);
      wetS = u_sfill * 1.32 - frac;
      mS = max(smoothstep(0., .022, wetS), smoothstep(.97, 1., u_sfill));
      tideS = exp(-pow(wetS / .022, 2.)) * step(0., wetS) * (1. - smoothstep(.94, 1., u_sfill));
      if (u_srec > 0.) {
        float fr = length(p - u_rorigin) / farFrom(u_rorigin);
        fr *= .82 + .36 * fbm(q * .006 + u_seed + 4.4);
        fr += .14 * (fbm(q * .008 + u_seed + 9.1) - .5) + .03 * (fbm(q * .06 + u_seed + 5.3) - .5);
        float wetR = mix(1.42, -.16, u_srec) - fr;
        mS *= smoothstep(0., .03, wetR);
        tideRS = exp(-pow(wetR / .02, 2.)) * step(-.004, wetR);
      }
    }
    float mH = 0., wetH = -1., tideH = 0., tideRH = 0.;
    if (u_fill > 0.) {
      float frac = length(p - u_origin) / farCorner();
      frac *= .82 + .36 * fbm(q * .006 + u_seed);
      frac += .09 * (lum - .5);
      frac += .05 * (fbm(q * .045 + u_seed + 3.7 + u_time * .02) - .5);
      float f = u_fill * 1.32;
      wetH = f - frac;
      mH = max(smoothstep(0., .022, wetH), smoothstep(.97, 1., u_fill));
      if (u_recede > 0.) {
        float fr = frac + .14 * (fbm(q * .008 + u_seed + 9.1) - .5) + .03 * (fbm(q * .06 + u_seed + 5.3) - .5);
        float wetR = mix(f + .04, -.16, u_recede) - fr;
        mH *= smoothstep(0., .03, wetR);
        tideRH = exp(-pow(wetR / .02, 2.)) * step(-.004, wetR);
      }
      tideH = exp(-pow(wetH / .022, 2.)) * step(0., wetH) * (1. - smoothstep(.94, 1., u_fill));
    }
    vec3 o = mb;
    float m = max(mS, mH);
    if (m > 0.) {
      float dil = max(smoothstep(0., .2, wetS) * mS, smoothstep(0., .2, wetH) * mH) / max(m, 1e-3);
      float tide = max(tideS * (1. - mH), tideH * (1. - mS));
      float tideR = max(tideRS * (1. - mH), tideRH * (1. - mS));
      vec3 pig = mix(mix(col, BONE, .3), col, dil);
      pig = mix(pig, pig * pig * 1.1, .55 * tide);
      pig = mix(pig, pig * pig * 1.06, .35 * tideR);
      float gr = .6 * vnoise(q * .16 + u_seed) + .4 * vnoise(q * .42 + u_seed + 2.);
      pig *= 1. + .16 * (gr - .5) * (1. - .55 * dil);
      o = mix(mb, pig, m);
    }
    gl_FragColor = vec4(o, 1.);
    return;
  }

  // ---- arrival: the slice starts as a faint sketch. A wet front runs down from the top edge (where the river will
  // come in), reaching the drawn lines a little ahead of the paper between them; it carries the false colour at its
  // edge and leaves the black-and-white photograph behind it as it dries. At 1 the whole slice is the photograph.
  float t = u_arr;
  float ft = smoothstep(.12, .92, t);
  vec2 aux = vec2(texture2D(u_dist, uv).r, texture2D(u_sk, uv).r); // (only this path reads them)
  float d = sqrt(aux.r);                                        // distance from the drawing, 0..1
  float lead = r.y * .9 + .2 * d
    + .14 * (fbm(q * .010 + u_seed + 1.3) - .5)
    + .05 * (fbm(q * .055 + u_seed + 8.1) - .5);
  float wetA = ft * 1.4 - lead;
  float a = smoothstep(0., .028, wetA);
  a = max(a, smoothstep(.96, 1., ft));
  float tideA = exp(-pow(wetA / .02, 2.)) * step(0., wetA) * (1. - smoothstep(.9, 1., ft));
  float band = smoothstep(0., .02, wetA) * (1. - smoothstep(.04, .24, wetA)) * (1. - smoothstep(.82, 1., ft)) * u_flash;
  float sk = aux.g * (.36 + .4 * smoothstep(0., .14, t)) * (1. - .88 * a);
  vec3 base = mix(BONE, tone, a);
  base = mix(base, col, band * .9);
  base *= 1. - .22 * tideA;
  base = mix(base, INK, sk * .8);

  // ---- hover: the false colour bleeds in from the pointer
  vec3 outc = base;
  if (u_fill > 0.) {
    float frac = length(p - u_origin) / farCorner();
    frac *= .82 + .36 * fbm(q * .006 + u_seed);                   // the front isn't a circle
    frac += .09 * (lum - .5);                                      // it runs ahead through the darker ground
    frac += .05 * (fbm(q * .045 + u_seed + 3.7 + u_time * .02) - .5);  // fingering at the wet edge
    float f = u_fill * 1.32;
    float wet = f - frac;
    float m = smoothstep(0., .022, wet);
    m = max(m, smoothstep(.97, 1., u_fill));                      // full colour exactly when the fill completes
    // the retract: a front from the colour's outer edge back past where it came in, at an uneven speed of its own
    float tideR = 0.;
    if (u_recede > 0.) {
      float edgeR = f + .04;
      float fr = frac + .14 * (fbm(q * .008 + u_seed + 9.1) - .5) + .03 * (fbm(q * .06 + u_seed + 5.3) - .5);
      float wetR = mix(edgeR, -.16, u_recede) - fr;
      m *= smoothstep(0., .03, wetR);
      tideR = exp(-pow(wetR / .02, 2.)) * step(-.004, wetR);
    }
    float dil = smoothstep(0., .2, wet);                           // fresh wash is thinner, then deepens
    float tide = exp(-pow(wet / .022, 2.)) * step(0., wet) * (1. - smoothstep(.94, 1., u_fill));
    vec3 pig = mix(mix(col, BONE, .3), col, dil);
    // pigment pools at the drying edge: darker and a little richer
    pig = mix(pig, pig * pig * 1.1, .55 * tide);
    pig = mix(pig, pig * pig * 1.06, .35 * tideR);                 // the retreating edge gathers a little pigment
    // granulation: pigment settles in the paper's tooth, in soft clumps rather than pixels
    float gr = .6 * vnoise(q * .16 + u_seed) + .4 * vnoise(q * .42 + u_seed + 2.);
    pig *= 1. + .16 * (gr - .5) * (1. - .55 * dil);
    outc = mix(base, pig, m);
  }
  gl_FragColor = vec4(outc, 1.);
}`;function xe(e={}){let t=e.root??document.querySelector(`[data-strip]`);if(!t)return null;let n=t.querySelector(`[data-strip-row]`),r=n.querySelector(`canvas`),i=[...n.querySelectorAll(`.dm-slice`)],a=null,o=()=>P((innerHeight*.07-(n.getBoundingClientRect().top+me()))/(innerHeight*.3)),s=t=>{if(!$||Z||t<=0||e.shock===!1)return[0,0];let n=P(t*1.04);return c?[n,0]:[n,o()]},c=matchMedia(`(max-width: 760px)`).matches,l=1,u=0,d=0,f=0,p=-1,m=0,h=0,g=!1,_=i.map((e,t)=>({el:e,place:e.dataset.place,meta:{focal:[.5,.5],dmax:40},enteredAt:null,leftAt:null,fillAtLeave:0,origin:[.5,.5],seed:3.1+t*7.3})),y=new URLSearchParams(location.search).has(`nogl`)?null:r.getContext(`webgl`,{antialias:!1,premultipliedAlpha:!1}),b=null,x={},S=null,C=()=>{if(y&&(b=v(y,ye,be),b)){y.useProgram(b),w(y,b);for(let e of[`u_res`,`u_rect`,`u_uv`,`u_bw`,`u_col`,`u_dist`,`u_sk`,`u_origin`,`u_fill`,`u_recede`,`u_sfill`,`u_srec`,`u_sorigin`,`u_rorigin`,`u_arr`,`u_flash`,`u_seed`,`u_dpr`,`u_time`,`u_solid`])x[e]=y.getUniformLocation(b,e);if(y.uniform1i(x.u_bw,0),y.uniform1i(x.u_col,1),y.uniform1i(x.u_dist,2),y.uniform1i(x.u_sk,3),S){for(let e of _)e.tex=void 0;n.classList.remove(`has-gl`);let e=n.getBoundingClientRect();e.bottom>0&&e.top<innerHeight&&A(),S()}}};C();let T=(e,t)=>{let n=te(y)?y.createTexture():null;if(!n)return null;y.bindTexture(y.TEXTURE_2D,n);let r=t?y.LUMINANCE:y.RGB;return y.texImage2D(y.TEXTURE_2D,0,r,r,y.UNSIGNED_BYTE,e),y.generateMipmap(y.TEXTURE_2D),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_MIN_FILTER,y.LINEAR_MIPMAP_LINEAR),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_MAG_FILTER,y.LINEAR),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_WRAP_S,y.CLAMP_TO_EDGE),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_WRAP_T,y.CLAMP_TO_EDGE),n},E=$?`/patronus-preview/home/domains-strip`:`/patronus-preview/home/domains`,ee=se,D=!1,O=matchMedia(`(max-width: 760px)`).matches,ne=$?O?[`bw-m.webp`,`col-m.webp`]:[`bw.jpg`,`col.jpg`]:O?[`bw-m.webp`,`false-m.webp`,`dist.jpg`,`sketch-m.webp`]:[`bw.jpg`,`false.jpg`,`dist.jpg`,`sketch.png`],re=e=>{let t=()=>{let t=window.requestIdleCallback;t?t(e,{timeout:1500}):setTimeout(e,200)},n=()=>{ge().then(t)};document.readyState===`complete`?n():addEventListener(`load`,n,{once:!0})},k=[],A=()=>{for(let[e,t]of k.splice(0))e.setAttribute(`src`,t),e.hidden=!1;L()};n.querySelectorAll(`img.dm-img`).forEach(e=>{let t=e.getAttribute(`src`);t&&(e.dataset.small=t,$&&(e.dataset.big=t.replace(/\.jpg$/,`-2k.jpg`)),y&&!e.complete&&(k.push([e,t]),e.removeAttribute(`src`),e.hidden=!0))}),y&&oe(n,()=>{n.classList.contains(`has-gl`)||A()},O?`0%`:`60%`),re(()=>(e.meta?Promise.resolve(e.meta):fetch(`${E}/strip.json`).then(e=>e.json())).then(async e=>{if(_.forEach(t=>{e[t.place]&&(t.meta=e[t.place])}),I=!0,L(),y){let e=()=>O?new Promise(e=>requestAnimationFrame(()=>e())):ce(n),t=0,r=async()=>{let n=++t,r=_.map(e=>Promise.all(ne.map(t=>ee(`${e.el.dataset.src??`${E}/${e.place}`}/${t}`))));for(let i=0;i<_.length;i++){let a=_[i],o=await r[i];if(n!==t)return;let[s,c,l,u]=$?[o[0],o[1]]:o;await e();let d=T(s,!0);await e();let f=T(c,!1),p=d,m=d;if(l&&u&&(await e(),p=T(l,!0),await e(),m=T(u,!0)),n!==t||!d||!f||!p||!m)return;a.tex={bw:d,col:f,dist:p,sk:m};for(let e of o)`close`in e&&e.close();K=``,J()}};S=()=>{r().then(()=>{_.every(e=>e.tex)&&(K=``,n.classList.add(`has-gl`),J())}).catch(()=>{})},await r(),await e(),D=!0,K=``,ue(performance.now()),K=``,_.every(e=>e.tex)&&n.classList.add(`has-gl`)}D=!0,J()}).catch(()=>{A()}));let j=()=>{c=matchMedia(`(max-width: 760px)`).matches,l=Math.min(devicePixelRatio||1,2),u=n.clientWidth,d=n.clientHeight;let e=getComputedStyle(n),t=_.length,i=Number(e.getPropertyValue(`--grow`))||3.4;f=c?u:(u-(parseFloat(e.columnGap)||0)*(t-1))*i/(i+t-1),r.width=Math.round(u*l),r.height=Math.round(d*l),J()};new ResizeObserver(j).observe(n),y&&b&&ie(r,y,{name:e.name??`strip`,near:n,margin:1},C,()=>{K=``,J()}),y&&r.addEventListener(`webglcontextlost`,()=>{b=null});let N=(e,t,n,r=1)=>{let i=Math.max(t,Math.max(f,e)/r),a=Math.min(1,e/(i*r)),o=Math.min(1,t/i);return[P(n[0]-a/2,0,1-a),P(n[1]-o/2,0,1-o),a,o]},I=!1,L=()=>{if(I)for(let e of _){let t=e.el.clientWidth,n=e.el.clientHeight,r=$?e.meta.aspect??1:1,[i,a,o,s]=N(t,n,e.meta.focal,r),c=t/o,l=n/s;e.el.querySelectorAll(`img.dm-img`).forEach(e=>{if(e.style.cssText=`inset:auto;left:0;top:0;width:${c.toFixed(1)}px;height:${l.toFixed(1)}px;object-fit:fill;transform:translate(${(-i*c).toFixed(1)}px,${(-a*l).toFixed(1)}px)`,e.dataset.big&&!e.hidden){let t=innerWidth>760&&c*(devicePixelRatio||1)>1500?e.dataset.big:e.dataset.small;e.getAttribute(`src`)!==t&&e.setAttribute(`src`,t)}})}},R=(e,t,n,r)=>{if(c)return 1;if(a!=null)return P(a*1.4-e*.1);let i=me();return t+=i,r+=i,P(P((n*.82-t)/(n*.56))*1.4-e*.1)},z=e=>Z?+(e>.5):e,le=e=>+!Z,B=(e,t)=>e.enteredAt==null?0:e.leftAt==null?Z?1:1-(1-P((t-e.enteredAt)/1e3/_e))**2.6:Z?0:e.fillAtLeave,V=(e,t)=>e.leftAt==null||e.enteredAt==null?0:Z?1:P((t-e.leftAt)/1e3/ve)**1.3,H=(e,t)=>{let n=B(e,t),r=V(e,t);return r<=0?n:P((n*1.32+.04+r*(-.16-n*1.32-.04))/1.32)},U=!!$&&e.shock!==!1,W=e=>1,G=e=>{let t=_.map(t=>{let n=t.el.getBoundingClientRect();return Math.abs(n.top+n.height/2-e/2)}),n=t.indexOf(Math.min(...t));return _.map((r,i)=>i===n?F(1-(t[i]/(e/2)-.06)/.3):0)},K=``,ue=e=>{if(!y||!b||!D||!u||!te(y))return;let t=c&&!U,i=n.getBoundingClientRect(),a=innerHeight,d=t?G(a):null,f=`${r.width}x${r.height}|${_.filter(e=>e.tex).length}|${$&&!c?o().toFixed(3):``}`;for(let n=0;n<_.length;n++){let r=_[n],o=r.el.getBoundingClientRect(),s=z(R(n,i.top,a,o.top)),l=c?t?s>=.97?d[n]:0:W(s):s>=.97?B(r,e):0,u=!c&&s>=.97?V(r,e):0;f+=`|${(o.left-i.left).toFixed(1)},${o.width.toFixed(1)},${s.toFixed(3)},${l.toFixed(3)},${u.toFixed(3)}`}if(f===K)return;K=f,y.viewport(0,0,r.width,r.height),y.uniform2f(x.u_res,r.width,r.height),y.uniform1f(x.u_dpr,l),y.uniform1f(x.u_time,e/1e3),y.enable(y.SCISSOR_TEST);let p=n.getBoundingClientRect(),m=innerHeight,h=t?G(m):null;for(let t=0;t<_.length;t++){let n=_[t];if(c&&U&&M(n.el,`--fill`,W(z(R(t,p.top,m,n.el.getBoundingClientRect().top))).toFixed(3)),!n.tex)continue;let i=n.el.getBoundingClientRect(),a=(i.left-p.left)*l,o=(i.top-p.top)*l,u=a+i.width*l,d=o+i.height*l;y.scissor(Math.floor(a),Math.floor(r.height-d),Math.ceil(u-a),Math.ceil(d-o)),y.uniform4f(x.u_rect,a,o,u,d),y.uniform4f(x.u_uv,...N(i.width,i.height,n.meta.focal,n.meta.aspect));let f=z(R(t,p.top,m,i.top));M(n.el,`--arr`,f.toFixed(3)),y.uniform1f(x.u_arr,f),y.uniform1f(x.u_flash,le(f)),y.uniform1f(x.u_seed,n.seed),y.uniform1f(y.getUniformLocation(b,`u_mode`),$),y.uniform1f(x.u_solid,+!!c),$&&y.uniform1f(x.u_flash,0);let v=0,S=0,C=n.origin[0],w=n.origin[1],T=0,E=0;c&&U?T=W(f):c?(v=f>=.97?h[t]:0,C=.04,w=.5):f>=.97&&(v=B(n,e),S=V(n,e)),S>=1&&(v=0),g&&(v=1,S=0),$&&!c&&([T,E]=s(f)),E>=1&&(T=0),X[t]=Math.max(S>0?v*(1-S):v,T*(1-E)),y.uniform2f(x.u_origin,a+C*(u-a),o+w*(d-o)),y.uniform1f(x.u_fill,v),y.uniform1f(x.u_recede,S),y.uniform1f(x.u_sfill,T),y.uniform1f(x.u_srec,E),y.uniform2f(x.u_sorigin,a+.5*(u-a),o-.12*(d-o)),y.uniform2f(x.u_rorigin,a+.5*(u-a),o+1.12*(d-o)),y.activeTexture(y.TEXTURE0),y.bindTexture(y.TEXTURE_2D,n.tex.bw),y.activeTexture(y.TEXTURE1),y.bindTexture(y.TEXTURE_2D,n.tex.col),y.activeTexture(y.TEXTURE2),y.bindTexture(y.TEXTURE_2D,n.tex.dist),y.activeTexture(y.TEXTURE3),y.bindTexture(y.TEXTURE_2D,n.tex.sk),y.drawArrays(y.TRIANGLE_STRIP,0,4)}y.disable(y.SCISSOR_TEST)},de=e=>{let t=n.getBoundingClientRect(),r=innerHeight,i=c&&!U?G(r):null;_.forEach((n,a)=>{let o=n.el.getBoundingClientRect(),l=z(R(a,t.top,r,o.top)),u=c&&U?W(l):l>=.97?i?i[a]:H(n,e):0;if($&&!c){let[e,t]=s(l);t<1&&(u=Math.max(u,e*(1-t)))}X[a]=u,M(n.el,`--arr`,l.toFixed(3)),M(n.el,`--fill`,(g?1:u).toFixed(3))})},q=()=>{m=0;let e=performance.now(),t=n.getBoundingClientRect(),i=t.bottom>-40&&t.top<innerHeight+40;if(ae(r,i),!i){K=``;return}y?ue(e):de(e),I&&!n.classList.contains(`has-gl`)&&L(),Q.length&&Se(),(he()||_.some(t=>t.enteredAt!=null&&t.leftAt==null&&e-t.enteredAt<_e*1e3+50||t.leftAt!=null&&e-t.leftAt<ve*1e3+50)||e<h)&&(m=requestAnimationFrame(q))},J=(e=0)=>{h=Math.max(h,performance.now()+e),m||=requestAnimationFrame(q)};addEventListener(`scroll`,()=>J(),{passive:!0});let fe=(e,t)=>{if(c||e===p)return;let r=performance.now();p>=0&&pe(p,r),p=e;let a=_[e],o=a.leftAt==null?0:H(a,r);a.enteredAt=r-(o>0?_e*1e3*(1-(1-o)**(1/2.6)):0),a.leftAt=null,o<=.02&&(a.origin=t),n.classList.add(`has-active`),i.forEach((t,n)=>t.classList.toggle(`is-active`,n===e)),J(520)},pe=(e,t)=>{let n=_[e];n.enteredAt!=null&&n.leftAt==null&&(n.fillAtLeave=B(n,t),n.leftAt=t)},Y=()=>{p<0||(pe(p,performance.now()),p=-1,n.classList.remove(`has-active`),i.forEach(e=>e.classList.remove(`is-active`)),J(520))};i.forEach((e,t)=>{e.addEventListener(`pointerenter`,n=>{if(n.pointerType===`touch`)return;let r=e.getBoundingClientRect();fe(t,[P((n.clientX-r.left)/r.width),P((n.clientY-r.top)/r.height)])}),e.addEventListener(`focus`,()=>fe(t,[.5,.82])),e.addEventListener(`blur`,()=>{n.contains(document.activeElement)||Y()})}),n.addEventListener(`pointerleave`,e=>{e.pointerType!==`touch`&&!n.contains(document.activeElement)&&Y()});let X=[],Q=[],xe=[],Se=()=>{_.forEach((e,t)=>{let n=Q[t];if(!n)return;let r=e.el.getBoundingClientRect(),[i,a]=xe[t],[o,s,c,l]=N(r.width,r.height,e.meta.focal,e.meta.aspect);n.setAttribute(`viewBox`,`${(o*i).toFixed(1)} ${(s*a).toFixed(1)} ${(c*i).toFixed(1)} ${(l*a).toFixed(1)}`),M(n,`opacity`,(1-F(((X[t]??0)-.55)/.4)).toFixed(3))})};$===2&&oe(n,()=>{_.forEach((e,t)=>fetch(`/patronus-preview/home/domains/${e.place}/line.json`).then(e=>e.json()).then(n=>{let r=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);r.setAttribute(`class`,`dm-ln`),r.setAttribute(`aria-hidden`,`true`),r.setAttribute(`preserveAspectRatio`,`none`),r.innerHTML=`<path d="${n.d}" />`,e.el.append(r),Q[t]=r,xe[t]=[n.w,n.h],J()}).catch(()=>{}))},`300%`);let Ce=e=>{let t=n.getBoundingClientRect(),r=_.length,i=parseFloat(getComputedStyle(n).columnGap)||0,a=(n.clientWidth-i*(r-1))/r;return{left:t.left+n.clientLeft+e*(a+i),width:a}},we=()=>c?_.length-1:2;$&&(n.peelFrom=()=>{let e=_[we()]?.el;if(!e)return null;let t=e.getBoundingClientRect(),n=t.bottom+scrollY,r=c?t.left+t.width*.86:(({left:e,width:t})=>e+t*.86)(Ce(we()));return{pts:[[r,n-8],[r,n-5],[r,n-3],[r,n-1]],bottom:n}}),$&&(n.peelRest=()=>{if(c)return!0;if(n.classList.contains(`has-active`))return!1;let e=_[we()]?.el;if(!e)return!0;let t=e.getBoundingClientRect(),r=Ce(we());return Math.abs(t.left-r.left)<.75&&Math.abs(t.width-r.width)<.75}),j(),n.__uv=()=>_.map(e=>{let t=e.el.getBoundingClientRect();return N(t.width,t.height,e.meta.focal,e.meta.aspect)});let Te={setArrival(e){let t=e==null?null:P(e);t!==a&&(a=t,J())}};return e.root||(window.__strip=Te),Te.setRest=e=>{g=e,K=``,J()},Te}export{n as A,C,i as D,s as E,r as O,w as S,a as T,ae as _,K as a,te as b,he as c,L as d,F as f,M as g,se as h,me as i,o as k,pe as l,ce as m,X as n,fe as o,I as p,le as r,J as s,xe as t,P as u,oe as v,c as w,v as x,ie as y};