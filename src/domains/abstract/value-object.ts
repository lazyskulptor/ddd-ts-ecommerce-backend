import { Entity } from "@/domains/abstract/entity";

export interface ValueObjectProps {
  [index: string]: any;  // eslint-disable-line @typescript-eslint/no-explicit-any
}

export abstract class ValueObject<T extends ValueObjectProps> {
  // 해당 값을 JSON 타입으로 변환하기 유용하게 하기 위함
  // This is useful to convert JSON propertites
  readonly props: T;
  
  protected constructor(props: T) {
    this.props = props;
    Object.freeze(this.props);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const freeze = (e: any) => {
      if(typeof e === 'object' && !(e instanceof Entity)) {
        Object.values(e).forEach(freeze);
        Object.freeze(e);
      }
    };
    freeze(this.props);
  }

  prototype(): T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clone = (e: any) => {
      const obj = Array.isArray(e) ? [] : {};
      Object.keys(e).forEach(k => {
        if (e[k] && typeof e[k] === 'object') {
          obj[k] = (e[k] instanceof Entity)?
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (e[k] as Entity<any>).reconstitue() : clone(e[k]);
        } else {
          obj[k] = e[k];
        }
      });
      return obj;
    };
    return clone(this.props) as T;
  }

  equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return shallowEqual(this.props, vo.props);
  }
}

const shallowEqual = (object1: ValueObjectProps, object2: ValueObjectProps) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  
  return true;
};
