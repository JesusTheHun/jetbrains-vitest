export class CustomError extends Error {
  public override readonly cause?: unknown;
  public readonly code?: unknown;
  
  constructor(opts: { message?: string; cause?: unknown; code?: number}) {
    super(opts.message);
    this.cause = opts.cause;
    this.code = opts.code;
  }
}
