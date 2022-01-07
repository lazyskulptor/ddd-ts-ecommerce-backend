import { buildEntity, IEntity } from "@/domains/abstract/entity";
import { ShoppingCartProps } from "@/domains/models/shopping-cart";

export const ORDER_STATUS_VALS = ['PENDING_PAYMENT', 'FAILED', 'PAYED', 'SHIPPING', 'ARRIVED', 'CANCELLING', 'CANCELED', 'CONFIRMED'] as const;
export type ORDER_STATUS = typeof ORDER_STATUS_VALS[number];

export interface OrderProps extends IEntity {
  _discriminator: 'entity:order';
  cart: ShoppingCartProps;
  status: ORDER_STATUS;
}

export const reqOrder = (cart: ShoppingCartProps): OrderProps => {
  const now = new Date();
  return buildOrder({ cart: cart,
                     status: 'PENDING_PAYMENT',
                      createdAt: now,
                      updatedAt: now,
                      deletedAt: null,
                  } as OrderProps);
};

export const buildOrder = (ent: Omit<OrderProps, '_discriminator'>): OrderProps => {
  const that = ent as OrderProps;
  that._discriminator = 'entity:order';
  return buildEntity(that);
};

