export type PickAsRequiredOrOptional<
  T,
  R extends keyof T,
  O extends keyof T
> = Required<Pick<T, R>> & Partial<Pick<T, O>>;
