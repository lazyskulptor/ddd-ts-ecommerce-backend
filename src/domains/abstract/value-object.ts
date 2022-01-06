import { Entity } from "@/domains/abstract/entity";

export interface ValueObject {
  [index: string]: any;  // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const buildVO = <T extends ValueObject>(v: T): T => {
  freeze(v);
  return v;
};

export const prototype = <T extends ValueObject>(v: T): T => deepClone(v) as T;

export const clone = <T extends ValueObject>(v: T): T => buildVO(prototype(v));

export const equals = <T>(v1: T, v2: T): boolean => deepEquals(v1, v2);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const freeze = (v: any): any => {
  if(typeof v === 'object' && !(v instanceof Entity)) {
    Object.values(v).forEach(freeze);
    Object.freeze(v);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepClone = (e: any): any => {
  const obj = Array.isArray(e) ? [] : {};
  Object.keys(e).forEach(k => {
    if (e[k] && typeof e[k] === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      obj[k] = (e[k] instanceof Entity)?
        (e[k] as Entity<any>).reconstitue() : prototype(e[k]);
    } else {
      obj[k] = e[k];
    }
  });
  return obj;
};


export const deepEquals = <T extends ValueObject>(v1: T, v2:T): boolean => {
  if (!v1 || !v2) {
    return false;
  }

  const keys1 = Object.keys(v1);
  const keys2 = Object.keys(v2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  for (const key of keys1) {
    if ((typeof v1[key] === 'object') && (typeof v1[key] === 'object')) {
      if (!deepEquals(v1, v2)) return false;
    } else if (v1[key] !== v2[key]) {
      return false;
    }
  }
  
  return true;
};

