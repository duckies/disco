import { type ZodObject, type ZodType, z } from "zod";

export function defineEnv<TSchema extends Record<string, ZodType>>(
  schema: TSchema
): z.infer<ZodObject<TSchema>> {
  const result = z.object(schema).safeParse(Bun.env);

  if (!result.success) {
    const errors = result.error.format();
    console.error("Invalid environment variables:", errors);
    throw new Error("Invalid environment variables");
  }

  return result.data;
}
