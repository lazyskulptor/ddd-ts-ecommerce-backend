export interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export abstract class Entity<T extends IEntity> {
  private readonly _id: string | undefined;
  private _properties: T;
  
  protected constructor(props: T) {
    this._id = props.id;
    this._properties = props;
  }
  
  get id(): string {
    return this._id;
  }
  
  protected get _props(): T {
    this._properties.id = this._id;
    return this._properties;
  }

  protected set _props(props: T) {
    props.createdAt = this._props.createdAt;
    this._props = props;
  }

  get props(): T {
    return this._props;
  }
  
  set props(props: T) {
    this._props = props;
  }

  protected abstract isSameType(v: Entity<T>): v is Entity<T>;
  
  equals (candidate?: Entity<T>) : boolean {
    if (candidate == null || candidate == undefined) {
      return false;
    }
    
    if (this === candidate) {
      return true;
    }
    
    if (!this.isSameType(candidate)) {
      return false;
    }
  
    return String(this._id) === String(candidate._id);
  }
}
