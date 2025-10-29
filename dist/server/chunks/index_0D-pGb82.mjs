!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c6db19ba-083c-4fd1-88b6-dcab19246397",e._sentryDebugIdIdentifier="sentry-dbid-c6db19ba-083c-4fd1-88b6-dcab19246397");})();}catch(e){}};import { h as createVNode, aq as Fragment, ax as __astro_tag_component__ } from './astro/server_DVFDqqUz.mjs';
import 'clsx';

const frontmatter = {
  "cards": [{
    "title": "Schedule a Consultation",
    "description": "Book your free strategy session to discuss your business funding needs. Available Monday-Friday 9am-5pm AEST.",
    "icon": "/assets/img/icons/icon-duotone-chat.svg"
  }, {
    "title": "Call Dan Direct",
    "description": "Speak with Dan Peters or our senior team immediately at 1300 280 895 for urgent funding requirements.",
    "icon": "/assets/img/icons/icon-duotone-phone.svg"
  }, {
    "title": "Email Your Enquiry",
    "description": "Send details to finance@edgeviewfinance.com.au and receive a tailored response within 24 hours.",
    "icon": "/assets/img/icons/icon-duotone-message.svg"
  }],
  "mail": "finance@edgeviewfinance.com.au",
  "phone": "1300 280 895",
  "address": "Brisbane, Queensland, Australia",
  "header": "Ready to Transform Your Business Finance?",
  "description": "Tell us about your funding requirements and we'll craft a strategic solution. Our team specialises in complex finance scenarios where traditional banks say no.",
  "client": {
    "name": "Michael Chen",
    "post": "Managing Director @ Brisbane Manufacturing",
    "testimonial": "Dan Peters secured $2.5M in equipment finance when every bank rejected us. His strategic approach and lender network saved us 3.2% on rates and got approval in just 7 days. Absolute game-changer for our expansion.",
    "image": "/assets/img/th-1/about-hero-user-blockquote-img-2.jpg"
  }
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

const url = "src/content/contact/index.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/contact/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/contact/index.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
