!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="215bca50-ee50-4a3b-96e1-124755e74cce",e._sentryDebugIdIdentifier="sentry-dbid-215bca50-ee50-4a3b-96e1-124755e74cce");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "header": "FROM REACTIVE TO READY IN 3 SIMPLE STEPS",
  "image": "/assets/img/th-8/content-img-1.jpg",
  "button": {
    "text": "CHECK MY READINESS SCORE NOW",
    "link": "#contact"
  },
  "process": [{
    "step": 1,
    "title": "READINESS ASSESSMENT",
    "duration": "30 seconds",
    "description": "Complete our Strategic Finance Readiness Assessment. No personal details required - just answer questions about your business structure and goals."
  }, {
    "step": 2,
    "title": "STRATEGIC POSITIONING",
    "duration": "20 minutes",
    "description": "Review your readiness score with Dan. Identify gaps in your finance position. Get a clear roadmap for strategic finance preparation."
  }, {
    "step": 3,
    "title": "OPPORTUNITY READY",
    "duration": "90 days valid",
    "description": "When opportunities arise, you're prepared. No scrambling for documents. No delays. Fast-tracked approvals because you're strategically positioned."
  }]
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
      children: "The Difference? Most businesses are reactive - scrambling when opportunities arise. We help you become strategic - prepared and positioned for success."
    }), "\n", createVNode(_components.p, {
      children: "Don’t miss your next big opportunity because you weren’t ready. Get positioned now."
    }), "\n", createVNode(_components.p, {
      children: "*Timing varies by finance type and complexity"
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

const url = "src/content/IndexPage/content-1.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/content-1.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/content-1.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
