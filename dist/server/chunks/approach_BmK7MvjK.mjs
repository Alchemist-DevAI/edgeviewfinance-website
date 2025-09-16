!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a3879e20-384e-4a1d-b6bc-f06910c796c0",e._sentryDebugIdIdentifier="sentry-dbid-a3879e20-384e-4a1d-b6bc-f06910c796c0");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "header": "Our Approach",
  "subheading": "How We're Different From Other Brokers",
  "processSteps": [{
    "step": "1",
    "title": "WE LISTEN & UNDERSTAND",
    "description": "Every trades business is unique - we take time to understand your specific needs, challenges, and goals before recommending any finance solution."
  }, {
    "step": "2",
    "title": "WE MATCH THE RIGHT SOLUTION",
    "description": "Using our network of 40+ specialist lenders, we find the finance option that best fits your business situation, not just what's easiest to arrange."
  }, {
    "step": "3",
    "title": "WE SUPPORT YOU THROUGH THE PROCESS",
    "description": "From initial application to final settlement, we're with you every step of the way, providing updates, handling queries, and ensuring smooth progress."
  }],
  "differentiators": {
    "title": "What sets us apart:",
    "items": ["Trades business specialisation - we speak your language", "Direct access to decision-makers - no call centres", "Local Queensland knowledge and presence", "Success-based fees - we only get paid when you get funded", "Same-day initial assessments available", "Transparent communication throughout the process"]
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
    children: "How We’re Different From Other Brokers"
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
const url = "src/content/aboutPage/approach.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/approach.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/approach.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
