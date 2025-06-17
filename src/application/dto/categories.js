import { z } from "zod";

export const createCategoryDto = z.object({
  name: z.string(),
});