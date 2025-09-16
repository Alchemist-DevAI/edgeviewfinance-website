!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="76676298-a245-4279-8c67-dba765bddc23",e._sentryDebugIdIdentifier="sentry-dbid-76676298-a245-4279-8c67-dba765bddc23");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "header": "THE REAL COST OF WRONG FINANCE DECISIONS",
  "description": "Every week you wait with the wrong funding costs you",
  "button": {
    "text": "STOP THE BLEEDING - GET EXPERT HELP NOW",
    "link": "#contact"
  },
  "costs": [{
    "type": "LOST REVENUE",
    "impact": "That large excavator job you couldn't take?",
    "amount": "$15,000/week gone"
  }, {
    "type": "WASTED TIME",
    "impact": "6 weeks with banks who don't understand?",
    "amount": "240 hours lost"
  }, {
    "type": "POOR LOAN STRUCTURING",
    "impact": "Avoiding Security & Loans Terms that hamper rather than help?",
    "amount": "Priceless"
  }, {
    "type": "STRESS & UNCERTAINTY",
    "impact": "Not knowing if you'll get approved?",
    "amount": "Health impact real"
  }, {
    "type": "COMPETITIVE DISADVANTAGE",
    "impact": "Competitors with right equipment winning YOUR contracts",
    "amount": "Lost opportunities"
  }],
  "totalCost": "$50,000+ per quarter"
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

const url = "src/content/IndexPage/content-3.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/content-3.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/content-3.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
