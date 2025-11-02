import { k as AstroError, z as UnknownContentCollectionError, c as createComponent, B as RenderUndefinedEntryError, u as unescapeHTML, a as renderTemplate, C as renderUniqueStylesheet, G as renderScriptElement, H as createHeadAndContent, r as renderComponent, b as createAstro, m as maybeRenderHead, e as addAttribute, d as renderScript, J as Fragment, f as defineScriptVars, K as renderSlot, O as renderHead } from './astro/server_BL0ualZl.mjs';
import 'kleur/colors';
/* empty css                         */
import { escape } from 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { z } from 'zod';
import { r as removeBase, i as isRemotePath, p as prependForwardSlash } from './index_BS0v8091.mjs';
import { V as VALID_INPUT_FORMATS, $ as $$Image } from './_astro_assets_C4tS8mBi.mjs';
import * as devalue from 'devalue';
import 'clsx';

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_DK_UB8vC.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_ENABLE_GA_DEV": "true", "PUBLIC_GA4_MEASUREMENT_ID": "G-XF7B5Q0E8L", "PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZHV2bnZvY2FjcW5tbGZ1dnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAxNDQsImV4cCI6MjA2OTkyNjE0NH0.GVla_jyPO1tWuQvLm9MscVNH4PC1HWiYx0Ej4xbTauE", "PUBLIC_SUPABASE_URL": "https://paduvnvocacqnmlfuvyn.supabase.co", "SITE": "https://www.edgeviewfinance.com.au", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
z.object({
  tags: z.array(z.string()).optional(),
  maxAge: z.number().optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection,
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (entry.legacyId) {
          entry = emulateLegacyEntry(entry);
        }
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function emulateLegacyEntry({ legacyId, ...entry }) {
  const legacyEntry = {
    ...entry,
    id: legacyId,
    slug: entry.id
  };
  return {
    ...legacyEntry,
    // Define separately so the render function isn't included in the object passed to `renderEntry()`
    render: () => renderEntry(legacyEntry)
  };
}
function createGetEntry({
  getEntryImport,
  getRenderEntryImport,
  collectionNames,
  liveCollections
}) {
  return async function getEntry(collectionOrLookupObject, lookup) {
    let collection, lookupId;
    if (typeof collectionOrLookupObject === "string") {
      collection = collectionOrLookupObject;
      if (!lookup)
        throw new AstroError({
          ...UnknownContentCollectionError,
          message: "`getEntry()` requires an entry identifier as the second argument."
        });
      lookupId = lookup;
    } else {
      collection = collectionOrLookupObject.collection;
      lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
    }
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveEntry() instead of getEntry().`
      });
    }
    if (typeof lookupId === "object") {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `The entry identifier must be a string. Received object.`
      });
    }
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const entry2 = store.get(collection, lookupId);
      if (!entry2) {
        console.warn(`Entry ${collection} → ${lookupId} was not found.`);
        return;
      }
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      entry2.data = updateImageReferencesInData(entry2.data, entry2.filePath, imageAssetMap);
      if (entry2.legacyId) {
        return emulateLegacyEntry({ ...entry2, collection });
      }
      return {
        ...entry2,
        collection
      };
    }
    if (!collectionNames.has(collection)) {
      console.warn(
        `The collection ${JSON.stringify(collection)} does not exist. Please ensure it is defined in your content config.`
      );
      return void 0;
    }
    const entryImport = await getEntryImport(collection, lookupId);
    if (typeof entryImport !== "function") return void 0;
    const entry = await entryImport();
    if (entry._internal.type === "content") {
      return {
        id: entry.id,
        slug: entry.slug,
        body: entry.body,
        collection: entry.collection,
        data: entry.data,
        async render() {
          return render({
            collection: entry.collection,
            id: entry.id,
            renderEntryImport: await getRenderEntryImport(collection, lookupId)
          });
        }
      };
    } else if (entry._internal.type === "data") {
      return {
        id: entry.id,
        collection: entry.collection,
        data: entry.data
      };
    }
    return void 0;
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('./_astro_assets_C4tS8mBi.mjs').then(n => n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute,
      // This attribute is used by the toolbar audit
      ...Object.assign(__vite_import_meta_env__, { _: process.env._ }).DEV ? { "data-image-component": "true" } : {}
    }).map(([key, value]) => value ? `${key}="${escape(value)}"` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if ("render" in entry && !("legacyId" in entry)) {
    return entry.render();
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('./content-modules_Uu4zsPgZ.mjs');
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const liveCollections = {};

const contentDir = '/src/content/';

const contentEntryGlob = "";
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

const collectionNames = new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = "";
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
	liveCollections,
});

const getEntry = createGetEntry({
	getEntryImport: createGlobLookup(collectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	collectionNames,
	liveCollections,
});

const $$Astro$2 = createAstro("https://www.edgeviewfinance.com.au");
const $$Logo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Logo;
  const { link, css, logo } = Astro2.props;
  const MetaData = await getEntry({ collection: "site", id: "meta" });
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(link, "href")}${addAttribute(css, "class")} aria-label="Edgeview Finance - Home"> ${renderComponent($$result, "Image", $$Image, { "src": logo ? logo : MetaData?.data?.logo, "alt": "Edgeview Finance Logo", "width": "180", "height": "60", "loading": "eager", "class": "h-auto w-[140px] md:w-[180px]" })} <span class="sr-only">Edgeview Finance - Home</span> </a>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/ui/Logo.astro", void 0);

const $$Navigation = createComponent(async ($$result, $$props, $$slots) => {
  const Header = await getEntry({ collection: "site", id: "header" });
  return renderTemplate`${maybeRenderHead()}<ul class="site-menu-main" data-astro-cid-jhityggu> ${Header && Header.data.links.map((navItem, index) => {
    if (!navItem?.dropdown) {
      return renderTemplate`<li class="nav-item" data-astro-cid-jhityggu> <a${addAttribute(navItem?.link, "href")} class="nav-link-item"${addAttribute(navItem?.text, "aria-label")}${addAttribute(navItem?.text, "title")} data-astro-cid-jhityggu> <span class="nav-text" data-astro-cid-jhityggu>${navItem?.text}</span> </a> </li>`;
    } else {
      const hasValidLink = navItem?.link && navItem.link !== "#" && navItem.link !== "" && !navItem.link.startsWith("javascript:");
      return renderTemplate`<li class="nav-item nav-item-has-children" data-astro-cid-jhityggu> ${hasValidLink ? (
        // If there's a valid link, keep separate link and button
        renderTemplate`<div class="nav-link-wrapper" data-astro-cid-jhityggu> <a${addAttribute(navItem.link, "href")} class="nav-link-item nav-main-link"${addAttribute(navItem?.text || "Menu", "aria-label")}${addAttribute(navItem?.text || "Menu", "title")} data-astro-cid-jhityggu> <span class="nav-text" data-astro-cid-jhityggu>${navItem?.text || "Menu"}</span> </a> <button type="button" class="dropdown-toggle-btn"${addAttribute(`submenu-${index}`, "data-dropdown-toggle")} aria-expanded="false"${addAttribute(`submenu-${index}`, "aria-controls")} aria-haspopup="true"${addAttribute(`Toggle ${navItem?.text || "Menu"} submenu`, "aria-label")} data-astro-cid-jhityggu> <svg class="dropdown-arrow inline-block w-3 h-3 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" data-astro-cid-jhityggu> <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" data-astro-cid-jhityggu></path> </svg> </button> </div>`
      ) : (
        // If no valid link, combine into a single button
        renderTemplate`<button type="button" class="nav-link-wrapper nav-dropdown-btn-combined"${addAttribute(`submenu-${index}`, "data-dropdown-toggle")} aria-expanded="false"${addAttribute(`submenu-${index}`, "aria-controls")} aria-haspopup="true"${addAttribute(`${navItem?.text || "Menu"} menu`, "aria-label")}${addAttribute(`${navItem?.text || "Menu"} menu`, "title")} data-astro-cid-jhityggu> <span class="nav-text" data-astro-cid-jhityggu>${navItem?.text || "Menu"}</span> <svg class="dropdown-arrow inline-block w-3 h-3 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" data-astro-cid-jhityggu> <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" data-astro-cid-jhityggu></path> </svg> </button>`
      )} <ul class="sub-menu"${addAttribute(`submenu-${index}`, "id")} data-astro-cid-jhityggu> ${navItem.sublinks.map((subItem) => renderTemplate`<li class="sub-menu--item" data-astro-cid-jhityggu> <a${addAttribute(subItem.link, "href")} class="nav-link-item nav-sub-link" data-astro-cid-jhityggu> ${subItem.text} </a> </li>`)} </ul> </li>`;
    }
  })} </ul>  ${renderScript($$result, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/ui/Navigation.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/ui/Navigation.astro", void 0);

const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const {
    data: { rightButton1, rightButton2 }
  } = await getEntry({ collection: "site", id: "header" });
  return renderTemplate`${maybeRenderHead()}<header class="site-header site-header--absolute is--white py-3" id="sticky-menu" data-astro-cid-hnhh3bfe> <div class="container-default" data-astro-cid-hnhh3bfe> <div class="flex items-center justify-between gap-x-4 md:gap-x-8" data-astro-cid-hnhh3bfe> ${renderComponent($$result, "Logo", $$Logo, { "link": "/", "data-astro-cid-hnhh3bfe": true })} <div class="menu-block-wrapper flex-1 hidden lg:flex" data-astro-cid-hnhh3bfe> <div class="menu-overlay" data-astro-cid-hnhh3bfe></div> <nav class="menu-block" id="append-menu-header" data-astro-cid-hnhh3bfe> ${renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-hnhh3bfe": true })} </nav> </div> <div class="flex items-center gap-3 md:gap-6" data-astro-cid-hnhh3bfe> <a${addAttribute(rightButton1?.link || "tel:1300280895", "href")} class="btn-text hidden hover:text-ColorLime md:inline-flex flex-col items-center leading-tight text-center" data-astro-cid-hnhh3bfe> <span class="text-xs" data-astro-cid-hnhh3bfe>Discuss a Scenario</span> <span class="text-sm" data-astro-cid-hnhh3bfe>Call 1300 280 895</span> </a> <button onclick="Calendly.initPopupWidget({url: 'https://calendly.com/dan-peters-edgeviewfinance/finance-discovery-call'});return false;" class="header-cta-btn inline-flex items-center justify-center border-2 px-3 py-2 md:px-6 md:py-3 font-semibold transition-all duration-300 hidden sm:inline-block text-sm md:text-base cursor-pointer" data-astro-cid-hnhh3bfe><span data-astro-cid-hnhh3bfe>${rightButton2?.text || "Book Discovery Call"}</span></button> <div class="block lg:hidden" data-astro-cid-hnhh3bfe> <button id="openBtn" class="hamburger-menu mobile-menu-trigger" aria-label="Open Menu" aria-expanded="false" aria-controls="mobile-menu" data-astro-cid-hnhh3bfe> <span data-astro-cid-hnhh3bfe></span> <span data-astro-cid-hnhh3bfe></span> <span data-astro-cid-hnhh3bfe></span> <span class="sr-only" data-astro-cid-hnhh3bfe>Open navigation menu</span> </button> </div> </div> </div> </div> <!-- Mobile Menu Overlay --> <div class="menu-overlay" data-astro-cid-hnhh3bfe></div> <!-- Mobile Menu --> <nav class="mobile-menu-block" id="mobile-menu" data-astro-cid-hnhh3bfe> <div class="mobile-menu-head" data-astro-cid-hnhh3bfe> <div class="go-back" data-astro-cid-hnhh3bfe> <i class="fa-solid fa-angle-left" data-astro-cid-hnhh3bfe></i> </div> <div class="current-menu-title" data-astro-cid-hnhh3bfe>Menu</div> <button class="mobile-menu-close" id="closeBtn" aria-label="Close Menu" aria-controls="mobile-menu" data-astro-cid-hnhh3bfe>
&times;
<span class="sr-only" data-astro-cid-hnhh3bfe>Close navigation menu</span> </button> </div> <div class="mobile-menu-content" id="mobile-menu-content" data-astro-cid-hnhh3bfe> ${renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-hnhh3bfe": true })} <!-- Mobile CTA Buttons --> <div class="mobile-cta-buttons" data-astro-cid-hnhh3bfe> <a${addAttribute(rightButton1?.link || "tel:1300280895", "href")} class="mobile-cta-phone" data-astro-cid-hnhh3bfe> <span class="text-xs" data-astro-cid-hnhh3bfe>Discuss a Scenario</span> <span data-astro-cid-hnhh3bfe>Call 1300 280 895</span> </a> <button onclick="Calendly.initPopupWidget({url: 'https://calendly.com/dan-peters-edgeviewfinance/finance-discovery-call'});return false;" class="mobile-cta-button" data-astro-cid-hnhh3bfe> ${rightButton2?.text || "Book Discovery Call"} </button> </div> </div> </nav> </header>  ${renderScript($$result, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/ui/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/ui/Header.astro", void 0);

const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const FooterData = await getEntry({ collection: "site", id: "footer" });
  const {
    logo,
    description,
    mail,
    PrimaryPages,
    UtilityPages,
    Resources
  } = FooterData.data;
  return renderTemplate`${maybeRenderHead()}<footer class="section-footer z-20"> <div class="relative z-10 bg-gradient-to-b from-[#1C2C3B] to-[#0f1922]"> <div class="pt-16 lg:pt-20"> <div class="text-white"> <div class="pb-16 lg:pb-20"> <div class="container-default max-w-7xl mx-auto px-6"> <div class="grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-20"> <!-- Company Info Column --> <div class="flex flex-col gap-y-7 lg:col-span-1"> <!-- White Logo --> <a href="/"> ${renderComponent($$result, "Image", $$Image, { "src": "/assets/images/edgeview-finance-logo-white.png", "alt": "Edgeview Finance", "width": 200, "height": 60, "class": "h-12 w-auto" })} </a> <div> <div class="lg:max-w-[300px] text-white/80 font-[&quot;Instrument_Sans&quot;]">
Strategic Finance Partnership for Trades Businesses
</div> <!-- Contact Information --> <div class="mt-6 space-y-3"> <div class="flex items-center gap-3"> <svg class="w-5 h-5 text-[#FF9E10]" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path> </svg> <a href="tel:1300280895" class="text-white hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">
1300 280 895
</a> </div> <div class="flex items-center gap-3"> <svg class="w-5 h-5 text-[#FF9E10]" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> <a href="mailto:enquiries@edgeviewfinance.com.au" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">
enquiries@edgeviewfinance.com.au
</a> </div> <div class="flex items-start gap-3"> <svg class="w-5 h-5 text-[#FF9E10] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <span class="text-white/80 font-[&quot;Instrument_Sans&quot;]">
Queensland, Australia
</span> </div> </div> <!-- Social Media Icons --> <div class="mt-6 flex gap-4"> <a href="https://au.linkedin.com/company/edgeview-finance" target="_blank" rel="noopener noreferrer" class="flex h-10 w-10 items-center justify-center bg-white/10 text-white transition-all duration-300 hover:bg-[#FF9E10] hover:text-white" aria-label="LinkedIn"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path> </svg> </a> <a href="https://www.facebook.com/EdgeviewFinance/" target="_blank" rel="noopener noreferrer" class="flex h-10 w-10 items-center justify-center bg-white/10 text-white transition-all duration-300 hover:bg-[#FF9E10] hover:text-white" aria-label="Facebook"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path> </svg> </a> </div> </div> </div> <!-- Services Column --> <div class="flex flex-col gap-y-7"> <div class="text-xl font-semibold text-white font-[&quot;Instrument_Sans&quot;]">
Our Services
</div> <ul class="flex flex-col gap-y-3"> <li><a href="/home-loans" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Home Loans</a></li> <li><a href="/equipment-finance" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Equipment Finance</a></li> <li><a href="/working-capital-finance" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Working Capital</a></li> <li><a href="/commercial-property-finance" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Property Finance</a></li> <li><a href="/vehicle-finance" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Vehicle Finance</a></li> <li><a href="/invoice-trade-finance" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Trade & Invoice Finance</a></li> </ul> </div> <!-- Company Column --> <div class="flex flex-col gap-y-7"> <div class="text-xl font-semibold text-white font-[&quot;Instrument_Sans&quot;]">
Company
</div> <ul class="flex flex-col gap-y-3"> <li><a href="/blog" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Blog</a></li> <li><a href="/services" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Services</a></li> <li><a href="/success-stories" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Success Stories</a></li> <li><a href="/about" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">About Us</a></li> <li><a href="/contact" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Contact Us</a></li> </ul> </div> <!-- Legal & Compliance Column --> <div class="flex flex-col gap-y-7"> <div class="text-xl font-semibold text-white font-[&quot;Instrument_Sans&quot;]">
Legal & Compliance
</div> <ul class="flex flex-col gap-y-3"> <li><a href="/credit-guide" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Credit Guide</a></li> <li><a href="/privacy-policy" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Privacy Policy</a></li> <li><a href="/data-security-policy" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Data Security Policy</a></li> <li><a href="/terms-of-use" class="text-white/80 hover:text-[#FF9E10] transition-colors duration-300 font-[&quot;Instrument_Sans&quot;]">Website Terms of Use</a></li> </ul> <!-- Credit License --> <div class="mt-4"> <div class="text-sm text-white/60 font-[&quot;Instrument_Sans&quot;] mb-1">
Australian Credit License
</div> <div class="text-sm text-white/60 font-[&quot;Instrument_Sans&quot;]">
459287
</div> </div> </div> </div> </div> </div> </div> <!-- Professional Disclaimers Section --> <div class="border-t border-white/20 py-8"> <div class="container-default max-w-7xl mx-auto px-6"> <div class="space-y-4"> <div class="text-sm text-white/60 font-[&quot;Instrument_Sans&quot;] leading-relaxed"> <strong class="text-white/80">Important Disclaimer:</strong> *Australian Credit Licence 459287. Credit criteria, terms and conditions apply. Approval timeframes vary based on application complexity and lender requirements. Edgeview Finance is an accredited mortgage and finance broker and does not provide credit directly. We are paid commissions by lenders for successful applications. All finance applications are subject to lender credit approval and satisfactory documentation. This information is general in nature and does not constitute financial advice. You should consider seeking independent financial advice before making any financial decisions.
</div> <div class="text-sm text-white/60 font-[&quot;Instrument_Sans&quot;] leading-relaxed"> <strong class="text-white/80">Privacy:</strong> Your personal information is collected in accordance with our Privacy Policy and Australian Privacy Principles. Information is used solely for assessing and arranging finance options. We do not sell, share, or distribute your information to third parties except for the specific purpose of arranging finance.
</div> </div> </div> </div> <!-- Copyright Section --> <div class="bg-black/30 py-6"> <div class="container-default max-w-7xl mx-auto px-6"> <div class="flex flex-col md:flex-row justify-between items-center gap-4"> <div class="text-center md:text-left text-white/60 text-sm font-[&quot;Instrument_Sans&quot;]">
&copy; Copyright ${(/* @__PURE__ */ new Date()).getFullYear()}, All Rights Reserved by Edgeview Finance
</div> </div> </div> </div> </div> </div> </footer>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/ui/Footer.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _b;
const $$Astro$1 = createAstro("https://www.edgeviewfinance.com.au");
const $$GoogleAnalytics = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$GoogleAnalytics;
  const { measurementId } = Astro2.props;
  const GA4_MEASUREMENT_ID = measurementId || "G-XF7B5Q0E8L";
  const isProduction = true;
  const isDevelopment = false;
  const shouldLoadGA = isProduction;
  const isValidMeasurementId = GA4_MEASUREMENT_ID.startsWith("G-");
  if (!isValidMeasurementId && shouldLoadGA) {
    console.warn("[GoogleAnalytics] Invalid or missing GA4 Measurement ID");
  }
  return renderTemplate`${isValidMeasurementId && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate(_b || (_b = __template$2(["<script async", "></script><script>(function(){", "\n      window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n      \n      // Configure GA4 with enhanced settings for better tracking\n      gtag('config', GA4_MEASUREMENT_ID, {\n        // Optimize for Core Web Vitals\n        page_title: document.title,\n        page_location: window.location.href,\n        \n        // Enhanced ecommerce and engagement tracking\n        send_page_view: true,\n        \n        // Privacy-friendly settings\n        anonymize_ip: true,\n        allow_google_signals: false,\n        allow_ad_personalization_signals: false,\n        \n        // Performance optimizations\n        transport_type: 'beacon',\n        \n        // Custom dimensions can be added here if needed\n        custom_map: {}\n      });\n\n      // Defer non-critical tracking to improve LCP\n      setTimeout(function() {\n        // Track Core Web Vitals if available\n        if ('web-vital' in window) {\n          gtag('config', GA4_MEASUREMENT_ID, {\n            custom_map: {\n              'custom_dimension_1': 'web_vitals_lcp',\n              'custom_dimension_2': 'web_vitals_fid',\n              'custom_dimension_3': 'web_vitals_cls'\n            }\n          });\n        }\n\n        // Enhanced error tracking\n        window.addEventListener('error', function(e) {\n          gtag('event', 'exception', {\n            'description': e.error?.message || 'Unknown error',\n            'fatal': false,\n            'page_title': document.title,\n            'page_location': window.location.href\n          });\n        });\n\n        // Track page engagement\n        let startTime = Date.now();\n        window.addEventListener('beforeunload', function() {\n          const timeOnPage = Math.round((Date.now() - startTime) / 1000);\n          gtag('event', 'page_view_duration', {\n            'value': timeOnPage,\n            'event_category': 'engagement'\n          });\n        });\n      }, 1000); // Defer for 1 second to prioritize LCP\n    })();</script>", ""])), addAttribute(`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`, "src"), defineScriptVars({ GA4_MEASUREMENT_ID }), isDevelopment) })}`}${isDevelopment}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/analytics/GoogleAnalytics.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$MicrosoftClarity = createComponent(($$result, $$props, $$slots) => {
  const clarityProjectId = "tbgyvsfiaq";
  return renderTemplate`${renderTemplate(_a$1 || (_a$1 = __template$1(['<script type="text/javascript">', "</script>"])), unescapeHTML(`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${clarityProjectId}");
  `))}${renderScript($$result, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/analytics/MicrosoftClarity.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/analytics/MicrosoftClarity.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const MetaData = await getEntry({ collection: "site", id: "meta" });
  const { siteName, description, favicon } = MetaData?.data;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-s6tr6vzr> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', "", " | ", "", '</title><meta name="description"', '><!-- Favicon Support for All Browsers --><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="icon" type="image/png" sizes="16x16" href="/favicon.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicon.png"><link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png"><link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="icon" type="image/webp"', '><link rel="manifest" href="/site.webmanifest"><!-- International Targeting for Australia --><link rel="alternate" hreflang="en-au"', '><link rel="alternate" hreflang="en"', '><link rel="alternate" hreflang="x-default"', '><!-- Open Graph Meta Tags --><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:site_name"', '><meta property="og:locale" content="en_AU"><meta property="og:image"', '><!-- Twitter Card Meta Tags --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Geographic Targeting --><meta name="geo.region" content="AU"><meta name="geo.country" content="Australia"><meta name="geo.placename" content="Australia"><!-- Canonical URL --><link rel="canonical"', "><!-- Preload critical hero image for LCP optimization -->", '<!-- Critical CSS inlined for LCP --><!-- Force mobile menu submenu styling --><link rel="stylesheet" href="/assets/css/mobile-menu-fix.css"><!-- Calendly widget styling --><link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"><!-- Google Analytics GA4 - Optimized Component -->', "<!-- Microsoft Clarity - Heatmaps and Session Recording -->", "", "</head> <body data-astro-cid-s6tr6vzr> <div", " data-astro-cid-s6tr6vzr> ", " ", " ", ' </div> <script src="/assets/js/menu.js"><\/script> <script src="/assets/js/countdown.js"><\/script> <script src="/assets/js/counterup.js"><\/script> <script src="/assets/js/main.js"><\/script> <!-- Calendly widget script --> <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async><\/script> <!-- Analytics Initialization --> <script type="module" src="/src/scripts/analytics-init.js"><\/script> <!-- Service Worker Registration --> ', ' <!-- JOS animations disabled for static display --> <!-- <script>\n  import JOS from "jos-animation";\n  JOS.init({\n    passive: false,\n    once: true,\n    animation: "fade-up",\n    timingFunction: "ease",\n    threshold: 0,\n    delay: 0.5,\n    duration: 0.7,\n    scrollDirection: "down",\n    rootMargin: "0% 0% 15% 0%",\n  });\n<\/script> --></body></html>'])), siteName, " ", " ", title, addAttribute(description ? description : "Agency11 Theme", "content"), addAttribute(favicon || "/favicon.webp", "href"), addAttribute(Astro2.url.href, "href"), addAttribute(Astro2.url.href, "href"), addAttribute(Astro2.url.href, "href"), addAttribute(`${siteName} | ${title}`, "content"), addAttribute(description || "Professional business advisory services in Australia", "content"), addAttribute(Astro2.url.href, "content"), addAttribute(siteName, "content"), addAttribute(`${Astro2.site}assets/img/edgeview-finance-og-image.jpg`, "content"), addAttribute(`${siteName} | ${title}`, "content"), addAttribute(description || "Professional business advisory services in Australia", "content"), addAttribute(`${Astro2.site}assets/img/edgeview-finance-og-image.jpg`, "content"), addAttribute(Astro2.url.href, "href"), Astro2.url.pathname === "/" && renderTemplate`<link rel="preload" as="image" href="/assets/images/hero-tradie-optimized.webp" fetchpriority="high">`, renderComponent($$result, "GoogleAnalytics", $$GoogleAnalytics, { "data-astro-cid-s6tr6vzr": true }), renderComponent($$result, "MicrosoftClarity", $$MicrosoftClarity, { "data-astro-cid-s6tr6vzr": true }), renderHead(), addAttribute(`page-wrapper relative z-[1] ${Astro2.url.pathname === "/" ? "bg-[#FDFBF9]" : "bg-white"}`, "class"), renderComponent($$result, "Header", $$Header, { "data-astro-cid-s6tr6vzr": true }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-s6tr6vzr": true }), renderScript($$result, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/layout/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/layout/Layout.astro", void 0);

export { $$Layout as $, getEntry as a, $$Logo as b, $$Header as c, getCollection as g };
