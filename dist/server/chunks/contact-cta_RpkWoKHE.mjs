!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e2caccc9-6fae-4a09-b00b-16d1a31ebd17",e._sentryDebugIdIdentifier="sentry-dbid-e2caccc9-6fae-4a09-b00b-16d1a31ebd17");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "header": "Ready to Get Started?",
  "subheading": "Get Your Finance Application Started Today",
  "description": "Contact Dan Peters and the Edgeview Finance team today for a confidential discussion about your business finance needs. We're here to help you secure the funding you need to grow and succeed.",
  "benefits": ["Free initial consultation and assessment", "Same-day response guarantee on all enquiries", "No obligation - honest advice on your options", "Direct access to decision-makers", "Competitive rates from 40+ lender network"],
  "contactInfo": {
    "phone": {
      "label": "CONTACT PHONE:",
      "value": "(07) 3186 6999"
    },
    "email": {
      "label": "EMAIL:",
      "value": "dan.peters@edgeviewfinance.com.au"
    },
    "hours": {
      "label": "OFFICE HOURS:",
      "value": "Monday - Friday: 8:30am - 5:30pm\nSaturday: By appointment"
    }
  },
  "responsePromise": {
    "title": "Our Promise to You:",
    "description": "We guarantee a response to all enquiries within 4 business hours during office hours, or first thing the next business day for after-hours enquiries. Your time is valuable, and we respect that."
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
    children: "Contact Dan Peters and the Edgeview Finance team today for a confidential discussion about your business finance needs. We’re here to help you secure the funding you need to grow and succeed."
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
const url = "src/content/aboutPage/contact-cta.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/contact-cta.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/contact-cta.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
