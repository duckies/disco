import type { Constructor } from "../types";

export function applyMixins(target: any, constructors: Constructor[]) {
  constructors.forEach((constructor) => {
    Object.getOwnPropertyNames(constructor.prototype).forEach((name) => {
      Object.defineProperty(
        target.prototype,
        name,
        Object.getOwnPropertyDescriptor(constructor.prototype, name) ??
          Object.create(null)
      );
    });
  });
}
