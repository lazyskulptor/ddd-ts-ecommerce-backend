export interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  // 해당 값을 JSON 타입으로 변환하기 유용하게 하기 위함
  public readonly props: T;
  
  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }
  
  public equals(vo?: ValueObject<T>): boolean {
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
