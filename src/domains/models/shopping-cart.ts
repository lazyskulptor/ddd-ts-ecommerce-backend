import { buildVO, prototype, ValueObject } from "@/domains/abstract/value-object";
import { Product } from "@/domains/models/product";

export interface ShoppingCart extends ValueObject {
  products: Product[];
  totalPrice: number;
}

const validateShoppingCart = (v?: ShoppingCart) => {
  const that = v ?? {} as ShoppingCart;
  that.products = that.products ?? [];
  that.totalPrice = that.totalPrice ?? 0;
  return that;
};

export const buildShoppingCart = (v?: ShoppingCart): ShoppingCart => {
  const param = validateShoppingCart(v);
  return buildVO(param);
};

export const add = (v: ShoppingCart, ...products: Product[]): ShoppingCart => {
  const props = prototype(v);
  props.products.push(...products);
  props.totalPrice = calTotalPrice(props.products);
  return buildShoppingCart(props);
};

export const remove = (v: ShoppingCart, ...products: Product[]): ShoppingCart => {
  const props = prototype(v);
  products.forEach(e => {
    const index = props.products.findIndex(ee => ee.id === e.id);
    props.products.splice(index, 1);
  });
  props.totalPrice = calTotalPrice(props.products);
  return buildShoppingCart(props);
};
  
const calTotalPrice = (products: Product[]): number =>
    products.reduce((sum, curr) => sum + curr?.price ?? 0, 0);
