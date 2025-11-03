import { h as createVNode, J as Fragment, ax as __astro_tag_component__ } from './astro/server_BL0ualZl.mjs';
import 'clsx';

const frontmatter = {
  "links": [{
    "text": "Strategic Finance Services",
    "link": "#",
    "dropdown": true,
    "sublinks": [{
      "text": "Equipment Finance",
      "link": "/equipment-finance"
    }, {
      "text": "Working Capital Finance",
      "link": "/working-capital-finance"
    }, {
      "text": "Commercial Property Finance",
      "link": "/commercial-property-finance"
    }, {
      "text": "Vehicle Finance",
      "link": "/vehicle-finance"
    }, {
      "text": "Invoice & Trade Finance",
      "link": "/invoice-trade-finance"
    }, {
      "text": "Business Acquisition Finance",
      "link": "/business-acquisition-finance"
    }, {
      "text": "Home & Investment Loans",
      "link": "/home-loans"
    }, {
      "text": "View All Services",
      "link": "/services"
    }]
  }, {
    "text": "Success Stories",
    "link": "/success-stories"
  }, {
    "text": "Resources",
    "link": "#",
    "dropdown": true,
    "sublinks": [{
      "text": "Blog",
      "link": "/blog"
    }, {
      "text": "Case Studies",
      "link": "/success-stories"
    }]
  }, {
    "text": "Get Started",
    "link": "/contact"
  }],
  "rightButton1": {
    "text": "Urgent? Call 1300 280 895",
    "link": "tel:1300280895"
  },
  "rightButton2": {
    "text": "Book Call with a Finance Broker",
    "link": "#contact"
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

const url = "src/content/site/header.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/site/header.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/site/header.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
