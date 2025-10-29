!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e1b70e72-326e-4904-96d4-a7c9ccf56b84",e._sentryDebugIdIdentifier="sentry-dbid-e1b70e72-326e-4904-96d4-a7c9ccf56b84");})();}catch(e){}};import { h as createVNode, aq as Fragment, ax as __astro_tag_component__ } from './astro/server_DVFDqqUz.mjs';
import 'clsx';

const frontmatter = {
  "header": "BANKS DON'T UNDERSTAND YOUR TRADE BUSINESS?\nWE DO.",
  "subheading": "Know if your business is ready for the next big opportunity. Take our quick test now.",
  "bodyText": "Take our 30-second Strategic Finance Readiness Assessment and discover how prepared your business is for the next opportunity – no personal details required",
  "trustIndicator": "20+ Years Banking & Finance Experience Serving Queensland Trades Businesses",
  "buttonPrimary": {
    "text": "Take Finance Ready Assessment",
    "link": "/finance-ready-assessment"
  },
  "heroImage": "/assets/images/hero-tradie-optimized.webp"
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  return createVNode(Fragment, {});
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent();
}

const url = "src/content/IndexPage/hero.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/hero.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/hero.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
