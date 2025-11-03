import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate } from './astro/server_BL0ualZl.mjs';
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
