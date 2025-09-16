!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="15720bd2-de87-405a-a208-dcca094af30a",e._sentryDebugIdIdentifier="sentry-dbid-15720bd2-de87-405a-a208-dcca094af30a");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "title": "Social Media",
  "image": "/assets/img/th-1/portfolio-img-3.jpg",
  "type": "Campaign",
  "category": "UI/UX Design",
  "client": "John Smith",
  "duration": "1 Week",
  "websiteLink": "example@gmail.com",
  "shortDescription": "Mobile UX design is the design of user experiences for hand-held and wearable devices"
};
function getHeadings() {
  return [{
    "depth": 5,
    "slug": "project-overview",
    "text": "Project overview"
  }, {
    "depth": 5,
    "slug": "what-we-did-for-this-project",
    "text": "What we did for this project"
  }, {
    "depth": 5,
    "slug": "project-results",
    "text": "Project results"
  }];
}
function _createMdxContent(props) {
  const _components = {
    h5: "h5",
    img: "img",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h5, {
      id: "project-overview",
      children: "Project overview"
    }), "\n", createVNode(_components.p, {
      children: "Mobile UX design is the design of user experiences for hand-held and wearable devices. Designers create solutions (typically applications) to meet mobile users’ unique requirements and restrictions. Designers focus on accessibility, discoverability\nand efficiency to optimize on-the-go interactive experiences."
    }), "\n", createVNode(_components.p, {
      children: "Interface (UI) determines how the app will look like, while UX determines what problem it will solve in the users’ life. UI is revolves around visually directing the user about the app interface, while UX includes researching, testing, developing the app."
    }), "\n", createVNode(_components.h5, {
      id: "what-we-did-for-this-project",
      children: "What we did for this project"
    }), "\n", createVNode(_components.p, {
      children: "A user can engage with a product or service by using a user interface (UI), which is essentially a collection of screens, pages, visual elements (such as buttons and icons). The phrase “User Experience” refers to how a person reacts to each component."
    }), "\n", createVNode("ol", {
      class: "list-inside list-decimal my-5",
      children: [createVNode("li", {
        children: "Strategic Discovery"
      }), createVNode("li", {
        children: "Web application redesign and optimization"
      }), createVNode("li", {
        children: "Mobile application redesign and optimization"
      }), createVNode("li", {
        children: "Landing page redesign and optimization"
      }), createVNode("li", {
        children: "Component-based UI-Kit"
      }), createVNode("li", {
        children: "Product design sprints to explore new functionality"
      })]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "/assets/img/th-1/portfolio-inner-img.jpg",
        alt: "portfolio image"
      })
    }), "\n", createVNode(_components.h5, {
      id: "project-results",
      children: "Project results"
    }), "\n", createVNode(_components.p, {
      children: "The UI/UX design of software and applications helps improve customer experience and satisfaction. This ultimately helps increase the number of people using your product. If users encounter roadblocks when trying to complete actions on your product, they are very likely to drop off."
    }), "\n", createVNode(_components.p, {
      children: "Creating a brand with clear and targeted messaging was crucial in increasing conversions. Together with the Webflow team, we have compiled a new product page structure using the App model and packed that in an excellent cover 🙂"
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

const url = "src/content/portfolio/portfolio-3.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/portfolio/portfolio-3.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/portfolio/portfolio-3.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
