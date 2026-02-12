import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/BadRequest";

export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = result.error.issues.map(issue => ({
        field: issue.path.at(-1)?.toString() ?? "unknown",
        message: issue.message,
      }));

      throw new BadRequestError("Validation error", errors);
    }

    next();
  };
}
