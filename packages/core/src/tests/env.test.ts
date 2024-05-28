import { describe, expect, spyOn, test } from "bun:test";
import { z } from "zod";
import { defineEnv } from "../utils/define-env";

describe("env.ts", () => {
  test("ignore undefined vars", () => {
    process.env.example = "test";
    process.env.ignore = "apple";

    const env = defineEnv({
      example: z.string(),
    });

    expect(env).toEqual({ example: "test" });
    // @ts-expect-error Checking for value that should be missing.
    expect(env.ignore).toBeUndefined();
    expect(process.env.ignore).toBe("apple");
  });

  test("throw error on missing env vars", () => {
    process.env.token = "abc123";

    const warn = spyOn(console, "error").mockImplementationOnce(() => {});

    try {
      defineEnv({
        nottoken: z.string(),
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect(warn).toHaveBeenCalledTimes(1);
  });
});
