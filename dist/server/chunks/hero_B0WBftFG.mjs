!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="29205741-ebca-4459-a614-9edd498d9578",e._sentryDebugIdIdentifier="sentry-dbid-29205741-ebca-4459-a614-9edd498d9578");})();}catch(e){}};import { h as createVNode, aq as Fragment, ax as __astro_tag_component__ } from './astro/server_DVFDqqUz.mjs';
import 'clsx';

const frontmatter = {
  "header": "Meet Dan Peters & The Team",
  "subheading": "Queensland's Most Experienced Finance Broking Specialists",
  "bodyText": "Drawing from over 20 years of working with hundreds of businesses across every industry imaginable, Dan Peters and the Edgeview Finance team bring unique insights and strategic expertise specifically to Queensland trades businesses for both residential and commercial finance solutions.",
  "trustIndicator": "20+ Years Cross-Industry Experience Now Focused on Trades",
  "buttonPrimary": {
    "text": "Get Your Free Assessment",
    "link": "/contact"
  },
  "heroImage": "/assets/img/team/dan-peters-headshot.jpg",
  "trustIndicators": ["✓ 20+ Years Cross-Industry Experience Now Focused on Trades", "✓ 100+ Queensland Trades Businesses Successfully Funded", "✓ Licensed Professional (ACL 459287) - Fully Regulated", "✓ Both Residential & Commercial Finance Solutions"]
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
    children: "Drawing from over 20 years of working with hundreds of businesses across every industry imaginable, Dan Peters and the Edgeview Finance team bring unique insights and strategic expertise specifically to Queensland trades businesses for both residential and commercial finance solutions."
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
const url = "src/content/aboutPage/hero.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/hero.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/hero.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
