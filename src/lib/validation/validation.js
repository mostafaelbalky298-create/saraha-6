import { z } from "zod";
import { AppError } from "../../pkg/error/error.js";

export function validateBody(dto, body) {
  const result = z.safeParse(dto, body);

  if (result.success === false) {
    const errorMessages = result.error.issues.map(
      (issue) => `${issue.path[0]}: ${issue.message}`
    );

    throw new AppError(errorMessages.join(", "), 400);
  }

  return result.data;
}