import { z } from "zod";

export const createTaskRequestSchema = z.object({
  body: z.object({
    title: z
      .string({ message: "title must be a string" })
      .min(2, "title must have at least 2 characters")
      .max(100, "title must have at most 100 characters"),

    description: z
      .string({ message: "description must be a string" })
      .min(2)
      .max(250),

    estimatedPomodoros: z
      .number({ message: "estimatedPomodoros must be a number" })
      .int("estimatedPomodoros must be an integer")
      .positive("estimatedPomodoros must be greater than 0"),

    startedAt: z.coerce.date({
      message: "startedAt must be a valid date",
    }),

    finishedAt: z.coerce.date().nullable().optional(),

    status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),

    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  }),
})

export const updateTaskRequestSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a number"),
  }),
  body: z.object({
    title: z.string().min(2).max(100).optional(),
    description: z.string().min(2).max(500).optional(),
    estimatedPomodoros: z.number().int().positive().optional(),
    startedAt: z.coerce.date().optional(),
    finishedAt: z.coerce.date().nullable().optional(),
    status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  }),
})

export const taskIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a number"),
  }),
})
