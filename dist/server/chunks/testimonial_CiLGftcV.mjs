import { h as createVNode, J as Fragment, ax as __astro_tag_component__ } from './astro/server_BL0ualZl.mjs';
import 'clsx';

const frontmatter = {
  "Header": "WHAT QUEENSLAND TRADES SAY ABOUT WORKING WITH DAN & THE EDGEVIEW FINANCE TEAM",
  "description": "Real reviews from Queensland trade business owners who have worked with Edgeview Finance.",
  "button": {
    "text": "More Success Stories",
    "link": "/portfolio"
  },
  "testimonials": [{
    "name": "Colin Sumsion",
    "post": "Electrician",
    "title": "Knowledge is second to none in the industry",
    "description": "Dan has helped us with several purchases over the years including Vehicles, Machinery and Houses. He is always diligent with the information he provides, the quotes are always competitive and he is very prompt. His knowledge is second to none in the industry.",
    "rating": 5,
    "verified": "Verified Client"
  }, {
    "name": "Tobin Wogandt",
    "post": "Commercial Construction Contracting/Roof Linings Business Owner",
    "title": "Went over and above on a complicated loan",
    "description": "Very helpful. Great communication. Went over and above on a complicated loan. Highly recommended.",
    "rating": 5,
    "verified": "Verified Client | Queensland"
  }, {
    "name": "Adam Burns",
    "post": "Security Systems Business Owner",
    "title": "Made the transaction seamless via all parties involved",
    "description": "We recently engaged Edgeview Finance to assist with the purchase of a new commercial property. Dan and his team went above and beyond to make the transaction seamless via all parties involved. I was always fully informed and kept up to date with the progress. 100% would recommend.",
    "rating": 5,
    "verified": "Verified Client | Brisbane"
  }, {
    "name": "Kale Reed",
    "post": "Electrical Contracting Business Owner",
    "title": "Better interest rate than our current bank",
    "description": "We just refinanced our home loan with Edgeview Finance and have been extremely happy with their service. We initially looked at going directly with our bank but because we own a small business, and a rural property they basically laughed at us. I called Dan, and working with him and his team nothing was too much trouble and 2 weeks later it is all approved and with a better interest rate than our current bank.",
    "rating": 5,
    "verified": "Verified Client | Rural Queensland"
  }, {
    "name": "Liam Bannon",
    "post": "Plumbing Business Owner",
    "title": "Really do a great job and give me everything I need",
    "description": "I've been using Edgeview finance for about four years now and Dan and his team really do a great job and give me everything I need.",
    "rating": 5,
    "verified": "Verified Client | 4+ Year Partnership"
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

const url = "src/content/IndexPage/testimonial.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/testimonial.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/testimonial.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
