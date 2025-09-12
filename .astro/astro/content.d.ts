declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"IndexPage": {
"blogs.mdx": {
	id: "blogs.mdx";
  slug: "blogs";
  body: string;
  collection: "IndexPage";
  data: InferEntrySchema<"IndexPage">
} & { render(): Render[".mdx"] };
"brand.mdx": {
	id: "brand.mdx";
  slug: "brand";
  body: string;
  collection: "IndexPage";
  data: InferEntrySchema<"IndexPage">
} & { render(): Render[".mdx"] };
"content-1.mdx": {
	id: "content-1.mdx";
  slug: "content-1";
  body: string;
  collection: "IndexPage";
  data: InferEntrySchema<"IndexPage">
} & { render(): Render[".mdx"] };
"content-2.mdx": {
	id: "content-2.mdx";
  slug: "content-2";
  body: string;
  collection: "IndexPage";
  data: InferEntrySchema<"IndexPage">
} & { render(): Render[".mdx"] };
"content-3.mdx": {
	id: "content-3.mdx";
  slug: "content-3";
  body: string;
  collection: "IndexPage";
  data: InferEntrySchema<"IndexPage">
} & { render(): Render[".mdx"] };
"cta.mdx": {
	id: "cta.mdx";
  slug: "cta";
  body: string;
  collection: "IndexPage";
  data: InferEntrySchema<"IndexPage">
} & { render(): Render[".mdx"] };
"facts.mdx": {
	id: "facts.mdx";
  slug: "facts";
  body: string;
  collection: "IndexPage";
  data: InferEntrySchema<"IndexPage">
} & { render(): Render[".mdx"] };
"hero.mdx": {
	id: "hero.mdx";
  slug: "hero";
  body: string;
  collection: "IndexPage";
  data: InferEntrySchema<"IndexPage">
} & { render(): Render[".mdx"] };
"qna.mdx": {
	id: "qna.mdx";
  slug: "qna";
  body: string;
  collection: "IndexPage";
  data: InferEntrySchema<"IndexPage">
} & { render(): Render[".mdx"] };
"testimonial.mdx": {
	id: "testimonial.mdx";
  slug: "testimonial";
  body: string;
  collection: "IndexPage";
  data: InferEntrySchema<"IndexPage">
} & { render(): Render[".mdx"] };
"value-stack.mdx": {
	id: "value-stack.mdx";
  slug: "value-stack";
  body: string;
  collection: "IndexPage";
  data: InferEntrySchema<"IndexPage">
} & { render(): Render[".mdx"] };
"videosection.mdx": {
	id: "videosection.mdx";
  slug: "videosection";
  body: string;
  collection: "IndexPage";
  data: InferEntrySchema<"IndexPage">
} & { render(): Render[".mdx"] };
};
"Pricing": {
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "Pricing";
  data: InferEntrySchema<"Pricing">
} & { render(): Render[".mdx"] };
};
"aboutPage": {
"about-testimonials.mdx": {
	id: "about-testimonials.mdx";
  slug: "about-testimonials";
  body: string;
  collection: "aboutPage";
  data: InferEntrySchema<"aboutPage">
} & { render(): Render[".mdx"] };
"approach.mdx": {
	id: "approach.mdx";
  slug: "approach";
  body: string;
  collection: "aboutPage";
  data: InferEntrySchema<"aboutPage">
} & { render(): Render[".mdx"] };
"contact-cta.mdx": {
	id: "contact-cta.mdx";
  slug: "contact-cta";
  body: string;
  collection: "aboutPage";
  data: InferEntrySchema<"aboutPage">
} & { render(): Render[".mdx"] };
"expertise.mdx": {
	id: "expertise.mdx";
  slug: "expertise";
  body: string;
  collection: "aboutPage";
  data: InferEntrySchema<"aboutPage">
} & { render(): Render[".mdx"] };
"facts.mdx": {
	id: "facts.mdx";
  slug: "facts";
  body: string;
  collection: "aboutPage";
  data: InferEntrySchema<"aboutPage">
} & { render(): Render[".mdx"] };
"features.mdx": {
	id: "features.mdx";
  slug: "features";
  body: string;
  collection: "aboutPage";
  data: InferEntrySchema<"aboutPage">
} & { render(): Render[".mdx"] };
"gallery.mdx": {
	id: "gallery.mdx";
  slug: "gallery";
  body: string;
  collection: "aboutPage";
  data: InferEntrySchema<"aboutPage">
} & { render(): Render[".mdx"] };
"hero.mdx": {
	id: "hero.mdx";
  slug: "hero";
  body: string;
  collection: "aboutPage";
  data: InferEntrySchema<"aboutPage">
} & { render(): Render[".mdx"] };
"story.mdx": {
	id: "story.mdx";
  slug: "story";
  body: string;
  collection: "aboutPage";
  data: InferEntrySchema<"aboutPage">
} & { render(): Render[".mdx"] };
"team.mdx": {
	id: "team.mdx";
  slug: "team";
  body: string;
  collection: "aboutPage";
  data: InferEntrySchema<"aboutPage">
} & { render(): Render[".mdx"] };
};
"blogs": {
"business-storytelling-finance.mdx": {
	id: "business-storytelling-finance.mdx";
  slug: "business-storytelling-finance";
  body: string;
  collection: "blogs";
  data: InferEntrySchema<"blogs">
} & { render(): Render[".mdx"] };
};
"career": {
"career-1.mdx": {
	id: "career-1.mdx";
  slug: "career-1";
  body: string;
  collection: "career";
  data: InferEntrySchema<"career">
} & { render(): Render[".mdx"] };
"career-2.mdx": {
	id: "career-2.mdx";
  slug: "career-2";
  body: string;
  collection: "career";
  data: InferEntrySchema<"career">
} & { render(): Render[".mdx"] };
"career-3.mdx": {
	id: "career-3.mdx";
  slug: "career-3";
  body: string;
  collection: "career";
  data: InferEntrySchema<"career">
} & { render(): Render[".mdx"] };
};
"comingSoon": {
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "comingSoon";
  data: InferEntrySchema<"comingSoon">
} & { render(): Render[".mdx"] };
};
"contact": {
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "contact";
  data: InferEntrySchema<"contact">
} & { render(): Render[".mdx"] };
};
"notFound": {
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "notFound";
  data: InferEntrySchema<"notFound">
} & { render(): Render[".mdx"] };
};
"portfolio": {
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"portfolio-1.mdx": {
	id: "portfolio-1.mdx";
  slug: "portfolio-1";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"portfolio-2.mdx": {
	id: "portfolio-2.mdx";
  slug: "portfolio-2";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"portfolio-3.mdx": {
	id: "portfolio-3.mdx";
  slug: "portfolio-3";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
"portfolio-4.mdx": {
	id: "portfolio-4.mdx";
  slug: "portfolio-4";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".mdx"] };
};
"privacyPolicy": {
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "privacyPolicy";
  data: InferEntrySchema<"privacyPolicy">
} & { render(): Render[".mdx"] };
};
"services": {
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".mdx"] };
"service-1.mdx": {
	id: "service-1.mdx";
  slug: "service-1";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".mdx"] };
