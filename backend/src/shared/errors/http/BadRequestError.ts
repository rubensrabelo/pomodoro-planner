import { AppError } from "../base/AppError";

export type ValidationErrorItem = {
  field: string;
  message: string;
};

export class BadRequestError extends AppError {
  public readonly errors?: ValidationErrorItem[];

  constructor(
    message = "Bad request",
    errors?: ValidationErrorItem[]
  ) {
    super(message, 400);
    this.errors = errors;
  }
}
