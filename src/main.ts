import { ShoppingCart } from './classes/shopping-cart';
import { Order } from './classes/order';
import { Messaging } from './services/messaging';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { EnterpriseCustomer } from './classes/customer';
// import { FiftyPercentDiscount } from './classes/interfaces/discount';
import { TenPercentDiscount } from './classes/discount';
// import { NoDiscount } from './classes/interfaces/discount';

// const fiftyPercentDiscount = new FiftyPercentDiscount();
const tenPercentDiscount = new TenPercentDiscount();
// const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(tenPercentDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
// const individualCustomer = new IndividualCustomer(
//   'Victor',
//   'Henrique',
//   '12121212212-12',
// );
const enterpriseCustomer = new EnterpriseCustomer('Victor', '15151515151');

const order = new Order(
  shoppingCart,
  messaging,
  persistency,
  // individualCustomer,
  enterpriseCustomer,
);

shoppingCart.addItem(new Product('Camisa', 49.91));
shoppingCart.addItem(new Product('Tênis', 50.0));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.oderStatus);
order.checkout();
console.log(order.oderStatus);
