export type Simplify<T> = { [K in keyof T]: T[K] } & {};

export type Constructor<T = any> = abstract new (...args: any[]) => T;

export type NonPartial<T> = { [ K in keyof Required<T>]: T[K] }

export type IsRequired<T> = T extends { required: true } ? true : false;

export type Module = Record<string, unknown>;