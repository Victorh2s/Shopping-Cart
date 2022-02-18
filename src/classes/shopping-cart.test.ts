import { ShoppingCart } from './shopping-cart';
import { Discount } from './discount';
import { CartItem } from './interfaces/cart-item';

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
};

const createSutWithProducts = () => {
  const { sut, discountMock } = createSut();
  const cartItem1 = createCartItem('Camiseta', 40);
  const cartItem2 = createCartItem('caneca', 15);
  sut.addItem(cartItem1);
  sut.addItem(cartItem2);
  return { sut, discountMock };
};

const createCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }
  return new CartItemMock(name, price);
};

describe('ShoppingCart', () => {
  afterEach(() => jest.clearAllMocks());

  test('Should be an empy cart when no product is added', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  test('Should have 2 cart items', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
  });

  test('Should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProducts();
    expect(sut.total()).toBe(55);
    expect(sut.totalWithDiscount()).toBe(55);
  });

  test('Should add products and clear cart', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  test('Should remove products', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
  });
  test('Should call discount.calculate(price) when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  test('Should call discount.calculate with totalPrice when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});
