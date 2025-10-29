!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="58174eca-f2b9-46d6-b9a7-800da080f4b5",e._sentryDebugIdIdentifier="sentry-dbid-58174eca-f2b9-46d6-b9a7-800da080f4b5");})();}catch(e){}};import { h as createVNode, aq as Fragment, ax as __astro_tag_component__ } from './astro/server_DVFDqqUz.mjs';
import 'clsx';

const frontmatter = {
  "title": "What You Get When Working With Edgeview Finance",
  "valueStack": [{
    "item": "20+ Years Banking & Finance Insider Knowledge",
    "value": "Priceless"
  }, {
    "item": "MBA Financial Strategy Expertise",
    "value": "$15,000"
  }, {
    "item": "40+ Specialist Lender Network Access",
    "value": "$8,000"
  }, {
    "item": "Expert Application Preparation",
    "value": "$5,000"
  }, {
    "item": "Professional Lender Negotiation Service",
    "value": "$3,500"
  }, {
    "item": "Personalised Business Finance Profile",
    "value": "$8,000"
  }, {
    "item": "Ongoing Strategic Partnership",
    "value": "$10,000+"
  }],
  "totalValue": "$28,500+",
  "investment": "$0*",
  "investmentSubtext": "We get paid by the lender when you get funded",
  "disclaimer": "*In many cases we get paid by the lender. For complex applications requiring financial modelling, we may charge a work fee upfront, quoted in your pricing proposal.",
  "proofPoints": ["$500M+ Arranged", "100's of Scenarios", "High Success Rate"]
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

const url = "src/content/IndexPage/value-stack.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/value-stack.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/value-stack.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
