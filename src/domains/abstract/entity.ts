export interface IEntity {
  id: string;
  _discriminator: Readonly<string>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export abstract class Entity<T extends IEntity> {
  private readonly __discriminator: string;
  readonly _id: string | undefined;
  private _properties: T;
  
  protected constructor(discriminator: string, props: T) {
    this.__discriminator = discriminator;
    props._discriminator = discriminator;
    this._id = props.id;
    this._properties = props;
  }

  abstract reconstitue(): Entity<T>;
  
  get id(): string {
    return this._id;
  }
  get _discriminator(): string {
    return this.__discriminator;
  }
  get createdAt(): Date {
    return this._props.createdAt;
  }
  get updatedAt(): Date {
    return this._props.updatedAt;
  }
  set updatedAt(time: Date) {
    this._props.updatedAt = time;
  }
  get deletedAt(): Date {
    return this._props.deletedAt;
  }
  set deletedAt(time: Date) {
    this._props.updatedAt = time;
  }
  
  protected get _props(): T {
    this._properties.id = this._id;
    return this._properties;
  }

  protected set _props(props: T) {
    props.createdAt = this._props.createdAt;
    this._properties = props;
  }

  get props(): T {
    return this._props;
  }

  equals (candidate?: Entity<T>) : boolean {
    if (candidate === null || candidate === undefined) {
      return false;
    }
    
    if (this === candidate) {
      return true;
    }
    
    if (!(candidate instanceof Entity)) {
      return false;
    }
  
    return String(this._id) === String(candidate._id)
      && this._discriminator === candidate._discriminator;
  }
}

