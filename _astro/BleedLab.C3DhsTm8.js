import{t as e}from"./react.DJY1zw8Z.js";import{n as t,t as n}from"./jsx-runtime.B47ujk9z.js";var r=e(),i=`#version 300 es
in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0., 1.); }`,a=`#version 300 es
precision highp float;
uniform vec2 u_res;
uniform vec4 u_rect;      // image rect x0,y0,x1,y1
uniform float u_margin;   // bleed room around the image
uniform sampler2D u_img;
uniform float u_prog, u_inside, u_time, u_fade, u_dry;
uniform vec2 u_origin;
uniform int u_mode;       // 0 colour, 1 mono, 2 dither
uniform int u_ground;     // 0 bone, 1 ink (light), 2 ink (stain)
uniform float u_reach, u_gran, u_tide, u_scale, u_seed, u_lod, u_dpr, u_mute;
uniform float u_hover, u_R, u_speed, u_couple, u_rest;   // coupled bleed: each edge starts when the colour reaches it
uniform float u_recede;   // retract: how far (margin units) the colour has pulled back from its outer edge
uniform vec4 u_crop;      // which part of the image the rect shows: image uv = xy + rect uv * zw (cover crop, drift)
uniform float u_resolve;  // dither at rest: 0 dithered, 1 resolved to the grey photo (cell by cell)
out vec4 o;

const vec3 BONE = vec3(.933,.933,.902);
const vec3 INK  = vec3(.114,.114,.082);

vec2 P(){ return vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y); }
float h21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),u.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; mat2 r=mat2(.8,-.6,.6,.8); for(int k=0;k<5;k++){ v+=a*vnoise(p); p=r*p*2.03+17.1; a*=.5; } return v; }
float sdRect(vec2 p){ vec2 c=(u_rect.xy+u_rect.zw)*.5, h=(u_rect.zw-u_rect.xy)*.5; vec2 d=abs(p-c)-h; return length(max(d,0.))+min(max(d.x,d.y),0.); }
vec2 rectUV(vec2 p){ return u_crop.xy + clamp((p-u_rect.xy)/(u_rect.zw-u_rect.xy), 0., 1.)*u_crop.zw; }
float lum(vec3 c){ return dot(c, vec3(.2126,.7152,.0722)); }
float chroma(vec3 c){ return clamp((max(c.r,max(c.g,c.b)) - min(c.r,min(c.g,c.b)))*2.2, 0., 1.); }
float bayer2(vec2 a){ a=floor(a); return fract(dot(a, vec2(.5, a.y*.75))); }
float bayer4(vec2 a){ return bayer2(.5*a)*.25 + bayer2(a); }
float bayer8(vec2 a){ return bayer4(.5*a)*.25 + bayer2(a); }

// The colour front grows from the pointer. frontFrac(p) is the fraction of the fill at which it reaches p:
// distance relative to the farthest corner, wobbled ±15% by noise so it isn't a circle. Everything is
// covered exactly when the fill completes (inside = 1), wherever the pointer entered.
float farCorner(){ vec2 a = u_rect.xy - u_origin, b = u_rect.zw - u_origin;
  return max(max(length(a), length(b)), max(length(vec2(a.x,b.y)), length(vec2(b.x,a.y)))); }
float frontFrac(vec2 p){ return clamp(length(p-u_origin)/farCorner() * (.85+.3*fbm(p*.012/u_dpr*u_scale + u_seed)), 0., 1.); }
// Seconds until the front reaches p (inverse of the fill curve 1-(1-x)^2 used in timeline.ts).
float arrival(vec2 p){ return u_R*(1. - sqrt(1. - frontFrac(p))); }
float spreadFn(float b){ return b <= 0. ? 0. : min(1.25, 1. - exp(-1.7*b*u_speed) + .05*log(1. + b*u_speed)); }
// Bleed progress at an edge point: global, or (coupled) counted from the moment the colour touched it.
float progAt(vec2 e){ return u_couple > .5 ? spreadFn(u_hover - arrival(e) - max(u_rest, 0.)) : u_prog; }

// Retract is one front. It starts at the bleed's outer edge and moves in at one speed, through the bleed and
// on into the image, so wherever the bleed was shallow the image starts losing its colour first.
// edgeExt(e): how far the bleed runs out from edge point e (margin units). Each method defines it to match
// what it draws at the edge, so the image starts clearing at e exactly when the bleed there is gone.
float edgeExt(vec2 e);
float keptInside(vec2 p){
  if(u_recede <= 0.) return 1.;
  vec2 a = u_rect.xy, b = u_rect.zw, q = p/u_dpr*u_scale;
  float k = (.75 + .5*fbm(q*.012 + u_seed + 5.3)) / u_margin;   // uneven speed, so it isn't an inset box
  float t = min(min(edgeExt(vec2(a.x, p.y)) + (p.x-a.x)*k, edgeExt(vec2(b.x, p.y)) + (b.x-p.x)*k),
                min(edgeExt(vec2(p.x, a.y)) + (p.y-a.y)*k, edgeExt(vec2(p.x, b.y)) + (b.y-p.y)*k));
  // a ragged front like the wet edge outside; none right at the edge, so it can't run ahead of the bleed
  float depth = min(min(p.x-a.x, b.x-p.x), min(p.y-a.y, b.y-p.y))/u_margin;
  t += (fbm(q*.02 + u_seed + 9.1) - .5)*.5*smoothstep(0., .3, depth);
  return smoothstep(0., .07, t - u_recede);
}

vec3 restColor(vec3 c, vec2 p){
  if(u_mode==0) return c;
  float l = lum(c);
  if(u_mode==1) return mix(INK, BONE, smoothstep(.03,.97,l));
  vec2 cell = floor(p/(3.*u_dpr));
  vec3 grey = mix(INK, BONE, smoothstep(.03,.97,l));
  // dissolve: each cell flips to the grey photo at its own moment, loosely in patches like a scan
  float at = mix(h21(cell + u_seed), fbm(cell*.04 + u_seed), .55);
  if(u_resolve > 0. && at < u_resolve*1.02) return grey;
  return (l > bayer8(cell)) ? BONE : INK;
}
// The image itself: at rest, then resolving to colour from the pointer outward.
vec4 insideColor(vec2 p){
  vec3 c = texture(u_img, rectUV(p)).rgb;
  if(u_mode==0) return vec4(c,1.);
  float m = smoothstep(0., .03, u_inside*1.03 - frontFrac(p)) * keptInside(p);
  return vec4(mix(restColor(c,p), c, m), 1.);
}
// Colour carried out of the image. Sampling straight across from the edge makes hard streaks, so the
// sample point wanders along the edge (low-frequency noise) and softens the further it has travelled.
vec3 pigmentAt(vec2 q, float lod){
  float d = max(sdRect(q), 0.)/u_margin;
  vec2 j = vec2(fbm(q/u_dpr*.006 + u_seed + 3.1), fbm(q/u_dpr*.006 + u_seed + 7.7)) - .5;
  vec2 qq = q + j*u_margin*1.1*(.35 + d);
  return textureLod(u_img, rectUV(qq), lod + d*2.5).rgb;
}
// Lay pigment on the page. s = coverage, tide = pooled wet edge.
vec4 compose(vec3 pig, float s, float tide){
  pig = mix(pig, vec3(lum(pig)), u_dry*.65);
  s *= mix(1. - u_mute, 1., smoothstep(.05, .45, chroma(pig)));   // grey pigment bleeds lightly
  s = clamp(s*u_fade, 0., 1.);
  if(u_ground==0){                       // pigment into bone paper
    vec3 col = pig*(1.-.35*tide);
    col = mix(col, BONE, u_dry*.35);
    return vec4(col*s, s);
  }
  if(u_ground==1){                       // colour as light on ink: luminous, lets the dark through
    vec3 lit = min(pig*(1.2+.6*tide) + .04, 1.);
    float a = s*.78;
    return vec4(lit*a, a);
  }
  // dye soaking into dark paper: deep, saturated, with a lighter pooled edge
  vec3 deep = pow(pig, vec3(1.7))*.62;
  deep = mix(vec3(lum(deep)), deep, 1.35);
  vec3 dye = mix(deep, pig*.85, tide*.7);
  float a = s*.95;
  return vec4(max(dye,0.)*a, a);
}
// Shared reach model: how far each part of the edge runs, given the colour that touches it.
float reachAt(vec2 p, vec3 pig, out float nMid){
  vec2 q = p/u_dpr*u_scale;
  float drift = u_time*.03;
  float nLow = fbm(q*.0035 + u_seed + drift);
  nMid = fbm(q*.013 + u_seed*1.7 - drift);
  return (.05 + 1.25*pow(clamp(nLow*1.25-.2,0.,1.),1.5)) * (.35+.65*chroma(pig)) * u_reach;
}
float washLocal(float prog, float nMid){ return clamp(prog*(.65+.7*nMid), 0., 1.25); }   // parts of the front arrive later
float washReach(vec2 p, float reachMax, float nMid, float local){
  float nFine = vnoise(p/u_dpr*u_scale*.09 + u_seed);
  return reachMax*local*(.8+.4*nMid) + (nFine-.5)*.05*local;
}
vec4 wash(vec2 p, vec3 pig, float dist, float reachMax, float nMid, float prog){
  float local = washLocal(prog, nMid);
  float reach = washReach(p, reachMax, nMid, local);
  float wet = reach - u_recede - dist;                          // retract pulls the wet edge back
  float a = smoothstep(0., .03, wet);
  float thin = pow(clamp(1. - dist/max(reach,1e-3), 0., 1.), .55);
  float tide = exp(-pow(wet/.018,2.)) * step(-.01, wet) * u_tide;
  float gran = (vnoise(p/u_dpr*.55)-.5)*u_gran;
  float s = (.25+.75*thin)*a + tide*a*.6 + gran*a*.4;
  return compose(pig, s, tide);
}
`,o=a+`
void main(){
  vec2 p = P();
  float sd = sdRect(p);
  if(sd <= 0.){ o = insideColor(p); return; }
  vec3 pig = pigmentAt(p, u_lod);
  float nMid; float r = reachAt(p, pig, nMid);
  o = wash(p, pig, sd/u_margin, r, nMid, progAt(clamp(p, u_rect.xy, u_rect.zw)));
}
float edgeExt(vec2 e){
  vec3 pig = pigmentAt(e, u_lod);
  float nMid; float r = reachAt(e, pig, nMid);
  return washReach(e, r, nMid, washLocal(progAt(e), nMid));
}`,s=a+`
vec2 perimeterPoint(float s){
  vec2 a = u_rect.xy, b = u_rect.zw; float w = b.x-a.x, h = b.y-a.y, L = 2.*(w+h);
  float d = s*L;
  if(d < w) return vec2(a.x+d, a.y);
  d -= w; if(d < h) return vec2(b.x, a.y+d);
  d -= h; if(d < w) return vec2(b.x-d, b.y);
  d -= w; return vec2(a.x, b.y-d);
}
// Drop i: where it sits, where on the edge it draws colour from, and its radius in the direction of p
// (already pulled in by the retract).
float drop(int i, vec2 p, out vec2 center, out vec2 c){
  float fi = float(i) + u_seed*13.;
  vec2 e = perimeterPoint(fract(h21(vec2(fi,1.7))*.5 + float(i)/14.));
  c = clamp(e, u_rect.xy, u_rect.zw);
  vec2 n = normalize(e - (u_rect.xy+u_rect.zw)*.5);
  center = e + n*u_margin*.18*h21(vec2(fi,3.1));
  float start = h21(vec2(fi,5.3))*.55;
  float g = clamp((progAt(c) - start*(u_couple > .5 ? .4 : 1.))/.6, 0., 1.); g = 1.-pow(1.-g,3.);
  float size = u_margin*(.16+.36*h21(vec2(fi,7.9)))*u_reach;
  float ang = atan(p.y-center.y, p.x-center.x);
  float wob = .82 + .36*fbm(vec2(ang*2.2, fi) + u_time*.05);
  return size*g*wob - u_recede*u_margin;
}
float edgeExt(vec2 e){
  vec3 pig = pigmentAt(e, u_lod);
  float nMid; float r = reachAt(e, pig, nMid);
  float ext = washReach(e, r*.45, nMid, washLocal(progAt(e), nMid));
  for(int i=0;i<14;i++){
    vec2 center, c; float rad = drop(i, e, center, c) + u_recede*u_margin;
    ext = max(ext, (rad - length(e-center))/u_margin);
  }
  return ext;
}
void main(){
  vec2 p = P();
  float sd = sdRect(p);
  if(sd <= 0.){ o = insideColor(p); return; }
  vec3 pig = pigmentAt(p, u_lod);
  float nMid; float r = reachAt(p, pig, nMid);
  vec4 base = wash(p, pig, sd/u_margin, r*.45, nMid, progAt(clamp(p, u_rect.xy, u_rect.zw)));   // a thin wet halo
  vec4 acc = base;
  for(int i=0;i<14;i++){
    vec2 center, c; float rad = drop(i, p, center, c);
    if(rad <= 0.) continue;
    float d = length(p-center) / rad;
    if(d < 1.){
      vec3 dp = textureLod(u_img, rectUV(c), u_lod*.6).rgb;
      dp = mix(vec3(lum(dp)), dp, 1.3);
      float tide = exp(-pow((1.-d)/.06,2.))*u_tide;
      float s = (.35+.65*pow(1.-d,.4)) + (vnoise(p/u_dpr*.55)-.5)*u_gran*.5;
      vec4 b = compose(dp, s, tide);
      acc = b + acc*(1.-b.a);                                  // drops layer like real pigment
    }
  }
  o = acc;
}`,c=a+`
vec2 flow(vec2 q){
  float e = .7;
  return vec2(vnoise(q+vec2(0,e)) - vnoise(q-vec2(0,e)), -(vnoise(q+vec2(e,0)) - vnoise(q-vec2(e,0))));
}
void main(){
  vec2 p = P();
  float sd = sdRect(p);
  if(sd <= 0.){ o = insideColor(p); return; }
  vec2 pos = p; float L = 0.; bool hit = false; vec2 dir = vec2(0);
  float stepL = u_margin*.032;
  for(int i=0;i<40;i++){
    vec2 inward = clamp(pos, u_rect.xy, u_rect.zw) - pos;
    vec2 f = flow(pos/u_dpr*u_scale*.009 + u_seed + u_time*.04);
    dir = normalize(normalize(inward+1e-4)*.5 + normalize(f+1e-4)*1.25);
    pos += dir*stepL; L += stepL;
    if(sdRect(pos) <= 0.){ hit = true; break; }
  }
  if(!hit){ o = vec4(0); return; }
  // refine where the path crossed the edge, so distances don't step in bands
  float lo = 0., hi = stepL;
  vec2 back = pos - dir*stepL;
  for(int k=0;k<5;k++){ float mid = .5*(lo+hi); if(sdRect(back + dir*mid) <= 0.) hi = mid; else lo = mid; }
  L = L - stepL + hi;
  vec3 pig = mix(pigmentAt(pos, u_lod), pigmentAt(p, u_lod + 1.), .35);   // soft, so neighbouring paths don't comb
  float nMid; float r = reachAt(pos, pig, nMid);
  vec4 w = wash(p, pig, L/u_margin, r*1.15, nMid, progAt(pos));
  w *= .7 + .3*vnoise(p/u_dpr*.04 + u_seed);                  // streaks
  o = w;
}
float edgeExt(vec2 e){
  vec3 pig = mix(pigmentAt(e, u_lod), pigmentAt(e, u_lod + 1.), .35);
  float nMid; float r = reachAt(e, pig, nMid);
  return washReach(e, r*1.15, nMid, washLocal(progAt(e), nMid));
}`,l=`#version 300 es
precision highp float;
uniform sampler2D u_state, u_img;
uniform vec2 u_simRes;
uniform vec4 u_rectSim;
uniform float u_D, u_seed, u_scale, u_lod, u_fibre;
uniform float u_inside, u_simScale, u_dpr, u_nscale;   // reveal front, in canvas px
uniform vec2 u_origin;
uniform vec4 u_rect;
uniform vec4 u_crop;
out vec4 o;
float h21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),u.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; mat2 r=mat2(.8,-.6,.6,.8); for(int k=0;k<4;k++){ v+=a*vnoise(p); p=r*p*2.03+17.1; a*=.5; } return v; }
vec4 at(ivec2 ij){ return texelFetch(u_state, clamp(ij, ivec2(0), ivec2(u_simRes)-1), 0); }
void main(){
  ivec2 ij = ivec2(gl_FragCoord.xy);
  vec2 p = vec2(gl_FragCoord.x, u_simRes.y - gl_FragCoord.y);
  if(p.x>=u_rectSim.x && p.x<=u_rectSim.z && p.y>=u_rectSim.y && p.y<=u_rectSim.w){
    vec2 q = p*u_simScale;                                           // canvas px
    vec2 a = u_rect.xy - u_origin, b = u_rect.zw - u_origin;
    float far = max(max(length(a), length(b)), max(length(vec2(a.x,b.y)), length(vec2(b.x,a.y))));
    float f = clamp(length(q-u_origin)/far * (.85+.3*fbm(q*.012/u_dpr*u_nscale + u_seed)), 0., 1.);
    if(u_inside*1.03 - f < 0.){ o = vec4(0); return; }            // colour hasn't reached here yet
    vec2 uv = u_crop.xy + (p-u_rectSim.xy)/(u_rectSim.zw-u_rectSim.xy)*u_crop.zw;
    o = vec4(textureLod(u_img, uv, u_lod).rgb, 1.); return;
  }
  vec4 s = at(ij);
  // paper: blotchy permeability plus directional fibres
  float blot = fbm(p*.045*u_scale + u_seed);
  float perm = .02 + 1.9*pow(smoothstep(.32, .78, blot), 2.);          // dry patches nearly stop the front
  float fib = vnoise(vec2(p.x*1.1 + p.y*.35, p.y*.09 - p.x*.05)*u_scale + u_seed*3.);
  perm *= 1. + u_fibre*1.6*(fib - .5);
  vec4 acc = vec4(0);
  ivec2 off[4] = ivec2[4](ivec2(1,0), ivec2(-1,0), ivec2(0,1), ivec2(0,-1));
  for(int k=0;k<4;k++){
    vec4 n = at(ij+off[k]);
    float mob = .5*(n.a*n.a + s.a*s.a) + .002;              // porous medium, m = 2
    acc += mob*(n - s);
  }
  o = max(s + u_D*clamp(perm,0.,2.)*acc, 0.);
}`,u=a+`
uniform sampler2D u_state;
float conc(vec2 q){ return texture(u_state, vec2(q.x/u_res.x, 1. - q.y/u_res.y)).a; }
// How far pigment runs on from q in direction n before it thins out (margin units).
float runOut(vec2 q, vec2 n){
  float stepPx = u_margin/32., prev = conc(q);
  if(prev < .02) return 0.;
  for(int i=1;i<48;i++){
    float c = conc(q + n*stepPx*float(i));
    if(c < .02) return (float(i-1) + (prev-.02)/max(prev-c, 1e-4))*stepPx/u_margin;
    prev = c;
  }
  return 48.*stepPx/u_margin;
}
float edgeExt(vec2 e){
  vec2 n = e.x <= u_rect.x + .5 ? vec2(-1,0) : e.x >= u_rect.z - .5 ? vec2(1,0) : e.y <= u_rect.y + .5 ? vec2(0,-1) : vec2(0,1);
  return runOut(e + n*.5, n);
}
void main(){
  vec2 p = P();
  float sd = sdRect(p);
  if(sd <= 0.){ o = insideColor(p); return; }
  vec2 uv = vec2(p.x/u_res.x, 1. - p.y/u_res.y);
  vec4 st = texture(u_state, uv);
  float c = st.a;
  vec3 pig = st.rgb / max(c, 1e-3);
  vec2 px = 1./vec2(textureSize(u_state,0));
  float gx = texture(u_state, uv+vec2(px.x,0)).a - texture(u_state, uv-vec2(px.x,0)).a;
  float gy = texture(u_state, uv+vec2(0,px.y)).a - texture(u_state, uv-vec2(0,px.y)).a;
  float tide = clamp(length(vec2(gx,gy))*5., 0., 1.) * (1.-smoothstep(.15,.55,c)) * u_tide;
  float s = smoothstep(.01, .32, c) + (vnoise(p/u_dpr*.55)-.5)*u_gran*.4*step(.01,c);
  if(u_recede > 0.) s *= smoothstep(0., .03, runOut(p, normalize(p - clamp(p, u_rect.xy, u_rect.zw))) - u_recede);
  o = compose(pig, s, tide);
}`,d=3,f={front:e=>1.3*e+.05,tendrils:e=>1.5*e+.05,blooms:e=>Math.max(.6*e,.18+.62*e)+.05,capillary:()=>1.1};function p(e){if(e.recede>=1)return 1e4;let t=.5*Math.min(e.rect[2]-e.rect[0],e.rect[3]-e.rect[1]);return e.recede*(f[e.method](e.knobs.reach)+1.2*t/e.margin)}var m=[0,0,1,1],h={bone:0,"ink-light":1,"ink-stain":2},g=class{canvas;gl;progs=new Map;uniforms=new Map;textures=new Map;floatOK;constructor(){this.canvas=document.createElement(`canvas`);let e=this.canvas.getContext(`webgl2`,{premultipliedAlpha:!0,alpha:!0,antialias:!1});if(!e)throw Error(`WebGL2 is not available`);this.gl=e,this.floatOK=!!e.getExtension(`EXT_color_buffer_float`);let t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);for(let[e,t]of Object.entries({front:o,blooms:s,tendrils:c,capDraw:u,capStep:l}))this.progs.set(e,this.link(t))}link(e){let t=this.gl,n=(e,n)=>{let r=t.createShader(e);if(t.shaderSource(r,n),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS))throw Error(t.getShaderInfoLog(r)??`shader error`);return r},r=t.createProgram();if(t.attachShader(r,n(t.VERTEX_SHADER,i)),t.attachShader(r,n(t.FRAGMENT_SHADER,e)),t.bindAttribLocation(r,0,`a_pos`),t.linkProgram(r),!t.getProgramParameter(r,t.LINK_STATUS))throw Error(t.getProgramInfoLog(r)??`link error`);return this.uniforms.set(r,new Map),r}u(e,t){let n=this.uniforms.get(e);return n.has(t)||n.set(t,this.gl.getUniformLocation(e,t)),n.get(t)}texture(e){let t=this.textures.get(e.src);if(t)return t;let n=this.gl;return t=n.createTexture(),n.bindTexture(n.TEXTURE_2D,t),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,e),n.generateMipmap(n.TEXTURE_2D),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR_MIPMAP_LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),this.textures.set(e.src,t),t}bindCommon(e,t){let n=this.gl;n.useProgram(e),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,this.texture(t.img)),n.uniform1i(this.u(e,`u_img`),0),n.uniform2f(this.u(e,`u_res`),t.w,t.h),n.uniform4f(this.u(e,`u_rect`),...t.rect),n.uniform1f(this.u(e,`u_margin`),t.margin),n.uniform1f(this.u(e,`u_prog`),t.prog),n.uniform1f(this.u(e,`u_inside`),t.inside),n.uniform1f(this.u(e,`u_time`),t.time),n.uniform1f(this.u(e,`u_fade`),t.fade),n.uniform1f(this.u(e,`u_dry`),t.dry),n.uniform2f(this.u(e,`u_origin`),...t.origin),n.uniform1i(this.u(e,`u_mode`),t.mode),n.uniform1i(this.u(e,`u_ground`),h[t.ground]),n.uniform1f(this.u(e,`u_reach`),t.knobs.reach),n.uniform1f(this.u(e,`u_gran`),t.knobs.gran),n.uniform1f(this.u(e,`u_tide`),t.knobs.tide),n.uniform1f(this.u(e,`u_scale`),t.knobs.scale),n.uniform1f(this.u(e,`u_seed`),t.seed),n.uniform1f(this.u(e,`u_lod`),t.knobs.lod),n.uniform1f(this.u(e,`u_dpr`),t.dpr),n.uniform1f(this.u(e,`u_mute`),t.knobs.mute),n.uniform1f(this.u(e,`u_hover`),t.hover),n.uniform1f(this.u(e,`u_R`),t.R),n.uniform1f(this.u(e,`u_speed`),t.speed),n.uniform1f(this.u(e,`u_couple`),+!!t.couple),n.uniform1f(this.u(e,`u_recede`),p(t)),n.uniform1f(this.u(e,`u_rest`),t.rest),n.uniform4f(this.u(e,`u_crop`),...t.crop??m),n.uniform1f(this.u(e,`u_resolve`),t.resolve??0)}quad(){let e=this.gl;e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.drawArrays(e.TRIANGLE_STRIP,0,4)}ensureSize(e,t){(this.canvas.width<e||this.canvas.height<t)&&(this.canvas.width=Math.max(this.canvas.width,e),this.canvas.height=Math.max(this.canvas.height,t))}makeSim(e){let t=this.gl,n=Math.ceil(e.w/d),r=Math.ceil(e.h/d),i=()=>{let e=t.createTexture();t.bindTexture(t.TEXTURE_2D,e),this.floatOK?t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,n,r,0,t.RGBA,t.HALF_FLOAT,null):t.texImage2D(t.TEXTURE_2D,0,t.RGBA,n,r,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);let i=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,i),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),[e,i]},a=i(),o=i();return t.bindFramebuffer(t.FRAMEBUFFER,null),{tex:[a[0],o[0]],fbo:[a[1],o[1]],w:n,h:r,steps:0,cur:0,key:`${e.img.src}|${e.w}x${e.h}|${e.seed}`}}freeSim(e){if(!e)return;let t=this.gl;e.tex.forEach(e=>t.deleteTexture(e)),e.fbo.forEach(e=>t.deleteFramebuffer(e))}stepSim(e,t){let n=this.gl,r=e.sim,i=`${e.img.src}|${e.w}x${e.h}|${e.seed}`;(!r||r.key!==i)&&(this.freeSim(r),r=this.makeSim(e));let a=Math.round(Math.min(e.prog,1.25)*1500*e.knobs.reach);a<r.steps&&(this.freeSim(r),r=this.makeSim(e));let o=Math.min(a-r.steps,t);if(o>0){let t=this.progs.get(`capStep`);n.useProgram(t),n.viewport(0,0,r.w,r.h),n.disable(n.BLEND),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,this.texture(e.img)),n.uniform1i(this.u(t,`u_img`),1),n.uniform1i(this.u(t,`u_state`),0),n.uniform2f(this.u(t,`u_simRes`),r.w,r.h),n.uniform4f(this.u(t,`u_rectSim`),...e.rect.map(e=>e/d)),n.uniform1f(this.u(t,`u_D`),.11),n.uniform1f(this.u(t,`u_seed`),e.seed),n.uniform1f(this.u(t,`u_scale`),e.knobs.scale*(d/e.dpr)),n.uniform1f(this.u(t,`u_lod`),Math.max(0,e.knobs.lod-1.5)),n.uniform1f(this.u(t,`u_fibre`),e.knobs.fibre),n.uniform1f(this.u(t,`u_inside`),e.inside),n.uniform2f(this.u(t,`u_origin`),...e.origin),n.uniform4f(this.u(t,`u_rect`),...e.rect),n.uniform1f(this.u(t,`u_simScale`),d),n.uniform1f(this.u(t,`u_dpr`),e.dpr),n.uniform1f(this.u(t,`u_nscale`),e.knobs.scale),n.uniform4f(this.u(t,`u_crop`),...e.crop??m);for(let e=0;e<o;e++){let e=r.cur,t=1-e;n.bindFramebuffer(n.FRAMEBUFFER,r.fbo[t]),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,r.tex[e]),this.quad(),r.cur=t}r.steps+=o,n.bindFramebuffer(n.FRAMEBUFFER,null)}return r}draw(e,t,n={}){let r=this.gl,i;t.method===`capillary`&&t.prog>0&&(i=this.stepSim(t,n.maxSimSteps??40)),this.ensureSize(t.w,t.h),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,t.w,t.h),r.disable(r.BLEND),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT);let a=t.method===`capillary`?i?`capDraw`:`front`:t.method,o=this.progs.get(a);return this.bindCommon(o,i?t:{...t,prog:t.method===`capillary`?0:t.prog}),i&&(r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,i.tex[i.cur]),r.uniform1i(this.u(o,`u_state`),1)),this.quad(),e.clearRect(0,0,t.w,t.h),e.drawImage(this.canvas,0,this.canvas.height-t.h,t.w,t.h,0,0,t.w,t.h),i}},_=e=>Math.min(1,Math.max(0,e)),v=e=>1-(1-_(e))**3,y=e=>1-(1-_(e))**2,b=1.4,x=e=>1.6/e,S=(e,t)=>e<=0?0:Math.min(1.25,1-Math.exp(-1.7*e*t)+.05*Math.log1p(e*t));function C(e,t){let n=x(e.fillSpeed);return{inside:e.mode===`color`?1:y(t/n),prog:S(t-(e.mode===`color`||e.couple?Math.max(0,e.rest):Math.max(0,n+e.rest)),e.speed)}}function w(e,t,n,r){if(t==null)return{prog:0,inside:+(e.mode===`color`),hover:0,recede:0,fade:1,dry:0,active:!1};let i=((n??r)-t)/1e3,a=C(e,i);if(n==null)return{...a,hover:i,recede:0,fade:1,dry:0,active:!0};let o=(r-n)/1e3,s=+(e.mode===`color`),c=e=>v(o/e),l={hover:i,recede:0,fade:1,dry:0};switch(e.leave){case`stay`:return{...a,...l,active:!1};case`retract`:{let e=_(o/b);return{...a,...l,recede:e**1.3,active:e<1}}case`fade`:{let e=c(.9);return{...l,prog:a.prog,inside:a.inside+(s-a.inside)*e,fade:1-e,active:e<1}}case`dry`:{let e=c(2.4);return{...l,prog:a.prog,inside:a.inside+(s-a.inside)*c(1.1),dry:e,active:e<1}}}}var T=[{name:`Field notes`,use:`Default: research cards, indexes`,why:`Calm and editorial. A two-second fill from the cursor, a beat to see the whole square in color, then a slower bleed that pulls back cleanly when you leave.`,p:{method:`front`,mode:`mono`,ground:`bone`,leave:`retract`,speed:.8,fillSpeed:.8,rest:.4,couple:!1,knobs:{reach:1,gran:.35,tide:.55,scale:1,lod:4.5,fibre:.6,mute:.65}}},{name:`Hero moment`,use:`One large image, homepage hero`,why:`Slow and big. Reach and softness go up together so a long spread stays a wash instead of streaks; the stain stays when you leave.`,p:{method:`front`,mode:`mono`,ground:`bone`,leave:`stay`,speed:.5,fillSpeed:.6,rest:.6,couple:!1,knobs:{reach:1.6,gran:.4,tide:.6,scale:.8,lod:5.5,fibre:.6,mute:.6}}},{name:`Watercolor`,use:`Feature images, essays`,why:`The most painterly: the capillary simulation with strong fibers and a darker pooled edge. Slower, because the simulation needs time to finger out.`,p:{method:`capillary`,mode:`mono`,ground:`bone`,leave:`dry`,speed:.7,fillSpeed:.7,rest:.3,couple:!1,knobs:{reach:1.3,gran:.5,tide:.8,scale:1,lod:5.5,fibre:.9,mute:.6}}},{name:`Instrument`,use:`Data pages, benchmarks`,why:`Quick and precise. Dither resolves to color, a short tight bleed with fine noise and a faint tide line, retracting cleanly on leave.`,p:{method:`front`,mode:`dither`,ground:`bone`,leave:`retract`,speed:1.4,fillSpeed:1.4,rest:.1,couple:!1,knobs:{reach:.7,gran:.2,tide:.35,scale:1.4,lod:3.5,fibre:.6,mute:.8}}},{name:`Night survey`,use:`Dark sections, A2 moments`,why:`Color as light on ink. A little more reach and softness than on bone, because glow reads smaller on dark; fades out on leave.`,p:{method:`front`,mode:`mono`,ground:`ink-light`,leave:`fade`,speed:.9,fillSpeed:.8,rest:.4,couple:!1,knobs:{reach:1.15,gran:.25,tide:.6,scale:.9,lod:5,fibre:.6,mute:.7}}}],E=n(),D=[{id:`front`,name:`Wet edge`,note:`One ragged front creeps out from every side; vivid edges run furthest.`},{id:`blooms`,name:`Blooms`,note:`Drops land along the edges at different moments and swell.`},{id:`tendrils`,name:`Tendrils`,note:`Color is carried outward along a slow current, like ink in water.`},{id:`capillary`,name:`Capillary`,note:`A simulation: pigment soaks through paper fibers.`}],O=[{id:`mono`,name:`B&W → color → bleed`},{id:`color`,name:`Color → bleed`},{id:`dither`,name:`Dither → color → bleed`}],k=[{id:`bone`,name:`Bone`},{id:`ink-light`,name:`Ink · light`},{id:`ink-stain`,name:`Ink · stain`}],A=[{id:`retract`,name:`Retract`},{id:`dry`,name:`Dry`},{id:`fade`,name:`Fade`},{id:`stay`,name:`Stay`}],j=T[0].p,M=(e,t)=>JSON.stringify(e)===JSON.stringify(t),N=e=>[...e].reduce((e,t)=>(e*31+t.charCodeAt(0))%997,7)/97,P={color:0,mono:1,dither:2},F=new Map;function I(e){if(!F.has(e)){let t=new Image;t.src=e,F.set(e,t.decode().then(()=>t))}return F.get(e)}function L({meta:e,renderer:t,params:n,override:i,register:a,pinnedAt:o,width:s,showCaption:c=!0}){let l=(0,r.useRef)(null),u=(0,r.useRef)({enteredAt:null,leftAt:null,origin:[0,0],sim:void 0}),d=(0,r.useRef)(null),f={...n,...i},p=(0,r.useRef)(f);p.current=f;let m=Math.round(s*e.h/e.w),h=Math.round(Math.sqrt(s*m)*.55),g=Math.min(window.devicePixelRatio||1,2),_=(0,r.useCallback)(n=>{let r=l.current,i=d.current;if(!r||!i)return!1;let a=p.current,c=Math.round((s+2*h)*g),f=Math.round((m+2*h)*g);(r.width!==c||r.height!==f)&&(r.width=c,r.height=f);let _=u.current,v=o??_.enteredAt,y=w({speed:a.speed,fillSpeed:a.fillSpeed,rest:a.rest,couple:a.couple,mode:a.mode,leave:a.leave},v,o==null?_.leftAt:null,n),b=[h*g,h*g,(h+s)*g,(h+m)*g],S=v==null?[c/2,f/2]:_.origin[0]?[_.origin[0]*g,_.origin[1]*g]:[c/2,f/2],C={img:i,w:c,h:f,rect:b,margin:h*g,dpr:g,method:a.method,ground:a.ground,mode:P[a.mode],prog:y.prog,inside:y.inside,fade:y.fade,dry:y.dry,origin:S,time:n/1e3,seed:N(e.slug),knobs:a.knobs,sim:_.sim,hover:y.hover,R:x(a.fillSpeed),speed:a.speed,couple:a.couple,recede:y.recede,rest:a.rest},T=t.draw(r.getContext(`2d`),C,{maxSimSteps:o==null?40:400});_.sim=T;let E=a.method===`capillary`&&y.prog>0&&(T?.steps??0)<Math.round(Math.min(y.prog,1.25)*1500*a.knobs.reach);return o==null?y.active||E:n-o<4500||E},[t,s,m,h,g,e.slug,o]);return(0,r.useEffect)(()=>{let t=!0;return I(e.src).then(e=>{t&&(d.current=e,_(performance.now())&&a({frame:_}))}),()=>{t=!1}},[e.src,_,a,n,i?.method,i?.ground,i?.mode]),(0,r.useEffect)(()=>()=>{t.freeSim(u.current.sim)},[t]),(0,E.jsxs)(`figure`,{className:`bl-tile`,style:{width:s},children:[(0,E.jsx)(`div`,{className:`bl-tile-box`,style:{height:m},onPointerEnter:e=>{if(o!=null)return;let n=l.current.getBoundingClientRect(),r=u.current;r.origin=[e.clientX-n.left,e.clientY-n.top],r.enteredAt=performance.now(),r.leftAt=null,p.current.method===`capillary`&&(t.freeSim(r.sim),r.sim=void 0),a({frame:_})},onPointerLeave:()=>{o??(u.current.leftAt=performance.now(),a({frame:_}))},children:(0,E.jsx)(`canvas`,{ref:l,className:`bl-tile-canvas`,style:{left:-h,top:-h,width:s+2*h,height:m+2*h}})}),c&&(0,E.jsxs)(`figcaption`,{children:[(0,E.jsx)(`span`,{className:`bl-tile-name`,children:e.label}),(0,E.jsx)(`span`,{className:`bl-tile-meta`,children:[e.caption,e.coords].filter(Boolean).join(` · `)}),(0,E.jsx)(`span`,{className:`bl-strip`,"aria-label":`Sampled palette`,children:e.palette.map(e=>(0,E.jsx)(`span`,{style:{background:e.hex,flexGrow:e.share},title:e.hex},e.hex))}),!e.verified&&(0,E.jsx)(`span`,{className:`bl-flag`,children:`License unverified`})]})]})}function R({label:e,value:t,options:n,onChange:r}){return(0,E.jsxs)(`div`,{className:`bl-ctl`,children:[(0,E.jsx)(`span`,{className:`bl-ctl-k`,children:e}),(0,E.jsx)(`div`,{className:`bl-seg`,children:n.map(e=>(0,E.jsx)(`button`,{type:`button`,"aria-pressed":e.id===t,onClick:()=>r(e.id),children:e.name},e.id))})]})}function z({label:e,value:t,min:n,max:r,step:i,onChange:a,unit:o=``}){return(0,E.jsxs)(`label`,{className:`bl-ctl bl-slider`,children:[(0,E.jsxs)(`span`,{className:`bl-ctl-k`,children:[e,` `,(0,E.jsxs)(`b`,{children:[t.toFixed(2),o]})]}),(0,E.jsx)(`input`,{type:`range`,min:n,max:r,step:i,value:t,onChange:e=>a(+e.target.value)})]})}function B(){let e=(0,r.useMemo)(()=>new g,[]),[n,i]=(0,r.useState)(j),[a,o]=(0,r.useState)(`grid`),[s,c]=(0,r.useState)(`all`),[l,u]=(0,r.useState)(null),[d,f]=(0,r.useState)(`sandur`),[p,m]=(0,r.useState)(null),[h,_]=(0,r.useState)(320),v=(0,r.useRef)(new Set),y=(0,r.useCallback)(e=>{v.current.add(e)},[]);(0,r.useEffect)(()=>{let e=0,t=n=>{for(let e of[...v.current])e.frame(n)||v.current.delete(e);e=requestAnimationFrame(t)};return e=requestAnimationFrame(t),()=>cancelAnimationFrame(e)},[]);let b=(e,t)=>i(n=>({...n,[e]:t})),S=(e,t)=>i(n=>({...n,knobs:{...n.knobs,[e]:t}})),C=t.filter(e=>s===`all`||e.family===s),w=n.ground!==`bone`,N=t.find(e=>e.slug===d)??t[0],P=D.find(e=>e.id===n.method);return(0,E.jsxs)(`div`,{className:`bl-lab ${w&&a===`grid`?`is-ink`:``}`,children:[(0,E.jsxs)(`header`,{className:`bl-bar`,children:[(0,E.jsxs)(`div`,{className:`bl-bar-top`,children:[(0,E.jsxs)(`div`,{className:`bl-title`,children:[(0,E.jsx)(`span`,{children:`Lab`}),` Bleed`]}),(0,E.jsx)(R,{label:`View`,value:a,options:[{id:`grid`,name:`Every image`},{id:`matrix`,name:`One image × all methods`}],onChange:o})]}),(0,E.jsxs)(`div`,{className:`bl-bar-row bl-presets`,children:[(0,E.jsx)(`span`,{className:`bl-ctl-k`,children:`Start from`}),T.map(e=>(0,E.jsxs)(`button`,{type:`button`,className:`bl-preset`,"aria-pressed":M(n,e.p),onClick:()=>i(e.p),children:[(0,E.jsx)(`b`,{children:e.name}),(0,E.jsx)(`span`,{children:e.use})]},e.name))]}),(()=>{let e=T.find(e=>M(n,e.p));return(0,E.jsx)(`p`,{className:`bl-why`,children:e?e.why:`Custom settings. Pick a preset to return to a coordinated starting point.`})})(),(0,E.jsxs)(`div`,{className:`bl-bar-row`,children:[a===`grid`&&(0,E.jsx)(R,{label:`Method`,value:n.method,options:D,onChange:e=>b(`method`,e)}),(0,E.jsx)(R,{label:`At rest`,value:n.mode,options:O,onChange:e=>b(`mode`,e)}),a===`grid`&&(0,E.jsx)(R,{label:`Ground`,value:n.ground,options:k,onChange:e=>b(`ground`,e)}),(0,E.jsx)(R,{label:`On leave`,value:n.leave,options:A,onChange:e=>b(`leave`,e)}),(0,E.jsx)(R,{label:`Bleed starts`,value:n.couple?`touch`:`after`,options:[{id:`after`,name:`After fill`},{id:`touch`,name:`Where color touches`}],onChange:e=>b(`couple`,e===`touch`)})]}),(0,E.jsxs)(`div`,{className:`bl-bar-row bl-timing`,children:[(0,E.jsx)(`span`,{className:`bl-ctl-k bl-timing-k`,children:`Timing`}),(0,E.jsx)(z,{label:`Fill speed`,value:n.fillSpeed,min:.25,max:3,step:.05,onChange:e=>b(`fillSpeed`,e)}),(0,E.jsx)(z,{label:`Rest before bleed`,unit:`s`,value:n.rest,min:-1,max:2.5,step:.05,onChange:e=>b(`rest`,e)}),(0,E.jsx)(z,{label:`Bleed speed`,value:n.speed,min:.2,max:2.5,step:.05,onChange:e=>b(`speed`,e)}),(0,E.jsxs)(`span`,{className:`bl-ctl-k`,children:[`Fill `,x(n.fillSpeed).toFixed(1),`s · rest `,n.rest.toFixed(1),`s · then bleed`]})]}),(0,E.jsxs)(`details`,{className:`bl-fine`,children:[(0,E.jsx)(`summary`,{children:`Fine-tune: sliders and how they work together`}),(0,E.jsxs)(`div`,{className:`bl-bar-row`,children:[(0,E.jsx)(z,{label:`Reach`,value:n.knobs.reach,min:.3,max:2,step:.05,onChange:e=>S(`reach`,e)}),(0,E.jsx)(z,{label:`Grain`,value:n.knobs.gran,min:0,max:.9,step:.05,onChange:e=>S(`gran`,e)}),(0,E.jsx)(z,{label:`Tide line`,value:n.knobs.tide,min:0,max:1,step:.05,onChange:e=>S(`tide`,e)}),(0,E.jsx)(z,{label:`Noise scale`,value:n.knobs.scale,min:.4,max:2.5,step:.05,onChange:e=>S(`scale`,e)}),(0,E.jsx)(z,{label:`Softness`,value:n.knobs.lod,min:1,max:7,step:.25,onChange:e=>S(`lod`,e)}),(0,E.jsx)(z,{label:`Gray restraint`,value:n.knobs.mute,min:0,max:1,step:.05,onChange:e=>S(`mute`,e)}),n.method===`capillary`&&(0,E.jsx)(z,{label:`Fibers`,value:n.knobs.fibre,min:0,max:1.5,step:.05,onChange:e=>S(`fibre`,e)}),(0,E.jsx)(`button`,{type:`button`,className:`bl-btn`,onClick:()=>i(j),children:`Reset`})]}),(0,E.jsxs)(`details`,{className:`bl-guide`,children:[(0,E.jsx)(`summary`,{children:`How the sliders work together`}),(0,E.jsxs)(`ul`,{children:[(0,E.jsxs)(`li`,{children:[(0,E.jsx)(`b`,{children:`Fill speed → Rest → Bleed speed.`}),` Three beats. A fill around 0.8 (about two seconds), a rest of 0.3 to 0.6 s so you see the whole square in color, then a bleed slower than the fill (0.6 to 0.9) so the escape feels like a second, calmer gesture. A negative rest overlaps the two.`]}),(0,E.jsxs)(`li`,{children:[(0,E.jsx)(`b`,{children:`Reach × Softness.`}),` They move together. Long reach with low softness drags streaks out of the edge; add about 1 softness for every +0.3 reach.`]}),(0,E.jsxs)(`li`,{children:[(0,E.jsx)(`b`,{children:`Noise scale × Tide line.`}),` Small noise scale gives big, lazy lobes; large gives a fine, ragged edge. Fine edges want a lighter tide line (0.3 to 0.4) or the edge looks outlined. Lobes can carry 0.6 to 0.8.`]}),(0,E.jsxs)(`li`,{children:[(0,E.jsx)(`b`,{children:`Grain.`}),` Paper texture inside the wash. 0.3 to 0.5 on bone; lower (about 0.25) on ink, where grain reads as noise.`]}),(0,E.jsxs)(`li`,{children:[(0,E.jsx)(`b`,{children:`Gray restraint.`}),` How much gray and black pigment holds back. 0.6 to 0.8 keeps textures from bleeding soot.`]}),(0,E.jsxs)(`li`,{children:[(0,E.jsx)(`b`,{children:`On ink.`}),` Glow reads smaller than pigment, so add about 0.15 reach and 0.5 softness compared with bone.`]})]})]})]}),(0,E.jsx)(`div`,{className:`bl-bar-row bl-bar-note`,children:a===`grid`?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(`span`,{children:[P.name,`: `,P.note,` Hover any image.`]}),(0,E.jsx)(R,{label:`Images`,value:s,options:[{id:`all`,name:`All ${t.length}`},{id:`above`,name:`Above`},{id:`ground`,name:`Ground`}],onChange:c}),(0,E.jsx)(`button`,{type:`button`,className:`bl-btn`,onClick:()=>u(l==null?performance.now()-8e3:null),children:l==null?`Bleed all at once`:`Back to hover`})]}):(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(`label`,{className:`bl-ctl`,children:[(0,E.jsx)(`span`,{className:`bl-ctl-k`,children:`Image`}),(0,E.jsx)(`select`,{value:d,onChange:e=>f(e.target.value),children:t.map(e=>(0,E.jsx)(`option`,{value:e.slug,children:e.label},e.slug))})]}),(0,E.jsx)(`button`,{type:`button`,className:`bl-btn bl-btn-solid`,onClick:()=>m(performance.now()),children:`Play all twelve`}),(0,E.jsx)(`button`,{type:`button`,className:`bl-btn`,onClick:()=>m(null),children:`Reset`}),(0,E.jsx)(`span`,{children:`Or hover any single cell.`})]})})]}),(0,E.jsx)(`nav`,{className:`bl-dock`,"aria-label":`Presets`,children:T.map(e=>(0,E.jsx)(`button`,{type:`button`,"aria-pressed":M(n,e.p),onClick:()=>i(e.p),children:e.name},e.name))}),a===`grid`?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`div`,{className:`bl-size`,children:(0,E.jsx)(z,{label:`Tile width`,value:h,min:200,max:560,step:10,onChange:_})}),(0,E.jsx)(`main`,{className:`bl-grid`,children:C.map(t=>(0,E.jsx)(L,{meta:t,renderer:e,params:n,register:y,pinnedAt:l,width:h},t.slug))},`${l}`)]}):(0,E.jsxs)(`main`,{className:`bl-matrix`,children:[(0,E.jsxs)(`div`,{className:`bl-mx-head`,children:[(0,E.jsx)(`span`,{}),k.map(e=>(0,E.jsx)(`span`,{children:e.name},e.id))]}),D.map(t=>(0,E.jsxs)(`div`,{className:`bl-mx-row`,children:[(0,E.jsxs)(`div`,{className:`bl-mx-label`,children:[(0,E.jsx)(`b`,{children:t.name}),(0,E.jsx)(`span`,{children:t.note})]}),k.map(r=>(0,E.jsx)(`div`,{className:`bl-mx-cell ${r.id===`bone`?``:`is-ink`}`,children:(0,E.jsx)(L,{meta:N,renderer:e,params:n,override:{method:t.id,ground:r.id},register:y,pinnedAt:p,width:190,showCaption:!1},`${N.slug}-${p}`)},r.id))]},t.id))]})]})}export{B as default};