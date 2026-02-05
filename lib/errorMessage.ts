import { ZodError } from "zod";
import { fromError } from "zod-validation-error"


const getErrorMessage = (error: unknown): string => {
  if (error instanceof ZodError) {
    const message = fromError(error);
    if (message) {
      return message.toString();
    }
  } else if (error instanceof Error) {
    return error.message;
  }

  return "Beklenmeyen bir hata oluştu.";
};

export { getErrorMessage };