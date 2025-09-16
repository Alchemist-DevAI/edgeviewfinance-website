!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6f4e534c-3e59-4d65-bf97-6ac6c9d01c9e",e._sentryDebugIdIdentifier="sentry-dbid-6f4e534c-3e59-4d65-bf97-6ac6c9d01c9e");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "header": "Results & Testimonials",
  "subheading": "What Our Clients Say About Working With Us",
  "testimonials": [{
    "name": "Adam Burns",
    "position": "Commercial Property Investment",
    "rating": 5,
    "text": "Dan's broad experience in commercial finance, combined with his genuine approach to understanding our business needs, made the difference in securing our commercial property finance. Professional service with results that speak for themselves."
  }, {
    "name": "David Morris",
    "position": "Business Owner",
    "rating": 5,
    "text": "Dan and his team have provided professional assistance and real value to the process of mortgage application on each of the occasions we have used their services. Without doubt, Edgeview Finance is my go-to team."
  }, {
    "name": "Tobin Wogandt",
    "position": "Trades Business Owner",
    "rating": 5,
    "text": "Very helpful. Great communication. Went over and above on a complicated loan. The level of service and attention to detail exceeded our expectations. Highly recommended."
  }],
  "results": {
    "title": "Our track record speaks for itself:",
    "items": ["✓ 100+ Queensland trades businesses successfully funded", "✓ Over $500 million in finance arranged (cumulative)", "✓ 95%+ client satisfaction rate", "✓ Average approval time: 5-14 business days", "✓ Multiple lender options for every application"]
  }
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    p: "p",
    ...props.components
  };
  return createVNode(_components.p, {
    children: "What Our Clients Say About Working With Us"
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
const url = "src/content/aboutPage/about-testimonials.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/about-testimonials.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/about-testimonials.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
