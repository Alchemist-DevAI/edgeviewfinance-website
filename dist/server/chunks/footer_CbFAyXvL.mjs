!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ab03355d-a335-4839-af8d-4306a8709cb1",e._sentryDebugIdIdentifier="sentry-dbid-ab03355d-a335-4839-af8d-4306a8709cb1");})();}catch(e){}};import { h as createVNode, aq as Fragment, ax as __astro_tag_component__ } from './astro/server_DVFDqqUz.mjs';
import 'clsx';

const frontmatter = {
  "logo": "/assets/img/evfbs-logo.png",
  "description": "EDGEVIEW FINANCE - Strategic Finance Partnership",
  "mail": "finance@edgeviewfinance.com.au",
  "PrimaryPages": [{
    "name": "About Us",
    "link": "/about"
  }, {
    "name": "Services",
    "link": "/service"
  }, {
    "name": "Success Stories",
    "link": "/portfolio"
  }, {
    "name": "Contact",
    "link": "/contact"
  }],
  "UtilityPages": [{
    "name": "Credit Guide",
    "link": "/credit-guide"
  }, {
    "name": "Privacy Policy",
    "link": "/privacy-policy"
  }, {
    "name": "Website Terms of Use",
    "link": "/terms-of-use"
  }, {
    "name": "Data Security Policy",
    "link": "/data-security-policy"
  }, {
    "name": "Credit License",
    "link": "/credit-license"
  }],
  "Resources": [{
    "name": "Blog",
    "link": "/blog"
  }, {
    "name": "FAQs",
    "link": "/faqs"
  }, {
    "name": "Resources",
    "link": "/resources"
  }],
  "socialLinks": [{
    "icon": "fa-linkedin-in",
    "link": "https://www.linkedin.com/company/edgeview-finance"
  }, {
    "icon": "fa-facebook-f",
    "link": "https://www.facebook.com/edgeviewfinance"
  }, {
    "icon": "fa-instagram",
    "link": "https://www.instagram.com/edgeviewfinance"
  }]
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

const url = "src/content/site/footer.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/site/footer.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/site/footer.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
