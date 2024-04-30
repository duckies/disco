export type Simplify<T> = { [K in keyof T]: T[K] } & {};

export type Constructor<T = any> = abstract new (...args: any[]) => T;
