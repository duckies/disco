import type { Constructor } from "../types";

export function applyMixins(target: any, constructors: Constructor[]) {
  for (const constructor of constructors) {
    for (const name of Object.getOwnPropertyNames(constructor.prototype)) {
      Object.defineProperty(
        target.prototype,
        name,
        Object.getOwnPropertyDescriptor(constructor.prototype, name)
        ?? Object.create(null),
      );
    }
  }
}
