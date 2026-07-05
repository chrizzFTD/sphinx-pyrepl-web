import{d as Bn,e as Cn,f as In,g as Wn,i as qn}from"./chunk-ftjk4vft.js";var I=globalThis,W=I.ShadowRoot&&(I.ShadyCSS===void 0||I.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,M=Symbol(),U=new WeakMap;class V{constructor(n,e,r){if(this._$cssResult$=!0,r!==M)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=e}get styleSheet(){let n=this.o,e=this.t;if(W&&n===void 0){let r=e!==void 0&&e.length===1;r&&(n=U.get(e)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),r&&U.set(e,n))}return n}toString(){return this.cssText}}var g=(n)=>new V(typeof n=="string"?n:n+"",void 0,M);var nn=(n,e)=>{if(W)n.adoptedStyleSheets=e.map((r)=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(let r of e){let l=document.createElement("style"),o=I.litNonce;o!==void 0&&l.setAttribute("nonce",o),l.textContent=r.cssText,n.appendChild(l)}},T=W?(n)=>n:(n)=>n instanceof CSSStyleSheet?((e)=>{let r="";for(let l of e.cssRules)r+=l.cssText;return g(r)})(n):n;var{is:Yn,defineProperty:Xn,getOwnPropertyDescriptor:$n,getOwnPropertyNames:Dn,getOwnPropertySymbols:Vn,getPrototypeOf:Tn}=Object,X=globalThis,en=X.trustedTypes,Zn=en?en.emptyScript:"",zn=X.reactiveElementPolyfillSupport,F=(n,e)=>n,Y={toAttribute(n,e){switch(e){case Boolean:n=n?Zn:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let r=n;switch(e){case Boolean:r=n!==null;break;case Number:r=n===null?null:Number(n);break;case Object:case Array:try{r=JSON.parse(n)}catch(l){r=null}}return r}},Z=(n,e)=>!Yn(n,e),rn={attribute:!0,type:String,converter:Y,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??=Symbol("metadata"),X.litPropertyMetadata??=new WeakMap;class u extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??=[]).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,e=rn){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(n,e),!e.noAccessor){let r=Symbol(),l=this.getPropertyDescriptor(n,r,e);l!==void 0&&Xn(this.prototype,n,l)}}static getPropertyDescriptor(n,e,r){let{get:l,set:o}=$n(this.prototype,n)??{get(){return this[e]},set(_){this[e]=_}};return{get:l,set(_){let s=l?.call(this);o?.call(this,_),this.requestUpdate(n,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??rn}static _$Ei(){if(this.hasOwnProperty(F("elementProperties")))return;let n=Tn(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F("properties"))){let e=this.properties,r=[...Dn(e),...Vn(e)];for(let l of r)this.createProperty(l,e[l])}let n=this[Symbol.metadata];if(n!==null){let e=litPropertyMetadata.get(n);if(e!==void 0)for(let[r,l]of e)this.elementProperties.set(r,l)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let l=this._$Eu(e,r);l!==void 0&&this._$Eh.set(l,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){let e=[];if(Array.isArray(n)){let r=new Set(n.flat(1/0).reverse());for(let l of r)e.unshift(T(l))}else n!==void 0&&e.push(T(n));return e}static _$Eu(n,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((n)=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((n)=>n(this))}addController(n){(this._$EO??=new Set).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){let n=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(n.set(r,this[r]),delete this[r]);n.size>0&&(this._$Ep=n)}createRenderRoot(){let n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return nn(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((n)=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach((n)=>n.hostDisconnected?.())}attributeChangedCallback(n,e,r){this._$AK(n,r)}_$ET(n,e){let r=this.constructor.elementProperties.get(n),l=this.constructor._$Eu(n,r);if(l!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:Y).toAttribute(e,r.type);this._$Em=n,o==null?this.removeAttribute(l):this.setAttribute(l,o),this._$Em=null}}_$AK(n,e){let r=this.constructor,l=r._$Eh.get(n);if(l!==void 0&&this._$Em!==l){let o=r.getPropertyOptions(l),_=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Y;this._$Em=l;let s=_.fromAttribute(e,o.type);this[l]=s??this._$Ej?.get(l)??s,this._$Em=null}}requestUpdate(n,e,r,l=!1,o){if(n!==void 0){let _=this.constructor;if(l===!1&&(o=this[n]),r??=_.getPropertyOptions(n),!((r.hasChanged??Z)(o,e)||r.useDefault&&r.reflect&&o===this._$Ej?.get(n)&&!this.hasAttribute(_._$Eu(n,r))))return;this.C(n,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,e,{useDefault:r,reflect:l,wrapped:o},_){r&&!(this._$Ej??=new Map).has(n)&&(this._$Ej.set(n,_??e??this[n]),o!==!0||_!==void 0)||(this._$AL.has(n)||(this.hasUpdated||r||(e=void 0),this._$AL.set(n,e)),l===!0&&this._$Em!==n&&(this._$Eq??=new Set).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[l,o]of this._$Ep)this[l]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[l,o]of r){let{wrapped:_}=o,s=this[l];_!==!0||this._$AL.has(l)||s===void 0||this.C(l,void 0,o,s)}}let n=!1,e=this._$AL;try{n=this.shouldUpdate(e),n?(this.willUpdate(e),this._$EO?.forEach((r)=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw n=!1,this._$EM(),r}n&&this._$AE(e)}willUpdate(n){}_$AE(n){this._$EO?.forEach((e)=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&=this._$Eq.forEach((e)=>this._$ET(e,this[e])),this._$EM()}updated(n){}firstUpdated(n){}}u.elementStyles=[],u.shadowRootOptions={mode:"open"},u[F("elementProperties")]=new Map,u[F("finalized")]=new Map,zn?.({ReactiveElement:u}),(X.reactiveElementVersions??=[]).push("2.1.2");var z=globalThis,ln=(n)=>n,$=z.trustedTypes,on=$?$.createPolicy("lit-html",{createHTML:(n)=>n}):void 0;var a=`lit$${Math.random().toFixed(9).slice(2)}$`,xn="?"+a,Qn=`<${xn}>`,b=document,G=()=>b.createComment(""),J=(n)=>n===null||typeof n!="object"&&typeof n!="function",Q=Array.isArray,jn=(n)=>Q(n)||typeof n?.[Symbol.iterator]=="function";var q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_n=/-->/g,sn=/>/g,f=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pn=/'/g,yn=/"/g,cn=/^(?:script|style|textarea|title)$/i,j=(n)=>(e,...r)=>({_$litType$:n,strings:e,values:r}),dn=j(1),ie=j(2),xe=j(3),h=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),wn=new WeakMap,t=b.createTreeWalker(b,129);function mn(n,e){if(!Q(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return on!==void 0?on.createHTML(e):e}var kn=(n,e)=>{let r=n.length-1,l=[],o,_=e===2?"<svg>":e===3?"<math>":"",s=q;for(let y=0;y<r;y++){let w=n[y],i,p,c=-1,d=0;for(;d<w.length&&(s.lastIndex=d,p=s.exec(w),p!==null);)d=s.lastIndex,s===q?p[1]==="!--"?s=_n:p[1]!==void 0?s=sn:p[2]!==void 0?(cn.test(p[2])&&(o=RegExp("</"+p[2],"g")),s=f):p[3]!==void 0&&(s=f):s===f?p[0]===">"?(s=o??q,c=-1):p[1]===void 0?c=-2:(c=s.lastIndex-p[2].length,i=p[1],s=p[3]===void 0?f:p[3]==='"'?yn:pn):s===yn||s===pn?s=f:s===_n||s===sn?s=q:(s=f,o=void 0);let m=s===f&&n[y+1].startsWith("/>")?" ":"";_+=s===q?w+Qn:c>=0?(l.push(i),w.slice(0,c)+"$lit$"+w.slice(c)+a+m):w+a+(c===-2?y:m)}return[mn(n,_+(n[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),l]};class K{constructor({strings:n,_$litType$:e},r){let l;this.parts=[];let o=0,_=0,s=n.length-1,y=this.parts,[w,i]=kn(n,e);if(this.el=K.createElement(w,r),t.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(l=t.nextNode())!==null&&y.length<s;){if(l.nodeType===1){if(l.hasAttributes())for(let p of l.getAttributeNames())if(p.endsWith("$lit$")){let c=i[_++],d=l.getAttribute(p).split(a),m=/([.?@])?(.*)/.exec(c);y.push({type:1,index:o,name:m[2],strings:d,ctor:m[1]==="."?an:m[1]==="?"?fn:m[1]==="@"?tn:B}),l.removeAttribute(p)}else p.startsWith(a)&&(y.push({type:6,index:o}),l.removeAttribute(p));if(cn.test(l.tagName)){let p=l.textContent.split(a),c=p.length-1;if(c>0){l.textContent=$?$.emptyScript:"";for(let d=0;d<c;d++)l.append(p[d],G()),t.nextNode(),y.push({type:2,index:++o});l.append(p[c],G())}}}else if(l.nodeType===8)if(l.data===xn)y.push({type:2,index:o});else{let p=-1;for(;(p=l.data.indexOf(a,p+1))!==-1;)y.push({type:7,index:o}),p+=a.length-1}o++}}static createElement(n,e){let r=b.createElement("template");return r.innerHTML=n,r}}function v(n,e,r=n,l){if(e===h)return e;let o=l!==void 0?r._$Co?.[l]:r._$Cl,_=J(e)?void 0:e._$litDirective$;return o?.constructor!==_&&(o?._$AO?.(!1),_===void 0?o=void 0:(o=new _(n),o._$AT(n,r,l)),l!==void 0?(r._$Co??=[])[l]=o:r._$Cl=o),o!==void 0&&(e=v(n,o._$AS(n,e.values),o,l)),e}class un{constructor(n,e){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){let{el:{content:e},parts:r}=this._$AD,l=(n?.creationScope??b).importNode(e,!0);t.currentNode=l;let o=t.nextNode(),_=0,s=0,y=r[0];for(;y!==void 0;){if(_===y.index){let w;y.type===2?w=new O(o,o.nextSibling,this,n):y.type===1?w=new y.ctor(o,y.name,y.strings,this,n):y.type===6&&(w=new bn(o,this,n)),this._$AV.push(w),y=r[++s]}_!==y?.index&&(o=t.nextNode(),_++)}return t.currentNode=b,l}p(n){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(n,r,e),e+=r.strings.length-2):r._$AI(n[e])),e++}}class O{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,e,r,l){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=n,this._$AB=e,this._$AM=r,this.options=l,this._$Cv=l?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode,e=this._$AM;return e!==void 0&&n?.nodeType===11&&(n=e.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,e=this){n=v(this,n,e),J(n)?n===x||n==null||n===""?(this._$AH!==x&&this._$AR(),this._$AH=x):n!==this._$AH&&n!==h&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):jn(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==x&&J(this._$AH)?this._$AA.nextSibling.data=n:this.T(b.createTextNode(n)),this._$AH=n}$(n){let{values:e,_$litType$:r}=n,l=typeof r=="number"?this._$AC(n):(r.el===void 0&&(r.el=K.createElement(mn(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===l)this._$AH.p(e);else{let o=new un(l,this),_=o.u(this.options);o.p(e),this.T(_),this._$AH=o}}_$AC(n){let e=wn.get(n.strings);return e===void 0&&wn.set(n.strings,e=new K(n)),e}k(n){Q(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,l=0;for(let o of n)l===e.length?e.push(r=new O(this.O(G()),this.O(G()),this,this.options)):r=e[l],r._$AI(o),l++;l<e.length&&(this._$AR(r&&r._$AB.nextSibling,l),e.length=l)}_$AR(n=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);n!==this._$AB;){let r=ln(n).nextSibling;ln(n).remove(),n=r}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}}class B{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,e,r,l,o){this.type=1,this._$AH=x,this._$AN=void 0,this.element=n,this.name=e,this._$AM=l,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=x}_$AI(n,e=this,r,l){let o=this.strings,_=!1;if(o===void 0)n=v(this,n,e,0),_=!J(n)||n!==this._$AH&&n!==h,_&&(this._$AH=n);else{let s=n,y,w;for(n=o[0],y=0;y<o.length-1;y++)w=v(this,s[r+y],e,y),w===h&&(w=this._$AH[y]),_||=!J(w)||w!==this._$AH[y],w===x?n=x:n!==x&&(n+=(w??"")+o[y+1]),this._$AH[y]=w}_&&!l&&this.j(n)}j(n){n===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}}class an extends B{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===x?void 0:n}}class fn extends B{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==x)}}class tn extends B{constructor(n,e,r,l,o){super(n,e,r,l,o),this.type=5}_$AI(n,e=this){if((n=v(this,n,e,0)??x)===h)return;let r=this._$AH,l=n===x&&r!==x||n.capture!==r.capture||n.once!==r.once||n.passive!==r.passive,o=n!==x&&(r===x||l);l&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}}class bn{constructor(n,e,r){this.element=n,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(n){v(this,n)}}var Hn=z.litHtmlPolyfillSupport;Hn?.(K,O),(z.litHtmlVersions??=[]).push("3.3.2");var hn=(n,e,r)=>{let l=r?.renderBefore??e,o=l._$litPart$;if(o===void 0){let _=r?.renderBefore??null;l._$litPart$=o=new O(e.insertBefore(G(),_),_,void 0,r??{})}return o._$AI(n),o};var k=globalThis;class S extends u{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let n=super.createRenderRoot();return this.renderOptions.renderBefore??=n.firstChild,n}update(n){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=hn(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return h}}S._$litElement$=!0,S.finalized=!0,k.litElementHydrateSupport?.({LitElement:S});var Ln=k.litElementPolyfillSupport;Ln?.({LitElement:S});(k.litElementVersions??=[]).push("4.2.2");var Sn=(n)=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)};var vn=`from codeop import compile_command
import sys
from _pyrepl.console import Console, Event
from collections import deque
import js
from pyodide.ffi import create_proxy

# ANSI color codes
ANSI_COLORS = {
    "black": "30",
    "red": "31",
    "green": "32",
    "yellow": "33",
    "blue": "34",
    "magenta": "35",
    "cyan": "36",
    "white": "37",
}


def color_to_ansi(color):
    """Convert a color name or hex value to ANSI escape sequence."""
    if color.startswith("#"):
        # Parse hex color (supports #RGB and #RRGGBB)
        hex_val = color[1:]
        if len(hex_val) == 3:
            r = int(hex_val[0] * 2, 16)
            g = int(hex_val[1] * 2, 16)
            b = int(hex_val[2] * 2, 16)
        elif len(hex_val) == 6:
            r = int(hex_val[0:2], 16)
            g = int(hex_val[2:4], 16)
            b = int(hex_val[4:6], 16)
        else:
            return "32"  # Fall back to green
        # Use 24-bit true color: \\x1b[38;2;R;G;Bm
        return f"38;2;{r};{g};{b}"
    else:
        return ANSI_COLORS.get(color, "32")


class BrowserConsole(Console):
    def __init__(self, term):
        # term is the xterm.js Terminal instance passed from JS
        self.term = term
        self.event_queue = deque()
        self.encoding = "utf-8"
        self.screen = []
        self.posxy = (0, 0)
        self.height, self.width = self.getheightwidth()
        self._resolve_input = None

    def getheightwidth(self):
        return self.term.rows, self.term.cols

    def refresh(self, screen, xy):
        pass

    def prepare(self):
        pass

    def restore(self):
        pass

    def move_cursor(self, x, y):
        self.term.write(f"\\x1b[{y + 1};{x + 1}H")
        self.posxy = (x, y)

    def set_cursor_vis(self, visible):
        self.term.write("\\x1b[?25h" if visible else "\\x1b[?25l")

    def beep(self):
        self.term.write("\\x07")

    def clear(self):
        self.term.write("\\x1b[2J\\x1b[H")
        self.screen = []
        self.posxy = (0, 0)

    def flushoutput(self):
        pass  # xterm.js writes immediately

    def finish(self):
        pass

    def forgetinput(self):
        self.event_queue.clear()

    def push_char(self, char):
        self.event_queue.append(char)

        if self._resolve_input:
            resolve = self._resolve_input
            self._resolve_input = None
            resolve()

    def getpending(self):
        data = ""
        raw = b""
        while self.event_queue:
            c = self.event_queue.popleft()
            if isinstance(c, bytes):
                raw += c
                data += c.decode(self.encoding, errors="replace")
            else:
                raw += bytes([c])
                data += chr(c)
        return Event("key", data, raw)

    def wait(self, timeout=None):
        return len(self.event_queue) > 0

    async def get_event(self, block=True):
        if not block and not self.event_queue:
            return None

        while not self.event_queue:
            promise = js.Promise.new(
                create_proxy(
                    lambda resolve, reject: setattr(self, "_resolve_input", resolve)
                )
            )
            await promise

        char = self.event_queue.popleft()
        if isinstance(char, int):
            char_str = chr(char)
            raw = bytes([char])
        else:
            char_str = char
            raw = char.encode(self.encoding)
        event = Event("key", char_str, raw)
        return event

    def repaint(self):
        pass


async def replay_script(
    source,
    browser_console,
    repl_globals,
    exec_with_redirect,
    syntax_highlight,
    PS1,
    PS2,
    history,
):
    """Execute source line-by-line with REPL prompts and highlighting."""
    lines = source.splitlines()
    i = 0
    while i < len(lines):
        while i < len(lines) and not lines[i].strip():
            i += 1
        if i >= len(lines):
            break

        buffer = []
        while i < len(lines):
            line = lines[i]
            i += 1

            if not buffer and not line.strip():
                continue

            buffer.append(line)
            source_so_far = "\\n".join(buffer)

            if len(buffer) == 1:
                browser_console.term.write(
                    PS1 + syntax_highlight(line) + "\\r\\n"
                )
            else:
                browser_console.term.write(
                    PS2 + syntax_highlight(line) + "\\r\\n"
                )

            try:
                code = compile_command(source_so_far, "<startup>", "single")
            except (OverflowError, SyntaxError) as e:
                browser_console.term.write(
                    f"\\x1b[31mSyntaxError: {e}\\x1b[0m\\r\\n"
                )
                buffer = []
                break

            if code is None:
                continue

            try:
                exec_with_redirect(code, repl_globals)
            except SystemExit:
                pass
            except Exception as e:
                browser_console.term.write(
                    f"\\x1b[31m{type(e).__name__}: {e}\\x1b[0m\\r\\n"
                )

            if source_so_far.strip():
                history.append(source_so_far)
            break

    return history


async def start_repl():
    # Create a new console for this terminal instance
    browser_console = BrowserConsole(js.term)

    # Capture startup scripts before JS moves to next REPL and overwrites them
    startup_script = getattr(js, "pyreplStartupScript", None)
    replay_script_content = getattr(js, "pyreplReplayScript", None)
    replay_startup = getattr(js, "pyreplReplayStartup", False)
    theme_name = getattr(js, "pyreplTheme", "catppuccin-mocha")
    pygments_fallback = getattr(js, "pyreplPygmentsFallback", "catppuccin-mocha")
    info_line = getattr(js, "pyreplInfo", "Python (Pyodide)")
    show_banner = getattr(js, "pyreplBanner", True)
    readonly = getattr(js, "pyreplReadonly", False)
    prompt_color = getattr(js, "pyreplPromptColor", None) or "green"
    pygments_style_js = getattr(js, "pyreplPygmentsStyle", None)

    # Build prompt strings with configured color
    color_code = color_to_ansi(prompt_color)
    PS1 = f"\\x1b[{color_code}m>>> \\x1b[0m"
    PS2 = f"\\x1b[{color_code}m... \\x1b[0m"

    # Expose to JS so it can send input (signals JS can proceed to next REPL)
    js.currentBrowserConsole = browser_console

    import micropip
    import rlcompleter
    import re
    import asyncio

    # Lazy-load Pygments in background while REPL starts
    pygments_loaded = False
    lexer = None
    formatter = None

    async def load_pygments():
        nonlocal pygments_loaded, lexer, formatter
        try:
            await micropip.install(["pygments", "catppuccin[pygments]"])
            from pygments.lexers import Python3Lexer
            from pygments.formatters import Terminal256Formatter
            from pygments.styles import get_style_by_name
            from pygments.style import Style
            from pygments.token import string_to_tokentype

            lexer = Python3Lexer()

            # Use custom pygmentsStyle if provided
            if pygments_style_js:
                # Convert JS object to Python dict
                custom_styles = dict(pygments_style_js.to_py())

                # Build style class dynamically
                style_dict = {}
                for token_str, color in custom_styles.items():
                    token = string_to_tokentype(token_str)
                    style_dict[token] = color

                CustomStyle = type("CustomStyle", (Style,), {"styles": style_dict})
                formatter = Terminal256Formatter(style=CustomStyle)
            else:
                # Try theme name as Pygments style, fall back based on background
                try:
                    get_style_by_name(theme_name)
                    style = theme_name
                except Exception:
                    style = pygments_fallback
                formatter = Terminal256Formatter(style=style)

            pygments_loaded = True
        except Exception as e:
            browser_console.term.write(f"[ERROR] Pygments load failed: {e}\\r\\n")

    pygments_task = asyncio.create_task(load_pygments())

    def syntax_highlight(code):
        if not code:
            return ""
        if not pygments_loaded or lexer is None or formatter is None:
            # Return unhighlighted code until Pygments loads
            return code
        try:
            from pygments import highlight

            result = highlight(code, lexer, formatter)
            return result.rstrip("\\n")
        except Exception:
            return code

    class TermWriter:
        def write(self, data):
            browser_console.term.write(data.replace("\\n", "\\r\\n"))

        def flush(self):
            pass

    term_writer = TermWriter()

    # Custom exec that redirects stdout/stderr to this REPL's terminal
    import contextlib

    def exec_with_redirect(code, globals_dict):
        old_displayhook = sys.displayhook

        def displayhook(value):
            if value is not None:
                globals_dict["_"] = value
                browser_console.term.write(repr(value) + "\\r\\n")

        sys.displayhook = displayhook
        try:
            with (
                contextlib.redirect_stdout(term_writer),
                contextlib.redirect_stderr(term_writer),
            ):
                exec(code, globals_dict)
        finally:
            sys.displayhook = old_displayhook

    def clear():
        browser_console.clear()
        if show_banner:
            browser_console.term.write(f"\\x1b[90m{info_line}\\x1b[0m\\r\\n")

    class Exit:
        def __repr__(self):
            return "exit is not available in the browser"

        def __call__(self):
            browser_console.term.write("exit is not available in the browser\\r\\n")

    repl_globals = {
        "__builtins__": __builtins__,
        "clear": clear,
        "exit": Exit(),
        "quit": Exit(),
    }
    completer = rlcompleter.Completer(repl_globals)

    history = []
    history_index = 0

    # Silent bootstrap script (:file: / src without replay)
    if startup_script and not replay_startup:
        try:
            old_stdout, old_stderr = sys.stdout, sys.stderr
            sys.stdout = sys.stderr = type(
                "null", (), {"write": lambda s, x: None, "flush": lambda s: None}
            )()
            exec(startup_script, repl_globals)
            sys.stdout, sys.stderr = old_stdout, old_stderr

        except Exception as e:
            sys.stdout, sys.stderr = old_stdout, old_stderr
            browser_console.term.write(
                f"\\x1b[31mStartup script error - {type(e).__name__}: {e}\\x1b[0m\\r\\n"
            )

        if "setup" in repl_globals and callable(repl_globals["setup"]):
            try:
                exec_with_redirect(compile("setup()", "<setup>", "exec"), repl_globals)
            except Exception as e:
                browser_console.term.write(
                    f"\\x1b[31msetup() error - {type(e).__name__}: {e}\\x1b[0m\\r\\n"
                )

    # Replay script with interactive prompts
    replay_source = replay_script_content
    if replay_source is None and startup_script and replay_startup:
        replay_source = startup_script

    if replay_source:
        await pygments_task
        history = await replay_script(
            replay_source,
            browser_console,
            repl_globals,
            exec_with_redirect,
            syntax_highlight,
            PS1,
            PS2,
            history,
        )
        history_index = len(history)

    def get_completions(text):
        """Get all completions for the given text."""
        completions = []
        i = 0
        while True:
            c = completer.complete(text, i)
            if c is None:
                break
            completions.append(c)
            i += 1
        return completions

    def get_word_to_complete(line):
        """Extract the word to complete from the end of the line."""
        match = re.search(r"[\\w.]*$", line)
        return match.group(0) if match else ""

    # In readonly mode, don't show prompt or accept input
    if readonly:
        return

    browser_console.term.write(PS1)
    lines = []
    current_line = ""

    while True:
        event = await browser_console.get_event(block=True)
        if event is None:
            continue

        char = event.data
        if char == "\\x03":
            # Ctrl+C - interrupt/cancel current input
            browser_console.term.write("^C\\r\\n")
            lines = []
            current_line = ""
            history_index = len(history)
            browser_console.term.write(PS1)
            continue

        if char == "\\x0c":
            # Ctrl+L - clear screen
            clear()
            browser_console.term.write(PS1 + syntax_highlight(current_line))
            continue

        if char == "\\x1b":
            # Might be an arrow key
            event2 = await browser_console.get_event(block=True)
            if event2 and event2.data == "[":
                event3 = await browser_console.get_event(block=True)
                if event3:
                    if event3.data == "A":
                        # Up arrow
                        if history:
                            history_index = max(0, history_index - 1)
                            # Clear current line
                            browser_console.term.write("\\r\\x1b[K")
                            hist_entry = history[history_index]
                            # For multiline entries, only show first line
                            current_line = (
                                hist_entry.split("\\n")[0]
                                if "\\n" in hist_entry
                                else hist_entry
                            )
                            browser_console.term.write(
                                PS1 + syntax_highlight(current_line)
                            )
                    elif event3.data == "B":
                        # Down arrow
                        if history:
                            history_index = min(len(history), history_index + 1)
                            # Clear current line
                            browser_console.term.write("\\r\\x1b[K")
                            if history_index < len(history):
                                hist_entry = history[history_index]
                                # For multiline entries, only show first line
                                current_line = (
                                    hist_entry.split("\\n")[0]
                                    if "\\n" in hist_entry
                                    else hist_entry
                                )
                            else:
                                current_line = ""
                            browser_console.term.write(
                                PS1 + syntax_highlight(current_line)
                            )
                    # Left and Right arrows can be implemented similarly
            continue

        if char == "\\r":
            browser_console.term.write("\\r\\n")

            lines.append(current_line)
            source = "\\n".join(lines)

            if not source.strip():
                lines = []
                current_line = ""
                browser_console.term.write(PS1)
                continue

            # If in multiline mode and user entered empty/whitespace line, execute
            if len(lines) > 1 and not current_line.strip():
                # Remove trailing empty lines
                while lines and not lines[-1].strip():
                    lines.pop()
                source = "\\n".join(lines)
                try:
                    code = compile(source, "<console>", "single")
                    exec_with_redirect(code, repl_globals)
                    history.append(source)
                    history_index = len(history)
                except SystemExit:
                    pass
                except Exception as e:
                    browser_console.term.write(
                        f"\\x1b[31m{type(e).__name__}: {e}\\x1b[0m\\r\\n"
                    )
                lines = []
                current_line = ""
                browser_console.term.write(PS1)
                continue

            try:
                code = compile_command(source, "<console>", "single")
                if code is None:
                    # Incomplete — need more input
                    prev_line = lines[-1] if lines else current_line
                    indent = len(prev_line) - len(prev_line.lstrip())
                    if prev_line.rstrip().endswith(":"):
                        indent += 4
                    browser_console.term.write(PS2 + " " * indent)
                    current_line = " " * indent
                else:
                    # Complete code, execute it
                    if source.strip():
                        history.append(source)
                        history_index = len(history)
                    try:
                        exec_with_redirect(code, repl_globals)
                    except SystemExit:
                        pass
                    except Exception as e:
                        browser_console.term.write(
                            f"\\x1b[31m{type(e).__name__}: {e}\\x1b[0m\\r\\n"
                        )
                    lines = []
                    current_line = ""
                    browser_console.term.write(PS1)
            except SyntaxError as e:
                browser_console.term.write(f"\\x1b[31mSyntaxError: {e}\\x1b[0m\\r\\n")
                lines = []
                current_line = ""
                browser_console.term.write(PS1)
            except Exception as e:
                browser_console.term.write(f"\\x1b[31mError: {e}\\x1b[0m\\r\\n")
                lines = []
                current_line = ""
                browser_console.term.write(PS1)
        elif char == "\\t":
            # Tab completion
            word = get_word_to_complete(current_line)
            if word:
                completions = get_completions(word)
                if len(completions) == 1:
                    # Single match - complete it
                    completion = completions[0]
                    current_line = current_line[: -len(word)] + completion
                    browser_console.term.write("\\r\\x1b[K")
                    prompt = PS1 if len(lines) == 0 else PS2
                    browser_console.term.write(prompt + syntax_highlight(current_line))
                elif len(completions) > 1:
                    # Multiple matches - show them in columns
                    browser_console.term.write("\\r\\n")
                    max_len = max(len(c) for c in completions) + 2
                    cols = max(1, browser_console.term.cols // max_len)
                    for i, c in enumerate(completions):
                        browser_console.term.write(c.ljust(max_len))
                        if (i + 1) % cols == 0:
                            browser_console.term.write("\\r\\n")
                    if len(completions) % cols != 0:
                        browser_console.term.write("\\r\\n")
                    prompt = PS1 if len(lines) == 0 else PS2
                    browser_console.term.write(prompt + syntax_highlight(current_line))
        elif char == "\\x7f":
            if current_line:
                current_line = current_line[:-1]
                browser_console.term.write("\\r\\x1b[K")
                prompt = PS1 if len(lines) == 0 else PS2
                browser_console.term.write(prompt + syntax_highlight(current_line))
        else:
            current_line += char
            # Clear line and rewrite with highlighting
            browser_console.term.write("\\r\\x1b[K")  # Go to start, clear line
            prompt = PS1 if len(lines) == 0 else PS2
            browser_console.term.write(prompt + syntax_highlight(current_line))
`;var Rn=/^(https?:|emfs:)/i;function An(n,e=document.baseURI){if(Rn.test(n))return n;if(n.includes(" @ "))return n;if(!n.includes("/")&&!n.endsWith(".whl"))return n;return new URL(n,e).href}function En(n,e=document.baseURI){return n.map((r)=>An(r,e))}var H=null,L=null,N=Promise.resolve(),C={"catppuccin-mocha":{background:"#1e1e2e",foreground:"#cdd6f4",cursor:"#f5e0dc",cursorAccent:"#1e1e2e",selectionBackground:"#585b70",black:"#45475a",red:"#f38ba8",green:"#a6e3a1",yellow:"#f9e2af",blue:"#89b4fa",magenta:"#f5c2e7",cyan:"#94e2d5",white:"#bac2de",brightBlack:"#585b70",brightRed:"#f38ba8",brightGreen:"#a6e3a1",brightYellow:"#f9e2af",brightBlue:"#89b4fa",brightMagenta:"#f5c2e7",brightCyan:"#94e2d5",brightWhite:"#a6adc8",headerBackground:"#181825",headerForeground:"#6c7086"},"catppuccin-latte":{background:"#eff1f5",foreground:"#4c4f69",cursor:"#dc8a78",cursorAccent:"#eff1f5",selectionBackground:"#acb0be",black:"#5c5f77",red:"#d20f39",green:"#40a02b",yellow:"#df8e1d",blue:"#1e66f5",magenta:"#ea76cb",cyan:"#179299",white:"#acb0be",brightBlack:"#6c6f85",brightRed:"#d20f39",brightGreen:"#40a02b",brightYellow:"#df8e1d",brightBlue:"#1e66f5",brightMagenta:"#ea76cb",brightCyan:"#179299",brightWhite:"#bcc0cc",headerBackground:"#dce0e8",headerForeground:"#8c8fa1"}},E="catppuccin-mocha";function Gn(n){if(!n.startsWith("#"))return!0;let e=n.slice(1),r=parseInt(e.slice(0,2),16),l=parseInt(e.slice(2,4),16),o=parseInt(e.slice(4,6),16);return(0.299*r+0.587*l+0.114*o)/255<0.5}function Nn(n){if("black"in n&&"red"in n)return n;let e=Gn(n.background)?"catppuccin-mocha":"catppuccin-latte",r=C[e];return{cursor:r.cursor,cursorAccent:r.cursorAccent,selectionBackground:r.selectionBackground,black:r.black,red:r.red,green:r.green,yellow:r.yellow,blue:r.blue,magenta:r.magenta,cyan:r.cyan,white:r.white,brightBlack:r.brightBlack,brightRed:r.brightRed,brightGreen:r.brightGreen,brightYellow:r.brightYellow,brightBlue:r.brightBlue,brightMagenta:r.brightMagenta,brightCyan:r.brightCyan,brightWhite:r.brightWhite,background:n.background,foreground:n.foreground,headerBackground:n.headerBackground??r.headerBackground,headerForeground:n.headerForeground??r.headerForeground,promptColor:n.promptColor,pygmentsStyle:n.pygmentsStyle}}var Pn={copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',clear:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>'};function Un(n){let e,r,l=n.dataset.themeConfig;if(l)try{let s=JSON.parse(l);e=Nn(s),r="custom"}catch{console.warn("pyrepl-web: invalid data-theme-config JSON, falling back to default"),e=C[E],r=E}else{r=n.dataset.theme||E;let s=window.pyreplThemes?.[r]||C[r]||C[E];if(e=Nn(s),!window.pyreplThemes?.[r]&&!C[r])console.warn(`pyrepl-web: unknown theme "${r}", falling back to default`),r=E}let o=n.dataset.packages,_=o?o.split(",").map((s)=>s.trim()).filter(Boolean):[];return{theme:e,themeName:r,showHeader:n.dataset.header!=="false",showButtons:n.dataset.buttons!=="false",title:n.dataset.title||"python",packages:_,src:n.dataset.src||null,replaySrc:n.dataset.replaySrc||null,replayStartup:n.dataset.replay==="true",readonly:n.dataset.readonly==="true",showBanner:n.dataset.noBanner!=="true"}}async function Mn(){if(!H){let{loadPyodide:n}=await import("./chunk-cnc6ympw.js");H=n({indexURL:"https://cdn.jsdelivr.net/pyodide/v314.0.1/full/",stdout:()=>{},stderr:()=>{}})}return await H}function gn(){if(!L)L=Promise.resolve(vn);return L}class R{container;theme;packages;readonly;src;replaySrc;replayStartup;showHeader;showButtons;title;showBanner;constructor(n){this.container=n.container,this.theme=n.theme||E,this.packages=n.packages||[],this.readonly=n.readonly||!1,this.src=n.src,this.replaySrc=n.replaySrc,this.replayStartup=n.replayStartup||!1,this.showHeader=n.showHeader!==void 0?n.showHeader:!0,this.showButtons=n.showButtons!==void 0?n.showButtons:!0,this.title=n.title||"python",this.showBanner=n.showBanner!==void 0?n.showBanner:!0}async init(){if(this.container.dataset.theme=this.theme,this.container.dataset.packages=this.packages.join(","),this.container.dataset.readonly=this.readonly?"true":"false",this.src)this.container.dataset.src=this.src;if(this.replaySrc)this.container.dataset.replaySrc=this.replaySrc;this.container.dataset.replay=this.replayStartup?"true":"false",this.container.dataset.header=this.showHeader?"true":"false",this.container.dataset.buttons=this.showButtons?"true":"false",this.container.dataset.title=this.title,this.container.dataset.noBanner=this.showBanner?"false":"true";let{term:n,config:e}=await Kn(this.container);N=N.then(()=>On(this.container,n,e)),await N}}function ne(){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",Fn);else Fn()}function ee(){if(document.getElementById("pyrepl-styles"))return;let n=document.createElement("link");n.rel="stylesheet",n.href="https://cdn.jsdelivr.net/npm/@xterm/xterm/css/xterm.css",document.head.appendChild(n);let e=document.createElement("style");e.id="pyrepl-styles",e.textContent=`
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
  `,document.head.appendChild(e)}function re(n,e){let r=e.headerBackground||e.black,l=e.headerForeground||e.brightBlack;n.style.setProperty("--pyrepl-bg",e.background),n.style.setProperty("--pyrepl-header-bg",r),n.style.setProperty("--pyrepl-header-title",l),n.style.setProperty("--pyrepl-red",e.red),n.style.setProperty("--pyrepl-yellow",e.yellow),n.style.setProperty("--pyrepl-green",e.green),n.style.setProperty("--pyrepl-shadow","0 4px 24px rgba(0, 0, 0, 0.3)")}function Jn(){let n=document.createElement("div");return n.className="pyrepl-header-buttons",n.innerHTML=`
    <button class="pyrepl-header-btn" data-action="copy" title="Copy output">${Pn.copy}</button>
    <button class="pyrepl-header-btn" data-action="clear" title="Clear terminal">${Pn.clear}</button>
  `,n}function le(n){let e=document.createElement("div");e.className="pyrepl-header";let r=document.createElement("div");r.className="pyrepl-header-dots",r.innerHTML=`
    <div class="pyrepl-header-dot red"></div>
    <div class="pyrepl-header-dot yellow"></div>
    <div class="pyrepl-header-dot green"></div>
  `;let l=document.createElement("div");if(l.className="pyrepl-header-title",l.textContent=n.title,e.appendChild(r),e.appendChild(l),n.showButtons)e.appendChild(Jn());else{let o=document.createElement("div");o.style.width="48px",e.appendChild(o)}return e}async function Kn(n){ee();let e=Un(n);if(re(n,e.theme),e.showHeader)n.appendChild(le(e));else if(e.showButtons){let _=Jn();_.classList.add("pyrepl-floating-buttons"),n.classList.add("pyrepl--floating-buttons"),n.appendChild(_)}let r=await import("./chunk-jfxv8vy0.js"),l=document.createElement("div");n.appendChild(l);let o=new r.Terminal({cursorBlink:!e.readonly,cursorStyle:e.readonly?"bar":"block",fontSize:14,fontFamily:"monospace",theme:e.theme,disableStdin:e.readonly});return o.open(l),{term:o,config:e}}async function On(n,e,r){let l=await Mn();if(await l.loadPackage("micropip"),r.packages.length>0)await l.pyimport("micropip").install(En(r.packages));let o=r.packages.length>0?` (installed packages: ${r.packages.join(", ")})`:"",s=`${await l.runPythonAsync("import sys; sys.version.split()[0]")}${o}`;if(r.showBanner)e.write(`\x1B[90m${s}\x1B[0m\r
`);if(globalThis.term=e,globalThis.pyreplTheme=r.themeName,globalThis.pyreplPygmentsFallback=Gn(r.theme.background)?"catppuccin-mocha":"catppuccin-latte",globalThis.pyreplInfo=s,globalThis.pyreplReadonly=r.readonly,globalThis.pyreplPromptColor=r.theme.promptColor||"green",globalThis.pyreplPygmentsStyle=r.theme.pygmentsStyle,globalThis.pyreplBanner=r.showBanner,r.src)try{let i=await fetch(r.src);if(i.ok)globalThis.pyreplStartupScript=await i.text();else console.warn(`pyrepl-web: failed to fetch script from ${r.src}`)}catch(i){console.warn(`pyrepl-web: error fetching script from ${r.src}`,i)}if(r.replaySrc)try{let i=await fetch(r.replaySrc);if(i.ok)globalThis.pyreplReplayScript=await i.text();else{let p=`pyrepl-web: failed to fetch replay script from ${r.replaySrc}`;console.warn(p),e.write(`\x1B[31m${p}\x1B[0m\r
`)}}catch(i){let p=`pyrepl-web: error fetching replay script from ${r.replaySrc}`;console.warn(p,i),e.write(`\x1B[31m${p}\x1B[0m\r
`)}globalThis.pyreplReplayStartup=r.replayStartup;let y=await gn();l.runPython(y),l.runPythonAsync("await start_repl()");while(!globalThis.currentBrowserConsole)await new Promise((i)=>setTimeout(i,10));let w=globalThis.currentBrowserConsole;if(globalThis.currentBrowserConsole=null,globalThis.term=null,globalThis.pyreplStartupScript=void 0,globalThis.pyreplReplayScript=void 0,globalThis.pyreplReplayStartup=!1,globalThis.pyreplTheme="",globalThis.pyreplPygmentsFallback="",globalThis.pyreplInfo="",globalThis.pyreplReadonly=!1,globalThis.pyreplPromptColor="",globalThis.pyreplPygmentsStyle=void 0,globalThis.pyreplBanner=!1,!r.readonly)e.onData((i)=>{for(let p of i)w.push_char(p.charCodeAt(0))});if(r.showButtons){let i=n.querySelector('[data-action="copy"]'),p=n.querySelector('[data-action="clear"]');i?.addEventListener("click",()=>{let c=e.buffer.active,d="";for(let m=0;m<c.length;m++){let A=c.getLine(m);if(A)d+=`${A.translateToString(!0)}
`}navigator.clipboard.writeText(d.trimEnd())}),p?.addEventListener("click",()=>{if(e.reset(),r.showBanner)e.write(`\x1B[90m${s}\x1B[0m\r
`);e.write("\x1B[32m>>> \x1B[0m")})}}async function Fn(){let n=document.querySelectorAll(".pyrepl"),e=Array.from(n).filter((l)=>!l.closest("py-repl")&&!l.dataset.pyreplInitialized);if(e.length===0)return;for(let l of e)l.dataset.pyreplInitialized="true";let r=await Promise.all(Array.from(e).map(async(l)=>({container:l,...await Kn(l)})));for(let{container:l,term:o,config:_}of r)N=N.then(()=>On(l,o,_));await N}ne();var yr=[Sn("py-repl")],pr=S,oe=Bn(pr);class P extends pr{static properties={theme:{type:String},packages:{type:String},replTitle:{type:String,attribute:"repl-title"},noBanner:{type:Boolean,attribute:"no-banner"},isReadonly:{type:Boolean,attribute:"readonly"},noButtons:{type:Boolean,attribute:"no-buttons"},noHeader:{type:Boolean,attribute:"no-header"},src:{type:String},replaySrc:{type:String,attribute:"replay-src"},replayStartup:{type:Boolean,attribute:"replay"}};constructor(){super();this.theme="catppuccin-mocha",this.packages="",this.replTitle="Python REPL",this.noBanner=!1,this.isReadonly=!1,this.noButtons=!1,this.noHeader=!1,this.src="",this.replaySrc="",this.replayStartup=!1}createRenderRoot(){return this}firstUpdated(n){super.firstUpdated(n);let e=this.querySelector(".pyrepl");if(!e){console.error("pyrepl-web: .pyrepl container not found in <py-repl>");return}e.dataset.pyreplInitialized="true",new R({container:e,theme:this.theme,packages:this.packages.split(",").map((l)=>l.trim()).filter((l)=>l.length>0),readonly:this.isReadonly,src:this.src||void 0,replaySrc:this.replaySrc||void 0,replayStartup:this.replayStartup,showHeader:!this.noHeader,showButtons:!this.noButtons,title:this.replTitle,showBanner:!this.noBanner}).init()}render(){return dn`<div class="pyrepl"></div>`}}P=Wn(oe,0,"PyRepl",yr,P),In(oe,1,P),Cn(oe,P);let _PyRepl=P;export{P as PyRepl};
