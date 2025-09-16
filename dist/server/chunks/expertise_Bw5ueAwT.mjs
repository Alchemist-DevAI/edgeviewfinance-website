!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b3bac79c-8598-43b5-bcec-39536c6f5101",e._sentryDebugIdIdentifier="sentry-dbid-b3bac79c-8598-43b5-bcec-39536c6f5101");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "header": "Experience & Expertise",
  "subheading": "Cross-Industry Experience Now Focused on Trades Business Success",
  "description": "Drawing from 20+ years of experience across hundreds of businesses in every industry imaginable, we bring unique insights to trades businesses that generic brokers simply can't match. This cross-industry expertise allows us to see opportunities, anticipate challenges, and structure solutions that others miss.",
  "stats": [{
    "number": "20+",
    "label": "YEARS\nCROSS-INDUSTRY\nEXPERIENCE",
    "description": "Deep insights from hundreds of businesses across every sector"
  }, {
    "number": "100+",
    "label": "TRADES BUSINESSES\nSUCCESSFULLY FUNDED",
    "description": "Proven results for Queensland trades businesses"
  }, {
    "number": "BOTH",
    "label": "RESIDENTIAL\n& COMMERCIAL\nFINANCE SOLUTIONS",
    "description": "Complete finance coverage for business and investment needs"
  }, {
    "number": "ACL",
    "label": "459287\nLICENSED\nPROFESSIONAL",
    "description": "Fully regulated and compliant Australian Credit License"
  }],
  "financeTypes": {
    "residential": {
      "title": "RESIDENTIAL FINANCE:",
      "items": [{
        "title": "Investment Property Loans",
        "description": "Build wealth through strategic property investment"
      }, {
        "title": "Home Loans & Refinancing",
        "description": "Competitive rates and terms for trades business owners"
      }, {
        "title": "SMSF Property Loans",
        "description": "Self-managed super fund property investment"
      }]
    },
    "commercial": {
      "title": "COMMERCIAL FINANCE:",
      "items": [{
        "title": "Equipment Finance",
        "description": "New and used equipment, vehicles, machinery"
      }, {
        "title": "Working Capital",
        "description": "Cash flow support, business growth funding"
      }, {
        "title": "Commercial Property",
        "description": "Purchase, refinance, development finance"
      }, {
        "title": "Business Acquisition",
        "description": "Purchase existing businesses, expansion funding"
      }, {
        "title": "Invoice Finance",
        "description": "Debtor finance, factoring, cash flow acceleration"
      }]
    }
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
    children: "Drawing from 20+ years of experience across hundreds of businesses in every industry imaginable, we bring unique insights to trades businesses that generic brokers simply can’t match. This cross-industry expertise allows us to see opportunities, anticipate challenges, and structure solutions that others miss."
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
const url = "src/content/aboutPage/expertise.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/expertise.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/expertise.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
