import { defineCollection, z } from 'astro:content';

const indexPageCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    services: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      features: z.array(z.string()).optional(),
      cta: z.object({
        text: z.string(),
        link: z.string().optional()
      }).optional()
    })).optional(),
    bottomCta: z.object({
      title: z.string(),
      description: z.string().optional(),
      button: z.object({
        text: z.string(),
        link: z.string().optional()
      }).optional()
    }).optional()
  })
});

export const collections = {
  IndexPage: indexPageCollection,
};