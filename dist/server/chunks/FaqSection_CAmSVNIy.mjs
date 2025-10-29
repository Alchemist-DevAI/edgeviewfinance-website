!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="536a2545-0f7a-417e-b5ee-411f4b05906e",e._sentryDebugIdIdentifier="sentry-dbid-536a2545-0f7a-417e-b5ee-411f4b05906e");})();}catch(e){}};import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate, r as renderComponent } from './astro/server_DVFDqqUz.mjs';
import 'kleur/colors';
import './index_Cuyuqa_n.mjs';
import { $ as $$Image } from './_astro_assets_BLqOht8q.mjs';
import { $ as $$Button } from './Button_Bpm8idvM.mjs';
import 'clsx';
import { $ as $$Heading } from './Heading_BpqiG_GW.mjs';
import { a as getEntry } from './Layout_BgM0s9zF.mjs';

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
const $$FaqCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FaqCard;
  const { Q, A, index } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li${addAttribute(`accordion-item ${index === 0 ? "active" : ""} overflow-hidden border-b border-ColorBlack p-[30px] last:border-b-0`, "class")}> <div class="accordion-header flex justify-between items-center gap-6 text-xl font-semibold text-ColorBlack"> <button class="flex-1 text-left">${Q}</button> <div class="accordion-icon-1 relative flex h-5 w-5 items-center justify-center rounded-[50%] bg-ColorLime"> <span class="inline-block h-0.5 w-[10px] rounded-sm bg-white"></span> <span class="absolute inline-block h-[10px] w-0.5 rotate-0 rounded-sm bg-white"></span> </div> </div> <div class="accordion-body max-w-[826px] opacity-80"> <p class="pt-5">${A}</p> </div> </li>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/ui/FaqCard.astro", void 0);

const $$FaqSection = createComponent(async ($$result, $$props, $$slots) => {
  const QNA = await getEntry({ collection: "IndexPage", id: "qna" });
  const { content, header, button } = QNA.data;
  return renderTemplate`${maybeRenderHead()}<section class="section-faq"> <div class="relative z-10 overflow-hidden"> <div class="py-12 lg:py-16"> <div class="container-default"> ${renderComponent($$result, "Header", $$Heading, { "heading": header, "MaxWidth": "max-w-[625px]" })} <div class="jos"> <ul class="mx-auto max-w-[1076px] rounded-[10px] border border-ColorBlack"> ${content.map(({ Q, A }, index) => renderTemplate`${renderComponent($$result, "FaqCard", $$FaqCard, { "Q": Q, "A": A, "index": index })}`)} </ul> <div class="jos mt-8 flex justify-center xl:mt-10"> ${renderComponent($$result, "Button", $$Button, { "link": button?.link, "text": button?.text })} </div> </div> </div> </div> <div class="absolute left-0 top-0 -z-10"> ${renderComponent($$result, "Image", $$Image, { "src": "/assets/img/elements/faq-1-shape-1.svg", "alt": "service-section-shape", "width": "390", "height": "507" })} </div> <div class="absolute bottom-0 right-0 -z-10"> ${renderComponent($$result, "Image", $$Image, { "src": "/assets/img/elements/faq-1-shape-2.svg", "alt": "service-section-shape", "width": "467", "height": "609" })} </div> </div> </section>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/Index/FaqSection.astro", void 0);

export { $$FaqSection as $ };
