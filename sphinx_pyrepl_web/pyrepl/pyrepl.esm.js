import{d as On,e as Bn,f as Cn,g as Kn,i as Nn}from"./chunk-ftjk4vft.js";var K=globalThis,I=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,A=Symbol(),U=new WeakMap;class D{constructor(n,r,e){if(this._$cssResult$=!0,e!==A)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=r}get styleSheet(){let n=this.o,r=this.t;if(I&&n===void 0){let e=r!==void 0&&r.length===1;e&&(n=U.get(r)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),e&&U.set(r,n))}return n}toString(){return this.cssText}}var M=(n)=>new D(typeof n=="string"?n:n+"",void 0,A);var nn=(n,r)=>{if(I)n.adoptedStyleSheets=r.map((e)=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let l=document.createElement("style"),o=K.litNonce;o!==void 0&&l.setAttribute("nonce",o),l.textContent=e.cssText,n.appendChild(l)}},T=I?(n)=>n:(n)=>n instanceof CSSStyleSheet?((r)=>{let e="";for(let l of r.cssRules)e+=l.cssText;return M(e)})(n):n;var{is:In,defineProperty:Wn,getOwnPropertyDescriptor:Yn,getOwnPropertyNames:Xn,getOwnPropertySymbols:$n,getPrototypeOf:Dn}=Object,Y=globalThis,en=Y.trustedTypes,Tn=en?en.emptyScript:"",Vn=Y.reactiveElementPolyfillSupport,N=(n,r)=>n,W={toAttribute(n,r){switch(r){case Boolean:n=n?Tn:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,r){let e=n;switch(r){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch(l){e=null}}return e}},V=(n,r)=>!In(n,r),rn={attribute:!0,type:String,converter:W,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;class m extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??=[]).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,r=rn){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(n,r),!r.noAccessor){let e=Symbol(),l=this.getPropertyDescriptor(n,e,r);l!==void 0&&Wn(this.prototype,n,l)}}static getPropertyDescriptor(n,r,e){let{get:l,set:o}=Yn(this.prototype,n)??{get(){return this[r]},set(_){this[r]=_}};return{get:l,set(_){let s=l?.call(this);o?.call(this,_),this.requestUpdate(n,s,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??rn}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let n=Dn(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let r=this.properties,e=[...Xn(r),...$n(r)];for(let l of e)this.createProperty(l,r[l])}let n=this[Symbol.metadata];if(n!==null){let r=litPropertyMetadata.get(n);if(r!==void 0)for(let[e,l]of r)this.elementProperties.set(e,l)}this._$Eh=new Map;for(let[r,e]of this.elementProperties){let l=this._$Eu(r,e);l!==void 0&&this._$Eh.set(l,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){let r=[];if(Array.isArray(n)){let e=new Set(n.flat(1/0).reverse());for(let l of e)r.unshift(T(l))}else n!==void 0&&r.push(T(n));return r}static _$Eu(n,r){let e=r.attribute;return e===!1?void 0:typeof e=="string"?e:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((n)=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((n)=>n(this))}addController(n){(this._$EO??=new Set).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){let n=new Map,r=this.constructor.elementProperties;for(let e of r.keys())this.hasOwnProperty(e)&&(n.set(e,this[e]),delete this[e]);n.size>0&&(this._$Ep=n)}createRenderRoot(){let n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return nn(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((n)=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach((n)=>n.hostDisconnected?.())}attributeChangedCallback(n,r,e){this._$AK(n,e)}_$ET(n,r){let e=this.constructor.elementProperties.get(n),l=this.constructor._$Eu(n,e);if(l!==void 0&&e.reflect===!0){let o=(e.converter?.toAttribute!==void 0?e.converter:W).toAttribute(r,e.type);this._$Em=n,o==null?this.removeAttribute(l):this.setAttribute(l,o),this._$Em=null}}_$AK(n,r){let e=this.constructor,l=e._$Eh.get(n);if(l!==void 0&&this._$Em!==l){let o=e.getPropertyOptions(l),_=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:W;this._$Em=l;let s=_.fromAttribute(r,o.type);this[l]=s??this._$Ej?.get(l)??s,this._$Em=null}}requestUpdate(n,r,e,l=!1,o){if(n!==void 0){let _=this.constructor;if(l===!1&&(o=this[n]),e??=_.getPropertyOptions(n),!((e.hasChanged??V)(o,r)||e.useDefault&&e.reflect&&o===this._$Ej?.get(n)&&!this.hasAttribute(_._$Eu(n,e))))return;this.C(n,r,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,r,{useDefault:e,reflect:l,wrapped:o},_){e&&!(this._$Ej??=new Map).has(n)&&(this._$Ej.set(n,_??r??this[n]),o!==!0||_!==void 0)||(this._$AL.has(n)||(this.hasUpdated||e||(r=void 0),this._$AL.set(n,r)),l===!0&&this._$Em!==n&&(this._$Eq??=new Set).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[l,o]of this._$Ep)this[l]=o;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[l,o]of e){let{wrapped:_}=o,s=this[l];_!==!0||this._$AL.has(l)||s===void 0||this.C(l,void 0,o,s)}}let n=!1,r=this._$AL;try{n=this.shouldUpdate(r),n?(this.willUpdate(r),this._$EO?.forEach((e)=>e.hostUpdate?.()),this.update(r)):this._$EM()}catch(e){throw n=!1,this._$EM(),e}n&&this._$AE(r)}willUpdate(n){}_$AE(n){this._$EO?.forEach((r)=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&=this._$Eq.forEach((r)=>this._$ET(r,this[r])),this._$EM()}updated(n){}firstUpdated(n){}}m.elementStyles=[],m.shadowRootOptions={mode:"open"},m[N("elementProperties")]=new Map,m[N("finalized")]=new Map,Vn?.({ReactiveElement:m}),(Y.reactiveElementVersions??=[]).push("2.1.2");var Z=globalThis,ln=(n)=>n,X=Z.trustedTypes,on=X?X.createPolicy("lit-html",{createHTML:(n)=>n}):void 0;var u=`lit$${Math.random().toFixed(9).slice(2)}$`,cn="?"+u,Zn=`<${cn}>`,b=document,q=()=>b.createComment(""),G=(n)=>n===null||typeof n!="object"&&typeof n!="function",z=Array.isArray,zn=(n)=>z(n)||typeof n?.[Symbol.iterator]=="function";var F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_n=/-->/g,sn=/>/g,t=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pn=/'/g,yn=/"/g,an=/^(?:script|style|textarea|title)$/i,j=(n)=>(r,...e)=>({_$litType$:n,strings:r,values:e}),xn=j(1),pe=j(2),ye=j(3),h=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),wn=new WeakMap,f=b.createTreeWalker(b,129);function dn(n,r){if(!z(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return on!==void 0?on.createHTML(r):r}var jn=(n,r)=>{let e=n.length-1,l=[],o,_=r===2?"<svg>":r===3?"<math>":"",s=F;for(let y=0;y<e;y++){let w=n[y],i,p,a=-1,x=0;for(;x<w.length&&(s.lastIndex=x,p=s.exec(w),p!==null);)x=s.lastIndex,s===F?p[1]==="!--"?s=_n:p[1]!==void 0?s=sn:p[2]!==void 0?(an.test(p[2])&&(o=RegExp("</"+p[2],"g")),s=t):p[3]!==void 0&&(s=t):s===t?p[0]===">"?(s=o??F,a=-1):p[1]===void 0?a=-2:(a=s.lastIndex-p[2].length,i=p[1],s=p[3]===void 0?t:p[3]==='"'?yn:pn):s===yn||s===pn?s=t:s===_n||s===sn?s=F:(s=t,o=void 0);let d=s===t&&n[y+1].startsWith("/>")?" ":"";_+=s===F?w+Zn:a>=0?(l.push(i),w.slice(0,a)+"$lit$"+w.slice(a)+u+d):w+u+(a===-2?y:d)}return[dn(n,_+(n[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),l]};class J{constructor({strings:n,_$litType$:r},e){let l;this.parts=[];let o=0,_=0,s=n.length-1,y=this.parts,[w,i]=jn(n,r);if(this.el=J.createElement(w,e),f.currentNode=this.el.content,r===2||r===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(l=f.nextNode())!==null&&y.length<s;){if(l.nodeType===1){if(l.hasAttributes())for(let p of l.getAttributeNames())if(p.endsWith("$lit$")){let a=i[_++],x=l.getAttribute(p).split(u),d=/([.?@])?(.*)/.exec(a);y.push({type:1,index:o,name:d[2],strings:x,ctor:d[1]==="."?un:d[1]==="?"?tn:d[1]==="@"?fn:B}),l.removeAttribute(p)}else p.startsWith(u)&&(y.push({type:6,index:o}),l.removeAttribute(p));if(an.test(l.tagName)){let p=l.textContent.split(u),a=p.length-1;if(a>0){l.textContent=X?X.emptyScript:"";for(let x=0;x<a;x++)l.append(p[x],q()),f.nextNode(),y.push({type:2,index:++o});l.append(p[a],q())}}}else if(l.nodeType===8)if(l.data===cn)y.push({type:2,index:o});else{let p=-1;for(;(p=l.data.indexOf(u,p+1))!==-1;)y.push({type:7,index:o}),p+=u.length-1}o++}}static createElement(n,r){let e=b.createElement("template");return e.innerHTML=n,e}}function S(n,r,e=n,l){if(r===h)return r;let o=l!==void 0?e._$Co?.[l]:e._$Cl,_=G(r)?void 0:r._$litDirective$;return o?.constructor!==_&&(o?._$AO?.(!1),_===void 0?o=void 0:(o=new _(n),o._$AT(n,e,l)),l!==void 0?(e._$Co??=[])[l]=o:e._$Cl=o),o!==void 0&&(r=S(n,o._$AS(n,r.values),o,l)),r}class mn{constructor(n,r){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){let{el:{content:r},parts:e}=this._$AD,l=(n?.creationScope??b).importNode(r,!0);f.currentNode=l;let o=f.nextNode(),_=0,s=0,y=e[0];for(;y!==void 0;){if(_===y.index){let w;y.type===2?w=new O(o,o.nextSibling,this,n):y.type===1?w=new y.ctor(o,y.name,y.strings,this,n):y.type===6&&(w=new bn(o,this,n)),this._$AV.push(w),y=e[++s]}_!==y?.index&&(o=f.nextNode(),_++)}return f.currentNode=b,l}p(n){let r=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(n,e,r),r+=e.strings.length-2):e._$AI(n[r])),r++}}class O{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,r,e,l){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=n,this._$AB=r,this._$AM=e,this.options=l,this._$Cv=l?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode,r=this._$AM;return r!==void 0&&n?.nodeType===11&&(n=r.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,r=this){n=S(this,n,r),G(n)?n===c||n==null||n===""?(this._$AH!==c&&this._$AR(),this._$AH=c):n!==this._$AH&&n!==h&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):zn(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==c&&G(this._$AH)?this._$AA.nextSibling.data=n:this.T(b.createTextNode(n)),this._$AH=n}$(n){let{values:r,_$litType$:e}=n,l=typeof e=="number"?this._$AC(n):(e.el===void 0&&(e.el=J.createElement(dn(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===l)this._$AH.p(r);else{let o=new mn(l,this),_=o.u(this.options);o.p(r),this.T(_),this._$AH=o}}_$AC(n){let r=wn.get(n.strings);return r===void 0&&wn.set(n.strings,r=new J(n)),r}k(n){z(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,e,l=0;for(let o of n)l===r.length?r.push(e=new O(this.O(q()),this.O(q()),this,this.options)):e=r[l],e._$AI(o),l++;l<r.length&&(this._$AR(e&&e._$AB.nextSibling,l),r.length=l)}_$AR(n=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);n!==this._$AB;){let e=ln(n).nextSibling;ln(n).remove(),n=e}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}}class B{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,r,e,l,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=n,this.name=r,this._$AM=l,this.options=o,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=c}_$AI(n,r=this,e,l){let o=this.strings,_=!1;if(o===void 0)n=S(this,n,r,0),_=!G(n)||n!==this._$AH&&n!==h,_&&(this._$AH=n);else{let s=n,y,w;for(n=o[0],y=0;y<o.length-1;y++)w=S(this,s[e+y],r,y),w===h&&(w=this._$AH[y]),_||=!G(w)||w!==this._$AH[y],w===c?n=c:n!==c&&(n+=(w??"")+o[y+1]),this._$AH[y]=w}_&&!l&&this.j(n)}j(n){n===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}}class un extends B{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===c?void 0:n}}class tn extends B{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==c)}}class fn extends B{constructor(n,r,e,l,o){super(n,r,e,l,o),this.type=5}_$AI(n,r=this){if((n=S(this,n,r,0)??c)===h)return;let e=this._$AH,l=n===c&&e!==c||n.capture!==e.capture||n.once!==e.once||n.passive!==e.passive,o=n!==c&&(e===c||l);l&&this.element.removeEventListener(this.name,this,e),o&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}}class bn{constructor(n,r,e){this.element=n,this.type=6,this._$AN=void 0,this._$AM=r,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(n){S(this,n)}}var Qn=Z.litHtmlPolyfillSupport;Qn?.(J,O),(Z.litHtmlVersions??=[]).push("3.3.2");var hn=(n,r,e)=>{let l=e?.renderBefore??r,o=l._$litPart$;if(o===void 0){let _=e?.renderBefore??null;l._$litPart$=o=new O(r.insertBefore(q(),_),_,void 0,e??{})}return o._$AI(n),o};var Q=globalThis;class v extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let n=super.createRenderRoot();return this.renderOptions.renderBefore??=n.firstChild,n}update(n){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=hn(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return h}}v._$litElement$=!0,v.finalized=!0,Q.litElementHydrateSupport?.({LitElement:v});var gn=Q.litElementPolyfillSupport;gn?.({LitElement:v});(Q.litElementVersions??=[]).push("4.2.2");var vn=(n)=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,r)}):customElements.define(n,r)};var Sn=`from codeop import compile_command
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
`;var g=null,H=null,k=Promise.resolve(),C={"catppuccin-mocha":{background:"#1e1e2e",foreground:"#cdd6f4",cursor:"#f5e0dc",cursorAccent:"#1e1e2e",selectionBackground:"#585b70",black:"#45475a",red:"#f38ba8",green:"#a6e3a1",yellow:"#f9e2af",blue:"#89b4fa",magenta:"#f5c2e7",cyan:"#94e2d5",white:"#bac2de",brightBlack:"#585b70",brightRed:"#f38ba8",brightGreen:"#a6e3a1",brightYellow:"#f9e2af",brightBlue:"#89b4fa",brightMagenta:"#f5c2e7",brightCyan:"#94e2d5",brightWhite:"#a6adc8",headerBackground:"#181825",headerForeground:"#6c7086"},"catppuccin-latte":{background:"#eff1f5",foreground:"#4c4f69",cursor:"#dc8a78",cursorAccent:"#eff1f5",selectionBackground:"#acb0be",black:"#5c5f77",red:"#d20f39",green:"#40a02b",yellow:"#df8e1d",blue:"#1e66f5",magenta:"#ea76cb",cyan:"#179299",white:"#acb0be",brightBlack:"#6c6f85",brightRed:"#d20f39",brightGreen:"#40a02b",brightYellow:"#df8e1d",brightBlue:"#1e66f5",brightMagenta:"#ea76cb",brightCyan:"#179299",brightWhite:"#bcc0cc",headerBackground:"#dce0e8",headerForeground:"#8c8fa1"}},E="catppuccin-mocha";function Fn(n){if(!n.startsWith("#"))return!0;let r=n.slice(1),e=parseInt(r.slice(0,2),16),l=parseInt(r.slice(2,4),16),o=parseInt(r.slice(4,6),16);return(0.299*e+0.587*l+0.114*o)/255<0.5}function En(n){if("black"in n&&"red"in n)return n;let r=Fn(n.background)?"catppuccin-mocha":"catppuccin-latte",e=C[r];return{cursor:e.cursor,cursorAccent:e.cursorAccent,selectionBackground:e.selectionBackground,black:e.black,red:e.red,green:e.green,yellow:e.yellow,blue:e.blue,magenta:e.magenta,cyan:e.cyan,white:e.white,brightBlack:e.brightBlack,brightRed:e.brightRed,brightGreen:e.brightGreen,brightYellow:e.brightYellow,brightBlue:e.brightBlue,brightMagenta:e.brightMagenta,brightCyan:e.brightCyan,brightWhite:e.brightWhite,background:n.background,foreground:n.foreground,headerBackground:n.headerBackground??e.headerBackground,headerForeground:n.headerForeground??e.headerForeground,promptColor:n.promptColor,pygmentsStyle:n.pygmentsStyle}}var kn={copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',clear:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>'};function Hn(n){let r,e,l=n.dataset.themeConfig;if(l)try{let s=JSON.parse(l);r=En(s),e="custom"}catch{console.warn("pyrepl-web: invalid data-theme-config JSON, falling back to default"),r=C[E],e=E}else{e=n.dataset.theme||E;let s=window.pyreplThemes?.[e]||C[e]||C[E];if(r=En(s),!window.pyreplThemes?.[e]&&!C[e])console.warn(`pyrepl-web: unknown theme "${e}", falling back to default`),e=E}let o=n.dataset.packages,_=o?o.split(",").map((s)=>s.trim()).filter(Boolean):[];return{theme:r,themeName:e,showHeader:n.dataset.header!=="false",showButtons:n.dataset.buttons!=="false",title:n.dataset.title||"python",packages:_,src:n.dataset.src||null,replaySrc:n.dataset.replaySrc||null,replayStartup:n.dataset.replay==="true",readonly:n.dataset.readonly==="true",showBanner:n.dataset.noBanner!=="true"}}async function Ln(){if(!g){let{loadPyodide:n}=await import("./chunk-e4mhg83d.js");g=n({indexURL:"https://cdn.jsdelivr.net/pyodide/v314.0.1/full/",stdout:()=>{},stderr:()=>{}})}return await g}function Rn(){if(!H)H=Promise.resolve(Sn);return H}class L{container;theme;packages;readonly;src;replaySrc;replayStartup;showHeader;showButtons;title;showBanner;constructor(n){this.container=n.container,this.theme=n.theme||E,this.packages=n.packages||[],this.readonly=n.readonly||!1,this.src=n.src,this.replaySrc=n.replaySrc,this.replayStartup=n.replayStartup||!1,this.showHeader=n.showHeader!==void 0?n.showHeader:!0,this.showButtons=n.showButtons!==void 0?n.showButtons:!0,this.title=n.title||"python",this.showBanner=n.showBanner!==void 0?n.showBanner:!0}async init(){if(this.container.dataset.theme=this.theme,this.container.dataset.packages=this.packages.join(","),this.container.dataset.readonly=this.readonly?"true":"false",this.src)this.container.dataset.src=this.src;if(this.replaySrc)this.container.dataset.replaySrc=this.replaySrc;this.container.dataset.replay=this.replayStartup?"true":"false",this.container.dataset.header=this.showHeader?"true":"false",this.container.dataset.buttons=this.showButtons?"true":"false",this.container.dataset.title=this.title,this.container.dataset.noBanner=this.showBanner?"false":"true";let{term:n,config:r}=await Gn(this.container);k=k.then(()=>Jn(this.container,n,r)),await k}}function Un(){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",Pn);else Pn()}function An(){if(document.getElementById("pyrepl-styles"))return;let n=document.createElement("link");n.rel="stylesheet",n.href="https://cdn.jsdelivr.net/npm/@xterm/xterm/css/xterm.css",document.head.appendChild(n);let r=document.createElement("style");r.id="pyrepl-styles",r.textContent=`
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
  `,document.head.appendChild(r)}function Mn(n,r){let e=r.headerBackground||r.black,l=r.headerForeground||r.brightBlack;n.style.setProperty("--pyrepl-bg",r.background),n.style.setProperty("--pyrepl-header-bg",e),n.style.setProperty("--pyrepl-header-title",l),n.style.setProperty("--pyrepl-red",r.red),n.style.setProperty("--pyrepl-yellow",r.yellow),n.style.setProperty("--pyrepl-green",r.green),n.style.setProperty("--pyrepl-shadow","0 4px 24px rgba(0, 0, 0, 0.3)")}function qn(){let n=document.createElement("div");return n.className="pyrepl-header-buttons",n.innerHTML=`
    <button class="pyrepl-header-btn" data-action="copy" title="Copy output">${kn.copy}</button>
    <button class="pyrepl-header-btn" data-action="clear" title="Clear terminal">${kn.clear}</button>
  `,n}function ne(n){let r=document.createElement("div");r.className="pyrepl-header";let e=document.createElement("div");e.className="pyrepl-header-dots",e.innerHTML=`
    <div class="pyrepl-header-dot red"></div>
    <div class="pyrepl-header-dot yellow"></div>
    <div class="pyrepl-header-dot green"></div>
  `;let l=document.createElement("div");if(l.className="pyrepl-header-title",l.textContent=n.title,r.appendChild(e),r.appendChild(l),n.showButtons)r.appendChild(qn());else{let o=document.createElement("div");o.style.width="48px",r.appendChild(o)}return r}async function Gn(n){An();let r=Hn(n);if(Mn(n,r.theme),r.showHeader)n.appendChild(ne(r));else if(r.showButtons){let _=qn();_.classList.add("pyrepl-floating-buttons"),n.classList.add("pyrepl--floating-buttons"),n.appendChild(_)}let e=await import("./chunk-jfxv8vy0.js"),l=document.createElement("div");n.appendChild(l);let o=new e.Terminal({cursorBlink:!r.readonly,cursorStyle:r.readonly?"bar":"block",fontSize:14,fontFamily:"monospace",theme:r.theme,disableStdin:r.readonly});return o.open(l),{term:o,config:r}}async function Jn(n,r,e){let l=await Ln();if(await l.loadPackage("micropip"),e.packages.length>0)await l.pyimport("micropip").install(e.packages);let o=e.packages.length>0?` (installed packages: ${e.packages.join(", ")})`:"",s=`${await l.runPythonAsync("import sys; sys.version.split()[0]")}${o}`;if(e.showBanner)r.write(`\x1B[90m${s}\x1B[0m\r
`);if(globalThis.term=r,globalThis.pyreplTheme=e.themeName,globalThis.pyreplPygmentsFallback=Fn(e.theme.background)?"catppuccin-mocha":"catppuccin-latte",globalThis.pyreplInfo=s,globalThis.pyreplReadonly=e.readonly,globalThis.pyreplPromptColor=e.theme.promptColor||"green",globalThis.pyreplPygmentsStyle=e.theme.pygmentsStyle,globalThis.pyreplBanner=e.showBanner,e.src)try{let i=await fetch(e.src);if(i.ok)globalThis.pyreplStartupScript=await i.text();else console.warn(`pyrepl-web: failed to fetch script from ${e.src}`)}catch(i){console.warn(`pyrepl-web: error fetching script from ${e.src}`,i)}if(e.replaySrc)try{let i=await fetch(e.replaySrc);if(i.ok)globalThis.pyreplReplayScript=await i.text();else{let p=`pyrepl-web: failed to fetch replay script from ${e.replaySrc}`;console.warn(p),r.write(`\x1B[31m${p}\x1B[0m\r
`)}}catch(i){let p=`pyrepl-web: error fetching replay script from ${e.replaySrc}`;console.warn(p,i),r.write(`\x1B[31m${p}\x1B[0m\r
`)}globalThis.pyreplReplayStartup=e.replayStartup;let y=await Rn();l.runPython(y),l.runPythonAsync("await start_repl()");while(!globalThis.currentBrowserConsole)await new Promise((i)=>setTimeout(i,10));let w=globalThis.currentBrowserConsole;if(globalThis.currentBrowserConsole=null,globalThis.term=null,globalThis.pyreplStartupScript=void 0,globalThis.pyreplReplayScript=void 0,globalThis.pyreplReplayStartup=!1,globalThis.pyreplTheme="",globalThis.pyreplPygmentsFallback="",globalThis.pyreplInfo="",globalThis.pyreplReadonly=!1,globalThis.pyreplPromptColor="",globalThis.pyreplPygmentsStyle=void 0,globalThis.pyreplBanner=!1,!e.readonly)r.onData((i)=>{for(let p of i)w.push_char(p.charCodeAt(0))});if(e.showButtons){let i=n.querySelector('[data-action="copy"]'),p=n.querySelector('[data-action="clear"]');i?.addEventListener("click",()=>{let a=r.buffer.active,x="";for(let d=0;d<a.length;d++){let R=a.getLine(d);if(R)x+=`${R.translateToString(!0)}
`}navigator.clipboard.writeText(x.trimEnd())}),p?.addEventListener("click",()=>{if(r.reset(),e.showBanner)r.write(`\x1B[90m${s}\x1B[0m\r
`);r.write("\x1B[32m>>> \x1B[0m")})}}async function Pn(){let n=document.querySelectorAll(".pyrepl"),r=Array.from(n).filter((l)=>!l.closest("py-repl")&&!l.dataset.pyreplInitialized);if(r.length===0)return;for(let l of r)l.dataset.pyreplInitialized="true";let e=await Promise.all(Array.from(r).map(async(l)=>({container:l,...await Gn(l)})));for(let{container:l,term:o,config:_}of e)k=k.then(()=>Jn(l,o,_));await k}Un();var lr=[vn("py-repl")],rr=v,ee=On(rr);class P extends rr{static properties={theme:{type:String},packages:{type:String},replTitle:{type:String,attribute:"repl-title"},noBanner:{type:Boolean,attribute:"no-banner"},isReadonly:{type:Boolean,attribute:"readonly"},noButtons:{type:Boolean,attribute:"no-buttons"},noHeader:{type:Boolean,attribute:"no-header"},src:{type:String},replaySrc:{type:String,attribute:"replay-src"},replayStartup:{type:Boolean,attribute:"replay"}};constructor(){super();this.theme="catppuccin-mocha",this.packages="",this.replTitle="Python REPL",this.noBanner=!1,this.isReadonly=!1,this.noButtons=!1,this.noHeader=!1,this.src="",this.replaySrc="",this.replayStartup=!1}createRenderRoot(){return this}firstUpdated(n){super.firstUpdated(n);let r=this.querySelector(".pyrepl");if(!r){console.error("pyrepl-web: .pyrepl container not found in <py-repl>");return}r.dataset.pyreplInitialized="true",new L({container:r,theme:this.theme,packages:this.packages.split(",").map((l)=>l.trim()).filter((l)=>l.length>0),readonly:this.isReadonly,src:this.src||void 0,replaySrc:this.replaySrc||void 0,replayStartup:this.replayStartup,showHeader:!this.noHeader,showButtons:!this.noButtons,title:this.replTitle,showBanner:!this.noBanner}).init()}render(){return xn`<div class="pyrepl"></div>`}}P=Kn(ee,0,"PyRepl",lr,P),Cn(ee,1,P),Bn(ee,P);let _PyRepl=P;export{P as PyRepl};
