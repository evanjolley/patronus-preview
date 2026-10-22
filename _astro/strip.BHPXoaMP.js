var e=typeof location<`u`&&new URLSearchParams(location.search).has(`diag`),t=null,n=null,r=[];function i(){if(t||!document.body)return t;t=document.createElement(`div`),t.setAttribute(`aria-hidden`,`true`),t.style.cssText=`position:fixed;right:8px;top:8px;z-index:9999;max-width:min(320px,calc(100vw - 16px));max-height:30vh;overflow:hidden;padding:6px 8px;border-radius:6px;background:rgba(29,29,21,.86);color:#f4f1e8;font:10.5px/1.35 ui-monospace,Menlo,monospace;pointer-events:none;white-space:pre-wrap`,n=document.createElement(`div`),t.append(n),document.body.append(t);let e=()=>{n&&(n.textContent=`live WebGL contexts: ${window.__glLive?.()??`?`}`),setTimeout(e,500)};return e(),t}function a(t,a=!1){if(!e)return;let o=(performance.now()/1e3).toFixed(1);r.push(`${o}s ${a?`! `:``}${t}`);let s=i();if(!s)return;let c=document.createElement(`div`);for(c.textContent=r[r.length-1],a&&(c.style.color=`#ff8a7a`),n.after(c);s.childNodes.length>16;)s.lastChild.remove()}e&&(addEventListener(`error`,e=>a(`${e.message}${e.filename?` (${e.filename.split(`/`).pop()}:${e.lineno})`:``}`,!0)),addEventListener(`unhandledrejection`,e=>a(`rejection: ${(e.reason&&(e.reason.message||e.reason))??`?`}`,!0)),document.readyState===`loading`?addEventListener(`DOMContentLoaded`,()=>{i(),a(`diag on`)}):(i(),a(`diag on`)));var o=new WeakMap,s=new WeakMap,c=(e,t)=>e+`\0`+t;function l(e,t,n){let r=c(t,n),i=s.get(e);i||s.set(e,i=new Map),i.set(r,[t,n]);let a=o.get(e)?.get(r);if(a&&!e.isContextLost())return o.get(e).delete(r),a;let l=(t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:null},u=l(e.VERTEX_SHADER,t),d=l(e.FRAGMENT_SHADER,n);if(!u||!d)return null;let f=e.createProgram();return e.attachShader(f,u),e.attachShader(f,d),e.linkProgram(f),e.getProgramParameter(f,e.LINK_STATUS)?f:null}var u=e=>{let t=window.requestIdleCallback;t?t(e,{timeout:400}):setTimeout(e,40)},d=[],f=!1,p=e=>{if(d.push(e),f)return;f=!0;let t=()=>{let e=d.shift();if(!e){f=!1;return}u(()=>{e(),requestAnimationFrame(t)})};t()};function m(e,t){let n=t??[...s.get(e)?.values()??[]],r=o.get(e);r||o.set(e,r=new Map);let i=r,a=e.getExtension(`KHR_parallel_shader_compile`),l=([t,n])=>{let r=e.createProgram(),i=e.createShader(e.VERTEX_SHADER),a=e.createShader(e.FRAGMENT_SHADER);return!r||!i||!a?null:(e.shaderSource(i,t),e.compileShader(i),e.shaderSource(a,n),e.compileShader(a),e.attachShader(r,i),e.attachShader(r,a),e.linkProgram(r),r)},d=(t,n)=>{n&&!e.isContextLost()&&e.getProgramParameter(n,e.LINK_STATUS)&&i.set(t,n)};if(a){let t=n.map(e=>[c(...e),l(e)]);return new Promise(n=>{let r=()=>{if(e.isContextLost()){n();return}t.every(([,t])=>!t||e.getProgramParameter(t,a.COMPLETION_STATUS_KHR))?(t.forEach(([e,t])=>d(e,t)),n()):requestAnimationFrame(r)};requestAnimationFrame(r)})}return n.reduce((t,n)=>t.then(()=>new Promise(t=>u(()=>{e.isContextLost()||d(c(...n),l(n)),t()}))),Promise.resolve())}function h(e,t,n=`p`){let r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);let i=e.getAttribLocation(t,n);e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0)}var g=0,_=.3,v=[],y=new WeakSet,b=e=>!!e&&!e.isContextLost()&&!y.has(e);window.__glLive=()=>v.filter(e=>e.canvas.isConnected&&!e.gl.isContextLost()).length;var x=[],S=0,C=()=>{S=0;for(let e of x)e()},w=()=>{S||=requestAnimationFrame(C)},T=0;addEventListener(`scroll`,()=>{T=performance.now(),x.length&&w()},{passive:!0}),addEventListener(`resize`,w);function E(e,t,n,r,i){let s=t.getExtension(`WEBGL_lose_context`);v.push({name:n.name,gl:t,canvas:e});let c=!1,l=!1,d=!0,f=!1,h=0;e.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),c=!0,y.add(t),l&&d&&setTimeout(()=>{d&&t.isContextLost()&&s?.restoreContext()}),h++,o.delete(t),l||(f=!0,a(`${n.name}: context lost`,!0))});let b=()=>{let e=n.near;if(!e)return!0;if(typeof e==`function`)return e(0);let t=e.getBoundingClientRect();return t.bottom>0&&t.top<innerHeight};if(e.addEventListener(`webglcontextrestored`,()=>{if(!d){l=!0,c=!1,y.add(t),s?.loseContext();return}l=!1;let e=++h,o=()=>{if(e!==h||t.isContextLost())return;y.delete(t);let o=performance.now();try{r(),i()}catch(e){a(`${n.name}: restore failed: ${e.message}`,!0)}let s=performance.now()-o;(window.__glRestore??=[]).push([n.name,Math.round(s)]),s>16&&a(`${n.name}: rebuild took ${Math.round(s)} ms`,!0),f&&(f=!1,a(`${n.name}: restored`))};b()?o():m(t).then(()=>p(o))}),!n.near||!s)return;let S=n.near,C=n.margin??1,E=!1,D=()=>{if(d){E=!1;return}if(performance.now()-T<150){u(D);return}E=!1,t.isContextLost()||(l=!0,c=!1,y.add(t),s.loseContext())},O=(e,n)=>{(d?!n:e)&&(d=!d,d?l&&t.isContextLost()&&c&&s.restoreContext():E||(E=!0,u(D)))};if(typeof S!=`function`&&`IntersectionObserver`in window){let e=!0,t=!0,n=(n,r)=>new IntersectionObserver(n=>{r(n[n.length-1].isIntersecting),O(e,t)},{rootMargin:`${Math.round((C+n)*100)}% 0px`}).observe(S);n(g,t=>{e=t}),n(_,e=>{t=e});return}let k=e=>{if(typeof S==`function`)return S(C+e);let t=S.getBoundingClientRect(),n=innerHeight;return t.bottom>-n*(C+e)&&t.top<n*(1+C+e)};x.push(()=>O(k(g),k(_))),requestAnimationFrame(w)}var D=new WeakMap;function O(e,t,n){let r=D.get(e);r||D.set(e,r=new Map),r.get(t)!==n&&(r.set(t,n),t.startsWith(`--`)?e.style.setProperty(t,n):e.style[t]=n)}function k(e,t){O(e,`display`,t?``:`none`)}function A(e,t,n=`150%`){if(!(`IntersectionObserver`in window)){t();return}let r=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(r.disconnect(),t())},{rootMargin:`${n} 0px ${n} 0px`});r.observe(e)}async function ee(e){if(`createImageBitmap`in window)try{let t=await(await fetch(e)).blob();return await createImageBitmap(t,{premultiplyAlpha:`none`,colorSpaceConversion:`none`})}catch{}let t=new Image;return t.src=e,await t.decode(),t}var j=0;addEventListener(`scroll`,()=>{j=performance.now()},{passive:!0});function te(e){return new Promise(t=>{let n=()=>{performance.now()-j>120||e.getBoundingClientRect().top<innerHeight*1.2?t():requestAnimationFrame(n)};requestAnimationFrame(n)})}var M=(e,t=0,n=1)=>Math.min(n,Math.max(t,e)),N=e=>(e=M(e),e*e*(3-2*e)),P=(e,t,n)=>N((n-e)/(t-e)),F=(e,t,n)=>e+(t-e)*n,I=matchMedia(`(prefers-reduced-motion: reduce)`).matches,L=Math.max(1,Number(new URLSearchParams(location.search).get(`bleedslow`))||1),R=.7*L,ne=.38*L,z={bw:1,line:2}[document.documentElement.dataset.dm??``]??0,re=`attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`,ie=`precision highp float;
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
}`;function ae(e={}){let t=e.root??document.querySelector(`[data-strip]`);if(!t)return null;let n=t.querySelector(`[data-strip-row]`),r=n.querySelector(`canvas`),i=[...n.querySelectorAll(`.dm-slice`)],a=null,o=.2,s=.3,c=null,u=!0,d=()=>{if(!z)return;let e=n.getBoundingClientRect(),t=w[w.length-1];if(!t)return;let r=K(G(w.length-1,e.top,innerHeight,t.el.getBoundingClientRect().top));r>=.999?c??=u?scrollY-innerHeight*2:scrollY:r<.98&&(c=null),u=!1},f=t=>{if(!z||I||t<=0||e.shock===!1)return[0,0];let n=M(t*1.04);return p||t<.999||c==null?[n,0]:[n,M(((scrollY-c)/innerHeight-o)/s)]},p=matchMedia(`(max-width: 760px)`).matches,m=1,g=0,_=0,v=0,y=-1,x=0,S=0,C=!1,w=i.map((e,t)=>({el:e,place:e.dataset.place,meta:{focal:[.5,.5],dmax:40},enteredAt:null,leftAt:null,fillAtLeave:0,origin:[.5,.5],seed:3.1+t*7.3})),T=new URLSearchParams(location.search).has(`nogl`)?null:r.getContext(`webgl`,{antialias:!1,premultipliedAlpha:!1}),D=null,j={},P=null,F=()=>{if(T&&(D=l(T,re,ie),D)){T.useProgram(D),h(T,D);for(let e of[`u_res`,`u_rect`,`u_uv`,`u_bw`,`u_col`,`u_dist`,`u_sk`,`u_origin`,`u_fill`,`u_recede`,`u_arr`,`u_flash`,`u_seed`,`u_dpr`,`u_time`])j[e]=T.getUniformLocation(D,e);if(T.uniform1i(j.u_bw,0),T.uniform1i(j.u_col,1),T.uniform1i(j.u_dist,2),T.uniform1i(j.u_sk,3),P){for(let e of w)e.tex=void 0;n.classList.remove(`has-gl`);let e=n.getBoundingClientRect();e.bottom>0&&e.top<innerHeight&&V(),P()}}};F();let L=(e,t)=>{let n=b(T)?T.createTexture():null;if(!n)return null;T.bindTexture(T.TEXTURE_2D,n);let r=t?T.LUMINANCE:T.RGB;return T.texImage2D(T.TEXTURE_2D,0,r,r,T.UNSIGNED_BYTE,e),T.generateMipmap(T.TEXTURE_2D),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_MIN_FILTER,T.LINEAR_MIPMAP_LINEAR),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_MAG_FILTER,T.LINEAR),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_WRAP_S,T.CLAMP_TO_EDGE),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_WRAP_T,T.CLAMP_TO_EDGE),n},ae=z?`/patronus-preview/home/domains-strip`:`/patronus-preview/home/domains`,oe=ee,se=!1,B=matchMedia(`(max-width: 1100px)`).matches,ce=z?B?[`bw-m.webp`,`col-m.webp`]:[`bw.jpg`,`col.jpg`]:B?[`bw-m.webp`,`false-m.webp`,`dist.jpg`,`sketch-m.webp`]:[`bw.jpg`,`false.jpg`,`dist.jpg`,`sketch.png`],le=e=>{let t=()=>{let t=window.requestIdleCallback;t?t(e,{timeout:1500}):setTimeout(e,200)};document.readyState===`complete`?t():addEventListener(`load`,t,{once:!0})},ue=[],V=()=>{for(let[e,t]of ue.splice(0))e.setAttribute(`src`,t),e.hidden=!1;W()};n.querySelectorAll(`img.dm-img`).forEach(e=>{let t=e.getAttribute(`src`);t&&(e.dataset.small=t,z&&(e.dataset.big=t.replace(/\.jpg$/,`-2k.jpg`)),T&&!e.complete&&(ue.push([e,t]),e.removeAttribute(`src`),e.hidden=!0))}),T&&A(n,()=>{n.classList.contains(`has-gl`)||V()},B?`0%`:`60%`),le(()=>(e.meta?Promise.resolve(e.meta):fetch(`${ae}/strip.json`).then(e=>e.json())).then(async e=>{if(w.forEach(t=>{e[t.place]&&(t.meta=e[t.place])}),U=!0,W(),T){let e=()=>B?new Promise(e=>requestAnimationFrame(()=>e())):te(n),t=0,r=async()=>{let n=++t,r=w.map(e=>Promise.all(ce.map(t=>oe(`${e.el.dataset.src??`${ae}/${e.place}`}/${t}`))));for(let i=0;i<w.length;i++){let a=w[i],o=await r[i];if(n!==t)return;let[s,c,l,u]=z?[o[0],o[1]]:o;await e();let d=L(s,!0);await e();let f=L(c,!1),p=d,m=d;if(l&&u&&(await e(),p=L(l,!0),await e(),m=L(u,!0)),n!==t||!d||!f||!p||!m)return;a.tex={bw:d,col:f,dist:p,sk:m};for(let e of o)`close`in e&&e.close();Z=``,Q()}};P=()=>{r().then(()=>{w.every(e=>e.tex)&&(Z=``,n.classList.add(`has-gl`),Q())}).catch(()=>{})},await r(),await e(),se=!0,Z=``,he(performance.now()),Z=``,w.every(e=>e.tex)&&n.classList.add(`has-gl`)}se=!0,Q()}).catch(()=>{V()}));let de=()=>{p=matchMedia(`(max-width: 760px)`).matches,m=Math.min(devicePixelRatio||1,p?1.25:2),g=n.clientWidth,_=n.clientHeight;let e=getComputedStyle(n),t=w.length,i=Number(e.getPropertyValue(`--grow`))||3.4;v=p?g:(g-(parseFloat(e.columnGap)||0)*(t-1))*i/(i+t-1),r.width=Math.round(g*m),r.height=Math.round(_*m),Q()};new ResizeObserver(de).observe(n),T&&D&&E(r,T,{name:e.name??`strip`,near:n,margin:1},F,()=>{Z=``,Q()}),T&&r.addEventListener(`webglcontextlost`,()=>{D=null});let H=(e,t,n,r=1)=>{let i=Math.max(t,Math.max(v,e)/r),a=Math.min(1,e/(i*r)),o=Math.min(1,t/i);return[M(n[0]-a/2,0,1-a),M(n[1]-o/2,0,1-o),a,o]},U=!1,W=()=>{if(U)for(let e of w){let t=e.el.clientWidth,n=e.el.clientHeight,r=z?e.meta.aspect??1:1,[i,a,o,s]=H(t,n,e.meta.focal,r),c=t/o,l=n/s;e.el.querySelectorAll(`img.dm-img`).forEach(e=>{if(e.style.cssText=`inset:auto;left:0;top:0;width:${c.toFixed(1)}px;height:${l.toFixed(1)}px;object-fit:fill;transform:translate(${(-i*c).toFixed(1)}px,${(-a*l).toFixed(1)}px)`,e.dataset.big&&!e.hidden){let t=innerWidth>760&&c*(devicePixelRatio||1)>1500?e.dataset.big:e.dataset.small;e.getAttribute(`src`)!==t&&e.setAttribute(`src`,t)}})}},G=(e,t,n,r)=>M(a==null?p?(n*.92-r)/(n*.45):M((n*.82-t)/(n*.56))*1.4-e*.1:a*1.4-e*.1),K=e=>I?+(e>.5):e,fe=e=>+!I,q=(e,t)=>e.enteredAt==null?0:e.leftAt==null?I?1:1-(1-M((t-e.enteredAt)/1e3/R))**2.6:I?0:e.fillAtLeave,J=(e,t)=>e.leftAt==null||e.enteredAt==null?0:I?1:M((t-e.leftAt)/1e3/ne)**1.3,pe=(e,t)=>{let n=q(e,t),r=J(e,t);return r<=0?n:M((n*1.32+.04+r*(-.16-n*1.32-.04))/1.32)},Y=!!z&&e.shock!==!1,X=e=>I?+(e>=.97):f(e)[0],me=e=>{let t=w.map(t=>{let n=t.el.getBoundingClientRect();return Math.abs(n.top+n.height/2-e/2)}),n=t.indexOf(Math.min(...t));return w.map((r,i)=>i===n?N(1-(t[i]/(e/2)-.06)/.3):0)},Z=``,he=e=>{if(!T||!D||!se||!g||!b(T))return;let t=p&&!Y,i=n.getBoundingClientRect(),a=innerHeight,l=t?me(a):null,u=`${r.width}x${r.height}|${w.filter(e=>e.tex).length}|${z&&!p&&c!=null?M(((scrollY-c)/innerHeight-o)/s).toFixed(3):``}`;for(let n=0;n<w.length;n++){let r=w[n],o=r.el.getBoundingClientRect(),s=K(G(n,i.top,a,o.top)),c=p?t?s>=.97?l[n]:0:X(s):s>=.97?q(r,e):0,d=!p&&s>=.97?J(r,e):0;u+=`|${(o.left-i.left).toFixed(1)},${o.width.toFixed(1)},${s.toFixed(3)},${c.toFixed(3)},${d.toFixed(3)}`}if(u===Z)return;Z=u,T.viewport(0,0,r.width,r.height),T.uniform2f(j.u_res,r.width,r.height),T.uniform1f(j.u_dpr,m),T.uniform1f(j.u_time,e/1e3),T.enable(T.SCISSOR_TEST);let d=n.getBoundingClientRect(),h=innerHeight,_=t?me(h):null;for(let t=0;t<w.length;t++){let n=w[t];if(p&&Y&&O(n.el,`--fill`,X(K(G(t,d.top,h,n.el.getBoundingClientRect().top))).toFixed(3)),!n.tex)continue;let i=n.el.getBoundingClientRect(),a=(i.left-d.left)*m,o=(i.top-d.top)*m,s=a+i.width*m,c=o+i.height*m;T.scissor(Math.floor(a),Math.floor(r.height-c),Math.ceil(s-a),Math.ceil(c-o)),T.uniform4f(j.u_rect,a,o,s,c),T.uniform4f(j.u_uv,...H(i.width,i.height,n.meta.focal,n.meta.aspect));let l=K(G(t,d.top,h,i.top));O(n.el,`--arr`,l.toFixed(3)),T.uniform1f(j.u_arr,l),T.uniform1f(j.u_flash,fe(l)),T.uniform1f(j.u_seed,n.seed),T.uniform1f(T.getUniformLocation(D,`u_mode`),z),z&&T.uniform1f(j.u_flash,0);let u=0,g=0,v=n.origin[0],y=n.origin[1];if(p&&Y?(u=X(l),v=.5,y=-.12):p?(u=l>=.97?_[t]:0,v=.04,y=.5):l>=.97&&(u=q(n,e),g=J(n,e)),g>=1&&(u=0),C&&(u=1,g=0),z&&!p){let[e,t]=f(l);e>0&&t<1&&e*(1-t)>=(g>0?u*(1-g):u)&&(u=e,g=t,v=.5,y=-.12)}$[t]=g>0?u*(1-g):u,T.uniform2f(j.u_origin,a+v*(s-a),o+y*(c-o)),T.uniform1f(j.u_fill,u),T.uniform1f(j.u_recede,g),T.activeTexture(T.TEXTURE0),T.bindTexture(T.TEXTURE_2D,n.tex.bw),T.activeTexture(T.TEXTURE1),T.bindTexture(T.TEXTURE_2D,n.tex.col),T.activeTexture(T.TEXTURE2),T.bindTexture(T.TEXTURE_2D,n.tex.dist),T.activeTexture(T.TEXTURE3),T.bindTexture(T.TEXTURE_2D,n.tex.sk),T.drawArrays(T.TRIANGLE_STRIP,0,4)}T.disable(T.SCISSOR_TEST)},ge=e=>{let t=n.getBoundingClientRect(),r=innerHeight,i=p&&!Y?me(r):null;w.forEach((n,a)=>{let o=n.el.getBoundingClientRect(),s=K(G(a,t.top,r,o.top)),c=p&&Y?X(s):s>=.97?i?i[a]:pe(n,e):0;if(z&&!p){let[e,t]=f(s);t<1&&(c=Math.max(c,e*(1-t)))}$[a]=c,O(n.el,`--arr`,s.toFixed(3)),O(n.el,`--fill`,(C?1:c).toFixed(3))})},_e=()=>{x=0;let e=performance.now();d();let t=n.getBoundingClientRect(),i=t.bottom>-40&&t.top<innerHeight+40;if(k(r,i),!i){Z=``;return}T?he(e):ge(e),U&&!n.classList.contains(`has-gl`)&&W(),xe.length&&Ce(),(w.some(t=>t.enteredAt!=null&&t.leftAt==null&&e-t.enteredAt<R*1e3+50||t.leftAt!=null&&e-t.leftAt<ne*1e3+50)||e<S)&&(x=requestAnimationFrame(_e))},Q=(e=0)=>{S=Math.max(S,performance.now()+e),x||=requestAnimationFrame(_e)};addEventListener(`scroll`,()=>Q(),{passive:!0});let ve=(e,t)=>{if(p||e===y)return;let r=performance.now();y>=0&&ye(y,r),y=e;let a=w[e],o=a.leftAt==null?0:pe(a,r);a.enteredAt=r-(o>0?R*1e3*(1-(1-o)**(1/2.6)):0),a.leftAt=null,o<=.02&&(a.origin=t),n.classList.add(`has-active`),i.forEach((t,n)=>t.classList.toggle(`is-active`,n===e)),Q(520)},ye=(e,t)=>{let n=w[e];n.enteredAt!=null&&n.leftAt==null&&(n.fillAtLeave=q(n,t),n.leftAt=t)},be=()=>{y<0||(ye(y,performance.now()),y=-1,n.classList.remove(`has-active`),i.forEach(e=>e.classList.remove(`is-active`)),Q(520))};i.forEach((e,t)=>{e.addEventListener(`pointerenter`,n=>{if(n.pointerType===`touch`)return;let r=e.getBoundingClientRect();ve(t,[M((n.clientX-r.left)/r.width),M((n.clientY-r.top)/r.height)])}),e.addEventListener(`focus`,()=>ve(t,[.5,.82])),e.addEventListener(`blur`,()=>{n.contains(document.activeElement)||be()})}),n.addEventListener(`pointerleave`,e=>{e.pointerType!==`touch`&&!n.contains(document.activeElement)&&be()});let $=[],xe=[],Se=[],Ce=()=>{w.forEach((e,t)=>{let n=xe[t];if(!n)return;let r=e.el.getBoundingClientRect(),[i,a]=Se[t],[o,s,c,l]=H(r.width,r.height,e.meta.focal,e.meta.aspect);n.setAttribute(`viewBox`,`${(o*i).toFixed(1)} ${(s*a).toFixed(1)} ${(c*i).toFixed(1)} ${(l*a).toFixed(1)}`),O(n,`opacity`,(1-N((($[t]??0)-.55)/.4)).toFixed(3))})};z===2&&A(n,()=>{w.forEach((e,t)=>fetch(`/patronus-preview/home/domains/${e.place}/line.json`).then(e=>e.json()).then(n=>{let r=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);r.setAttribute(`class`,`dm-ln`),r.setAttribute(`aria-hidden`,`true`),r.setAttribute(`preserveAspectRatio`,`none`),r.innerHTML=`<path d="${n.d}" />`,e.el.append(r),xe[t]=r,Se[t]=[n.w,n.h],Q()}).catch(()=>{}))},`300%`),z&&(n.peelFrom=()=>{let e=w[p?w.length-1:2]?.el;if(!e)return null;let t=e.getBoundingClientRect(),n=t.left+t.width*.86,r=t.bottom+scrollY;return{pts:[[n,r-8],[n,r-5],[n,r-3],[n,r-1]],bottom:r}}),de(),n.__uv=()=>w.map(e=>{let t=e.el.getBoundingClientRect();return H(t.width,t.height,e.meta.focal,e.meta.aspect)});let we={setArrival(e){let t=e==null?null:M(e);t!==a&&(a=t,Q())}};return e.root||(window.__strip=we),we.setRest=e=>{C=e,Z=``,Q()},we}export{P as a,O as c,E as d,b as f,m as h,N as i,k as l,h as m,M as n,te as o,l as p,F as r,ee as s,ae as t,A as u};