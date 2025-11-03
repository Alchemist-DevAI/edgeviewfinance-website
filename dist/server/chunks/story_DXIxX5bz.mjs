import { h as createVNode, J as Fragment, ax as __astro_tag_component__ } from './astro/server_BL0ualZl.mjs';
import 'clsx';

const frontmatter = {
  "header": "Our Story",
  "subheading": "From Cross-Industry Experience to Trades Finance Expertise",
  "image": "/assets/img/about/queensland-trades-business.jpg",
  "points": ["20+ years working with hundreds of businesses across every industry imaginable", "Unique insights gained from diverse industry experience and thousands of financing scenarios", "Strategic decision to focus this cross-industry expertise specifically on trades businesses", "Both residential property investment and commercial business finance solutions", "Built relationships with 40+ specialist lenders for maximum options", "Proven track record with 100+ Queensland trades businesses successfully funded"]
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Dan’s journey into finance began with a simple observation: most finance brokers didn’t truly understand the unique challenges facing different industries. After spending years working across construction, manufacturing, retail, hospitality, and countless other sectors, Dan recognised that each industry has its own financial rhythms, challenges, and opportunities."
    }), "\n", createVNode(_components.p, {
      children: "This broad exposure to hundreds of businesses and every conceivable financing scenario created something valuable - a deep understanding of how finance really works across different business models, cash flow patterns, and growth stages."
    }), "\n", createVNode(_components.p, {
      children: "When Dan established Edgeview Finance, he made a strategic decision. Rather than trying to be everything to everyone, he would take this extensive cross-industry experience and focus it specifically on trades businesses. Why trades? Because this sector represents some of Queensland’s most dynamic and growth-oriented businesses, yet they often face unique financing challenges that generic brokers simply don’t understand."
    }), "\n", createVNode(_components.p, {
      children: "Today, Dan and the Edgeview Finance team bring this wealth of experience to every trades business they work with. Whether you need residential finance for property investment, commercial finance for equipment and expansion, or strategic advice on navigating complex funding scenarios, you benefit from insights gained across thousands of financing solutions."
    })]
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

const url = "src/content/aboutPage/story.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/story.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/aboutPage/story.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