"service-2.mdx": {
	id: "service-2.mdx";
  slug: "service-2";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".mdx"] };
"service-3.mdx": {
	id: "service-3.mdx";
  slug: "service-3";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".mdx"] };
"service-4.mdx": {
	id: "service-4.mdx";
  slug: "service-4";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".mdx"] };
"service-5.mdx": {
	id: "service-5.mdx";
  slug: "service-5";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".mdx"] };
"service-6.mdx": {
	id: "service-6.mdx";
  slug: "service-6";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".mdx"] };
};
"site": {
"footer.mdx": {
	id: "footer.mdx";
  slug: "footer";
  body: string;
  collection: "site";
  data: InferEntrySchema<"site">
} & { render(): Render[".mdx"] };
"header.mdx": {
	id: "header.mdx";
  slug: "header";
  body: string;
  collection: "site";
  data: InferEntrySchema<"site">
} & { render(): Render[".mdx"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "site";
  data: InferEntrySchema<"site">
} & { render(): Render[".mdx"] };
"meta.mdx": {
	id: "meta.mdx";
  slug: "meta";
  body: string;
  collection: "site";
  data: InferEntrySchema<"site">
} & { render(): Render[".mdx"] };
};
"successStoriesPage": {
"hero.mdx": {
	id: "hero.mdx";
  slug: "hero";
  body: string;
  collection: "successStoriesPage";
  data: InferEntrySchema<"successStoriesPage">
} & { render(): Render[".mdx"] };
};
"termsCondition": {
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "termsCondition";
  data: InferEntrySchema<"termsCondition">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
