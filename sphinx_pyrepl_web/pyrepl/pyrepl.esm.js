import{d as Jr,e as Br,f as Cr,g as Ir,i as Pr}from"./chunk-ftjk4vft.js";var K=globalThis,O=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,A=Symbol(),R=new WeakMap;class D{constructor(r,n,e){if(this._$cssResult$=!0,e!==A)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=n}get styleSheet(){let r=this.o,n=this.t;if(O&&r===void 0){let e=n!==void 0&&n.length===1;e&&(r=R.get(n)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),e&&R.set(n,r))}return r}toString(){return this.cssText}}var M=(r)=>new D(typeof r=="string"?r:r+"",void 0,A);var rr=(r,n)=>{if(O)r.adoptedStyleSheets=n.map((e)=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of n){let l=document.createElement("style"),o=K.litNonce;o!==void 0&&l.setAttribute("nonce",o),l.textContent=e.cssText,r.appendChild(l)}},T=O?(r)=>r:(r)=>r instanceof CSSStyleSheet?((n)=>{let e="";for(let l of n.cssRules)e+=l.cssText;return M(e)})(r):r;var{is:Kr,defineProperty:Or,getOwnPropertyDescriptor:Wr,getOwnPropertyNames:Yr,getOwnPropertySymbols:Xr,getPrototypeOf:$r}=Object,Y=globalThis,nr=Y.trustedTypes,Dr=nr?nr.emptyScript:"",Tr=Y.reactiveElementPolyfillSupport,F=(r,n)=>r,W={toAttribute(r,n){switch(n){case Boolean:r=r?Dr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,n){let e=r;switch(n){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch(l){e=null}}return e}},V=(r,n)=>!Kr(r,n),er={attribute:!0,type:String,converter:W,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;class a extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,n=er){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(r,n),!n.noAccessor){let e=Symbol(),l=this.getPropertyDescriptor(r,e,n);l!==void 0&&Or(this.prototype,r,l)}}static getPropertyDescriptor(r,n,e){let{get:l,set:o}=Wr(this.prototype,r)??{get(){return this[n]},set(_){this[n]=_}};return{get:l,set(_){let s=l?.call(this);o?.call(this,_),this.requestUpdate(r,s,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??er}static _$Ei(){if(this.hasOwnProperty(F("elementProperties")))return;let r=$r(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F("properties"))){let n=this.properties,e=[...Yr(n),...Xr(n)];for(let l of e)this.createProperty(l,n[l])}let r=this[Symbol.metadata];if(r!==null){let n=litPropertyMetadata.get(r);if(n!==void 0)for(let[e,l]of n)this.elementProperties.set(e,l)}this._$Eh=new Map;for(let[n,e]of this.elementProperties){let l=this._$Eu(n,e);l!==void 0&&this._$Eh.set(l,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let n=[];if(Array.isArray(r)){let e=new Set(r.flat(1/0).reverse());for(let l of e)n.unshift(T(l))}else r!==void 0&&n.push(T(r));return n}static _$Eu(r,n){let e=n.attribute;return e===!1?void 0:typeof e=="string"?e:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((r)=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((r)=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,n=this.constructor.elementProperties;for(let e of n.keys())this.hasOwnProperty(e)&&(r.set(e,this[e]),delete this[e]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return rr(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((r)=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach((r)=>r.hostDisconnected?.())}attributeChangedCallback(r,n,e){this._$AK(r,e)}_$ET(r,n){let e=this.constructor.elementProperties.get(r),l=this.constructor._$Eu(r,e);if(l!==void 0&&e.reflect===!0){let o=(e.converter?.toAttribute!==void 0?e.converter:W).toAttribute(n,e.type);this._$Em=r,o==null?this.removeAttribute(l):this.setAttribute(l,o),this._$Em=null}}_$AK(r,n){let e=this.constructor,l=e._$Eh.get(r);if(l!==void 0&&this._$Em!==l){let o=e.getPropertyOptions(l),_=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:W;this._$Em=l;let s=_.fromAttribute(n,o.type);this[l]=s??this._$Ej?.get(l)??s,this._$Em=null}}requestUpdate(r,n,e,l=!1,o){if(r!==void 0){let _=this.constructor;if(l===!1&&(o=this[r]),e??=_.getPropertyOptions(r),!((e.hasChanged??V)(o,n)||e.useDefault&&e.reflect&&o===this._$Ej?.get(r)&&!this.hasAttribute(_._$Eu(r,e))))return;this.C(r,n,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,n,{useDefault:e,reflect:l,wrapped:o},_){e&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,_??n??this[r]),o!==!0||_!==void 0)||(this._$AL.has(r)||(this.hasUpdated||e||(n=void 0),this._$AL.set(r,n)),l===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[l,o]of this._$Ep)this[l]=o;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[l,o]of e){let{wrapped:_}=o,s=this[l];_!==!0||this._$AL.has(l)||s===void 0||this.C(l,void 0,o,s)}}let r=!1,n=this._$AL;try{r=this.shouldUpdate(n),r?(this.willUpdate(n),this._$EO?.forEach((e)=>e.hostUpdate?.()),this.update(n)):this._$EM()}catch(e){throw r=!1,this._$EM(),e}r&&this._$AE(n)}willUpdate(r){}_$AE(r){this._$EO?.forEach((n)=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach((n)=>this._$ET(n,this[n])),this._$EM()}updated(r){}firstUpdated(r){}}a.elementStyles=[],a.shadowRootOptions={mode:"open"},a[F("elementProperties")]=new Map,a[F("finalized")]=new Map,Tr?.({ReactiveElement:a}),(Y.reactiveElementVersions??=[]).push("2.1.2");var Z=globalThis,lr=(r)=>r,X=Z.trustedTypes,or=X?X.createPolicy("lit-html",{createHTML:(r)=>r}):void 0;var f=`lit$${Math.random().toFixed(9).slice(2)}$`,cr="?"+f,Vr=`<${cr}>`,v=document,q=()=>v.createComment(""),G=(r)=>r===null||typeof r!="object"&&typeof r!="function",g=Array.isArray,Zr=(r)=>g(r)||typeof r?.[Symbol.iterator]=="function";var N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_r=/-->/g,sr=/>/g,i=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pr=/'/g,wr=/"/g,dr=/^(?:script|style|textarea|title)$/i,z=(r)=>(n,...e)=>({_$litType$:r,strings:n,values:e}),xr=z(1),sn=z(2),pn=z(3),t=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),yr=new WeakMap,b=v.createTreeWalker(v,129);function mr(r,n){if(!g(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return or!==void 0?or.createHTML(n):n}var gr=(r,n)=>{let e=r.length-1,l=[],o,_=n===2?"<svg>":n===3?"<math>":"",s=N;for(let p=0;p<e;p++){let y=r[p],d,w,x=-1,m=0;for(;m<y.length&&(s.lastIndex=m,w=s.exec(y),w!==null);)m=s.lastIndex,s===N?w[1]==="!--"?s=_r:w[1]!==void 0?s=sr:w[2]!==void 0?(dr.test(w[2])&&(o=RegExp("</"+w[2],"g")),s=i):w[3]!==void 0&&(s=i):s===i?w[0]===">"?(s=o??N,x=-1):w[1]===void 0?x=-2:(x=s.lastIndex-w[2].length,d=w[1],s=w[3]===void 0?i:w[3]==='"'?wr:pr):s===wr||s===pr?s=i:s===_r||s===sr?s=N:(s=i,o=void 0);let u=s===i&&r[p+1].startsWith("/>")?" ":"";_+=s===N?y+Vr:x>=0?(l.push(d),y.slice(0,x)+"$lit$"+y.slice(x)+f+u):y+f+(x===-2?p:u)}return[mr(r,_+(r[e]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),l]};class J{constructor({strings:r,_$litType$:n},e){let l;this.parts=[];let o=0,_=0,s=r.length-1,p=this.parts,[y,d]=gr(r,n);if(this.el=J.createElement(y,e),b.currentNode=this.el.content,n===2||n===3){let w=this.el.content.firstChild;w.replaceWith(...w.childNodes)}for(;(l=b.nextNode())!==null&&p.length<s;){if(l.nodeType===1){if(l.hasAttributes())for(let w of l.getAttributeNames())if(w.endsWith("$lit$")){let x=d[_++],m=l.getAttribute(w).split(f),u=/([.?@])?(.*)/.exec(x);p.push({type:1,index:o,name:u[2],strings:m,ctor:u[1]==="."?ar:u[1]==="?"?fr:u[1]==="@"?ir:C}),l.removeAttribute(w)}else w.startsWith(f)&&(p.push({type:6,index:o}),l.removeAttribute(w));if(dr.test(l.tagName)){let w=l.textContent.split(f),x=w.length-1;if(x>0){l.textContent=X?X.emptyScript:"";for(let m=0;m<x;m++)l.append(w[m],q()),b.nextNode(),p.push({type:2,index:++o});l.append(w[x],q())}}}else if(l.nodeType===8)if(l.data===cr)p.push({type:2,index:o});else{let w=-1;for(;(w=l.data.indexOf(f,w+1))!==-1;)p.push({type:7,index:o}),w+=f.length-1}o++}}static createElement(r,n){let e=v.createElement("template");return e.innerHTML=r,e}}function S(r,n,e=r,l){if(n===t)return n;let o=l!==void 0?e._$Co?.[l]:e._$Cl,_=G(n)?void 0:n._$litDirective$;return o?.constructor!==_&&(o?._$AO?.(!1),_===void 0?o=void 0:(o=new _(r),o._$AT(r,e,l)),l!==void 0?(e._$Co??=[])[l]=o:e._$Cl=o),o!==void 0&&(n=S(r,o._$AS(r,n.values),o,l)),n}class ur{constructor(r,n){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:n},parts:e}=this._$AD,l=(r?.creationScope??v).importNode(n,!0);b.currentNode=l;let o=b.nextNode(),_=0,s=0,p=e[0];for(;p!==void 0;){if(_===p.index){let y;p.type===2?y=new B(o,o.nextSibling,this,r):p.type===1?y=new p.ctor(o,p.name,p.strings,this,r):p.type===6&&(y=new br(o,this,r)),this._$AV.push(y),p=e[++s]}_!==p?.index&&(o=b.nextNode(),_++)}return b.currentNode=v,l}p(r){let n=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(r,e,n),n+=e.strings.length-2):e._$AI(r[n])),n++}}class B{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,n,e,l){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=r,this._$AB=n,this._$AM=e,this.options=l,this._$Cv=l?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,n=this._$AM;return n!==void 0&&r?.nodeType===11&&(r=n.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,n=this){r=S(this,r,n),G(r)?r===c||r==null||r===""?(this._$AH!==c&&this._$AR(),this._$AH=c):r!==this._$AH&&r!==t&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):Zr(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==c&&G(this._$AH)?this._$AA.nextSibling.data=r:this.T(v.createTextNode(r)),this._$AH=r}$(r){let{values:n,_$litType$:e}=r,l=typeof e=="number"?this._$AC(r):(e.el===void 0&&(e.el=J.createElement(mr(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===l)this._$AH.p(n);else{let o=new ur(l,this),_=o.u(this.options);o.p(n),this.T(_),this._$AH=o}}_$AC(r){let n=yr.get(r.strings);return n===void 0&&yr.set(r.strings,n=new J(r)),n}k(r){g(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,e,l=0;for(let o of r)l===n.length?n.push(e=new B(this.O(q()),this.O(q()),this,this.options)):e=n[l],e._$AI(o),l++;l<n.length&&(this._$AR(e&&e._$AB.nextSibling,l),n.length=l)}_$AR(r=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);r!==this._$AB;){let e=lr(r).nextSibling;lr(r).remove(),r=e}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}}class C{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,n,e,l,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=r,this.name=n,this._$AM=l,this.options=o,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=c}_$AI(r,n=this,e,l){let o=this.strings,_=!1;if(o===void 0)r=S(this,r,n,0),_=!G(r)||r!==this._$AH&&r!==t,_&&(this._$AH=r);else{let s=r,p,y;for(r=o[0],p=0;p<o.length-1;p++)y=S(this,s[e+p],n,p),y===t&&(y=this._$AH[p]),_||=!G(y)||y!==this._$AH[p],y===c?r=c:r!==c&&(r+=(y??"")+o[p+1]),this._$AH[p]=y}_&&!l&&this.j(r)}j(r){r===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}}class ar extends C{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===c?void 0:r}}class fr extends C{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==c)}}class ir extends C{constructor(r,n,e,l,o){super(r,n,e,l,o),this.type=5}_$AI(r,n=this){if((r=S(this,r,n,0)??c)===t)return;let e=this._$AH,l=r===c&&e!==c||r.capture!==e.capture||r.once!==e.once||r.passive!==e.passive,o=r!==c&&(e===c||l);l&&this.element.removeEventListener(this.name,this,e),o&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}}class br{constructor(r,n,e){this.element=r,this.type=6,this._$AN=void 0,this._$AM=n,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(r){S(this,r)}}var zr=Z.litHtmlPolyfillSupport;zr?.(J,B),(Z.litHtmlVersions??=[]).push("3.3.2");var vr=(r,n,e)=>{let l=e?.renderBefore??n,o=l._$litPart$;if(o===void 0){let _=e?.renderBefore??null;l._$litPart$=o=new B(n.insertBefore(q(),_),_,void 0,e??{})}return o._$AI(r),o};var Q=globalThis;class h extends a{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=vr(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return t}}h._$litElement$=!0,h.finalized=!0,Q.litElementHydrateSupport?.({LitElement:h});var Qr=Q.litElementPolyfillSupport;Qr?.({LitElement:h});(Q.litElementVersions??=[]).push("4.2.2");var tr=(r)=>(n,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,n)}):customElements.define(r,n)};var hr=`from codeop import compile_command\r
import sys\r
from _pyrepl.console import Console, Event\r
from collections import deque\r
import js\r
from pyodide.ffi import create_proxy\r
\r
# ANSI color codes\r
ANSI_COLORS = {\r
    "black": "30",\r
    "red": "31",\r
    "green": "32",\r
    "yellow": "33",\r
    "blue": "34",\r
    "magenta": "35",\r
    "cyan": "36",\r
    "white": "37",\r
}\r
\r
\r
def color_to_ansi(color):\r
    """Convert a color name or hex value to ANSI escape sequence."""\r
    if color.startswith("#"):\r
        # Parse hex color (supports #RGB and #RRGGBB)\r
        hex_val = color[1:]\r
        if len(hex_val) == 3:\r
            r = int(hex_val[0] * 2, 16)\r
            g = int(hex_val[1] * 2, 16)\r
            b = int(hex_val[2] * 2, 16)\r
        elif len(hex_val) == 6:\r
            r = int(hex_val[0:2], 16)\r
            g = int(hex_val[2:4], 16)\r
            b = int(hex_val[4:6], 16)\r
        else:\r
            return "32"  # Fall back to green\r
        # Use 24-bit true color: \\x1b[38;2;R;G;Bm\r
        return f"38;2;{r};{g};{b}"\r
    else:\r
        return ANSI_COLORS.get(color, "32")\r
\r
\r
class BrowserConsole(Console):\r
    def __init__(self, term):\r
        # term is the xterm.js Terminal instance passed from JS\r
        self.term = term\r
        self.event_queue = deque()\r
        self.encoding = "utf-8"\r
        self.screen = []\r
        self.posxy = (0, 0)\r
        self.height, self.width = self.getheightwidth()\r
        self._resolve_input = None\r
\r
    def getheightwidth(self):\r
        return self.term.rows, self.term.cols\r
\r
    def refresh(self, screen, xy):\r
        pass\r
\r
    def prepare(self):\r
        pass\r
\r
    def restore(self):\r
        pass\r
\r
    def move_cursor(self, x, y):\r
        self.term.write(f"\\x1b[{y + 1};{x + 1}H")\r
        self.posxy = (x, y)\r
\r
    def set_cursor_vis(self, visible):\r
        self.term.write("\\x1b[?25h" if visible else "\\x1b[?25l")\r
\r
    def beep(self):\r
        self.term.write("\\x07")\r
\r
    def clear(self):\r
        self.term.write("\\x1b[2J\\x1b[H")\r
        self.screen = []\r
        self.posxy = (0, 0)\r
\r
    def flushoutput(self):\r
        pass  # xterm.js writes immediately\r
\r
    def finish(self):\r
        pass\r
\r
    def forgetinput(self):\r
        self.event_queue.clear()\r
\r
    def push_char(self, char):\r
        self.event_queue.append(char)\r
\r
        if self._resolve_input:\r
            resolve = self._resolve_input\r
            self._resolve_input = None\r
            resolve()\r
\r
    def getpending(self):\r
        data = ""\r
        raw = b""\r
        while self.event_queue:\r
            c = self.event_queue.popleft()\r
            if isinstance(c, bytes):\r
                raw += c\r
                data += c.decode(self.encoding, errors="replace")\r
            else:\r
                raw += bytes([c])\r
                data += chr(c)\r
        return Event("key", data, raw)\r
\r
    def wait(self, timeout=None):\r
        return len(self.event_queue) > 0\r
\r
    async def get_event(self, block=True):\r
        if not block and not self.event_queue:\r
            return None\r
\r
        while not self.event_queue:\r
            promise = js.Promise.new(\r
                create_proxy(\r
                    lambda resolve, reject: setattr(self, "_resolve_input", resolve)\r
                )\r
            )\r
            await promise\r
\r
        char = self.event_queue.popleft()\r
        if isinstance(char, int):\r
            char_str = chr(char)\r
            raw = bytes([char])\r
        else:\r
            char_str = char\r
            raw = char.encode(self.encoding)\r
        event = Event("key", char_str, raw)\r
        return event\r
\r
    def repaint(self):\r
        pass\r
\r
\r
async def start_repl():\r
    # Create a new console for this terminal instance\r
    browser_console = BrowserConsole(js.term)\r
\r
    # Capture startup script before JS moves to next REPL and overwrites it\r
    startup_script = getattr(js, "pyreplStartupScript", None)\r
    theme_name = getattr(js, "pyreplTheme", "catppuccin-mocha")\r
    pygments_fallback = getattr(js, "pyreplPygmentsFallback", "catppuccin-mocha")\r
    info_line = getattr(js, "pyreplInfo", "Python (Pyodide)")\r
    show_banner = getattr(js, "pyreplBanner", True)\r
    readonly = getattr(js, "pyreplReadonly", False)\r
    prompt_color = getattr(js, "pyreplPromptColor", None) or "green"\r
    pygments_style_js = getattr(js, "pyreplPygmentsStyle", None)\r
\r
    # Build prompt strings with configured color\r
    color_code = color_to_ansi(prompt_color)\r
    PS1 = f"\\x1b[{color_code}m>>> \\x1b[0m"\r
    PS2 = f"\\x1b[{color_code}m... \\x1b[0m"\r
\r
    # Expose to JS so it can send input (signals JS can proceed to next REPL)\r
    js.currentBrowserConsole = browser_console\r
\r
    import micropip\r
    import rlcompleter\r
    import re\r
    import asyncio\r
\r
    # Lazy-load Pygments in background while REPL starts\r
    pygments_loaded = False\r
    lexer = None\r
    formatter = None\r
\r
    async def load_pygments():\r
        nonlocal pygments_loaded, lexer, formatter\r
        try:\r
            await micropip.install(["pygments", "catppuccin[pygments]"])\r
            from pygments.lexers import Python3Lexer\r
            from pygments.formatters import Terminal256Formatter\r
            from pygments.styles import get_style_by_name\r
            from pygments.style import Style\r
            from pygments.token import string_to_tokentype\r
\r
            lexer = Python3Lexer()\r
\r
            # Use custom pygmentsStyle if provided\r
            if pygments_style_js:\r
                # Convert JS object to Python dict\r
                custom_styles = dict(pygments_style_js.to_py())\r
\r
                # Build style class dynamically\r
                style_dict = {}\r
                for token_str, color in custom_styles.items():\r
                    token = string_to_tokentype(token_str)\r
                    style_dict[token] = color\r
\r
                CustomStyle = type("CustomStyle", (Style,), {"styles": style_dict})\r
                formatter = Terminal256Formatter(style=CustomStyle)\r
            else:\r
                # Try theme name as Pygments style, fall back based on background\r
                try:\r
                    get_style_by_name(theme_name)\r
                    style = theme_name\r
                except Exception:\r
                    style = pygments_fallback\r
                formatter = Terminal256Formatter(style=style)\r
\r
            pygments_loaded = True\r
        except Exception as e:\r
            browser_console.term.write(f"[ERROR] Pygments load failed: {e}\\r\\n")\r
\r
    # Start loading Pygments in background (non-blocking)\r
    asyncio.create_task(load_pygments())\r
\r
    def syntax_highlight(code):\r
        if not code:\r
            return ""\r
        if not pygments_loaded or lexer is None or formatter is None:\r
            # Return unhighlighted code until Pygments loads\r
            return code\r
        try:\r
            from pygments import highlight\r
\r
            result = highlight(code, lexer, formatter)\r
            return result.rstrip("\\n")\r
        except Exception:\r
            return code\r
\r
    class TermWriter:\r
        def write(self, data):\r
            browser_console.term.write(data.replace("\\n", "\\r\\n"))\r
\r
        def flush(self):\r
            pass\r
\r
    term_writer = TermWriter()\r
\r
    # Custom exec that redirects stdout/stderr to this REPL's terminal\r
    import contextlib\r
\r
    def exec_with_redirect(code, globals_dict):\r
        old_displayhook = sys.displayhook\r
\r
        def displayhook(value):\r
            if value is not None:\r
                globals_dict["_"] = value\r
                browser_console.term.write(repr(value) + "\\r\\n")\r
\r
        sys.displayhook = displayhook\r
        try:\r
            with (\r
                contextlib.redirect_stdout(term_writer),\r
                contextlib.redirect_stderr(term_writer),\r
            ):\r
                exec(code, globals_dict)\r
        finally:\r
            sys.displayhook = old_displayhook\r
\r
    def clear():\r
        browser_console.clear()\r
        if show_banner:\r
            browser_console.term.write(f"\\x1b[90m{info_line}\\x1b[0m\\r\\n")\r
\r
    class Exit:\r
        def __repr__(self):\r
            return "exit is not available in the browser"\r
\r
        def __call__(self):\r
            browser_console.term.write("exit is not available in the browser\\r\\n")\r
\r
    repl_globals = {\r
        "__builtins__": __builtins__,\r
        "clear": clear,\r
        "exit": Exit(),\r
        "quit": Exit(),\r
    }\r
    completer = rlcompleter.Completer(repl_globals)\r
\r
    # Run startup script if one was provided (silently, just to populate namespace)\r
    if startup_script:\r
        try:\r
            # Temporarily suppress stdout/stderr during startup\r
            old_stdout, old_stderr = sys.stdout, sys.stderr\r
            sys.stdout = sys.stderr = type(\r
                "null", (), {"write": lambda s, x: None, "flush": lambda s: None}\r
            )()\r
            exec(startup_script, repl_globals)\r
            sys.stdout, sys.stderr = old_stdout, old_stderr\r
\r
        except Exception as e:\r
            sys.stdout, sys.stderr = old_stdout, old_stderr\r
            browser_console.term.write(\r
                f"\\x1b[31mStartup script error - {type(e).__name__}: {e}\\x1b[0m\\r\\n"\r
            )\r
\r
        # If startup script defined a setup() function, call it with output visible\r
        if "setup" in repl_globals and callable(repl_globals["setup"]):\r
            try:\r
                exec_with_redirect(compile("setup()", "<setup>", "exec"), repl_globals)\r
            except Exception as e:\r
                browser_console.term.write(\r
                    f"\\x1b[31msetup() error - {type(e).__name__}: {e}\\x1b[0m\\r\\n"\r
                )\r
\r
    def get_completions(text):\r
        """Get all completions for the given text."""\r
        completions = []\r
        i = 0\r
        while True:\r
            c = completer.complete(text, i)\r
            if c is None:\r
                break\r
            completions.append(c)\r
            i += 1\r
        return completions\r
\r
    def get_word_to_complete(line):\r
        """Extract the word to complete from the end of the line."""\r
        match = re.search(r"[\\w.]*$", line)\r
        return match.group(0) if match else ""\r
\r
    # In readonly mode, don't show prompt or accept input\r
    if readonly:\r
        return\r
\r
    browser_console.term.write(PS1)\r
    lines = []\r
    current_line = ""\r
\r
    history = []\r
    history_index = 0\r
\r
    while True:\r
        event = await browser_console.get_event(block=True)\r
        if event is None:\r
            continue\r
\r
        char = event.data\r
        if char == "\\x03":\r
            # Ctrl+C - interrupt/cancel current input\r
            browser_console.term.write("^C\\r\\n")\r
            lines = []\r
            current_line = ""\r
            history_index = len(history)\r
            browser_console.term.write(PS1)\r
            continue\r
\r
        if char == "\\x0c":\r
            # Ctrl+L - clear screen\r
            clear()\r
            browser_console.term.write(PS1 + syntax_highlight(current_line))\r
            continue\r
\r
        if char == "\\x1b":\r
            # Might be an arrow key\r
            event2 = await browser_console.get_event(block=True)\r
            if event2 and event2.data == "[":\r
                event3 = await browser_console.get_event(block=True)\r
                if event3:\r
                    if event3.data == "A":\r
                        # Up arrow\r
                        if history:\r
                            history_index = max(0, history_index - 1)\r
                            # Clear current line\r
                            browser_console.term.write("\\r\\x1b[K")\r
                            hist_entry = history[history_index]\r
                            # For multiline entries, only show first line\r
                            current_line = (\r
                                hist_entry.split("\\n")[0]\r
                                if "\\n" in hist_entry\r
                                else hist_entry\r
                            )\r
                            browser_console.term.write(\r
                                PS1 + syntax_highlight(current_line)\r
                            )\r
                    elif event3.data == "B":\r
                        # Down arrow\r
                        if history:\r
                            history_index = min(len(history), history_index + 1)\r
                            # Clear current line\r
                            browser_console.term.write("\\r\\x1b[K")\r
                            if history_index < len(history):\r
                                hist_entry = history[history_index]\r
                                # For multiline entries, only show first line\r
                                current_line = (\r
                                    hist_entry.split("\\n")[0]\r
                                    if "\\n" in hist_entry\r
                                    else hist_entry\r
                                )\r
                            else:\r
                                current_line = ""\r
                            browser_console.term.write(\r
                                PS1 + syntax_highlight(current_line)\r
                            )\r
                    # Left and Right arrows can be implemented similarly\r
            continue\r
\r
        if char == "\\r":\r
            browser_console.term.write("\\r\\n")\r
\r
            lines.append(current_line)\r
            source = "\\n".join(lines)\r
\r
            if not source.strip():\r
                lines = []\r
                current_line = ""\r
                browser_console.term.write(PS1)\r
                continue\r
\r
            # If in multiline mode and user entered empty/whitespace line, execute\r
            if len(lines) > 1 and not current_line.strip():\r
                # Remove trailing empty lines\r
                while lines and not lines[-1].strip():\r
                    lines.pop()\r
                source = "\\n".join(lines)\r
                try:\r
                    code = compile(source, "<console>", "single")\r
                    exec_with_redirect(code, repl_globals)\r
                    history.append(source)\r
                    history_index = len(history)\r
                except SystemExit:\r
                    pass\r
                except Exception as e:\r
                    browser_console.term.write(\r
                        f"\\x1b[31m{type(e).__name__}: {e}\\x1b[0m\\r\\n"\r
                    )\r
                lines = []\r
                current_line = ""\r
                browser_console.term.write(PS1)\r
                continue\r
\r
            try:\r
                code = compile_command(source, "<console>", "single")\r
                if code is None:\r
                    # Incomplete — need more input\r
                    prev_line = lines[-1] if lines else current_line\r
                    indent = len(prev_line) - len(prev_line.lstrip())\r
                    if prev_line.rstrip().endswith(":"):\r
                        indent += 4\r
                    browser_console.term.write(PS2 + " " * indent)\r
                    current_line = " " * indent\r
                else:\r
                    # Complete code, execute it\r
                    if source.strip():\r
                        history.append(source)\r
                        history_index = len(history)\r
                    try:\r
                        exec_with_redirect(code, repl_globals)\r
                    except SystemExit:\r
                        pass\r
                    except Exception as e:\r
                        browser_console.term.write(\r
                            f"\\x1b[31m{type(e).__name__}: {e}\\x1b[0m\\r\\n"\r
                        )\r
                    lines = []\r
                    current_line = ""\r
                    browser_console.term.write(PS1)\r
            except SyntaxError as e:\r
                browser_console.term.write(f"\\x1b[31mSyntaxError: {e}\\x1b[0m\\r\\n")\r
                lines = []\r
                current_line = ""\r
                browser_console.term.write(PS1)\r
            except Exception as e:\r
                browser_console.term.write(f"\\x1b[31mError: {e}\\x1b[0m\\r\\n")\r
                lines = []\r
                current_line = ""\r
                browser_console.term.write(PS1)\r
        elif char == "\\t":\r
            # Tab completion\r
            word = get_word_to_complete(current_line)\r
            if word:\r
                completions = get_completions(word)\r
                if len(completions) == 1:\r
                    # Single match - complete it\r
                    completion = completions[0]\r
                    current_line = current_line[: -len(word)] + completion\r
                    browser_console.term.write("\\r\\x1b[K")\r
                    prompt = PS1 if len(lines) == 0 else PS2\r
                    browser_console.term.write(prompt + syntax_highlight(current_line))\r
                elif len(completions) > 1:\r
                    # Multiple matches - show them in columns\r
                    browser_console.term.write("\\r\\n")\r
                    max_len = max(len(c) for c in completions) + 2\r
                    cols = max(1, browser_console.term.cols // max_len)\r
                    for i, c in enumerate(completions):\r
                        browser_console.term.write(c.ljust(max_len))\r
                        if (i + 1) % cols == 0:\r
                            browser_console.term.write("\\r\\n")\r
                    if len(completions) % cols != 0:\r
                        browser_console.term.write("\\r\\n")\r
                    prompt = PS1 if len(lines) == 0 else PS2\r
                    browser_console.term.write(prompt + syntax_highlight(current_line))\r
        elif char == "\\x7f":\r
            if current_line:\r
                current_line = current_line[:-1]\r
                browser_console.term.write("\\r\\x1b[K")\r
                prompt = PS1 if len(lines) == 0 else PS2\r
                browser_console.term.write(prompt + syntax_highlight(current_line))\r
        else:\r
            current_line += char\r
            # Clear line and rewrite with highlighting\r
            browser_console.term.write("\\r\\x1b[K")  # Go to start, clear line\r
            prompt = PS1 if len(lines) == 0 else PS2\r
            browser_console.term.write(prompt + syntax_highlight(current_line))\r
`;var j=null,H=null,k=Promise.resolve(),I={"catppuccin-mocha":{background:"#1e1e2e",foreground:"#cdd6f4",cursor:"#f5e0dc",cursorAccent:"#1e1e2e",selectionBackground:"#585b70",black:"#45475a",red:"#f38ba8",green:"#a6e3a1",yellow:"#f9e2af",blue:"#89b4fa",magenta:"#f5c2e7",cyan:"#94e2d5",white:"#bac2de",brightBlack:"#585b70",brightRed:"#f38ba8",brightGreen:"#a6e3a1",brightYellow:"#f9e2af",brightBlue:"#89b4fa",brightMagenta:"#f5c2e7",brightCyan:"#94e2d5",brightWhite:"#a6adc8",headerBackground:"#181825",headerForeground:"#6c7086"},"catppuccin-latte":{background:"#eff1f5",foreground:"#4c4f69",cursor:"#dc8a78",cursorAccent:"#eff1f5",selectionBackground:"#acb0be",black:"#5c5f77",red:"#d20f39",green:"#40a02b",yellow:"#df8e1d",blue:"#1e66f5",magenta:"#ea76cb",cyan:"#179299",white:"#acb0be",brightBlack:"#6c6f85",brightRed:"#d20f39",brightGreen:"#40a02b",brightYellow:"#df8e1d",brightBlue:"#1e66f5",brightMagenta:"#ea76cb",brightCyan:"#179299",brightWhite:"#bcc0cc",headerBackground:"#dce0e8",headerForeground:"#8c8fa1"}},E="catppuccin-mocha";function Fr(r){if(!r.startsWith("#"))return!0;let n=r.slice(1),e=parseInt(n.slice(0,2),16),l=parseInt(n.slice(2,4),16),o=parseInt(n.slice(4,6),16);return(0.299*e+0.587*l+0.114*o)/255<0.5}function Sr(r){if("black"in r&&"red"in r)return r;let n=Fr(r.background)?"catppuccin-mocha":"catppuccin-latte",e=I[n];return{cursor:e.cursor,cursorAccent:e.cursorAccent,selectionBackground:e.selectionBackground,black:e.black,red:e.red,green:e.green,yellow:e.yellow,blue:e.blue,magenta:e.magenta,cyan:e.cyan,white:e.white,brightBlack:e.brightBlack,brightRed:e.brightRed,brightGreen:e.brightGreen,brightYellow:e.brightYellow,brightBlue:e.brightBlue,brightMagenta:e.brightMagenta,brightCyan:e.brightCyan,brightWhite:e.brightWhite,background:r.background,foreground:r.foreground,headerBackground:r.headerBackground??e.headerBackground,headerForeground:r.headerForeground??e.headerForeground,promptColor:r.promptColor,pygmentsStyle:r.pygmentsStyle}}var Er={copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',clear:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>'};function jr(r){let n,e,l=r.dataset.themeConfig;if(l)try{let s=JSON.parse(l);n=Sr(s),e="custom"}catch{console.warn("pyrepl-web: invalid data-theme-config JSON, falling back to default"),n=I[E],e=E}else{e=r.dataset.theme||E;let s=window.pyreplThemes?.[e]||I[e]||I[E];if(n=Sr(s),!window.pyreplThemes?.[e]&&!I[e])console.warn(`pyrepl-web: unknown theme "${e}", falling back to default`),e=E}let o=r.dataset.packages,_=o?o.split(",").map((s)=>s.trim()).filter(Boolean):[];return{theme:n,themeName:e,showHeader:r.dataset.header!=="false",showButtons:r.dataset.buttons!=="false",title:r.dataset.title||"python",packages:_,src:r.dataset.src||null,readonly:r.dataset.readonly==="true",showBanner:r.dataset.noBanner!=="true"}}async function Hr(){if(!j){let{loadPyodide:r}=await import("./chunk-rwvvnj4j.js");j=r({indexURL:"https://cdn.jsdelivr.net/pyodide/v314.0.1/full/",stdout:()=>{},stderr:()=>{}})}return await j}function Ur(){if(!H)H=Promise.resolve(hr);return H}class U{container;theme;packages;readonly;src;showHeader;showButtons;title;showBanner;constructor(r){this.container=r.container,this.theme=r.theme||E,this.packages=r.packages||[],this.readonly=r.readonly||!1,this.src=r.src,this.showHeader=r.showHeader!==void 0?r.showHeader:!0,this.showButtons=r.showButtons!==void 0?r.showButtons:!0,this.title=r.title||"python",this.showBanner=r.showBanner!==void 0?r.showBanner:!0}async init(){if(this.container.dataset.theme=this.theme,this.container.dataset.packages=this.packages.join(","),this.container.dataset.readonly=this.readonly?"true":"false",this.src)this.container.dataset.src=this.src;this.container.dataset.header=this.showHeader?"true":"false",this.container.dataset.buttons=this.showButtons?"true":"false",this.container.dataset.title=this.title,this.container.dataset.noBanner=this.showBanner?"false":"true";let{term:r,config:n}=await qr(this.container);k=k.then(()=>Gr(this.container,r,n)),await k}}function Lr(){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",kr);else kr()}function Rr(){if(document.getElementById("pyrepl-styles"))return;let r=document.createElement("link");r.rel="stylesheet",r.href="https://cdn.jsdelivr.net/npm/@xterm/xterm/css/xterm.css",document.head.appendChild(r);let n=document.createElement("style");n.id="pyrepl-styles",n.textContent=`
    .pyrepl {
      display: inline-block;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--pyrepl-shadow);
    }

    .pyrepl-header {
      background: var(--pyrepl-header-bg);
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .pyrepl-header-dots {
      display: flex;
      gap: 6px;
    }

    .pyrepl-header-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .pyrepl-header-dot.red { background: var(--pyrepl-red); }
    .pyrepl-header-dot.yellow { background: var(--pyrepl-yellow); }
    .pyrepl-header-dot.green { background: var(--pyrepl-green); }

    .pyrepl-header-title {
      flex: 1;
      text-align: center;
      color: var(--pyrepl-header-title);
      font-family: monospace;
      font-size: 13px;
    }

    .pyrepl-header-buttons {
      display: flex;
      gap: 4px;
    }

    .pyrepl-header-btn {
      background: transparent;
      border: none;
      color: var(--pyrepl-header-title);
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.7;
      transition: opacity 0.15s;
    }

    .pyrepl-header-btn:hover {
      opacity: 1;
    }

    .pyrepl-header-btn svg {
      width: 14px;
      height: 14px;
    }

    .pyrepl-floating-buttons {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 10;
      background: color-mix(in srgb, var(--pyrepl-header-bg) 85%, transparent);
      border-radius: 4px;
      padding: 2px;
    }

    .pyrepl--floating-buttons .xterm {
      padding-top: 32px;
    }

    .pyrepl .xterm {
      padding: 8px 12px 12px 12px;
    }

    .pyrepl .xterm-viewport::-webkit-scrollbar {
      display: none;
    }

    .pyrepl .xterm-viewport {
      scrollbar-width: none;
      background-color: var(--pyrepl-bg) !important;
    }
  `,document.head.appendChild(n)}function Ar(r,n){let e=n.headerBackground||n.black,l=n.headerForeground||n.brightBlack;r.style.setProperty("--pyrepl-bg",n.background),r.style.setProperty("--pyrepl-header-bg",e),r.style.setProperty("--pyrepl-header-title",l),r.style.setProperty("--pyrepl-red",n.red),r.style.setProperty("--pyrepl-yellow",n.yellow),r.style.setProperty("--pyrepl-green",n.green),r.style.setProperty("--pyrepl-shadow","0 4px 24px rgba(0, 0, 0, 0.3)")}function Nr(){let r=document.createElement("div");return r.className="pyrepl-header-buttons",r.innerHTML=`
    <button class="pyrepl-header-btn" data-action="copy" title="Copy output">${Er.copy}</button>
    <button class="pyrepl-header-btn" data-action="clear" title="Clear terminal">${Er.clear}</button>
  `,r}function Mr(r){let n=document.createElement("div");n.className="pyrepl-header";let e=document.createElement("div");e.className="pyrepl-header-dots",e.innerHTML=`
    <div class="pyrepl-header-dot red"></div>
    <div class="pyrepl-header-dot yellow"></div>
    <div class="pyrepl-header-dot green"></div>
  `;let l=document.createElement("div");if(l.className="pyrepl-header-title",l.textContent=r.title,n.appendChild(e),n.appendChild(l),r.showButtons)n.appendChild(Nr());else{let o=document.createElement("div");o.style.width="48px",n.appendChild(o)}return n}async function qr(r){Rr();let n=jr(r);if(Ar(r,n.theme),n.showHeader)r.appendChild(Mr(n));else if(n.showButtons){let _=Nr();_.classList.add("pyrepl-floating-buttons"),r.classList.add("pyrepl--floating-buttons"),r.appendChild(_)}let e=await import("./chunk-jfxv8vy0.js"),l=document.createElement("div");r.appendChild(l);let o=new e.Terminal({cursorBlink:!n.readonly,cursorStyle:n.readonly?"bar":"block",fontSize:14,fontFamily:"monospace",theme:n.theme,disableStdin:n.readonly});return o.open(l),{term:o,config:n}}async function Gr(r,n,e){let l=await Hr();if(await l.loadPackage("micropip"),e.packages.length>0)await l.pyimport("micropip").install(e.packages);let o=e.packages.length>0?` (installed packages: ${e.packages.join(", ")})`:"",s=`${await l.runPythonAsync("import sys; sys.version.split()[0]")}${o}`;if(e.showBanner)n.write(`\x1B[90m${s}\x1B[0m\r
`);if(globalThis.term=n,globalThis.pyreplTheme=e.themeName,globalThis.pyreplPygmentsFallback=Fr(e.theme.background)?"catppuccin-mocha":"catppuccin-latte",globalThis.pyreplInfo=s,globalThis.pyreplReadonly=e.readonly,globalThis.pyreplPromptColor=e.theme.promptColor||"green",globalThis.pyreplPygmentsStyle=e.theme.pygmentsStyle,globalThis.pyreplBanner=e.showBanner,e.src)try{let d=await fetch(e.src);if(d.ok)globalThis.pyreplStartupScript=await d.text();else console.warn(`pyrepl-web: failed to fetch script from ${e.src}`)}catch(d){console.warn(`pyrepl-web: error fetching script from ${e.src}`,d)}let p=await Ur();l.runPython(p),l.runPythonAsync("await start_repl()");while(!globalThis.currentBrowserConsole)await new Promise((d)=>setTimeout(d,10));let y=globalThis.currentBrowserConsole;if(globalThis.currentBrowserConsole=null,globalThis.term=null,globalThis.pyreplStartupScript=void 0,globalThis.pyreplTheme="",globalThis.pyreplPygmentsFallback="",globalThis.pyreplInfo="",globalThis.pyreplReadonly=!1,globalThis.pyreplPromptColor="",globalThis.pyreplPygmentsStyle=void 0,globalThis.pyreplBanner=!1,!e.readonly)n.onData((d)=>{for(let w of d)y.push_char(w.charCodeAt(0))});if(e.showButtons){let d=r.querySelector('[data-action="copy"]'),w=r.querySelector('[data-action="clear"]');d?.addEventListener("click",()=>{let x=n.buffer.active,m="";for(let u=0;u<x.length;u++){let L=x.getLine(u);if(L)m+=`${L.translateToString(!0)}
`}navigator.clipboard.writeText(m.trimEnd())}),w?.addEventListener("click",()=>{if(n.reset(),e.showBanner)n.write(`\x1B[90m${s}\x1B[0m\r
`);n.write("\x1B[32m>>> \x1B[0m")})}}async function kr(){let r=document.querySelectorAll(".pyrepl"),n=Array.from(r).filter((l)=>!l.closest("py-repl")&&!l.dataset.pyreplInitialized);if(n.length===0)return;for(let l of n)l.dataset.pyreplInitialized="true";let e=await Promise.all(Array.from(n).map(async(l)=>({container:l,...await qr(l)})));for(let{container:l,term:o,config:_}of e)k=k.then(()=>Gr(l,o,_));await k}Lr();var le=[tr("py-repl")],ee=h,rn=Jr(ee);class P extends ee{static properties={theme:{type:String},packages:{type:String},replTitle:{type:String,attribute:"repl-title"},noBanner:{type:Boolean,attribute:"no-banner"},isReadonly:{type:Boolean,attribute:"readonly"},noButtons:{type:Boolean,attribute:"no-buttons"},noHeader:{type:Boolean,attribute:"no-header"},src:{type:String}};constructor(){super();this.theme="catppuccin-mocha",this.packages="",this.replTitle="Python REPL",this.noBanner=!1,this.isReadonly=!1,this.noButtons=!1,this.noHeader=!1,this.src=""}createRenderRoot(){return this}firstUpdated(r){super.firstUpdated(r);let n=this.querySelector(".pyrepl");if(!n){console.error("pyrepl-web: .pyrepl container not found in <py-repl>");return}n.dataset.pyreplInitialized="true",new U({container:n,theme:this.theme,packages:this.packages.split(",").map((l)=>l.trim()).filter((l)=>l.length>0),readonly:this.isReadonly,src:this.src||void 0,showHeader:!this.noHeader,showButtons:!this.noButtons,title:this.replTitle,showBanner:!this.noBanner}).init()}render(){return xr`<div class="pyrepl"></div>`}}P=Ir(rn,0,"PyRepl",le,P),Cr(rn,1,P),Br(rn,P);let _PyRepl=P;export{P as PyRepl};
