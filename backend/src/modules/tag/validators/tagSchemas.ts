import { z } from "zod";

export const createTagRequestSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: "name must be a string",
      })
      .nonempty("name is required")
      .min(2, "name must have at least 2 characters")
      .max(50, "name must have at most 50 characters"),
  }),
});

export const tagIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a number"),
  }),
});

export const updateTagRequestSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a number"),
  }),
});
