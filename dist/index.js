/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Root.ts":
/*!********************************!*\
  !*** ./src/components/Root.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// 공백을 지운다
var Root = function () {
    return {
        template: "div#rootDivId.rootDivClass.rootDivClass2$background-color: red$width: 100px$height: 100px",
        eventHandlers: [],
        children: [],
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Root);


/***/ }),

/***/ "./src/lib/@types/guards.ts":
/*!**********************************!*\
  !*** ./src/lib/@types/guards.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "contains": () => (/* binding */ contains)
/* harmony export */ });
var contains = function (list, value) {
    return list.some(function (item) { return item === value; });
};


/***/ }),

/***/ "./src/lib/constants.ts":
/*!******************************!*\
  !*** ./src/lib/constants.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tagTypeList": () => (/* binding */ tagTypeList),
/* harmony export */   "attributeNameList": () => (/* binding */ attributeNameList),
/* harmony export */   "styleNameList": () => (/* binding */ styleNameList),
/* harmony export */   "domEventList": () => (/* binding */ domEventList)
/* harmony export */ });
var tagTypeList = [
    "a",
    "abbr",
    "acronym",
    "abbr",
    "address",
    "applet",
    "embed",
    "object",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "basefont",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "center",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "dir",
    "ul",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "font",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1> to <h6",
    "head",
    "header",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "meta",
    "meter",
    "nav",
    "noframes",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strike",
    "del",
    "s",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "svg",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "tt",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
];
var attributeNameList = [
    "accept",
    "accept-charset",
    "accesskey",
    "action",
    "alt",
    "async",
    "autocomplete",
    "autofocus",
    "autoplay",
    "charset",
    "checked",
    "cite",
    "class",
    "cols",
    "colspan",
    "content",
    "contenteditable",
    "controls",
    "coords",
    "data",
    "data-*",
    "datetime",
    "default",
    "defer",
    "dir",
    "dirname",
    "disabled",
    "download",
    "draggable",
    "enctype",
    "for",
    "form",
    "formaction",
    "headers",
    "height",
    "hidden",
    "high",
    "href",
    "hreflang",
    "http-equiv",
    "id",
    "ismap",
    "kind",
    "label",
    "lang",
    "list",
    "loop",
    "low",
    "max",
    "maxlength",
    "media",
    "method",
    "min",
    "multiple",
    "muted",
    "name",
    "novalidate",
    "onabort",
    "onafterprint",
    "onbeforeprint",
    "onbeforeunload",
    "onblur",
    "oncanplay",
    "oncanplaythrough",
    "onchange",
    "onclick",
    "oncontextmenu",
    "oncopy",
    "oncuechange",
    "oncut",
    "ondblclick",
    "ondrag",
    "ondragend",
    "ondragenter",
    "ondragleave",
    "ondragover",
    "ondragstart",
    "ondrop",
    "ondurationchange",
    "onemptied",
    "onended",
    "onerror",
    "onfocus",
    "onhashchange",
    "oninput",
    "oninvalid",
    "onkeydown",
    "onkeypress",
    "onkeyup",
    "onload",
    "onloadeddata",
    "onloadedmetadata",
    "onloadstart",
    "onmousedown",
    "onmousemove",
    "onmouseout",
    "onmouseover",
    "onmouseup",
    "onmousewheel",
    "onoffline",
    "ononline",
    "onpageshow",
    "onpaste",
    "onpause",
    "onplay",
    "onplaying",
    "onprogress",
    "onratechange",
    "onreset",
    "onresize",
    "onscroll",
    "onsearch",
    "onseeked",
    "onseeking",
    "onselect",
    "onstalled",
    "onsubmit",
    "onsuspend",
    "ontimeupdate",
    "ontoggle",
    "onunload",
    "onvolumechange",
    "onwaiting",
    "onwheel",
    "open",
    "optimum",
    "pattern",
    "placeholder",
    "poster",
    "preload",
    "readonly",
    "rel",
    "required",
    "reversed",
    "rows",
    "rowspan",
    "sandbox",
    "scope",
    "selected",
    "shape",
    "size",
    "sizes",
    "span",
    "spellcheck",
    "src",
    "srcdoc",
    "srclang",
    "srcset",
    "start",
    "step",
    "style",
    "tabindex",
    "target",
    "title",
    "translate",
    "type",
    "usemap",
    "value",
    "width",
    "wrap",
];
var styleNameList = [
    "align-content",
    "align-items",
    "align-self",
    "all",
    "animation",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "backface-visibility",
    "background",
    "background-attachment",
    "background-blend-mode",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-repeat",
    "background-size",
    "border",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-collapse",
    "border-color",
    "border-image",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-spacing",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "bottom",
    "box-decoration-break",
    "box-shadow",
    "box-sizing",
    "break-after",
    "break-before",
    "break-inside",
    "caption-side",
    "caret-color",
    "@charset",
    "clear",
    "clip",
    "color",
    "column-count",
    "column-fill",
    "column-gap",
    "column-rule",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-span",
    "column-width",
    "columns",
    "content",
    "counter-increment",
    "counter-reset",
    "cursor",
    "direction",
    "display",
    "empty-cells",
    "filter",
    "flex",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "float",
    "font",
    "@font-face",
    "font-family",
    "font-feature-settings",
    "font-kerning",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-variant-caps",
    "font-weight",
    "gap",
    "grid",
    "grid-area",
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-column",
    "grid-column-end",
    "grid-column-gap",
    "grid-column-start",
    "grid-gap",
    "grid-row",
    "grid-row-end",
    "grid-row-gap",
    "grid-row-start",
    "grid-template",
    "grid-template-areas",
    "grid-template-columns",
    "grid-template-rows",
    "hanging-punctuation",
    "height",
    "hyphens",
    "@import",
    "isolation",
    "justify-content",
    "@keyframes",
    "left",
    "letter-spacing",
    "line-height",
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "margin",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "margin-top",
    "max-height",
    "max-width",
    "@media",
    "min-height",
    "min-width",
    "mix-blend-mode",
    "object-fit",
    "object-position",
    "opacity",
    "order",
    "outline",
    "outline-color",
    "outline-offset",
    "outline-style",
    "outline-width",
    "overflow",
    "overflow-x",
    "overflow-y",
    "padding",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
    "page-break-after",
    "page-break-before",
    "page-break-inside",
    "perspective",
    "perspective-origin",
    "pointer-events",
    "position",
    "quotes",
    "resize",
    "right",
    "row-gap",
    "scroll-behavior",
    "tab-size",
    "table-layout",
    "text-align",
    "text-align-last",
    "text-decoration",
    "text-decoration-color",
    "text-decoration-line",
    "text-decoration-style",
    "text-indent",
    "text-justify",
    "text-overflow",
    "text-shadow",
    "text-transform",
    "top",
    "transform",
    "transform-origin",
    "transform-style",
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "unicode-bidi",
    "user-select",
    "vertical-align",
    "visibility",
    "white-space",
    "width",
    "word-break",
    "word-spacing",
    "word-wrap",
    "writing-mode",
    "z-index",
];
var domEventList = [
    "abort",
    "afterprint",
    "animationend",
    "animationiteration",
    "animationstart",
    "beforeprint",
    "beforeunload",
    "blur",
    "canplay",
    "canplaythrough",
    "change",
    "click",
    "contextmenu",
    "copy",
    "cut",
    "dblclick",
    "drag",
    "dragend",
    "dragenter",
    "dragleave",
    "dragover",
    "dragstart",
    "drop",
    "durationchange",
    "ended",
    "error",
    "focus",
    "focusin",
    "focusout",
    "fullscreenchange",
    "fullscreenerror",
    "hashchange",
    "input",
    "invalid",
    "keydown",
    "keypress",
    "keyup",
    "load",
    "loadeddata",
    "loadedmetadata",
    "loadstart",
    "message",
    "mousedown",
    "mouseenter",
    "mouseleave",
    "mousemove",
    "mouseover",
    "mouseout",
    "mouseup",
    "offline",
    "online",
    "open",
    "pagehide",
    "pageshow",
    "paste",
    "pause",
    "play",
    "playing",
    "progress",
    "ratechange",
    "resize",
    "reset",
    "scroll",
    "search",
    "seeked",
    "seeking",
    "select",
    "show",
    "stalled",
    "submit",
    "suspend",
    "timeupdate",
    "toggle",
    "touchcancel",
    "touchend",
    "touchmove",
    "touchstart",
    "transitionend",
    "unload",
    "volumechange",
    "waiting",
    "wheel",
];


