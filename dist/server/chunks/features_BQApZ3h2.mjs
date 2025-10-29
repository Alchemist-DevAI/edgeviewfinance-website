!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="170d739b-9a51-4e78-a7ae-58603184d880",e._sentryDebugIdIdentifier="sentry-dbid-170d739b-9a51-4e78-a7ae-58603184d880");})();}catch(e){}};import { h as createVNode, aq as Fragment, ax as __astro_tag_component__ } from './astro/server_DVFDqqUz.mjs';
import 'clsx';

const frontmatter = {
  "header": "Our core values that drive everything we do",
  "features": [{
    "image": "/assets/img/icons/icon-yellow-feature-1.svg",
    "title": "Passionate about work",
    "description": "Passion for work is a enthusiasm and excitement for what you do."
  }, {
    "image": "/assets/img/icons/icon-yellow-feature-2.svg",
    "title": "Creative team members",
    "description": "A creative team is to design and execute campaigns & encourage"
  }, {
    "image": "/assets/img/icons/icon-yellow-feature-3.svg",
    "title": "Innovation solutions",
    "description": "using either completely concepts finding new ways of using existing"
  }, {
    "image": "/assets/img/icons/icon-yellow-feature-4.svg",
    "title": "Qualitiful products",
    "description": "Product quality refers to how well a product satisfies our customer"
  }, {
    "image": "/assets/img/icons/icon-yellow-feature-5.svg",
    "title": "Customer satisfaction",
    "description": "Happy customers are delighted because of the customer service"
  }, {
    "image": "/assets/img/icons/icon-yellow-feature-6.svg",
    "title": "Simplicity interface",
    "description": "Simplicity is used loosely to refer to the need to minimize a process."
  }]
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

const url = "src/content/aboutPage/features.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/features.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/features.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
