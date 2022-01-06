import { buildVO, prototype, ValueObject } from "@/domains/abstract/value-object";
import Product from "@/domains/models/product";
import Order from "@/domains/models/order";

export interface ShoppingCartProps extends ValueObject {
  products: Product[];
  totalPrice: number;
}

const validateShoppingCart = (v?: ShoppingCartProps) => {
  const that = v ?? {} as ShoppingCartProps;
  that.products = that.products ?? [];
  that.totalPrice = that.totalPrice ?? 0;
  return that;
};

export const buildShoppingCart = (v?: ShoppingCartProps) => {
  const param = validateShoppingCart(v);
  return buildVO(param);
};

export const add = (v: ShoppingCartProps, ...products: Product[]): ShoppingCartProps => {
  const props = prototype(v);
  props.products.push(...products);
  props.totalPrice = Order.calTotalPrice(props.products);
  return buildShoppingCart(props);
};

export const remove = (v: ShoppingCartProps, ...products: Product[]) => {
  const props = prototype(v);
  products.forEach(e => {
    const index = props.products.findIndex(ee => ee._id === e._id);
    props.products.splice(index, 1);
  });
  props.totalPrice = Order.calTotalPrice(props.products);
  return buildShoppingCart(props);
};
  
