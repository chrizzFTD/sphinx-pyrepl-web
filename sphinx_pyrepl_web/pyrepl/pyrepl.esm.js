import{d as Jr,e as Or,f as Br,g as Cr,i as Pr}from"./chunk-ftjk4vft.js";var K=globalThis,I=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,A=Symbol(),U=new WeakMap;class D{constructor(r,e,n){if(this._$cssResult$=!0,n!==A)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(I&&r===void 0){let n=e!==void 0&&e.length===1;n&&(r=U.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),n&&U.set(e,r))}return r}toString(){return this.cssText}}var M=(r)=>new D(typeof r=="string"?r:r+"",void 0,A);var rr=(r,e)=>{if(I)r.adoptedStyleSheets=e.map((n)=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(let n of e){let l=document.createElement("style"),o=K.litNonce;o!==void 0&&l.setAttribute("nonce",o),l.textContent=n.cssText,r.appendChild(l)}},T=I?(r)=>r:(r)=>r instanceof CSSStyleSheet?((e)=>{let n="";for(let l of e.cssRules)n+=l.cssText;return M(n)})(r):r;var{is:Kr,defineProperty:Ir,getOwnPropertyDescriptor:Wr,getOwnPropertyNames:Yr,getOwnPropertySymbols:Xr,getPrototypeOf:$r}=Object,Y=globalThis,nr=Y.trustedTypes,Dr=nr?nr.emptyScript:"",Tr=Y.reactiveElementPolyfillSupport,N=(r,e)=>r,W={toAttribute(r,e){switch(e){case Boolean:r=r?Dr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let n=r;switch(e){case Boolean:n=r!==null;break;case Number:n=r===null?null:Number(r);break;case Object:case Array:try{n=JSON.parse(r)}catch(l){n=null}}return n}},V=(r,e)=>!Kr(r,e),er={attribute:!0,type:String,converter:W,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;class m extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=er){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let n=Symbol(),l=this.getPropertyDescriptor(r,n,e);l!==void 0&&Ir(this.prototype,r,l)}}static getPropertyDescriptor(r,e,n){let{get:l,set:o}=Wr(this.prototype,r)??{get(){return this[e]},set(_){this[e]=_}};return{get:l,set(_){let s=l?.call(this);o?.call(this,_),this.requestUpdate(r,s,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??er}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let r=$r(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let e=this.properties,n=[...Yr(e),...Xr(e)];for(let l of n)this.createProperty(l,e[l])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[n,l]of e)this.elementProperties.set(n,l)}this._$Eh=new Map;for(let[e,n]of this.elementProperties){let l=this._$Eu(e,n);l!==void 0&&this._$Eh.set(l,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let n=new Set(r.flat(1/0).reverse());for(let l of n)e.unshift(T(l))}else r!==void 0&&e.push(T(r));return e}static _$Eu(r,e){let n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((r)=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((r)=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let n of e.keys())this.hasOwnProperty(n)&&(r.set(n,this[n]),delete this[n]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return rr(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((r)=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach((r)=>r.hostDisconnected?.())}attributeChangedCallback(r,e,n){this._$AK(r,n)}_$ET(r,e){let n=this.constructor.elementProperties.get(r),l=this.constructor._$Eu(r,n);if(l!==void 0&&n.reflect===!0){let o=(n.converter?.toAttribute!==void 0?n.converter:W).toAttribute(e,n.type);this._$Em=r,o==null?this.removeAttribute(l):this.setAttribute(l,o),this._$Em=null}}_$AK(r,e){let n=this.constructor,l=n._$Eh.get(r);if(l!==void 0&&this._$Em!==l){let o=n.getPropertyOptions(l),_=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:W;this._$Em=l;let s=_.fromAttribute(e,o.type);this[l]=s??this._$Ej?.get(l)??s,this._$Em=null}}requestUpdate(r,e,n,l=!1,o){if(r!==void 0){let _=this.constructor;if(l===!1&&(o=this[r]),n??=_.getPropertyOptions(r),!((n.hasChanged??V)(o,e)||n.useDefault&&n.reflect&&o===this._$Ej?.get(r)&&!this.hasAttribute(_._$Eu(r,n))))return;this.C(r,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:n,reflect:l,wrapped:o},_){n&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,_??e??this[r]),o!==!0||_!==void 0)||(this._$AL.has(r)||(this.hasUpdated||n||(e=void 0),this._$AL.set(r,e)),l===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[l,o]of this._$Ep)this[l]=o;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[l,o]of n){let{wrapped:_}=o,s=this[l];_!==!0||this._$AL.has(l)||s===void 0||this.C(l,void 0,o,s)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach((n)=>n.hostUpdate?.()),this.update(e)):this._$EM()}catch(n){throw r=!1,this._$EM(),n}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach((e)=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach((e)=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}}m.elementStyles=[],m.shadowRootOptions={mode:"open"},m[N("elementProperties")]=new Map,m[N("finalized")]=new Map,Tr?.({ReactiveElement:m}),(Y.reactiveElementVersions??=[]).push("2.1.2");var g=globalThis,lr=(r)=>r,X=g.trustedTypes,or=X?X.createPolicy("lit-html",{createHTML:(r)=>r}):void 0;var t=`lit$${Math.random().toFixed(9).slice(2)}$`,ir="?"+t,Vr=`<${ir}>`,b=document,q=()=>b.createComment(""),G=(r)=>r===null||typeof r!="object"&&typeof r!="function",Z=Array.isArray,gr=(r)=>Z(r)||typeof r?.[Symbol.iterator]=="function";var F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_r=/-->/g,sr=/>/g,u=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pr=/'/g,yr=/"/g,ar=/^(?:script|style|textarea|title)$/i,z=(r)=>(e,...n)=>({_$litType$:r,strings:e,values:n}),cr=z(1),sn=z(2),pn=z(3),h=Symbol.for("lit-noChange"),a=Symbol.for("lit-nothing"),wr=new WeakMap,f=b.createTreeWalker(b,129);function xr(r,e){if(!Z(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return or!==void 0?or.createHTML(e):e}var Zr=(r,e)=>{let n=r.length-1,l=[],o,_=e===2?"<svg>":e===3?"<math>":"",s=F;for(let p=0;p<n;p++){let w=r[p],i,y,c=-1,x=0;for(;x<w.length&&(s.lastIndex=x,y=s.exec(w),y!==null);)x=s.lastIndex,s===F?y[1]==="!--"?s=_r:y[1]!==void 0?s=sr:y[2]!==void 0?(ar.test(y[2])&&(o=RegExp("</"+y[2],"g")),s=u):y[3]!==void 0&&(s=u):s===u?y[0]===">"?(s=o??F,c=-1):y[1]===void 0?c=-2:(c=s.lastIndex-y[2].length,i=y[1],s=y[3]===void 0?u:y[3]==='"'?yr:pr):s===yr||s===pr?s=u:s===_r||s===sr?s=F:(s=u,o=void 0);let d=s===u&&r[p+1].startsWith("/>")?" ":"";_+=s===F?w+Vr:c>=0?(l.push(i),w.slice(0,c)+"$lit$"+w.slice(c)+t+d):w+t+(c===-2?p:d)}return[xr(r,_+(r[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),l]};class J{constructor({strings:r,_$litType$:e},n){let l;this.parts=[];let o=0,_=0,s=r.length-1,p=this.parts,[w,i]=Zr(r,e);if(this.el=J.createElement(w,n),f.currentNode=this.el.content,e===2||e===3){let y=this.el.content.firstChild;y.replaceWith(...y.childNodes)}for(;(l=f.nextNode())!==null&&p.length<s;){if(l.nodeType===1){if(l.hasAttributes())for(let y of l.getAttributeNames())if(y.endsWith("$lit$")){let c=i[_++],x=l.getAttribute(y).split(t),d=/([.?@])?(.*)/.exec(c);p.push({type:1,index:o,name:d[2],strings:x,ctor:d[1]==="."?mr:d[1]==="?"?tr:d[1]==="@"?ur:B}),l.removeAttribute(y)}else y.startsWith(t)&&(p.push({type:6,index:o}),l.removeAttribute(y));if(ar.test(l.tagName)){let y=l.textContent.split(t),c=y.length-1;if(c>0){l.textContent=X?X.emptyScript:"";for(let x=0;x<c;x++)l.append(y[x],q()),f.nextNode(),p.push({type:2,index:++o});l.append(y[c],q())}}}else if(l.nodeType===8)if(l.data===ir)p.push({type:2,index:o});else{let y=-1;for(;(y=l.data.indexOf(t,y+1))!==-1;)p.push({type:7,index:o}),y+=t.length-1}o++}}static createElement(r,e){let n=b.createElement("template");return n.innerHTML=r,n}}function S(r,e,n=r,l){if(e===h)return e;let o=l!==void 0?n._$Co?.[l]:n._$Cl,_=G(e)?void 0:e._$litDirective$;return o?.constructor!==_&&(o?._$AO?.(!1),_===void 0?o=void 0:(o=new _(r),o._$AT(r,n,l)),l!==void 0?(n._$Co??=[])[l]=o:n._$Cl=o),o!==void 0&&(e=S(r,o._$AS(r,e.values),o,l)),e}class dr{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:n}=this._$AD,l=(r?.creationScope??b).importNode(e,!0);f.currentNode=l;let o=f.nextNode(),_=0,s=0,p=n[0];for(;p!==void 0;){if(_===p.index){let w;p.type===2?w=new O(o,o.nextSibling,this,r):p.type===1?w=new p.ctor(o,p.name,p.strings,this,r):p.type===6&&(w=new fr(o,this,r)),this._$AV.push(w),p=n[++s]}_!==p?.index&&(o=f.nextNode(),_++)}return f.currentNode=b,l}p(r){let e=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(r,n,e),e+=n.strings.length-2):n._$AI(r[e])),e++}}class O{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,n,l){this.type=2,this._$AH=a,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=n,this.options=l,this._$Cv=l?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=S(this,r,e),G(r)?r===a||r==null||r===""?(this._$AH!==a&&this._$AR(),this._$AH=a):r!==this._$AH&&r!==h&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):gr(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==a&&G(this._$AH)?this._$AA.nextSibling.data=r:this.T(b.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:n}=r,l=typeof n=="number"?this._$AC(r):(n.el===void 0&&(n.el=J.createElement(xr(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===l)this._$AH.p(e);else{let o=new dr(l,this),_=o.u(this.options);o.p(e),this.T(_),this._$AH=o}}_$AC(r){let e=wr.get(r.strings);return e===void 0&&wr.set(r.strings,e=new J(r)),e}k(r){Z(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,n,l=0;for(let o of r)l===e.length?e.push(n=new O(this.O(q()),this.O(q()),this,this.options)):n=e[l],n._$AI(o),l++;l<e.length&&(this._$AR(n&&n._$AB.nextSibling,l),e.length=l)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let n=lr(r).nextSibling;lr(r).remove(),r=n}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}}class B{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,n,l,o){this.type=1,this._$AH=a,this._$AN=void 0,this.element=r,this.name=e,this._$AM=l,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=a}_$AI(r,e=this,n,l){let o=this.strings,_=!1;if(o===void 0)r=S(this,r,e,0),_=!G(r)||r!==this._$AH&&r!==h,_&&(this._$AH=r);else{let s=r,p,w;for(r=o[0],p=0;p<o.length-1;p++)w=S(this,s[n+p],e,p),w===h&&(w=this._$AH[p]),_||=!G(w)||w!==this._$AH[p],w===a?r=a:r!==a&&(r+=(w??"")+o[p+1]),this._$AH[p]=w}_&&!l&&this.j(r)}j(r){r===a?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}}class mr extends B{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===a?void 0:r}}class tr extends B{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==a)}}class ur extends B{constructor(r,e,n,l,o){super(r,e,n,l,o),this.type=5}_$AI(r,e=this){if((r=S(this,r,e,0)??a)===h)return;let n=this._$AH,l=r===a&&n!==a||r.capture!==n.capture||r.once!==n.once||r.passive!==n.passive,o=r!==a&&(n===a||l);l&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}}class fr{constructor(r,e,n){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(r){S(this,r)}}var zr=g.litHtmlPolyfillSupport;zr?.(J,O),(g.litHtmlVersions??=[]).push("3.3.2");var br=(r,e,n)=>{let l=n?.renderBefore??e,o=l._$litPart$;if(o===void 0){let _=n?.renderBefore??null;l._$litPart$=o=new O(e.insertBefore(q(),_),_,void 0,n??{})}return o._$AI(r),o};var j=globalThis;class v extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=br(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return h}}v._$litElement$=!0,v.finalized=!0,j.litElementHydrateSupport?.({LitElement:v});var jr=j.litElementPolyfillSupport;jr?.({LitElement:v});(j.litElementVersions??=[]).push("4.2.2");var hr=(r)=>(e,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};var vr=`from codeop import compile_command\r
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
async def replay_script(\r
    source,\r
    browser_console,\r
    repl_globals,\r
    exec_with_redirect,\r
    syntax_highlight,\r
    PS1,\r
    PS2,\r
    history,\r
):\r
    """Execute source line-by-line with REPL prompts and highlighting."""\r
    lines = source.splitlines()\r
    i = 0\r
    while i < len(lines):\r
        while i < len(lines) and not lines[i].strip():\r
            i += 1\r
        if i >= len(lines):\r
            break\r
\r
        buffer = []\r
        while i < len(lines):\r
            line = lines[i]\r
            i += 1\r
\r
            if not buffer and not line.strip():\r
                continue\r
\r
            buffer.append(line)\r
            source_so_far = "\\n".join(buffer)\r
\r
            if len(buffer) == 1:\r
                browser_console.term.write(\r
                    PS1 + syntax_highlight(line) + "\\r\\n"\r
                )\r
            else:\r
                browser_console.term.write(\r
                    PS2 + syntax_highlight(line) + "\\r\\n"\r
                )\r
\r
            try:\r
                code = compile_command(source_so_far, "<startup>", "single")\r
            except (OverflowError, SyntaxError) as e:\r
                browser_console.term.write(\r
                    f"\\x1b[31mSyntaxError: {e}\\x1b[0m\\r\\n"\r
                )\r
                buffer = []\r
                break\r
\r
            if code is None:\r
                continue\r
\r
            try:\r
                exec_with_redirect(code, repl_globals)\r
            except SystemExit:\r
                pass\r
            except Exception as e:\r
                browser_console.term.write(\r
                    f"\\x1b[31m{type(e).__name__}: {e}\\x1b[0m\\r\\n"\r
                )\r
\r
            if source_so_far.strip():\r
                history.append(source_so_far)\r
            break\r
\r
    return history\r
\r
\r
async def start_repl():\r
    # Create a new console for this terminal instance\r
    browser_console = BrowserConsole(js.term)\r
\r
    # Capture startup scripts before JS moves to next REPL and overwrites them\r
    startup_script = getattr(js, "pyreplStartupScript", None)\r
    replay_script_content = getattr(js, "pyreplReplayScript", None)\r
    replay_startup = getattr(js, "pyreplReplayStartup", False)\r
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
    pygments_task = asyncio.create_task(load_pygments())\r
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
    history = []\r
    history_index = 0\r
\r
    # Silent bootstrap script (:file: / src without replay)\r
    if startup_script and not replay_startup:\r
        try:\r
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
        if "setup" in repl_globals and callable(repl_globals["setup"]):\r
            try:\r
                exec_with_redirect(compile("setup()", "<setup>", "exec"), repl_globals)\r
            except Exception as e:\r
                browser_console.term.write(\r
                    f"\\x1b[31msetup() error - {type(e).__name__}: {e}\\x1b[0m\\r\\n"\r
                )\r
\r
    # Replay script with interactive prompts\r
    replay_source = replay_script_content\r
    if replay_source is None and startup_script and replay_startup:\r
        replay_source = startup_script\r
\r
    if replay_source:\r
        await pygments_task\r
        history = await replay_script(\r
            replay_source,\r
            browser_console,\r
            repl_globals,\r
            exec_with_redirect,\r
            syntax_highlight,\r
            PS1,\r
            PS2,\r
            history,\r
        )\r
        history_index = len(history)\r
    else:\r
        await pygments_task\r
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
`;var Q=null,H=null,k=Promise.resolve(),C={"catppuccin-mocha":{background:"#1e1e2e",foreground:"#cdd6f4",cursor:"#f5e0dc",cursorAccent:"#1e1e2e",selectionBackground:"#585b70",black:"#45475a",red:"#f38ba8",green:"#a6e3a1",yellow:"#f9e2af",blue:"#89b4fa",magenta:"#f5c2e7",cyan:"#94e2d5",white:"#bac2de",brightBlack:"#585b70",brightRed:"#f38ba8",brightGreen:"#a6e3a1",brightYellow:"#f9e2af",brightBlue:"#89b4fa",brightMagenta:"#f5c2e7",brightCyan:"#94e2d5",brightWhite:"#a6adc8",headerBackground:"#181825",headerForeground:"#6c7086"},"catppuccin-latte":{background:"#eff1f5",foreground:"#4c4f69",cursor:"#dc8a78",cursorAccent:"#eff1f5",selectionBackground:"#acb0be",black:"#5c5f77",red:"#d20f39",green:"#40a02b",yellow:"#df8e1d",blue:"#1e66f5",magenta:"#ea76cb",cyan:"#179299",white:"#acb0be",brightBlack:"#6c6f85",brightRed:"#d20f39",brightGreen:"#40a02b",brightYellow:"#df8e1d",brightBlue:"#1e66f5",brightMagenta:"#ea76cb",brightCyan:"#179299",brightWhite:"#bcc0cc",headerBackground:"#dce0e8",headerForeground:"#8c8fa1"}},E="catppuccin-mocha";function Nr(r){if(!r.startsWith("#"))return!0;let e=r.slice(1),n=parseInt(e.slice(0,2),16),l=parseInt(e.slice(2,4),16),o=parseInt(e.slice(4,6),16);return(0.299*n+0.587*l+0.114*o)/255<0.5}function Sr(r){if("black"in r&&"red"in r)return r;let e=Nr(r.background)?"catppuccin-mocha":"catppuccin-latte",n=C[e];return{cursor:n.cursor,cursorAccent:n.cursorAccent,selectionBackground:n.selectionBackground,black:n.black,red:n.red,green:n.green,yellow:n.yellow,blue:n.blue,magenta:n.magenta,cyan:n.cyan,white:n.white,brightBlack:n.brightBlack,brightRed:n.brightRed,brightGreen:n.brightGreen,brightYellow:n.brightYellow,brightBlue:n.brightBlue,brightMagenta:n.brightMagenta,brightCyan:n.brightCyan,brightWhite:n.brightWhite,background:r.background,foreground:r.foreground,headerBackground:r.headerBackground??n.headerBackground,headerForeground:r.headerForeground??n.headerForeground,promptColor:r.promptColor,pygmentsStyle:r.pygmentsStyle}}var Er={copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',clear:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>'};function Qr(r){let e,n,l=r.dataset.themeConfig;if(l)try{let s=JSON.parse(l);e=Sr(s),n="custom"}catch{console.warn("pyrepl-web: invalid data-theme-config JSON, falling back to default"),e=C[E],n=E}else{n=r.dataset.theme||E;let s=window.pyreplThemes?.[n]||C[n]||C[E];if(e=Sr(s),!window.pyreplThemes?.[n]&&!C[n])console.warn(`pyrepl-web: unknown theme "${n}", falling back to default`),n=E}let o=r.dataset.packages,_=o?o.split(",").map((s)=>s.trim()).filter(Boolean):[];return{theme:e,themeName:n,showHeader:r.dataset.header!=="false",showButtons:r.dataset.buttons!=="false",title:r.dataset.title||"python",packages:_,src:r.dataset.src||null,replaySrc:r.dataset.replaySrc||null,replayStartup:r.dataset.replay==="true",readonly:r.dataset.readonly==="true",showBanner:r.dataset.noBanner!=="true"}}async function Hr(){if(!Q){let{loadPyodide:r}=await import("./chunk-rwvvnj4j.js");Q=r({indexURL:"https://cdn.jsdelivr.net/pyodide/v314.0.1/full/",stdout:()=>{},stderr:()=>{}})}return await Q}function Lr(){if(!H)H=Promise.resolve(vr);return H}class L{container;theme;packages;readonly;src;replaySrc;replayStartup;showHeader;showButtons;title;showBanner;constructor(r){this.container=r.container,this.theme=r.theme||E,this.packages=r.packages||[],this.readonly=r.readonly||!1,this.src=r.src,this.replaySrc=r.replaySrc,this.replayStartup=r.replayStartup||!1,this.showHeader=r.showHeader!==void 0?r.showHeader:!0,this.showButtons=r.showButtons!==void 0?r.showButtons:!0,this.title=r.title||"python",this.showBanner=r.showBanner!==void 0?r.showBanner:!0}async init(){if(this.container.dataset.theme=this.theme,this.container.dataset.packages=this.packages.join(","),this.container.dataset.readonly=this.readonly?"true":"false",this.src)this.container.dataset.src=this.src;if(this.replaySrc)this.container.dataset.replaySrc=this.replaySrc;this.container.dataset.replay=this.replayStartup?"true":"false",this.container.dataset.header=this.showHeader?"true":"false",this.container.dataset.buttons=this.showButtons?"true":"false",this.container.dataset.title=this.title,this.container.dataset.noBanner=this.showBanner?"false":"true";let{term:r,config:e}=await qr(this.container);k=k.then(()=>Gr(this.container,r,e)),await k}}function Rr(){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",kr);else kr()}function Ur(){if(document.getElementById("pyrepl-styles"))return;let r=document.createElement("link");r.rel="stylesheet",r.href="https://cdn.jsdelivr.net/npm/@xterm/xterm/css/xterm.css",document.head.appendChild(r);let e=document.createElement("style");e.id="pyrepl-styles",e.textContent=`
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
  `,document.head.appendChild(e)}function Ar(r,e){let n=e.headerBackground||e.black,l=e.headerForeground||e.brightBlack;r.style.setProperty("--pyrepl-bg",e.background),r.style.setProperty("--pyrepl-header-bg",n),r.style.setProperty("--pyrepl-header-title",l),r.style.setProperty("--pyrepl-red",e.red),r.style.setProperty("--pyrepl-yellow",e.yellow),r.style.setProperty("--pyrepl-green",e.green),r.style.setProperty("--pyrepl-shadow","0 4px 24px rgba(0, 0, 0, 0.3)")}function Fr(){let r=document.createElement("div");return r.className="pyrepl-header-buttons",r.innerHTML=`
    <button class="pyrepl-header-btn" data-action="copy" title="Copy output">${Er.copy}</button>
    <button class="pyrepl-header-btn" data-action="clear" title="Clear terminal">${Er.clear}</button>
  `,r}function Mr(r){let e=document.createElement("div");e.className="pyrepl-header";let n=document.createElement("div");n.className="pyrepl-header-dots",n.innerHTML=`
    <div class="pyrepl-header-dot red"></div>
    <div class="pyrepl-header-dot yellow"></div>
    <div class="pyrepl-header-dot green"></div>
  `;let l=document.createElement("div");if(l.className="pyrepl-header-title",l.textContent=r.title,e.appendChild(n),e.appendChild(l),r.showButtons)e.appendChild(Fr());else{let o=document.createElement("div");o.style.width="48px",e.appendChild(o)}return e}async function qr(r){Ur();let e=Qr(r);if(Ar(r,e.theme),e.showHeader)r.appendChild(Mr(e));else if(e.showButtons){let _=Fr();_.classList.add("pyrepl-floating-buttons"),r.classList.add("pyrepl--floating-buttons"),r.appendChild(_)}let n=await import("./chunk-jfxv8vy0.js"),l=document.createElement("div");r.appendChild(l);let o=new n.Terminal({cursorBlink:!e.readonly,cursorStyle:e.readonly?"bar":"block",fontSize:14,fontFamily:"monospace",theme:e.theme,disableStdin:e.readonly});return o.open(l),{term:o,config:e}}async function Gr(r,e,n){let l=await Hr();if(await l.loadPackage("micropip"),n.packages.length>0)await l.pyimport("micropip").install(n.packages);let o=n.packages.length>0?` (installed packages: ${n.packages.join(", ")})`:"",s=`${await l.runPythonAsync("import sys; sys.version.split()[0]")}${o}`;if(n.showBanner)e.write(`\x1B[90m${s}\x1B[0m\r
`);if(globalThis.term=e,globalThis.pyreplTheme=n.themeName,globalThis.pyreplPygmentsFallback=Nr(n.theme.background)?"catppuccin-mocha":"catppuccin-latte",globalThis.pyreplInfo=s,globalThis.pyreplReadonly=n.readonly,globalThis.pyreplPromptColor=n.theme.promptColor||"green",globalThis.pyreplPygmentsStyle=n.theme.pygmentsStyle,globalThis.pyreplBanner=n.showBanner,n.src)try{let i=await fetch(n.src);if(i.ok)globalThis.pyreplStartupScript=await i.text();else console.warn(`pyrepl-web: failed to fetch script from ${n.src}`)}catch(i){console.warn(`pyrepl-web: error fetching script from ${n.src}`,i)}if(n.replaySrc)try{let i=await fetch(n.replaySrc);if(i.ok)globalThis.pyreplReplayScript=await i.text();else console.warn(`pyrepl-web: failed to fetch replay script from ${n.replaySrc}`)}catch(i){console.warn(`pyrepl-web: error fetching replay script from ${n.replaySrc}`,i)}globalThis.pyreplReplayStartup=n.replayStartup;let p=await Lr();l.runPython(p),l.runPythonAsync("await start_repl()");while(!globalThis.currentBrowserConsole)await new Promise((i)=>setTimeout(i,10));let w=globalThis.currentBrowserConsole;if(globalThis.currentBrowserConsole=null,globalThis.term=null,globalThis.pyreplStartupScript=void 0,globalThis.pyreplReplayScript=void 0,globalThis.pyreplReplayStartup=!1,globalThis.pyreplTheme="",globalThis.pyreplPygmentsFallback="",globalThis.pyreplInfo="",globalThis.pyreplReadonly=!1,globalThis.pyreplPromptColor="",globalThis.pyreplPygmentsStyle=void 0,globalThis.pyreplBanner=!1,!n.readonly)e.onData((i)=>{for(let y of i)w.push_char(y.charCodeAt(0))});if(n.showButtons){let i=r.querySelector('[data-action="copy"]'),y=r.querySelector('[data-action="clear"]');i?.addEventListener("click",()=>{let c=e.buffer.active,x="";for(let d=0;d<c.length;d++){let R=c.getLine(d);if(R)x+=`${R.translateToString(!0)}
`}navigator.clipboard.writeText(x.trimEnd())}),y?.addEventListener("click",()=>{if(e.reset(),n.showBanner)e.write(`\x1B[90m${s}\x1B[0m\r
`);e.write("\x1B[32m>>> \x1B[0m")})}}async function kr(){let r=document.querySelectorAll(".pyrepl"),e=Array.from(r).filter((l)=>!l.closest("py-repl")&&!l.dataset.pyreplInitialized);if(e.length===0)return;for(let l of e)l.dataset.pyreplInitialized="true";let n=await Promise.all(Array.from(e).map(async(l)=>({container:l,...await qr(l)})));for(let{container:l,term:o,config:_}of n)k=k.then(()=>Gr(l,o,_));await k}Rr();var le=[hr("py-repl")],ee=v,rn=Jr(ee);class P extends ee{static properties={theme:{type:String},packages:{type:String},replTitle:{type:String,attribute:"repl-title"},noBanner:{type:Boolean,attribute:"no-banner"},isReadonly:{type:Boolean,attribute:"readonly"},noButtons:{type:Boolean,attribute:"no-buttons"},noHeader:{type:Boolean,attribute:"no-header"},src:{type:String},replaySrc:{type:String,attribute:"replay-src"},replayStartup:{type:Boolean,attribute:"replay"}};constructor(){super();this.theme="catppuccin-mocha",this.packages="",this.replTitle="Python REPL",this.noBanner=!1,this.isReadonly=!1,this.noButtons=!1,this.noHeader=!1,this.src="",this.replaySrc="",this.replayStartup=!1}createRenderRoot(){return this}firstUpdated(r){super.firstUpdated(r);let e=this.querySelector(".pyrepl");if(!e){console.error("pyrepl-web: .pyrepl container not found in <py-repl>");return}e.dataset.pyreplInitialized="true",new L({container:e,theme:this.theme,packages:this.packages.split(",").map((l)=>l.trim()).filter((l)=>l.length>0),readonly:this.isReadonly,src:this.src||void 0,replaySrc:this.replaySrc||void 0,replayStartup:this.replayStartup,showHeader:!this.noHeader,showButtons:!this.noButtons,title:this.replTitle,showBanner:!this.noBanner}).init()}render(){return cr`<div class="pyrepl"></div>`}}P=Cr(rn,0,"PyRepl",le,P),Br(rn,1,P),Or(rn,P);let _PyRepl=P;export{P as PyRepl};
