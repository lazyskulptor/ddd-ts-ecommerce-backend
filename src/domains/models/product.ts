import { buildEntity, IEntity } from "@/domains/abstract/entity";
import { Photo } from "@/domains/models/photo";

export interface ProductProps extends IEntity {
  _discriminator: 'entity:product';
  name: string;
  price: number;
  productImgs: Photo[];
}

export const createProduct = (ent: Omit<ProductProps, keyof IEntity>): ProductProps => {
  const that = ent as ProductProps;
  return buildProduct(that);
};

export const buildProduct = (ent: Omit<ProductProps, '_discriminator'>): ProductProps => {
  const that = ent as ProductProps;
  that._discriminator = 'entity:product';
  return buildEntity(that);
};

