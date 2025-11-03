import { h as createVNode, J as Fragment, ax as __astro_tag_component__ } from './astro/server_BL0ualZl.mjs';
import { $ as $$ServiceBadge, a as $$TwoImages } from './TwoImages_BHyXF4PR.mjs';
import 'clsx';

const frontmatter = {
  "title": "Custom Software Development",
  "icon": "/assets/img/icons/icon-black-home-7-service-4.svg",
  "description": "Custom Software Development is the process of conceptualizing, designing, building & deploying",
  "image": "/assets/img/th-1/service-main-img.jpg"
};
function getHeadings() {
  return [{
    "depth": 5,
    "slug": "what-is-custom-software-development",
    "text": "What is Custom Software Development?"
  }, {
    "depth": 5,
    "slug": "how-do-you-create-an-effective-digital-brand-strategy",
    "text": "How Do You Create an Effective Digital Brand Strategy?"
  }, {
    "depth": 5,
    "slug": "digital-branding-vs-digital-marketing",
    "text": "Digital Branding vs. Digital Marketing"
  }, {
    "depth": 5,
    "slug": "are-you-ready-to-digitize-your-business-brand",
    "text": "Are You Ready to Digitize Your Business Brand?"
  }];
}
function _createMdxContent(props) {
  const _components = {
    h5: "h5",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h5, {
      id: "what-is-custom-software-development",
      children: "What is Custom Software Development?"
    }), "\n", createVNode(_components.p, {
      children: "A comprehensive plan that helps you communicate your company’s identity to consumers online to increase customer loyalty and sales. A digital brand strategy also defines how your organization wishes to be perceived by consumers."
    }), "\n", createVNode(_components.p, {
      children: "What makes it unique? What do you want people to think about your product or service? By creating guidelines for your brand, you can ensure every interaction with consumers remains consistent."
    }), "\n", createVNode(_components.h5, {
      id: "how-do-you-create-an-effective-digital-brand-strategy",
      children: "How Do You Create an Effective Digital Brand Strategy?"
    }), "\n", createVNode(_components.p, {
      children: "Creating an effective digital brand takes time, effort, and due diligence. It’s not as simple as making a logo, showing up with a few dozen hashtags, and calling. Let’s dive into the roadmap for building a digital brand strategy with a few detailed examples."
    }), "\n", createVNode("div", {
      class: "font-semibold text-ColorBlack",
      children: [createVNode($$ServiceBadge, {
        children: createVNode(_components.p, {
          children: "Digital Branding - Creating your brand image through logo, website design,\nand social media design to produce a solid brand identity through"
        })
      }), createVNode($$ServiceBadge, {
        children: createVNode(_components.p, {
          children: "Digital Marketing - Promoting your existing brand image through content\nmarketing and advertising techniques to impact consumers."
        })
      })]
    }), "\n", createVNode($$TwoImages, {
      img1: "/assets/img/th-1/service-inner-1-img.jpg",
      img2: "/assets/img/th-1/service-inner-2-img.jpg"
    }), "\n", createVNode(_components.h5, {
      id: "digital-branding-vs-digital-marketing",
      children: "Digital Branding vs. Digital Marketing"
    }), "\n", createVNode(_components.p, {
      children: "It is a common misconception to confuse digital marketing and digital branding. While you may think that these phrases are interchangeable, there is a distinct difference. Creating an effective digital brand takes time, effort, and due diligence. It’s not as simple as making a logo, showing up with a few dozen hashtags, and calling it a day."
    }), "\n", createVNode(_components.h5, {
      id: "are-you-ready-to-digitize-your-business-brand",
      children: "Are You Ready to Digitize Your Business Brand?"
    }), "\n", createVNode(_components.p, {
      children: "Now it is clear what digital branding is and what are the strategies. That means it’s time for you to put it into practice. There are nine ways that you can use for maximum the results."
    }), "\n", createVNode(_components.p, {
      children: "However, you can also try some of the strategies that you think are the easiest and most important. For example, you can start by creating a logo, using social media, or creating a website. Keep the spirit and see you on the next article!"
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

const url = "src/content/services/service-4.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/services/service-4.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/services/service-4.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
