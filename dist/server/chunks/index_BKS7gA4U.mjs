import { h as createVNode, J as Fragment, ax as __astro_tag_component__ } from './astro/server_BL0ualZl.mjs';
import 'clsx';

const frontmatter = {
  "indexHeader": "We create world-class web design, & branding",
  "button": {
    "link": "/portfolio",
    "text": "See more works"
  },
  "sliderText": ["We complete client's projects efficiently", "We complete client's projects efficiently", "We complete client's projects efficiently", "We complete client's projects efficiently"],
  "relatedProjectsText": "There are many variations of passages of Lorem Ipsum available, but the majority have suf alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
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

const url = "src/content/portfolio/index.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/portfolio/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/portfolio/index.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
