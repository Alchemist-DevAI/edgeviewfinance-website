!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8c0b52d3-354b-448c-955b-d62d4fe8eb0a",e._sentryDebugIdIdentifier="sentry-dbid-8c0b52d3-354b-448c-955b-d62d4fe8eb0a");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "title": "YOUR NEXT STEP IS SIMPLE",
  "description": "Stop letting finance hold your business back. Join 100's of businesses who've found a better way.",
  "buttonPrimary": {
    "text": "Book Strategic Finance Discovery Call",
    "link": "javascript:Calendly.initPopupWidget({url: 'https://calendly.com/dan-peters-edgeviewfinance/finance-discovery-call'});return false;"
  },
  "buttonSecondary": {
    "text": "Click Here To Get In Contact Now",
    "link": "/contact"
  },
  "form": {
    "placeholder": "Enter your email for strategic assessment",
    "buttonText": "GET MY STRATEGIC ASSESSMENT"
  },
  "callBenefits": ["Your real funding capacity (often more than expected)", "Which lenders suit your business model", "How to structure finance for tax efficiency", "Timeline to get funded"],
  "callDetails": {
    "duration": "20-MINUTE STRATEGIC DISCOVERY CALL WITH DAN",
    "commitment": "No obligation. No pressure. Just expert advice."
  },
  "security": "Your information is secure | Credit License 459287"
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

const url = "src/content/IndexPage/cta.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/cta.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/cta.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
