import { buildEntity, IEntity } from "@/domains/abstract/entity";
import { Photo } from "@/domains/models/photo";

export interface Product extends IEntity {
  _discriminator: 'entity:product';
  name: string;
  price: number;
  productImgs: Photo[];
}

export const createProduct = (ent: Omit<Product, keyof IEntity>): Product => {
  const that = ent as Product;
  return buildProduct(that);
};

export const buildProduct = (ent: Omit<Product, '_discriminator'>): Product => {
  const that = ent as Product;
  that._discriminator = 'entity:product';
  return buildEntity(that);
};

