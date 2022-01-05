import { Entity, IEntity } from "@/domains/abstract/entity";

export interface UserProps extends IEntity {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export default class User extends Entity<UserProps> implements UserProps {
  
  constructor(props: UserProps) {
    super('entity:user', props);
  }

  static build(props: Partial<UserProps>): User {
    return new User(props as UserProps);
  }

  reconstitue(): User {
    return new User(this.props);
  }

  get name(): string {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }
  get address(): string {
    return this.props.address;
  }
  set address(address: string) {
    this.props.address = address;
  }
  get phone(): string {
    return this.props.phone;
  }
  set phone(phone: string) {
    this.props.phone = phone;
  }
  get email(): string {
    return this.props.email;
  }
  set email(email: string) {
    this.props.email = email;
  }
}
