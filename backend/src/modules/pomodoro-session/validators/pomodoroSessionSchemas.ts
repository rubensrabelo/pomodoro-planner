import { z } from "zod";

export const createPomodoroSessionRequestSchema = z.object({
  body: z.object({
    startedAt: z.coerce.date({
      message: "startedAt must be a valid date",
    }),

    durationMinutes: z
      .number({ message: "durationMinutes must be a number" })
      .int("durationMinutes must be an integer")
      .positive("durationMinutes must be greater than 0"),

    taskId: z
      .number({ message: "taskId must be a number" })
      .int("taskId must be an integer")
      .positive("taskId must be greater than 0"),
  }),
});

export const updatePomodoroSessionRequestSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a number"),
  }),
  body: z.object({
    startedAt: z.coerce.date().optional(),
    finishedAt: z.coerce.date().nullable().optional(),
    durationMinutes: z.number().int().positive().optional(),
    isCompleted: z.boolean().optional(),
  }),
});

export const completePomodoroSessionRequestSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a number"),
  }),
  body: z.object({
    finishedAt: z.coerce.date({
      message: "finishedAt must be a valid date",
    }),
  }),
});

export const pomodoroSessionIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a number"),
  }),
});

export const taskIdParamSchema = z.object({
  params: z.object({
    taskId: z.string().regex(/^\d+$/, "taskId must be a number"),
  }),
});
