import { ValueObject, ValueObjectProps } from "@/domains/abstract/value-object";

export interface PhotoProps extends ValueObjectProps {
  uri: string
  displayName: string
  size: [x: number, y: number]
}

export class Photo extends ValueObject<PhotoProps> implements PhotoProps {

  static build(props: Partial<PhotoProps>): Photo {
    return new Photo(props as PhotoProps);
  }

  get uri(): string {
    return this.props.uri;
  }
  get displayName(): string {
    return this.props.displayName;
  }
  get size(): [x: number, y: number] {
    return this.props.size;
  }
}

