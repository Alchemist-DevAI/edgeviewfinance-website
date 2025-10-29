!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f93f59ac-ca58-4403-9b9e-48a9367e3e8e",e._sentryDebugIdIdentifier="sentry-dbid-f93f59ac-ca58-4403-9b9e-48a9367e3e8e");})();}catch(e){}};import { j as AstroError, aw as MissingSharp } from './astro/server_DVFDqqUz.mjs';
import { b as baseService, p as parseQuality } from './_astro_assets_BLqOht8q.mjs';

let sharp;
const qualityTable = {
  low: 25,
  mid: 50,
  high: 80,
  max: 100
};
async function loadSharp() {
  let sharpImport;
  try {
    sharpImport = (await import('sharp')).default;
  } catch {
    throw new AstroError(MissingSharp);
  }
  sharpImport.cache(false);
  return sharpImport;
}
const fitMap = {
  fill: "fill",
  contain: "inside",
  cover: "cover",
  none: "outside",
  "scale-down": "inside",
  outside: "outside",
  inside: "inside"
};
const sharpService = {
  validateOptions: baseService.validateOptions,
  getURL: baseService.getURL,
  parseURL: baseService.parseURL,
  getHTMLAttributes: baseService.getHTMLAttributes,
  getSrcSet: baseService.getSrcSet,
  async transform(inputBuffer, transformOptions, config) {
    if (!sharp) sharp = await loadSharp();
    const transform = transformOptions;
    if (transform.format === "svg") return { data: inputBuffer, format: "svg" };
    const result = sharp(inputBuffer, {
      failOnError: false,
      pages: -1,
      limitInputPixels: config.service.config.limitInputPixels
    });
    result.rotate();
    const withoutEnlargement = Boolean(transform.fit);
    if (transform.width && transform.height && transform.fit) {
      const fit = fitMap[transform.fit] ?? "inside";
      result.resize({
        width: Math.round(transform.width),
        height: Math.round(transform.height),
        fit,
        position: transform.position,
        withoutEnlargement
      });
    } else if (transform.height && !transform.width) {
      result.resize({
        height: Math.round(transform.height),
        withoutEnlargement
      });
    } else if (transform.width) {
      result.resize({
        width: Math.round(transform.width),
        withoutEnlargement
      });
    }
    if (transform.format) {
      let quality = void 0;
      if (transform.quality) {
        const parsedQuality = parseQuality(transform.quality);
        if (typeof parsedQuality === "number") {
          quality = parsedQuality;
        } else {
          quality = transform.quality in qualityTable ? qualityTable[transform.quality] : void 0;
        }
      }
      const isGifInput = inputBuffer[0] === 71 && // 'G'
      inputBuffer[1] === 73 && // 'I'
      inputBuffer[2] === 70 && // 'F'
      inputBuffer[3] === 56 && // '8'
      (inputBuffer[4] === 57 || inputBuffer[4] === 55) && // '9' or '7'
      inputBuffer[5] === 97;
      if (transform.format === "webp" && isGifInput) {
        result.webp({ quality: typeof quality === "number" ? quality : void 0, loop: 0 });
      } else {
        result.toFormat(transform.format, { quality });
      }
    }
    const { data, info } = await result.toBuffer({ resolveWithObject: true });
    return {
      data,
      format: info.format
    };
  }
};
var sharp_default = sharpService;

export { sharp_default as default };
