!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="087c6bc7-c873-402c-99a6-67e5a413f010",e._sentryDebugIdIdentifier="sentry-dbid-087c6bc7-c873-402c-99a6-67e5a413f010");})();}catch(e){}};import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate } from './astro/server_DVFDqqUz.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
const $$Heading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Heading;
  const { heading, MaxWidth } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`jos mb-8 xl:mb-12`, "class")}> <div${addAttribute(`mx-auto ${MaxWidth}`, "class")}> <h2 class="text-center"> ${heading} </h2> </div> </div>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/ui/Heading.astro", void 0);

export { $$Heading as $ };
