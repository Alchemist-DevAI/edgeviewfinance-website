!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="eb91f628-f8d1-492a-866a-35a52ae3d61b",e._sentryDebugIdIdentifier="sentry-dbid-eb91f628-f8d1-492a-866a-35a52ae3d61b");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "title": "SOME OF OUR 40+ SPECIALIST LENDER NETWORK (Alphabetical Order)",
  "description": "Why This Matters - While your bank offers THEIR products, we compare 40+ lenders to find YOUR best solution.",
  "majorBanks": [{
    "name": "ANZ",
    "logo": "/assets/logos/lenders/anz.png"
  }, {
    "name": "Commonwealth Bank",
    "logo": "/assets/logos/lenders/cba.png"
  }, {
    "name": "ING",
    "logo": "/assets/logos/lenders/ing.png"
  }, {
    "name": "NAB",
    "logo": "/assets/logos/lenders/nab.png"
  }, {
    "name": "Suncorp",
    "logo": "/assets/logos/lenders/suncorp.png"
  }, {
    "name": "Westpac",
    "logo": "/assets/logos/lenders/westpac.png"
  }],
  "specialistLenders": {
    "source": "assets/logos/lenders/",
    "display": "Alphabetical Order"
  },
  "button": {
    "text": "EXPLORE LENDER OPTIONS FOR YOUR SITUATION",
    "link": "/service"
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

const url = "src/content/IndexPage/brand.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/brand.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/IndexPage/brand.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
