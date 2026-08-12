import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    coverImage: z.string().optional(),
    coverCredit: z.string().optional(),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    launchDate: z.date(),
    techStack: z.array(z.string()),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    coverImage: z.string().optional(),
  }),
});

const hackathonsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/hackathons" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    location: z.string(),
    winStatus: z.string().optional(),
    techStack: z.array(z.string()),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
  hackathons: hackathonsCollection,
};
