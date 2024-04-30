import type { Constructor } from "types";

export function Mixin(...constructors: Constructor[]) {
  return function (target: Constructor, ctx: ClassDecoratorContext) {
    if (ctx.kind !== "class") return;

    for (const constructor of constructors) {
      Object.getOwnPropertyNames(constructor.prototype).forEach((name) => {
        Object.defineProperty(
          target.prototype,
          name,
          Object.getOwnPropertyDescriptor(constructor.prototype, name) ??
            Object.create(null)
        );
      });
    }
  };
}
