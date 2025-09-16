!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="af3a0eb9-74a4-46e8-9d44-af2be19f4d44",e._sentryDebugIdIdentifier="sentry-dbid-af3a0eb9-74a4-46e8-9d44-af2be19f4d44");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "header": "MARKET TIMING MATTERS - ACT NOW",
  "description": "Current Market Reality - Interest rates changing regularly. Equipment prices up 15% this year. Lending appetites changing.",
  "limitedCapacity": {
    "title": "LIMITED ADVISORY CAPACITY",
    "description": "Dan personally handles every client relationship. Currently accepting 15 new partnerships this month.",
    "spotsRemaining": 7,
    "lastUpdated": "Today"
  },
  "strategy": {
    "title": "Better to have finance options evaluated BEFORE you need them",
    "validity": "Strategic assessment valid 90 days - be ready for opportunity"
  },
  "button": {
    "text": "SECURE YOUR SPOT NOW",
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

const url = "src/content/IndexPage/blogs.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/blogs.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/blogs.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
