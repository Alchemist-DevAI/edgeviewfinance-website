import { h as createVNode, J as Fragment, ax as __astro_tag_component__ } from './astro/server_BL0ualZl.mjs';
import 'clsx';

const frontmatter = {
  "header": "BUT I'M THINKING...",
  "content": [{
    "Q": "Why not just go to my bank?",
    "A": "Banks offer THEIR products. We find the BEST from 40+ lenders. Plus, we know how to present your case properly to get approval."
  }, {
    "Q": "Brokers are expensive",
    "A": "We're usually paid by the lender, not you. For complex deals, our expertise saves you more than any fee."
  }, {
    "Q": "My financials aren't perfect",
    "A": "Perfect! No Business Ever Really Fits The 'Box'. There would not be many scenarios we have not seen and dealt with."
  }, {
    "Q": "I don't have time for complicated processes",
    "A": "That's why you need us. We handle the complex parts. You focus on running your business."
  }, {
    "Q": "What if I need the money urgently?",
    "A": "Equipment finance can be approved in 24-48 hrs when prepared properly. We know how to fast-track."
  }],
  "button": {
    "text": "Still have questions? CALL DAN DIRECTLY: 1300 280 895",
    "link": "tel:1300280895"
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

const url = "src/content/IndexPage/qna.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/qna.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/qna.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
