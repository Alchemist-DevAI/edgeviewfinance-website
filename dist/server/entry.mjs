!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="74908874-c5a7-416d-9ff2-918e2287ff42",e._sentryDebugIdIdentifier="sentry-dbid-74908874-c5a7-416d-9ff2-918e2287ff42");})();}catch(e){}};import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_o9wgfT5W.mjs';
import { manifest } from './manifest_B0orNY_B.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/assessment-submit.astro.mjs');
const _page4 = () => import('./pages/api/assessment-submit.json.astro.mjs');
const _page5 = () => import('./pages/api/auth/callback.astro.mjs');
const _page6 = () => import('./pages/api/newsletter-subscribe.astro.mjs');
const _page7 = () => import('./pages/api/send-uptime-alert.astro.mjs');
const _page8 = () => import('./pages/api/submit-contact.astro.mjs');
const _page9 = () => import('./pages/api/test.astro.mjs');
const _page10 = () => import('./pages/blog/_slug_.astro.mjs');
const _page11 = () => import('./pages/blog.astro.mjs');
const _page12 = () => import('./pages/business-acquisition-finance.astro.mjs');
const _page13 = () => import('./pages/career/_single_.astro.mjs');
const _page14 = () => import('./pages/career.astro.mjs');
const _page15 = () => import('./pages/coming-soon.astro.mjs');
const _page16 = () => import('./pages/commercial-property-finance.astro.mjs');
const _page17 = () => import('./pages/contact.astro.mjs');
const _page18 = () => import('./pages/credit-guide.astro.mjs');
const _page19 = () => import('./pages/data-security-policy.astro.mjs');
const _page20 = () => import('./pages/equipment-finance.astro.mjs');
const _page21 = () => import('./pages/faq.astro.mjs');
const _page22 = () => import('./pages/finance-ready-assessment/questions.astro.mjs');
const _page23 = () => import('./pages/finance-ready-assessment/start.astro.mjs');
const _page24 = () => import('./pages/finance-ready-assessment/thank-you.astro.mjs');
const _page25 = () => import('./pages/finance-ready-assessment.astro.mjs');
const _page26 = () => import('./pages/home-loans.astro.mjs');
const _page27 = () => import('./pages/invoice-trade-finance.astro.mjs');
const _page28 = () => import('./pages/portfolio/_single_.astro.mjs');
const _page29 = () => import('./pages/portfolio.astro.mjs');
const _page30 = () => import('./pages/pricing.astro.mjs');
const _page31 = () => import('./pages/privacy-policy.astro.mjs');
const _page32 = () => import('./pages/service/_single_.astro.mjs');
const _page33 = () => import('./pages/services.astro.mjs');
const _page34 = () => import('./pages/success-stories/equipment-finance-excavator.astro.mjs');
const _page35 = () => import('./pages/success-stories.astro.mjs');
const _page36 = () => import('./pages/team.astro.mjs');
const _page37 = () => import('./pages/terms-condition.astro.mjs');
const _page38 = () => import('./pages/terms-of-use.astro.mjs');
const _page39 = () => import('./pages/test.astro.mjs');
const _page40 = () => import('./pages/vehicle-finance.astro.mjs');
const _page41 = () => import('./pages/working-capital-finance.astro.mjs');
const _page42 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/assessment-submit.ts", _page3],
    ["src/pages/api/assessment-submit.json.ts", _page4],
    ["src/pages/api/auth/callback.ts", _page5],
    ["src/pages/api/newsletter-subscribe.js", _page6],
    ["src/pages/api/send-uptime-alert.ts", _page7],
    ["src/pages/api/submit-contact.js", _page8],
    ["src/pages/api/test.ts", _page9],
    ["src/pages/blog/[slug].astro", _page10],
    ["src/pages/blog.astro", _page11],
    ["src/pages/business-acquisition-finance.astro", _page12],
    ["src/pages/career/[single].astro", _page13],
    ["src/pages/career/index.astro", _page14],
    ["src/pages/coming-soon.astro", _page15],
    ["src/pages/commercial-property-finance.astro", _page16],
    ["src/pages/contact.astro", _page17],
    ["src/pages/credit-guide.astro", _page18],
    ["src/pages/data-security-policy.astro", _page19],
    ["src/pages/equipment-finance.astro", _page20],
    ["src/pages/faq.astro", _page21],
    ["src/pages/finance-ready-assessment/questions.astro", _page22],
    ["src/pages/finance-ready-assessment/start.astro", _page23],
    ["src/pages/finance-ready-assessment/thank-you.astro", _page24],
    ["src/pages/finance-ready-assessment.astro", _page25],
    ["src/pages/home-loans.astro", _page26],
    ["src/pages/invoice-trade-finance.astro", _page27],
    ["src/pages/portfolio/[single].astro", _page28],
    ["src/pages/portfolio/index.astro", _page29],
    ["src/pages/pricing.astro", _page30],
    ["src/pages/privacy-policy.astro", _page31],
    ["src/pages/service/[single].astro", _page32],
    ["src/pages/services.astro", _page33],
    ["src/pages/success-stories/equipment-finance-excavator.astro", _page34],
    ["src/pages/success-stories.astro", _page35],
    ["src/pages/team.astro", _page36],
    ["src/pages/terms-condition.astro", _page37],
    ["src/pages/terms-of-use.astro", _page38],
    ["src/pages/test.astro", _page39],
    ["src/pages/vehicle-finance.astro", _page40],
    ["src/pages/working-capital-finance.astro", _page41],
    ["src/pages/index.astro", _page42]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "014a9983-d24f-49b9-8017-d20112e82435",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
