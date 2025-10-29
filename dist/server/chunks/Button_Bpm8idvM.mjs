!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a6096f8e-36b7-40ce-b2e8-d523c07835dd",e._sentryDebugIdIdentifier="sentry-dbid-a6096f8e-36b7-40ce-b2e8-d523c07835dd");})();}catch(e){}};import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate } from './astro/server_DVFDqqUz.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                       */

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const { link, text, css } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(link, "href")}${addAttribute(`btn-primary inline-flex items-center justify-center bg-[#FF9E10] hover:bg-[#E6890E] text-white px-8 py-4 text-lg font-semibold transition-all duration-300 font-["Instrument_Sans"] ${css}`, "class")} data-astro-cid-6ygtcg62><span data-astro-cid-6ygtcg62>${text}</span></a> `;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/ui/Button.astro", void 0);

export { $$Button as $ };
