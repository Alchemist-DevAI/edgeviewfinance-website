import { h as createVNode, J as Fragment, ax as __astro_tag_component__ } from './astro/server_BL0ualZl.mjs';
import { $ as $$ServiceBadge, a as $$TwoImages } from './TwoImages_BHyXF4PR.mjs';
import 'clsx';

const frontmatter = {
  "title": "Business Loans",
  "icon": "/assets/img/icons/icon-black-home-7-service-3.svg",
  "description": "Flexible business loans for growth, expansion, or opportunities. Multiple lenders, better rates.",
  "image": "/assets/img/th-1/service-main-img.jpg"
};
function getHeadings() {
  return [{
    "depth": 5,
    "slug": "business-loans-that-actually-help-your-business",
    "text": "Business Loans That Actually Help Your Business"
  }, {
    "depth": 5,
    "slug": "common-uses-for-business-loans",
    "text": "Common Uses for Business Loans"
  }, {
    "depth": 5,
    "slug": "business-loan-options-available",
    "text": "Business Loan Options Available"
  }, {
    "depth": 5,
    "slug": "why-business-owners-choose-evfbs",
    "text": "Why Business Owners Choose EVFBS"
  }];
}
function _createMdxContent(props) {
  const _components = {
    h5: "h5",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h5, {
      id: "business-loans-that-actually-help-your-business",
      children: "Business Loans That Actually Help Your Business"
    }), "\n", createVNode(_components.p, {
      children: "Banks make it hard. Mountains of paperwork. Weeks of waiting. Then they say no anyway."
    }), "\n", createVNode(_components.p, {
      children: "We work with 40+ lenders who want to fund businesses like yours. Get the loan you need with terms that make sense. Use it for anything that grows your business."
    }), "\n", createVNode(_components.h5, {
      id: "common-uses-for-business-loans",
      children: "Common Uses for Business Loans"
    }), "\n", createVNode(_components.p, {
      children: "Smart businesses use loans to make more money:"
    }), "\n", createVNode("div", {
      class: "font-semibold text-ColorBlack",
      children: [createVNode($$ServiceBadge, {
        children: "Expansion - Open new locations, hire more staff, enter new markets. Growth costs money upfront."
      }), createVNode($$ServiceBadge, {
        children: "Opportunities - Buy out a competitor, purchase bulk inventory, secure a major contract."
      }), createVNode($$ServiceBadge, {
        children: "Refinance - Replace expensive debt with better terms. Lower your payments, improve cash flow."
      })]
    }), "\n", createVNode($$TwoImages, {
      img1: "/assets/img/th-1/service-inner-1-img.jpg",
      img2: "/assets/img/th-1/service-inner-2-img.jpg"
    }), "\n", createVNode(_components.h5, {
      id: "business-loan-options-available",
      children: "Business Loan Options Available"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Secured Business Loans"
      }), " - Lower rates using business assets as security. Keep your house out of it."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Unsecured Business Loans"
      }), " - No security needed. Based on business performance and cash flow."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Line of Credit"
      }), " - Approved limit you can draw from anytime. Only pay interest on what you use."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Term Loans"
      }), " - Fixed amount, fixed term, predictable payments. Perfect for planned investments."]
    }), "\n", createVNode(_components.h5, {
      id: "why-business-owners-choose-evfbs",
      children: "Why Business Owners Choose EVFBS"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Multiple Lenders"
      }), " - We compare 40+ lenders to find your best deal. Banks only offer their own products."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Fast Decisions"
      }), " - Know where you stand in 24 hours. Not weeks of maybe."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Business Focus"
      }), " - We understand business cycles, seasonality, and growth phases."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "No Jargon"
      }), " - Clear terms explained simply. Know exactly what you’re signing up for."]
    }), "\n", createVNode(_components.p, {
      children: "Ready to grow? Let’s find the right loan for your business."
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

const url = "src/content/services/service-3.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/services/service-3.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/services/service-3.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
