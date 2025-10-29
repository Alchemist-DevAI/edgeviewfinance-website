!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e2231090-cd40-4361-8c1d-b195e0dbc3d1",e._sentryDebugIdIdentifier="sentry-dbid-e2231090-cd40-4361-8c1d-b195e0dbc3d1");})();}catch(e){}};import { h as createVNode, aq as Fragment, ax as __astro_tag_component__ } from './astro/server_DVFDqqUz.mjs';
import 'clsx';

const frontmatter = {
  "header": "YOUR PROTECTION - OUR PROFESSIONAL GUARANTEES",
  "description": "We stand behind our expertise with comprehensive guarantees that protect your interests.",
  "image": "/assets/img/th-8/video-img.jpg",
  "videoLink": "https://www.youtube.com/watch?v=3nQNiWdeH2Q",
  "guarantees": [{
    "title": "EXPERTISE GUARANTEE",
    "description": "You work directly with Dan - 20+ years banking experience. Not passed to junior staff. Ever."
  }, {
    "title": "BEST MATCH GUARANTEE",
    "description": "We find lenders who understand trade businesses. Access to 40+ specialists, not just big banks."
  }, {
    "title": "SPEED GUARANTEE",
    "description": "Initial Edgeview Finance preliminary review within 24 hours. We move at business speed, not bank speed."
  }, {
    "title": "TRANSPARENCY GUARANTEE",
    "description": "Know exactly where your application stands. No black box - complete visibility throughout."
  }, {
    "title": "SUCCESS-BASED GUARANTEE",
    "description": "We only get paid when you get successfully funded. Our success is tied to yours."
  }],
  "disclaimer": "Standard brokerage model. Complex advisory may have fees. We cannot guarantee approval - that's the lender's decision."
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

const url = "src/content/IndexPage/videosection.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/videosection.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/videosection.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
