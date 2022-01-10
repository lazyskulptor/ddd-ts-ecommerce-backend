import { buildEntity, IEntity } from "@/domains/abstract/entity";

export interface User extends IEntity {
  _discriminator: 'entity:user';
  name: string;
  address: string;
  phone: string;
  email: string;
}

export const buildUser = (ent: Omit<User, '_discriminator'>): User => {
  const that = ent as User;
  that._discriminator = 'entity:user';
  return buildEntity(that);
};

