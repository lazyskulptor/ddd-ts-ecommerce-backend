import { buildEntity, IEntity } from "@/domains/abstract/entity";

export interface UserProps extends IEntity {
  _discriminator: 'entity:user';
  name: string;
  address: string;
  phone: string;
  email: string;
}

export const buildUser = (ent: Omit<UserProps, '_discriminator'>): UserProps => {
  const that = ent as UserProps;
  that._discriminator = 'entity:user';
  return buildEntity(that);
};