/***/ }),

/***/ "./src/lib/render.ts":
/*!***************************!*\
  !*** ./src/lib/render.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template */ "./src/lib/template.ts");
/* harmony import */ var _components_Root__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Root */ "./src/components/Root.ts");


function createElement(component) {
    var template = component.template, eventHandlers = component.eventHandlers, children = component.children;
    if ((0,_template__WEBPACK_IMPORTED_MODULE_0__.getIdCounts)(template) > 1) {
        throw Error("id 가 여럿인 태그를 만들 수 없습니다");
    }
    var element = {
        type: "div",
        attribute: {},
        style: {},
        children: [],
        dataset: {},
    };
    var noBlankTemplate = template.replace(/ /g, "");
    var tagType = (0,_template__WEBPACK_IMPORTED_MODULE_0__.getTagType)(noBlankTemplate);
    element.type = tagType;
    var Ids = (0,_template__WEBPACK_IMPORTED_MODULE_0__.getIds)(noBlankTemplate);
    if (Ids) {
        var id = Ids[0];
        element.attribute.id = id;
    }
    var classes = (0,_template__WEBPACK_IMPORTED_MODULE_0__.getClasses)(noBlankTemplate);
    if (classes) {
        element.attribute.class = classes.join(" ");
    }
    var attributes = (0,_template__WEBPACK_IMPORTED_MODULE_0__.getAttributes)(noBlankTemplate);
    if (attributes) {
        attributes.forEach(function (_a) {
            var attributeName = _a[0], attributeValue = _a[1];
            element.attribute[attributeName] = attributeValue;
        });
    }
    var styles = (0,_template__WEBPACK_IMPORTED_MODULE_0__.getStyles)(noBlankTemplate);
    if (styles) {
        styles.forEach(function (_a) {
            var styleName = _a[0], styleValue = _a[1];
            element.style[styleName] = styleValue;
        });
    }
    // 이제 또 이거랑 싸워야겠군
    // element.children = children.map(child => )
    return element;
}
function createHTMLElement(element) {
    var type = element.type, attribute = element.attribute, style = element.style, children = element.children;
    var HTMLElement = document.createElement(type);
    Object.keys(attribute).forEach(function (attributeName) {
        // TODO : 여기 as string 어떻게 지우지?
        HTMLElement.setAttribute(attributeName, attribute[attributeName]);
    });
    var elementStyles = Object.keys(style)
        .map(function (styleName) { return styleName + ":" + style[styleName]; })
        .join(";");
    HTMLElement.setAttribute("styles", elementStyles);
    children.forEach(function (child) {
        if (typeof child === "string") {
            HTMLElement.appendChild(document.createTextNode(child));
            return;
        }
        HTMLElement.appendChild(createHTMLElement(child));
    });
    return HTMLElement;
}
function setEvents() { }
function compare(prevElement, Element) { }
function initRender() { }
function render(id) {
    var $root = document.querySelector(id);
    var rootComponent = (0,_components_Root__WEBPACK_IMPORTED_MODULE_1__["default"])();
    var rootElement = createElement(rootComponent);
    console.log("rootElement", rootElement);
    var rootHTMLElement = createHTMLElement(rootElement);
    $root.appendChild(rootHTMLElement);
    setEvents();
}


