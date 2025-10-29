!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3da248d5-be2b-45f9-94c8-523fa7368c4e",e._sentryDebugIdIdentifier="sentry-dbid-3da248d5-be2b-45f9-94c8-523fa7368c4e");})();}catch(e){}};import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderComponent, a as renderTemplate } from './astro/server_DVFDqqUz.mjs';
import 'kleur/colors';
import './index_Cuyuqa_n.mjs';
import { $ as $$Image } from './_astro_assets_BLqOht8q.mjs';
/* empty css                        */

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const { post, variant = "default" } = Astro2.props;
  const {
    title,
    shortDescription,
    category,
    date,
    readTime,
    image,
    featured = false,
    author
  } = post.data;
  const articleSlug = post.slug;
  const isFeatured = variant === "featured" || featured;
  const publishDate = new Date(date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const maxLength = isFeatured ? 300 : 110;
  const truncatedDescription = shortDescription.length > maxLength ? shortDescription.substring(0, maxLength - 3) + "..." : shortDescription;
  const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`evf-blog-card group transition-all duration-300 ${isFeatured ? "evf-blog-card--featured" : "evf-blog-card--default"}`, "class")}${addAttribute(categorySlug, "data-category")}> <a${addAttribute(`/blog/${articleSlug}`, "href")} class="evf-blog-card__link"> <div${addAttribute(`evf-blog-card__image-container ${isFeatured ? "evf-blog-card__image-container--featured" : ""}`, "class")}> ${renderComponent($$result, "Image", $$Image, { "src": image, "alt": title, "width": isFeatured ? 800 : 600, "height": isFeatured ? 350 : 250, "class": "evf-blog-card__image", "loading": isFeatured ? "eager" : "lazy", "format": "webp" })} </div> </a> <div class="evf-blog-card__content"> <!-- Category Badge --> <div class="evf-blog-card__category"> <span class="evf-blog-card__category-badge evf-blog-card__category-badge--primary"> ${category} </span> ${isFeatured && renderTemplate`<span class="evf-blog-card__category-badge evf-blog-card__category-badge--featured">
Featured
</span>`} </div> <!-- Article Title --> <h3${addAttribute(`evf-blog-card__title ${isFeatured ? "evf-blog-card__title--featured" : ""}`, "class")}> <a${addAttribute(`/blog/${articleSlug}`, "href")} class="evf-blog-card__title-link"> ${title} </a> </h3> <!-- Excerpt --> <p${addAttribute(`evf-blog-card__excerpt ${isFeatured ? "evf-blog-card__excerpt--featured" : ""}`, "class")}> ${truncatedDescription} </p> <!-- Meta Information --> <div class="evf-blog-card__meta"> <div class="evf-blog-card__meta-left"> ${author && renderTemplate`<div class="evf-blog-card__author"> ${renderComponent($$result, "Image", $$Image, { "src": author.img, "alt": author.name, "width": 24, "height": 24, "class": "evf-blog-card__author-image" })} <span class="evf-blog-card__author-name">${author.name}</span> </div>`} <div class="evf-blog-card__date"> <svg class="evf-blog-card__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> <span>${publishDate}</span> </div> </div> ${readTime && renderTemplate`<div class="evf-blog-card__read-time"> <svg class="evf-blog-card__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span>${readTime}</span> </div>`} </div> </div> </article>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/Blog/BlogCard.astro", void 0);

export { $$BlogCard as $ };
