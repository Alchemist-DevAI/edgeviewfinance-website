!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1a7beeb5-1b29-42de-8489-164a1172a11f",e._sentryDebugIdIdentifier="sentry-dbid-1a7beeb5-1b29-42de-8489-164a1172a11f");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "header": "THE REAL COST OF WRONG FINANCE DECISIONS",
  "image": "/assets/img/th-8/content-img-2.jpg",
  "description": "Every week you wait with the wrong or no funding strategy, may be costing you THOUSANDS in lost opportunities",
  "points": ["LOST REVENUE - That $180K earthmoving contract you couldn't secure? $15,000/week bleeding away while competitors with better finance positioning win YOUR work", "WASTED TIME - 8 weeks bouncing between banks who don't understand trades? 320 hours of your life GONE + opportunity costs mounting daily at $685+ per day", "POOR STRUCTURING - Wrong loan terms crippling your cash flow? Interest rates 2-3% higher than necessary = $8,000+ extra per $100K annually", "STRESS & UNCERTAINTY - Sleepless nights wondering if approval will come? Health costs, family stress, mental exhaustion - all while competitors move ahead", "COMPETITIVE DISADVANTAGE - Lost 3 major contracts this quarter because you couldn't move fast enough? That's $50K+ in pure profit vanished forever"]
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

const url = "src/content/IndexPage/content-2.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/content-2.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/content-2.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
