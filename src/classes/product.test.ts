import { Product } from './product';

const createSut = (name: string, price: number) => {
  return new Product(name, price);
};

describe('Product', () => {
  afterEach(() => jest.clearAllMocks());

  test('Should have properties name and price', () => {
    const sut = createSut('Camiseta', 59.9);
    expect(sut).toHaveProperty('name', 'Camiseta');
    expect(sut.price).toBeCloseTo(59.9);
  });
});
