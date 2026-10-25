//#region src/webflow/base.ts
var e = globalThis;
e.__P26B = new URL(
	/* @vite-ignore */
	"../",
	import.meta.url
).href, document.documentElement.dataset.dm || (document.documentElement.dataset.dm = "bw");
var t = e.__P26B, n = {
	coding: {
		aspect: 1.5,
		focal: [.5, .4]
	},
	"computer-use": {
		aspect: 1.3333333333333333,
		focal: [.5, .436]
	},
	"knowledge-work": {
		aspect: 1.5,
		focal: [.5, .26]
	},
	alignment: {
		aspect: 1.5,
		focal: [.5, .648]
	},
	science: {
		aspect: 1.5,
		focal: [.5, .2]
	}
}, r = matchMedia("(hover: none) and (pointer: coarse)").matches, i = null;
function a() {
	return r ? (i || (i = document.createElement("div"), i.style.cssText = "position:fixed;left:0;top:0;width:0;height:100lvh;visibility:hidden;pointer-events:none", document.documentElement.append(i)), Math.max(innerHeight, i.offsetHeight || 0)) : innerHeight;
}
function o(e) {
	let t = innerWidth, n = a();
	addEventListener("resize", () => {
		let i = innerWidth, o = a();
		r && i === t && o === n || (t = i, n = o, e());
	});
}
function s(e = a()) {
	return r ? Math.round(e * .3) : 120;
}
function c(e, t = 0) {
	let n = Math.round(scrollY) - e;
	return t ? Math.min(n, Math.floor(document.body.offsetHeight - t)) : n;
}
function l(e, t) {
	return e <= 760 && !(e > t && t <= 500) || e > 760 && e <= 1100 && t >= e * 1.2;
}
function u(e, t) {
	let n = e <= 760 ? 16 : 48, r = e <= 760 ? 240 : 280;
	return Math.max(0, Math.min(t, Math.round(e * .625), e - 2 * n - r));
}
var d = "(max-width: 760px) and (max-height: 340px) and (orientation: landscape)", f = .5, p = "(min-width: 761px) and (max-width: 1100px) and (max-aspect-ratio: 5/6)";
function m(e) {
	let t = e?.closest(".ln-hero"), n = t?.querySelector(".ln-lede");
	if (!e || !t || !n) return;
	let r = document.createRange(), i = matchMedia(p), a = () => {
		if (t.classList.remove("is-stacked", "is-side"), innerWidth <= 760 || i.matches) return;
		let a = getComputedStyle(t).gridTemplateColumns.trim().split(/\s+/).length < 2;
		t.classList.add("is-side"), e.style.removeProperty("--hk");
		let o = getComputedStyle(e), s = parseFloat(o.getPropertyValue("--hk"));
		r.selectNodeContents(e);
		let c = r.getBoundingClientRect().width / parseFloat(o.fontSize);
		c > 0 && Math.abs(c - s) > s * .002 && e.style.setProperty("--hk", c.toFixed(4));
		let l = e.getBoundingClientRect().top - n.getBoundingClientRect().top;
		t.classList.remove("is-side"), l > 0 !== a && Math.abs(l) > f && t.classList.add(l > 0 ? "is-stacked" : "is-side");
	};
	o(a), document.fonts?.ready.then(a), a();
}
//#endregion
//#region src/home/hero/strokes.worker.ts?worker&inline
var h = "function e(e){let t=new Int32Array(e,0,3),n=t[0],r=t[2],i=new Int32Array(e,12,n*2),a=new Int16Array(e,12+n*8),o=a.length/2,s={n,level:new Int32Array(n),start:new Int32Array(n),count:new Int32Array(n),x:new Float32Array(o),y:new Float32Array(o),cum:new Float32Array(o),len:new Float32Array(n),box:new Float32Array(n*4),d:new Float32Array(n),c0:new Float32Array(n)},c=0;for(let e=0;e<n;e++){s.level[e]=i[e*2],s.count[e]=i[e*2+1],s.start[e]=c;let t=0,n=1e9,o=1e9,l=-1e9,u=-1e9;for(let i=0;i<s.count[e];i++){let e=c+i,d=a[e*2]/r,f=a[e*2+1]/r;s.x[e]=d,s.y[e]=f,i>0&&(t+=Math.hypot(d-s.x[e-1],f-s.y[e-1])),s.cum[e]=t,n=Math.min(n,d),o=Math.min(o,f),l=Math.max(l,d),u=Math.max(u,f)}s.len[e]=t,s.box.set([n,o,l,u],e*4),c+=s.count[e]}return s}function t(e,t,n,r){let i=0xde0b6b3a7640000,a=n,o=r;for(let s=0;s<e.count[t];s++){let c=e.start[t]+s,l=(e.x[c]-n)**2+(e.y[c]-r)**2;l<i&&(i=l,a=e.x[c],o=e.y[c])}return[a,o]}function n(e,t,n){for(let r=0;r<e.n;r++){let i=0xde0b6b3a7640000,a=0;for(let o=0;o<e.count[r];o++){let s=e.start[r]+o,c=(e.x[s]-t)**2+(e.y[s]-n)**2;c<i&&(i=c,a=e.cum[s])}e.d[r]=Math.sqrt(i),e.c0[r]=a}}function r(e,t){let n=0,r=0;for(let t=0;t<e.n;t++)n+=e.count[t],r+=Math.max(0,e.count[t]-1);let i=new Float32Array(n*2*10),a=new Uint32Array(r*6),o=0,s=0;for(let n=0;n<e.n;n++){let r=e.start[n],c=e.count[n],l=n===t?2:+(e.level[n]===2);for(let t=0;t<c;t++){let u=r+t,d=t>0?u-1:u,f=t<c-1?u+1:u,p=e.x[u]-e.x[d],m=e.y[u]-e.y[d],h=e.x[f]-e.x[u],g=e.y[f]-e.y[u],_=Math.hypot(p,m),v=Math.hypot(h,g);_<1e-6&&(p=h,m=g,_=v),v<1e-6&&(h=p,g=m,v=_),_<1e-6&&(p=h=1,m=g=0,_=v=1),p/=_,m/=_,h/=v,g/=v;let y=p+h,b=m+g,x=Math.hypot(y,b);x<1e-6?(y=h,b=g):(y/=x,b/=x);let S=-b,C=y,w=Math.min(2,1/Math.max(.5,S*-m+C*p));S*=w,C*=w;for(let t=-1;t<=1;t+=2)i[o]=e.x[u],i[o+1]=e.y[u],i[o+2]=S,i[o+3]=C,i[o+4]=e.cum[u],i[o+5]=e.c0[n],i[o+6]=e.d[n],i[o+7]=e.len[n],i[o+8]=l,i[o+9]=t,o+=10;if(t<c-1){let e=u*2;a[s]=e,a[s+1]=e+1,a[s+2]=e+2,a[s+3]=e+1,a[s+4]=e+3,a[s+5]=e+2,s+=6}}}return{V:i,I:a}}function i(i,a,o){let s=e(i),[c,l]=t(s,a.stroke,a.x,a.y);return n(s,c,l),o?{s,hx:c,hy:l,...r(s,a.stroke)}:{s,hx:c,hy:l}}self.onmessage=async e=>{try{let t=i(await(await fetch(e.data.url)).arrayBuffer(),e.data.hero,e.data.ribbon),n=Object.values(t.s).filter(e=>ArrayBuffer.isView(e)).map(e=>e.buffer);t.V&&t.I&&n.push(t.V.buffer,t.I.buffer),self.postMessage({ok:!0,r:t},n)}catch(e){self.postMessage({ok:!1,error:String(e)})}};", g = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", h], { type: "text/javascript;charset=utf-8" });
function _(e) {
	let t;
	try {
		if (t = g && (self.URL || self.webkitURL).createObjectURL(g), !t) throw "";
		let n = new Worker(t, {
			type: "module",
			name: e?.name
		});
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(h), {
			type: "module",
			name: e?.name
		});
	}
}
//#endregion
//#region src/home/shared/diag.ts
var v = typeof location < "u" && new URLSearchParams(location.search).has("diag"), y = null, b = null, x = [];
function S() {
	if (y || !document.body) return y;
	y = document.createElement("div"), y.setAttribute("aria-hidden", "true"), y.style.cssText = "position:fixed;right:8px;top:8px;z-index:9999;max-width:min(320px,calc(100vw - 16px));max-height:30vh;overflow:hidden;padding:6px 8px;border-radius:6px;background:rgba(29,29,21,.86);color:#f4f1e8;font:10.5px/1.35 ui-monospace,Menlo,monospace;pointer-events:none;white-space:pre-wrap", b = document.createElement("div"), y.append(b), document.body.append(y);
	let e = () => {
		b && (b.textContent = `live WebGL contexts: ${window.__glLive?.() ?? "?"}`), setTimeout(e, 500);
	};
	return e(), y;
}
function C(e, t = !1) {
	if (!v) return;
	let n = (performance.now() / 1e3).toFixed(1);
	x.push(`${n}s ${t ? "! " : ""}${e}`);
	let r = S();
	if (!r) return;
	let i = document.createElement("div");
	for (i.textContent = x[x.length - 1], t && (i.style.color = "#ff8a7a"), b.after(i); r.childNodes.length > 16;) r.lastChild.remove();
}
v && (addEventListener("error", (e) => C(`${e.message}${e.filename ? ` (${e.filename.split("/").pop()}:${e.lineno})` : ""}`, !0)), addEventListener("unhandledrejection", (e) => C(`rejection: ${(e.reason && (e.reason.message || e.reason)) ?? "?"}`, !0)), document.readyState === "loading" ? addEventListener("DOMContentLoaded", () => {
	S(), C("diag on");
}) : (S(), C("diag on")));
//#endregion
//#region src/home/shared/gl.ts
var w = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap(), E = (e, t) => e + "\0" + t;
function D(e, t, n) {
	let r = E(t, n), i = T.get(e);
	i || T.set(e, i = /* @__PURE__ */ new Map()), i.set(r, [t, n]);
	let a = w.get(e)?.get(r);
	if (a && !e.isContextLost()) return w.get(e).delete(r), a;
	let o = (t, n) => {
		let r = e.createShader(t);
		return e.shaderSource(r, n), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) ? r : null;
	}, s = o(e.VERTEX_SHADER, t), c = o(e.FRAGMENT_SHADER, n);
	if (!s || !c) return null;
	let l = e.createProgram();
	return e.attachShader(l, s), e.attachShader(l, c), e.linkProgram(l), e.getProgramParameter(l, e.LINK_STATUS) ? l : null;
}
var O = (e) => {
	let t = window.requestIdleCallback;
	t ? t(e, { timeout: 400 }) : setTimeout(e, 40);
}, k = [], A = !1, j = (e) => {
	if (k.push(e), A) return;
	A = !0;
	let t = () => {
		let e = k.shift();
		if (!e) {
			A = !1;
			return;
		}
		O(() => {
			e(), requestAnimationFrame(t);
		});
	};
	t();
};
function M(e, t) {
	let n = t ?? [...T.get(e)?.values() ?? []], r = w.get(e);
	r || w.set(e, r = /* @__PURE__ */ new Map());
	let i = r, a = e.getExtension("KHR_parallel_shader_compile"), o = ([t, n]) => {
		let r = e.createProgram(), i = e.createShader(e.VERTEX_SHADER), a = e.createShader(e.FRAGMENT_SHADER);
		return !r || !i || !a ? null : (e.shaderSource(i, t), e.compileShader(i), e.shaderSource(a, n), e.compileShader(a), e.attachShader(r, i), e.attachShader(r, a), e.linkProgram(r), r);
	}, s = (t, n) => {
		n && !e.isContextLost() && e.getProgramParameter(n, e.LINK_STATUS) && i.set(t, n);
	};
	if (a) {
		let t = n.map((e) => [E(...e), o(e)]);
		return new Promise((n) => {
			let r = () => {
				if (e.isContextLost()) {
					n();
					return;
				}
				t.every(([, t]) => !t || e.getProgramParameter(t, a.COMPLETION_STATUS_KHR)) ? (t.forEach(([e, t]) => s(e, t)), n()) : requestAnimationFrame(r);
			};
			requestAnimationFrame(r);
		});
	}
	return n.reduce((t, n) => t.then(() => new Promise((t) => O(() => {
		e.isContextLost() || s(E(...n), o(n)), t();
	}))), Promise.resolve());
}
function N(e, t, n = "p") {
	let r = e.createBuffer();
	e.bindBuffer(e.ARRAY_BUFFER, r), e.bufferData(e.ARRAY_BUFFER, new Float32Array([
		-1,
		-1,
		1,
		-1,
		-1,
		1,
		1,
		1
	]), e.STATIC_DRAW);
	let i = e.getAttribLocation(t, n);
	e.enableVertexAttribArray(i), e.vertexAttribPointer(i, 2, e.FLOAT, !1, 0, 0);
}
var P = 0, F = .3, I = [], L = /* @__PURE__ */ new WeakSet(), R = (e) => !!e && !e.isContextLost() && !L.has(e);
window.__glLive = () => I.filter((e) => e.canvas.isConnected && !e.gl.isContextLost()).length;
var z = [], B = 0, ee = () => {
	B = 0;
	for (let e of z) e();
}, V = () => {
	B || (B = requestAnimationFrame(ee));
}, te = 0;
addEventListener("scroll", () => {
	te = performance.now(), z.length && V();
}, { passive: !0 }), addEventListener("resize", V);
function H(e, t, n, r, i) {
	let a = t.getExtension("WEBGL_lose_context");
	I.push({
		name: n.name,
		gl: t,
		canvas: e
	});
	let o = !1, s = !1, c = !0, l = !1, u = 0;
	e.addEventListener("webglcontextlost", (e) => {
		e.preventDefault(), o = !0, L.add(t), s && c && setTimeout(() => {
			c && t.isContextLost() && a?.restoreContext();
		}), u++, w.delete(t), s || (l = !0, C(`${n.name}: context lost`, !0));
	});
	let d = () => {
		let e = n.near;
		if (!e) return !0;
		if (typeof e == "function") return e(0);
		let t = e.getBoundingClientRect();
		return t.bottom > 0 && t.top < innerHeight;
	};
	if (e.addEventListener("webglcontextrestored", () => {
		if (!c) {
			s = !0, o = !1, L.add(t), a?.loseContext();
			return;
		}
		s = !1;
		let e = ++u, f = () => {
			var a;
			if (e !== u || t.isContextLost()) return;
			L.delete(t);
			let o = performance.now();
			try {
				r(), i();
			} catch (e) {
				C(`${n.name}: restore failed: ${e.message}`, !0);
			}
			let s = performance.now() - o;
			((a = window).__glRestore ?? (a.__glRestore = [])).push([n.name, Math.round(s)]), s > 16 && C(`${n.name}: rebuild took ${Math.round(s)} ms`, !0), l && (l = !1, C(`${n.name}: restored`));
		};
		d() ? f() : M(t).then(() => j(f));
	}), !n.near || !a) return;
	let f = n.near, p = n.margin ?? 1, m = !1, h = () => {
		if (c) {
			m = !1;
			return;
		}
		if (performance.now() - te < 150) {
			O(h);
			return;
		}
		m = !1, t.isContextLost() || (s = !0, o = !1, L.add(t), a.loseContext());
	}, g = (e, n) => {
		(c ? !n : e) && (c = !c, c ? s && t.isContextLost() && o && a.restoreContext() : m || (m = !0, O(h)));
	};
	if (typeof f != "function" && "IntersectionObserver" in window) {
		let e = !0, t = !0, n = (n, r) => new IntersectionObserver((n) => {
			r(n[n.length - 1].isIntersecting), g(e, t);
		}, { rootMargin: `${Math.round((p + n) * 100)}% 0px` }).observe(f);
		n(P, (t) => {
			e = t;
		}), n(F, (e) => {
			t = e;
		});
		return;
	}
	let _ = (e) => {
		if (typeof f == "function") return f(p + e);
		let t = f.getBoundingClientRect(), n = innerHeight;
		return t.bottom > -n * (p + e) && t.top < n * (1 + p + e);
	};
	z.push(() => g(_(P), _(F))), requestAnimationFrame(V);
}
//#endregion
//#region src/home/hero/strokes.ts
function ne(e) {
	let t = new Int32Array(e, 0, 3), n = t[0], r = t[2], i = new Int32Array(e, 12, n * 2), a = new Int16Array(e, 12 + n * 8), o = a.length / 2, s = {
		n,
		level: new Int32Array(n),
		start: new Int32Array(n),
		count: new Int32Array(n),
		x: new Float32Array(o),
		y: new Float32Array(o),
		cum: new Float32Array(o),
		len: new Float32Array(n),
		box: new Float32Array(n * 4),
		d: new Float32Array(n),
		c0: new Float32Array(n)
	}, c = 0;
	for (let e = 0; e < n; e++) {
		s.level[e] = i[e * 2], s.count[e] = i[e * 2 + 1], s.start[e] = c;
		let t = 0, n = 1e9, o = 1e9, l = -1e9, u = -1e9;
		for (let i = 0; i < s.count[e]; i++) {
			let e = c + i, d = a[e * 2] / r, f = a[e * 2 + 1] / r;
			s.x[e] = d, s.y[e] = f, i > 0 && (t += Math.hypot(d - s.x[e - 1], f - s.y[e - 1])), s.cum[e] = t, n = Math.min(n, d), o = Math.min(o, f), l = Math.max(l, d), u = Math.max(u, f);
		}
		s.len[e] = t, s.box.set([
			n,
			o,
			l,
			u
		], e * 4), c += s.count[e];
	}
	return s;
}
function U(e, t, n, r) {
	let i = 0xde0b6b3a7640000, a = n, o = r;
	for (let s = 0; s < e.count[t]; s++) {
		let c = e.start[t] + s, l = (e.x[c] - n) ** 2 + (e.y[c] - r) ** 2;
		l < i && (i = l, a = e.x[c], o = e.y[c]);
	}
	return [a, o];
}
function W(e, t, n) {
	for (let r = 0; r < e.n; r++) {
		let i = 0xde0b6b3a7640000, a = 0;
		for (let o = 0; o < e.count[r]; o++) {
			let s = e.start[r] + o, c = (e.x[s] - t) ** 2 + (e.y[s] - n) ** 2;
			c < i && (i = c, a = e.cum[s]);
		}
		e.d[r] = Math.sqrt(i), e.c0[r] = a;
	}
}
function G(e, t) {
	let n = 0, r = 0;
	for (let t = 0; t < e.n; t++) n += e.count[t], r += Math.max(0, e.count[t] - 1);
	let i = new Float32Array(n * 2 * 10), a = new Uint32Array(r * 6), o = 0, s = 0;
	for (let n = 0; n < e.n; n++) {
		let r = e.start[n], c = e.count[n], l = n === t ? 2 : +(e.level[n] === 2);
		for (let t = 0; t < c; t++) {
			let u = r + t, d = t > 0 ? u - 1 : u, f = t < c - 1 ? u + 1 : u, p = e.x[u] - e.x[d], m = e.y[u] - e.y[d], h = e.x[f] - e.x[u], g = e.y[f] - e.y[u], _ = Math.hypot(p, m), v = Math.hypot(h, g);
			_ < 1e-6 && (p = h, m = g, _ = v), v < 1e-6 && (h = p, g = m, v = _), _ < 1e-6 && (p = h = 1, m = g = 0, _ = v = 1), p /= _, m /= _, h /= v, g /= v;
			let y = p + h, b = m + g, x = Math.hypot(y, b);
			x < 1e-6 ? (y = h, b = g) : (y /= x, b /= x);
			let S = -b, C = y, w = Math.min(2, 1 / Math.max(.5, S * -m + C * p));
			S *= w, C *= w;
			for (let t = -1; t <= 1; t += 2) i[o] = e.x[u], i[o + 1] = e.y[u], i[o + 2] = S, i[o + 3] = C, i[o + 4] = e.cum[u], i[o + 5] = e.c0[n], i[o + 6] = e.d[n], i[o + 7] = e.len[n], i[o + 8] = l, i[o + 9] = t, o += 10;
			if (t < c - 1) {
				let e = u * 2;
				a[s] = e, a[s + 1] = e + 1, a[s + 2] = e + 2, a[s + 3] = e + 1, a[s + 4] = e + 3, a[s + 5] = e + 2, s += 6;
			}
		}
	}
	return {
		V: i,
		I: a
	};
}
function K(e, t, n) {
	let r = ne(e), [i, a] = U(r, t.stroke, t.x, t.y);
	return W(r, i, a), n ? {
		s: r,
		hx: i,
		hy: a,
		...G(r, t.stroke)
	} : {
		s: r,
		hx: i,
		hy: a
	};
}
//#endregion
//#region src/home/hero/lines-gl.ts
var re = "#version 300 es\nin vec2 p; in vec2 nrm; in float cum; in vec4 st; in float side;\nuniform vec2 cc, oo, view; uniform float z, R, finish, halfView, intro, grow, heroBoost;\nuniform vec3 simple; // ?mline=simple: width multiplier, minimum width (device px), how much of the minor levels shows\nout float vSide; out float vS; out float vW; out float vA;\nvoid main() {\n  float kind = st.w;\n  float a = max(0., R - st.y) * 1.5;\n  if (kind > 1.5) a = max(a, halfView * 1.4) * (0.02 + 0.98 * intro);\n  a = max(a, st.z * finish);\n  vS = abs(cum - st.x) - a;\n  float base = kind < 0.5 ? 0.62 : (kind < 1.5 ? 1.0 : 1.2 * heroBoost);\n  float w = max(base * grow * simple.x, simple.y);     // the line's width in device px\n  float hw = 0.5 * w + 1.0;             // half width plus a pixel for antialiasing\n  vec2 s = oo + (p - cc) * z + nrm * side * hw;\n  vSide = side * hw; vW = w; vA = kind < 0.5 ? 0.8 * simple.z : 0.93;\n  if (kind < 0.5 && simple.z <= 0.) { gl_Position = vec4(2., 2., 2., 1.); return; } // minor levels left out\n  gl_Position = vec4(s.x / view.x * 2. - 1., 1. - s.y / view.y * 2., 0., 1.);\n}", ie = "#version 300 es\nprecision highp float;\nin float vSide; in float vS; in float vW; in float vA;\nuniform float grain;\nout vec4 o;\nfloat hash(vec2 q) { return fract(sin(dot(q, vec2(12.9898, 78.233))) * 43758.5453); }\nvoid main() {\n  if (vS > 0.) discard;\n  float cov = clamp(0.5 * vW + 0.5 - abs(vSide), 0., 1.);\n  cov *= min(vW, 1.);                   // hairlines thinner than a pixel get lighter, not jagged\n  // a dry pen: in patches, a few pixels inside a wide line catch less ink\n  vec2 q = gl_FragCoord.xy / 9.; vec2 f = fract(q); f = f * f * (3. - 2. * f); vec2 c = floor(q);\n  float pt = mix(mix(hash(c), hash(c + vec2(1., 0.)), f.x), mix(hash(c + vec2(0., 1.)), hash(c + vec2(1., 1.)), f.x), f.y);\n  float h = hash(floor(gl_FragCoord.xy));\n  cov *= 1. - grain * smoothstep(.55, .9, pt) * step(.6, h);\n  float al = cov * vA;\n  o = vec4(vec3(29., 29., 21.) / 255. * al, al);\n}";
function ae(e, t, n, r, i) {
	let a = e.getContext("webgl2", {
		premultipliedAlpha: !0,
		alpha: !0,
		antialias: !1
	});
	if (!a) return null;
	let { V: o, I: s } = i ?? G(t, n), c = s.length, l = null, u = null, d = null, f = {}, p = () => {
		let e = D(a, re, ie);
		if (!e) return !1;
		a.useProgram(e), d = a.createVertexArray(), a.bindVertexArray(d), l = a.createBuffer(), a.bindBuffer(a.ARRAY_BUFFER, l), a.bufferData(a.ARRAY_BUFFER, o, a.STATIC_DRAW), u = a.createBuffer(), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, u), a.bufferData(a.ELEMENT_ARRAY_BUFFER, s, a.STATIC_DRAW);
		let t = (t, n, r) => {
			let i = a.getAttribLocation(e, t);
			i < 0 || (a.enableVertexAttribArray(i), a.vertexAttribPointer(i, n, a.FLOAT, !1, 40, r * 4));
		};
		return t("p", 2, 0), t("nrm", 2, 2), t("cum", 1, 4), t("st", 4, 5), t("side", 1, 9), f = Object.fromEntries([
			"cc",
			"oo",
			"view",
			"z",
			"R",
			"finish",
			"halfView",
			"intro",
			"grow",
			"heroBoost",
			"grain",
			"simple"
		].map((t) => [t, a.getUniformLocation(e, t)])), a.enable(a.BLEND), a.blendEquation(a.MAX), a.blendFunc(a.ONE, a.ONE), !0;
	};
	if (!p()) return null;
	let m = {
		onRestore: () => {},
		data(e) {
			o = e.V, s = e.I, c = s.length, R(a) && d && (a.bindVertexArray(d), a.bindBuffer(a.ARRAY_BUFFER, l), a.bufferData(a.ARRAY_BUFFER, o, a.STATIC_DRAW), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, u), a.bufferData(a.ELEMENT_ARRAY_BUFFER, s, a.STATIC_DRAW));
		},
		draw(t) {
			if (!R(a)) return !1;
			let n = e.width, r = e.height;
			a.viewport(0, 0, n, r), a.disable(a.SCISSOR_TEST), a.clearColor(0, 0, 0, 0), a.clear(a.COLOR_BUFFER_BIT);
			let [i, o, s, l] = t.clip;
			return a.enable(a.SCISSOR_TEST), a.scissor(Math.round(i), Math.round(r - o - l), Math.max(0, Math.round(s)), Math.max(0, Math.round(l))), a.uniform2f(f.cc, t.cx, t.cy), a.uniform2f(f.oo, t.ox, t.oy), a.uniform2f(f.view, n, r), a.uniform1f(f.z, t.z), a.uniform1f(f.R, t.R), a.uniform1f(f.finish, t.finish), a.uniform1f(f.halfView, t.halfView), a.uniform3f(f.simple, ...t.simple ?? [
				1,
				.35,
				1
			]), a.uniform1f(f.intro, t.intro), a.uniform1f(f.grow, t.grow), a.uniform1f(f.heroBoost, t.heroBoost), a.uniform1f(f.grain, Math.min(.45, .1 * t.grow)), a.bindVertexArray(d), a.drawElements(a.TRIANGLES, c, a.UNSIGNED_INT, 0), !0;
		}
	};
	return H(e, a, r, p, () => m.onRestore()), m;
}
//#endregion
//#region src/home/hero/opening-stroke.ts
var q = "AQAAANAHAAAQAAAABQAAAHwNAAA7AIULVABtC2oAWgt2AFELhABKC5IARQuvAD0LDgEyCz0BKQtqARsLpgEEC8MB+ArPAfEK2gHpCuIB4QrmAdgK5gHOCuIBxQrbAbsKvAGeCrIBkwqqAYcKowF6Cp4BbAqbAV4KmQFPCpkBQQqbATMKoAEmCqcBGgqwARAKuwEGCscB/gnUAfcJ4gHxCfAB7Qn/AesJDgLrCR0C7Qk7AvMJiQIFCqgCCgq4AgsKyAILCugCCgoHAwcKJgMCCjUD/wlEA/oJUQP0CV8D7AmFA9IJoAPBCdkDpAn1A5cJBASRCRMEjQkiBIoJMQSJCUAEiglPBI0JXQSRCWwElgl6BJ0JlASuCccE0wnhBOUJ7gTrCfwE8AkKBfMJGQX0CScF8gk3BfAJZAXkCYIF2gmPBdQJmwXNCaYFxAmuBbkJtQWsCb8FkAnGBXEJyAViCckFQgnJBRQJygUFCcwF9gjQBecI4AW7COkFnQjuBX8I8wVQCPcFQgj8BTQIAgYnCAoGGggUBg4IPQbgB0UG1AdMBscHUQa7B1MGrQdYBnIHXQZSB2UGNAdwBhYHhQbsBrkGiQbJBm0G2gZSBu0GOgYEByMGZQfRBXoHvQWBB7IFhgeoBYcHnwWDB5UFfAeMBXMHggVoB3kFTgdnBTMHWQUkB1MFFgdPBQcHTAX4BksF6gZMBdsGTwXOBlQFwAZbBYwGfgVxBo4FVQaaBRsGqwX+BbcF4wXHBZ8F8QWDBQEGZgUNBioFHwYOBSoG8wQ6Bs0EVQbABF0GsgRjBqUEZwaXBGkGigRnBn0EYwZyBF0GaARTBmAESAZZBDwGVQQvBlIEIgZTBBUGVgQIBlwE/QVlBPEFbwTmBcwEjwXiBHkF7ARtBfQEYQX6BFUF/QRKBf0EPwX5BDUF8QQsBecEJAXaBB4FvgQSBXME9QRWBOsEOATiBCoE3wQbBN8EDgThBAAE5QTzA+sE2QP5BM0D/gTAAwIFtQMCBawD/wSlA/gEoAPuBJ4D4gSfA9UEogPIBLIDjgS2A4EEvAN2BMQDbQTMA2cE1gNlBN8DZwToA20EAgSHBAsEjgQWBJMEIwSVBDEElQR+BIoEnASJBKsEiwS6BI0E5gSZBCEFpgQwBasEPQWxBGQFxQRvBcgEegXJBIUFxgSPBcAEmAW3BKIFrATPBWsE7QVGBA0GIwQwBgIESAbtA1UG5AOLBsUDpQazA7wGngPnBnAD/QZbAwkHUwMWB00DIwdJAzEHSQM+B0sDSgdRA1UHWANeB2IDZQduA2kHegNrB4gDageWA2cHpANhB7EDWge9A1AHyANFB9EDOAfZAyoH3wPwBvMD4gb5A7oGDwStBhUEnwYaBHUGJgRoBisEXQYyBFQGPAROBkcESwZUBEoGYgRMBm8ETwZ8BFUGiARdBpEEZwaZBHQGngSCBqEEoAakBAAHqgQfB6wEPwerBE0HqQRcB6UEagegBHcHmASPB4YEmgd8BKMHcQSqB2YErwdZBLAHTQSvByQEsAcWBLQHCgS6B/0DwgfxA8wH5gPiB88D+Qe8AwUItQMSCLADHgiuAyoIrwM1CLMDPQi6A0MIwwNFCM4DRAjaA0AI5wMwCAwELggZBC8IJQQzCDAEOgg7BEQIRgRPCFAEggh1BJoIiASlCJMErQieBLMIqgS3CLcEuAjFBLYI1ASzCOIErgjxBJ0IHQWVCDsFkQhaBZAImQWNCLgFiwjHBYcI1gWBCOMFeQjwBXAI/AVHCCsGNAhDBi0IUAYnCF4GHAiKBhIIpgYMCLQG9AfcBu4H6QboB/gG5AcGB9oHRAfTB2MHygeBB78HnwezB7wHqwfKB4oH/AeDBwkIfwcWCHwHJAh5B2AIeAdvCHIHjQhtB5sIZgepCF4HtAhUB78ISQfICDwHzggwB9IIIwfTCBYH0QgKB8wI6Aa3CNwGswjQBrEIxAayCLgGtgitBr0IpAbFCJ4G0AiaBtwImAbqCJgGJgmWBjUJkgZDCYwGUQl8BmsJTAaqCToGxAkyBtEJLAbfCScG7QkkBvwJIQYbCh8GqgodBskKGgbYChYG5goQBvMKBwb/Cv4FCwvnBSELwwU/C6kFUAucBVcLjQVcC38FYAtgBWQLIAVqCwIFagv0BGkL5wRlC90EYAvVBFgL0ARNC84EQgvQBDYL1QQqC9wEIAvnBBYL8wQOCw8FAQs7BfAKSAXqClUF4wpgBdoKaQXPCnAFwwp2BbYKegWnCoEFiQqEBWwKgwVgCoAFVQp6BUwKcQVGCmYFQgpKBT4KWwQ1ChsEMwoMBDQK/QM2Cu8DOgrjA0AK1wNICswDUgrCA10KmgONCoQDpAprA7gKNwPcCiwD5QohA+8KGQP5ChQDBAsSAxALEQMdCxMDOAsSA14LEgNnCxYDbQscA3ELJQNxCz4DbQtcA2QLeQNaC5YDTQu9AzcLygMxC9cDLQvlAywL8gMuC/8DMwsMBDkLGQRCCzMEVAtYBHILbgSIC3gEkwuSBLcLmwTBC6QEyQuuBM0LugTPC8cEzgvVBMsLAgW9CyAFtgswBbQLPwWzC04FtAtcBbcLaQW8C3QFxAt+Bc0LhgXXC4oF4wuLBe4LiQX6C4MFBQx7BRAMcAUaDGQFIwxXBSoMSgUxDDsFNgz/BEgM8gRNDOYEVAzbBF0M0wRnDMwEdAy6BJ0MpgTGDKAE1AydBOEMnATuDJ8E+wykBAcNrQQTDbcEHQ3CBCcNzgQwDdoEOA3nBD0N9QRADQIFQA0RBT4NOwUzDUkFMQ1WBTENYgU0DW4FOw13BUQNgAVPDYgFXA2OBWoNkwV4DZYFhw2ZBZYNmQW1DZYF1Q2QBfMNiwUBDoUFDw59BRwOcwUoDmkFMw5dBT0OUQVFDkMFTA41BVEOJwVUDhgFVQ4KBVMO/ARQDu4ESg7hBEIO1QQ5DsoELw6iBAEOmQT4DY8E8w2HBPENfwTzDXoE+Q13BAMOdwQPDnkEHA59BCoOggQ4DokERQ6SBFIOnAReDqYEaA7WBI4O4QSZDvcEsA5IBRIPWgUrD2EFOQ9nBUcPawVVD20FZA9xBZMPdQWyD3kFwQ+GBewPiQX7D4oFChCKBRkQhwUnEIMFNRB9BUMQdQVREFIFhRBLBZIQRQWfEEEFrBBBBboQQgXIEEYF1hBUBQERWQUQEV4FLxFgBU4RXwWOEV0FrRFZBbsRVAXJEU4F1hFFBeIRHAUOEhQFGhINBScSCQU0EgcFQxIHBVISCgWQEgkFrxIDBc0S9wT5EvQECBPsBEUT6ARTE+IEYRPbBG4TtwSfE68ErBOpBLoTpQTIE6ME1xOiBOYTowT0E6UEAxSqBBAUsAQcFLkEJxTEBDAU0AQ4FN0EPhTrBEEU+QRCFAcFQhQWBT8UQgUzFFAFMRReBTAUagUyFHYFNxSBBT8UjAVJFKAFYBSyBXoUwgWVFMgFoxTOBbEU0gXAFN8F/RTkBQoV6gUWFfMFIBX8BScVBwYrFRMGKxUeBigVQgYVFU0GERVYBg8VYwYRFWwGFxVzBiAVeQYsFX8GOhWGBlcViAZnFYgGdhWIBoUVhgaVFYIGpBV+BrMVdwbBFXAGzhVnBtoVXQblFVIG7hVGBvUVOQb6FSoG/RUPBgIWAgYFFvkFCRbzBQ8W8QUXFvMFIBb6BSkWFgZGFh4GURYkBl0WKAZpFigGdhYmBoMWIAaPFhgGmRYOBqIWAgapFtwFuxbRBcIWxwXMFr0F1xasBfEWnQUNF5AFKReFBUcXfwVlF3sFhRd1BdQXdgX0F3oFEhiMBU0YkgVrGJYFmxibBdoYmwX6GJkFCRmWBRcZkgUmGYsFMxl0BVsZZwV3GV4FlBlUBdMZTQXyGUMFDxoqBUcaJgVTGiUFXhonBWcaLAVuGjUFcRpABXIaaQVvGncFbhqEBXEajwV1GpkFfRqgBYYapAWRGqUFnRqiBakanAW1GpMFvxqIBccafAXOGm8F0xphBdYaOwXcGjMF4BouBeUaLQXsGjEF8xo3BfoaQQUAG2UFFRt+BSgbiQUyG5MFPhucBUobuQV9G8EFhxvLBY4b1gWSG+MFlBsfBpcbPQadG0sGohtYBqgbZAawG24GuRuEBtQbigbYG5EG2BuXBtUbmwbOG54GxBueBrgbnAarG5cGnRuMBoEbeAZVG2oGORtaBh0bNwbpGikGzRojBr8aHQahGhkGgRoXBmIaFwZTGhkGRRodBjcaJAYrGiwGHxo3BhUaQgYMGk8GBBpcBv4Zagb6GXcG+RmFBvsZkwb+GboGEBrHBhQa1AYWGuAGFBrsBg8a9gYIGv8G/RkHB/EZDAfjGREH1RkhB5kZJgeLGS0HfRk2B3EZPwdlGUoHWxlWB1IZYwdKGYsHNxmXBy8ZowcmGa4HHBm3BxAZvwcEGcYH9xjLB+sYzQfgGM0H1hjJB9AYwQfLGLcHyRieB8YYkgfDGIcHvhh+B7YYdgesGHIHoRhwB5QYcQeHGHUHeRh7B2wYjgdDGJIHNRiVByYYlwcXGJQH2ReVB6kXmgdqF58HSxeiBzwXpwcuF64HIRe2BxUX1AfzFtwH5xbkB9oW6QfNFu0Hvxb2B5MW+weGFgIIeRYLCG8WFQhmFiEIYBYuCFwWPAhaFmkIVhaUCFAWoQhQFqwIUha1CFgWvAhgFr8Iaxa/CHcWvQiEFrgIkRawCJ0WpwipFp0IsxaRCLwWXAjcFlAI5RZGCO8WPQj5FjcIBhcyCBMXJQg+FxYIahcSCHgXEAiFFxEIkhcVCJ0XHAinFyUIrhcvCLQXRwi9F1MIwxdeCMoXagjTF38I6RfGCD8Y1ghYGNwIZBjfCHIY3wh/GN0IjRjKCMcYxgjWGMMI5Ri8CCMZuQgxGa0IWhmrCGUZqghvGa0IdxmzCHsZuwh8GcYIehnvCG0Z/QhqGQwJaBkbCWcZKgloGTgJahlFCW0ZTwlyGVUJeBlYCYAZWAmKGU0JrhlKCbwZRwn4GUQJBxo8CSQaMQlCGicJXxoaCZwaFgmrGhAJuhoECdca2wgtG9EIShvPCFgbzwhmG9EIdBvVCIIb2wiQG+IInRvrCKgb9QiyGwEJuxs1CdcbQQnfG0wJ6RtWCfQbXgkBHGMJDhxnCRwcaQkqHGgJORxlCUccWglkHEsJgBwNCfAcAAkMHfsIGx34CCkd9ghIHfkIhx35CKYd9QjEHekI8B3jCA4e4Ag+HuIIbR7jCHwe5wiKHusImB7yCKQeCwnIHhEJ1B4WCeEeGAnvHhkJDh8MCZwfAwnsH/0ICyDoCFcg4wh2INsItSDYCMQgxwgAIcQIDyHCCC4hxAhOIckIbCHTCIkh4AijIecIrSHuCLMh9gi1If8IsyEICa4hJwmTITIJiyE+CYUhSgmDIVcJgyFkCYYhcgmLIY0JmSGmCashvgnAIcgJzCHRCdgh2gnlIecJASL4CS0i/wk7IgcKSCIQClQiJQprIm4KqCJ4CrIiggq+IokKyiKOCtcikArkIo8K8SKMCv4ihgoKI34KFSN0Ch8jawolI2AKKSNVCikjMwogIygKHyMeCiEjFQonIw0KMCMHCjsj8Al0I9UJqyPRCbkjzwnHI88J1SPRCeMj1AnyI98JDyTsCSwk9Ak5JAYKUyRGCpkkTwqmJFcKsyRdCsEkYgrPJGgK7SRqCg0lZwosJV8KWyVQCpklRwq3JTwK1CU0CuElKwrtJRYKBCbyCSMm2gk0Js0JOibACT4mswk/JqUJPSaXCTkmiQkzJlAJGSYzCQ0mJAkJJhUJBiYGCQQm9wgEJugIBibaCAomzQgQJsEIGSa1CCImnwg4JoEIXSZ4CGkmcQh2JmsIgyZoCJAmZwicJmkIpiZtCK8mdAi2JoUIxSaYCNgmqAjxJq8I/ia1CAwnuggbJ8QISCfICFYnzQhkJ9QIcif0CKUn+QixJ/wIvSf7CMkn9wjVJ/EI4CfnCOon3AjzJ9AI+id/CB4ocQgjKEkILCg9CDAoMwg2KCoIPyghCEooCQhwKP8HfCjrB5QoyQe2KLAHyiiLB+YogAfwKHcH+yhuBwcpaAcTKWMHIClgByopXwczKWIHOClnBzkpbwc3KYUHLimSByspoAcpKa4HKSm7BywpyQcyKe4HSCn7B04pCAhSKRYIVSlBCFopTgheKVoIZCllCGwpbwh2KZAIpim4CNMpvwjfKcQI6ynFCPgpwwgEKr4IECq2CBsqjAhDKoQITip+CFkqfAhkKn0IbyqCCHgqiwiAKpYIhCqjCIcqzwiIKt4IiSrrCIwq+AiQKgEJlyoJCaAqDAmqKg0JtioKCcMq8ggLK+sIKivqCDgr6whGK+4IVCvzCGAr+whrKwUJdispCZMrQAmoK2gJ2CtyCeMrfQnsK4kJ8yuWCfgrpAn7K7IJ+yvACfgrzgn0K9sJ7iv+CdorCQrXKxMK2CscCt0rIwrlKyoK7ys1CgcsPAoSLEQKHCxPCiQsWwoqLGcKLix0CjAsfwowLIkKLCyQCiUslAobLJsK9SufCugrpQrcK60K0iu4CsgrxArBK9EKuivuCrErKAukKzULoitAC6IrSQulK1ALqytVC7MrXAvEK2ELyitoC80rcQvNK3wLyiuIC8YrlQvAK6ALuCupC68rrwumK7ILmyuxC48rpwtsK6YLYSuoC1YrrQtLK7ULQSvACzgrzAswK9kLKyvmCykr9AspKwIMLCsQDDArLAw+K28MaCt9DG8riwx0K5kMdyuoDHkrtwx4K8UMdSvvDGcr/AxkKwgNZCsTDWYrHQ1sKyUNdSs7DZMrRA2aK08NnytbDaAraA2eK3UNmiuvDYMrvQ19K8wNeivaDXgr6A14K/UNeysADoArCQ6HKxEOkCsdDqQrJA6sKy0OtCs5DrkrRg68K1QOvityDr4rgQ68K5AOuSueDrQrqw6tK7cOpCvDDpsr8Q5vKwkPXCsVD1QrIg9PKy8PTCs8D0wrSQ9QK1QPVytfD2AraA9qK28PdyuDD58riw+sK5QPtyufD8Irqw/KK7gP0ivFD9cr8A/kK/0P6CsJEO8rFBD4Kx0QAiw4ECQsQxAtLE4QNSxbEDosaRA9LIcQPyymED0s4RAzLO8QMiz7EDMsBxE3LBMRPiwdEUcsPxFnLEsRcSxkEYQsjRGdLMQRvSzgEcss7xHRLP0R1SwMEtgsKxLaLEsS2Sx6EtQslxLNLKUSxyyyEsEs1BKqLN4SpizoEqUs8RKoLPcSrSz6ErUs+RK+LPUSyCztEtEs0BLwLMgS+yzCEggtvhIVLbwSIy29EjAtwBI8LccSRy3QEk8t2xJULecSVi30ElUtABNQLQwTSS0YE0AtLhMrLUITEy1TE/ssWBPwLFkT5SxXE9osUhPPLDsTryw2E6MsMxOXLDMTiyw2E34sOxNxLEITZSxLE1osVRNRLGETSyxtE0csexNFLIgTRyyVE0osoRNRLKoTWSyxE2QstRNxLLcTfyy3E7wsuRPLLLwT2izAE+gsxhP2LM0TAy3VEw8t3hMZLekTIC31EyUtAxQoLRIUKS1AFCYtXxQmLW8UKC1+FCstnBQ1LccURy3jFFYt/RRnLSgVjS0yFZMtOxWVLUMVky1LFY0tURWELVcVdy1gFVstbBUeLXEVEC12FQMtfhX3LIcV7iySFecsnhXjLKsV4iy4FeQsxBXoLNEV8CzdFfgs9BUMLf4VFy0GFiItDBYuLRAWOy0RFkgtEBZjLRAWcC0SFnwtFxaGLR4Wjy0mFpUtLRaYLTIWli02FpEtOBaHLTgWey04FlAtOhZBLT0WNC1DFiYtSxYaLVUWDy1fFgQtaxb7LHcW8yyDFu4skBbtLJ0W7iypFvMszhYGLdoWCy3mFg0t8xYNLR0XBi0sFwYtOhcHLUgXCi1VFxAtdxcjLYAXJi2JFyYtkRcjLasXCy22FwItwxf6LNAX8yzeF+8s7BfsLPoX7CwIGO4sFRjzLCAY+iwqGAMtMxgPLToYHC1AGCotTBhWLVEYZS1XGHItXhh/LWcYii1yGJQtfhidLYsYpS2ZGKstqBiwLbcYtC3GGLYt1Ri3LeMYti3wGLMt+xiuLQQZqC0JGaAtCRmZLQYZky3+GI4t9BiLLcsYhi29GIMtrxh+LaEYdy2VGG8tiRhlLX8YWi13GE4tcRhCLW4YNi1uGCktcRgcLXgYEC2AGAUtixj7LJYY8SyjGOossRjjLMAY3yzeGNgs/RjVLB0Z1Sw8GdgsTBnaLFoZ3ixoGeMsdBnqLIAZ8yyKGf0spBkdLawZJS22GSktwBkpLcoZJS3VGR4t3xkULfAZ/CwQGscsGRq8LCMasiwvGqwsOxqnLEkapixWGqYsYxqqLG8asCx6GrgsghrDLIgazyyMGt0sjxr7LJAaGy2OGmYtkBpzLZMagS2YGo4tnxqbLagapy2xGrMtvBq9Lccaxi3UGs0t4hrSLQAb2i1+G/AtrBv2Lbsb9i3IG/Qt1BvxLd8b6y3zG90t/hvXLQkc1C0UHNQtIBzYLVQc8C1yHPotkBwBLp8cAy6uHAQuvBwDLskcAC7UHPot3xzxLekc5y0HHcMtLx2ULTcdiC0+HXstQx1tLVEdQS1XHTMtXh0lLWYdGS1wHQ0tex0ELYcd/CyUHfcsoh30LM4d7izcHess5x3nLO8d4SzzHdgs9B3OLPIdwyzsHbgs4x2tLMcdjSy/HYQsvB17LLwddCzAHW0syR1mLNQdYSziHV0s8B1aLP8dWCwOHlgsLh5aLGweZSyMHmgsqx5oLLoeZizZHl8s9h5ULAQfTSwRH0YsHh89LCofMyw0HycsPh8bLEYfDyxMHwEsUh/zK2MftitvH5krfR98K6kfKCu2HwsrvB/8KsMf3yrFH9EqxR/FKsMfuyq+H7Qqth+xKqwfsCqfH7Iqgx+6KmYfxSpXH8wqSh/TKj0f3CoxH+UqJh/wKhwf/CoUHwkrDB8WK/EeTyvqHlwr1x52K8IejSusHqMroR6sK5UesyuKHrgrfx65K3QetytpHrErXx6pK1UenitNHpIrRh6FK0Aedys8HmgrOR5ZKzYeOis3HhorOx7bKjkenio6HpAqPR6DKkIeeCpKHm4qVR5lKnoeTCqGHkMqkB45KpgeLiqfHiEqpB4VKq4e7Cm0Ht8pux7TKcQeyCnPHr0p6B6rKREfkykuH4cpZx9zKXIfbSl8H2Ypgh9cKYUfUSmGH0QphR82KYIfKCl+Hxopdx8NKW8fAillH/coRh/ZKD0fzyg4H8QoNR+5KDcfryg8H6YoRR+gKFAfnChdH5koiR+YKJgfliinH5MotR+OKMMfiCj6H2ooCCBjKBYgXiglIFsoNCBaKEMgWihhIF4ogCBkKI4gaCiaIG0ooyBzKKogeyitIIUorSCQKKsgnSieINgoliD2KIsgEyloIFkpYiBnKV4gdilcIIQpWyCTKV0goilpIOApbCDvKW8gDypvID8qbCBeKmggbSpeIIoqQiDDKjUg4CohIBsrGiApKwsgRCvcH4Mr1B+QK80fnivIH6wrxB+6K70f+Cu0HyMssx8wLLMfPSy2H0ksvB9VLMUfYCzPH2os2x9zLOgfeiwFIIYsFCCKLDIgkSxRIJUsYCCVLG4gkyx8II4siSCILJYggCywIG4s/CA0LBYhIiwjIRosMCETLD4hDixMIQssWyELLGohCyyJIRAs1yEgLPUhJCwCIiQsDiIhLBkiHCwgIhMsJiIJLCki/CsqIu0rKiLeKyYinysnIpArKCKBKywicysxImUrOCJYK0siQCtVIjUrYCIsK2wiJCt4IiArhiIeK5QiHivAIiMrziIjK9siICvoIhsr8yIUK/0iCisFI/4qDCPxKhIj4yogI7cqJiOqKi4jnSo3I5EqQSOGKk0jfSpaI3YqaCNwKpQjYSqiI1wqsCNVKrwjTCrHI0Mq0iM3KtsjKyrkIx4q+yP1KQ0k3CkiJMUpRCSkKVgkjilgJIEpZiR0KWokZilrJFgpaiRKKWckPCliJC4pWyQhKTok7CgPJJgoBySLKP4jgCjzI3Yo5yNtKNojZiixI1EooyNJKJcjQSiLIzcogSMsKHkjIChyIxQobyMIKG4j+ydxI/AndiPmJ34j4CeII9wnkyPcJ58j4CeqI+YnwSP0J8wj+ifYI/0n5SP9J/Ij+yf/I/YnDSTwJygk4ic1JNknQCTQJ0kkxSdQJLknVSSrJ1gknSdZJI4nWCRhJ1okUydeJEYnZSQ7J24kMid5JCwnhiQpJ5MkKCehJConsCQuJ74kNCf3JE8nFCVYJyMlWycyJV0nQiVcJ1ElWydgJVcnfSVMJ5klPifQJR0n7CUPJwkmAicYJv0mRibwJqMm2ybDJtYm0ibVJvIm1CYiJ9YmcifcJpEn3yawJ+UmzyftJu0n+CahKDwnzShLJ9woTyfrKFIn+ShSJwgpUScWKU0nMilBJ3cpGieTKQsnsCkAJ90p8Cb5KeMmFCrTJlQqpCZuKpMmfCqNJooqiCa1Kn4mwip6Js0qdCbWKmwm3SpiJuIqViblKkgm5yo5JugqKybnKhwm4yoPJt4qAybWKvglzCrtJcAq5CWmKtMliyrDJX0qvSVfKrMlUCqwJTEqqyXxKaYl0SmlJbIppyWjKaolhSm0JQ8p5SXyKPAl1Cj4JcQo+yW1KPwlpij7JZYo+SWHKPYlaijrJT8o1yUGKLol6yeqJeAnoCXVJ5YlzCeLJcYnfiXCJ3IlwidlJcQnWCXJJ0sl0Cc/JeMnJiUDKAMlGijuJCco5SQ0KN0kUCjPJJgosySkKK0kriimJLQonyS2KJcksyiPJK0oiCSkKIIkmSh+JI0ofSSAKH8kcyiDJFoojSRNKJEkPyiUJNQnmCTFJ5gkpyeSJHonhCRdJ3wkTid7JD4neyQvJ3wkESeDJPUmjyTpJpYk3iaeJNcmqCTRJrMkzibAJM0mzSTKJhklwyZ5Jb4mmCW6JqcltSa1Ja4mwyWeJt4ljCb4JXgmESZhJicmVSYxJkkmOiY7JkEmLSZIJh8mTSYQJlAm8SVVJsElWiaiJVomkiVZJoMlVyZ0JVMmZiVOJi0lMyYfJS4mECUqJgIlJybzJCcm5CQpJqokOSabJDsmjCQ8Jn0kPCZuJDkmYCQ1JlMkLyZHJCcmPiQeJjckEyY0JAgmNCT8JTck7yU9JOMlRSTXJVkkvyVuJKgleiSdJZMkiiXVJGMl3yRaJeckUSXsJEYl7yQ7JfEkFiX0JAkl+iT9JBEl1yQZJcokHyW8JCMlriQmJZ8kJyWQJCYlgSQjJXIkHyVkJBMlRyTpJPEj3CTUI9YkxiPTJLkj0iSrI9MkniPYJJIj3ySGI+gkeyPyJHAj/SRlIwklXSMVJVYjIiVRIy8lTyM9JVAjTCVTI3glXyOHJWIjliVjI6QlYyOzJWIj3yVZI+8lVyMOJlcjPSZaI1wmWiNsJlgjiyZSI6kmSiPgJjYj7CY0I/kmMyMvJzgjbCc3I3snOSOnJz8jsydAI74nPiPHJzgjzycwI9QnJSPlJ/4i7CfzIvUn6iIAKOQiCyjhIhgo4SIkKOUiMSjrIjwo9CJGKP4iTygKI1YoFyNcKCQjaihPI3goaiOJKIQjnCidI7EotSO7KMAjxyjJI9MozyPgKNQj7SjWIxkp2SMoKdsjNinfI0Ip5SNOKe0jWCn3I18pAiRkKQ8kZykdJGgpKyRnKVkkaCloJGspdyRvKYUkdSmSJH0pnySGKaokkCm0JJspvCSnKcEktCnDJMEpwiTOKb4k2ym3JOgpryQOKpMkJip/JDsqaSRDKl0kWSo4JGEqLiRqKiUkdSofJIIqGySsKhYkuioTJMcqDSTUKgYk4Cr9IwMr3yMcK80jKSvGIzcrwCNdK7MjZCuwI2grrCNmK6ojYCuoIy4rpyMgK6UjFCuhIwkrmiMBK5Ej/CqGI/sqeiP9Km4jAitjIworWCMUK08jICtHIy4rQCM8KzojSys3I1krNSNoKzQjdys2I4UrOSOTKz8jnytGI6orUCOzK1ojuytlI8ErcSPKK4kj0CuTI9crnCPgK6Ij7CulI/krpyMHLKcjJiyjI1UsnSODLJQjkSyPI50siSOmLIIjrCx4I68sbSOvLGEjpiw9I6YsMyOpLCojsCwkI7osICPGLBwjAC0SIw0tDiMXLQkjHS0CIyAt+iIeLfAiGS3mIgQtxiIALbsiAC2wIgMtpiIKLZ0iJy2DIi8teSIzLW4iNS1iIjMtViIvLUoiJy0/Ih4tNSIULS0iCi0oIv4sJiLzLCgi5ywtIs8sOiLDLEAitixEIqgsRSKaLEQijCxAIn4sOyIpLBEiCywHIu0rAiLNKwEivisCIq8rBCKgKwcikisMIoUrEyJfKywiUys0IkYrOyI4Kz8iLCtBIiArPyIVKzsiCys0IvEqGSLnKhIi2yoOIqQqBCKWKgAiiSr5IXwq8SFwKughWyrRIVIqxSFKKrkhRCqsIUEqoCFAKpUhQyqLIUkqhCFSKoAhXCp/IWgqgiFzKoghmSqfIaYqpSG0KqohwyqtIdIqriHxKqwhACuqIQ8rpiEdK6AhKiuZITcrkCFCK4YhYytlIW8rWyF7K1IhhytLIZUrRyGkK0MhwitBIeIrQSHxK0IhECxIIR8sTCFLLFshWCxeIWUsYCFxLF8heixbIYAsVCGDLEshgixCIX0sOiF1LDIhaSwsIVwsJyEgLBghAywOIfcrByHsK/8g5Cv0IN4r6SDbK9sg1SuyINErpyDLK50gwyuWILgrkyCsK5IgnyuVIJErmSBoK6kgXCutIFIrriBKK6wgRiunIEUrnyBNK34gTityIEwrZiBHK1wgPitSIDQrSiAnK0MgGSs9IAorOSDrKjMgrSorIJ4qKCCPKiMggSodIHMqFiBZKgQgQSrwHx4qzx8HKrwf+ym1H+8psB/jKa0f2SmuH9EpsR/MKbYfzCm8H88pxB/WKc0f8yntH/wp+B8DKgUgByoSIAgqHyAHKiwgAio5IPspRCDyKU8g5ylZINopYSDNKWkgwClvILEpdCCjKXcglCl5IIQpeSBGKXcgNyl4IA4pfSADKX0g+ih6IPQodCDxKGwg8ihjIPwoQiD+KDYg/ygqIP0o+B/8KO0f+SjjH/Mo2h/rKNIf4CjKH44onR90KIwfaCiCH14oeB9VKGwfTihfH0koUh9HKEQfRyg1H0koJx9NKBkfVigAH1go9h5YKO0eUyjmHkwo4B5BKNweNCjaHiYo2R4XKNkeCSjbHuAn5R7TJ+YexiflHron4h6vJ9sepSfSHoYnsx5mJ5QeXSeJHlYnfR5RJ3AeTSdhHkQnNR5AJygeOycdHjQnFB4rJw8eICcLHvcmAx7bJvkdvibsHXgmxx1bJrodTCa1HS0mrh3fJaMdwSWcHbMllh2nJY4dmyWFHZIlex2LJXEdhiVlHYUlWR2IJU0djSVBHZUlNR2eJSkdtCUTHcAlCR3ZJfYc9CXmHAIm3xwQJtocHybWHC4m0xxOJtEcfSbQHJ0m0Ry8JtQcyybXHAYn6RwkJ+4cRCfwHLQn8BzjJ/IcAij3HBEo+xxcKBQdaygYHXooGh2JKBsdmCgaHacoGB3RKAwd3ygJHf0oBx0qKQgdNykGHUQpAR1OKfscVynxHF0p5hxgKdocYSnNHF8pwBxaKbMcUympHEkpoBw+KZkcMSmUHCIpkRz1KIgcyCh6HKoobhycKGgcjyhgHIIoVxx3KE0cbihCHGYoNhxgKCgcVigNHFAoARxJKPgbQCjxGzYo7hsrKO4bHyjwGxMo9Rv0Jwgc6ScNHN4nDxzTJw0cyCcIHL4nABypJ+sbiyfHG3YnsBtqJ6YbRSeLGy4neBskJ20bACc/G9UmFhvLJgsbwib/Grsm8hqpJscanCarGpMmnhqKJpIadCZ9GlsmaRobJkEaAyYuGuIlDBqhJcUZjSWtGXwlkxlvJXgZYCVOGVklQhlRJTgZRiUxGTolLRktJSwZHyUtGRAlMBkCJTQZ9SQ6GekkQRnfJEoZ1yRUGdEkYBnGJHsZvSSXGbskpRm7JLMZvSTBGcMkzhnKJNsZ0iTnGd0k8hnoJPsZ9CQDGgElChopJRoaNiUhGkElKhpKJTQaUiVAGlclTRpaJVsaWyVpGlkldxpWJYQaQCW1Gj0lwho3JewaNCX7GjAlCRsqJRcbIyUkGxolMRsQJT0b+iRTG+4kXRviJGUb1CRsG8ckcBu5JHIbqyRxG50kbhuQJGgbgyRhG3ckWBtsJE4bYyRCG1okNRtTJCgbPyT/Gjgk8xovJOkaJiThGhok3BrzI9Ua5yPSGt0jzBrWI8Ma0iO5GtEjrRrSI58a1iORGuIjZhrlI1ca5SNJGuMjOxrfIy4a2SMjGtAjGxrEIxQatyMPGqkjCxqKIwca+yL2Gd0i8BnOIuwZvyLmGaQi2BlXIqAZPCKQGS4iihkgIoYZESKDGQIighnzIYIZ5CGEGdYhhxnJIYwZvSGUGbIhnRmTIb8ZiSHKGX0h1BlxIdwZZCHjGVUh6Rk3IfEZGCH4Gfkg/RnaIP4ZyiD9Gbsg+hmsIPcZniDyGZEg6xmFIOMZfCDZGXUgzhlxIMIZcCC1GXMgqBl5IJwZgCCPGYkggxmeIGsZviBIGdUgMxniICsZ7yAjGf0gHRkpIQ0ZcSHvGH8h6xiOIegYniHnGMwh6BjbIegY6iHnGPch4xgEIt4YESLWGBwizBgyIrYYUiKTGGkifRiBImkYtSJGGMAiPRjJIjMYzyIoGNMiHBjTIg8Y0SIBGMwi9RfFIukXvCLeF7Ei1Bd+IrEXZyKdF1MihRdAImsXJSJEFxUiKRcPIhsXCiINFwgi/hYGIt8WCSKiFggilBYFIocW/yF9FvYhdRbrIW8W3iFqFtAhZhaiIV4WMyFMFhQhSRYFIUkW9iBLFuggTxbbIFUWzyBdFsQgZxabIJQWkCCdFoUgoxZ4IKcWaiCoFlwgpxZNIKQWMCCaFvUfghbXH3oWyB93FqkfdhZqH3oWWh96FjsfdhYPH2wW8B5oFuEeZxayHmkWlB5nFoUeZBZ2Hl8WaB5aFkweSxZAHkIWNB44FiseLRYiHiAWHB4TFhceBRYNHtoVCh7MFQQewBX9HbYV4B2bFdgdkRXSHYYVzx16FdAdbRXSHWAV2B1SFeYdNxV0HmIUhB5HFJIeKxSXHh0Umh4OFJse/xObHvATmB7hE5Qe0xOOHsUThh64E30erRNzHqITZx6aE1oelBNNHpETPx6QEzIekhMkHpYTFh6cE98duRPRHb8Twx3DE7QdxhOlHccTdx3HE1kdyxMrHdYTwBz3E6Ec/xODHAQUdBwEFGUcAxRXHP8TOhz0EwEc2BPnG8cT2xu9E9AbsxPGG6cTvRuaE6wbgBOfG2MTmhtVE5YbRhOTGzYTkRsXE5Ib+BKUG+gSmRvJEqYbixKpG2wSqRtcEqcbTBKjGy0SkhvPEYsbsBGCG5QRfBuIEXMbfhFpG3YRXRtwEU8bbBExG2cRwhpZEaQaVBGWGlARihpLEYAaQxF4GjkRchouEW4aIBFhGsQQXRq1EFcapxBQGpoQSBqNECwaaBAlGlwQHhpPEBoaQRAYGjMQGBoUEBwa9g8fGucPJBraDysazw80GsUPPxq9D0watw9aGrEPeBqoD5YaoQ+lGp4PtBqdD8Iang/PGqIP2xqoD+casA/yGroPBxvRD2QbPhB2G1cQfBtkEIEbcRCDG34QgRuMEH0bmBB3G6QQbhuuEFMbxRBPG8sQTxvQEFMb1RBbG9oQZxveEIMb5hCiG+oQsRvrENEb6xDxG+kQEBzlEDAc4RBOHNkQaxzNEIYcvRCgHKsQuByWEM8cgBBBHRAQYx3uD3sd2g+VHcgPsR24D9sdog8VHoYPMh55D18eaQ/aHkgP+B4+DwcfNw8jHykPWR8HD6gf0w68H8MOwh+7DsQftA7BH60Ouh+nDqIfnA5pH4UOTh92DjUfYw4eH00OCB82DvQeHQ7lHgIO3h70Ddke5Q3WHtYN0x7HDdMeuA3THqkN1R6aDdkejA3fHn8N5x5zDfAeag37HmINBx9eDRQfXQ0gH2ANLR9lDVIfew1fH4ENbR+FDXsfhw2nH4kNtR+KDcEfjQ3hH5sN7B+dDfYfnQ0BIJkNCyCSDRQgiQ0dIH0NLCBiDTkgRQ1MIBkNWCD8DGUgzgx8IGEMhSBDDJIgJgyyIO8LwCDTC8ogtgvaIHoL5SBdC/sgMws6IcMKSCGnCk4hmQpTIYoKVyF8ClkhbApZIU0KVyEeClgh/wlaIfEJXyHiCWQh1Al0IbkJfSGsCZIhlQm1IXQJFiIiCS0iDAlBIvQIUiLZCHAioQiEInUIliJJCLMi7gfFIrAHyyKRB9YiQwfeIiUH7SL4BvUi2gb2IssG9yK8BvUirQbwIo4G3yJABtwiIgbcIhMG3yIFBuMi+AXrIuwF9CLiBf8i2AULI9AFGCPKBSYjxQVTI70FYiO5BXAjtAV+I64FmCOdBbAjiQXGI3MF2iNaBf0jJwUGJBsFESQRBR0kCQUqJAMFOCT+BEck+wRlJPgEdCT4BIMk+QSSJP0EoCQBBckkEgXXJBYF5SQYBfMkFwUBJRMFDyUNBRwlBgVPJeIEXSXbBGsl1AR5Jc8EiCXMBJclygSmJcoEtSXMBMMlzwTgJdsE/SXpBHwmLAWnJkAFtiZFBcQmSQXTJksF4iZLBfEmSwUeJ0QFPSdBBawnPwXLJzwF2yc5BeonNQUHKCkFaSj2BIYo6ASzKNgE4SjMBBApxAQwKcEEYCnABJApwgTAKcYETyrXBH0q3gSbKucEqirtBLgq9ATtKhUF+yocBQkrIgUXKycFJispBTUrKwVUKyoFpCskBcMrHwXRKxsF3ysVBe0rDwX6KwYFOSzXBEYs0ARULMkEYizEBHEswQSQLLwEEC20BC8tsAQ/La4ETi2qBGwtoAS0LYAE0i13BPEtcgQuLm4EPC5rBEcuZwRRLmAEVy5XBFwuSwRkLiAEbC4DBHIu9AN5LucDgi7bA4wuzwOXLsQD1S6TAwIvagMOL2MDGy9dAygvWgM3L1kDRi9aA2QvXwNzL2MDjy9vA9IvlwPgL50D7i+hA/wvowMKMKIDGTCgA1YwjwN0MIkDkzCHA8IwiAPhMIcD8DCEA/8wgAM5MWoDRzFlA1QxYwNgMWMDajFmA3QxbQN8MXYDkzGbA5wxpgOmMbADsTG4A74xvgPMMcID2zHFA/oxyQMYMsgDJzLGAzUywgNDMrwDUTK1A2sypAPSMlgD7DJGAwczNgMyMyEDazMLA3gzBQOEM/0CjzP0Apgz6AKgM9wCpTPPAqgzwgKpM7UCpjOpAqEznwKYM5cCjTORAoAzjQIzM38CFTN3AvgyawKwMkkCkzI/AoQyPAJ1MjoCODI5AhoyNAIMMi8C/zEpAvMxIgLoMRgCyTH5Ab0x8QGxMeoBpDHmAZUx4wGGMeIBdzHjAWgx5AFaMegBTDHtAT8x9AEzMfwBKTEGAiIxEQIdMR4CGzErAhsxOgIcMUgCIDFXAiUxZQIrMXMCMzGBAlYxtAJeMcECZDHPAmgx3QJqMesCajH4AmgxBQNiMQ8DWjEYA08xHwNDMSMDNDEmAxYxKQP3MCgDujAbA5swGAN8MBkDPjAjAx8wJQMRMCQDBDAhA/gvGwPuLxMD5i8JA+Iv/gLhL/IC4y/lAugv2QLvL80C+S/CAgQwuAIdMKQCXTB1AnQwYAJ/MFUCiDBJApAwPAKlMBMCtDD4AeIwtwHwMJwB9jCOAfkwgAH5MHIB9zBlAfIwWgHqMFAB4DBIAdQwQgHHMEABuTBAAaswQgGeMEcBSDBvASswegHfL5MBwS+fAbMvpgGZL7cBTy/yAUIv+gE1LwACJy8FAhkvBwIKLwgCyy4FAqwuBgKcLggCfi4OAm8uEgJhLhgCVC4fAkkuJwJALjACOy45AjkuQgI7LkwCTi5sAlMueAJWLoUCVS6SAlIungJMLqsCQy62AjguwAIsLskCHy7QAgIu2wLzLd8C5S3iAtYt4wLJLeECvS3dArIt1gKqLc0CpC3DAqEttgKhLakCoy2bAq0tcQKvLWQCrS1YAqktTAKiLUECmC03Ao0tLQJ0LRwCZi0UAlgtDwJKLQoCOy0IAh0tBwLuLAkC3iwJAs8sCALALAUCsSwBAqMs+wFtLN4BXyzYAVIs1AFELNIBNyzTASos1wEdLN0B6iv+Ad4rBALTKwgCyCsJAr0rBgK0KwACrCv2AaQr6gGfK90BmivPAZgrwAGXK6IBmStzAZgrZAGWK1YBkitIAYwrPAGFKzABaisNAWMrAAFfK/MAXSvlAF4r1wBiK8kAZyu7AG8rrgB4K6IAgiuWAJkrgQCyK24AwCtmANwrVwD5K00ACCxKACYsSABPLEcAYixFAA==", oe = /* @__PURE__ */ new WeakMap();
function J(e, t, n) {
	let r = oe.get(e);
	r || oe.set(e, r = /* @__PURE__ */ new Map()), r.get(t) !== n && (r.set(t, n), t.startsWith("--") ? e.style.setProperty(t, n) : e.style[t] = n);
}
function Y(e, t) {
	J(e, "display", t ? "" : "none");
}
function se(e, t, n = "150%") {
	if (!("IntersectionObserver" in window)) {
		t();
		return;
	}
	let r = new IntersectionObserver((e) => {
		e.some((e) => e.isIntersecting) && (r.disconnect(), t());
	}, { rootMargin: `${n} 0px ${n} 0px` });
	r.observe(e);
}
async function ce(e) {
	if ("createImageBitmap" in window) try {
		let t = await (await fetch(e)).blob();
		return await createImageBitmap(t, {
			premultiplyAlpha: "none",
			colorSpaceConversion: "none"
		});
	} catch {}
	let t = new Image();
	return t.src = e, await t.decode(), t;
}
var le = 0;
addEventListener("scroll", () => {
	le = performance.now();
}, { passive: !0 });
function ue(e) {
	return new Promise((t) => {
		let n = () => {
			performance.now() - le > 120 || e.getBoundingClientRect().top < innerHeight * 1.2 ? t() : requestAnimationFrame(n);
		};
		requestAnimationFrame(n);
	});
}
//#endregion
//#region src/home/shared/math.ts
var X = (e, t = 0, n = 1) => Math.min(n, Math.max(t, e)), Z = (e) => (e = X(e), e * e * (3 - 2 * e)), Q = (e, t, n) => Z((n - e) / (t - e)), $ = (e, t, n) => e + (t - e) * n, de = .15, fe = matchMedia("(prefers-reduced-motion: reduce)").matches;
function pe(e = de, t = 5e-4) {
	let n = NaN, r = 0, i = !0;
	return {
		step(a, o = performance.now(), s = 1) {
			let c = o === r ? 0 : i ? 1 / 60 : Math.min(.1, Math.max(0, (o - r) / 1e3));
			return r = o, fe || n !== n ? n = a : (n += (a - n) * (1 - Math.exp(-c / e)), n = a + (n - a) * Math.min(1, Math.max(0, s)), Math.abs(a - n) < t && (n = a)), i = n === a, n;
		},
		snap() {
			n = NaN;
		},
		get easing() {
			return !i;
		}
	};
}
var me = .05, he = matchMedia("(hover: none) and (pointer: coarse)").matches, ge = pe(he ? me : de, .05), _e = -1, ve = 0, ye = () => {
	let e = document.timeline?.currentTime;
	return typeof e == "number" ? e : performance.now();
};
function be() {
	let e = ye();
	return e === _e ? ve : (_e = e, Math.abs(scrollY - ve) > innerHeight * 2 && ge.snap(), ve = ge.step(scrollY, e), ve);
}
var xe = .64, Se = .8, Ce = matchMedia("(max-width: 760px)");
function we() {
	return Ce.matches ? Se : xe;
}
function Te() {
	return Math.min(Ce.matches ? 1.5 : 2, devicePixelRatio || 1);
}
function Ee() {
	let e = NaN;
	return {
		at(t, n) {
			return Math.abs(t - e) < n * .5 || (e = t), e;
		},
		reset() {
			e = NaN;
		}
	};
}
function De() {
	return scrollY - be();
}
function Oe() {
	return be(), ge.easing;
}
addEventListener("hashchange", () => ge.snap()), o(() => ge.snap()), window.__scrub = () => ({
	y: ve,
	scrollY,
	easing: ge.easing
});
//#endregion
//#region src/home/shared/opening.ts
var ke = null;
function Ae() {
	let e = () => {};
	return ke = new Promise((t) => {
		e = t, setTimeout(t, 15e3);
	}), e;
}
function je() {
	return ke ?? Promise.resolve();
}
var Me = {
	hero: {
		stroke: 15,
		x: 391.12,
		y: 729.28
	},
	size: 2e3,
	dmax: 65.06
}, Ne = matchMedia("(prefers-reduced-motion: reduce)").matches, Pe = matchMedia(d), Fe = new URLSearchParams(location.search).get("mline") === "simple", Ie = 2e3, Le = "29, 29, 21", Re = {
	stroke: 0,
	x: 0,
	y: 0
}, ze = {
	id: "sandur",
	name: "Sandur",
	alt: "A glacial outwash plain in southern Iceland, first as a drawing, then as a satellite image in black and white, true color and false color."
}, Be = 2, Ve = [
	Be,
	3,
	4,
	5
], He = .55, Ue = .8, We = (e) => 1 - Z((e - .2) / .5);
function Ge(e) {
	if (Pe.matches) return X(1 + e.getBoundingClientRect().top / Math.max(1, e.querySelector(".ln-hero")?.offsetTop || 120));
	let t = e.querySelector(".ln-stick")?.clientHeight || innerHeight;
	return We(X(-e.getBoundingClientRect().top / t, 0, (e.offsetHeight - t) / t) / He);
}
function Ke(e, t, n) {
	let r = async () => K(await (await fetch(e)).arrayBuffer(), t, n);
	return typeof Worker > "u" ? r() : new Promise((i) => {
		let a;
		try {
			a = new _();
		} catch {
			r().then(i);
			return;
		}
		a.onmessage = (e) => {
			a.terminate(), e.data.ok ? i(e.data.r) : r().then(i);
		}, a.onerror = () => {
			a.terminate(), r().then(i);
		}, a.postMessage({
			url: new URL(e, location.href).href,
			hero: t,
			ribbon: n
		});
	});
}
function qe(e, t) {
	let n = atob(q), r = new Uint8Array(n.length);
	for (let e = 0; e < n.length; e++) r[e] = n.charCodeAt(e);
	return K(r.buffer, {
		stroke: 0,
		x: e.x,
		y: e.y
	}, t);
}
var Je = 700, Ye = 3, Xe = [
	1e3 / 144,
	1e3 / 120,
	1e3 / 90,
	1e3 / 60,
	1e3 / 30
];
function Ze(e, t) {
	let n = performance.now(), r = 0, i = 1e9, a = 0, o = !1, s = [], c = (r, a) => {
		o || (o = !0, removeEventListener("scroll", l), window.__heroGate = {
			from: n,
			at: a,
			mode: r ? "draw" : "whole",
			frame: i
		}, r ? e(a, i) : t());
	}, l = () => c(!1, performance.now());
	addEventListener("scroll", l, { passive: !0 });
	let u = (e) => {
		if (!o) {
			if (r) {
				let t = e - r;
				if (s.push(t), s.length >= 5) {
					let e = s.slice(-5).sort((e, t) => e - t)[2];
					i = Math.min(i, Xe.reduce((t, n) => Math.abs(n - e) < Math.abs(t - e) ? n : t));
				}
				if (a = 0, i < 1e9) for (let e = s.length - 1; e >= 0 && s[e] <= i * 1.5 + 2; e--) a++;
			}
			if (r = e, a >= Ye) return c(!0, e);
			if (e - n > Je) return c(!1, e);
			requestAnimationFrame(u);
		}
	};
	requestAnimationFrame(u);
}
function Qe() {
	let e = document.createElement("canvas");
	e.width = e.height = 192;
	let t = e.getContext("2d"), n = t.createImageData(192, 192);
	for (let e = 0; e < n.data.length; e += 4) {
		let t = Math.random();
		n.data[e + 3] = t > .82 ? 120 + Math.random() * 135 : t > .6 ? 40 : 0;
	}
	return t.putImageData(n, 0, 0), t.createPattern(e, "repeat");
}
function $e(e, t, n, r, i) {
	let a = e.getContext("webgl", {
		premultipliedAlpha: !0,
		alpha: !0
	}), o = [], s = Promise.all([t, n].map((e, t) => ce(e).then((e) => {
		o[t] = e;
	}).catch(() => {}))), c = 0, l = -1, u = !1;
	if (!a) {
		let t = e.getContext("2d"), n = () => {
			t && u && c !== l && (l = c, t.clearRect(0, 0, e.width, e.height), !(c <= 0) && (t.globalAlpha = c, t.drawImage(o[0], 0, 0, e.width, e.height), t.globalAlpha = 1));
		};
		return s.then(() => {
			u = !!o[0], n();
		}), {
			ready: s,
			draw(e) {
				c = e, n();
			},
			size() {
				l = -1, n();
			}
		};
	}
	let d = null, f = (e, t, n, r) => {
		let i = a.createTexture();
		a.activeTexture(a.TEXTURE0 + t), a.bindTexture(a.TEXTURE_2D, i), a.texImage2D(a.TEXTURE_2D, 0, a.LUMINANCE, a.LUMINANCE, a.UNSIGNED_BYTE, n), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), a.uniform1i(a.getUniformLocation(e, r), t);
	}, p = null, m = () => {
		p = D(a, "attribute vec2 p; varying vec2 uv; void main(){ uv = vec2(p.x * .5 + .5, .5 - p.y * .5); gl_Position = vec4(p, 0., 1.); }", "precision mediump float; varying vec2 uv; uniform sampler2D bw, dist; uniform float fill, r0;\n    float hash(vec2 q) { return fract(sin(dot(q, vec2(12.9898, 78.233))) * 43758.5453); }\n    void main(){\n      float lum = texture2D(bw, uv).r;\n      float v = texture2D(dist, uv).r; float d = v * v;            // distance from the drawing, 0..1 of its range\n      // an uneven wash: the halo's reach varies along the line, so its edge is ragged like ink on damp paper\n      vec2 g = uv * 34.; vec2 f = fract(g); f = f * f * (3. - 2. * f); vec2 c = floor(g);\n      float vn = mix(mix(hash(c), hash(c + vec2(1., 0.)), f.x), mix(hash(c + vec2(0., 1.)), hash(c + vec2(1., 1.)), f.x), f.y);\n      vec2 g2 = uv * 97.; vec2 f2 = fract(g2); f2 = f2 * f2 * (3. - 2. * f2); vec2 c2 = floor(g2);\n      float vn2 = mix(mix(hash(c2), hash(c2 + vec2(1., 0.)), f2.x), mix(hash(c2 + vec2(0., 1.)), hash(c2 + vec2(1., 1.)), f2.x), f2.y);\n      d *= 1. + .55 * (vn - .5) + .25 * (vn2 - .5);\n      float r = r0 + 0.4 * fill * fill;\n      float a = exp(-pow(d / r, 0.9));                             // tone bleeds out of the lines and widens\n      a = 1. - (1. - a) * (1. - smoothstep(.55, 1., fill));         // the last of it settles evenly\n      a *= smoothstep(0., .06, fill);                              // nothing at all before the fill begins\n      a *= 1. - .07 * hash(floor(gl_FragCoord.xy)) * (1. - a);      // a little paper tooth in the thin wash\n      gl_FragColor = vec4(vec3(lum) * a, a);\n    }"), p && (a.useProgram(p), N(a, p), d = a.getUniformLocation(p, "fill"), a.uniform1f(a.getUniformLocation(p, "r0"), .5 / r), u && (f(p, 0, o[0], "bw"), f(p, 1, o[1], "dist")));
	};
	m();
	let h = () => {
		u && c !== l && R(a) && (l = c, a.viewport(0, 0, e.width, e.height), a.clearColor(0, 0, 0, 0), a.clear(a.COLOR_BUFFER_BIT), !(c <= 0) && (a.uniform1f(d, c), a.drawArrays(a.TRIANGLE_STRIP, 0, 4)));
	};
	return s.then(() => {
		o[0] && o[1] && (u = !0, p && R(a) && (f(p, 0, o[0], "bw"), f(p, 1, o[1], "dist")), l = -1, h());
	}), H(e, a, i, m, () => {
		l = -1, h();
	}), {
		ready: s,
		draw(e) {
			c = e, h();
		},
		size() {
			l = -1, h();
		}
	};
}
function et() {
	let e = document.querySelector("[data-line]");
	if (!e) return;
	let t = e.querySelector(".ln-stick"), n = e.querySelector(".ln-lines"), r = e.querySelector(".ln-frame"), i = e.querySelector(".ln-photo"), a = null, s = e.querySelector(".ln-hero"), c = e.querySelector(".ln-hd"), d = e.querySelector(".ln-text"), f = [...e.querySelectorAll(".ln-stage")], p = [...e.querySelectorAll(".ln-steps span")], m = Qe(), h = null, g = null, _ = null, v = 0, y = 0, b = 1, x = !1, S = !1, C = 0, w = 0, T = 0, E = 0, D = 1, O = 1, k = 0, A = 0, j = 0, M = 0, N = +!!Ne, P = !1, F = 0, I = (e, t, n) => {
		e.width !== t && (e.width = t), e.height !== n && (e.height = n);
	}, L = null, R = () => {
		if (v = t.clientWidth, y = t.clientHeight, b = Math.min(devicePixelRatio || 1, 2), S = Pe.matches, S) {
			c.classList.contains("is-docked") || (C = c.offsetTop + c.offsetHeight), y = Math.max(1, s.offsetTop - C), x = !1, w = r.offsetWidth, T = 0, E = 0, O = w / Ie, D = Math.min(v / 95, y / 19), k = v * .56, A = y / 2 + 6 * D, j = k, M = A, I(n, Math.round(v * b), Math.round(y * b)), n.style.height = `${y}px`, n.style.top = `${C}px`, Object.assign(r.style, {
				top: "",
				left: "",
				width: "",
				height: ""
			}), I(i, Math.round(w * Math.min(b, 1.5)), Math.round(w * Math.min(b, 1.5))), e.style.setProperty("--side", `${w}px`), e.style.setProperty("--ftop", "0px"), L = null, a?.size(), H = !0;
			return;
		}
		if (n.style.height = "", n.style.top = "", x = l(v, y), x) {
			let e = v > 760;
			T = e ? 72 : 56;
			let t = d.offsetHeight, n = e ? v - 96 : v;
			w = Math.round(Math.max(n * .62, Math.min(n, y - T - (e ? 28 : 22) - t - (e ? 28 : 18)))), E = Math.round((v - w) / 2);
		} else w = u(v, y), T = Math.round((y - w) / 2), E = 0;
		if (O = w / Ie, D = v / (x ? 58 : 95), k = v * (x ? .5 : .56), A = y * (x ? .34 : .37), !x && y <= 560) {
			let e = c.classList.contains("is-docked") ? C : c.offsetTop + c.offsetHeight, t = s.offsetTop - e;
			c.classList.contains("is-docked") || (C = e), t > 40 && (D = Math.min(D, t / 19), A = e + t / 2 + 6 * D);
		}
		j = E + w / 2, M = T + w / 2, I(n, Math.round(v * b), Math.round(y * b)), Object.assign(r.style, {
			top: `${T}px`,
			left: `${E}px`,
			width: `${w}px`,
			height: `${w}px`
		}), I(i, Math.round(w * Math.min(b, 1.5)), Math.round(w * Math.min(b, 1.5))), e.style.setProperty("--side", `${w}px`), e.style.setProperty("--ftop", `${T}px`), L = null, a?.size(), H = !0;
	}, z = (e) => {
		let t = D * (O / D) ** +e, n = X((1 / t - 1 / D) / (1 / O - 1 / D)), r = $(k, j, n), i = $(A, M, n), a = $(Re.x, Ie / 2, n), o = $(Re.y, Ie / 2, n), s = 1 - Z((e - .72) / .26), c = (e, t, n) => t <= n ? X(e, t, n) : (t + n) / 2;
		return a = $(a, c(a, r / t, Ie - (v - r) / t), s), o = $(o, x ? Math.max(o, i / t) : c(o, i / t, Ie - (y - i) / t), s), a = Math.max(a, (r - E * n) / t), {
			z: t,
			w: n,
			ox: r,
			oy: i,
			cx: a,
			cy: o
		};
	}, B = (e) => {
		let t = z(e), r = t.z * b, i = n.width, a = n.height, o = Z((e - .7) / .25), s = $(0, E * b, o), c = $(i, (E + w) * b, o), l = $(0, T * b, o), u = $(a, (T + w) * b, o), d = Math.max(i, a) / r * .75;
		return {
			z: r,
			ox: t.ox * b,
			oy: t.oy * b,
			cx: t.cx,
			cy: t.cy,
			R: d * 1.05 * Z(e / .16),
			finish: Z((e - .78) / .2),
			halfView: d,
			intro: N,
			grow: (t.z / O) ** .6 * b,
			heroBoost: $(1.35, 1, t.w),
			clip: [
				s,
				l,
				c - s,
				u - l
			],
			simple: x && Fe ? [
				1.45,
				1.1,
				0
			] : void 0
		};
	}, ee = (e, t, n, r, i) => {
		let a = h, o = z(e), s = o.z * i, c = o.ox * i, l = o.oy * i, u = Z((e - .7) / .25), d = $(0, E * i, u), f = $(n, (E + w) * i, u), p = $(0, T * i, u), g = $(r, (T + w) * i, u);
		t.save(), t.beginPath(), t.rect(d, p, f - d, g - p), t.clip();
		let _ = Math.max(n, r) / s * .75, v = _ * 1.05 * Z(e / .16), y = Z((e - .78) / .2), b = (o.z / O) ** .6, x = 1.4 * i;
		t.lineCap = t.lineJoin = "round";
		for (let e = 0; e < 3; e++) {
			t.beginPath();
			for (let n = 0; n < a.n; n++) {
				let r = n === F;
				if (e === 2 ? !r : r || e === 1 != (a.level[n] === 2)) continue;
				let i = Math.max(0, v - a.d[n]) * 1.5;
				if (r && (i = Math.max(i, _ * 1.4) * (.02 + .98 * N)), i = Math.max(i, a.len[n] * y), i <= 0) continue;
				let u = n * 4, d = c + (a.box[u] - o.cx) * s, m = l + (a.box[u + 1] - o.cy) * s, h = c + (a.box[u + 2] - o.cx) * s, b = l + (a.box[u + 3] - o.cy) * s;
				if (h < 0 || b < p || d > f || m > g) continue;
				let S = a.c0[n] - i, C = a.c0[n] + i, w = a.start[n], T = w + a.count[n], E = !1, D = -1e9, O = -1e9;
				for (let e = w; e < T; e++) {
					let n = a.cum[e];
					if (n < S) continue;
					if (n > C) break;
					let r = c + (a.x[e] - o.cx) * s, i = l + (a.y[e] - o.cy) * s;
					if (!(E && Math.abs(r - D) + Math.abs(i - O) < x && e < T - 1)) {
						if (r < -60 || i < p - 60 || r > f + 60 || i > g + 60) {
							E && t.lineTo(r, i), E = !1, D = r, O = i;
							continue;
						}
						E || (t.moveTo(D > -1e8 && n > S ? D : r, D > -1e8 && n > S ? O : i), E = !0), t.lineTo(r, i), D = r, O = i;
					}
				}
			}
			t.lineWidth = (e === 0 ? .62 : e === 1 ? 1 : 1.2) * b * i * (e === 2 ? $(1.35, 1, o.w) : 1), t.strokeStyle = `rgba(${Le}, ${e === 0 ? .82 : .92})`, t.stroke();
		}
		m && (t.globalCompositeOperation = "destination-out", t.globalAlpha = .16 * X(b / 4), t.fillStyle = m, t.fillRect(0, 0, n, r), t.globalAlpha = 1, t.globalCompositeOperation = "source-over"), t.restore();
	}, V = -1, te = -1, H = !0, ne = (e) => {
		if (h && P && (H || e !== V || N !== te)) {
			if (V = e, te = N, H = !1, g) {
				g.draw(B(e)) || (V = NaN);
				return;
			}
			_ && (_.setTransform(1, 0, 0, 1, 0, 0), _.clearRect(0, 0, n.width, n.height), e >= 1 && N >= 1 ? (L || (L = document.createElement("canvas"), L.width = n.width, L.height = n.height, ee(1, L.getContext("2d"), n.width, n.height, b)), _.drawImage(L, 0, 0)) : ee(e, _, n.width, n.height, b));
		}
	}, U = NaN, W = pe(), G = !0, K = () => W.snap(), re = (t = performance.now()) => {
		if (S) return ie();
		let i = e.getBoundingClientRect(), o = (e.offsetHeight - y) / y / He, l = X(-i.top / y, 0, (e.offsetHeight - y) / y) / He, u = i.bottom <= 0 || i.top >= y;
		(G || u) && K(), G = u;
		let m = W.step(l, t, (o - l) / Ue), h = m !== l;
		if (m === U && !H) return h;
		U = m;
		let g = X(m / Be), _ = Ne ? g < .5 ? 0 : 1 : $(g, Z(g), .6), v = 1 - Z(m / .32);
		J(s, "opacity", v.toFixed(3)), J(s, "visibility", v > .01 ? "" : "hidden");
		let b = We(m);
		J(c, "opacity", b.toFixed(3)), J(c, "visibility", b > .01 ? "" : "hidden");
		let x = Z((m - 1.7) / .3);
		J(d, "--tx", x.toFixed(3)), J(d, "pointerEvents", x > .5 ? "auto" : "none");
		let C = -1;
		Ve.forEach((e, t) => {
			m >= e - (t ? .3 : .15) && (C = t);
		}), f.forEach((e, t) => {
			e.classList.contains("is-on") !== (t === C) && e.classList.toggle("is-on", t === C), J(e, "--w", (Ne ? 1 : X((m - (Ve[t] - (t ? .3 : .15))) / .4)).toFixed(3));
		});
		let D = (e) => Ve[e] - (e ? .3 : .15), O = o;
		p.forEach((e, t) => {
			let n = D(t), r = t < Ve.length - 1 ? D(t + 1) : O;
			J(e, "--f", (Ne ? +(t <= C) : X((m - n) / (r - n))).toFixed(3));
		});
		let k = Z((m - (Ve[1] - .25)) / .75), A = Z((m - (Ve[2] - .2)) / .5), j = Z((m - (Ve[3] - .2)) / .6);
		a?.draw(k);
		let M = 1 - Z((k - .45) / .55);
		J(n, "opacity", M.toFixed(3)), J(n, "display", M > 0 ? "" : "none"), J(r, "--s3", A.toFixed(3)), J(r, "--s4", j.toFixed(3)), M > 0 ? ne(_) : (H = !1, V = NaN);
		let N = z(_);
		return window.__ln = {
			u: m,
			target: l,
			e: _,
			z: N.z,
			ox: N.ox,
			oy: N.oy,
			cx: N.cx,
			cy: N.cy,
			side: w,
			ftop: T,
			fl: E,
			fill: k,
			lines: M.toFixed(3)
		}, h;
	}, ie = () => (J(s, "opacity", "1"), J(s, "visibility", ""), J(c, "opacity", "1"), J(c, "visibility", ""), J(d, "--tx", "1"), J(d, "pointerEvents", "auto"), f.forEach((e) => {
		e.classList.contains("is-on") || e.classList.add("is-on"), J(e, "--w", "1");
	}), p.forEach((e) => J(e, "--f", "1")), a?.draw(1), J(n, "opacity", "1"), J(n, "display", ""), J(r, "--s3", "1"), J(r, "--s4", "1"), ne(0), U = NaN, !1), q = 0, oe = (e) => {
		q = 0, re(e) && Y();
	}, Y = () => {
		q || (q = requestAnimationFrame(oe));
	};
	R(), addEventListener("scroll", Y, { passive: !0 }), o(() => {
		R(), K(), Y();
	}), addEventListener("hashchange", () => {
		K(), Y();
	}), document.fonts?.ready.then(() => Q).then(() => {
		R(), K(), Y();
	});
	let se = !new URLSearchParams(location.search).has("nogl"), ce = (t) => {
		if (h = t.s, Re.stroke = Me.hero.stroke, Re.x = t.hx, Re.y = t.hy, se) try {
			g = ae(n, h, F, {
				name: "hero lines",
				near: e
			}, t.V && t.I ? {
				V: t.V,
				I: t.I
			} : void 0);
		} catch {
			g = null;
		}
		if (g && (g.onRestore = () => {
			H = !0, Y();
		}), !g) {
			let e = n.cloneNode();
			n.replaceWith(e), n = e, R(), _ = n.getContext("2d");
		}
		g && g.draw({
			...B(0),
			clip: [
				0,
				0,
				0,
				0
			]
		});
	}, le = (e) => {
		h = e.s, F = Re.stroke, g && e.V && e.I && g.data({
			V: e.V,
			I: e.I
		}), L = null, H = !0, U = NaN, Y();
	}, ue = () => {}, Q = new Promise((e) => {
		ue = e;
	}), de = () => {
		P = !0, N = 1, H = !0, U = NaN, Y(), ue();
	}, fe = (e, t) => {
		P = !0;
		let n = Math.max(2 * t, 20), r = 0, i = e, a = (e) => {
			r += Math.min(e - i, n), i = e, N = Z(r / 1700), H = !0, re(e) && Y(), N < 1 ? requestAnimationFrame(a) : ue();
		};
		a(e);
	}, me = Ae(), he = ze, ge = `${globalThis.__P26B}home/hero`, _e = e.querySelector(".ln-alt");
	_e && (_e.textContent = he.alt ?? he.name);
	let ve = Ke(`${ge}/strokes.bin`, Me.hero, se);
	try {
		ce(qe(Me.hero, se)), Ne ? de() : Ze(fe, de);
	} catch {
		de();
	}
	let ye = new Promise((e) => {
		Q.then(e), addEventListener("scroll", () => e(), {
			once: !0,
			passive: !0
		});
	});
	Promise.all([ve, ye]).then(([e]) => le(e)).catch(() => {}), Q.then(() => {
		dispatchEvent(new Event("p26:opening")), me(), a = $e(i, `${ge}/bw.webp`, `${ge}/arrive.webp`, Me.dmax, {
			name: "hero photo",
			near: e
		}), a.ready.then(() => {
			U = NaN, Y();
		}), (window.requestIdleCallback ?? ((e) => setTimeout(e, 600)))(() => {
			for (let [t, n] of [[".ln-true", "true"], [".ln-false", "false"]]) {
				let r = e.querySelector(t);
				r.src = `${ge}/${n}.webp`, r.hidden = !1, r.decode().catch(() => {});
			}
		});
	}), Y();
}
//#endregion
//#region src/home/hero/peek.ts
function tt(e, t) {
	let n = e?.closest("[data-line]");
	if (!e || !n) return;
	let r = e.parentElement, i = e.nextSibling, a = matchMedia("(pointer: coarse)"), o = document.documentElement, s = Math.max(0, scrollY), c = !1, l = !1, u = () => !!e.querySelector(":focus-visible"), d = () => {
		e.classList.add("is-docked", "is-hidden", "no-anim"), n.prepend(e), e.offsetHeight, e.classList.remove("no-anim", "is-hidden"), l = !0;
	}, f = () => {
		e.classList.remove("is-docked", "is-hidden"), e.style.removeProperty("--peek-bg"), r.insertBefore(e, i), l = !1;
	}, p = () => {
		if (c = !1, t() || u()) return;
		let r = Math.max(0, scrollY), i = r - s, m = Ge(n);
		if (l) {
			if (m >= .999) {
				if (parseFloat(e.style.opacity || "1") >= .98) {
					f(), s = r;
					return;
				}
				c = !0, requestAnimationFrame(p);
			}
			e.style.setProperty("--peek-bg", (1 - m).toFixed(3));
		}
		if (!(scrollY < 0 || scrollY > o.scrollHeight - innerHeight + 1) && !(Math.abs(i) < (a.matches ? 16 : 4))) {
			if (s = r, !l) {
				i < 0 && m <= .01 && d();
				return;
			}
			e.classList.toggle("is-hidden", i > 0 && r > e.offsetHeight);
		}
	};
	addEventListener("scroll", () => {
		c || (c = !0, requestAnimationFrame(p));
	}, { passive: !0 });
	let m = () => {
		s = Math.min(Math.max(0, scrollY), Math.max(0, o.scrollHeight - innerHeight));
	};
	addEventListener("resize", m), visualViewport?.addEventListener("resize", m), e.addEventListener("focusin", () => {
		l && u() && e.classList.remove("is-hidden");
	});
}
//#endregion
//#region src/home/domains/strip.ts
var nt = matchMedia("(prefers-reduced-motion: reduce)").matches, rt = Math.max(1, Number(new URLSearchParams(location.search).get("bleedslow")) || 1), it = .7 * rt, at = .38 * rt, ot = {
	bw: 1,
	line: 2
}[document.documentElement.dataset.dm ?? ""] ?? 0, st = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }", ct = "precision highp float;\nuniform vec2 u_res;\nuniform vec4 u_rect;        // slice in device px, top-left origin: x0 y0 x1 y1\nuniform vec4 u_uv;          // the part of the square crop the slice shows: x y w h\nuniform sampler2D u_bw, u_col, u_dist, u_sk;\nuniform vec2 u_origin;      // device px\nuniform float u_fill;       // the hover bleed, 0..1\nuniform float u_recede;     // the retract on leave, 0..1 (0 while hovered)\nuniform float u_sfill;      // ?dm=bw / line: the river's shock, flooding in from u_sorigin (the top edge), 0..1\nuniform float u_srec;       // its scroll-linked retract, 0..1, draining out toward u_rorigin (below the bottom edge)\nuniform vec2 u_sorigin, u_rorigin; // device px\nuniform float u_arr;        // this slice's arrival, 0..1\nuniform float u_flash;      // false colour carried by the arrival, 0..1\nuniform float u_seed, u_dpr, u_time;\nuniform float u_solid;      // a phone: the slice is its colour photograph, as it is, with no front (Evan, 2026-10-22)\nuniform float u_mode;       // 0 the Earth as Art strip; 1 black and white, 2 line, developing into true colour\nconst vec3 BONE = vec3(.933,.933,.902);\nconst vec3 INK  = vec3(.114,.114,.082);\nfloat h21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }\nfloat vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);\n  return mix(mix(h21(i),h21(i+vec2(1,0)),u.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),u.x), u.y); }\nfloat fbm(vec2 p){ float v=0., a=.5; mat2 r=mat2(.8,-.6,.6,.8); for(int k=0;k<5;k++){ v+=a*vnoise(p); p=r*p*2.03+17.1; a*=.5; } return v; }\nfloat farFrom(vec2 o){ vec2 a = u_rect.xy - o, b = u_rect.zw - o;\n  return max(max(length(a), length(b)), max(length(vec2(a.x,b.y)), length(vec2(b.x,a.y)))); }\nfloat farCorner(){ return farFrom(u_origin); }\nvoid main(){\n  vec2 p = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);\n  vec2 r = (p - u_rect.xy) / (u_rect.zw - u_rect.xy);\n  vec2 uv = u_uv.xy + clamp(r, 0., 1.) * u_uv.zw;\n  float lum = texture2D(u_bw, uv).r;\n  vec3 col = texture2D(u_col, uv).rgb;\n  if (u_solid > .5) { gl_FragColor = vec4(col, 1.); return; }\n  vec2 q = p / u_dpr;                                   // css px, so the texture of the edge is the same at any dpr\n  vec3 tone = mix(INK, BONE, smoothstep(.02, .98, lum));\n\n  // ---- the final landscapes: the arrival's wet front runs down from the top edge carrying the true colour in,\n  // over-bright at its edge (the shock), and leaves the place in true colour. Before it: the warm black and white\n  // (warm black to bone, the post images' tone), or bone under the line drawing (an overlay).\n  if (u_mode > .5) {\n    vec3 pre = u_mode < 1.5 ? mix(vec3(.094, .082, .071), vec3(.933, .925, .886), lum) : BONE;\n    // the river's arrival: a short pulse of the place's own colour runs down at the wet edge and is gone (only with\n    // u_flash, which these modes keep at 0: skipping its two fbm saves a third of the shader's cost per pixel)\n    vec3 mb = pre;\n    if (u_flash > 0.) {\n      float ft = smoothstep(.12, .92, u_arr);\n      float lead = r.y * .9 + .14 * (fbm(q * .010 + u_seed + 1.3) - .5) + .05 * (fbm(q * .055 + u_seed + 8.1) - .5);\n      float wetP = ft * 1.25 - lead;\n      float pulse = smoothstep(0., .02, wetP) * (1. - smoothstep(.03, .2, wetP)) * (1. - smoothstep(.8, 1., ft)) * u_flash;\n      float tideP = exp(-pow(wetP / .02, 2.)) * step(0., wetP) * (1. - smoothstep(.85, 1., ft)) * u_flash;\n      mb = mix(pre, mix(col, pre, .2), pulse * .75);\n      mb *= 1. - .1 * tideP;\n    }\n    // Two sources of colour, each with its own front: the river's shock (from the top edge; its retract drains the\n    // colour out through the bottom edge, so the grey comes in from the top) and the hover bleed (from the pointer).\n    // What shows is the union of the two (max). The wet edge, the tide lines and the fresh wash's thinness belong to a\n    // front only where it moves into paper the other source hasn't coloured, so hovering a slice already in colour\n    // changes nothing, hovering a part-retracted one bleeds only into its grey, and leaving takes back only what the\n    // hover added (Evan, 2026-10-22).\n    float mS = 0., wetS = -1., tideS = 0., tideRS = 0.;\n    if (u_sfill > 0. && u_srec < 1.) {\n      float frac = length(p - u_sorigin) / farFrom(u_sorigin);\n      frac *= .82 + .36 * fbm(q * .006 + u_seed);\n      frac += .09 * (lum - .5);\n      frac += .05 * (fbm(q * .045 + u_seed + 3.7 + u_time * .02) - .5);\n      wetS = u_sfill * 1.32 - frac;\n      mS = max(smoothstep(0., .022, wetS), smoothstep(.97, 1., u_sfill));\n      tideS = exp(-pow(wetS / .022, 2.)) * step(0., wetS) * (1. - smoothstep(.94, 1., u_sfill));\n      if (u_srec > 0.) {\n        float fr = length(p - u_rorigin) / farFrom(u_rorigin);\n        fr *= .82 + .36 * fbm(q * .006 + u_seed + 4.4);\n        fr += .14 * (fbm(q * .008 + u_seed + 9.1) - .5) + .03 * (fbm(q * .06 + u_seed + 5.3) - .5);\n        float wetR = mix(1.42, -.16, u_srec) - fr;\n        mS *= smoothstep(0., .03, wetR);\n        tideRS = exp(-pow(wetR / .02, 2.)) * step(-.004, wetR);\n      }\n    }\n    float mH = 0., wetH = -1., tideH = 0., tideRH = 0.;\n    if (u_fill > 0.) {\n      float frac = length(p - u_origin) / farCorner();\n      frac *= .82 + .36 * fbm(q * .006 + u_seed);\n      frac += .09 * (lum - .5);\n      frac += .05 * (fbm(q * .045 + u_seed + 3.7 + u_time * .02) - .5);\n      float f = u_fill * 1.32;\n      wetH = f - frac;\n      mH = max(smoothstep(0., .022, wetH), smoothstep(.97, 1., u_fill));\n      if (u_recede > 0.) {\n        float fr = frac + .14 * (fbm(q * .008 + u_seed + 9.1) - .5) + .03 * (fbm(q * .06 + u_seed + 5.3) - .5);\n        float wetR = mix(f + .04, -.16, u_recede) - fr;\n        mH *= smoothstep(0., .03, wetR);\n        tideRH = exp(-pow(wetR / .02, 2.)) * step(-.004, wetR);\n      }\n      tideH = exp(-pow(wetH / .022, 2.)) * step(0., wetH) * (1. - smoothstep(.94, 1., u_fill));\n    }\n    vec3 o = mb;\n    float m = max(mS, mH);\n    if (m > 0.) {\n      float dil = max(smoothstep(0., .2, wetS) * mS, smoothstep(0., .2, wetH) * mH) / max(m, 1e-3);\n      float tide = max(tideS * (1. - mH), tideH * (1. - mS));\n      float tideR = max(tideRS * (1. - mH), tideRH * (1. - mS));\n      vec3 pig = mix(mix(col, BONE, .3), col, dil);\n      pig = mix(pig, pig * pig * 1.1, .55 * tide);\n      pig = mix(pig, pig * pig * 1.06, .35 * tideR);\n      float gr = .6 * vnoise(q * .16 + u_seed) + .4 * vnoise(q * .42 + u_seed + 2.);\n      pig *= 1. + .16 * (gr - .5) * (1. - .55 * dil);\n      o = mix(mb, pig, m);\n    }\n    gl_FragColor = vec4(o, 1.);\n    return;\n  }\n\n  // ---- arrival: the slice starts as a faint sketch. A wet front runs down from the top edge (where the river will\n  // come in), reaching the drawn lines a little ahead of the paper between them; it carries the false colour at its\n  // edge and leaves the black-and-white photograph behind it as it dries. At 1 the whole slice is the photograph.\n  float t = u_arr;\n  float ft = smoothstep(.12, .92, t);\n  vec2 aux = vec2(texture2D(u_dist, uv).r, texture2D(u_sk, uv).r); // (only this path reads them)\n  float d = sqrt(aux.r);                                        // distance from the drawing, 0..1\n  float lead = r.y * .9 + .2 * d\n    + .14 * (fbm(q * .010 + u_seed + 1.3) - .5)\n    + .05 * (fbm(q * .055 + u_seed + 8.1) - .5);\n  float wetA = ft * 1.4 - lead;\n  float a = smoothstep(0., .028, wetA);\n  a = max(a, smoothstep(.96, 1., ft));\n  float tideA = exp(-pow(wetA / .02, 2.)) * step(0., wetA) * (1. - smoothstep(.9, 1., ft));\n  float band = smoothstep(0., .02, wetA) * (1. - smoothstep(.04, .24, wetA)) * (1. - smoothstep(.82, 1., ft)) * u_flash;\n  float sk = aux.g * (.36 + .4 * smoothstep(0., .14, t)) * (1. - .88 * a);\n  vec3 base = mix(BONE, tone, a);\n  base = mix(base, col, band * .9);\n  base *= 1. - .22 * tideA;\n  base = mix(base, INK, sk * .8);\n\n  // ---- hover: the false colour bleeds in from the pointer\n  vec3 outc = base;\n  if (u_fill > 0.) {\n    float frac = length(p - u_origin) / farCorner();\n    frac *= .82 + .36 * fbm(q * .006 + u_seed);                   // the front isn't a circle\n    frac += .09 * (lum - .5);                                      // it runs ahead through the darker ground\n    frac += .05 * (fbm(q * .045 + u_seed + 3.7 + u_time * .02) - .5);  // fingering at the wet edge\n    float f = u_fill * 1.32;\n    float wet = f - frac;\n    float m = smoothstep(0., .022, wet);\n    m = max(m, smoothstep(.97, 1., u_fill));                      // full colour exactly when the fill completes\n    // the retract: a front from the colour's outer edge back past where it came in, at an uneven speed of its own\n    float tideR = 0.;\n    if (u_recede > 0.) {\n      float edgeR = f + .04;\n      float fr = frac + .14 * (fbm(q * .008 + u_seed + 9.1) - .5) + .03 * (fbm(q * .06 + u_seed + 5.3) - .5);\n      float wetR = mix(edgeR, -.16, u_recede) - fr;\n      m *= smoothstep(0., .03, wetR);\n      tideR = exp(-pow(wetR / .02, 2.)) * step(-.004, wetR);\n    }\n    float dil = smoothstep(0., .2, wet);                           // fresh wash is thinner, then deepens\n    float tide = exp(-pow(wet / .022, 2.)) * step(0., wet) * (1. - smoothstep(.94, 1., u_fill));\n    vec3 pig = mix(mix(col, BONE, .3), col, dil);\n    // pigment pools at the drying edge: darker and a little richer\n    pig = mix(pig, pig * pig * 1.1, .55 * tide);\n    pig = mix(pig, pig * pig * 1.06, .35 * tideR);                 // the retreating edge gathers a little pigment\n    // granulation: pigment settles in the paper's tooth, in soft clumps rather than pixels\n    float gr = .6 * vnoise(q * .16 + u_seed) + .4 * vnoise(q * .42 + u_seed + 2.);\n    pig *= 1. + .16 * (gr - .5) * (1. - .55 * dil);\n    outc = mix(base, pig, m);\n  }\n  gl_FragColor = vec4(outc, 1.);\n}";
function lt(e = {}) {
	let t = e.root ?? document.querySelector("[data-strip]");
	if (!t) return null;
	let n = t.querySelector("[data-strip-row]"), r = n.querySelector("canvas"), i = [...n.querySelectorAll(".dm-slice")], a = null, o = () => X((innerHeight * .07 - (n.getBoundingClientRect().top + De())) / (innerHeight * .3)), s = (t) => {
		if (!ot || nt || t <= 0 || e.shock === !1) return [0, 0];
		let n = X(t * 1.04);
		return c ? [n, 0] : [n, o()];
	}, c = matchMedia("(max-width: 760px)").matches, l = 1, u = 0, d = 0, f = 0, p = -1, m = 0, h = 0, g = !1, _ = i.map((e, t) => ({
		el: e,
		place: e.dataset.place,
		meta: {
			focal: [.5, .5],
			dmax: 40
		},
		enteredAt: null,
		leftAt: null,
		fillAtLeave: 0,
		origin: [.5, .5],
		seed: 3.1 + t * 7.3
	})), v = new URLSearchParams(location.search).has("nogl") ? null : r.getContext("webgl", {
		antialias: !1,
		premultipliedAlpha: !1
	}), y = null, b = {}, x = null, S = () => {
		if (v && (y = D(v, st, ct), y)) {
			v.useProgram(y), N(v, y);
			for (let e of [
				"u_res",
				"u_rect",
				"u_uv",
				"u_bw",
				"u_col",
				"u_dist",
				"u_sk",
				"u_origin",
				"u_fill",
				"u_recede",
				"u_sfill",
				"u_srec",
				"u_sorigin",
				"u_rorigin",
				"u_arr",
				"u_flash",
				"u_seed",
				"u_dpr",
				"u_time",
				"u_solid"
			]) b[e] = v.getUniformLocation(y, e);
			if (v.uniform1i(b.u_bw, 0), v.uniform1i(b.u_col, 1), v.uniform1i(b.u_dist, 2), v.uniform1i(b.u_sk, 3), x) {
				for (let e of _) e.tex = void 0;
				n.classList.remove("has-gl");
				let e = n.getBoundingClientRect();
				e.bottom > 0 && e.top < innerHeight && M(), x();
			}
		}
	};
	S();
	let C = (e, t) => {
		let n = R(v) ? v.createTexture() : null;
		if (!n) return null;
		v.bindTexture(v.TEXTURE_2D, n);
		let r = t ? v.LUMINANCE : v.RGB;
		return v.texImage2D(v.TEXTURE_2D, 0, r, r, v.UNSIGNED_BYTE, e), v.generateMipmap(v.TEXTURE_2D), v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MIN_FILTER, v.LINEAR_MIPMAP_LINEAR), v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MAG_FILTER, v.LINEAR), v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_S, v.CLAMP_TO_EDGE), v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_T, v.CLAMP_TO_EDGE), n;
	}, w = ot ? `${globalThis.__P26B}home/domains-strip` : `${globalThis.__P26B}home/domains`, T = ce, E = !1, O = matchMedia("(max-width: 760px)").matches, k = ot ? O ? ["bw-m.webp", "col-m.webp"] : ["bw.jpg", "col.jpg"] : O ? [
		"bw-m.webp",
		"false-m.webp",
		"dist.jpg",
		"sketch-m.webp"
	] : [
		"bw.jpg",
		"false.jpg",
		"dist.jpg",
		"sketch.png"
	], A = (e) => {
		let t = () => {
			let t = window.requestIdleCallback;
			t ? t(e, { timeout: 1500 }) : setTimeout(e, 200);
		}, n = () => {
			je().then(t);
		};
		document.readyState === "complete" ? n() : addEventListener("load", n, { once: !0 });
	}, j = [], M = () => {
		for (let [e, t] of j.splice(0)) e.setAttribute("src", t), e.hidden = !1;
		L();
	};
	n.querySelectorAll("img.dm-img").forEach((e) => {
		let t = e.getAttribute("src");
		t && (e.dataset.small = t, ot && (e.dataset.big = t.replace(/\.jpg$/, "-2k.jpg")), v && !e.complete && (j.push([e, t]), e.removeAttribute("src"), e.hidden = !0));
	}), v && se(n, () => {
		n.classList.contains("has-gl") || M();
	}, O ? "0%" : "60%"), A(() => (e.meta ? Promise.resolve(e.meta) : fetch(`${w}/strip.json`).then((e) => e.json())).then(async (e) => {
		if (_.forEach((t) => {
			e[t.place] && (t.meta = e[t.place]);
		}), I = !0, L(), v) {
			let e = () => O ? new Promise((e) => requestAnimationFrame(() => e())) : ue(n), t = 0, r = async () => {
				let n = ++t, r = _.map((e) => Promise.all(k.map((t) => T(`${e.el.dataset.src ?? `${w}/${e.place}`}/${t}`))));
				for (let i = 0; i < _.length; i++) {
					let a = _[i], o = await r[i];
					if (n !== t) return;
					let [s, c, l, u] = ot ? [o[0], o[1]] : o;
					await e();
					let d = C(s, !0);
					await e();
					let f = C(c, !1), p = d, m = d;
					if (l && u && (await e(), p = C(l, !0), await e(), m = C(u, !0)), n !== t || !d || !f || !p || !m) return;
					a.tex = {
						bw: d,
						col: f,
						dist: p,
						sk: m
					};
					for (let e of o) "close" in e && e.close();
					K = "", q();
				}
			};
			x = () => {
				r().then(() => {
					_.every((e) => e.tex) && (K = "", n.classList.add("has-gl"), q());
				}).catch(() => {});
			}, await r(), await e(), E = !0, K = "", re(performance.now()), K = "", _.every((e) => e.tex) && n.classList.add("has-gl");
		}
		E = !0, q();
	}).catch(() => {
		M();
	}));
	let P = () => {
		c = matchMedia("(max-width: 760px)").matches, l = Math.min(devicePixelRatio || 1, 2), u = n.clientWidth, d = n.clientHeight;
		let e = getComputedStyle(n), t = _.length, i = Number(e.getPropertyValue("--grow")) || 3.4;
		f = c ? u : (u - (parseFloat(e.columnGap) || 0) * (t - 1)) * i / (i + t - 1), r.width = Math.round(u * l), r.height = Math.round(d * l), q();
	};
	new ResizeObserver(P).observe(n), v && y && H(r, v, {
		name: e.name ?? "strip",
		near: n,
		margin: 1
	}, S, () => {
		K = "", q();
	}), v && r.addEventListener("webglcontextlost", () => {
		y = null;
	});
	let F = (e, t, n, r = 1) => {
		let i = Math.max(t, Math.max(f, e) / r), a = Math.min(1, e / (i * r)), o = Math.min(1, t / i);
		return [
			X(n[0] - a / 2, 0, 1 - a),
			X(n[1] - o / 2, 0, 1 - o),
			a,
			o
		];
	}, I = !1, L = () => {
		if (I) for (let e of _) {
			let t = e.el.clientWidth, n = e.el.clientHeight, r = ot ? e.meta.aspect ?? 1 : 1, [i, a, o, s] = F(t, n, e.meta.focal, r), c = t / o, l = n / s;
			e.el.querySelectorAll("img.dm-img").forEach((e) => {
				if (e.style.cssText = `inset:auto;left:0;top:0;width:${c.toFixed(1)}px;height:${l.toFixed(1)}px;object-fit:fill;transform:translate(${(-i * c).toFixed(1)}px,${(-a * l).toFixed(1)}px)`, e.dataset.big && !e.hidden) {
					let t = innerWidth > 760 && c * (devicePixelRatio || 1) > 1500 ? e.dataset.big : e.dataset.small;
					e.getAttribute("src") !== t && e.setAttribute("src", t);
				}
			});
		}
	}, z = (e, t, n, r) => {
		if (c) return 1;
		if (a != null) return X(a * 1.4 - e * .1);
		let i = De();
		return t += i, r += i, X(X((n * .82 - t) / (n * .56)) * 1.4 - e * .1);
	}, B = (e) => nt ? +(e > .5) : e, ee = (e) => +!nt, V = (e, t) => e.enteredAt == null ? 0 : e.leftAt == null ? nt ? 1 : 1 - (1 - X((t - e.enteredAt) / 1e3 / it)) ** 2.6 : nt ? 0 : e.fillAtLeave, te = (e, t) => e.leftAt == null || e.enteredAt == null ? 0 : nt ? 1 : X((t - e.leftAt) / 1e3 / at) ** 1.3, ne = (e, t) => {
		let n = V(e, t), r = te(e, t);
		return r <= 0 ? n : X((n * 1.32 + .04 + r * (-.16 - n * 1.32 - .04)) / 1.32);
	}, U = !!ot && e.shock !== !1, W = (e) => 1, G = (e) => {
		let t = _.map((t) => {
			let n = t.el.getBoundingClientRect();
			return Math.abs(n.top + n.height / 2 - e / 2);
		}), n = t.indexOf(Math.min(...t));
		return _.map((r, i) => i === n ? Z(1 - (t[i] / (e / 2) - .06) / .3) : 0);
	}, K = "", re = (e) => {
		if (!v || !y || !E || !u || !R(v)) return;
		let t = c && !U, i = n.getBoundingClientRect(), a = innerHeight, d = t ? G(a) : null, f = `${r.width}x${r.height}|${_.filter((e) => e.tex).length}|${ot && !c ? o().toFixed(3) : ""}`;
		for (let n = 0; n < _.length; n++) {
			let r = _[n], o = r.el.getBoundingClientRect(), s = B(z(n, i.top, a, o.top)), l = c ? t ? s >= .97 ? d[n] : 0 : W(s) : s >= .97 ? V(r, e) : 0, u = !c && s >= .97 ? te(r, e) : 0;
			f += `|${(o.left - i.left).toFixed(1)},${o.width.toFixed(1)},${s.toFixed(3)},${l.toFixed(3)},${u.toFixed(3)}`;
		}
		if (f === K) return;
		K = f, v.viewport(0, 0, r.width, r.height), v.uniform2f(b.u_res, r.width, r.height), v.uniform1f(b.u_dpr, l), v.uniform1f(b.u_time, e / 1e3), v.enable(v.SCISSOR_TEST);
		let p = n.getBoundingClientRect(), m = innerHeight, h = t ? G(m) : null;
		for (let t = 0; t < _.length; t++) {
			let n = _[t];
			if (c && U && J(n.el, "--fill", W(B(z(t, p.top, m, n.el.getBoundingClientRect().top))).toFixed(3)), !n.tex) continue;
			let i = n.el.getBoundingClientRect(), a = (i.left - p.left) * l, o = (i.top - p.top) * l, u = a + i.width * l, d = o + i.height * l;
			v.scissor(Math.floor(a), Math.floor(r.height - d), Math.ceil(u - a), Math.ceil(d - o)), v.uniform4f(b.u_rect, a, o, u, d), v.uniform4f(b.u_uv, ...F(i.width, i.height, n.meta.focal, n.meta.aspect));
			let f = B(z(t, p.top, m, i.top));
			J(n.el, "--arr", f.toFixed(3)), v.uniform1f(b.u_arr, f), v.uniform1f(b.u_flash, ee(f)), v.uniform1f(b.u_seed, n.seed), v.uniform1f(v.getUniformLocation(y, "u_mode"), ot), v.uniform1f(b.u_solid, +!!c), ot && v.uniform1f(b.u_flash, 0);
			let x = 0, S = 0, C = n.origin[0], w = n.origin[1], T = 0, E = 0;
			c && U ? T = W(f) : c ? (x = f >= .97 ? h[t] : 0, C = .04, w = .5) : f >= .97 && (x = V(n, e), S = te(n, e)), S >= 1 && (x = 0), g && (x = 1, S = 0), ot && !c && ([T, E] = s(f)), E >= 1 && (T = 0), $[t] = Math.max(S > 0 ? x * (1 - S) : x, T * (1 - E)), v.uniform2f(b.u_origin, a + C * (u - a), o + w * (d - o)), v.uniform1f(b.u_fill, x), v.uniform1f(b.u_recede, S), v.uniform1f(b.u_sfill, T), v.uniform1f(b.u_srec, E), v.uniform2f(b.u_sorigin, a + .5 * (u - a), o - .12 * (d - o)), v.uniform2f(b.u_rorigin, a + .5 * (u - a), o + 1.12 * (d - o)), v.activeTexture(v.TEXTURE0), v.bindTexture(v.TEXTURE_2D, n.tex.bw), v.activeTexture(v.TEXTURE1), v.bindTexture(v.TEXTURE_2D, n.tex.col), v.activeTexture(v.TEXTURE2), v.bindTexture(v.TEXTURE_2D, n.tex.dist), v.activeTexture(v.TEXTURE3), v.bindTexture(v.TEXTURE_2D, n.tex.sk), v.drawArrays(v.TRIANGLE_STRIP, 0, 4);
		}
		v.disable(v.SCISSOR_TEST);
	}, ie = (e) => {
		let t = n.getBoundingClientRect(), r = innerHeight, i = c && !U ? G(r) : null;
		_.forEach((n, a) => {
			let o = n.el.getBoundingClientRect(), l = B(z(a, t.top, r, o.top)), u = c && U ? W(l) : l >= .97 ? i ? i[a] : ne(n, e) : 0;
			if (ot && !c) {
				let [e, t] = s(l);
				t < 1 && (u = Math.max(u, e * (1 - t)));
			}
			$[a] = u, J(n.el, "--arr", l.toFixed(3)), J(n.el, "--fill", (g ? 1 : u).toFixed(3));
		});
	}, ae = () => {
		m = 0;
		let e = performance.now(), t = n.getBoundingClientRect(), i = t.bottom > -40 && t.top < innerHeight + 40;
		if (Y(r, i), !i) {
			K = "";
			return;
		}
		v ? re(e) : ie(e), I && !n.classList.contains("has-gl") && L(), de.length && pe(), (Oe() || _.some((t) => t.enteredAt != null && t.leftAt == null && e - t.enteredAt < it * 1e3 + 50 || t.leftAt != null && e - t.leftAt < at * 1e3 + 50) || e < h) && (m = requestAnimationFrame(ae));
	}, q = (e = 0) => {
		h = Math.max(h, performance.now() + e), m || (m = requestAnimationFrame(ae));
	};
	addEventListener("scroll", () => q(), { passive: !0 });
	let oe = (e, t) => {
		if (c || e === p) return;
		let r = performance.now();
		p >= 0 && le(p, r), p = e;
		let a = _[e], o = a.leftAt == null ? 0 : ne(a, r);
		a.enteredAt = r - (o > 0 ? it * 1e3 * (1 - (1 - o) ** (1 / 2.6)) : 0), a.leftAt = null, o <= .02 && (a.origin = t), n.classList.add("has-active"), i.forEach((t, n) => t.classList.toggle("is-active", n === e)), q(520);
	}, le = (e, t) => {
		let n = _[e];
		n.enteredAt != null && n.leftAt == null && (n.fillAtLeave = V(n, t), n.leftAt = t);
	}, Q = () => {
		p < 0 || (le(p, performance.now()), p = -1, n.classList.remove("has-active"), i.forEach((e) => e.classList.remove("is-active")), q(520));
	};
	i.forEach((e, t) => {
		e.addEventListener("pointerenter", (n) => {
			if (n.pointerType === "touch") return;
			let r = e.getBoundingClientRect();
			oe(t, [X((n.clientX - r.left) / r.width), X((n.clientY - r.top) / r.height)]);
		}), e.addEventListener("focus", () => oe(t, [.5, .82])), e.addEventListener("blur", () => {
			n.contains(document.activeElement) || Q();
		});
	}), n.addEventListener("pointerleave", (e) => {
		e.pointerType !== "touch" && !n.contains(document.activeElement) && Q();
	});
	let $ = [], de = [], fe = [], pe = () => {
		_.forEach((e, t) => {
			let n = de[t];
			if (!n) return;
			let r = e.el.getBoundingClientRect(), [i, a] = fe[t], [o, s, c, l] = F(r.width, r.height, e.meta.focal, e.meta.aspect);
			n.setAttribute("viewBox", `${(o * i).toFixed(1)} ${(s * a).toFixed(1)} ${(c * i).toFixed(1)} ${(l * a).toFixed(1)}`), J(n, "opacity", (1 - Z((($[t] ?? 0) - .55) / .4)).toFixed(3));
		});
	};
	ot === 2 && se(n, () => {
		_.forEach((e, t) => fetch(`${globalThis.__P26B}home/domains/${e.place}/line.json`).then((e) => e.json()).then((n) => {
			let r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			r.setAttribute("class", "dm-ln"), r.setAttribute("aria-hidden", "true"), r.setAttribute("preserveAspectRatio", "none"), r.innerHTML = `<path d="${n.d}" />`, e.el.append(r), de[t] = r, fe[t] = [n.w, n.h], q();
		}).catch(() => {}));
	}, "300%");
	let me = (e) => {
		let t = n.getBoundingClientRect(), r = _.length, i = parseFloat(getComputedStyle(n).columnGap) || 0, a = (n.clientWidth - i * (r - 1)) / r;
		return {
			left: t.left + n.clientLeft + e * (a + i),
			width: a
		};
	}, he = () => c ? _.length - 1 : 2;
	ot && (n.peelFrom = () => {
		let e = _[he()]?.el;
		if (!e) return null;
		let t = e.getBoundingClientRect(), n = t.bottom + scrollY, r = c ? t.left + t.width * .86 : (({ left: e, width: t }) => e + t * .86)(me(he()));
		return {
			pts: [
				[r, n - 8],
				[r, n - 5],
				[r, n - 3],
				[r, n - 1]
			],
			bottom: n
		};
	}), ot && (n.peelRest = () => {
		if (c) return !0;
		if (n.classList.contains("has-active")) return !1;
		let e = _[he()]?.el;
		if (!e) return !0;
		let t = e.getBoundingClientRect(), r = me(he());
		return Math.abs(t.left - r.left) < .75 && Math.abs(t.width - r.width) < .75;
	}), P(), n.__uv = () => _.map((e) => {
		let t = e.el.getBoundingClientRect();
		return F(t.width, t.height, e.meta.focal, e.meta.aspect);
	});
	let ge = { setArrival(e) {
		let t = e == null ? null : X(e);
		t !== a && (a = t, q());
	} };
	return e.root || (window.__strip = ge), ge.setRest = (e) => {
		g = e, K = "", q();
	}, ge;
}
//#endregion
//#region src/home/river/river.ts
var ut = matchMedia("(prefers-reduced-motion: reduce)").matches, dt = .7, ft = 1.7, pt = .84, mt = 1.04, ht = 1.25, gt = 3, _t = .42, vt = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }", yt = `precision highp float;
uniform vec2 u_res;           // canvas, device px
uniform float u_dpr, u_R, u_Rr, u_seed;  // u_Rr: the retract front, in arrival-time units (large = not retracting)
uniform vec2 u_frame;         // the frame's width in css px, and the share of the field it takes (the field's split)
uniform vec4 u_hole;          // a label the wash keeps clear of (css px x0 y0 x1 y1), or all zero
uniform float u_holeK;        // how much it clears: 1 = flows around it (desktop), less = passes faintly behind (phone)
uniform float u_fx;           // the frame's left edge, css px (a phone's frame can be narrower than the screen, centred)
uniform vec4 u_hole2;         // a second label (a phone: §01's text, which the streams pass behind on their way down)
uniform float u_over;         // css px of the canvas above the frame's lower edge (under the frame): the first row repeats there
uniform sampler2D u_field, u_img;
const float T_MAX = ${ht.toFixed(2)};
const float BAND = ${_t.toFixed(2)};
const vec3 BONE = vec3(.933,.933,.902);
// Sandur's two pigments: the infrared red of the outwash and the cyan of the glacier's meltwater
const vec3 RED = vec3(.86,.24,.15);
const vec3 CYA = vec3(.30,.74,.79);
const vec3 WATER = vec3(.07,.25,.32);   // the channels themselves: in the false colour, water is a deep blue-black
float h21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),u.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; mat2 r=mat2(.8,-.6,.6,.8); for(int k=0;k<5;k++){ v+=a*vnoise(p); p=r*p*2.03+17.1; a*=.5; } return v; }
vec3 sat(vec3 c, float k){ float l = dot(c, vec3(.3,.59,.11)); return clamp(mix(vec3(l), c, k), 0., 1.); }
void main(){
  vec2 css = u_res / u_dpr;
  vec2 p0 = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y) / u_dpr;   // css px, top-left origin of the canvas
  vec2 p = vec2(p0.x, max(0., p0.y - u_over));                         // from the frame's lower edge
  css.y -= u_over;
  // field coordinates: the frame's width maps to the field's first part, the rest of the page to the remainder
  float qx = p.x - u_fx; // x across the frame
  if (u_frame.y > .99 && (qx < 0. || qx > u_frame.x)) { gl_FragColor = vec4(0.); return; } // a phone: only below the frame
  if (p0.y < u_over && (qx < 0. || qx > u_frame.x)) { gl_FragColor = vec4(0.); return; } // the overlap is only under the frame
  float fx = qx < u_frame.x ? qx / u_frame.x * u_frame.y : u_frame.y + (qx - u_frame.x) / max(1., css.x - u_fx - u_frame.x) * (1. - u_frame.y);
  vec4 f = texture2D(u_field, vec2(fx, p.y / css.y));
  float T = f.r * T_MAX;
  if (T >= T_MAX - .01) { gl_FragColor = vec4(0.); return; }
  float conc = f.g, melt = f.b;
  // the front isn't smooth: broad lobes, and a finer fray at the wet edge
  float Tn = T + .045 * (fbm(p * .014 + u_seed) - .5) + .018 * (fbm(p * .08 + u_seed + 4.1) - .5);
  float wet = u_R - Tn;
  // the retract: one front that starts at the wash's outer edge and moves back toward the frame. Its speed is uneven
  // (its own noise, not the advancing edge's), so the paper between the channels clears first and the colour
  // withdraws last up the channels themselves, as the lab's retract clears shallow bleed first.
  float Tr = T + .07 * (fbm(p * .009 + u_seed + 9.1) - .5) + .015 * (fbm(p * .07 + u_seed + 2.3) - .5);
  float wetR = u_Rr - Tr;
  float m = smoothstep(0., .01, wet) * smoothstep(0., .02, wetR);
  if (m <= 0.) { gl_FragColor = vec4(0.); return; }
  // colour: inside the frame's width it's the capture's own colour, read from the band mirrored about the edge,
  // made into pigment (richer, lighter); elsewhere the two pigments by the meltwater weight
  vec3 own = texture2D(u_img, vec2(clamp(qx / u_frame.x, 0., 1.), 1. - p.y / css.y * BAND)).rgb;
  own = sat(own * 1.18 + .04, 1.45);
  vec3 pal = mix(RED, CYA, melt);
  float inFrame = 1. - smoothstep(u_frame.x - 30., u_frame.x + 30., qx);
  vec3 pig = mix(pal, mix(own, pal, .25 + .5 * melt), inFrame);
  // the channels carry on as they are in the frame: deep blue-black water veins inside the wash
  float vein = smoothstep(.55, .95, conc);
  pig = mix(pig, mix(WATER, CYA, .25 * melt), vein * .85);
  // pigment separation: the cyan runs a little ahead of the red, so the advancing edge is cool and the body warm
  float sep = (1. - smoothstep(0., .08, wet)) * (1. - vein);
  pig = mix(pig, CYA, .62 * sep);
  // fresh wash is thin, then deepens as more pigment arrives
  float dil = smoothstep(0., .14, wet);
  float alpha = (.36 + .58 * dil) * (.4 + .6 * conc);
  // pigment pools at the drying edge: a darker, richer tide line
  float tide = exp(-pow(wet / .012, 2.));
  pig = mix(pig, pig * pig * 1.08, .45 * tide);
  alpha = min(1., alpha + .25 * tide * (.3 + .7 * conc));
  // granulation: it settles in the paper's tooth, in soft clumps
  float gr = .6 * vnoise(p * .23 + u_seed) + .4 * vnoise(p * .6 + u_seed + 2.);
  alpha *= 1. + .3 * (gr - .5) * (1. - .45 * dil);
  // the retreating edge gathers pigment as it withdraws: a faint, fine tide line (the lab's quick-and-precise retract)
  float tideR = exp(-pow(wetR / .016, 2.)) * step(-.004, wetR) * step(u_Rr, 5.);
  pig = mix(pig, pig * pig * 1.06, .4 * tideR);
  alpha = min(1., alpha + .18 * tideR * (.4 + .6 * conc));
  // held back behind a label
  if (u_hole.z > u_hole.x) {
    vec2 dd = max(u_hole.xy - p, p - u_hole.zw);
    float inside = 1. - smoothstep(-34., 2., max(dd.x, dd.y));
    alpha *= 1. - u_holeK * inside;
  }
  if (u_hole2.z > u_hole2.x) {
    vec2 dd = max(u_hole2.xy - p, p - u_hole2.zw);
    alpha *= 1. - u_holeK * (1. - smoothstep(-34., 2., max(dd.x, dd.y)));
  }
  // premultiplied: iOS Safari composites a WebGL canvas as premultiplied whatever the context asked for, so straight
  // colour over a low alpha came out as added light (a white, glowing wash over §01's text on a phone)
  float a = clamp(alpha * m, 0., 1.);
  gl_FragColor = vec4(pig * a, a);
}`;
function bt(e) {
	let t = document.querySelector("[data-strip]"), n = document.querySelector("[data-line]"), r = document.querySelector("[data-river]");
	if (!t || !n || !r) return;
	let i = matchMedia("(max-width: 760px)");
	if (St(t, n, i), ut) {
		e?.setArrival(1), r.hidden = !0;
		return;
	}
	if (!i.matches) {
		Ct(e, t, n, r, i);
		return;
	}
	e?.setArrival(1), r.hidden = !0;
	let a = () => {
		i.matches || (i.removeEventListener("change", a), Ct(e, t, n, r, i));
	};
	i.addEventListener("change", a);
}
var xt = 172;
function St(e, t, n) {
	let r = t.querySelector(".ln-stick"), i = t.querySelector(".ln-text");
	if (!r || !i) return;
	let a = () => {
		if (!n.matches) {
			e.style.paddingTop = "";
			return;
		}
		let t = r.offsetHeight - (i.getBoundingClientRect().bottom - r.getBoundingClientRect().top);
		e.style.paddingTop = `${Math.max(0, Math.round(xt - t))}px`;
	};
	a(), n.addEventListener("change", a), o(a), new ResizeObserver(a).observe(i);
}
function Ct(e, t, n, r, i) {
	let s = r.querySelector("canvas"), c = t.querySelector("[data-strip-row]"), d = t.querySelector(".dm-head"), f = n.querySelector(".ln-false"), p = 0, m = 0, h = 1, g = !1, _ = 0, v = 0, y = 0, b = 1, x = 0, S = 0, C = [
		0,
		0,
		0,
		0
	], w = [
		0,
		0,
		0,
		0
	], T = 0, E = 0, O = new URLSearchParams(location.search).has("nogl") ? null : s.getContext("webgl", {
		premultipliedAlpha: !0,
		antialias: !1
	}), k = null, A = {}, j = null, M = null, P = null, F = null, I = () => !!f && f.complete && f.naturalWidth > 0, L = () => {
		R(O) && F && M && (O.bindTexture(O.TEXTURE_2D, M), O.texImage2D(O.TEXTURE_2D, 0, O.RGB, O.RGB, O.UNSIGNED_BYTE, F));
	}, z = () => {
		f && !F && ce(f.currentSrc || f.src).then((e) => {
			F = e, L(), G = !0, le();
		}).catch(() => {});
	}, B = () => {
		R(O) && P && j && (O.bindTexture(O.TEXTURE_2D, j), O.texImage2D(O.TEXTURE_2D, 0, O.RGBA, O.RGBA, O.UNSIGNED_BYTE, P));
	}, ee = () => {
		if (!O || (k = D(O, vt, yt), !k)) return;
		O.useProgram(k), N(O, k);
		for (let e of [
			"u_res",
			"u_dpr",
			"u_R",
			"u_Rr",
			"u_seed",
			"u_frame",
			"u_hole",
			"u_holeK",
			"u_fx",
			"u_hole2",
			"u_field",
			"u_img",
			"u_over"
		]) A[e] = O.getUniformLocation(k, e);
		O.uniform1i(A.u_field, 0), O.uniform1i(A.u_img, 1), O.uniform1f(A.u_seed, 11.7);
		let e = () => {
			let e = O.createTexture();
			return O.bindTexture(O.TEXTURE_2D, e), O.texParameteri(O.TEXTURE_2D, O.TEXTURE_MIN_FILTER, O.LINEAR), O.texParameteri(O.TEXTURE_2D, O.TEXTURE_MAG_FILTER, O.LINEAR), O.texParameteri(O.TEXTURE_2D, O.TEXTURE_WRAP_S, O.CLAMP_TO_EDGE), O.texParameteri(O.TEXTURE_2D, O.TEXTURE_WRAP_T, O.CLAMP_TO_EDGE), e;
		};
		j = e(), M = e(), O.texImage2D(O.TEXTURE_2D, 0, O.RGB, 1, 1, 0, O.RGB, O.UNSIGNED_BYTE, new Uint8Array([
			200,
			60,
			40
		])), L(), B();
	};
	ee(), O && s.addEventListener("webglcontextlost", () => {
		j = M = null;
	}), O && k && f && (I() ? z() : f.addEventListener("load", z, { once: !0 }));
	let V = "", te = (e) => {
		O && V !== e && (V = e, ce(`${globalThis.__P26B}home/river/field-${e}.png`).then((e) => {
			P = e, B(), ne = !0, G = !0, le();
		}).catch(() => {}));
	}, ne = !1, U = () => {
		if (p = innerWidth, m = a(), h = Math.min(devicePixelRatio || 1, p <= 760 ? 1 : 1.5), g = l(p, innerHeight), w = [
			0,
			0,
			0,
			0
		], T = 0, g) {
			_ = p;
			let e = n.querySelector(".ln-stick"), t = n.querySelector(".ln-frame"), r = n.querySelector(".ln-text");
			if (e && t) {
				let n = e.getBoundingClientRect(), i = t.getBoundingClientRect();
				if (v = Math.max(0, Math.round(n.bottom - i.bottom)), T = i.left, E = i.width, r) {
					let e = r.getBoundingClientRect();
					w = [
						e.left - 10,
						e.top - i.bottom - 10,
						e.right + 10,
						e.bottom - i.bottom + 10
					];
				}
			} else v = 0, E = p;
		} else _ = u(p, m), v = Math.round((m - _) / 2);
		y = (n.querySelector(".ln-stick")?.offsetHeight ?? m) - v, t.style.setProperty("--side", `${_}px`);
		let e = (t.querySelector("[data-river-stop]") ?? c).getBoundingClientRect().top - t.getBoundingClientRect().top;
		x = t.clientWidth, S = v + e, Object.assign(r.style, {
			top: `${-v - gt}px`,
			height: `${S + gt}px`
		}), b = Math.max(1, S + y - .7 * m), s.width = Math.round(x * h), s.height = Math.round((S + gt) * h), s.style.width = `${x}px`, s.style.height = `${S + gt}px`;
		let i = (d.querySelector("[data-river-hole]") ?? d).getBoundingClientRect(), o = r.getBoundingClientRect();
		C = [
			i.left - o.left - 14,
			i.top - o.top - gt - 14,
			i.right - o.left + 14,
			i.bottom - o.top - gt + 14
		], Z && te(g ? "m" : "d");
		let f = document.documentElement.scrollHeight - m, D = r.getBoundingClientRect().top + gt + scrollY, O = (e) => (y - (D - e)) / b * dt, k = O(f), A = t.querySelector(".dm-foot") ?? c, j = d.getBoundingClientRect().top + scrollY, M = (A ? A.getBoundingClientRect().bottom + scrollY : j) - j, N = g || M > m ? j - 40 : j - (m - M) / 2;
		mt = Math.min(1.2, k - .02, O(N) - .03), pt = Math.max(.8688235294117647, mt - .2), G = !0;
	}, W = -1, G = !0, K = () => m * .35, re = () => {
		let e = r.getBoundingClientRect().top + gt, t = y - e, n = t - De(), i = X(t / K());
		return Math.max(0, (t + (n - t) * i) / b * dt);
	}, ie = (e) => e <= dt ? e : dt + (e - dt) * ft, ae = (e) => {
		let t = X((e - pt) / (mt - pt));
		if (t <= 0) return 9;
		let n = Math.min(ie(e), ht) + .06;
		return n - t ** 1.3 * (n + .14);
	}, q = () => {
		if (r.hidden = i.matches, !O || !k || !ne || !R(O)) return;
		let e = r.getBoundingClientRect(), t = !i.matches && e.bottom > -40 && e.top < m + 40 && W > 0 && W < mt;
		Y(s, t), t && (O.viewport(0, 0, s.width, s.height), O.clearColor(0, 0, 0, 0), O.clear(O.COLOR_BUFFER_BIT), O.uniform2f(A.u_res, s.width, s.height), O.uniform1f(A.u_over, gt), O.uniform1f(A.u_dpr, h), O.uniform1f(A.u_R, Math.min(ie(W), 1.02)), O.uniform1f(A.u_Rr, ae(W)), O.uniform2f(A.u_frame, g ? E : _, g ? 1 : .625), O.uniform1f(A.u_fx, T), O.uniform4f(A.u_hole2, ...w), O.uniform4f(A.u_hole, ...C), O.uniform1f(A.u_holeK, g ? .82 : 1), O.activeTexture(O.TEXTURE0), O.bindTexture(O.TEXTURE_2D, j), O.activeTexture(O.TEXTURE1), O.bindTexture(O.TEXTURE_2D, M), O.drawArrays(O.TRIANGLE_STRIP, 0, 4));
	}, oe = 0, J = () => {
		oe = 0;
		let t = re();
		e?.setArrival(X((ie(t) - .6699999999999999) / .3)), (Math.abs(t - W) > 1e-4 || G) && (W = t, G = !1, q()), window.__river = {
			R: W,
			Hc: S,
			side: _,
			ftop: v,
			pinB: y,
			span: b,
			RET0: pt,
			RET1: mt,
			LAND: dt
		}, Oe() && le();
	}, le = () => {
		oe || (oe = requestAnimationFrame(J));
	};
	addEventListener("scroll", le, { passive: !0 });
	let ue = 0;
	o(() => {
		clearTimeout(ue), ue = window.setTimeout(() => {
			U(), le();
		}, 120);
	}), new ResizeObserver(() => {
		U(), le();
	}).observe(c);
	let Z = !1;
	se(t, () => {
		Z = !0, te(g ? "m" : "d");
	}), O && k && H(s, O, {
		name: "river",
		near: r,
		margin: .5
	}, ee, () => {
		G = !0, le();
	}), U(), le();
}
//#endregion
//#region src/home/research/ink-gl.ts
var wt = [
	29 / 255,
	29 / 255,
	21 / 255
], Tt = "#version 300 es\nin vec2 p; in vec2 nrm; in float gate; in float w; in float dry; in float a; in float s; in float side; in vec3 col;\nuniform vec2 view; uniform float off, dpr;\nout float vSide; out float vW; out float vGate; out float vDry; out float vA; out float vS; out vec3 vCol;\nvoid main() {\n  float wd = w * dpr;\n  float hw = 0.5 * wd + 1.0;\n  vec2 q = vec2(p.x, p.y - off) * dpr + nrm * side * hw;\n  vSide = side * hw; vW = wd; vGate = gate; vDry = dry; vA = a; vS = s; vCol = col;\n  gl_Position = vec4(q.x / view.x * 2. - 1., 1. - q.y / view.y * 2., 0., 1.);\n}", Et = "#version 300 es\nprecision highp float;\nin float vSide; in float vW; in float vGate; in float vDry; in float vA; in float vS; in vec3 vCol;\nuniform float tip, grain;\nout vec4 o;\nfloat hash(vec2 q) { return fract(sin(dot(q, vec2(12.9898, 78.233))) * 43758.5453); }\nfloat vnoise(vec2 q) {\n  vec2 c = floor(q), f = fract(q); f = f * f * (3. - 2. * f);\n  return mix(mix(hash(c), hash(c + vec2(1., 0.)), f.x), mix(hash(c + vec2(0., 1.)), hash(c + vec2(1., 1.)), f.x), f.y);\n}\nvoid main() {\n  if (vGate > tip) discard;\n  float cov = clamp(0.5 * vW + 0.5 - abs(vSide), 0., 1.);\n  cov *= min(vW, 1.);\n  // the dry-pen grain of the line prototype: in patches, a few pixels inside a wide line catch less ink\n  vec2 g = gl_FragCoord.xy / 9.;\n  float pt = vnoise(g);\n  float h = hash(floor(gl_FragCoord.xy));\n  cov *= 1. - grain * smoothstep(.55, .9, pt) * step(.6, h);\n  // running dry: bristles (noise across the stroke, stretched along it) let go one by one\n  if (vDry > 0.001) {\n    float across = vSide / max(vW * 0.5, 1.) ;            // -1 … 1 across the stroke\n    float br = vnoise(vec2(vS * 0.04, across * 4.6 + 7.)) * 0.72 + vnoise(vec2(vS * 0.19, across * 11.)) * 0.28;\n    cov *= smoothstep(vDry - 0.06, vDry + 0.08, br);\n  }\n  float al = cov * vA;\n  o = vec4(vCol * al, al);\n}";
function Dt(e, t = (e, t) => e.w[t], n = 2) {
	let r = 0, i = 0;
	for (let t of e) r += t.x.length, i += Math.max(0, t.x.length - 1);
	let a = new Float32Array(r * 2 * 14), o = new Uint32Array(i * 6), s = 0, c = 0, l = 0;
	for (let r of e) {
		let e = r.x.length;
		for (let i = 0; i < e; i++) {
			let u = i > 0 ? i - 1 : i, d = i < e - 1 ? i + 1 : i, f = r.x[i] - r.x[u], p = r.y[i] - r.y[u], m = r.x[d] - r.x[i], h = r.y[d] - r.y[i], g = Math.hypot(f, p), _ = Math.hypot(m, h);
			g < 1e-6 && (f = m, p = h, g = _), _ < 1e-6 && (m = f, h = p, _ = g), g < 1e-6 && (f = m = 1, p = h = 0, g = _ = 1), f /= g, p /= g, m /= _, h /= _;
			let v = f + m, y = p + h, b = Math.hypot(v, y);
			b < 1e-6 ? (v = m, y = h) : (v /= b, y /= b);
			let x = -y, S = v, C = Math.min(n, 1 / Math.max(.5, x * -p + S * f));
			x *= C, S *= C;
			let w = r.c ? r.c[i * 3] : wt[0], T = r.c ? r.c[i * 3 + 1] : wt[1], E = r.c ? r.c[i * 3 + 2] : wt[2], D = t(r, i);
			for (let e of [-1, 1]) a.set([
				r.x[i],
				r.y[i],
				x,
				S,
				r.gate[i],
				D,
				r.dry[i],
				r.a[i],
				r.s[i],
				e,
				0,
				w,
				T,
				E
			], s), s += 14;
			if (i < e - 1) {
				let e = (l + i) * 2;
				o.set([
					e,
					e + 1,
					e + 2,
					e + 1,
					e + 3,
					e + 2
				], c), c += 6;
			}
		}
		l += e;
	}
	return {
		V: a,
		I: o
	};
}
function Ot(e, t, n) {
	let r = e.getContext("webgl2", {
		premultipliedAlpha: !0,
		alpha: !0,
		antialias: !1
	});
	if (!r) return null;
	let i = null, a = null, o = null, s = {}, c = 0, l = Dt(t), u = () => {
		R(r) && (r.bindVertexArray(i), r.bindBuffer(r.ARRAY_BUFFER, a), r.bufferData(r.ARRAY_BUFFER, l.V, r.STATIC_DRAW), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, o), r.bufferData(r.ELEMENT_ARRAY_BUFFER, l.I, r.STATIC_DRAW), c = l.I.length);
	}, d = () => {
		let e = D(r, Tt, Et);
		if (!e) return !1;
		r.useProgram(e), i = r.createVertexArray(), r.bindVertexArray(i), a = r.createBuffer(), r.bindBuffer(r.ARRAY_BUFFER, a), o = r.createBuffer(), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, o);
		let t = (t, n, i) => {
			let a = r.getAttribLocation(e, t);
			a < 0 || (r.enableVertexAttribArray(a), r.vertexAttribPointer(a, n, r.FLOAT, !1, 56, i * 4));
		};
		return t("p", 2, 0), t("nrm", 2, 2), t("gate", 1, 4), t("w", 1, 5), t("dry", 1, 6), t("a", 1, 7), t("s", 1, 8), t("side", 1, 9), t("col", 3, 11), s = Object.fromEntries([
			"view",
			"off",
			"dpr",
			"tip",
			"grain"
		].map((t) => [t, r.getUniformLocation(e, t)])), r.enable(r.BLEND), r.blendEquation(r.MAX), r.blendFunc(r.ONE, r.ONE), u(), !0;
	};
	if (!d()) return null;
	let f = {
		onRestore: () => {},
		draw(t, n, a) {
			if (!R(r)) return;
			let o = e.width, l = e.height;
			r.viewport(0, 0, o, l), r.clearColor(0, 0, 0, 0), r.clear(r.COLOR_BUFFER_BIT), r.uniform2f(s.view, o, l), r.uniform1f(s.off, t), r.uniform1f(s.dpr, a), r.uniform1f(s.tip, n), r.uniform1f(s.grain, .32), r.bindVertexArray(i), r.drawElements(r.TRIANGLES, c, r.UNSIGNED_INT, 0);
		},
		upload(e) {
			l = Dt(e), u();
		}
	};
	return H(e, r, n, d, () => f.onRestore()), f;
}
//#endregion
//#region src/home/research/wash-gl.ts
var kt = "#version 300 es\nin vec2 p; in vec2 nrm; in float gate; in float w; in float dry; in float a; in float s; in float side; in vec3 col;\nuniform vec2 view; uniform float off, dpr;\nout vec2 vPg; out float vSide; out float vGate; out float vDry; out float vA; out vec3 vCol;\nvoid main() {\n  vec2 pg = p + nrm * side * 0.5 * w;               // page (section) px\n  vPg = pg; vSide = side; vGate = gate; vDry = dry; vA = a; vCol = col;\n  vec2 q = vec2(pg.x, pg.y - off) * dpr;\n  gl_Position = vec4(q.x / view.x * 2. - 1., 1. - q.y / view.y * 2., 0., 1.);\n}", At = "#version 300 es\nprecision highp float;\nin vec2 vPg; in float vSide; in float vGate; in float vDry; in float vA; in vec3 vCol;\nuniform sampler2D img;\nuniform vec4 aff;    // page px -> 2000-px image coordinates: (ax, bx, ay, by)\nuniform float tip, wick, rec, dens;\nuniform vec2 canvasPx; // the canvas size in device px: the wash fades out before either edge, never a cut\nuniform float feather;\nuniform float inset;   // device px of the canvas beyond the screen, top and bottom (the fade is at the screen's edges)\nout vec4 o;\nfloat hash(vec2 q) { return fract(sin(dot(q, vec2(12.9898, 78.233))) * 43758.5453); }\nfloat vn(vec2 q) { vec2 c = floor(q), f = fract(q); f = f * f * (3. - 2. * f);\n  return mix(mix(hash(c), hash(c + vec2(1., 0.)), f.x), mix(hash(c + vec2(0., 1.)), hash(c + vec2(1., 1.)), f.x), f.y); }\nfloat fbm(vec2 q) { float a = .5, s = 0.; for (int i = 0; i < 4; i++) { s += a * vn(q); q *= 2.03; a *= .5; } return s; }\nvoid main() {\n  float wet = tip - vGate;\n  if (wet <= 0.) discard;\n  bool own = vCol.r >= 0.;\n  // the pigment wicks out from the channel over the next stretch of the pen's travel\n  float spread = smoothstep(0., wick, wet);\n  // the wash's reach varies along the channel: pools here, a thin seep there; a lobed, ragged edge\n  float nl = fbm(vPg / 210. + 3.1), n = fbm(vPg / 70.), n2 = fbm(vPg / 24. + 7.3);\n  float r = (.25 + .75 * spread) * clamp(.42 + .72 * nl + .26 * (n - .5) + .04 * (n2 - .5), .2, 1.);\n  float across = abs(vSide);\n  float body = 1. - smoothstep(r - .3, r, across);\n  if (body <= 0.002) discard;\n  float tide = smoothstep(r - .2, r - .04, across) * (1. - smoothstep(r - .04, r, across));\n  // the place's colour around here (a blurred read of the photograph: water and land together, not the water alone)\n  vec3 c = own ? vCol : textureLod(img, vec2(aff.x * vPg.x + aff.y, aff.z * vPg.y + aff.w) / 2000., 2.6).rgb; // the source is 512 px: mip 2.6 here is the same blur as mip 4.6 of the old 2048 px file\n  // the photograph's colour as pigment: lifted and a little more saturated (the water is near-black in the picture)\n  float l = dot(c, vec3(.3, .55, .15));\n  c = clamp(mix(vec3(l), c, 1.55) * (1. + .45 * (1. - smoothstep(.0, .4, l))) + .1 * (1. - l), 0., 1.);\n  float gran = vn(vPg / 3.2) * .5 + vn(vPg / 9.) * .5;\n  float d = dens * (1. + .55 * tide) * (.8 + .4 * fbm(vPg / 30. + 1.7)) * (1. + .25 * (smoothstep(.45, .85, gran) - .4));\n  d *= 1. - smoothstep(.02, .75, vDry * 1.35);         // dead ends dry first\n  d *= vA;\n  // no hard edges: the trunk's wash ramps in from nothing as it comes down from the strip (so the colour never starts\n  // at a line where the section begins), and the canvas fades out before its own top and bottom edges\n  d *= smoothstep(-20., 560., vPg.y);\n  d *= smoothstep(inset, inset + feather, gl_FragCoord.y) * smoothstep(inset, inset + feather, canvasPx.y - gl_FragCoord.y);\n  if (own && rec > 0.) {                                // the pool's wet edges retract with the bloom (top down)\n    float ord = n * .35 + n2 * .1;\n    d *= smoothstep(0., .08, ord - (rec * 1.5 - .3));\n  }\n  float al = clamp(d * body, 0., 1.);\n  o = vec4(c * al, al);\n}";
function jt(e, t, n) {
	let r = e.getContext("webgl2", {
		premultipliedAlpha: !0,
		alpha: !0,
		antialias: !1
	});
	if (!r) return null;
	let i = null, a = null, o = null, s = null, c = null, l = {}, u = !1, d = 0, f = !1, p = null, m = null, h = null, g = () => {
		p && R(r) && (r.bindVertexArray(a), r.bindBuffer(r.ARRAY_BUFFER, o), r.bufferData(r.ARRAY_BUFFER, p.V, r.STATIC_DRAW), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, s), r.bufferData(r.ELEMENT_ARRAY_BUFFER, p.I, r.STATIC_DRAW), d = p.I.length);
	}, _ = () => {
		m && R(r) && (r.bindTexture(r.TEXTURE_2D, c), r.texImage2D(r.TEXTURE_2D, 0, r.RGB, r.RGB, r.UNSIGNED_BYTE, m), r.generateMipmap(r.TEXTURE_2D), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR_MIPMAP_LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE));
	}, v = () => {
		if (i = D(r, kt, At), !i) return !1;
		r.useProgram(i), a = r.createVertexArray(), r.bindVertexArray(a), o = r.createBuffer(), r.bindBuffer(r.ARRAY_BUFFER, o), s = r.createBuffer(), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, s);
		let e = (e, t, n) => {
			let a = r.getAttribLocation(i, e);
			a < 0 || (r.enableVertexAttribArray(a), r.vertexAttribPointer(a, t, r.FLOAT, !1, 56, n * 4));
		};
		return e("p", 2, 0), e("nrm", 2, 2), e("gate", 1, 4), e("w", 1, 5), e("dry", 1, 6), e("a", 1, 7), e("side", 1, 9), e("col", 3, 11), c = r.createTexture(), l = Object.fromEntries([
			"view",
			"off",
			"dpr",
			"tip",
			"wick",
			"rec",
			"dens",
			"aff",
			"img",
			"canvasPx",
			"feather",
			"inset"
		].map((e) => [e, r.getUniformLocation(i, e)])), r.uniform1i(l.img, 0), r.enable(r.BLEND), r.blendEquation(r.MAX), r.blendFunc(r.ONE, r.ONE), g(), _(), !0;
	};
	if (!v()) return null;
	let y = (e) => {
		m = e, _(), u = !0, h?.();
	}, b = {
		onRestore: () => {},
		upload(e, t) {
			p = Dt(e, t, 1.15), g();
		},
		draw(t, n, o, s) {
			if (!R(r)) return;
			let f = e.width, p = e.height;
			r.viewport(0, 0, f, p), r.clearColor(0, 0, 0, 0), r.clear(r.COLOR_BUFFER_BIT), u && (r.useProgram(i), r.activeTexture(r.TEXTURE0), r.bindTexture(r.TEXTURE_2D, c), r.uniform2f(l.view, f, p), r.uniform1f(l.off, t), r.uniform1f(l.dpr, o), r.uniform1f(l.tip, n), r.uniform1f(l.wick, s.wick), r.uniform1f(l.rec, s.rec), r.uniform1f(l.dens, s.dens), r.uniform4f(l.aff, ...s.aff), r.uniform2f(l.canvasPx, f, p), r.uniform1f(l.feather, 56 * o), r.uniform1f(l.inset, (s.inset ?? 0) * o), r.bindVertexArray(a), r.drawElements(r.TRIANGLES, d, r.UNSIGNED_INT, 0));
		},
		set onReady(e) {
			h = e;
		},
		load() {
			f || (f = !0, ce(t).then(async (t) => {
				await ue(e.parentElement ?? e), y(t);
			}).catch(() => {}));
		}
	};
	return H(e, r, n, v, () => b.onRestore()), b;
}
//#endregion
//#region src/home/research/geometry.ts
function Mt(e, t, n) {
	let r = e.yUnit === "w" ? t : n, i = e.map;
	return {
		ax: 1 / (i.kx * t),
		bx: i.X0 - i.ox / i.kx,
		ay: 1 / (i.ky * r),
		by: i.Y0 - i.oy / i.ky,
		U: r
	};
}
function Nt(e) {
	let t = e * 2654435761 >>> 0;
	return () => {
		t |= 0, t = t + 1831565813 | 0;
		let e = Math.imul(t ^ t >>> 15, 1 | t);
		return e = e + Math.imul(e ^ e >>> 7, 61 | e) ^ e, ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function Pt(e, t = 1.5, n = 0) {
	let r = [], i = [], a = e.length;
	for (let o = n; o < a - 1; o++) {
		let n = e[Math.max(0, o - 1)], s = e[o], c = e[o + 1], l = e[Math.min(a - 1, o + 2)], u = Math.hypot(c[0] - s[0], c[1] - s[1]), d = Math.max(2, Math.ceil(u / t));
		for (let e = 0; e < d; e++) {
			let t = e / d, a = t * t, o = a * t;
			r.push(.5 * (2 * s[0] + (-n[0] + c[0]) * t + (2 * n[0] - 5 * s[0] + 4 * c[0] - l[0]) * a + (-n[0] + 3 * s[0] - 3 * c[0] + l[0]) * o)), i.push(.5 * (2 * s[1] + (-n[1] + c[1]) * t + (2 * n[1] - 5 * s[1] + 4 * c[1] - l[1]) * a + (-n[1] + 3 * s[1] - 3 * c[1] + l[1]) * o));
		}
	}
	return r.push(e[a - 1][0]), i.push(e[a - 1][1]), {
		xs: r,
		ys: i
	};
}
function Ft(e) {
	return {
		x: Float32Array.from(e.x),
		y: Float32Array.from(e.y),
		w: Float32Array.from(e.w),
		gate: Float32Array.from(e.gate),
		dry: Float32Array.from(e.dry),
		a: Float32Array.from(e.a),
		s: Float32Array.from(e.s)
	};
}
function It(e, t, n, r = .4) {
	let i = [n], a = [0];
	for (let n = 1; n < e.length; n++) {
		let o = Math.hypot(e[n] - e[n - 1], t[n] - t[n - 1]);
		a.push(a[n - 1] + o), i.push(i[n - 1] + Math.max(t[n] - t[n - 1], r * o));
	}
	return {
		g: i,
		s: a
	};
}
function Lt(e, t, n, r, i = []) {
	let a = e.yUnit === "w" ? t : n, o = [], s = {}, c = {}, l = {};
	for (let n of [...e.paths, ...i]) {
		let u = i.includes(n), d = n.pts;
		if (n === e.paths[0] && r != null && !u) {
			let e = r - d[0][0], t = d.length - 1;
			d = d.map(([n, r], i) => [n + e * (1 - Q(0, .35, i / t)), r]);
		}
		let f = d.map(([e, n]) => u ? [e, n] : [e * t, n * a]), p = f[0][1];
		if (n.from) {
			let e = s[n.from], t = 0, r = Infinity;
			for (let n = 0; n < e.x.length; n++) {
				let i = (e.x[n] - f[0][0]) ** 2 + (e.y[n] - f[0][1]) ** 2;
				i < r && (r = i, t = n);
			}
			f[0] = [e.x[t], e.y[t]], p = e.gate[t];
		}
		let m = 0, h = NaN;
		if (n.after) {
			let e = s[n.after], t = e.x.length - 1, r = t;
			for (; r > 0 && Math.hypot(e.x[t] - e.x[r], e.y[t] - e.y[r]) < 10;) r--;
			f.unshift([e.x[t], e.y[t]]), p = e.gate[t], r < t && (f.unshift([e.x[r], e.y[r]]), m = 1), h = e.w[t];
		}
		if (n.to && s[n.to]) {
			let e = s[n.to], [t, r] = f[f.length - 1], i = 0, a = Infinity;
			for (let n = 0; n < e.x.length; n++) {
				let o = (e.x[n] - t) ** 2 + (e.y[n] - r) ** 2;
				o < a && (a = o, i = n);
			}
			f[f.length - 1] = [e.x[i], e.y[i]];
		}
		let { xs: g, ys: _ } = Pt(f, 1.5, m), v = Nt(n.seed), y = [
			v() * 6.28,
			v() * 6.28,
			v() * 6.28,
			v() * 6.28
		], b = [
			260 + v() * 200,
			(n.tw ?? 90) * (.85 + v() * .3),
			140 + v() * 80
		], x = It(g, _, 0), S = [], C = [], w = [], T = x.s[x.s.length - 1];
		for (let e = 0; e < g.length; e++) {
			let t = x.s[e], r = Math.max(0, e - 1), i = Math.min(g.length - 1, e + 1), a = g[i] - g[r], o = _[i] - _[r], s = Math.hypot(a, o) || 1;
			a /= s, o /= s;
			let c = (n.from || n.after ? Q(0, 70, t) : 1) * (n.pin ? 1 - Q(T - n.pin, T, t) : 1), l = (n.drift * Math.sin(t / b[0] * 6.28 + y[0]) + n.tremor * (.65 * Math.sin(t / b[1] * 6.28 + y[1]) + .35 * Math.sin(t / (b[1] * .43) * 6.28 + y[2]))) * c;
			S.push(g[e] - o * l), C.push(_[e] + a * l);
			let u = 1 + .12 * Math.sin(t / b[2] * 6.28 + y[3]), d = n.from ? .45 + .55 * Q(0, 60, t) : 1, f = n.thinTo ? 1 + (n.thinTo - 1) * Q(T * .55, T, t) : 1, p = n.w * u * d * f;
			w.push(Number.isNaN(h) ? p : h + (p - h) * Q(0, 140, t));
		}
		let { g: E, s: D } = It(S, C, p, n.side);
		if (n.settle) {
			let e = Math.max(0, p - C[0]), t = -Infinity;
			for (let r = 0; r < E.length; r++) t = Math.max(t, E[r] - e * Q(0, n.settle, D[r])), E[r] = t;
		}
		let O = {
			x: S,
			y: C,
			w,
			s: D,
			gate: E,
			dry: S.map(() => 0),
			a: S.map(() => .93)
		};
		s[n.id] = O;
		let k = S.length - 1;
		c[n.id] = {
			x: S[k],
			y: C[k],
			gate: E[k]
		}, l[n.id] = {
			x: S,
			y: C,
			gate: E
		}, n.end === "dry" && zt(O, n.dryLen), n.end === "fray" && Bt(O, o, n.seed), o.push(Object.assign(Ft(O), { id: n.id }));
	}
	return {
		strokes: o,
		ends: c,
		lines: l,
		built: Object.fromEntries(Object.entries(s).map(([e, t]) => [e, {
			x: t.x,
			y: t.y,
			gate: t.gate,
			w: t.w
		}])),
		U: a
	};
}
function Rt(e, t, n = 12) {
	let r = [], i = (e, t) => {
		let n = r[r.length - 1];
		(!n || Math.hypot(n[0] - e, n[1] - t) > 6) && r.push([e, t]);
	}, a = (e, t) => {
		let r = Math.hypot(t[0] - e[0], t[1] - e[1]), a = Math.max(1, Math.round(r / n));
		for (let n = 1; n <= a; n++) i(e[0] + (t[0] - e[0]) * n / a, e[1] + (t[1] - e[1]) * n / a);
	}, o = e[0];
	i(o[0], o[1]);
	for (let r = 1; r < e.length; r++) {
		let s = e[r - 1], c = e[r], l = e[r + 1];
		if (!l) {
			a(o, c);
			break;
		}
		let u = Math.hypot(c[0] - s[0], c[1] - s[1]) || 1, d = Math.hypot(l[0] - c[0], l[1] - c[1]) || 1, f = Math.min(t, u * .45, d * .45), p = [c[0] - (c[0] - s[0]) / u * f, c[1] - (c[1] - s[1]) / u * f], m = [c[0] + (l[0] - c[0]) / d * f, c[1] + (l[1] - c[1]) / d * f];
		a(o, p);
		let h = Math.max(3, Math.round(f * 1.6 / n));
		for (let e = 1; e < h; e++) {
			let t = e / h;
			i((1 - t) ** 2 * p[0] + 2 * (1 - t) * t * c[0] + t * t * m[0], (1 - t) ** 2 * p[1] + 2 * (1 - t) * t * c[1] + t * t * m[1]);
		}
		o = m;
	}
	return r;
}
function zt(e, t = 340) {
	t = Math.min(t, e.s[e.s.length - 1] * .8);
	let n = e.s[e.s.length - 1];
	for (let r = 0; r < e.x.length; r++) {
		let i = Q(n - t, n, e.s[r]);
		e.dry[r] = i ** 1.1 * 1.12, e.w[r] *= 1 - .25 * i;
	}
}
function Bt(e, t, n) {
	let r = Nt(n * 31), i = e.x.length - 1, a = e.s[i];
	for (let t = 0; t < e.x.length; t++) {
		let n = Q(a - 120, a, e.s[t]);
		e.w[t] *= 1 - .4 * n, e.dry[t] = .45 * n;
	}
	let o = e.x[i] - e.x[i - 6], s = e.y[i] - e.y[i - 6], c = Math.hypot(o, s) || 1;
	o /= c, s /= c;
	let l = e.w[i];
	for (let n = 0; n < 6; n++) {
		let a = (n / 5 - .5) * l * .9, c = (n / 5 - .5) * .9 + (r() - .5) * .25, u = 40 + r() * 55, d = (r() - .5) * .035, f = e.x[i] - s * a, p = e.y[i] + o * a, m = [f], h = [p];
		for (let e = 1.5; e <= u; e += 1.5) {
			c += d;
			let e = Math.cos(c), t = Math.sin(c);
			f += (o * e - s * t) * 1.5, p += (o * t + s * e) * 1.5, m.push(f), h.push(p);
		}
		let { g, s: _ } = It(m, h, e.gate[i]);
		t.push(Object.assign(Ft({
			x: m,
			y: h,
			s: _,
			gate: g,
			w: _.map((e) => (1.1 + r() * .8) * (1 - .5 * e / u)),
			dry: _.map((e) => (e / u) ** 1.2 * 1.15),
			a: _.map(() => .85)
		}), { hair: !0 }));
	}
}
//#endregion
//#region src/home/research/channels.ts
var Vt = {
	yUnit: "w",
	survivor: "survivor",
	mouth: [.8266, 1.1071],
	map: {
		ox: .04,
		oy: -.03,
		kx: .0008070175438596492,
		ky: .0008070175438596492,
		X0: 330,
		Y0: 4
	},
	beats: [
		[
			.96,
			.17,
			"right",
			380
		],
		[
			.04,
			.68,
			"left",
			330
		],
		[
			.04,
			.86,
			"left",
			330
		],
		[
			.78,
			1.125,
			"right",
			340
		]
	],
	paths: [
		{
			id: "trunk",
			w: 6.5,
			tremor: .5,
			drift: 1.5,
			seed: 1,
			pts: [
				[.3066, -.013],
				[.3064, -.0088],
				[.3063, -.0046],
				[.3061, -5e-4],
				[.3064, .0037],
				[.3066, .0079],
				[.3068, .0121],
				[.3071, .0163],
				[.3072, .0204],
				[.3074, .0246],
				[.3075, .0288],
				[.3077, .033],
				[.3078, .0372],
				[.3078, .0414],
				[.3077, .0455],
				[.3077, .0497],
				[.3076, .0539],
				[.3076, .0581],
				[.3076, .0623],
				[.3077, .0665],
				[.3078, .0706],
				[.3078, .0748],
				[.3079, .079],
				[.308, .0832],
				[.3083, .0874],
				[.3085, .0916],
				[.3087, .0957],
				[.309, .0999],
				[.3092, .1041],
				[.3098, .1082],
				[.3104, .1124],
				[.3111, .1165],
				[.3117, .1206],
				[.3123, .1248],
				[.3132, .1289],
				[.3143, .1329],
				[.3154, .1369],
				[.3165, .141],
				[.3177, .145],
				[.3193, .1489],
				[.3211, .1526],
				[.3232, .1562],
				[.3254, .1598],
				[.3275, .1634],
				[.3299, .1669],
				[.3324, .1702],
				[.3352, .1733],
				[.3381, .1764],
				[.3409, .1794],
				[.3438, .1825],
				[.3466, .1856],
				[.3494, .1887],
				[.3521, .1919],
				[.3549, .195],
				[.3576, .1982],
				[.3599, .2017],
				[.3617, .2055],
				[.363, .2095],
				[.3642, .2135],
				[.3654, .2175],
				[.3665, .2215],
				[.3671, .2257],
				[.3674, .2298],
				[.3676, .234],
				[.3678, .2382],
				[.3679, .2424],
				[.3682, .2465],
				[.369, .2507],
				[.3698, .2548],
				[.3707, .2589],
				[.3715, .263],
				[.3723, .2671],
				[.3734, .2711],
				[.3746, .2751],
				[.3759, .2791],
				[.3771, .2831],
				[.3784, .2871],
				[.3796, .2911],
				[.3807, .2951],
				[.3818, .2991],
				[.383, .3032],
				[.3841, .3072],
				[.385, .3113],
				[.3857, .3154],
				[.3861, .3196],
				[.3863, .3238],
				[.3865, .3279],
				[.3868, .3321],
				[.387, .3363],
				[.3869, .3405],
				[.3868, .3447],
				[.3867, .3489],
				[.3867, .353],
				[.387, .3572],
				[.3879, .3613],
				[.3894, .3652],
				[.3912, .369],
				[.3929, .3728],
				[.3947, .3766],
				[.3966, .3803],
				[.3991, .3836],
				[.4016, .387],
				[.4041, .3903],
				[.4067, .3937],
				[.4094, .3968],
				[.4125, .3997],
				[.4158, .4022],
				[.4192, .4046],
				[.4226, .4071],
				[.4259, .4097],
				[.4289, .4126],
				[.4317, .4157],
				[.4345, .4188],
				[.4372, .422],
				[.4396, .4254],
				[.4415, .4292],
				[.4431, .4331],
				[.4444, .437],
				[.4457, .441],
				[.4471, .4449],
				[.4483, .4489],
				[.4495, .453],
				[.4507, .457],
				[.4519, .461],
				[.453, .465],
				[.4546, .4689],
				[.4563, .4727],
				[.458, .4765],
				[.4597, .4804],
				[.4613, .4842],
				[.4632, .488],
				[.4651, .4917],
				[.4663, .4942]
			]
		},
		{
			id: "early",
			w: 4.4,
			tremor: .9,
			drift: 1.2,
			seed: 2,
			pts: [
				[.369, .2507],
				[.369, .2549],
				[.3689, .2591],
				[.3689, .2633],
				[.3688, .2674],
				[.3688, .2716],
				[.3688, .2758],
				[.3687, .28],
				[.3687, .2842],
				[.3686, .2884],
				[.3686, .2926],
				[.3685, .2967],
				[.3685, .3009],
				[.3685, .3051],
				[.3684, .3093],
				[.3684, .3135],
				[.3683, .3177],
				[.3683, .3218],
				[.3683, .326],
				[.3682, .3302],
				[.3682, .3344],
				[.3681, .3386],
				[.3681, .3428],
				[.3681, .347],
				[.368, .3511],
				[.368, .3553],
				[.3679, .3595],
				[.3679, .3637],
				[.3678, .3679],
				[.3678, .3721],
				[.3678, .3763],
				[.3679, .3804],
				[.3682, .3845],
				[.3687, .3885],
				[.3695, .3925],
				[.3704, .3964],
				[.3716, .4003],
				[.3729, .4042],
				[.374, .4082],
				[.3749, .4122],
				[.3757, .4163],
				[.3761, .4205],
				[.376, .4246],
				[.3757, .4288],
				[.3753, .433],
				[.3749, .4371],
				[.3745, .4413],
				[.3743, .4454],
				[.3741, .4496],
				[.3739, .4538],
				[.3738, .458],
				[.3736, .4621],
				[.3737, .4663],
				[.3741, .4705],
				[.3747, .4746],
				[.3752, .4787],
				[.3757, .4829],
				[.3761, .487],
				[.3762, .4912],
				[.3762, .4954],
				[.3761, .4996],
				[.376, .5037],
				[.3759, .5079],
				[.3755, .5121],
				[.3747, .5162],
				[.3739, .5202],
				[.373, .5243],
				[.3722, .5284],
				[.3714, .5325],
				[.3706, .5366],
				[.3698, .5407],
				[.3691, .5448],
				[.3683, .5489],
				[.3676, .5531],
				[.3671, .5572],
				[.3669, .5614],
				[.3667, .5655],
				[.3665, .5697],
				[.3663, .5739],
				[.3664, .5781],
				[.3668, .5822],
				[.3675, .5863],
				[.3683, .5904],
				[.3691, .5945],
				[.3693, .5987],
				[.3688, .6028],
				[.3676, .6068],
				[.3658, .6106],
				[.3634, .614],
				[.3604, .6169],
				[.357, .6193],
				[.3533, .6211],
				[.3492, .6222],
				[.3451, .6225],
				[.3409, .6221],
				[.3368, .6214],
				[.3327, .6207],
				[.3286, .6198],
				[.3246, .6186],
				[.3209, .6167],
				[.3176, .6142],
				[.3146, .6112],
				[.3118, .6082],
				[.3088, .6053],
				[.3055, .6027],
				[.3018, .6008],
				[.2979, .5994],
				[.2938, .5985],
				[.2897, .5981],
				[.2855, .5985],
				[.2815, .5996],
				[.2776, .6012],
				[.274, .6032],
				[.2704, .6053],
				[.2666, .6072],
				[.2627, .6085],
				[.2586, .6095],
				[.2545, .6102],
				[.2504, .6109],
				[.2462, .6114],
				[.2421, .6117],
				[.2379, .6116],
				[.2337, .6114],
				[.2296, .6108],
				[.2255, .6098],
				[.2217, .6082],
				[.2183, .6058],
				[.2152, .603],
				[.2124, .5999],
				[.2098, .5966],
				[.2075, .5931],
				[.2056, .5894],
				[.2041, .5855],
				[.2027, .5816],
				[.2013, .5777],
				[.1998, .5738],
				[.1982, .5699],
				[.1965, .5661],
				[.1947, .5623],
				[.1929, .5586],
				[.1912, .5548],
				[.1894, .551],
				[.1874, .5473],
				[.1855, .5436],
				[.1835, .54],
				[.1813, .5364],
				[.1788, .5331],
				[.1757, .5303],
				[.1722, .528],
				[.1685, .5261],
				[.1646, .5246],
				[.1605, .5235],
				[.1564, .5231],
				[.1522, .5234],
				[.1481, .524],
				[.144, .5249],
				[.14, .5259],
				[.136, .5272],
				[.1322, .5289],
				[.1285, .5309],
				[.1249, .5329],
				[.1212, .535],
				[.1178, .5374],
				[.1148, .5402],
				[.1121, .5435],
				[.1096, .5468],
				[.1071, .5501],
				[.1045, .5534],
				[.1016, .5564],
				[.0984, .5591],
				[.0951, .5616],
				[.0917, .564],
				[.0882, .5664],
				[.0846, .5683],
				[.0806, .5695],
				[.0764, .5701],
				[.0723, .5706],
				[.0681, .5709],
				[.064, .571],
				[.0598, .5705],
				[.0558, .5695],
				[.0518, .5681],
				[.0479, .5668],
				[.0439, .5654],
				[.04, .564]
			],
			tw: 64,
			end: "fray",
			from: "trunk"
		},
		{
			id: "right",
			w: 5,
			tremor: .6,
			drift: 1.5,
			seed: 3,
			pts: [
				[.4709, .5034],
				[.473, .507],
				[.4752, .5106],
				[.4773, .5142],
				[.4794, .5178],
				[.4815, .5214],
				[.4838, .5249],
				[.486, .5285],
				[.4882, .532],
				[.4904, .5356],
				[.4927, .5391],
				[.4953, .5423],
				[.498, .5455],
				[.5006, .5488],
				[.5033, .552],
				[.5059, .5552],
				[.509, .558],
				[.5122, .5608],
				[.5154, .5635],
				[.5185, .5662],
				[.5217, .5689],
				[.5251, .5713],
				[.5287, .5734],
				[.5323, .5755],
				[.536, .5776],
				[.5396, .5797],
				[.5434, .5815],
				[.5472, .5831],
				[.5512, .5844],
				[.5552, .5857],
				[.5592, .5869],
				[.5631, .5882],
				[.5672, .589],
				[.5714, .5894],
				[.5755, .5899],
				[.5797, .5903],
				[.5839, .5908],
				[.588, .5913],
				[.5922, .5918],
				[.5963, .5923],
				[.6005, .5928],
				[.6046, .5933],
				[.6088, .5938],
				[.6129, .5944],
				[.617, .595],
				[.6212, .5956],
				[.6253, .5962],
				[.6294, .5969],
				[.6336, .5975],
				[.6376, .5987],
				[.6416, .5999],
				[.6456, .6011],
				[.6496, .6023],
				[.6536, .6035],
				[.6575, .605],
				[.6613, .6067],
				[.6651, .6085],
				[.6689, .6103],
				[.6726, .6121],
				[.6764, .6138],
				[.6801, .6158],
				[.6838, .6177],
				[.6875, .6197],
				[.6912, .6216],
				[.6949, .6236],
				[.6986, .6255],
				[.7023, .6274],
				[.7061, .6293],
				[.7098, .6312],
				[.7135, .6331],
				[.7172, .635],
				[.7208, .6372],
				[.7243, .6395],
				[.7278, .6418],
				[.7312, .6441],
				[.7347, .6464],
				[.7383, .6487],
				[.7419, .6507],
				[.7456, .6526],
				[.7493, .6545],
				[.7532, .6562],
				[.7572, .6573],
				[.7613, .6577],
				[.7655, .6573],
				[.7696, .6564],
				[.7735, .6549],
				[.7771, .6529],
				[.7803, .6502],
				[.7831, .647],
				[.7854, .6436],
				[.7874, .6399],
				[.7893, .6362],
				[.7911, .6324],
				[.7926, .6285],
				[.7941, .6246],
				[.7956, .6207],
				[.7971, .6168],
				[.7987, .6129],
				[.8008, .6093],
				[.8031, .6058],
				[.8053, .6022],
				[.8075, .5987],
				[.8097, .5951],
				[.8117, .5915],
				[.8134, .5877],
				[.8151, .5839],
				[.8168, .5801],
				[.8185, .5762],
				[.8203, .5724],
				[.8222, .5687],
				[.8241, .565],
				[.8261, .5613],
				[.828, .5576],
				[.83, .5539],
				[.8321, .5503],
				[.8345, .5469],
				[.8369, .5435],
				[.8393, .5401],
				[.8418, .5367],
				[.8442, .5333],
				[.8467, .5299],
				[.8492, .5266],
				[.8518, .5233],
				[.8543, .52],
				[.8568, .5166],
				[.8594, .5134],
				[.8622, .5102],
				[.865, .5071],
				[.8677, .504],
				[.8705, .5009],
				[.8733, .4977],
				[.8763, .4948],
				[.8794, .4921],
				[.8826, .4893],
				[.8857, .4866],
				[.8889, .4838],
				[.8921, .4811],
				[.8954, .4786],
				[.8987, .4761],
				[.9021, .4736],
				[.9055, .4711],
				[.909, .4688],
				[.9127, .467],
				[.9166, .4656],
				[.9207, .4644],
				[.9247, .4633],
				[.9287, .4621],
				[.9325, .4605],
				[.9361, .4584],
				[.9395, .4559],
				[.9428, .4533],
				[.946, .4506],
				[.9488, .4476],
				[.9511, .4441],
				[.9528, .4403],
				[.954, .4363],
				[.9547, .4321],
				[.9548, .428],
				[.954, .4239],
				[.9525, .42],
				[.9519, .4187]
			],
			tw: 80,
			end: "dry",
			dryLen: 300,
			after: "trunk"
		},
		{
			id: "rspur",
			w: 4.2,
			tremor: .7,
			drift: 1.2,
			seed: 8,
			pts: [
				[.7655, .6573],
				[.7678, .6628],
				[.7697, .667],
				[.7717, .671],
				[.774, .6746],
				[.7766, .6779],
				[.7794, .6811],
				[.7824, .6839],
				[.7858, .6863],
				[.7896, .688],
				[.7935, .6892],
				[.7976, .6903],
				[.8017, .6912],
				[.8058, .6918],
				[.81, .6919],
				[.8142, .6916],
				[.8184, .6911],
				[.8226, .6906],
				[.8267, .69],
				[.8308, .6892],
				[.8349, .688],
				[.8388, .6866],
				[.8428, .6852],
				[.8467, .6837],
				[.8507, .6823],
				[.8546, .6807],
				[.8584, .679],
				[.8622, .6772],
				[.866, .6755],
				[.87, .6741],
				[.874, .6731],
				[.8782, .6727],
				[.8824, .673],
				[.8865, .6737],
				[.8906, .6748],
				[.8945, .6764],
				[.898, .6787],
				[.9011, .6815],
				[.9039, .6847],
				[.9064, .688],
				[.9088, .6915],
				[.9113, .6948],
				[.9141, .698],
				[.9169, .7011],
				[.9197, .7043],
				[.9225, .7074],
				[.9255, .7103],
				[.9289, .7127],
				[.9327, .7146],
				[.9365, .7162],
				[.9404, .7178],
				[.9443, .7194],
				[.9482, .721],
				[.9521, .7225],
				[.9561, .7239],
				[.96, .7254]
			],
			tw: 60,
			end: "dry",
			dryLen: 200,
			from: "right"
		},
		{
			id: "survivor",
			w: 5.8,
			tremor: .4,
			drift: 1.5,
			seed: 5,
			pts: [
				[.4259, .4097],
				[.4215, .4138],
				[.4189, .4161],
				[.4163, .4186],
				[.4135, .4212],
				[.4106, .424],
				[.4077, .4268],
				[.4048, .4298],
				[.4022, .433],
				[.4002, .4367],
				[.3984, .4404],
				[.3969, .4443],
				[.3954, .4482],
				[.3945, .4523],
				[.3943, .4564],
				[.3945, .4606],
				[.3948, .4648],
				[.3952, .4689],
				[.3955, .4731],
				[.3961, .4772],
				[.3967, .4814],
				[.3974, .4855],
				[.3981, .4896],
				[.3986, .4937],
				[.399, .4979],
				[.399, .5021],
				[.3988, .5062],
				[.3986, .5104],
				[.3984, .5146],
				[.3982, .5188],
				[.3975, .5229],
				[.3966, .527],
				[.3957, .531],
				[.3948, .5351],
				[.394, .5392],
				[.3931, .5433],
				[.3924, .5474],
				[.3917, .5515],
				[.391, .5556],
				[.3904, .5598],
				[.3897, .5639],
				[.3893, .568],
				[.3891, .5722],
				[.3888, .5764],
				[.3886, .5805],
				[.3884, .5847],
				[.3883, .5889],
				[.3889, .593],
				[.3895, .5971],
				[.3901, .6013],
				[.3907, .6054],
				[.3913, .6095],
				[.3922, .6136],
				[.3932, .6177],
				[.3942, .6217],
				[.3952, .6258],
				[.3962, .6298],
				[.3973, .6339],
				[.3988, .6378],
				[.4002, .6417],
				[.4017, .6456],
				[.4032, .6495],
				[.4047, .6534],
				[.4065, .6571],
				[.4086, .6607],
				[.4107, .6644],
				[.4128, .668],
				[.415, .6715],
				[.4174, .675],
				[.4201, .6781],
				[.423, .6812],
				[.4259, .6842],
				[.4288, .6871],
				[.4317, .6901],
				[.4349, .6929],
				[.4381, .6955],
				[.4414, .6981],
				[.4447, .7006],
				[.448, .7032],
				[.4513, .7058],
				[.4545, .7085],
				[.4577, .7112],
				[.4609, .7139],
				[.4641, .7165],
				[.4673, .7192],
				[.4704, .722],
				[.4734, .7249],
				[.4764, .7278],
				[.4794, .7306],
				[.4825, .7335],
				[.4855, .7364],
				[.4882, .7396],
				[.4909, .7428],
				[.4936, .746],
				[.4962, .7492],
				[.4987, .7525],
				[.501, .7561],
				[.5028, .7598],
				[.5045, .7636],
				[.5062, .7675],
				[.5078, .7713],
				[.5094, .7751],
				[.5104, .7792],
				[.5113, .7833],
				[.5122, .7874],
				[.5131, .7914],
				[.514, .7955],
				[.5147, .7996],
				[.5151, .8038],
				[.5155, .8079],
				[.5159, .8121],
				[.5163, .8163],
				[.5167, .8204],
				[.517, .8246],
				[.5172, .8288],
				[.5174, .8329],
				[.5176, .8371],
				[.5178, .8413],
				[.518, .8454],
				[.5181, .8496],
				[.5183, .8538],
				[.5185, .858],
				[.5187, .8621],
				[.5189, .8663],
				[.5189, .8705],
				[.5189, .8747],
				[.519, .8788],
				[.519, .883],
				[.5191, .8872],
				[.5196, .8913],
				[.5203, .8954],
				[.5213, .8995],
				[.5223, .9035],
				[.5234, .9076],
				[.5247, .9115],
				[.5265, .9153],
				[.5286, .9189],
				[.5308, .9225],
				[.533, .926],
				[.5353, .9295],
				[.5379, .9327],
				[.5409, .9357],
				[.544, .9385],
				[.5471, .9413],
				[.5502, .9441],
				[.5533, .9469],
				[.5565, .9495],
				[.5598, .9522],
				[.563, .9548],
				[.5663, .9574],
				[.5694, .9601],
				[.5724, .9631],
				[.575, .9663],
				[.5775, .9697],
				[.5799, .9731],
				[.5824, .9764],
				[.5851, .9796],
				[.5882, .9825],
				[.5914, .9851],
				[.5947, .9876],
				[.598, .9902],
				[.6014, .9927],
				[.6048, .9951],
				[.6084, .9972],
				[.612, .9993],
				[.6156, 1.0014],
				[.6192, 1.0036],
				[.6227, 1.0059],
				[.6258, 1.0086],
				[.6288, 1.0115],
				[.6318, 1.0144],
				[.6348, 1.0173],
				[.6378, 1.0203],
				[.6406, 1.0234],
				[.6431, 1.0267],
				[.6456, 1.0301],
				[.6481, 1.0334],
				[.6506, 1.0367],
				[.6531, 1.0401],
				[.656, 1.0431],
				[.659, 1.0459],
				[.6621, 1.0488],
				[.6651, 1.0517],
				[.6683, 1.0544],
				[.6717, 1.0567],
				[.6754, 1.0586],
				[.6793, 1.0603],
				[.6831, 1.0619],
				[.687, 1.0634],
				[.6909, 1.0649],
				[.695, 1.0659],
				[.6991, 1.0667],
				[.7032, 1.0675],
				[.7073, 1.0682],
				[.7114, 1.069],
				[.7155, 1.0698],
				[.7195, 1.0707],
				[.7236, 1.0716],
				[.7277, 1.0725],
				[.7318, 1.0734],
				[.7359, 1.0743],
				[.74, 1.0751],
				[.7441, 1.0759],
				[.7482, 1.0767],
				[.7523, 1.0775],
				[.7564, 1.0782],
				[.7605, 1.0789],
				[.7646, 1.0793],
				[.7688, 1.0797],
				[.773, 1.08],
				[.7771, 1.0804],
				[.7813, 1.0808],
				[.7854, 1.0815],
				[.7895, 1.0823],
				[.7936, 1.0832],
				[.7976, 1.0843],
				[.8014, 1.086],
				[.8049, 1.0882],
				[.808, 1.091],
				[.8107, 1.0942],
				[.8132, 1.0975],
				[.816, 1.1007],
				[.8191, 1.1034],
				[.8227, 1.1055],
				[.8266, 1.1071]
			],
			from: "trunk"
		},
		{
			id: "centre",
			w: 4.8,
			tremor: .3,
			drift: 1.2,
			seed: 6,
			pts: [
				[.5434, .5815],
				[.5461, .5847],
				[.5488, .5879],
				[.5516, .5911],
				[.5543, .5943],
				[.557, .5975],
				[.5597, .6006],
				[.5624, .6038],
				[.5652, .6069],
				[.5682, .6097],
				[.5713, .6123],
				[.5746, .6146],
				[.578, .6166],
				[.5816, .6184],
				[.5855, .6198],
				[.5894, .621],
				[.5935, .6222],
				[.5975, .6233],
				[.6015, .6245],
				[.6053, .6263],
				[.6087, .6287],
				[.6121, .6312],
				[.6154, .6338],
				[.6187, .6363],
				[.622, .6389],
				[.6249, .642],
				[.6276, .6451],
				[.6304, .6482],
				[.6332, .6514],
				[.6357, .6547],
				[.6377, .6584],
				[.639, .6624],
				[.6399, .6664],
				[.6407, .6706],
				[.6416, .6746],
				[.6427, .6787],
				[.6443, .6825],
				[.6463, .6862],
				[.6484, .6898],
				[.6505, .6935],
				[.6527, .6971],
				[.6547, .7007],
				[.6564, .7045],
				[.6581, .7084],
				[.6598, .7122],
				[.6615, .716],
				[.6633, .7198],
				[.6655, .7234],
				[.668, .7267],
				[.6707, .7299],
				[.6734, .7331],
				[.6761, .7363],
				[.6788, .7395],
				[.6811, .743],
				[.6833, .7466],
				[.6854, .7502],
				[.6873, .7539],
				[.6888, .7579],
				[.6897, .7619],
				[.6899, .7661],
				[.6895, .7703],
				[.6886, .7744],
				[.6873, .7784],
				[.6854, .7821],
				[.6828, .7853],
				[.6797, .7882],
				[.6775, .7899]
			],
			tw: 150,
			end: "dry",
			dryLen: 260,
			from: "right"
		},
		{
			id: "left",
			w: 4.8,
			tremor: .7,
			drift: 1.2,
			seed: 4,
			pts: [
				[.5187, .8621],
				[.5138, .8646],
				[.5105, .8666],
				[.5074, .8687],
				[.5044, .871],
				[.5014, .8735],
				[.4984, .8763],
				[.4955, .8792],
				[.4925, .8821],
				[.4892, .8846],
				[.4857, .8867],
				[.4821, .8889],
				[.4784, .8909],
				[.4746, .8926],
				[.4706, .894],
				[.4666, .8951],
				[.4626, .8962],
				[.4585, .8974],
				[.4545, .8985],
				[.4505, .8995],
				[.4464, .9005],
				[.4423, .9016],
				[.4383, .9026],
				[.4342, .9036],
				[.4301, .9044],
				[.426, .9049],
				[.4218, .9052],
				[.4176, .9054],
				[.4134, .9051],
				[.4093, .9043],
				[.4054, .9028],
				[.4018, .9008],
				[.3983, .8984],
				[.395, .896],
				[.3915, .8937],
				[.3877, .8918],
				[.3838, .8904],
				[.3798, .8892],
				[.3757, .8883],
				[.3715, .8881],
				[.3674, .8886],
				[.3634, .8899],
				[.3596, .8917],
				[.356, .8938],
				[.3526, .8962],
				[.3495, .899],
				[.3469, .9023],
				[.3445, .9057],
				[.3421, .9092],
				[.3395, .9125],
				[.3365, .9154],
				[.3331, .9178],
				[.3294, .9198],
				[.3256, .9215],
				[.3218, .9233],
				[.3182, .9254],
				[.3149, .9279],
				[.3119, .9308],
				[.3091, .934],
				[.3068, .9374],
				[.3049, .9411],
				[.3035, .9451],
				[.3026, .9492],
				[.3017, .9533],
				[.3007, .9573],
				[.2993, .9613],
				[.2977, .9651],
				[.2961, .969],
				[.2948, .973],
				[.294, .9771],
				[.2939, .9813],
				[.2944, .9854],
				[.2955, .9894],
				[.2971, .9933],
				[.2987, .9972],
				[.2999, 1.0012],
				[.3007, 1.0053],
				[.3011, 1.0095],
				[.3014, 1.0136],
				[.3016, 1.0178],
				[.3013, 1.022],
				[.3004, 1.0261],
				[.299, 1.03],
				[.2974, 1.0339],
				[.2958, 1.0377],
				[.2941, 1.0415],
				[.2921, 1.0453],
				[.29, 1.0488],
				[.2878, 1.0524],
				[.2855, 1.0559],
				[.2832, 1.0594],
				[.2806, 1.0627],
				[.2777, 1.0657],
				[.2746, 1.0685],
				[.2714, 1.0711],
				[.2681, 1.0738],
				[.2648, 1.0763],
				[.2613, 1.0786],
				[.2576, 1.0806],
				[.2539, 1.0825],
				[.2501, 1.0844],
				[.2464, 1.0863],
				[.2426, 1.0881],
				[.2388, 1.0897],
				[.2349, 1.0914],
				[.2311, 1.093],
				[.2272, 1.0946],
				[.2234, 1.0963],
				[.2197, 1.0984],
				[.2163, 1.1007],
				[.2128, 1.1031],
				[.2094, 1.1055],
				[.206, 1.1079],
				[.2027, 1.1105],
				[.1997, 1.1134],
				[.1967, 1.1163],
				[.1938, 1.1193],
				[.1909, 1.1223],
				[.1881, 1.1255],
				[.1856, 1.1288],
				[.1833, 1.1323],
				[.1812, 1.136],
				[.1792, 1.1396],
				[.1771, 1.1432],
				[.1753, 1.147],
				[.1737, 1.1509],
				[.1722, 1.1548],
				[.1707, 1.1587],
				[.1691, 1.1625],
				[.167, 1.1661],
				[.1644, 1.1695],
				[.1614, 1.1724],
				[.1579, 1.1746],
				[.1541, 1.1763],
				[.15, 1.1774],
				[.1459, 1.1776],
				[.1417, 1.177],
				[.1378, 1.1757],
				[.1341, 1.1737],
				[.1307, 1.1712],
				[.1288, 1.1692]
			],
			tw: 60,
			end: "dry",
			dryLen: 420,
			from: "survivor"
		}
	]
}, Ht = {
	yUnit: "vh",
	survivor: "survivor",
	mouth: [.8195, 1.6826],
	map: {
		ox: .05,
		oy: .02,
		kx: .0007894736842105263,
		ky: .00118,
		X0: 330,
		Y0: 4
	},
	beats: [
		[
			.04,
			.3124,
			"left",
			320
		],
		[
			.04,
			1.0581,
			"left",
			320
		],
		[
			.04,
			1.3213,
			"left",
			320
		],
		[
			.04,
			1.7088,
			"left",
			320
		]
	],
	paths: [
		{
			id: "trunk",
			w: 4.81,
			tremor: .5,
			drift: 1.5,
			seed: 1,
			pts: [
				[.3108, .0449],
				[.3107, .052],
				[.3106, .0592],
				[.3106, .0663],
				[.3109, .0735],
				[.3111, .0806],
				[.3112, .0877],
				[.3113, .0949],
				[.3115, .102],
				[.3116, .1091],
				[.3117, .1163],
				[.3117, .1234],
				[.3118, .1306],
				[.3119, .1377],
				[.3119, .1448],
				[.312, .152],
				[.3121, .1591],
				[.3122, .1663],
				[.3123, .1734],
				[.3125, .1805],
				[.3127, .1877],
				[.313, .1948],
				[.3134, .202],
				[.3138, .2091],
				[.3143, .2162],
				[.3149, .2234],
				[.3157, .2305],
				[.3165, .2376],
				[.3175, .2447],
				[.3187, .2519],
				[.32, .259],
				[.3216, .2661],
				[.3233, .2732],
				[.3254, .2802],
				[.3277, .2873],
				[.3303, .2943],
				[.3331, .3014],
				[.3361, .3084],
				[.3394, .3153],
				[.3427, .3223],
				[.3461, .3293],
				[.3495, .3362],
				[.3527, .3432],
				[.3558, .3502],
				[.3586, .3572],
				[.3611, .3643],
				[.3633, .3714],
				[.3651, .3784],
				[.3667, .3855],
				[.368, .3927],
				[.3691, .3998],
				[.37, .4069],
				[.3709, .414],
				[.3717, .4212],
				[.3725, .4283],
				[.3734, .4354],
				[.3743, .4425],
				[.3753, .4497],
				[.3763, .4568],
				[.3775, .4639],
				[.3787, .471],
				[.3799, .4781],
				[.3811, .4853],
				[.3823, .4924],
				[.3834, .4995],
				[.3845, .5066],
				[.3855, .5137],
				[.3863, .5209],
				[.3871, .528],
				[.3877, .5351],
				[.3883, .5423],
				[.3888, .5494],
				[.3893, .5565],
				[.3899, .5637],
				[.3905, .5708],
				[.3914, .5779],
				[.3924, .5851],
				[.3938, .5922],
				[.3954, .5993],
				[.3975, .6063],
				[.3999, .6134],
				[.4026, .6204],
				[.4058, .6274],
				[.4092, .6344],
				[.4129, .6413],
				[.4167, .6482],
				[.4207, .6551],
				[.4246, .662],
				[.4285, .6689],
				[.4321, .6759],
				[.4355, .6828],
				[.4386, .6898],
				[.4414, .6969],
				[.4439, .7039],
				[.4462, .711],
				[.4482, .718],
				[.4502, .7251],
				[.452, .7322],
				[.4538, .7393],
				[.4556, .7464],
				[.4573, .7535],
				[.4592, .7606],
				[.4612, .7677],
				[.4633, .7747],
				[.4655, .7818],
				[.467, .7865]
			]
		},
		{
			id: "early",
			w: 3.26,
			tremor: .9,
			drift: 1.2,
			seed: 2,
			pts: [
				[.3753, .4497],
				[.3652, .457],
				[.3575, .4628],
				[.3506, .4687],
				[.345, .4747],
				[.3404, .481],
				[.3365, .4876],
				[.3337, .4944],
				[.3322, .5014],
				[.3316, .5084],
				[.3316, .5156],
				[.332, .5227],
				[.3326, .5299],
				[.3336, .537],
				[.3347, .5441],
				[.3361, .5513],
				[.3377, .5584],
				[.3396, .5655],
				[.3416, .5726],
				[.3439, .5796],
				[.3464, .5867],
				[.3491, .5937],
				[.3519, .6008],
				[.3548, .6078],
				[.3579, .6148],
				[.3609, .6218],
				[.3638, .6288],
				[.3665, .6359],
				[.369, .6429],
				[.3711, .65],
				[.373, .6571],
				[.3744, .6642],
				[.3756, .6714],
				[.3764, .6785],
				[.3769, .6857],
				[.3772, .6928],
				[.3774, .7],
				[.3774, .7071],
				[.3774, .7143],
				[.3773, .7214],
				[.3773, .7286],
				[.3773, .7357],
				[.3774, .7429],
				[.3775, .75],
				[.3776, .7572],
				[.3777, .7643],
				[.3778, .7715],
				[.3779, .7786],
				[.3779, .7858],
				[.3778, .7929],
				[.3776, .8001],
				[.3772, .8072],
				[.3768, .8144],
				[.3762, .8215],
				[.3756, .8287],
				[.3749, .8358],
				[.3742, .843],
				[.3735, .8501],
				[.3728, .8572],
				[.3722, .8644],
				[.3716, .8715],
				[.3712, .8787],
				[.3709, .8858],
				[.3707, .893],
				[.3707, .9001],
				[.3707, .9073],
				[.3709, .9144],
				[.3711, .9216],
				[.371, .9287],
				[.3691, .9358],
				[.3628, .9423],
				[.3528, .9478],
				[.3402, .9518],
				[.3256, .9541],
				[.3102, .9541],
				[.2956, .9517],
				[.281, .9494],
				[.2659, .9479],
				[.2512, .9458],
				[.2384, .9418],
				[.2287, .9362],
				[.2218, .9298],
				[.2166, .9231],
				[.2126, .9162],
				[.2094, .9092],
				[.2065, .9022],
				[.2033, .8952],
				[.1977, .8885],
				[.1895, .8825],
				[.1789, .8773],
				[.1667, .8729],
				[.1528, .8698],
				[.1375, .8691],
				[.1225, .8709],
				[.1088, .8742],
				[.0961, .8783],
				[.0842, .8828],
				[.0706, .8863],
				[.0559, .8884]
			],
			tw: 64,
			end: "fray",
			from: "trunk"
		},
		{
			id: "right",
			w: 3.7,
			tremor: .6,
			drift: 1.5,
			seed: 3,
			pts: [
				[.4716, .7999],
				[.4744, .8069],
				[.4772, .814],
				[.4801, .821],
				[.4831, .828],
				[.4864, .835],
				[.4899, .8419],
				[.4935, .8489],
				[.4973, .8558],
				[.5014, .8627],
				[.506, .8695],
				[.511, .8763],
				[.5166, .8829],
				[.5229, .8895],
				[.53, .8958],
				[.538, .9019],
				[.5469, .9077],
				[.5567, .9133],
				[.5674, .9184],
				[.5787, .9233],
				[.5904, .928],
				[.6023, .9325],
				[.6143, .9371],
				[.626, .9417],
				[.6373, .9466],
				[.6481, .9517],
				[.6584, .957],
				[.6682, .9626],
				[.6774, .9683],
				[.6863, .9741],
				[.6959, .9797],
				[.7077, .9843],
				[.7213, .9877],
				[.7361, .9897],
				[.7515, .99],
				[.7662, .9879],
				[.7781, .9834],
				[.7857, .9773],
				[.7894, .9703],
				[.7921, .9633],
				[.7946, .9562],
				[.7971, .9492],
				[.7996, .9421],
				[.802, .9351],
				[.8045, .928],
				[.8069, .921],
				[.8093, .9139],
				[.8118, .9068],
				[.8143, .8998],
				[.8169, .8928],
				[.8195, .8857],
				[.8222, .8787],
				[.825, .8717],
				[.828, .8646],
				[.8311, .8576],
				[.8343, .8506],
				[.8376, .8437],
				[.8411, .8367],
				[.8447, .8298],
				[.8484, .8228],
				[.8523, .8159],
				[.8564, .809],
				[.8607, .8022],
				[.8653, .7953],
				[.8701, .7885],
				[.8752, .7818],
				[.8806, .7751],
				[.8864, .7685],
				[.8924, .7619],
				[.8987, .7554],
				[.905, .7488],
				[.9113, .7423],
				[.9174, .7358],
				[.9232, .7291],
				[.9283, .7224],
				[.9333, .7156],
				[.9381, .7088],
				[.9416, .7019],
				[.9445, .6949],
				[.9467, .6878],
				[.9444, .6807],
				[.9421, .6761]
			],
			tw: 80,
			end: "dry",
			dryLen: 300,
			after: "trunk"
		},
		{
			id: "rspur",
			w: 3.11,
			tremor: .7,
			drift: 1.2,
			seed: 8,
			pts: [
				[.7515, .99],
				[.7606, .996],
				[.7697, 1.002],
				[.7787, 1.008],
				[.7878, 1.014],
				[.7969, 1.02],
				[.806, 1.0259],
				[.8151, 1.0319],
				[.8243, 1.0379],
				[.8336, 1.0437],
				[.8431, 1.0494],
				[.8531, 1.0549],
				[.8631, 1.0602],
				[.8732, 1.0655],
				[.8835, 1.0706],
				[.8932, 1.0761],
				[.9017, 1.082],
				[.9089, 1.0884],
				[.9147, 1.0951],
				[.9196, 1.102],
				[.9264, 1.1085],
				[.9346, 1.1147],
				[.9437, 1.1207],
				[.95, 1.1245]
			],
			tw: 60,
			end: "dry",
			dryLen: 200,
			from: "right"
		},
		{
			id: "survivor",
			w: 4.29,
			tremor: .4,
			drift: 1.5,
			seed: 5,
			pts: [
				[.4355, .6828],
				[.4208, .6932],
				[.4157, .6985],
				[.4107, .7043],
				[.4064, .7107],
				[.4032, .7175],
				[.4012, .7245],
				[.3999, .7316],
				[.3992, .7387],
				[.3988, .7458],
				[.3988, .753],
				[.3989, .7601],
				[.3991, .7672],
				[.3993, .7744],
				[.3996, .7815],
				[.3998, .7886],
				[.3998, .7957],
				[.3998, .8029],
				[.3996, .81],
				[.3993, .8171],
				[.3989, .8242],
				[.3984, .8314],
				[.3978, .8385],
				[.3971, .8456],
				[.3964, .8527],
				[.3956, .8599],
				[.3949, .867],
				[.3942, .8741],
				[.3936, .8812],
				[.3931, .8884],
				[.3927, .8955],
				[.3924, .9026],
				[.3923, .9097],
				[.3923, .9169],
				[.3924, .924],
				[.3927, .9311],
				[.3932, .9383],
				[.3938, .9454],
				[.3945, .9525],
				[.3954, .9596],
				[.3964, .9667],
				[.3976, .9738],
				[.3989, .9809],
				[.4003, .988],
				[.402, .9951],
				[.4037, 1.0022],
				[.4057, 1.0093],
				[.4079, 1.0163],
				[.4103, 1.0234],
				[.413, 1.0304],
				[.4159, 1.0374],
				[.4192, 1.0444],
				[.4227, 1.0513],
				[.4266, 1.0582],
				[.4308, 1.0651],
				[.4352, 1.0719],
				[.4398, 1.0787],
				[.4446, 1.0855],
				[.4495, 1.0922],
				[.4545, 1.099],
				[.4595, 1.1057],
				[.4644, 1.1125],
				[.4693, 1.1193],
				[.4739, 1.126],
				[.4784, 1.1329],
				[.4827, 1.1397],
				[.4867, 1.1466],
				[.4905, 1.1535],
				[.4939, 1.1605],
				[.4971, 1.1674],
				[.4999, 1.1745],
				[.5024, 1.1815],
				[.5046, 1.1885],
				[.5066, 1.1956],
				[.5083, 1.2027],
				[.5097, 1.2098],
				[.511, 1.2169],
				[.5121, 1.224],
				[.513, 1.2311],
				[.5138, 1.2383],
				[.5145, 1.2454],
				[.5151, 1.2525],
				[.5156, 1.2596],
				[.516, 1.2667],
				[.5164, 1.2739],
				[.5167, 1.281],
				[.517, 1.2881],
				[.5173, 1.2953],
				[.5175, 1.3024],
				[.5178, 1.3095],
				[.518, 1.3166],
				[.5182, 1.3238],
				[.5185, 1.3309],
				[.5187, 1.338],
				[.5191, 1.3452],
				[.5196, 1.3523],
				[.5202, 1.3594],
				[.521, 1.3665],
				[.522, 1.3736],
				[.5233, 1.3807],
				[.5249, 1.3878],
				[.5269, 1.3949],
				[.5291, 1.402],
				[.5318, 1.409],
				[.5348, 1.416],
				[.5382, 1.4229],
				[.5419, 1.4298],
				[.5459, 1.4367],
				[.5502, 1.4436],
				[.5546, 1.4504],
				[.5591, 1.4572],
				[.5637, 1.464],
				[.5683, 1.4708],
				[.573, 1.4776],
				[.5778, 1.4844],
				[.5827, 1.4912],
				[.5877, 1.4979],
				[.5928, 1.5046],
				[.598, 1.5114],
				[.6034, 1.518],
				[.6087, 1.5247],
				[.6141, 1.5314],
				[.6193, 1.5381],
				[.6245, 1.5448],
				[.6295, 1.5516],
				[.6344, 1.5583],
				[.6393, 1.5651],
				[.6442, 1.5719],
				[.6493, 1.5786],
				[.6548, 1.5852],
				[.6609, 1.5918],
				[.6677, 1.5982],
				[.6754, 1.6044],
				[.684, 1.6103],
				[.6935, 1.6159],
				[.7038, 1.6212],
				[.7148, 1.6262],
				[.7263, 1.631],
				[.738, 1.6356],
				[.7497, 1.6402],
				[.7613, 1.645],
				[.7726, 1.6498],
				[.7851, 1.6539],
				[.7951, 1.6593],
				[.8022, 1.6656],
				[.8072, 1.6724],
				[.813, 1.6789],
				[.8195, 1.6826]
			],
			from: "trunk"
		},
		{
			id: "centre",
			w: 3.55,
			tremor: .3,
			drift: 1.2,
			seed: 6,
			pts: [
				[.5787, .9233],
				[.5794, .9326],
				[.5801, .9407],
				[.5812, .9486],
				[.5828, .9563],
				[.5856, .9637],
				[.5893, .971],
				[.5935, .9781],
				[.5988, .985],
				[.6049, .9917],
				[.6111, .9982],
				[.6169, 1.0049],
				[.6219, 1.0116],
				[.6261, 1.0185],
				[.6297, 1.0255],
				[.6328, 1.0326],
				[.6354, 1.0396],
				[.6379, 1.0467],
				[.6402, 1.0538],
				[.6424, 1.0609],
				[.6446, 1.068],
				[.6468, 1.0751],
				[.6492, 1.0821],
				[.6516, 1.0892],
				[.654, 1.0963],
				[.6566, 1.1034],
				[.6593, 1.1104],
				[.6621, 1.1175],
				[.6649, 1.1245],
				[.6677, 1.1316],
				[.6704, 1.1386],
				[.6731, 1.1457],
				[.6755, 1.1528],
				[.6775, 1.1599],
				[.6792, 1.167],
				[.6804, 1.1741],
				[.6817, 1.1813],
				[.6825, 1.1884],
				[.6826, 1.1956],
				[.6823, 1.2028],
				[.6802, 1.2098],
				[.6754, 1.2166],
				[.6737, 1.2189]
			],
			tw: 150,
			end: "dry",
			dryLen: 260,
			from: "right"
		},
		{
			id: "left",
			w: 3.55,
			tremor: .7,
			drift: 1.2,
			seed: 4,
			pts: [
				[.5187, 1.338],
				[.4991, 1.3465],
				[.4902, 1.3507],
				[.4805, 1.3552],
				[.4703, 1.36],
				[.4599, 1.365],
				[.4484, 1.3698],
				[.4354, 1.3734],
				[.4208, 1.3754],
				[.4054, 1.3757],
				[.39, 1.3757],
				[.3749, 1.3773],
				[.3628, 1.3817],
				[.3537, 1.3875],
				[.3464, 1.3938],
				[.3402, 1.4003],
				[.3346, 1.407],
				[.3294, 1.4138],
				[.3247, 1.4206],
				[.3205, 1.4275],
				[.3167, 1.4344],
				[.3134, 1.4414],
				[.3106, 1.4485],
				[.3082, 1.4556],
				[.3062, 1.4627],
				[.3046, 1.4698],
				[.3033, 1.4769],
				[.3024, 1.4841],
				[.3018, 1.4912],
				[.3015, 1.4984],
				[.3015, 1.5056],
				[.3018, 1.5127],
				[.3021, 1.5199],
				[.3025, 1.5271],
				[.3028, 1.5342],
				[.3029, 1.5414],
				[.3028, 1.5485],
				[.3023, 1.5557],
				[.3014, 1.5629],
				[.3002, 1.57],
				[.2985, 1.5771],
				[.2965, 1.5842],
				[.2939, 1.5913],
				[.291, 1.5983],
				[.2875, 1.6053],
				[.2835, 1.6122],
				[.279, 1.6191],
				[.274, 1.6259],
				[.2685, 1.6325],
				[.2624, 1.6391],
				[.2561, 1.6457],
				[.2494, 1.6521],
				[.2427, 1.6586],
				[.2359, 1.665],
				[.2293, 1.6715],
				[.2229, 1.678],
				[.2169, 1.6847],
				[.2113, 1.6913],
				[.2062, 1.6981],
				[.2016, 1.7049],
				[.1974, 1.7118],
				[.1936, 1.7188],
				[.1902, 1.7258],
				[.187, 1.7328],
				[.184, 1.7398],
				[.181, 1.7468],
				[.1779, 1.7539],
				[.1731, 1.7606],
				[.1656, 1.7669],
				[.1549, 1.7721],
				[.1417, 1.7758]
			],
			tw: 60,
			end: "dry",
			dryLen: 420,
			from: "survivor"
		}
	]
}, Ut = "attribute vec2 p; varying vec2 uv; void main() { uv = p * .5 + .5; uv.y = 1. - uv.y; gl_Position = vec4(p, 0., 1.); }", Wt = "precision highp float;\nvarying vec2 uv;\nuniform sampler2D colTex, field;\nuniform vec4 crop;   // the part of the colour image this rectangle shows (x, y, w, h in uv)\nuniform float u;     // the bloom's progress: 0 nothing, U_END settled (about one reach around the channel)\nuniform vec2 px;     // the canvas size, device px\nuniform float rec;   // the retract: 0 none, 1 all gone (the top clears first, the colour drains downwards)\nuniform vec4 hole;   // a text block the pigment runs around, never under (x0, y0, x1, y1 in uv; x1 < x0 for none)\nuniform vec2 holePad; // its soft margin (x: device px)\nuniform vec2 soft;    // a phone: the ragged feather (css px) at the top and sides; 0 = the desktop's (a share of the size)\nuniform vec2 css;     // the rectangle's size, css px\nfloat hash(vec2 q) { return fract(sin(dot(q, vec2(12.9898, 78.233))) * 43758.5453); }\nfloat vn(vec2 q) { vec2 c = floor(q), f = fract(q); f = f * f * (3. - 2. * f);\n  return mix(mix(hash(c), hash(c + vec2(1., 0.)), f.x), mix(hash(c + vec2(0., 1.)), hash(c + vec2(1., 1.)), f.x), f.y); }\nfloat fbm(vec2 q) { float a = .5, s = 0.; for (int i = 0; i < 5; i++) { s += a * vn(q); q *= 2.03; a *= .5; } return s; }\nvoid main() {\n  vec4 f = texture2D(field, uv);\n  float d = f.r * 2., along = f.g;                       // distance from the channel (in reaches), where along it\n  vec2 q = uv * px / 180.;\n  float n = fbm(q * 1.7 + 3.1), n2 = fbm(q * 5. + 11.);\n  // arrival: along the channel first, then out through the paper; the fbm makes the front ragged and lobed\n  float t = along * .45 + d * 1.05 + (n - .5) * .55 + (n2 - .5) * .12;\n  float wet = u - t;\n  if (wet <= 0.) { gl_FragColor = vec4(0.); return; }\n  float body = smoothstep(0., .08, wet);\n  float edge = 1. - smoothstep(.0, .16, wet);           // the tide line at the front\n  vec2 tuv = crop.xy + uv * crop.zw;\n  vec3 c = texture2D(colTex, clamp(tuv, 0., 1.)).rgb;\n  // past the photograph's edge (the sea runs on below it) the wash thins away, raggedly\n  float inside = smoothstep(-.02, .05, tuv.x + (n - .5) * .05) * smoothstep(-.02, .05, 1. - tuv.x + (n - .5) * .05)\n               * smoothstep(-.02, .05, tuv.y + (n - .5) * .05) * smoothstep(-.06, .04, 1. - tuv.y + (n - .5) * .08);\n  // fresh wash is thinner, deepening behind the front; the tide pools darker; pigment granulates in the paper\n  float depth = mix(.55, 1., smoothstep(0., .5, wet));\n  float gran = vn(gl_FragCoord.xy / 2.3) * .5 + vn(gl_FragCoord.xy / 7.) * .5;\n  // over the open sea (near-black in the photograph) the wash runs thinner and lighter, so it reads as pigment not ink\n  float lum = dot(c, vec3(.3, .55, .15));\n  float deep = 1. - smoothstep(.04, .3, lum);\n  c = mix(c, c * .75 + vec3(.22, .2, .34), deep * .38);\n  c *= 1. - .22 * edge;\n  c = mix(vec3(1.), c, depth);\n  c *= 1. - .1 * smoothstep(.45, .85, gran) * body;\n  float a = body * (.92 - .07 * smoothstep(.35, .75, n2)) * (1. - smoothstep(1.55, 1.95, d)); // never reaches the frame\n  if (soft.x > 0.) {\n    // a phone: the rectangle's top cuts across the wet colour (it stops under the beat above), so it thins out over a\n    // deep, lobed margin that is clear paper at the edge itself, and so do the sides: no edge shows where the canvas is\n    vec2 e = vec2(min(uv.x, 1. - uv.x) * css.x / soft.y, uv.y * css.y / soft.x);\n    float rag = (n - .5) * .9 + (n2 - .5) * .2;\n    a *= smoothstep(0., 1., e.y - .5 + rag) * smoothstep(0., 1., e.x - .5 + rag);\n    a *= 1. - smoothstep(.9, 1., uv.y + (n - .5) * .12);\n  } else {\n    a *= smoothstep(.0, .1, uv.y + (n - .5) * .12) * (1. - smoothstep(.9, 1., uv.y + (n - .5) * .12)); // nor its top or foot\n    a *= smoothstep(.0, .12, uv.x + (n - .5) * .14) * (1. - smoothstep(.88, 1., uv.x + (n - .5) * .14)); // nor its sides: never a cut\n  }\n  a *= inside;\n  a *= 1. - .22 * deep;\n  // the beat beside it stays on clean paper: the wash stops short of its block with a ragged, soft edge\n  if (hole.z > hole.x) {\n    // distance (device px) from the beat's block, as a rounded box; the pigment thins out over a ragged margin\n    vec2 pp = uv * px, h0 = hole.xy * px, h1 = hole.zw * px;\n    vec2 q = abs(pp - (h0 + h1) * .5) - (h1 - h0) * .5;\n    float dist = length(max(q, 0.)) + min(max(q.x, q.y), 0.);\n    float m = holePad.x * (1. + (n - .5) * 1.1 + (n2 - .5) * .3);\n    a *= smoothstep(-.15 * m, m, dist);\n  }\n  // the retract: one front sweeping down through the wash, ragged like the bleed; what it passes is clean paper\n  // clears from the top down, the paper far from the channel first: the last colour gathers at the channel's mouth\n  float ord = uv.y * .8 + (1. - min(d, 1.)) * .2 + (n - .5) * .32 + (n2 - .5) * .06;\n  float back = ord - (rec * 1.45 - .12);\n  if (rec > 0.) {\n    a *= smoothstep(0., .035, back);\n    c *= 1. - .18 * (1. - smoothstep(0., .07, back)) * step(0., back); // the faint tide on the retreating edge\n  }\n  // premultiplied (as the river, ../river/river.ts): straight colour over a low alpha composited on iOS as added light,\n  // a white glow at the bloom's edge and a bright band along the canvas's top, where the colour is white and alpha 0\n  gl_FragColor = vec4(c * a, a);\n}";
function Gt(e, t) {
	let n = document.createElement("canvas");
	n.className = "br-bloom", n.setAttribute("aria-hidden", "true"), e.append(n);
	let r = new URLSearchParams(location.search).has("nogl") ? null : n.getContext("webgl", {
		premultipliedAlpha: !0,
		alpha: !0,
		antialias: !1
	}), i = r ? null : n.getContext("2d"), a = null, o = !1, s = {
		x: 0,
		y: 0,
		w: 1,
		h: 1
	}, c = 0, l = 1, u = 1, d = NaN, f = [
		0,
		0,
		1,
		1
	], p = [
		1,
		1,
		0,
		0
	], m = [0, 0], h = null, g = null, _ = null, v = {}, y = null, b = () => {
		R(r) && a && (r.activeTexture(r.TEXTURE0), r.bindTexture(r.TEXTURE_2D, g), r.texImage2D(r.TEXTURE_2D, 0, r.RGB, r.RGB, r.UNSIGNED_BYTE, a), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE));
	}, x = () => {
		R(r) && y && (r.activeTexture(r.TEXTURE1), r.bindTexture(r.TEXTURE_2D, _), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, y.w, y.h, 0, r.RGBA, r.UNSIGNED_BYTE, y.data), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE));
	}, S = () => {
		if (r && (h = D(r, Ut, Wt), h)) {
			r.useProgram(h), N(r, h);
			for (let e of [
				"colTex",
				"field",
				"crop",
				"u",
				"px",
				"rec",
				"hole",
				"holePad",
				"soft",
				"css"
			]) v[e] = r.getUniformLocation(h, e);
			r.uniform1i(v.colTex, 0), r.uniform1i(v.field, 1), g = r.createTexture(), _ = r.createTexture(), b(), x();
		}
	};
	S(), r && h && H(n, r, {
		name: "bloom",
		near: e,
		margin: 1
	}, S, () => {
		d = NaN, O(T, E);
	});
	let C = () => {
		a && (o = !0, b(), d = NaN, O(T, E));
	}, w = (e, t, i, a, o, h) => {
		s = t, c = i, l = a, u = Math.min(1.5, devicePixelRatio || 1), Object.assign(n.style, {
			left: `${t.x}px`,
			top: `${t.y}px`,
			width: `${t.w}px`,
			height: `${t.h}px`
		}), n.width = Math.round(t.w * u), n.height = Math.round(t.h * u);
		let g = t.w / t.h;
		if (f = o ?? (g >= 1 ? [
			0,
			(1 - 1 / g) / 2,
			1,
			1 / g
		] : [
			(1 - g) / 2,
			0,
			g,
			1
		]), p = h ? [
			(h.x - t.x) / t.w,
			(h.y - t.y) / t.h,
			(h.x + h.w - t.x) / t.w,
			(h.y + h.h - t.y) / t.h
		] : [
			1,
			1,
			0,
			0
		], m = [44 * u, 0], !r) return;
		let _ = Math.max(8, Math.round(t.w / 4)), v = Math.max(8, Math.round(t.h / 4)), b = Math.min(t.w, t.h) * (t.w < 600 ? .3 : .23), S = [];
		for (let n = 0; n < e.x.length; n += 4) e.gate[n] < i || S.push([
			e.x[n] - t.x,
			e.y[n] - t.y,
			X((e.gate[n] - i) / (a - i))
		]);
		let C = new Uint8Array(_ * v * 4);
		for (let e = 0; e < v; e++) for (let n = 0; n < _; n++) {
			let r = (n + .5) * t.w / _, i = (e + .5) * t.h / v, a = Infinity, o = 1;
			for (let [e, t, n] of S) {
				let s = (e - r) ** 2 + (t - i) ** 2;
				s < a && (a = s, o = n);
			}
			let s = (e * _ + n) * 4;
			C[s] = Math.round(X(Math.sqrt(a) / b / 2) * 255), C[s + 1] = Math.round(o * 255), C[s + 3] = 255;
		}
		y = {
			w: _,
			h: v,
			data: C
		}, x(), d = NaN;
	}, T = -Infinity, E = 0, O = (t, u = 0) => {
		T = t, E = u;
		let y = 1.45, b = X((t - c) / (l - c)), x = t === Infinity ? y : (1 - (1 - b) ** 1.6) * y, S = x + u * 10;
		if ((!r || R(r)) && S !== d) {
			if (d = S, r) {
				if (r.viewport(0, 0, n.width, n.height), r.clearColor(0, 0, 0, 0), r.clear(r.COLOR_BUFFER_BIT), !o || x <= 0 || u >= 1) return;
				r.useProgram(h), r.activeTexture(r.TEXTURE0), r.bindTexture(r.TEXTURE_2D, g), r.activeTexture(r.TEXTURE1), r.bindTexture(r.TEXTURE_2D, _), r.uniform4f(v.crop, ...f), r.uniform1f(v.u, x), r.uniform2f(v.px, n.width, n.height), r.uniform1f(v.rec, u), r.uniform4f(v.hole, ...p), r.uniform2f(v.holePad, ...m), r.uniform2f(v.soft, ...e.clientWidth <= 760 ? [70, 36] : [0, 0]), r.uniform2f(v.css, s.w, s.h), r.drawArrays(r.TRIANGLE_STRIP, 0, 4);
			} else if (i) {
				if (i.clearRect(0, 0, n.width, n.height), !o || x <= 0 || u >= 1) return;
				let e = n.width, t = n.height;
				i.save();
				let r = i.createRadialGradient(e / 2, t / 2, 0, e / 2, t / 2, Math.min(e, t) * .5);
				if (r.addColorStop(0, "rgba(0,0,0,1)"), r.addColorStop(.55, "rgba(0,0,0,.9)"), r.addColorStop(1, "rgba(0,0,0,0)"), i.globalAlpha = X(x / 1.1) * (1 - u), !a) return;
				i.drawImage(a, f[0] * a.width, f[1] * a.height, f[2] * a.width, f[3] * a.height, 0, 0, e, t), i.globalCompositeOperation = "destination-in", i.globalAlpha = 1, i.fillStyle = r, i.fillRect(0, 0, e, t), i.restore();
			}
		}
	}, k = !1;
	return {
		layout: w,
		draw: O,
		settledAt: () => l,
		load: () => {
			k || (k = !0, ce(t).then(async (t) => {
				await ue(e), a = t, C();
			}).catch(() => {}));
		}
	};
}
//#endregion
//#region src/home/research/plate.ts
var Kt = .7, qt = .38, Jt = "attribute vec2 p; varying vec2 uv; void main(){ uv = p * .5 + .5; uv.y = 1. - uv.y; gl_Position = vec4(p, 0., 1.); }", Yt = "precision highp float;\nvarying vec2 uv;\nuniform sampler2D bw, col;\nuniform vec4 crop;      // the part of the square image the plate shows (cover)\nuniform vec2 origin;    // where the colour came in (plate uv)\nuniform float front;    // how far the colour has run: 0 none, 1.3 the whole plate\nuniform float aspect;   // plate w / h\nfloat hash(vec2 q) { return fract(sin(dot(q, vec2(12.9898, 78.233))) * 43758.5453); }\nfloat vn(vec2 q) { vec2 c = floor(q), f = fract(q); f = f * f * (3. - 2. * f);\n  return mix(mix(hash(c), hash(c + vec2(1., 0.)), f.x), mix(hash(c + vec2(0., 1.)), hash(c + vec2(1., 1.)), f.x), f.y); }\nfloat fbm(vec2 q) { float a = .5, s = 0.; for (int i = 0; i < 5; i++) { s += a * vn(q); q *= 2.03; a *= .5; } return s; }\nvoid main() {\n  vec2 t = crop.xy + uv * crop.zw;\n  float g = texture2D(bw, t).r;\n  vec3 base = vec3(g);\n  vec2 d2 = (uv - origin) * vec2(aspect, 1.);\n  float n = fbm(uv * vec2(aspect, 1.) * 4.2 + 3.1), n2 = fbm(uv * vec2(aspect, 1.) * 13. + 9.);\n  float dist = length(d2) / max(1., aspect) + (n - .5) * .34 + (n2 - .5) * .06 + (g - .5) * .08; // runs ahead through the dark\n  float wet = front - dist;\n  if (front <= 0. || wet <= 0.) { gl_FragColor = vec4(base, 1.); return; }\n  float m = smoothstep(0., .05, wet);\n  float tide = (1. - smoothstep(0., .07, wet)) * m;\n  vec3 c = texture2D(col, t).rgb;\n  c *= 1. - .2 * tide;\n  float gr = vn(gl_FragCoord.xy / 2.4) * .5 + vn(gl_FragCoord.xy / 7.) * .5;\n  c *= 1. + .1 * (gr - .5);\n  gl_FragColor = vec4(mix(base, c, m), 1.);\n}";
function Xt(e) {
	let t = matchMedia("(prefers-reduced-motion: reduce)").matches, n = new URLSearchParams(location.search).has("nogl"), r = matchMedia("(hover: none)").matches, i = matchMedia("(max-width: 760px)"), a = [...e.querySelectorAll("[data-plate]")], o = () => {
		let e = innerHeight, t = De(), n = a.map((n) => {
			let r = n.getBoundingClientRect();
			return r.top + t + r.height / 2 - e / 2;
		}), r = n.map(Math.abs), i = r.indexOf(Math.min(...r));
		return a.map((t, a) => n[a] <= 0 ? 1 : a === i ? X(1 - (r[a] / (e / 2) - .08) / .34) : 0);
	}, s = [];
	if (a.forEach((e, a) => {
		let c = e.closest("a, [data-card]") ?? e, l = e.querySelector("canvas");
		if (n) return;
		let u = null, d = {}, f = null, p = !1, m = !1, h = 1, g = 1, _ = null, v = null, y = 0, b = [.5, .5], x = 0, S = (e, t, n) => {
			let r = u, i = r.createTexture();
			r.activeTexture(r.TEXTURE0 + t), r.bindTexture(r.TEXTURE_2D, i);
			let a = n ? r.LUMINANCE : r.RGB;
			r.texImage2D(r.TEXTURE_2D, 0, a, a, r.UNSIGNED_BYTE, e), r.generateMipmap(r.TEXTURE_2D), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR_MIPMAP_LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE);
		}, C = () => {
			if (!u || !f) return;
			let e = D(u, Jt, Yt);
			e && (u.useProgram(e), N(u, e), d = Object.fromEntries([
				"bw",
				"col",
				"crop",
				"origin",
				"front",
				"aspect"
			].map((t) => [t, u.getUniformLocation(e, t)])), u.uniform1i(d.bw, 0), u.uniform1i(d.col, 1), S(f[0], 0, !0), S(f[1], 1, !1), m = !0);
		}, w = () => {
			if (u || !f) return;
			let t = l.getContext("webgl", {
				antialias: !1,
				premultipliedAlpha: !1
			});
			t && (u = t, M(t, [[Jt, Yt]]).then(() => {
				if (C(), !m) {
					u = null;
					return;
				}
				e.classList.add("has-gl"), O(), s[a]?.(), H(l, t, {
					name: `plate ${a + 1}`,
					near: e,
					margin: 1.2
				}, C, () => A());
			}));
		}, T = e.dataset.plate, E = (e) => ce(`${T}/${e}`), O = () => {
			let t = Math.min(devicePixelRatio || 1, 2), n = e.getBoundingClientRect();
			h = n.width, g = n.height, l.width = Math.max(1, Math.round(h * t)), l.height = Math.max(1, Math.round(g * t)), A();
		}, k = (e) => r ? t ? x > .5 ? 1.3 : 0 : Z(x) * 1.3 : t ? _ != null && v == null ? 1.3 : 0 : _ != null && v == null ? X((e - _) / 1e3 / Kt, 0, 1) ** .7 * 1.3 : v == null ? 0 : y * (1 - X((e - v) / 1e3 / qt)) ** 1.3, A = (e = performance.now()) => {
			if (!m || !R(u)) return;
			let t = h / g, n = t < 1 ? [
				(1 - t) / 2,
				0,
				t,
				1
			] : [
				0,
				(1 - 1 / t) / 2,
				1,
				1 / t
			];
			u.viewport(0, 0, l.width, l.height), u.uniform4f(d.crop, n[0], n[1], n[2], n[3]), u.uniform2f(d.origin, b[0], b[1]), u.uniform1f(d.front, k(e)), u.uniform1f(d.aspect, t), u.drawArrays(u.TRIANGLE_STRIP, 0, 4);
		}, j = 0, P = (e) => {
			A(e);
			let t = _ != null && v == null && e - _ < Kt * 1e3 || v != null && e - v < qt * 1e3;
			j = t ? requestAnimationFrame(P) : 0, !t && v != null && (_ = null, v = null);
		}, F = () => {
			j || (j = requestAnimationFrame(P));
		}, I = (e, t) => {
			let n = performance.now(), r = k(n);
			b = v == null ? [e, t] : b, _ = n - (r / 1.3) ** (1 / .7) * Kt * 1e3, v = null, F();
		}, L = () => {
			_ != null && (y = k(performance.now()), v = performance.now(), F());
		};
		if (r) {
			b = [.5, .6];
			let t = -1;
			s[a] = () => {
				if (i.matches) return;
				let n = Math.max(x, o()[a]);
				Math.abs(n - t) < .001 || (t = x = n, A(), e.style.setProperty("--fill", n.toFixed(3)));
			};
		} else c.addEventListener("pointerenter", (t) => {
			if (t.pointerType === "touch") return;
			let n = e.getBoundingClientRect();
			I(X((t.clientX - n.left) / n.width), X((t.clientY - n.top) / n.height));
		}), c.addEventListener("pointerleave", (e) => {
			e.pointerType !== "touch" && L();
		});
		c.addEventListener("focus", () => I(.5, .85)), c.addEventListener("blur", L);
		let z = !1, B = () => {
			p || !z || i.matches || (p = !0, Promise.all([E("bw.webp"), E("col.webp")]).then((e) => {
				f = e, w(), s[a]?.();
			}).catch(() => {}));
		};
		se(e, () => {
			z = !0, B();
		}, "120%"), i.addEventListener("change", B), new ResizeObserver(() => O()).observe(e);
	}), r && s.length) {
		let e = 0, t = () => {
			e = 0, s.forEach((e) => e?.()), Oe() && n();
		}, n = () => {
			e || (e = requestAnimationFrame(t));
		};
		addEventListener("scroll", n, { passive: !0 }), addEventListener("resize", n), n();
	}
}
//#endregion
//#region src/home/research/research.ts
var Zt = [
	600,
	960,
	1600,
	1700
], Qt = 1e6;
function $t(e, t = {}) {
	var n;
	let r = matchMedia("(prefers-reduced-motion: reduce)").matches, i = e.querySelector(".br-ink"), l = e.querySelector(".br-wash"), u = e.querySelector(".br-draw"), d = e.querySelector("[data-block]"), f = [...e.querySelectorAll("[data-card]")], p = [...e.querySelectorAll("[data-beat]")], m = new URLSearchParams(location.search), h = m.get("frame") !== "off", g = m.get("mline") === "simple", _ = 1.25, v = (e) => e.map((t, n) => {
		let r = Math.min(4, n, e.length - 1 - n), i = 0, a = 0;
		for (let t = -r; t <= r; t++) i += e[n + t][0], a += e[n + t][1];
		return [i / (2 * r + 1), a / (2 * r + 1)];
	}), y = (e) => ({
		...e,
		paths: e.paths.map((e) => ({
			...e,
			w: e.w * _,
			pts: v(v(e.pts)),
			...e.end === "fray" ? {
				end: "dry",
				dryLen: 180
			} : {}
		}))
	}), b, x, S = 0, C = 0, w = 1, T = 1, E = !1, D = 0, O = null, k = null, A = null, j = null, M = [], N = [], P = [], F = 1, I = [], L = [], R = 0, z = [
		1,
		0,
		1,
		0
	], B = [], ee = Gt(u, matchMedia("(max-width: 760px)").matches ? `${globalThis.__P26B}home/research/yukon-bloom-m.webp` : `${globalThis.__P26B}home/research/yukon-bloom.webp`);
	Xt(e);
	let V = () => {
		if (!h || !d) return [];
		let e = u.getBoundingClientRect(), t = d.getBoundingClientRect(), [n, r] = [x.mouth[0] * C, x.mouth[1] * b.U], i = E ? 4 : 8, a = E ? 28 : 40, o = t.left - e.left + i, s = t.right - e.left - i, c = t.top - e.top + i, l = t.bottom - e.top - i, f = (o + s) / 2, p = b.lines[x.survivor], m = p.x.length - 1, v = Math.max(0, m - 10), y = p.x[m] - p.x[v], S = p.y[m] - p.y[v], w = Math.hypot(y, S) || 1;
		y /= w, S /= w;
		let T = E ? 40 : 70, [D, O] = [n + y * T, r + S * T], k = E ? 30 : 48;
		l + k;
		let A = (e) => Array.from({ length: 8 }, (t, n) => {
			let r = (n + 1) / 8 * Math.PI / 2;
			return [f + e * (k - k * Math.sin(r)), l + k - k * Math.cos(r)];
		}), j = Math.max(O + a * 1.5, Math.min(c - a * 1.5, O + (c - O) * .5)), M = {
			tremor: .8,
			drift: 3.2,
			tw: 90,
			side: .14,
			settle: 360,
			pin: 120
		}, N = p.x[m], P = p.y[m], F = T * .55, I = {
			id: "fr-lead",
			after: x.survivor,
			w: E ? 3.6 : 4.8,
			seed: 20,
			tremor: 0,
			drift: 0,
			side: M.side,
			settle: M.settle,
			pts: [[N + y * F, P + S * F]]
		}, L = (e) => {
			let t = e.findIndex(([e, t]) => (e - N) * y + (t - P) * S > F + 4);
			return e.slice(Math.max(1, t));
		}, R = {
			id: "fr-l",
			after: "fr-lead",
			w: E ? 3.4 : 4.4,
			seed: 21,
			...M,
			pts: L(Rt([
				[N, P],
				[D, O],
				[D, c],
				[o, c],
				[o, l],
				[f - k, l]
			], a * 1.2)).concat(A(-1))
		}, z = {
			id: "fr-r",
			after: "fr-lead",
			w: E ? 3.2 : 4.2,
			seed: 22,
			...M,
			pts: L(Rt([
				[N, P],
				[D, O],
				[Math.min(s, D + (s - D) * .5 + a * 2), j],
				[s, j + a * 2],
				[s, l],
				[f + k, l]
			], a * 1.2)).concat(A(1))
		};
		if (E && (R.drift = z.drift = 1.8, R.tremor = z.tremor = .5), E && g) for (let e of [
			I,
			R,
			z
		]) e.w *= _;
		return [
			I,
			R,
			z
		];
	}, te = () => {
		let e = b.lines["fr-l"], t = b.lines["fr-r"];
		if (!e || !t) return;
		let n = Math.max(e.gate[e.gate.length - 1], t.gate[t.gate.length - 1]);
		for (let e of ["fr-l", "fr-r"]) {
			let t = b.lines[e].gate, r = t[0], i = t[t.length - 1];
			if (i >= n - .5 || i <= r) continue;
			let a = (n - r) / (i - r);
			for (let e = 0; e < t.length; e++) t[e] = r + (t[e] - r) * a;
			let o = b.strokes.find((t) => t.id === e);
			if (o) for (let e = 0; e < o.gate.length; e++) o.gate[e] = r + (o.gate[e] - r) * a;
			b.ends[e].gate = t[t.length - 1];
		}
	}, H = (e, t) => {
		let n = M.length ? M : b.strokes, r = (e, t) => {
			let r = [];
			for (let i of n) if (!i.hair) for (let n = 0; n < i.x.length; n++) i.y[n] < e - 28 || i.y[n] > e + t + 28 || i.dry[n] > .6 || r.push([i.x[n] - i.w[n] - 12, i.x[n] + i.w[n] + 12]);
			r.sort((e, t) => e[0] - t[0]);
			let i = [0, 0], a = 16;
			for (let [e, t] of [...r, [C - 16, C - 16]]) e - a > i[1] && (i = [a, e - a]), a = Math.max(a, t);
			return i[1] >= 128 ? i : null;
		};
		e.classList.add("is-beside");
		let i = (t, n) => Object.assign(e.style, {
			top: `${n}px`,
			left: `${t[0]}px`,
			right: "",
			width: `${t[1]}px`,
			textAlign: "left"
		}), a = [0];
		for (let e = 10; e <= S * .3; e += 10) a.push(-e), e <= S * .2 && a.push(e);
		a.sort((e, t) => Math.abs(e) - Math.abs(t));
		for (let n of a) {
			let a = t + n, o = r(a, e.offsetHeight);
			if (o && (i(o, a), o = r(a, e.offsetHeight), o)) return i(o, a), a;
		}
		return e.classList.remove("is-beside"), Object.assign(e.style, {
			top: `${t}px`,
			left: "16px",
			width: `${C - 32}px`
		}), t;
	}, ne = () => {
		S = a(), C = u.clientWidth, w = Te(), E = C <= 760, x = E ? g ? y(Ht) : Ht : Vt, typeof t.entryX == "function" ? t.entryX(E) : t.entryX, b = Lt(x, C, S);
		let n = x.mouth[1] * b.U;
		u.style.height = `${Math.round(n + (E ? S * .3 : C * .2))}px`;
		let r = V();
		b = Lt(x, C, S, void 0, r), B = [...x.paths, ...r], te(), M = b.strokes;
		let o = b.lines["fr-l"], c = u.getBoundingClientRect();
		R = d ? d.getBoundingClientRect().top - c.top : n + C * .2, L = f.map((e) => {
			if (!o || E) return NaN;
			let t = e.getBoundingClientRect().left - c.left, n = NaN, r = Infinity;
			for (let e = 0; e < o.x.length; e++) {
				if (Math.abs(o.y[e] - R) > 60) continue;
				let i = Math.abs(o.x[e] - t);
				i < r && (r = i, n = o.gate[e]);
			}
			return n;
		}), T = Math.min(1, w), D = s(S);
		for (let [e, t] of [[i, w], [l, T]]) e.width = Math.round(innerWidth * t), e.height = Math.round((S + 2 * D) * t), e.style.width = `${innerWidth}px`, e.style.height = `${S + 2 * D}px`;
		P = [...M.filter((e) => !e.hair && !e.id?.startsWith("fr-")).map((e) => {
			let t = B.find((t) => t.id === e.id)?.after, n = t ? M.find((e) => e.id === t) : void 0;
			if (!n) return e;
			let r = Math.min(10, n.x.length - 1), i = n.x.length - 1, a = n.s[i], o = (e, t, n = (e) => e) => {
				let a = new Float32Array(r + t.length);
				for (let t = 0; t < r; t++) a[t] = n(e[i - r + t]);
				return a.set(t, r), a;
			};
			return {
				...e,
				x: o(n.x, e.x),
				y: o(n.y, e.y),
				w: o(n.w, e.w),
				gate: o(n.gate, e.gate),
				dry: o(n.dry, e.dry),
				a: o(n.a, e.a),
				s: o(n.s, e.s, (e) => e - a)
			};
		}).map((e) => ({
			...e,
			c: new Float32Array(e.x.length * 3).fill(-1)
		}))];
		let h = Mt(x, C, S);
		z = [
			h.ax,
			h.bx,
			h.ay,
			h.by
		];
		let _ = M[0];
		for (F = 1; F < _.y.length - 1 && _.y[F] < 0;) F++;
		let v = Float32Array.from(_.dry, (e, t) => t < F ? Qt : e);
		if (N = [{
			..._,
			dry: v
		}, ...M.slice(1)], ie = Math.max(...N.map((e) => e.gate[e.gate.length - 1])), re = "", ae.reset(), O) O.upload(N);
		else if (!A) {
			if (!m.has("nogl")) try {
				O = Ot(i, N, {
					name: "research ink",
					near: e,
					margin: 1
				});
			} catch {
				O = null;
			}
			O && (O.onRestore = () => {
				K = "", re = "", ce();
			}), O || (A = i.getContext("2d"));
		}
		let ne = (e, t) => e.c && e.c[0] >= 0 ? e.w[t] : e.w[t] * (E ? 5 : 7) + (E ? 30 : 52);
		if (k) k.upload(P, ne);
		else if (!j) {
			if (!m.has("nogl")) try {
				k = jt(l, `${globalThis.__P26B}home/research/yukon-wash.webp`, {
					name: "research wash",
					near: e,
					margin: 1
				});
			} catch {
				k = null;
			}
			k && (k.onRestore = () => {
				K = "", ce();
			}), k ? (k.upload(P, ne), k.onReady = () => {
				K = "", q();
			}, le && k.load()) : j = l.getContext("2d");
		}
		I = p.map((e, t) => {
			let [n, r, i, a] = x.beats[t], o = r * b.U;
			return Object.assign(e.style, {
				top: `${o}px`,
				width: `${Math.min(a, E ? C - 32 : C * .32)}px`,
				textAlign: i,
				left: i === "left" ? `${n * C}px` : "",
				right: i === "right" ? `${(1 - n) * C}px` : ""
			}), e.classList.remove("is-beside"), E ? H(e, o) : o;
		});
		let [U, W] = [x.mouth[0] * C, n], G = E ? Math.sqrt(x.map.kx * C * x.map.ky * S) : x.map.kx * C, oe = h.ax * U + h.bx, J = h.ay * W + h.by, Y = p[2], se = E ? Math.max(W - S * .42, Y ? Y.offsetTop + Y.offsetHeight + 6 : -Infinity) : W - C * .3, ue = E ? W + S * .2 : R + C * .02, X = E ? 14 : Math.max(0, U - C * .42), Z = {
			x: X,
			y: se,
			w: (E ? C - 14 : Math.min(C, U + C * .36)) - X,
			h: ue - se
		}, [Q, $, de, fe] = Zt, pe = (e) => (e - Q) / (de - Q), me = (e) => (e - $) / (fe - $), he = oe + (Z.x - U) / G, ge = J + (Z.y - W) / G, _e = [
			pe(he),
			me(ge),
			Z.w / G / (de - Q),
			Z.h / G / (fe - $)
		], ve = b.lines[x.survivor], ye = Math.min(I[3] + S * .06, ve.gate[ve.gate.length - 1] - 160), be = p[3], xe = be && (!E || be.classList.contains("is-beside")) ? {
			x: be.offsetLeft,
			y: be.offsetTop,
			w: be.offsetWidth,
			h: be.offsetHeight
		} : void 0;
		ee?.layout(ve, Z, ye, ye + S * .5, _e, xe), E && (I[3] = Math.min(I[3], ye - S * .06)), dispatchEvent(new Event("breaks:layout"));
	}, U = (e, t) => {
		let n = A;
		n.setTransform(1, 0, 0, 1, 0, 0), n.clearRect(0, 0, i.width, i.height), n.setTransform(w, 0, 0, w, 0, -e * w), n.lineCap = "round", n.lineJoin = "round";
		for (let r of N) for (let i = 0; i < r.x.length - 1; i++) if (!(r.dry[i] >= 1e6)) {
			if (r.gate[i + 1] > t) break;
			r.y[i] < e - 20 || r.y[i] > e + S + 2 * D + 20 || (n.strokeStyle = `rgba(29, 29, 21, ${r.a[i] * (1 - Math.min(1, r.dry[i]))})`, n.lineWidth = r.w[i], n.beginPath(), n.moveTo(r.x[i], r.y[i]), n.lineTo(r.x[i + 1], r.y[i + 1]), n.stroke());
		}
		if (!j) return;
		let r = j;
		r.setTransform(1, 0, 0, 1, 0, 0), r.clearRect(0, 0, l.width, l.height), r.setTransform(T, 0, 0, T, 0, -e * T), r.save(), r.beginPath(), r.rect(0, 0, C, 1e6), r.clip(), r.lineCap = "round", r.lineJoin = "round", r.strokeStyle = "rgba(120, 100, 165, .13)";
		for (let e of P) {
			r.lineWidth = e.w[0] * 2.6 + 16, r.beginPath();
			let n = !1;
			for (let i = 0; i < e.x.length && !(e.gate[i] > t || e.dry[i] > .6); i++) n ? r.lineTo(e.x[i], e.y[i]) : (r.moveTo(e.x[i], e.y[i]), n = !0);
			n && r.stroke();
		}
		r.restore();
	}, W, G = () => {
		if (!ee) return 0;
		let e = W ?? (W = document.querySelector("[data-team]")), t = X(+(window.__team?.dev ?? 0));
		return e ? X((S - e.getBoundingClientRect().top - De()) / (S * .45)) : t;
	}, K = "", re = "", ie = Infinity, ae = Ee(), q = () => {
		let t = e.getBoundingClientRect(), n = t.bottom > -40 && t.top < S + 40;
		if (Y(i, n), Y(l, n), !n && !Z) {
			K = "", re = "";
			return;
		}
		let a = u.getBoundingClientRect(), o = ae.at(c(D), D), s = scrollY, d = `translate3d(0, ${o - Math.round((t.top + s) * 64) / 64}px, 0)`;
		J(i, "transform", d), J(l, "transform", d);
		let m = o - (a.top + s), h = r ? Infinity : -a.top - De() + S * we(), g = r ? 0 : G(), _ = `${m.toFixed(1)}|${h.toFixed(1)}|${g.toFixed(4)}`;
		if (_ === K) return;
		K = _;
		let v = `${m.toFixed(1)}|${Math.min(h, ie).toFixed(1)}`;
		v !== re && (re = v, O ? O.draw(m, h, w) : A && U(m, h)), k?.draw(m, h, T, {
			wick: S * .3,
			rec: g,
			dens: E ? .54 : .5,
			aff: z,
			inset: D
		}), ee?.draw(h, g), p.forEach((e, t) => J(e, "--w", r ? "1" : X((h - I[t] - S * .06) / (S * .3)).toFixed(3))), f.forEach((e, t) => {
			let n = L[t];
			J(e, "--r", r || Number.isNaN(n) ? "1" : X((h - n) / (S * .22)).toFixed(3));
		});
	}, oe = 0, ce = () => {
		oe || (oe = requestAnimationFrame(() => {
			oe = 0, q(), Oe() && ce();
		}));
	}, le = !1, Z = !1;
	se(e, async () => {
		le = !0, k?.load(), await ue(e), ee?.load(), await ue(e), await new Promise((e) => setTimeout(e, 1200)), await ue(e), Z = !0, K = "", q(), Z = !1, K = "";
	}, "250%"), ne(), q(), addEventListener("scroll", ce, { passive: !0 }), addEventListener("team:develop", ce);
	let Q = 0;
	o(() => {
		clearTimeout(Q), Q = window.setTimeout(() => {
			ne(), K = "", q();
		}, 120);
	}), document.fonts?.ready.then(() => {
		ne(), K = "", q();
	}), window.__br = () => ({
		L: b,
		tip: -u.getBoundingClientRect().top - De() + S * we()
	}), ((n = window).__lineReg ?? (n.__lineReg = {})).research = () => {
		let e = u.getBoundingClientRect(), t = e.left + scrollX, n = e.top + scrollY, r = Object.fromEntries(B.map((e) => [e.id, {
			from: e.from,
			after: e.after,
			end: e.end
		}]));
		return N.map((e, i) => ({
			id: e.id ?? `hair${i}`,
			hair: !!e.hair,
			...e.id ? r[e.id] : {},
			x: Array.from(e.x, (e) => e + t),
			y: Array.from(e.y, (e) => e + n),
			w: Array.from(e.w),
			gate: Array.from(e.gate, (e) => e + n),
			dry: Array.from(e.dry)
		}));
	};
	let $ = {
		update: () => {
			K = "", q();
		},
		relayout: () => {
			ne(), K = "", q();
		},
		entry: () => {
			let e = M[0], t = 1;
			for (; t < e.y.length - 1 && e.y[t] < 0;) t++;
			let n = (0 - e.y[t - 1]) / (e.y[t] - e.y[t - 1] || 1), r = (e) => e[t - 1] + (e[t] - e[t - 1]) * n, i = e.x[t] - e.x[t - 1], a = e.y[t] - e.y[t - 1], o = Math.hypot(i, a) || 1;
			return {
				x: r(e.x),
				gate: r(e.gate),
				w: r(e.w),
				tx: i / o,
				ty: a / o
			};
		},
		joint: () => {
			let e = M[0], t = u.getBoundingClientRect(), n = t.left + scrollX, r = t.top + scrollY, i = [
				F - 1,
				F,
				F + 1
			];
			return {
				x: i.map((t) => e.x[t] + n),
				y: i.map((t) => e.y[t] + r),
				w: i.map((t) => e.w[t]),
				gate: i.map((t) => e.gate[t] + r),
				a: i.map((t) => e.a[t])
			};
		},
		frameEnd: () => {
			let e = b?.ends["fr-l"], t = b?.ends["fr-r"];
			if (!e || !t) return null;
			let n = u.getBoundingClientRect(), r = n.left + scrollX, i = n.top + scrollY;
			return {
				x: (e.x + t.x) / 2 + r,
				y: Math.max(e.y, t.y) + i,
				gate: Math.max(e.gate, t.gate) + i
			};
		},
		draw: u,
		section: e
	};
	return window.__breaks = $, $;
}
//#endregion
//#region src/home/research/peel.ts
var en = [
	145 / 255,
	40 / 255,
	62 / 255
], tn = [
	70 / 255,
	98 / 255,
	132 / 255
], nn = [
	29 / 255,
	29 / 255,
	21 / 255
], rn = (e, t, n) => [
	e[0] + (t[0] - e[0]) * n,
	e[1] + (t[1] - e[1]) * n,
	e[2] + (t[2] - e[2]) * n
], an = (e, t, n) => {
	let r = e / t, i = r < 1 ? r : 1, a = r < 1 ? 1 : 1 / r;
	return [
		X(n[0] - i / 2, 0, 1 - i),
		X(n[1] - a / 2, 0, 1 - a),
		i,
		a
	];
};
async function on(e) {
	var t;
	let n = matchMedia("(prefers-reduced-motion: reduce)").matches, r;
	try {
		r = await (await fetch(`${globalThis.__P26B}home/research/peel.json`)).json();
	} catch {
		return;
	}
	let i = document.querySelector("[data-strip-row]");
	if (!i) return;
	let l = document.createElement("canvas");
	l.className = "pl-ink", l.setAttribute("aria-hidden", "true"), document.body.append(l);
	let u = null, d = null, f = 1, p = 0, m = 0, h = 0, g = () => {
		f = Te(), p = innerWidth, m = a(), h = s(m), l.width = Math.round(p * f), l.height = Math.round((m + 2 * h) * f), l.style.width = `${p}px`, l.style.height = `${m + 2 * h}px`;
	};
	g();
	let _ = (e) => !!C && C.bottom > scrollY - m * e && C.top < scrollY + m * (1 + e);
	if (!new URLSearchParams(location.search).has("nogl")) try {
		u = Ot(l, [], {
			name: "peel",
			near: _
		});
	} catch {
		u = null;
	}
	u && (u.onRestore = () => {
		T = "", k();
	}), u || (d = l.getContext("2d"));
	let v = () => !!i.querySelector(`.dm-slice[data-place="${r[matchMedia("(max-width: 760px)").matches ? "narrow" : "wide"].place}"]`), y = () => {
		let e = i.peelRest;
		return !e || e();
	}, b = (e, t, r) => {
		let i = n ? Infinity : be() + m * we(), a = e[t - 1], o = e[0], s = e.length;
		return e.map((e, n) => {
			if (n === s - 1) return Qt;
			if (r && n < t) return 1.5;
			if (n >= t - 1) return 0;
			let c = a + m * .16 + (e - o) * .9;
			return X((i - c) / (m * .12)) ** 1.1 * 1.18;
		});
	}, x = () => {
		let t = matchMedia("(max-width: 760px)").matches, n = r[t ? "narrow" : "wide"], a = i.querySelector(`.dm-slice[data-place="${n.place}"]`), o = i.peelFrom;
		if (!a && !o) return null;
		let s = scrollY, c, l;
		if (a) {
			let e = a.getBoundingClientRect(), [t, r, i, o] = an(e.width, e.height, n.focal), u = e.left, d = e.top + s;
			l = d + e.height, c = n.pts.map(([n, a]) => [u + (n - t) / i * e.width, d + (a - r) / o * e.height]);
		} else {
			let e = o();
			if (!e) return null;
			c = e.pts, l = e.bottom;
		}
		let u = [], d = [];
		for (let e = 0; e < 2; e++) {
			let e = [c[0]];
			for (let t = 0; t < c.length - 1; t++) {
				let [n, r] = c[t], [i, a] = c[t + 1];
				e.push([n * .75 + i * .25, r * .75 + a * .25], [n * .25 + i * .75, r * .25 + a * .75]);
			}
			e.push(c[c.length - 1]), c = e;
		}
		{
			let e = [c[0]], t = 0;
			for (let n = 1; n < c.length; n++) {
				let [r, i] = c[n - 1], [a, o] = c[n], s = Math.hypot(a - r, o - i);
				for (; t + s >= 3;) {
					let n = (3 - t) / s;
					r += (a - r) * n, i += (o - i) * n, e.push([r, i]), s = Math.hypot(a - r, o - i), t = 0;
				}
				t += s;
			}
			e.push(c[c.length - 1]);
			let n = e.length - 1, r = Math.max(0, n - 3), i = e[n][0] - e[r][0], a = e[n][1] - e[r][1], o = Math.hypot(i, a) || 1;
			for (let t = 1; t <= 10; t++) e.push([e[n][0] + i / o * 3 * t, e[n][1] + a / o * 3 * t]);
			for (let t = 0; t < 2; t++) {
				let n = t ? c : e;
				c = n.map((e, t) => {
					let r = Math.min(4, t, n.length - 1 - t), i = 0, a = 0;
					for (let e = -r; e <= r; e++) i += n[t + e][0], a += n[t + e][1];
					return [i / (2 * r + 1), a / (2 * r + 1)];
				});
			}
			c = c.slice(0, c.length - 10);
		}
		for (let [e, t] of c) {
			if (t >= l) {
				let n = u[u.length - 1], r = d[d.length - 1];
				if (n != null && r < l) {
					let i = (l - r) / (t - r);
					u.push(n + (e - n) * i), d.push(l);
				}
				break;
			}
			u.push(e), d.push(t);
		}
		if (u.length < 3) return null;
		if (d[d.length - 1] < l - .5 && (u.push(u[u.length - 1]), d.push(l)), t) {
			let e = u.length - 1, t = Math.max(0, e - 8), n = u[e] - u[t], r = d[e] - d[t], i = Math.hypot(n, r) || 1;
			u.splice(0, e, u[e] - n / i * 4), d.splice(0, e, d[e] - r / i * 4);
		}
		let f = u.length, p = e.joint(), m = p.x[1] - p.x[0], h = p.y[1] - p.y[0], g = Math.hypot(m, h) || 1;
		m /= g, h /= g;
		let _ = {
			x: p.x[0],
			w: p.w[0],
			tx: m,
			ty: h
		}, v = u[f - 1], x = d[f - 1], S = Math.min(f - 1, 2), C = v - u[f - 1 - S], w = x - d[f - 1 - S], T = Math.hypot(C, w) || 1;
		if (C /= T, w /= T, w < .35) {
			w = .35;
			let e = Math.hypot(C, w);
			C /= e, w /= e;
		}
		let E = p.x[0], D = p.y[0], O = Math.hypot(E - v, D - x), k = v + C * O * .42, A = x + w * O * .42, j = E - _.tx * O * .46, M = D - _.ty * O * .46, N = Math.max(8, Math.ceil(O * 1.15 / 1.5)), P = [], F = [];
		for (let e = 1; e <= N; e++) {
			let t = e / N, n = 1 - t;
			P.push(n * n * n * v + 3 * n * n * t * k + 3 * n * t * t * j + t * t * t * E), F.push(n * n * n * x + 3 * n * n * t * A + 3 * n * t * t * M + t * t * t * D);
		}
		let I = [...u, ...P], L = [...d, ...F], R = It(I, L, 0).s, z = R[f - 1], B = R[R.length - 1], ee = [], V = [], te = [];
		for (let e = 0; e < I.length; e++) {
			let t = R[e];
			if (e >= f) {
				let n = Math.max(0, e - 1), r = Math.min(I.length - 1, e + 1), i = I[r] - I[n], a = L[r] - L[n], o = Math.hypot(i, a) || 1;
				i /= o, a /= o;
				let s = Q(z, z + 80, t) * (1 - Q(B - 90, B, t)) * (5 * Math.sin((t - z) / 330 * 6.28 + .8) + .9 * (.65 * Math.sin(t / 84 * 6.28 + 1.9) + .35 * Math.sin(t / 36 * 6.28 + 4.1)));
				ee.push(I[e] - a * s), V.push(L[e] + i * s);
			} else ee.push(I[e]), V.push(L[e]);
			if (e < f) {
				te.push(1.7 + 1.3 * Q(0, z, t));
				continue;
			}
			let n = Q(z, z + Math.min(260, (B - z) * .7), t), r = Q(B - 120, B, t), i = 1 + .1 * Math.sin(t / 190 * 6.28 + 2.3);
			te.push((3 + (_.w - 3) * n) * (i * (1 - r) + r));
		}
		ee.push(p.x[1], p.x[2]), V.push(p.y[1], p.y[2]), te.push(p.w[1], p.w[2]);
		let H = It(ee.slice(0, -2), V.slice(0, -2), 0).g, ne = p.gate[0] - H[H.length - 1], U = [
			...H.map((e) => e + ne),
			p.gate[1],
			p.gate[2]
		], W = !a && y(), G = b(U, f, !a && !W), K = ee.length, re = It(ee, V, 0).s, ie = new Float32Array(K * 3);
		for (let e = 0; e < K; e++) {
			let t = e >= R.length ? 1 : Q(z + (B - z) * .12, z + (B - z) * .68, R[e]), n = Math.sin(Math.PI * X(t * 1.25)) * .35, r = a ? rn(rn(en, tn, n), nn, t) : nn;
			ie[e * 3] = r[0], ie[e * 3 + 1] = r[1], ie[e * 3 + 2] = r[2];
		}
		return {
			stroke: {
				x: Float32Array.from(ee),
				y: Float32Array.from(V),
				w: Float32Array.from(te),
				gate: Float32Array.from(U),
				dry: Float32Array.from(G),
				a: Float32Array.from({ length: K }, (e, t) => t >= K - 3 ? p.a[t - (K - 3)] : .93),
				s: Float32Array.from(re),
				c: ie
			},
			top: Math.min(...V),
			bottom: Math.max(...V),
			gate: U,
			nIn: f,
			rest: W
		};
	}, S = (e, t, n) => {
		let r = d;
		r.setTransform(1, 0, 0, 1, 0, 0), r.clearRect(0, 0, l.width, l.height), r.setTransform(f, 0, 0, f, 0, -t * f), r.lineCap = "round", r.lineJoin = "round";
		for (let t = 0; t < e.x.length - 1 && !(e.dry[t + 1] >= 1e6 || e.gate[t + 1] > n); t++) {
			let n = t * 3, i = e.c ?? new Float32Array([
				29 / 255,
				29 / 255,
				21 / 255
			]), a = e.c ? n : 0;
			r.strokeStyle = `rgba(${Math.round(i[a] * 255)}, ${Math.round(i[a + 1] * 255)}, ${Math.round(i[a + 2] * 255)}, ${e.a[t] * (1 - Math.min(1, e.dry[t]))})`, r.lineWidth = e.w[t], r.beginPath(), r.moveTo(e.x[t], e.y[t]), r.lineTo(e.x[t + 1], e.y[t + 1]), r.stroke();
		}
	}, C = null, w = !0, T = "", E = Ee(), D = () => {
		w && (C = x(), w = !1, T = "", C && u && u.upload([C.stroke])), C && !v() && y() !== C.rest && (C.rest = !C.rest, C.stroke.dry = Float32Array.from(b(C.gate, C.nIn, !C.rest)), T = "", u && u.upload([C.stroke]));
		let e = C, t = scrollY, r = !!e && e.bottom > t - 40 && e.top < t + m + 40;
		if (Y(l, r), !r) {
			T = "";
			return;
		}
		let i = n ? Infinity : be() + m * we(), a = E.at(c(h, m + 2 * h), h), o = `${a}|${Math.min(i, e.gate[e.gate.length - 1]).toFixed(2)}`;
		o !== T && (T = o, l.style.transform = `translate3d(0, ${a}px, 0)`, u ? u.draw(a, i, f) : d && S(e.stroke, a, i));
	}, O = 0, k = () => {
		O || (O = requestAnimationFrame(() => {
			O = 0, D(), Oe() && k();
		}));
	};
	addEventListener("scroll", k, { passive: !0 }), o(() => {
		g(), E.reset(), w = !0, k();
	});
	let A = 0, j = () => {
		v() && (w = !0), D(), performance.now() < A && requestAnimationFrame(j);
	}, M = () => {
		let e = performance.now() > A;
		A = performance.now() + 900, e && requestAnimationFrame(j);
	};
	i.addEventListener("pointerover", M), i.addEventListener("pointerleave", M), i.addEventListener("focusin", M), i.addEventListener("focusout", M), new ResizeObserver(() => {
		w = !0, k();
	}).observe(i), addEventListener("breaks:layout", () => {
		w = !0, k();
	}), document.fonts?.ready.then(() => {
		w = !0, k();
	}), D(), window.__peel = () => x(), ((t = window).__lineReg ?? (t.__lineReg = {})).peel = () => {
		let e = C ?? x();
		if (!e) return [];
		let t = e.stroke;
		return [{
			id: "peel",
			x: Array.from(t.x),
			y: Array.from(t.y),
			w: Array.from(t.w),
			gate: Array.from(t.gate),
			dry: Array.from(t.dry)
		}];
	};
}
//#endregion
//#region src/home/team/teamline.ts
function sn(e, t, n, r) {
	let i = r + 3, a = [];
	for (let r of e) for (let o of e) {
		if (r === o) continue;
		let e = o.left - r.right, s = o.top - r.bottom;
		if (e > -1 && e < i) {
			let e = Math.max(r.top, o.top), i = Math.min(r.bottom, o.bottom);
			i - e > 4 && a.push({
				id: "",
				vertical: !0,
				at: (r.right + o.left) / 2 + t,
				a: e + n,
				b: i + n
			});
		}
		if (s > -1 && s < i) {
			let e = Math.max(r.left, o.left), i = Math.min(r.right, o.right);
			i - e > 4 && a.push({
				id: "",
				vertical: !1,
				at: (r.bottom + o.top) / 2 + n,
				a: e + t,
				b: i + t
			});
		}
	}
	let o = [];
	for (let e of a.sort((e, t) => Number(e.vertical) - Number(t.vertical) || e.at - t.at || e.a - t.a)) {
		let t = o.find((t) => t.vertical === e.vertical && Math.abs(t.at - e.at) < 2 && e.a <= t.b + i && e.b >= t.a - i);
		t ? (t.a = Math.min(t.a, e.a), t.b = Math.max(t.b, e.b), t.at = (t.at + e.at) / 2) : o.push({ ...e });
	}
	return o.forEach((e, t) => {
		e.id = `tl-g${t}`;
	}), o;
}
function cn(e) {
	var t;
	let n = e.querySelector(".tm-block"), r = e.querySelector(".tm-head");
	if (!n) return;
	let i = matchMedia("(prefers-reduced-motion: reduce)").matches, l = new URLSearchParams(location.search), u = l.get("teamline") === "stay" ? "stay" : "fade", d = document.createElement("canvas");
	d.className = "tm-line", d.setAttribute("aria-hidden", "true"), document.body.append(d);
	let f = null, p = null, m = [], h = 0, g = 1, _ = 0, v = 0, y = 0, b = 0, x = {}, S = "", C = () => {
		let e = window.__breaks?.frameEnd?.();
		if (e) return e;
		let t = document.querySelector("[data-block]")?.getBoundingClientRect();
		if (!t) return null;
		let n = t.bottom + scrollY;
		return {
			x: t.left + t.width / 2 + scrollX,
			y: n,
			gate: n
		};
	}, w = () => {
		h = a(), g = Te();
		let e = innerWidth <= 760, t = scrollX, i = scrollY, o = n.getBoundingClientRect(), c = [...n.querySelectorAll("img")].map((e) => e.getBoundingClientRect()), u = parseFloat(getComputedStyle(n).rowGap) || 6, w = e ? 7 : 11, T = e ? 32 : 34, E = o.left + t - w, D = o.right + t + w, k = o.top + i - w, A = o.bottom + i + w, j = (E + D) / 2, M = C() ?? {
			x: j,
			y: k - h * .5,
			gate: k - h * .5
		}, N = r?.getBoundingClientRect(), P = Infinity, F = -Infinity;
		r?.querySelectorAll("h2, a").forEach((e) => {
			let n = document.createRange();
			n.selectNodeContents(e);
			for (let e of n.getClientRects()) P = Math.min(P, e.left + t), F = Math.max(F, e.right + t);
		});
		let I = E + (D - E) * .3, L = P === Infinity || I < P - 36 || I > F + 36 ? I : D - (F + 36) >= T * 1.6 ? Math.min(D - T * 1.6, (F + 36 + D) / 2) : P - 36 >= E + T * 1.6 ? P - 36 : e && F !== -Infinity && D - F >= 26 ? D : E, R = N ? N.top + i : k - 120, z = e && l.get("mline") === "simple", B = z ? 1.25 : 1, ee = (e ? 3 : 3.8) * B, V = (e ? 2.6 : 3.2) * B, te = (e ? 1.5 : 2.1) * (z ? 1.25 : 1), H = z ? {
			tremor: .2,
			drift: 1.3,
			tw: 90
		} : {
			tremor: .7,
			drift: 2.6,
			tw: 90
		}, ne = [], U = Math.min(M.y + (R - M.y) * .45, R - 40), W = e ? 30 : 48, G = k - W;
		ne.push({
			id: "tl-drop",
			w: ee,
			seed: 41,
			...H,
			side: .35,
			settle: 320,
			pin: 90,
			pts: [
				[M.x, M.y],
				[M.x, M.y + 60],
				[M.x + (L - M.x) * .55, U],
				[L, Math.min(R - 10, G - 50)],
				[L, G]
			]
		});
		let K = {
			...H,
			drift: z ? 1.1 : 2.2,
			tw: 80,
			side: .16,
			settle: 260,
			pin: 60
		}, re = (e) => Array.from({ length: 8 }, (t, n) => {
			let r = (n + 1) / 8 * Math.PI / 2;
			return [L + e * W * (1 - Math.cos(r)), G + W * Math.sin(r)];
		}), ie = (e, t) => Array.from({ length: 10 }, (e, n) => {
			let r = (n + 1) / 10, i = 1 - r, a = k + W;
			return [i * i * i * L + 3 * i * i * r * L + 3 * i * r * r * t + r * r * r * t, i * i * i * G + 3 * i * i * r * (G + W) + 3 * i * r * r * k + r * r * r * a];
		}), ae = (e, t) => Math.abs(t - L) < 1 ? Rt([
			[t, G],
			[t, A],
			[j, A]
		], T).slice(1) : Math.abs(t - L) < W * 2.5 ? [...ie(e, t), ...Rt([
			[t, k + W],
			[t, A],
			[j, A]
		], T).slice(1)] : [...re(e), ...Rt([
			[L + e * W, k],
			[t, k],
			[t, A],
			[j, A]
		], T).slice(1)], q = ae(-1, E), oe = ae(1, D);
		ne.push({
			id: "tl-l",
			after: "tl-drop",
			w: V,
			seed: 42,
			...K,
			pts: q
		}), ne.push({
			id: "tl-r",
			after: "tl-drop",
			w: V,
			seed: 43,
			...K,
			pts: oe
		});
		let J = sn(c, t, i, u), Y = (e, n) => {
			let r = e[n];
			return e.vertical ? n === "a" ? r - (o.top + i) < u + 3 : o.bottom + i - r < u + 3 : n === "a" ? r - (o.left + t) < u + 3 : o.right + t - r < u + 3;
		}, se = [...J].sort((e, t) => Number(!Y(e, "a")) - Number(!Y(t, "a")) || e.at - t.at), ce = /* @__PURE__ */ new Set();
		for (let e of se) {
			let t = Y(e, "a"), n = e.vertical ? e.at < L ? "tl-l" : "tl-r" : "tl-l";
			if (!t) {
				let t = J.find((t) => t !== e && ce.has(t.id) && t.vertical !== e.vertical && Math.abs(t.at - e.a) < u + 3 && e.at >= t.a - 3 && e.at <= t.b + 3);
				t && (n = t.id);
			}
			let r = t ? e.vertical ? k : E : e.a, i = Y(e, "b") ? e.vertical ? A : D : e.b, a = e.vertical ? [
				[e.at, r],
				[e.at, (r + i) / 2],
				[e.at, i]
			] : [
				[r, e.at],
				[(r + i) / 2, e.at],
				[i, e.at]
			], o = Y(e, "b") ? e.vertical && e.at < j ? "tl-l" : "tl-r" : void 0;
			ne.push({
				id: e.id,
				from: n,
				to: o,
				w: te,
				seed: 50 + ne.length,
				tremor: .25,
				drift: .6,
				tw: 70,
				side: .22,
				pin: o ? 30 : void 0,
				pts: a
			}), ce.add(e.id);
		}
		let le = Lt({
			paths: [],
			yUnit: "vh",
			survivor: "",
			mouth: [0, 0],
			map: {
				ox: 0,
				oy: 0,
				kx: 1,
				ky: 1,
				X0: 0,
				Y0: 0
			},
			beats: []
		}, innerWidth, h, void 0, ne);
		x = Object.fromEntries(ne.map((e) => [e.id, {
			from: e.from,
			after: e.after,
			to: e.to
		}]));
		let ue = M.gate - M.y;
		m = le.strokes.map((e) => {
			let t = e.gate.slice();
			for (let e = 0; e < t.length; e++) t[e] += ue;
			return {
				...e,
				gate: t
			};
		});
		let Z = le.ends["tl-drop"].gate + ue, Q = Math.max(...m.map((e) => e.gate[e.gate.length - 1])), $ = X(((k + A) / 2 + (we() - .5) * h - Z) / Math.max(1, Q - Z), .15, 1);
		for (let e of m) for (let t = 0; t < e.gate.length; t++) e.gate[t] > Z && (e.gate[t] = Z + (e.gate[t] - Z) * $);
		if (b = Math.max(...m.map((e) => e.gate[e.gate.length - 1])), v = Math.min(M.y, k) - 20, y = A + 20, _ = s(h), d.width = Math.round(innerWidth * g), d.height = Math.round((h + 2 * _) * g), d.style.width = `${innerWidth}px`, d.style.height = `${h + 2 * _}px`, f) f.upload(m);
		else if (!p) {
			if (!l.has("nogl")) try {
				f = Ot(d, m, {
					name: "team line",
					near: (e) => scrollY + h * (1 + e) > v && scrollY - h * e < y
				});
			} catch {
				f = null;
			}
			f && (f.onRestore = () => {
				S = "", O();
			}), f || (p = d.getContext("2d"));
		}
		S = "";
	}, T = (e, t) => {
		let n = p;
		n.setTransform(1, 0, 0, 1, 0, 0), n.clearRect(0, 0, d.width, d.height), n.setTransform(g, 0, 0, g, 0, -e * g), n.lineCap = "round", n.lineJoin = "round";
		for (let r of m) for (let i = 0; i < r.x.length - 1 && !(r.gate[i + 1] > t); i++) r.y[i] < e - 20 || r.y[i] > e + h + 2 * _ + 20 || (n.strokeStyle = `rgba(29, 29, 21, ${r.a[i] * (1 - Math.min(1, r.dry[i]))})`, n.lineWidth = r.w[i], n.beginPath(), n.moveTo(r.x[i], r.y[i]), n.lineTo(r.x[i + 1], r.y[i + 1]), n.stroke());
	}, E = () => {
		let e = scrollY, t = e + h > v && e < y, n = i ? Infinity : be() + h * we(), r = u === "stay" || i ? 1 : 1 - X((n - b - h * .08) / (h * .4)), a = t ? `${e.toFixed(1)}|${n.toFixed(2)}|${r.toFixed(3)}` : "off";
		if (a === S || (S = a, J(d, "opacity", r.toFixed(3)), Y(d, t && r > 0), !t || r <= 0)) return;
		let o = c(_, h + 2 * _);
		J(d, "transform", `translate3d(0, ${o}px, 0)`), f ? f.draw(o, n, g) : p && T(o, n);
	}, D = 0, O = () => {
		D || (D = requestAnimationFrame(() => {
			D = 0, E(), Oe() && O();
		}));
	}, k = () => {
		w(), E();
	};
	k(), addEventListener("scroll", O, { passive: !0 }), addEventListener("breaks:layout", k);
	let A = 0;
	o(() => {
		clearTimeout(A), A = window.setTimeout(k, 160);
	}), document.fonts?.ready.then(k), n.querySelectorAll("img").forEach((e) => {
		e.complete || e.addEventListener("load", k, { once: !0 });
	}), window.__tl = () => ({
		doneAt: b,
		tip: be() + h * we(),
		strokes: m.length,
		mode: u
	}), ((t = window).__lineReg ?? (t.__lineReg = {})).team = () => m.map((e, t) => ({
		id: e.id ?? `hair${t}`,
		hair: !!e.hair,
		...e.id ? x[e.id] : {},
		x: Array.from(e.x),
		y: Array.from(e.y),
		w: Array.from(e.w),
		gate: Array.from(e.gate),
		dry: Array.from(e.dry)
	}));
}
//#endregion
//#region src/home/team/team.ts
function ln(e) {
	let t = 0, n = -1, r = 0, i = () => {
		r = 0;
		let i = innerHeight;
		t = X((i - e.getBoundingClientRect().top - De()) / (i * .5)), Math.abs(t - n) > 1e-4 && (n = t, window.__team = { dev: t }, dispatchEvent(new CustomEvent("team:develop", { detail: { dev: t } }))), Oe() && a();
	}, a = () => {
		r || (r = requestAnimationFrame(i));
	};
	return addEventListener("scroll", a, { passive: !0 }), addEventListener("resize", a), i(), cn(e), { dev: () => t };
}
//#endregion
//#region src/home/footer/footer.ts
function un(e) {
	let t = e.querySelector("[data-drawer]");
	if (!t) return;
	let n = () => t.classList.toggle("no-reveal", t.offsetHeight > innerHeight);
	addEventListener("resize", n), new ResizeObserver(n).observe(t), n();
	let r = document.documentElement, i = () => {
		r.classList.remove("en-pre"), removeEventListener("scroll", a);
	}, a = () => {
		scrollY > 0 && i();
	};
	addEventListener("scroll", a, { passive: !0 });
	let o = () => {
		let e = t.getBoundingClientRect();
		if (e.top >= innerHeight || e.bottom <= 0) return;
		let n = document.elementFromPoint(innerWidth / 2, Math.max(e.top, Math.min(innerHeight, e.bottom) - 2));
		n && t.contains(n) && i();
	};
	a(), o(), addEventListener("load", o);
}
//#endregion
//#region src/webflow/home.ts
var dn = (e) => document.querySelector(e), fn = (e) => /^(https?:)?\/\//.test(e) ? e : t + e.replace(/^\//, "");
document.querySelectorAll("img[data-p26-src]").forEach((e) => {
	e.src = fn(e.dataset.p26Src);
}), document.querySelectorAll("[data-plate]").forEach((e) => {
	e.dataset.plate = fn(e.dataset.plate);
});
var pn = dn(".p26-page > .p26-nav"), mn = dn("[data-line] .ln-hd");
pn && mn && mn.appendChild(pn), document.documentElement.classList.add("p26-home-live"), m(dn("[data-fit]")), et(), tt(mn, () => !!document.querySelector("[data-p26=\"menu-sheet\"].p26-is-open")), bt(lt({ meta: n }));
var hn = dn("[data-breaks]");
hn && on($t(hn, { entryX: (e) => e ? .5 : .6 }));
var gn = dn("[data-team]");
gn && ln(gn);
var _n = dn(".p26-page > .p26-footer"), vn = dn(".p26-page");
_n && vn && (_n.setAttribute("data-drawer", ""), un(vn));
//#endregion
