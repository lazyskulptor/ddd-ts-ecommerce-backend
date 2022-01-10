import { buildEntity, IEntity } from "@/domains/abstract/entity";
import { ShoppingCart } from "@/domains/models/shopping-cart";

export const ORDER_STATUS_VALS = ['PENDING_PAYMENT', 'FAILED', 'PAYED', 'SHIPPING', 'ARRIVED', 'CANCELLING', 'CANCELED', 'CONFIRMED'] as const;
export type ORDER_STATUS = typeof ORDER_STATUS_VALS[number];

export interface Order extends IEntity {
  _discriminator: 'entity:order';
  cart: ShoppingCart;
  status: ORDER_STATUS;
}

export const reqOrder = (cart: ShoppingCart): Order => {
  const now = new Date();
  return buildOrder({ cart: cart,
                     status: 'PENDING_PAYMENT',
                      createdAt: now,
                      updatedAt: now,
                      deletedAt: null,
                  } as Order);
};

export const buildOrder = (ent: Omit<Order, '_discriminator'>): Order => {
  const that = ent as Order;
  that._discriminator = 'entity:order';
  return buildEntity(that);
};

