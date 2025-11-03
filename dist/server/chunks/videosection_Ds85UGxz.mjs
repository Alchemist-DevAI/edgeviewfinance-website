import { h as createVNode, J as Fragment, ax as __astro_tag_component__ } from './astro/server_BL0ualZl.mjs';
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