/***/ }),

/***/ "./src/lib/template.ts":
/*!*****************************!*\
  !*** ./src/lib/template.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isTagType": () => (/* binding */ isTagType),
/* harmony export */   "hasWrongAttributeName": () => (/* binding */ hasWrongAttributeName),
/* harmony export */   "isAttributes": () => (/* binding */ isAttributes),
/* harmony export */   "hasWrongStyleName": () => (/* binding */ hasWrongStyleName),
/* harmony export */   "isStyleName": () => (/* binding */ isStyleName),
/* harmony export */   "getTagType": () => (/* binding */ getTagType),
/* harmony export */   "getIdCounts": () => (/* binding */ getIdCounts),
/* harmony export */   "getIds": () => (/* binding */ getIds),
/* harmony export */   "getClasses": () => (/* binding */ getClasses),
/* harmony export */   "getAttributes": () => (/* binding */ getAttributes),
/* harmony export */   "getStyles": () => (/* binding */ getStyles)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/lib/constants.ts");
/* harmony import */ var _types_guards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./@types/guards */ "./src/lib/@types/guards.ts");


var isTagType = function (tagType) {
    if ((0,_types_guards__WEBPACK_IMPORTED_MODULE_1__.contains)(_constants__WEBPACK_IMPORTED_MODULE_0__.tagTypeList, tagType)) {
        return true;
    }
    return false;
};
// contains 만 있었으면 됬네...근데 결국 서술어 때문에 필요는 할듯
var hasWrongAttributeName = function (attributeNames) {
    return attributeNames.some(function (attributeName) {
        return !(0,_types_guards__WEBPACK_IMPORTED_MODULE_1__.contains)(_constants__WEBPACK_IMPORTED_MODULE_0__.attributeNameList, attributeName);
    });
};
var isAttributes = function (attributes) {
    var attributeNames = attributes.map(function (_a) {
        var attributeName = _a[0];
        return attributeName;
    });
    if (attributes.some(function (attribute) { return attribute.length > 2; })) {
        return false;
    }
    if (hasWrongAttributeName(attributeNames)) {
        return false;
    }
    return true;
};
var hasWrongStyleName = function (styleNames) {
    return styleNames.some(function (styleName) { return !(0,_types_guards__WEBPACK_IMPORTED_MODULE_1__.contains)(_constants__WEBPACK_IMPORTED_MODULE_0__.styleNameList, styleName); });
};
var isStyleName = function (styles) {
    var styleNames = styles.map(function (_a) {
        var styleName = _a[0];
        return styleName;
    });
    if (styles.some(function (style) { return style.length > 2; })) {
        return false;
    }
    if (hasWrongStyleName(styleNames)) {
        return false;
    }
    return true;
};
var getTagType = function (template) {
    var tagType = template.split(/[\#,\.,\@,\$]/)[0];
    if (!isTagType(tagType)) {
        throw Error("올바르지 않은 tag 타입입니다!");
    }
    return tagType;
};
var getIdCounts = function (template) {
    return template.split("").filter(function (char) { return char === "#"; }).length;
};
var getIds = function (template) {
    var idStrings = template.match(/\#([0-9]|[A-Z]|[a-z])*/g);
    if (!idStrings) {
        return null;
    }
    return idStrings.map(function (idString) { return idString.substr(1); });
};
var getClasses = function (template) {
    var classStrings = template.match(/\.([0-9]|[A-Z]|[a-z])*/g);
    if (!classStrings) {
        return null;
    }
    return classStrings.map(function (classString) { return classString.substr(1); });
};
var getAttributes = function (template) {
    var attributeStrings = template.match(/\@([0-9]|[A-Z]|[a-z]|[-]|[:])*/g);
    if (!attributeStrings) {
        return null;
    }
    var attributes = attributeStrings.map(function (attribute) { return attribute.split(":"); });
    if (!isAttributes(attributes)) {
        throw Error("올바르지 않은 attribute 형식이 들어있습니다!");
    }
    return attributes;
};
var getStyles = function (template) {
    var styleStrings = template.match(/\$([0-9]|[A-Z]|[a-z]|[-]|[:])*/g);
    if (!styleStrings) {
        return null;
    }
    var styles = styleStrings.map(function (attribute) {
        return attribute.substr(1).split(":");
    });
    if (!isStyleName(styles)) {
        throw Error("올바르지 않은 style 형식이 들어있습니다!");
    }
    return styles;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/render */ "./src/lib/render.ts");

(0,_lib_render__WEBPACK_IMPORTED_MODULE_0__["default"])("#root");

})();

/******/ })()
;
//# sourceMappingURL=index.js.map