var e=matchMedia(`(hover: none) and (pointer: coarse)`).matches,t=null;function n(){return e?(t||(t=document.createElement(`div`),t.style.cssText=`position:fixed;left:0;top:0;width:0;height:100lvh;visibility:hidden;pointer-events:none`,document.documentElement.append(t)),Math.max(innerHeight,t.offsetHeight||0)):innerHeight}function r(t){let r=innerWidth,i=n();addEventListener(`resize`,()=>{let a=innerWidth,o=n();e&&a===r&&o===i||(r=a,i=o,t())})}function i(t=n()){return e?Math.round(t*.3):120}function a(e,t=0){let n=Math.round(scrollY)-e;return t?Math.min(n,Math.floor(document.body.offsetHeight-t)):n}function o(e,t){return e<=760&&!(e>t&&t<=500)||e>760&&e<=1100&&t>=e*1.2}var s=typeof location<`u`&&new URLSearchParams(location.search).has(`diag`),c=null,l=null,u=[];function d(){if(c||!document.body)return c;c=document.createElement(`div`),c.setAttribute(`aria-hidden`,`true`),c.style.cssText=`position:fixed;right:8px;top:8px;z-index:9999;max-width:min(320px,calc(100vw - 16px));max-height:30vh;overflow:hidden;padding:6px 8px;border-radius:6px;background:rgba(29,29,21,.86);color:#f4f1e8;font:10.5px/1.35 ui-monospace,Menlo,monospace;pointer-events:none;white-space:pre-wrap`,l=document.createElement(`div`),c.append(l),document.body.append(c);let e=()=>{l&&(l.textContent=`live WebGL contexts: ${window.__glLive?.()??`?`}`),setTimeout(e,500)};return e(),c}function f(e,t=!1){if(!s)return;let n=(performance.now()/1e3).toFixed(1);u.push(`${n}s ${t?`! `:``}${e}`);let r=d();if(!r)return;let i=document.createElement(`div`);for(i.textContent=u[u.length-1],t&&(i.style.color=`#ff8a7a`),l.after(i);r.childNodes.length>16;)r.lastChild.remove()}s&&(addEventListener(`error`,e=>f(`${e.message}${e.filename?` (${e.filename.split(`/`).pop()}:${e.lineno})`:``}`,!0)),addEventListener(`unhandledrejection`,e=>f(`rejection: ${(e.reason&&(e.reason.message||e.reason))??`?`}`,!0)),document.readyState===`loading`?addEventListener(`DOMContentLoaded`,()=>{d(),f(`diag on`)}):(d(),f(`diag on`)));var p=new WeakMap,m=new WeakMap,h=(e,t)=>e+`\0`+t;function g(e,t,n){let r=h(t,n),i=m.get(e);i||m.set(e,i=new Map),i.set(r,[t,n]);let a=p.get(e)?.get(r);if(a&&!e.isContextLost())return p.get(e).delete(r),a;let o=(t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:null},s=o(e.VERTEX_SHADER,t),c=o(e.FRAGMENT_SHADER,n);if(!s||!c)return null;let l=e.createProgram();return e.attachShader(l,s),e.attachShader(l,c),e.linkProgram(l),e.getProgramParameter(l,e.LINK_STATUS)?l:null}var _=e=>{let t=window.requestIdleCallback;t?t(e,{timeout:400}):setTimeout(e,40)},v=[],y=!1,b=e=>{if(v.push(e),y)return;y=!0;let t=()=>{let e=v.shift();if(!e){y=!1;return}_(()=>{e(),requestAnimationFrame(t)})};t()};function x(e,t){let n=t??[...m.get(e)?.values()??[]],r=p.get(e);r||p.set(e,r=new Map);let i=r,a=e.getExtension(`KHR_parallel_shader_compile`),o=([t,n])=>{let r=e.createProgram(),i=e.createShader(e.VERTEX_SHADER),a=e.createShader(e.FRAGMENT_SHADER);return!r||!i||!a?null:(e.shaderSource(i,t),e.compileShader(i),e.shaderSource(a,n),e.compileShader(a),e.attachShader(r,i),e.attachShader(r,a),e.linkProgram(r),r)},s=(t,n)=>{n&&!e.isContextLost()&&e.getProgramParameter(n,e.LINK_STATUS)&&i.set(t,n)};if(a){let t=n.map(e=>[h(...e),o(e)]);return new Promise(n=>{let r=()=>{if(e.isContextLost()){n();return}t.every(([,t])=>!t||e.getProgramParameter(t,a.COMPLETION_STATUS_KHR))?(t.forEach(([e,t])=>s(e,t)),n()):requestAnimationFrame(r)};requestAnimationFrame(r)})}return n.reduce((t,n)=>t.then(()=>new Promise(t=>_(()=>{e.isContextLost()||s(h(...n),o(n)),t()}))),Promise.resolve())}function S(e,t,n=`p`){let r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);let i=e.getAttribLocation(t,n);e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0)}var C=0,w=.3,T=[],E=new WeakSet,ee=e=>!!e&&!e.isContextLost()&&!E.has(e);window.__glLive=()=>T.filter(e=>e.canvas.isConnected&&!e.gl.isContextLost()).length;var D=[],O=0,k=()=>{O=0;for(let e of D)e()},A=()=>{O||=requestAnimationFrame(k)},j=0;addEventListener(`scroll`,()=>{j=performance.now(),D.length&&A()},{passive:!0}),addEventListener(`resize`,A);function te(e,t,n,r,i){let a=t.getExtension(`WEBGL_lose_context`);T.push({name:n.name,gl:t,canvas:e});let o=!1,s=!1,c=!0,l=!1,u=0;e.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),o=!0,E.add(t),s&&c&&setTimeout(()=>{c&&t.isContextLost()&&a?.restoreContext()}),u++,p.delete(t),s||(l=!0,f(`${n.name}: context lost`,!0))});let d=()=>{let e=n.near;if(!e)return!0;if(typeof e==`function`)return e(0);let t=e.getBoundingClientRect();return t.bottom>0&&t.top<innerHeight};if(e.addEventListener(`webglcontextrestored`,()=>{if(!c){s=!0,o=!1,E.add(t),a?.loseContext();return}s=!1;let e=++u,p=()=>{if(e!==u||t.isContextLost())return;E.delete(t);let a=performance.now();try{r(),i()}catch(e){f(`${n.name}: restore failed: ${e.message}`,!0)}let o=performance.now()-a;(window.__glRestore??=[]).push([n.name,Math.round(o)]),o>16&&f(`${n.name}: rebuild took ${Math.round(o)} ms`,!0),l&&(l=!1,f(`${n.name}: restored`))};d()?p():x(t).then(()=>b(p))}),!n.near||!a)return;let m=n.near,h=n.margin??1,g=!1,v=()=>{if(c){g=!1;return}if(performance.now()-j<150){_(v);return}g=!1,t.isContextLost()||(s=!0,o=!1,E.add(t),a.loseContext())},y=(e,n)=>{(c?!n:e)&&(c=!c,c?s&&t.isContextLost()&&o&&a.restoreContext():g||(g=!0,_(v)))};if(typeof m!=`function`&&`IntersectionObserver`in window){let e=!0,t=!0,n=(n,r)=>new IntersectionObserver(n=>{r(n[n.length-1].isIntersecting),y(e,t)},{rootMargin:`${Math.round((h+n)*100)}% 0px`}).observe(m);n(C,t=>{e=t}),n(w,e=>{t=e});return}let S=e=>{if(typeof m==`function`)return m(h+e);let t=m.getBoundingClientRect(),n=innerHeight;return t.bottom>-n*(h+e)&&t.top<n*(1+h+e)};D.push(()=>y(S(C),S(w))),requestAnimationFrame(A)}var M=new WeakMap;function N(e,t,n){let r=M.get(e);r||M.set(e,r=new Map),r.get(t)!==n&&(r.set(t,n),t.startsWith(`--`)?e.style.setProperty(t,n):e.style[t]=n)}function ne(e,t){N(e,`display`,t?``:`none`)}function re(e,t,n=`150%`){if(!(`IntersectionObserver`in window)){t();return}let r=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(r.disconnect(),t())},{rootMargin:`${n} 0px ${n} 0px`});r.observe(e)}async function ie(e){if(`createImageBitmap`in window)try{let t=await(await fetch(e)).blob();return await createImageBitmap(t,{premultiplyAlpha:`none`,colorSpaceConversion:`none`})}catch{}let t=new Image;return t.src=e,await t.decode(),t}var P=0;addEventListener(`scroll`,()=>{P=performance.now()},{passive:!0});function ae(e){return new Promise(t=>{let n=()=>{performance.now()-P>120||e.getBoundingClientRect().top<innerHeight*1.2?t():requestAnimationFrame(n)};requestAnimationFrame(n)})}var F=(e,t=0,n=1)=>Math.min(n,Math.max(t,e)),I=e=>(e=F(e),e*e*(3-2*e)),oe=(e,t,n)=>I((n-e)/(t-e)),se=(e,t,n)=>e+(t-e)*n,L=.15,R=matchMedia(`(prefers-reduced-motion: reduce)`).matches;function z(e=L,t=5e-4){let n=NaN,r=0,i=!0;return{step(a,o=performance.now(),s=1){let c=o===r?0:i?1/60:Math.min(.1,Math.max(0,(o-r)/1e3));return r=o,R||n!==n?n=a:(n+=(a-n)*(1-Math.exp(-c/e)),n=a+(n-a)*Math.min(1,Math.max(0,s)),Math.abs(a-n)<t&&(n=a)),i=n===a,n},snap(){n=NaN},get easing(){return!i}}}var B=z(L,.05),V=-1,H=0,U=()=>{let e=document.timeline?.currentTime;return typeof e==`number`?e:performance.now()};function W(){let e=U();return e===V?H:(V=e,Math.abs(scrollY-H)>innerHeight*2&&B.snap(),H=B.step(scrollY,e),H)}function ce(){return scrollY-W()}function le(){return W(),B.easing}addEventListener(`hashchange`,()=>B.snap()),r(()=>B.snap()),window.__scrub=()=>({y:H,scrollY,easing:B.easing});var G=matchMedia(`(prefers-reduced-motion: reduce)`).matches,K=Math.max(1,Number(new URLSearchParams(location.search).get(`bleedslow`))||1),q=.7*K,ue=.38*K,J={bw:1,line:2}[document.documentElement.dataset.dm??``]??0,de=`attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`,fe=`precision highp float;
uniform vec2 u_res;
uniform vec4 u_rect;        // slice in device px, top-left origin: x0 y0 x1 y1
uniform vec4 u_uv;          // the part of the square crop the slice shows: x y w h
uniform sampler2D u_bw, u_col, u_dist, u_sk;
uniform vec2 u_origin;      // device px
uniform float u_fill;       // the hover bleed, 0..1
uniform float u_recede;     // the retract on leave, 0..1 (0 while hovered)
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
float farCorner(){ vec2 a = u_rect.xy - u_origin, b = u_rect.zw - u_origin;
  return max(max(length(a), length(b)), max(length(vec2(a.x,b.y)), length(vec2(b.x,a.y)))); }
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
    vec3 o = mb;
    // attention: the true colour bleeds in from the pointer (the strip's hover, below, on this ground)
    if (u_fill > 0.) {
      float frac = length(p - u_origin) / farCorner();
      frac *= .82 + .36 * fbm(q * .006 + u_seed);
      frac += .09 * (lum - .5);
      frac += .05 * (fbm(q * .045 + u_seed + 3.7 + u_time * .02) - .5);
      float f = u_fill * 1.32;
      float wet = f - frac;
      float m = smoothstep(0., .022, wet);
      m = max(m, smoothstep(.97, 1., u_fill));
      float tideR = 0.;
      if (u_recede > 0.) {
        float edgeR = f + .04;
        float fr = frac + .14 * (fbm(q * .008 + u_seed + 9.1) - .5) + .03 * (fbm(q * .06 + u_seed + 5.3) - .5);
        float wetR = mix(edgeR, -.16, u_recede) - fr;
        m *= smoothstep(0., .03, wetR);
        tideR = exp(-pow(wetR / .02, 2.)) * step(-.004, wetR);
      }
      float dil = smoothstep(0., .2, wet);
      float tide = exp(-pow(wet / .022, 2.)) * step(0., wet) * (1. - smoothstep(.94, 1., u_fill));
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
}`;function pe(e={}){let t=e.root??document.querySelector(`[data-strip]`);if(!t)return null;let n=t.querySelector(`[data-strip-row]`),r=n.querySelector(`canvas`),i=[...n.querySelectorAll(`.dm-slice`)],a=null,o=.2,s=.3,c=null,l=!0,u=()=>{if(!J)return;let e=n.getBoundingClientRect(),t=C[C.length-1];if(!t)return;let r=K(U(C.length-1,e.top,innerHeight,t.el.getBoundingClientRect().top)),i=W();r>=.999?c??=l?i-innerHeight*2:i:r<.98&&(c=null),l=!1},d=t=>{if(!J||G||t<=0||e.shock===!1)return[0,0];let n=F(t*1.04);return f||t<.999||c==null?[n,0]:[n,F(((W()-c)/innerHeight-o)/s)]},f=matchMedia(`(max-width: 760px)`).matches,p=1,m=0,h=0,_=0,v=-1,y=0,b=0,x=!1,C=i.map((e,t)=>({el:e,place:e.dataset.place,meta:{focal:[.5,.5],dmax:40},enteredAt:null,leftAt:null,fillAtLeave:0,origin:[.5,.5],seed:3.1+t*7.3})),w=new URLSearchParams(location.search).has(`nogl`)?null:r.getContext(`webgl`,{antialias:!1,premultipliedAlpha:!1}),T=null,E={},D=null,O=()=>{if(w&&(T=g(w,de,fe),T)){w.useProgram(T),S(w,T);for(let e of[`u_res`,`u_rect`,`u_uv`,`u_bw`,`u_col`,`u_dist`,`u_sk`,`u_origin`,`u_fill`,`u_recede`,`u_arr`,`u_flash`,`u_seed`,`u_dpr`,`u_time`])E[e]=w.getUniformLocation(T,e);if(w.uniform1i(E.u_bw,0),w.uniform1i(E.u_col,1),w.uniform1i(E.u_dist,2),w.uniform1i(E.u_sk,3),D){for(let e of C)e.tex=void 0;n.classList.remove(`has-gl`);let e=n.getBoundingClientRect();e.bottom>0&&e.top<innerHeight&&R(),D()}}};O();let k=(e,t)=>{let n=ee(w)?w.createTexture():null;if(!n)return null;w.bindTexture(w.TEXTURE_2D,n);let r=t?w.LUMINANCE:w.RGB;return w.texImage2D(w.TEXTURE_2D,0,r,r,w.UNSIGNED_BYTE,e),w.generateMipmap(w.TEXTURE_2D),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_MIN_FILTER,w.LINEAR_MIPMAP_LINEAR),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_MAG_FILTER,w.LINEAR),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_WRAP_S,w.CLAMP_TO_EDGE),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_WRAP_T,w.CLAMP_TO_EDGE),n},A=J?`/patronus-preview/home/domains-strip`:`/patronus-preview/home/domains`,j=ie,M=!1,P=matchMedia(`(max-width: 1100px)`).matches,oe=J?P?[`bw-m.webp`,`col-m.webp`]:[`bw.jpg`,`col.jpg`]:P?[`bw-m.webp`,`false-m.webp`,`dist.jpg`,`sketch-m.webp`]:[`bw.jpg`,`false.jpg`,`dist.jpg`,`sketch.png`],se=e=>{let t=()=>{let t=window.requestIdleCallback;t?t(e,{timeout:1500}):setTimeout(e,200)};document.readyState===`complete`?t():addEventListener(`load`,t,{once:!0})},L=[],R=()=>{for(let[e,t]of L.splice(0))e.setAttribute(`src`,t),e.hidden=!1;H()};n.querySelectorAll(`img.dm-img`).forEach(e=>{let t=e.getAttribute(`src`);t&&(e.dataset.small=t,J&&(e.dataset.big=t.replace(/\.jpg$/,`-2k.jpg`)),w&&!e.complete&&(L.push([e,t]),e.removeAttribute(`src`),e.hidden=!0))}),w&&re(n,()=>{n.classList.contains(`has-gl`)||R()},P?`0%`:`60%`),se(()=>(e.meta?Promise.resolve(e.meta):fetch(`${A}/strip.json`).then(e=>e.json())).then(async e=>{if(C.forEach(t=>{e[t.place]&&(t.meta=e[t.place])}),V=!0,H(),w){let e=()=>P?new Promise(e=>requestAnimationFrame(()=>e())):ae(n),t=0,r=async()=>{let n=++t,r=C.map(e=>Promise.all(oe.map(t=>j(`${e.el.dataset.src??`${A}/${e.place}`}/${t}`))));for(let i=0;i<C.length;i++){let a=C[i],o=await r[i];if(n!==t)return;let[s,c,l,u]=J?[o[0],o[1]]:o;await e();let d=k(s,!0);await e();let f=k(c,!1),p=d,m=d;if(l&&u&&(await e(),p=k(l,!0),await e(),m=k(u,!0)),n!==t||!d||!f||!p||!m)return;a.tex={bw:d,col:f,dist:p,sk:m};for(let e of o)`close`in e&&e.close();Q=``,$()}};D=()=>{r().then(()=>{C.every(e=>e.tex)&&(Q=``,n.classList.add(`has-gl`),$())}).catch(()=>{})},await r(),await e(),M=!0,Q=``,_e(performance.now()),Q=``,C.every(e=>e.tex)&&n.classList.add(`has-gl`)}M=!0,$()}).catch(()=>{R()}));let z=()=>{f=matchMedia(`(max-width: 760px)`).matches,p=Math.min(devicePixelRatio||1,f?1.25:2),m=n.clientWidth,h=n.clientHeight;let e=getComputedStyle(n),t=C.length,i=Number(e.getPropertyValue(`--grow`))||3.4;_=f?m:(m-(parseFloat(e.columnGap)||0)*(t-1))*i/(i+t-1),r.width=Math.round(m*p),r.height=Math.round(h*p),$()};new ResizeObserver(z).observe(n),w&&T&&te(r,w,{name:e.name??`strip`,near:n,margin:1},O,()=>{Q=``,$()}),w&&r.addEventListener(`webglcontextlost`,()=>{T=null});let B=(e,t,n,r=1)=>{let i=Math.max(t,Math.max(_,e)/r),a=Math.min(1,e/(i*r)),o=Math.min(1,t/i);return[F(n[0]-a/2,0,1-a),F(n[1]-o/2,0,1-o),a,o]},V=!1,H=()=>{if(V)for(let e of C){let t=e.el.clientWidth,n=e.el.clientHeight,r=J?e.meta.aspect??1:1,[i,a,o,s]=B(t,n,e.meta.focal,r),c=t/o,l=n/s;e.el.querySelectorAll(`img.dm-img`).forEach(e=>{if(e.style.cssText=`inset:auto;left:0;top:0;width:${c.toFixed(1)}px;height:${l.toFixed(1)}px;object-fit:fill;transform:translate(${(-i*c).toFixed(1)}px,${(-a*l).toFixed(1)}px)`,e.dataset.big&&!e.hidden){let t=innerWidth>760&&c*(devicePixelRatio||1)>1500?e.dataset.big:e.dataset.small;e.getAttribute(`src`)!==t&&e.setAttribute(`src`,t)}})}},U=(e,t,n,r)=>{if(a!=null)return F(a*1.4-e*.1);let i=ce();return t+=i,r+=i,F(f?(n*.92-r)/(n*.45):F((n*.82-t)/(n*.56))*1.4-e*.1)},K=e=>G?+(e>.5):e,pe=e=>+!G,Y=(e,t)=>e.enteredAt==null?0:e.leftAt==null?G?1:1-(1-F((t-e.enteredAt)/1e3/q))**2.6:G?0:e.fillAtLeave,me=(e,t)=>e.leftAt==null||e.enteredAt==null?0:G?1:F((t-e.leftAt)/1e3/ue)**1.3,he=(e,t)=>{let n=Y(e,t),r=me(e,t);return r<=0?n:F((n*1.32+.04+r*(-.16-n*1.32-.04))/1.32)},X=!!J&&e.shock!==!1,Z=e=>G?+(e>=.97):d(e)[0],ge=e=>{let t=C.map(t=>{let n=t.el.getBoundingClientRect();return Math.abs(n.top+n.height/2-e/2)}),n=t.indexOf(Math.min(...t));return C.map((r,i)=>i===n?I(1-(t[i]/(e/2)-.06)/.3):0)},Q=``,_e=e=>{if(!w||!T||!M||!m||!ee(w))return;let t=f&&!X,i=n.getBoundingClientRect(),a=innerHeight,l=t?ge(a):null,u=`${r.width}x${r.height}|${C.filter(e=>e.tex).length}|${J&&!f&&c!=null?F(((W()-c)/innerHeight-o)/s).toFixed(3):``}`;for(let n=0;n<C.length;n++){let r=C[n],o=r.el.getBoundingClientRect(),s=K(U(n,i.top,a,o.top)),c=f?t?s>=.97?l[n]:0:Z(s):s>=.97?Y(r,e):0,d=!f&&s>=.97?me(r,e):0;u+=`|${(o.left-i.left).toFixed(1)},${o.width.toFixed(1)},${s.toFixed(3)},${c.toFixed(3)},${d.toFixed(3)}`}if(u===Q)return;Q=u,w.viewport(0,0,r.width,r.height),w.uniform2f(E.u_res,r.width,r.height),w.uniform1f(E.u_dpr,p),w.uniform1f(E.u_time,e/1e3),w.enable(w.SCISSOR_TEST);let h=n.getBoundingClientRect(),g=innerHeight,_=t?ge(g):null;for(let t=0;t<C.length;t++){let n=C[t];if(f&&X&&N(n.el,`--fill`,Z(K(U(t,h.top,g,n.el.getBoundingClientRect().top))).toFixed(3)),!n.tex)continue;let i=n.el.getBoundingClientRect(),a=(i.left-h.left)*p,o=(i.top-h.top)*p,s=a+i.width*p,c=o+i.height*p;w.scissor(Math.floor(a),Math.floor(r.height-c),Math.ceil(s-a),Math.ceil(c-o)),w.uniform4f(E.u_rect,a,o,s,c),w.uniform4f(E.u_uv,...B(i.width,i.height,n.meta.focal,n.meta.aspect));let l=K(U(t,h.top,g,i.top));N(n.el,`--arr`,l.toFixed(3)),w.uniform1f(E.u_arr,l),w.uniform1f(E.u_flash,pe(l)),w.uniform1f(E.u_seed,n.seed),w.uniform1f(w.getUniformLocation(T,`u_mode`),J),J&&w.uniform1f(E.u_flash,0);let u=0,m=0,v=n.origin[0],y=n.origin[1];if(f&&X?(u=Z(l),v=.5,y=-.12):f?(u=l>=.97?_[t]:0,v=.04,y=.5):l>=.97&&(u=Y(n,e),m=me(n,e)),m>=1&&(u=0),x&&(u=1,m=0),J&&!f){let[e,t]=d(l);e>0&&t<1&&e*(1-t)>=(m>0?u*(1-m):u)&&(u=e,m=t,v=.5,y=-.12)}Ce[t]=m>0?u*(1-m):u,w.uniform2f(E.u_origin,a+v*(s-a),o+y*(c-o)),w.uniform1f(E.u_fill,u),w.uniform1f(E.u_recede,m),w.activeTexture(w.TEXTURE0),w.bindTexture(w.TEXTURE_2D,n.tex.bw),w.activeTexture(w.TEXTURE1),w.bindTexture(w.TEXTURE_2D,n.tex.col),w.activeTexture(w.TEXTURE2),w.bindTexture(w.TEXTURE_2D,n.tex.dist),w.activeTexture(w.TEXTURE3),w.bindTexture(w.TEXTURE_2D,n.tex.sk),w.drawArrays(w.TRIANGLE_STRIP,0,4)}w.disable(w.SCISSOR_TEST)},ve=e=>{let t=n.getBoundingClientRect(),r=innerHeight,i=f&&!X?ge(r):null;C.forEach((n,a)=>{let o=n.el.getBoundingClientRect(),s=K(U(a,t.top,r,o.top)),c=f&&X?Z(s):s>=.97?i?i[a]:he(n,e):0;if(J&&!f){let[e,t]=d(s);t<1&&(c=Math.max(c,e*(1-t)))}Ce[a]=c,N(n.el,`--arr`,s.toFixed(3)),N(n.el,`--fill`,(x?1:c).toFixed(3))})},ye=()=>{y=0;let e=performance.now();u();let t=n.getBoundingClientRect(),i=t.bottom>-40&&t.top<innerHeight+40;if(ne(r,i),!i){Q=``;return}w?_e(e):ve(e),V&&!n.classList.contains(`has-gl`)&&H(),we.length&&Ee(),(le()||C.some(t=>t.enteredAt!=null&&t.leftAt==null&&e-t.enteredAt<q*1e3+50||t.leftAt!=null&&e-t.leftAt<ue*1e3+50)||e<b)&&(y=requestAnimationFrame(ye))},$=(e=0)=>{b=Math.max(b,performance.now()+e),y||=requestAnimationFrame(ye)};addEventListener(`scroll`,()=>$(),{passive:!0});let be=(e,t)=>{if(f||e===v)return;let r=performance.now();v>=0&&xe(v,r),v=e;let a=C[e],o=a.leftAt==null?0:he(a,r);a.enteredAt=r-(o>0?q*1e3*(1-(1-o)**(1/2.6)):0),a.leftAt=null,o<=.02&&(a.origin=t),n.classList.add(`has-active`),i.forEach((t,n)=>t.classList.toggle(`is-active`,n===e)),$(520)},xe=(e,t)=>{let n=C[e];n.enteredAt!=null&&n.leftAt==null&&(n.fillAtLeave=Y(n,t),n.leftAt=t)},Se=()=>{v<0||(xe(v,performance.now()),v=-1,n.classList.remove(`has-active`),i.forEach(e=>e.classList.remove(`is-active`)),$(520))};i.forEach((e,t)=>{e.addEventListener(`pointerenter`,n=>{if(n.pointerType===`touch`)return;let r=e.getBoundingClientRect();be(t,[F((n.clientX-r.left)/r.width),F((n.clientY-r.top)/r.height)])}),e.addEventListener(`focus`,()=>be(t,[.5,.82])),e.addEventListener(`blur`,()=>{n.contains(document.activeElement)||Se()})}),n.addEventListener(`pointerleave`,e=>{e.pointerType!==`touch`&&!n.contains(document.activeElement)&&Se()});let Ce=[],we=[],Te=[],Ee=()=>{C.forEach((e,t)=>{let n=we[t];if(!n)return;let r=e.el.getBoundingClientRect(),[i,a]=Te[t],[o,s,c,l]=B(r.width,r.height,e.meta.focal,e.meta.aspect);n.setAttribute(`viewBox`,`${(o*i).toFixed(1)} ${(s*a).toFixed(1)} ${(c*i).toFixed(1)} ${(l*a).toFixed(1)}`),N(n,`opacity`,(1-I(((Ce[t]??0)-.55)/.4)).toFixed(3))})};J===2&&re(n,()=>{C.forEach((e,t)=>fetch(`/patronus-preview/home/domains/${e.place}/line.json`).then(e=>e.json()).then(n=>{let r=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);r.setAttribute(`class`,`dm-ln`),r.setAttribute(`aria-hidden`,`true`),r.setAttribute(`preserveAspectRatio`,`none`),r.innerHTML=`<path d="${n.d}" />`,e.el.append(r),we[t]=r,Te[t]=[n.w,n.h],$()}).catch(()=>{}))},`300%`),J&&(n.peelFrom=()=>{let e=C[f?C.length-1:2]?.el;if(!e)return null;let t=e.getBoundingClientRect(),n=t.left+t.width*.86,r=t.bottom+scrollY;return{pts:[[n,r-8],[n,r-5],[n,r-3],[n,r-1]],bottom:r}}),z(),n.__uv=()=>C.map(e=>{let t=e.el.getBoundingClientRect();return B(t.width,t.height,e.meta.focal,e.meta.aspect)});let De={setArrival(e){let t=e==null?null:F(e);t!==a&&(a=t,$())}};return e.root||(window.__strip=De),De.setRest=e=>{x=e,Q=``,$()},De}export{o as C,r as S,g as _,le as a,a as b,I as c,ie as d,N as f,ee as g,te as h,W as i,oe as l,re as m,z as n,F as o,ne as p,ce as r,se as s,pe as t,ae as u,S as v,n as w,i as x,x as y};