export default class FormSyntaxError extends Error{
  private reason: { [field: string]: string[] };
  
  constructor(field: string, ...reasons: string[]) {
    super(`Validation failed on ${field}`);
    Object.setPrototypeOf(this, FormSyntaxError.prototype);
    
    this.reason = {};
    this.reason[field] = reasons;
  }
  
  get reasons() {
    return this.reason;
  }
}