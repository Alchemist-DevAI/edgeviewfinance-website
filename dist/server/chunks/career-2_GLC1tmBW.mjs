!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="fc2ead33-af95-46e7-9766-2e304fec0f05",e._sentryDebugIdIdentifier="sentry-dbid-fc2ead33-af95-46e7-9766-2e304fec0f05");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "position": "Junior content writer",
  "description": "Product designers are involved in the entire design process a of a product, while UX designers focus more on the hands-on design portion of a best a process. Product designers and user an experience (UX) designers are the similar—in fact, sometimes the titles are used interchangeably.",
  "type": "Remote",
  "category": "business",
  "location": "United State",
  "salaryRange": "$10k-$35k"
};
function getHeadings() {
  return [{
    "depth": 5,
    "slug": "job-responsibilities",
    "text": "Job Responsibilities"
  }, {
    "depth": 5,
    "slug": "requirements",
    "text": "Requirements"
  }, {
    "depth": 5,
    "slug": "skill--experience",
    "text": "Skill & Experience"
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
      id: "job-responsibilities",
      children: "Job Responsibilities"
    }), "\n", createVNode(_components.p, {
      children: "By partnering with cross-functional teams and customers, for you will turn your insights into delightful creative environment that requires proven leadership skills and the ability."
    }), "\n", createVNode("ul", {
      class: "mb-10 flex list-inside list-disc flex-col gap-5 lg:mb-[60px]",
      children: [createVNode("li", {
        children: " Set design requirements based on information from internal teams & research."
      }), createVNode("li", {
        children: "Identify new product improvement opportunities."
      }), createVNode("li", {
        children: " Analyze how a new product satisfies market needs & consumer preferences."
      }), createVNode("li", {
        children: "Stay up to date on current industry trends and market conditions."
      }), createVNode("li", {
        children: "Modify and revise existing designs to meet changing customer preferences."
      }), createVNode("li", {
        children: "Work closely with product engineers to suggest improvements for products."
      }), createVNode("li", {
        children: "Present product design ideas to cross-functional teams and senior leadership."
      })]
    }), "\n", createVNode(_components.h5, {
      id: "requirements",
      children: "Requirements"
    }), "\n", createVNode(_components.p, {
      children: "Proven experience in all phases of the design process including user for a research, copywriting, wireframing, prototyping, visual design, interaction design, and usability testing"
    }), "\n", createVNode("ul", {
      class: "mb-10 flex list-inside list-disc flex-col gap-5 lg:mb-[60px]",
      children: [createVNode("li", {
        children: " Set design requirements based on information from internal teams & research."
      }), createVNode("li", {
        children: "Identify new product improvement opportunities."
      }), createVNode("li", {
        children: " Analyze how a new product satisfies market needs & consumer preferences."
      }), createVNode("li", {
        children: "Stay up to date on current industry trends and market conditions."
      }), createVNode("li", {
        children: "Modify and revise existing designs to meet changing customer preferences."
      }), createVNode("li", {
        children: "Work closely with product engineers to suggest improvements for products."
      }), createVNode("li", {
        children: "Present product design ideas to cross-functional teams and senior leadership."
      })]
    }), "\n", createVNode(_components.h5, {
      id: "skill--experience",
      children: "Skill & Experience"
    }), "\n", createVNode("ul", {
      class: "mb-10 flex list-inside list-disc flex-col gap-5 lg:mb-[60px]",
      children: [createVNode("li", {
        children: " Set design requirements based on information from internal teams & research."
      }), createVNode("li", {
        children: "Identify new product improvement opportunities."
      }), createVNode("li", {
        children: " Analyze how a new product satisfies market needs & consumer preferences."
      }), createVNode("li", {
        children: "Stay up to date on current industry trends and market conditions."
      }), createVNode("li", {
        children: "Modify and revise existing designs to meet changing customer preferences."
      })]
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

const url = "src/content/career/career-2.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/career/career-2.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/career/career-2.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
