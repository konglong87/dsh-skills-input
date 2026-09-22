window.__ModuleLoader__.load({id:"dsh-skills-input",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.jsx
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);
var import_react4 = __toESM(require("react"), 1);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var import_react2 = require("react");

// node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// node_modules/lucide-react/dist/esm/Icon.js
var import_react = require("react");

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/Icon.js
var Icon = (0, import_react.forwardRef)(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return (0, import_react.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = (0, import_react2.forwardRef)(
    ({ className, ...props }, ref) => (0, import_react2.createElement)(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};

// node_modules/lucide-react/dist/esm/icons/refresh-cw.js
var RefreshCw = createLucideIcon("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);

// node_modules/lucide-react/dist/esm/icons/search.js
var Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);

// node_modules/lucide-react/dist/esm/icons/sparkles.js
var Sparkles = createLucideIcon("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);

// node_modules/lucide-react/dist/esm/icons/x.js
var X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);

// src/model.js
var PLUGIN_ID = "dsh-skills-input";
var SLOT = "conversation.input.right";
var EXPLORER_ROUTE = "/api/dsh-skill-explorer/list";
var SEARCH_LIMIT = 100;
var SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
var PROJECT_LEVELS = /* @__PURE__ */ new Set(["project-dsh", "project-agents"]);
var CATALOG_ERROR = Object.freeze({
  missing: "missing",
  failed: "failed",
  invalid: "invalid"
});
var CatalogError = class extends Error {
  constructor(kind, message, options = {}) {
    super(message, options);
    this.name = "CatalogError";
    this.kind = kind;
    this.status = options.status;
  }
};
function isSkillName(name) {
  return typeof name === "string" && SKILL_NAME.test(name);
}
function normalizePath(value) {
  if (typeof value !== "string" || value === "") return "";
  const normalized = value.replaceAll("\\", "/");
  return normalized.length > 1 ? normalized.replace(/\/+$/u, "") : normalized;
}
function isPathWithin(path, root) {
  const child = normalizePath(path);
  const parent = normalizePath(root);
  return child !== "" && parent !== "" && (child === parent || child.startsWith(`${parent}/`));
}
function projectRootFor(cwd, projectRoots) {
  const normalizedCwd = normalizePath(cwd);
  if (!normalizedCwd || !Array.isArray(projectRoots)) return "";
  return projectRoots.map(normalizePath).filter((root) => root !== "" && isPathWithin(normalizedCwd, root)).sort((left, right) => right.length - left.length)[0] || "";
}
function rawSkillEntries(payload) {
  if (!payload || typeof payload !== "object" || !Array.isArray(payload.groups)) {
    throw new CatalogError(CATALOG_ERROR.invalid, "Skill Explorer \u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u65E0\u6CD5\u8BC6\u522B");
  }
  return payload.groups.flatMap((group) => {
    if (!group || typeof group !== "object" || !Array.isArray(group.skills)) return [];
    return group.skills.map((skill) => ({ ...skill, level: skill.level ?? group.key }));
  });
}
function isCurrentContextSkill(skill, currentRoot) {
  if (!PROJECT_LEVELS.has(skill.level)) return true;
  return currentRoot !== "" && isPathWithin(skill.path, currentRoot);
}
function normalizeCatalog(payload, context = {}) {
  const entries = rawSkillEntries(payload);
  const currentRoot = projectRootFor(context.cwd ?? payload.cwd, payload.projectRoots ?? context.projectRoots);
  const seen = /* @__PURE__ */ new Set();
  const skills = [];
  for (const skill of entries) {
    if (!isSkillName(skill.name) || skill.userInvocable === false) continue;
    if (!isCurrentContextSkill(skill, currentRoot) || seen.has(skill.name)) continue;
    seen.add(skill.name);
    skills.push({
      name: skill.name,
      description: typeof skill.description === "string" ? skill.description : "",
      whenToUse: typeof skill.whenToUse === "string" ? skill.whenToUse : void 0,
      level: typeof skill.level === "string" ? skill.level : "unknown",
      path: typeof skill.path === "string" ? skill.path : void 0,
      modelInvocable: skill.modelInvocable !== false
    });
  }
  return {
    cwd: typeof payload.cwd === "string" ? payload.cwd : context.cwd,
    complete: payload.complete !== false,
    skills,
    currentRoot
  };
}
async function loadCatalog({ cwd, fetchImpl = globalThis.fetch, signal } = {}) {
  if (typeof fetchImpl !== "function") {
    throw new CatalogError(CATALOG_ERROR.failed, "\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u7F51\u7EDC\u8BF7\u6C42");
  }
  if (typeof cwd !== "string" || cwd.trim() === "") {
    throw new CatalogError(CATALOG_ERROR.failed, "\u5F53\u524D\u4F1A\u8BDD\u6CA1\u6709\u53EF\u7528\u7684\u5DE5\u4F5C\u533A\u8DEF\u5F84");
  }
  const url = `${EXPLORER_ROUTE}?cwd=${encodeURIComponent(cwd)}`;
  let response;
  try {
    response = await fetchImpl(url, {
      method: "GET",
      credentials: "same-origin",
      headers: { accept: "application/json" },
      signal
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new CatalogError(CATALOG_ERROR.failed, `\u65E0\u6CD5\u8FDE\u63A5 Skill Explorer\uFF1A${error instanceof Error ? error.message : String(error)}`, { cause: error });
  }
  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    throw new CatalogError(
      response.status === 404 ? CATALOG_ERROR.missing : CATALOG_ERROR.failed,
      response.status === 404 ? "\u7F3A\u5C11 Skill Explorer \u7EC4\u4EF6\uFF1A\u672A\u627E\u5230 /api/dsh-skill-explorer/list" : `Skill Explorer \u8FD4\u56DE\u4E86\u65E0\u6CD5\u89E3\u6790\u7684\u54CD\u5E94\uFF08HTTP ${response.status}\uFF09`,
      { status: response.status, cause: error }
    );
  }
  if (!response.ok) {
    const detail = typeof payload?.error === "string" ? payload.error : `HTTP ${response.status}`;
    const kind = response.status === 404 || response.status === 405 ? CATALOG_ERROR.missing : CATALOG_ERROR.failed;
    const message = kind === CATALOG_ERROR.missing ? "\u7F3A\u5C11 Skill Explorer \u7EC4\u4EF6\uFF1A\u9700\u8981\u63D0\u4F9B /api/dsh-skill-explorer/list \u63A5\u53E3" : `Skill Explorer \u8BF7\u6C42\u5931\u8D25\uFF1A${detail}`;
    throw new CatalogError(kind, message, { status: response.status });
  }
  return normalizeCatalog(payload, { cwd });
}
function subsequencePositions(name, query) {
  const positions = [];
  let cursor = 0;
  for (const character of query) {
    const found = name.indexOf(character, cursor);
    if (found === -1) return null;
    positions.push(found);
    cursor = found + 1;
  }
  return positions;
}
function searchSkills(skills, query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return [...skills].slice(0, SEARCH_LIMIT);
  return skills.map((skill, index) => {
    const name = skill.name.toLocaleLowerCase();
    const positions = subsequencePositions(name, normalizedQuery);
    if (positions === null) return null;
    const prefix = name.startsWith(normalizedQuery) ? 0 : 1;
    const spread = positions.at(-1) - positions[0] - normalizedQuery.length;
    return { skill, index, score: [prefix, spread, positions[0], index] };
  }).filter(Boolean).sort((left, right) => left.score[0] - right.score[0] || left.score[1] - right.score[1] || left.score[2] - right.score[2] || left.score[3] - right.score[3]).slice(0, SEARCH_LIMIT).map((item) => item.skill);
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}
function containsSkillInvocation(draft, name) {
  if (!isSkillName(name)) return false;
  return new RegExp(`(?:^|\\s)/${escapeRegExp(name)}(?=\\s|$)`, "u").test(draft);
}
function leadingSlashCommand(draft) {
  const firstLine = draft.split(/\r?\n/u).find((line) => line.trim() !== "")?.trimStart() ?? "";
  const match = /^\/([a-z0-9]+(?:-[a-z0-9]+)*)(?:\s|$)/u.exec(firstLine);
  return match?.[1] ?? null;
}
function insertSkillInvocation(draft, name) {
  if (!isSkillName(name)) {
    return { kind: "conflict", draft, reason: "Skill \u540D\u79F0\u683C\u5F0F\u65E0\u6548" };
  }
  if (containsSkillInvocation(draft, name)) {
    return { kind: "unchanged", draft };
  }
  const existingCommand = leadingSlashCommand(draft);
  if (existingCommand !== null && existingCommand !== name) {
    return {
      kind: "conflict",
      draft,
      reason: `\u5F53\u524D\u8349\u7A3F\u5DF2\u6709 /${existingCommand} \u659C\u6760\u547D\u4EE4\uFF0C\u672A\u63D2\u5165 /${name}\uFF0C\u907F\u514D\u4EA7\u751F\u6B67\u4E49`
    };
  }
  const separator = draft === "" || draft.endsWith("\n") ? "" : "\n";
  return { kind: "inserted", draft: `${draft}${separator}/${name} ` };
}

// src/panel.jsx
var import_react3 = __toESM(require("react"), 1);
var import_react_dom = require("react-dom");
var EDGE = 12;
var GAP = 8;
var PANEL_WIDTH = 390;
function IconButton({ label, icon: Icon2, ...props }) {
  return /* @__PURE__ */ import_react3.default.createElement("button", { type: "button", className: "dsh-skills-input-icon", "aria-label": label, title: label, ...props }, /* @__PURE__ */ import_react3.default.createElement(Icon2, { size: 16 }));
}
function panelPosition(anchor) {
  const rect = anchor.current.getBoundingClientRect();
  const width = Math.min(PANEL_WIDTH, window.innerWidth - EDGE * 2);
  const above = rect.top - EDGE - GAP;
  const below = window.innerHeight - rect.bottom - EDGE - GAP;
  const up = above >= below;
  return {
    width,
    left: Math.max(EDGE, Math.min(rect.right - width, window.innerWidth - width - EDGE)),
    maxHeight: Math.max(180, up ? above : below),
    ...up ? { bottom: window.innerHeight - rect.top + GAP } : { top: rect.bottom + GAP }
  };
}
function SkillPanel({ anchor, onClose, getContext, load, useInput, inputActions }) {
  const input = useInput((value) => value);
  const panel = (0, import_react3.useRef)(null);
  const searchInput = (0, import_react3.useRef)(null);
  const [position, setPosition] = (0, import_react3.useState)(null);
  const [query, setQuery] = (0, import_react3.useState)("");
  const [catalog, setCatalog] = (0, import_react3.useState)(null);
  const [status, setStatus] = (0, import_react3.useState)("loading");
  const [error, setError] = (0, import_react3.useState)("");
  const [activeIndex, setActiveIndex] = (0, import_react3.useState)(0);
  const [notice, setNotice] = (0, import_react3.useState)("");
  const requestRef = (0, import_react3.useRef)(0);
  const controllerRef = (0, import_react3.useRef)(null);
  const refresh = () => {
    const requestId = ++requestRef.current;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const context = getContext();
    if (!context.sessionId || !context.cwd) {
      setStatus("failed");
      setError("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684\u4F1A\u8BDD\u5DE5\u4F5C\u533A");
      return () => controller.abort();
    }
    setStatus("loading");
    setError("");
    setNotice("");
    load({ cwd: context.cwd, signal: controller.signal }).then((value) => {
      if (requestId !== requestRef.current) return;
      setCatalog(value);
      setStatus("ready");
      setActiveIndex(0);
    }).catch((value) => {
      if (controller.signal.aborted || requestId !== requestRef.current) return;
      setStatus("failed");
      setError(value instanceof CatalogError ? value.message : String(value));
    });
    return () => controller.abort();
  };
  (0, import_react3.useEffect)(() => {
    const dispose = refresh();
    return () => {
      dispose?.();
      controllerRef.current = null;
    };
  }, []);
  (0, import_react3.useLayoutEffect)(() => {
    const place = () => setPosition(panelPosition(anchor));
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [anchor]);
  (0, import_react3.useEffect)(() => {
    searchInput.current?.focus();
  }, []);
  (0, import_react3.useEffect)(() => {
    const outside = (event) => {
      if (!panel.current?.contains(event.target) && !anchor.current?.contains(event.target)) onClose();
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [anchor, onClose]);
  const items = searchSkills(catalog?.skills || [], query);
  const select = (skill) => {
    const result = insertSkillInvocation(input?.draft || "", skill.name);
    if (result.kind === "conflict") {
      setNotice(result.reason);
      return;
    }
    if (result.kind === "inserted") inputActions.setDraft(result.draft);
    onClose();
  };
  const onSearchKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => items.length ? (index + 1) % items.length : 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => items.length ? (index - 1 + items.length) % items.length : 0);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (items[activeIndex]) select(items[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ import_react3.default.createElement(
      "section",
      {
        ref: panel,
        className: "dsh-skills-input-panel",
        role: "dialog",
        "aria-label": "\u9009\u62E9 Skill",
        style: { ...position, visibility: position ? "visible" : "hidden" },
        onKeyDown: onSearchKeyDown
      },
      /* @__PURE__ */ import_react3.default.createElement("header", { className: "dsh-skills-input-header" }, /* @__PURE__ */ import_react3.default.createElement("strong", null, "\u9009\u62E9 Skill"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "dsh-skills-input-actions" }, /* @__PURE__ */ import_react3.default.createElement(IconButton, { label: "\u5237\u65B0 Skill \u5217\u8868", icon: RefreshCw, disabled: status === "loading", onClick: refresh }), /* @__PURE__ */ import_react3.default.createElement(IconButton, { label: "\u5173\u95ED Skill \u5217\u8868", icon: X, onClick: onClose }))),
      /* @__PURE__ */ import_react3.default.createElement("label", { className: "dsh-skills-input-search" }, /* @__PURE__ */ import_react3.default.createElement(Search, { size: 15, "aria-hidden": "true" }), /* @__PURE__ */ import_react3.default.createElement(
        "input",
        {
          ref: searchInput,
          type: "search",
          "aria-label": "\u641C\u7D22 Skill",
          placeholder: "\u641C\u7D22\u540D\u79F0",
          value: query,
          onChange: (event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }
        }
      )),
      status === "loading" && /* @__PURE__ */ import_react3.default.createElement("p", { className: "dsh-skills-input-status", role: "status" }, "\u52A0\u8F7D Skill \u5217\u8868\u2026"),
      status === "failed" && /* @__PURE__ */ import_react3.default.createElement("p", { className: "dsh-skills-input-status dsh-skills-input-error", role: "alert" }, error),
      status === "ready" && !items.length && /* @__PURE__ */ import_react3.default.createElement("p", { className: "dsh-skills-input-status", role: "status" }, "\u5F53\u524D\u5DE5\u4F5C\u533A\u6CA1\u6709\u53EF\u624B\u52A8\u8C03\u7528\u7684 Skill"),
      notice && /* @__PURE__ */ import_react3.default.createElement("p", { className: "dsh-skills-input-notice", role: "alert" }, notice),
      status === "ready" && items.length > 0 && /* @__PURE__ */ import_react3.default.createElement("ul", { className: "dsh-skills-input-list", role: "listbox", "aria-label": "Skill \u5217\u8868" }, items.map((skill, index) => /* @__PURE__ */ import_react3.default.createElement("li", { key: skill.name, role: "option", "aria-selected": index === activeIndex }, /* @__PURE__ */ import_react3.default.createElement(
        "button",
        {
          type: "button",
          className: `dsh-skills-input-item${index === activeIndex ? " is-active" : ""}`,
          onMouseEnter: () => setActiveIndex(index),
          onClick: () => select(skill)
        },
        /* @__PURE__ */ import_react3.default.createElement("strong", null, "/", skill.name),
        /* @__PURE__ */ import_react3.default.createElement("span", null, skill.description || "\u6682\u65E0\u63CF\u8FF0")
      )))),
      catalog?.complete === false && /* @__PURE__ */ import_react3.default.createElement("p", { className: "dsh-skills-input-warning", role: "status" }, "Skill Explorer \u8FD4\u56DE\u4E86\u4E0D\u5B8C\u6574\u7684\u76EE\u5F55\uFF0C\u5DF2\u663E\u793A\u5F53\u524D\u80FD\u786E\u8BA4\u7684\u9879\u76EE\u3002")
    ),
    document.body
  );
}

// src/styles.css
var styles_default = ".dsh-skills-input-button {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  min-height: 30px;\n  padding: 0 9px;\n  border: 1px solid var(--dsw-alias-border-l1, #d9dde5);\n  border-radius: 6px;\n  background: var(--dsw-alias-bg-layer-1, #f7f8fa);\n  color: var(--dsw-alias-label-secondary, #596170);\n  font: inherit;\n  font-size: 12px;\n  cursor: pointer;\n}\n\n.dsh-skills-input-button:hover,\n.dsh-skills-input-button:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover, #eef1f5);\n  color: var(--dsw-alias-label-primary, #1c1e26);\n}\n\n.dsh-skills-input-panel {\n  position: fixed;\n  z-index: 10000;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid var(--dsw-alias-border-l1, #d9dde5);\n  border-radius: 8px;\n  background: var(--dsw-alias-bg-base, #fff);\n  color: var(--dsw-alias-label-primary, #1c1e26);\n  box-shadow: 0 16px 44px rgb(0 0 0 / 22%);\n}\n\n.dsh-skills-input-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 10px 12px;\n  border-bottom: 1px solid var(--dsw-alias-border-l1, #e5e7eb);\n}\n\n.dsh-skills-input-header strong {\n  font-size: 13px;\n}\n\n.dsh-skills-input-actions {\n  display: flex;\n  gap: 4px;\n}\n\n.dsh-skills-input-icon {\n  display: inline-grid;\n  width: 28px;\n  height: 28px;\n  place-items: center;\n  padding: 0;\n  border: 0;\n  border-radius: 5px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, #596170);\n  cursor: pointer;\n}\n\n.dsh-skills-input-icon:hover,\n.dsh-skills-input-icon:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover, #eef1f5);\n  color: var(--dsw-alias-label-primary, #1c1e26);\n}\n\n.dsh-skills-input-icon:disabled {\n  opacity: .5;\n  cursor: default;\n}\n\n.dsh-skills-input-search {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin: 10px 12px 6px;\n  padding: 0 9px;\n  border: 1px solid var(--dsw-alias-border-l1, #d9dde5);\n  border-radius: 6px;\n  color: var(--dsw-alias-label-tertiary, #8a8f9c);\n}\n\n.dsh-skills-input-search:focus-within {\n  border-color: var(--dsw-alias-interactive-border-focus, #6b7cff);\n}\n\n.dsh-skills-input-search input {\n  width: 100%;\n  min-width: 0;\n  height: 32px;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  background: transparent;\n  color: inherit;\n  font: inherit;\n  font-size: 12px;\n}\n\n.dsh-skills-input-list {\n  min-height: 0;\n  margin: 0;\n  padding: 4px 6px 8px;\n  overflow: auto;\n  list-style: none;\n}\n\n.dsh-skills-input-item {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  width: 100%;\n  gap: 3px;\n  padding: 8px 9px;\n  border: 0;\n  border-radius: 6px;\n  background: transparent;\n  color: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n\n.dsh-skills-input-item:hover,\n.dsh-skills-input-item:focus-visible,\n.dsh-skills-input-item.is-active {\n  background: var(--dsw-alias-interactive-bg-hover, #eef1f5);\n  outline: 0;\n}\n\n.dsh-skills-input-item strong {\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.dsh-skills-input-item span {\n  width: 100%;\n  overflow: hidden;\n  color: var(--dsw-alias-label-secondary, #687181);\n  font-size: 11px;\n  line-height: 1.45;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsh-skills-input-status,\n.dsh-skills-input-notice,\n.dsh-skills-input-warning {\n  margin: 10px 12px;\n  color: var(--dsw-alias-label-secondary, #687181);\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n.dsh-skills-input-error,\n.dsh-skills-input-notice {\n  color: var(--dsw-alias-label-danger, #c43d3d);\n}\n\n.dsh-skills-input-warning {\n  color: var(--dsw-alias-label-warning, #9a6b00);\n}\n\n@media (max-width: 560px) {\n  .dsh-skills-input-button span {\n    display: none;\n  }\n\n  .dsh-skills-input-button {\n    width: 30px;\n    justify-content: center;\n    padding: 0;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsh-skills-input-panel,\n  .dsh-skills-input-button {\n    transition: none;\n  }\n}\n";

// src/client.jsx
var inject = ["slots", "sessions"];
function currentSessionId(props) {
  return props.session?.sessionId || props.sessionId || null;
}
function currentCwd(sessions, sessionId) {
  return sessions.list.getSnapshot().byId[sessionId]?.cwd || "";
}
function SkillButton(props) {
  const { sessions } = props;
  const anchor = (0, import_react4.useRef)(null);
  const [open, setOpen] = import_react4.default.useState(false);
  (0, import_react4.useEffect)(() => {
    if (!open) return void 0;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
        anchor.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  const close = () => {
    setOpen(false);
    anchor.current?.focus();
  };
  return /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      ref: anchor,
      type: "button",
      className: "dsh-skills-input-button",
      "aria-label": "\u9009\u62E9 Skill",
      title: "\u9009\u62E9 Skill",
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      onMouseDown: (event) => event.preventDefault(),
      onClick: () => setOpen((value) => !value)
    },
    /* @__PURE__ */ import_react4.default.createElement(Sparkles, { size: 15, "aria-hidden": "true" }),
    /* @__PURE__ */ import_react4.default.createElement("span", null, "\u9009\u62E9 Skill")
  ), open && /* @__PURE__ */ import_react4.default.createElement(
    SkillPanel,
    {
      ...props,
      anchor,
      onClose: close,
      getContext: () => {
        const sessionId = currentSessionId(props);
        return {
          sessionId,
          cwd: sessionId === null ? "" : currentCwd(sessions, sessionId)
        };
      },
      load: loadCatalog
    }
  ));
}
function apply(ctx) {
  ctx.effect(() => {
    if (typeof document === "undefined") return void 0;
    const style = document.createElement("style");
    style.dataset.plugin = PLUGIN_ID;
    style.textContent = styles_default;
    document.head.appendChild(style);
    return () => style.remove();
  }, `${PLUGIN_ID}: styles`);
  ctx.effect(() => ctx.slots.inject(SLOT, () => ctx.slots.register({
    name: SLOT,
    id: PLUGIN_ID,
    order: 110
  }, (props) => /* @__PURE__ */ import_react4.default.createElement(SkillButton, { ...props }))), `${PLUGIN_ID}: slot`);
}
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/refresh-cw.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
return module.exports;}});
