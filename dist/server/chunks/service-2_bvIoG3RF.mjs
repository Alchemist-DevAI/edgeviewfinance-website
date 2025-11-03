import { h as createVNode, J as Fragment, ax as __astro_tag_component__ } from './astro/server_BL0ualZl.mjs';
import { $ as $$ServiceBadge, a as $$TwoImages } from './TwoImages_BHyXF4PR.mjs';
import 'clsx';

const frontmatter = {
  "title": "Working Capital Finance",
  "icon": "/assets/img/icons/icon-black-home-7-service-2.svg",
  "description": "Get cash flow when you need it. Cover payroll, stock, or growth opportunities. Approved in 24 hours.",
  "image": "/assets/img/th-1/service-main-img.jpg"
};
function getHeadings() {
  return [{
    "depth": 5,
    "slug": "cash-flow-stuck-get-working-capital-fast",
    "text": "Cash Flow Stuck? Get Working Capital Fast."
  }, {
    "depth": 5,
    "slug": "how-working-capital-finance-helps-your-business",
    "text": "How Working Capital Finance Helps Your Business"
  }, {
    "depth": 5,
    "slug": "types-of-working-capital-we-arrange",
    "text": "Types of Working Capital We Arrange"
  }, {
    "depth": 5,
    "slug": "perfect-for-australian-businesses",
    "text": "Perfect for Australian Businesses"
  }];
}
function _createMdxContent(props) {
  const _components = {
    h5: "h5",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h5, {
      id: "cash-flow-stuck-get-working-capital-fast",
      children: "Cash Flow Stuck? Get Working Capital Fast."
    }), "\n", createVNode(_components.p, {
      children: "Big job coming but need materials? Staff to pay but waiting on invoices? Growth opportunity but no cash?"
    }), "\n", createVNode(_components.p, {
      children: "Working capital finance gives you breathing room. Get the cash you need now. Pay it back when money comes in. Keep your business moving forward."
    }), "\n", createVNode(_components.h5, {
      id: "how-working-capital-finance-helps-your-business",
      children: "How Working Capital Finance Helps Your Business"
    }), "\n", createVNode(_components.p, {
      children: "Working capital isn’t just about survival. It’s about taking opportunities when they come:"
    }), "\n", createVNode("div", {
      class: "font-semibold text-ColorBlack",
      children: [createVNode($$ServiceBadge, {
        children: "Cover Gaps - Pay staff and suppliers while waiting for customer payments. No more turning down work."
      }), createVNode($$ServiceBadge, {
        children: "Buy in Bulk - Get supplier discounts by buying more. Use finance to increase your margins."
      }), createVNode($$ServiceBadge, {
        children: "Take Big Jobs - Don’t miss opportunities because you can’t fund materials or labor upfront."
      })]
    }), "\n", createVNode($$TwoImages, {
      img1: "/assets/img/th-1/service-inner-1-img.jpg",
      img2: "/assets/img/th-1/service-inner-2-img.jpg"
    }), "\n", createVNode(_components.h5, {
      id: "types-of-working-capital-we-arrange",
      children: "Types of Working Capital We Arrange"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Invoice Finance"
      }), " - Get paid immediately for your invoices. No more 30-60 day waits."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Trade Finance"
      }), " - Fund purchase orders and inventory. Buy now, pay when you sell."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Overdraft Facilities"
      }), " - Flexible credit line for ups and downs. Use what you need, when you need it."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Short Term Loans"
      }), " - Quick cash for specific needs. Clear terms, fast funding."]
    }), "\n", createVNode(_components.h5, {
      id: "perfect-for-australian-businesses",
      children: "Perfect for Australian Businesses"
    }), "\n", createVNode(_components.p, {
      children: "We understand Australian business cycles:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Seasonal businesses (pool builders, landscapers)"
      }), "\n", createVNode(_components.li, {
        children: "Project-based work (construction, trades)"
      }), "\n", createVNode(_components.li, {
        children: "Growing businesses (need cash to scale)"
      }), "\n", createVNode(_components.li, {
        children: "Contract winners (fund the work upfront)"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Get approved in 24 hours. Funding within 48 hours. Your business keeps moving."
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

const url = "src/content/services/service-2.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/services/service-2.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/services/service-2.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
