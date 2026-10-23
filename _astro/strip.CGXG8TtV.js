var e=matchMedia(`(hover: none) and (pointer: coarse)`).matches,t=null;function n(){return e?(t||(t=document.createElement(`div`),t.style.cssText=`position:fixed;left:0;top:0;width:0;height:100lvh;visibility:hidden;pointer-events:none`,document.documentElement.append(t)),Math.max(innerHeight,t.offsetHeight||0)):innerHeight}function r(t){let r=innerWidth,i=n();addEventListener(`resize`,()=>{let a=innerWidth,o=n();e&&a===r&&o===i||(r=a,i=o,t())})}function i(t=n()){return e?Math.round(t*.3):120}function a(e,t=0){let n=Math.round(scrollY)-e;return t?Math.min(n,Math.floor(document.body.offsetHeight-t)):n}function o(e,t){return e<=760&&!(e>t&&t<=500)||e>760&&e<=1100&&t>=e*1.2}var s=typeof location<`u`&&new URLSearchParams(location.search).has(`diag`),c=null,l=null,u=[];function d(){if(c||!document.body)return c;c=document.createElement(`div`),c.setAttribute(`aria-hidden`,`true`),c.style.cssText=`position:fixed;right:8px;top:8px;z-index:9999;max-width:min(320px,calc(100vw - 16px));max-height:30vh;overflow:hidden;padding:6px 8px;border-radius:6px;background:rgba(29,29,21,.86);color:#f4f1e8;font:10.5px/1.35 ui-monospace,Menlo,monospace;pointer-events:none;white-space:pre-wrap`,l=document.createElement(`div`),c.append(l),document.body.append(c);let e=()=>{l&&(l.textContent=`live WebGL contexts: ${window.__glLive?.()??`?`}`),setTimeout(e,500)};return e(),c}function f(e,t=!1){if(!s)return;let n=(performance.now()/1e3).toFixed(1);u.push(`${n}s ${t?`! `:``}${e}`);let r=d();if(!r)return;let i=document.createElement(`div`);for(i.textContent=u[u.length-1],t&&(i.style.color=`#ff8a7a`),l.after(i);r.childNodes.length>16;)r.lastChild.remove()}s&&(addEventListener(`error`,e=>f(`${e.message}${e.filename?` (${e.filename.split(`/`).pop()}:${e.lineno})`:``}`,!0)),addEventListener(`unhandledrejection`,e=>f(`rejection: ${(e.reason&&(e.reason.message||e.reason))??`?`}`,!0)),document.readyState===`loading`?addEventListener(`DOMContentLoaded`,()=>{d(),f(`diag on`)}):(d(),f(`diag on`)));var p=new WeakMap,m=new WeakMap,h=(e,t)=>e+`\0`+t;function g(e,t,n){let r=h(t,n),i=m.get(e);i||m.set(e,i=new Map),i.set(r,[t,n]);let a=p.get(e)?.get(r);if(a&&!e.isContextLost())return p.get(e).delete(r),a;let o=(t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:null},s=o(e.VERTEX_SHADER,t),c=o(e.FRAGMENT_SHADER,n);if(!s||!c)return null;let l=e.createProgram();return e.attachShader(l,s),e.attachShader(l,c),e.linkProgram(l),e.getProgramParameter(l,e.LINK_STATUS)?l:null}var _=e=>{let t=window.requestIdleCallback;t?t(e,{timeout:400}):setTimeout(e,40)},v=[],y=!1,b=e=>{if(v.push(e),y)return;y=!0;let t=()=>{let e=v.shift();if(!e){y=!1;return}_(()=>{e(),requestAnimationFrame(t)})};t()};function x(e,t){let n=t??[...m.get(e)?.values()??[]],r=p.get(e);r||p.set(e,r=new Map);let i=r,a=e.getExtension(`KHR_parallel_shader_compile`),o=([t,n])=>{let r=e.createProgram(),i=e.createShader(e.VERTEX_SHADER),a=e.createShader(e.FRAGMENT_SHADER);return!r||!i||!a?null:(e.shaderSource(i,t),e.compileShader(i),e.shaderSource(a,n),e.compileShader(a),e.attachShader(r,i),e.attachShader(r,a),e.linkProgram(r),r)},s=(t,n)=>{n&&!e.isContextLost()&&e.getProgramParameter(n,e.LINK_STATUS)&&i.set(t,n)};if(a){let t=n.map(e=>[h(...e),o(e)]);return new Promise(n=>{let r=()=>{if(e.isContextLost()){n();return}t.every(([,t])=>!t||e.getProgramParameter(t,a.COMPLETION_STATUS_KHR))?(t.forEach(([e,t])=>s(e,t)),n()):requestAnimationFrame(r)};requestAnimationFrame(r)})}return n.reduce((t,n)=>t.then(()=>new Promise(t=>_(()=>{e.isContextLost()||s(h(...n),o(n)),t()}))),Promise.resolve())}function S(e,t,n=`p`){let r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);let i=e.getAttribLocation(t,n);e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0)}var C=0,w=.3,T=[],E=new WeakSet,ee=e=>!!e&&!e.isContextLost()&&!E.has(e);window.__glLive=()=>T.filter(e=>e.canvas.isConnected&&!e.gl.isContextLost()).length;var D=[],O=0,k=()=>{O=0;for(let e of D)e()},A=()=>{O||=requestAnimationFrame(k)},j=0;addEventListener(`scroll`,()=>{j=performance.now(),D.length&&A()},{passive:!0}),addEventListener(`resize`,A);function te(e,t,n,r,i){let a=t.getExtension(`WEBGL_lose_context`);T.push({name:n.name,gl:t,canvas:e});let o=!1,s=!1,c=!0,l=!1,u=0;e.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),o=!0,E.add(t),s&&c&&setTimeout(()=>{c&&t.isContextLost()&&a?.restoreContext()}),u++,p.delete(t),s||(l=!0,f(`${n.name}: context lost`,!0))});let d=()=>{let e=n.near;if(!e)return!0;if(typeof e==`function`)return e(0);let t=e.getBoundingClientRect();return t.bottom>0&&t.top<innerHeight};if(e.addEventListener(`webglcontextrestored`,()=>{if(!c){s=!0,o=!1,E.add(t),a?.loseContext();return}s=!1;let e=++u,p=()=>{if(e!==u||t.isContextLost())return;E.delete(t);let a=performance.now();try{r(),i()}catch(e){f(`${n.name}: restore failed: ${e.message}`,!0)}let o=performance.now()-a;(window.__glRestore??=[]).push([n.name,Math.round(o)]),o>16&&f(`${n.name}: rebuild took ${Math.round(o)} ms`,!0),l&&(l=!1,f(`${n.name}: restored`))};d()?p():x(t).then(()=>b(p))}),!n.near||!a)return;let m=n.near,h=n.margin??1,g=!1,v=()=>{if(c){g=!1;return}if(performance.now()-j<150){_(v);return}g=!1,t.isContextLost()||(s=!0,o=!1,E.add(t),a.loseContext())},y=(e,n)=>{(c?!n:e)&&(c=!c,c?s&&t.isContextLost()&&o&&a.restoreContext():g||(g=!0,_(v)))};if(typeof m!=`function`&&`IntersectionObserver`in window){let e=!0,t=!0,n=(n,r)=>new IntersectionObserver(n=>{r(n[n.length-1].isIntersecting),y(e,t)},{rootMargin:`${Math.round((h+n)*100)}% 0px`}).observe(m);n(C,t=>{e=t}),n(w,e=>{t=e});return}let S=e=>{if(typeof m==`function`)return m(h+e);let t=m.getBoundingClientRect(),n=innerHeight;return t.bottom>-n*(h+e)&&t.top<n*(1+h+e)};D.push(()=>y(S(C),S(w))),requestAnimationFrame(A)}var M=new WeakMap;function N(e,t,n){let r=M.get(e);r||M.set(e,r=new Map),r.get(t)!==n&&(r.set(t,n),t.startsWith(`--`)?e.style.setProperty(t,n):e.style[t]=n)}function ne(e,t){N(e,`display`,t?``:`none`)}function P(e,t,n=`150%`){if(!(`IntersectionObserver`in window)){t();return}let r=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(r.disconnect(),t())},{rootMargin:`${n} 0px ${n} 0px`});r.observe(e)}async function re(e){if(`createImageBitmap`in window)try{let t=await(await fetch(e)).blob();return await createImageBitmap(t,{premultiplyAlpha:`none`,colorSpaceConversion:`none`})}catch{}let t=new Image;return t.src=e,await t.decode(),t}var F=0;addEventListener(`scroll`,()=>{F=performance.now()},{passive:!0});function ie(e){return new Promise(t=>{let n=()=>{performance.now()-F>120||e.getBoundingClientRect().top<innerHeight*1.2?t():requestAnimationFrame(n)};requestAnimationFrame(n)})}var I=(e,t=0,n=1)=>Math.min(n,Math.max(t,e)),L=e=>(e=I(e),e*e*(3-2*e)),R=(e,t,n)=>L((n-e)/(t-e)),z=(e,t,n)=>e+(t-e)*n,B=.15,V=matchMedia(`(prefers-reduced-motion: reduce)`).matches;function H(e=B,t=5e-4){let n=NaN,r=0,i=!0;return{step(a,o=performance.now(),s=1){let c=o===r?0:i?1/60:Math.min(.1,Math.max(0,(o-r)/1e3));return r=o,V||n!==n?n=a:(n+=(a-n)*(1-Math.exp(-c/e)),n=a+(n-a)*Math.min(1,Math.max(0,s)),Math.abs(a-n)<t&&(n=a)),i=n===a,n},snap(){n=NaN},get easing(){return!i}}}var U=H(B,.05),ae=-1,W=0,G=()=>{let e=document.timeline?.currentTime;return typeof e==`number`?e:performance.now()};function K(){let e=G();return e===ae?W:(ae=e,Math.abs(scrollY-W)>innerHeight*2&&U.snap(),W=U.step(scrollY,e),W)}function oe(){return scrollY-K()}function se(){return K(),U.easing}addEventListener(`hashchange`,()=>U.snap()),r(()=>U.snap()),window.__scrub=()=>({y:W,scrollY,easing:U.easing});var q=matchMedia(`(prefers-reduced-motion: reduce)`).matches,J=Math.max(1,Number(new URLSearchParams(location.search).get(`bleedslow`))||1),ce=.7*J,le=.38*J,Y={bw:1,line:2}[document.documentElement.dataset.dm??``]??0,ue=`attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`,de=`precision highp float;
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
}`;function X(e={}){let t=e.root??document.querySelector(`[data-strip]`);if(!t)return null;let n=t.querySelector(`[data-strip-row]`),r=n.querySelector(`canvas`),i=[...n.querySelectorAll(`.dm-slice`)],a=null,o=()=>I((innerHeight*.07-(n.getBoundingClientRect().top+oe()))/(innerHeight*.3)),s=t=>{if(!Y||q||t<=0||e.shock===!1)return[0,0];let n=I(t*1.04);return c?[n,0]:[n,o()]},c=matchMedia(`(max-width: 760px)`).matches,l=1,u=0,d=0,f=0,p=-1,m=0,h=0,_=!1,v=i.map((e,t)=>({el:e,place:e.dataset.place,meta:{focal:[.5,.5],dmax:40},enteredAt:null,leftAt:null,fillAtLeave:0,origin:[.5,.5],seed:3.1+t*7.3})),y=new URLSearchParams(location.search).has(`nogl`)?null:r.getContext(`webgl`,{antialias:!1,premultipliedAlpha:!1}),b=null,x={},C=null,w=()=>{if(y&&(b=g(y,ue,de),b)){y.useProgram(b),S(y,b);for(let e of[`u_res`,`u_rect`,`u_uv`,`u_bw`,`u_col`,`u_dist`,`u_sk`,`u_origin`,`u_fill`,`u_recede`,`u_sfill`,`u_srec`,`u_sorigin`,`u_rorigin`,`u_arr`,`u_flash`,`u_seed`,`u_dpr`,`u_time`])x[e]=y.getUniformLocation(b,e);if(y.uniform1i(x.u_bw,0),y.uniform1i(x.u_col,1),y.uniform1i(x.u_dist,2),y.uniform1i(x.u_sk,3),C){for(let e of v)e.tex=void 0;n.classList.remove(`has-gl`);let e=n.getBoundingClientRect();e.bottom>0&&e.top<innerHeight&&F(),C()}}};w();let T=(e,t)=>{let n=ee(y)?y.createTexture():null;if(!n)return null;y.bindTexture(y.TEXTURE_2D,n);let r=t?y.LUMINANCE:y.RGB;return y.texImage2D(y.TEXTURE_2D,0,r,r,y.UNSIGNED_BYTE,e),y.generateMipmap(y.TEXTURE_2D),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_MIN_FILTER,y.LINEAR_MIPMAP_LINEAR),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_MAG_FILTER,y.LINEAR),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_WRAP_S,y.CLAMP_TO_EDGE),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_WRAP_T,y.CLAMP_TO_EDGE),n},E=Y?`/patronus-preview/home/domains-strip`:`/patronus-preview/home/domains`,D=re,O=!1,k=matchMedia(`(max-width: 760px)`).matches,A=Y?k?[`bw-m.webp`,`col-m.webp`]:[`bw.jpg`,`col.jpg`]:k?[`bw-m.webp`,`false-m.webp`,`dist.jpg`,`sketch-m.webp`]:[`bw.jpg`,`false.jpg`,`dist.jpg`,`sketch.png`],j=e=>{let t=()=>{let t=window.requestIdleCallback;t?t(e,{timeout:1500}):setTimeout(e,200)};document.readyState===`complete`?t():addEventListener(`load`,t,{once:!0})},M=[],F=()=>{for(let[e,t]of M.splice(0))e.setAttribute(`src`,t),e.hidden=!1;V()};n.querySelectorAll(`img.dm-img`).forEach(e=>{let t=e.getAttribute(`src`);t&&(e.dataset.small=t,Y&&(e.dataset.big=t.replace(/\.jpg$/,`-2k.jpg`)),y&&!e.complete&&(M.push([e,t]),e.removeAttribute(`src`),e.hidden=!0))}),y&&P(n,()=>{n.classList.contains(`has-gl`)||F()},k?`0%`:`60%`),j(()=>(e.meta?Promise.resolve(e.meta):fetch(`${E}/strip.json`).then(e=>e.json())).then(async e=>{if(v.forEach(t=>{e[t.place]&&(t.meta=e[t.place])}),B=!0,V(),y){let e=()=>k?new Promise(e=>requestAnimationFrame(()=>e())):ie(n),t=0,r=async()=>{let n=++t,r=v.map(e=>Promise.all(A.map(t=>D(`${e.el.dataset.src??`${E}/${e.place}`}/${t}`))));for(let i=0;i<v.length;i++){let a=v[i],o=await r[i];if(n!==t)return;let[s,c,l,u]=Y?[o[0],o[1]]:o;await e();let d=T(s,!0);await e();let f=T(c,!1),p=d,m=d;if(l&&u&&(await e(),p=T(l,!0),await e(),m=T(u,!0)),n!==t||!d||!f||!p||!m)return;a.tex={bw:d,col:f,dist:p,sk:m};for(let e of o)`close`in e&&e.close();Z=``,Q()}};C=()=>{r().then(()=>{v.every(e=>e.tex)&&(Z=``,n.classList.add(`has-gl`),Q())}).catch(()=>{})},await r(),await e(),O=!0,Z=``,pe(performance.now()),Z=``,v.every(e=>e.tex)&&n.classList.add(`has-gl`)}O=!0,Q()}).catch(()=>{F()}));let R=()=>{c=matchMedia(`(max-width: 760px)`).matches,l=Math.min(devicePixelRatio||1,c?1.25:2),u=n.clientWidth,d=n.clientHeight;let e=getComputedStyle(n),t=v.length,i=Number(e.getPropertyValue(`--grow`))||3.4;f=c?u:(u-(parseFloat(e.columnGap)||0)*(t-1))*i/(i+t-1),r.width=Math.round(u*l),r.height=Math.round(d*l),Q()};new ResizeObserver(R).observe(n),y&&b&&te(r,y,{name:e.name??`strip`,near:n,margin:1},w,()=>{Z=``,Q()}),y&&r.addEventListener(`webglcontextlost`,()=>{b=null});let z=(e,t,n,r=1)=>{let i=Math.max(t,Math.max(f,e)/r),a=Math.min(1,e/(i*r)),o=Math.min(1,t/i);return[I(n[0]-a/2,0,1-a),I(n[1]-o/2,0,1-o),a,o]},B=!1,V=()=>{if(B)for(let e of v){let t=e.el.clientWidth,n=e.el.clientHeight,r=Y?e.meta.aspect??1:1,[i,a,o,s]=z(t,n,e.meta.focal,r),c=t/o,l=n/s;e.el.querySelectorAll(`img.dm-img`).forEach(e=>{if(e.style.cssText=`inset:auto;left:0;top:0;width:${c.toFixed(1)}px;height:${l.toFixed(1)}px;object-fit:fill;transform:translate(${(-i*c).toFixed(1)}px,${(-a*l).toFixed(1)}px)`,e.dataset.big&&!e.hidden){let t=innerWidth>760&&c*(devicePixelRatio||1)>1500?e.dataset.big:e.dataset.small;e.getAttribute(`src`)!==t&&e.setAttribute(`src`,t)}})}},H=(e,t,n,r)=>{if(a!=null)return I(a*1.4-e*.1);let i=oe();return t+=i,r+=i,I(c?(n*.92-r)/(n*.45):I((n*.82-t)/(n*.56))*1.4-e*.1)},U=e=>q?+(e>.5):e,ae=e=>+!q,W=(e,t)=>e.enteredAt==null?0:e.leftAt==null?q?1:1-(1-I((t-e.enteredAt)/1e3/ce))**2.6:q?0:e.fillAtLeave,G=(e,t)=>e.leftAt==null||e.enteredAt==null?0:q?1:I((t-e.leftAt)/1e3/le)**1.3,K=(e,t)=>{let n=W(e,t),r=G(e,t);return r<=0?n:I((n*1.32+.04+r*(-.16-n*1.32-.04))/1.32)},J=!!Y&&e.shock!==!1,X=e=>q?+(e>=.97):s(e)[0],fe=e=>{let t=v.map(t=>{let n=t.el.getBoundingClientRect();return Math.abs(n.top+n.height/2-e/2)}),n=t.indexOf(Math.min(...t));return v.map((r,i)=>i===n?L(1-(t[i]/(e/2)-.06)/.3):0)},Z=``,pe=e=>{if(!y||!b||!O||!u||!ee(y))return;let t=c&&!J,i=n.getBoundingClientRect(),a=innerHeight,d=t?fe(a):null,f=`${r.width}x${r.height}|${v.filter(e=>e.tex).length}|${Y&&!c?o().toFixed(3):``}`;for(let n=0;n<v.length;n++){let r=v[n],o=r.el.getBoundingClientRect(),s=U(H(n,i.top,a,o.top)),l=c?t?s>=.97?d[n]:0:X(s):s>=.97?W(r,e):0,u=!c&&s>=.97?G(r,e):0;f+=`|${(o.left-i.left).toFixed(1)},${o.width.toFixed(1)},${s.toFixed(3)},${l.toFixed(3)},${u.toFixed(3)}`}if(f===Z)return;Z=f,y.viewport(0,0,r.width,r.height),y.uniform2f(x.u_res,r.width,r.height),y.uniform1f(x.u_dpr,l),y.uniform1f(x.u_time,e/1e3),y.enable(y.SCISSOR_TEST);let p=n.getBoundingClientRect(),m=innerHeight,h=t?fe(m):null;for(let t=0;t<v.length;t++){let n=v[t];if(c&&J&&N(n.el,`--fill`,X(U(H(t,p.top,m,n.el.getBoundingClientRect().top))).toFixed(3)),!n.tex)continue;let i=n.el.getBoundingClientRect(),a=(i.left-p.left)*l,o=(i.top-p.top)*l,u=a+i.width*l,d=o+i.height*l;y.scissor(Math.floor(a),Math.floor(r.height-d),Math.ceil(u-a),Math.ceil(d-o)),y.uniform4f(x.u_rect,a,o,u,d),y.uniform4f(x.u_uv,...z(i.width,i.height,n.meta.focal,n.meta.aspect));let f=U(H(t,p.top,m,i.top));N(n.el,`--arr`,f.toFixed(3)),y.uniform1f(x.u_arr,f),y.uniform1f(x.u_flash,ae(f)),y.uniform1f(x.u_seed,n.seed),y.uniform1f(y.getUniformLocation(b,`u_mode`),Y),Y&&y.uniform1f(x.u_flash,0);let g=0,S=0,C=n.origin[0],w=n.origin[1],T=0,E=0;c&&J?T=X(f):c?(g=f>=.97?h[t]:0,C=.04,w=.5):f>=.97&&(g=W(n,e),S=G(n,e)),S>=1&&(g=0),_&&(g=1,S=0),Y&&!c&&([T,E]=s(f)),E>=1&&(T=0),ye[t]=Math.max(S>0?g*(1-S):g,T*(1-E)),y.uniform2f(x.u_origin,a+C*(u-a),o+w*(d-o)),y.uniform1f(x.u_fill,g),y.uniform1f(x.u_recede,S),y.uniform1f(x.u_sfill,T),y.uniform1f(x.u_srec,E),y.uniform2f(x.u_sorigin,a+.5*(u-a),o-.12*(d-o)),y.uniform2f(x.u_rorigin,a+.5*(u-a),o+1.12*(d-o)),y.activeTexture(y.TEXTURE0),y.bindTexture(y.TEXTURE_2D,n.tex.bw),y.activeTexture(y.TEXTURE1),y.bindTexture(y.TEXTURE_2D,n.tex.col),y.activeTexture(y.TEXTURE2),y.bindTexture(y.TEXTURE_2D,n.tex.dist),y.activeTexture(y.TEXTURE3),y.bindTexture(y.TEXTURE_2D,n.tex.sk),y.drawArrays(y.TRIANGLE_STRIP,0,4)}y.disable(y.SCISSOR_TEST)},me=e=>{let t=n.getBoundingClientRect(),r=innerHeight,i=c&&!J?fe(r):null;v.forEach((n,a)=>{let o=n.el.getBoundingClientRect(),l=U(H(a,t.top,r,o.top)),u=c&&J?X(l):l>=.97?i?i[a]:K(n,e):0;if(Y&&!c){let[e,t]=s(l);t<1&&(u=Math.max(u,e*(1-t)))}ye[a]=u,N(n.el,`--arr`,l.toFixed(3)),N(n.el,`--fill`,(_?1:u).toFixed(3))})},he=()=>{m=0;let e=performance.now(),t=n.getBoundingClientRect(),i=t.bottom>-40&&t.top<innerHeight+40;if(ne(r,i),!i){Z=``;return}y?pe(e):me(e),B&&!n.classList.contains(`has-gl`)&&V(),be.length&&Se(),(se()||v.some(t=>t.enteredAt!=null&&t.leftAt==null&&e-t.enteredAt<ce*1e3+50||t.leftAt!=null&&e-t.leftAt<le*1e3+50)||e<h)&&(m=requestAnimationFrame(he))},Q=(e=0)=>{h=Math.max(h,performance.now()+e),m||=requestAnimationFrame(he)};addEventListener(`scroll`,()=>Q(),{passive:!0});let ge=(e,t)=>{if(c||e===p)return;let r=performance.now();p>=0&&_e(p,r),p=e;let a=v[e],o=a.leftAt==null?0:K(a,r);a.enteredAt=r-(o>0?ce*1e3*(1-(1-o)**(1/2.6)):0),a.leftAt=null,o<=.02&&(a.origin=t),n.classList.add(`has-active`),i.forEach((t,n)=>t.classList.toggle(`is-active`,n===e)),Q(520)},_e=(e,t)=>{let n=v[e];n.enteredAt!=null&&n.leftAt==null&&(n.fillAtLeave=W(n,t),n.leftAt=t)},ve=()=>{p<0||(_e(p,performance.now()),p=-1,n.classList.remove(`has-active`),i.forEach(e=>e.classList.remove(`is-active`)),Q(520))};i.forEach((e,t)=>{e.addEventListener(`pointerenter`,n=>{if(n.pointerType===`touch`)return;let r=e.getBoundingClientRect();ge(t,[I((n.clientX-r.left)/r.width),I((n.clientY-r.top)/r.height)])}),e.addEventListener(`focus`,()=>ge(t,[.5,.82])),e.addEventListener(`blur`,()=>{n.contains(document.activeElement)||ve()})}),n.addEventListener(`pointerleave`,e=>{e.pointerType!==`touch`&&!n.contains(document.activeElement)&&ve()});let ye=[],be=[],xe=[],Se=()=>{v.forEach((e,t)=>{let n=be[t];if(!n)return;let r=e.el.getBoundingClientRect(),[i,a]=xe[t],[o,s,c,l]=z(r.width,r.height,e.meta.focal,e.meta.aspect);n.setAttribute(`viewBox`,`${(o*i).toFixed(1)} ${(s*a).toFixed(1)} ${(c*i).toFixed(1)} ${(l*a).toFixed(1)}`),N(n,`opacity`,(1-L(((ye[t]??0)-.55)/.4)).toFixed(3))})};Y===2&&P(n,()=>{v.forEach((e,t)=>fetch(`/patronus-preview/home/domains/${e.place}/line.json`).then(e=>e.json()).then(n=>{let r=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);r.setAttribute(`class`,`dm-ln`),r.setAttribute(`aria-hidden`,`true`),r.setAttribute(`preserveAspectRatio`,`none`),r.innerHTML=`<path d="${n.d}" />`,e.el.append(r),be[t]=r,xe[t]=[n.w,n.h],Q()}).catch(()=>{}))},`300%`);let Ce=e=>{let t=n.getBoundingClientRect(),r=v.length,i=parseFloat(getComputedStyle(n).columnGap)||0,a=(n.clientWidth-i*(r-1))/r;return{left:t.left+n.clientLeft+e*(a+i),width:a}},$=()=>c?v.length-1:2;Y&&(n.peelFrom=()=>{let e=v[$()]?.el;if(!e)return null;let t=e.getBoundingClientRect(),n=t.bottom+scrollY,r=c?t.left+t.width*.86:(({left:e,width:t})=>e+t*.86)(Ce($()));return{pts:[[r,n-8],[r,n-5],[r,n-3],[r,n-1]],bottom:n}}),Y&&(n.peelRest=()=>{if(c)return!0;if(n.classList.contains(`has-active`))return!1;let e=v[$()]?.el;if(!e)return!0;let t=e.getBoundingClientRect(),r=Ce($());return Math.abs(t.left-r.left)<.75&&Math.abs(t.width-r.width)<.75}),R(),n.__uv=()=>v.map(e=>{let t=e.el.getBoundingClientRect();return z(t.width,t.height,e.meta.focal,e.meta.aspect)});let we={setArrival(e){let t=e==null?null:I(e);t!==a&&(a=t,Q())}};return e.root||(window.__strip=we),we.setRest=e=>{_=e,Z=``,Q()},we}export{o as C,r as S,g as _,se as a,a as b,L as c,re as d,N as f,ee as g,te as h,K as i,R as l,P as m,H as n,I as o,ne as p,oe as r,z as s,X as t,ie as u,S as v,n as w,i as x,x as y};