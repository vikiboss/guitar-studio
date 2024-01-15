export type AnyFunc<T = any> = (...args: T[]) => any | Promise<any>
export type ArrayItem<T> = T extends Array<infer U> ? U : never
export type RemoveReadonly<T> = { -readonly [P in keyof T]: T[P] }
