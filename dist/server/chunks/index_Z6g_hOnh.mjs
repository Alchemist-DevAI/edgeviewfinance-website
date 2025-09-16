!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d916b8b3-f1ab-47f5-8f93-1b9492935b3b",e._sentryDebugIdIdentifier="sentry-dbid-d916b8b3-f1ab-47f5-8f93-1b9492935b3b");})();}catch(e){}};import { h as createVNode, ar as Fragment, ay as __astro_tag_component__ } from './astro/server_Djx-43IL.mjs';
import 'clsx';

const frontmatter = {
  "title": "Terms and Conditions"
};
function getHeadings() {
  return [{
    "depth": 5,
    "slug": "what-information-do-we-collect",
    "text": "What information do we collect?"
  }, {
    "depth": 5,
    "slug": "use-of-services",
    "text": "Use of Services"
  }, {
    "depth": 5,
    "slug": "user-accounts",
    "text": "User Accounts"
  }, {
    "depth": 5,
    "slug": "privacy",
    "text": "Privacy"
  }, {
    "depth": 5,
    "slug": "termination",
    "text": "Termination"
  }, {
    "depth": 5,
    "slug": "governing-law",
    "text": "Governing Law"
  }];
}
function _createMdxContent(props) {
  const _components = {
    br: "br",
    h5: "h5",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h5, {
      id: "what-information-do-we-collect",
      children: "What information do we collect?"
    }), "\n", createVNode(_components.p, {
      children: "We collect personal information that you provide to us, such as name, contact information, email address, and any other information you choose to provide. We may also collect information about how you interact with our website and services."
    }), "\n", createVNode(_components.h5, {
      id: "use-of-services",
      children: "Use of Services"
    }), "\n", createVNode(_components.p, {
      children: ["1 You must be at least 18 years old to access and use our services.", createVNode(_components.br, {}), "\n2 You agree to use the services only for lawful purposes and in accordance with these Terms.\nYou are solely responsible for any content you post, upload, or transmit through our services."]
    }), "\n", createVNode(_components.h5, {
      id: "user-accounts",
      children: "User Accounts"
    }), "\n", createVNode(_components.p, {
      children: ["1 When you create an account with us, you must provide accurate, complete, and up-to-date information.", createVNode(_components.br, {}), "\n2 You are responsible for safeguarding the password that you use to access the services and for any activities or actions under your password."]
    }), "\n", createVNode(_components.h5, {
      id: "privacy",
      children: "Privacy"
    }), "\n", createVNode(_components.p, {
      children: "Your use of the services is also governed by our Privacy Policy. Please review our Privacy Policy for more information on how we collect, use, and share your personal information."
    }), "\n", createVNode(_components.h5, {
      id: "termination",
      children: "Termination"
    }), "\n", createVNode(_components.p, {
      children: "These Terms shall be governed and construed in accordance with the laws of Jurisdiction, without regard to its conflict of law provisions.."
    }), "\n", createVNode(_components.h5, {
      id: "governing-law",
      children: "Governing Law"
    }), "\n", createVNode(_components.p, {
      children: "We may terminate or suspend your account and access to the services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms."
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

const url = "src/content/termsCondition/index.mdx";
const file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/termsCondition/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/content/termsCondition/index.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
