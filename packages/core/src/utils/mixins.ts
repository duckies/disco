import type { Constructor } from "../types";

export function applyMixins(target: any, constructors: Constructor[]) {
  constructors.forEach((constructor) => {
    Object.getOwnPropertyNames(constructor.prototype).forEach((name) => {
      Object.defineProperty(
        constructor.prototype,
        name,
        Object.getOwnPropertyDescriptor(target.prototype, name) ??
          Object.create(null)
      );
    });
  });
}
