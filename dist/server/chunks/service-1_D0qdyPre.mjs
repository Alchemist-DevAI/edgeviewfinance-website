!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e045a60c-1725-4dce-902d-04f5723f52ad",e._sentryDebugIdIdentifier="sentry-dbid-e045a60c-1725-4dce-902d-04f5723f52ad");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import { $ as $$ServiceBadge, a as $$TwoImages } from './TwoImages_BqT6g4vd.mjs';
import 'clsx';

const frontmatter = {
  "title": "Equipment Finance",
  "icon": "/assets/img/icons/icon-black-home-7-service-1.svg",
  "description": "Get the equipment you need without huge deposits or risking your house. Fast approval in 24 hours.",
  "image": "/assets/img/th-1/service-main-img.jpg"
};
function getHeadings() {
  return [{
    "depth": 5,
    "slug": "need-equipment-banks-said-no-we-say-yes",
    "text": "Need Equipment? Banks Said No? We Say Yes."
  }, {
    "depth": 5,
    "slug": "how-equipment-finance-works",
    "text": "How Equipment Finance Works"
  }, {
    "depth": 5,
    "slug": "equipment-we-finance",
    "text": "Equipment We Finance"
  }, {
    "depth": 5,
    "slug": "why-choose-evfbs-for-equipment-finance",
    "text": "Why Choose EVFBS for Equipment Finance?"
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
      id: "need-equipment-banks-said-no-we-say-yes",
      children: "Need Equipment? Banks Said No? We Say Yes."
    }), "\n", createVNode(_components.p, {
      children: "Your business needs equipment to grow. But banks want perfect credit. Dealers want 30% deposits. You’re stuck waiting while competitors get ahead."
    }), "\n", createVNode(_components.p, {
      children: "We find lenders who understand business. Get equipment finance with terms that work for you. No house at risk. No giant deposits. Just the gear you need to build your business."
    }), "\n", createVNode(_components.h5, {
      id: "how-equipment-finance-works",
      children: "How Equipment Finance Works"
    }), "\n", createVNode(_components.p, {
      children: "Getting equipment shouldn’t be complicated. Here’s our simple process that gets you approved fast:"
    }), "\n", createVNode("div", {
      class: "font-semibold text-ColorBlack",
      children: [createVNode($$ServiceBadge, {
        children: "Step 1: Quick Application - Tell us what equipment you need. Takes 5 minutes online or over the phone."
      }), createVNode($$ServiceBadge, {
        children: "Step 2: Fast Approval - We find the right lender for you. Most get approved within 24 hours."
      }), createVNode($$ServiceBadge, {
        children: "Step 3: Get Your Equipment - Once approved, get your equipment. Start using it to make money immediately."
      })]
    }), "\n", createVNode($$TwoImages, {
      img1: "/assets/img/th-1/service-inner-1-img.jpg",
      img2: "/assets/img/th-1/service-inner-2-img.jpg"
    }), "\n", createVNode(_components.h5, {
      id: "equipment-we-finance",
      children: "Equipment We Finance"
    }), "\n", createVNode(_components.p, {
      children: "We finance all types of business equipment:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Construction Equipment (excavators, loaders, trucks)"
      }), "\n", createVNode(_components.li, {
        children: "Trade Tools (specialist equipment, vans, machinery)"
      }), "\n", createVNode(_components.li, {
        children: "Transport Vehicles (trucks, trailers, forklifts)"
      }), "\n", createVNode(_components.li, {
        children: "Technology (computers, servers, software)"
      }), "\n", createVNode(_components.li, {
        children: "Medical Equipment (diagnostic tools, treatment equipment)"
      }), "\n"]
    }), "\n", createVNode(_components.h5, {
      id: "why-choose-evfbs-for-equipment-finance",
      children: "Why Choose EVFBS for Equipment Finance?"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "No House at Risk"
      }), " - Your home stays safe. Business finance for business assets."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Fast Approval"
      }), " - Know within 24 hours. No waiting weeks for an answer."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Flexible Terms"
      }), " - Payments that match your cash flow. Seasonal? We understand."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Any Equipment"
      }), " - If it helps your business make money, we can finance it."]
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

const url = "src/content/services/service-1.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/services/service-1.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/services/service-1.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
