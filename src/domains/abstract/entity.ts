import FormSyntaxError from "@/domains/errors/FormSyntaxError";

export interface IEntity {
  readonly id: string;
  _discriminator: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export const buildEntity = <T extends IEntity>(ent: T): T => {
  if (!isEntity(ent))
    throw new FormSyntaxError('Not Valid Entity. Entity must have _discriminator by Type');

  return {
    ...ent,
    createdAt: ent.createdAt ?? new Date(),
    updatedAt: ent.updatedAt ?? ent.createdAt,
    deletedAt: ent.deletedAt ?? null,
  };
};

export const equals = <T extends IEntity>(e1: T, e2: T): boolean => {
  return shallowEquals(e1, e2);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const areEntity = (...ents: IEntity[]): boolean => !ents.find(e => !isEntity(e));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEntity = (ent: IEntity): ent is IEntity => {
  return '_discriminator' in ent;
};

const shallowEquals = <T extends IEntity>(e1: T, e2: T): boolean => {
  if (!e1 || !e2)
    return false;

  if (!areEntity(e1, e2) || e1._discriminator !== e2._discriminator)
    return false;

  if (areEntity(e1, e2))
    return e1 === e2 || e1.id === e2.id;

  return false;
};

