import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate } from './astro/server_BL0ualZl.mjs';
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
