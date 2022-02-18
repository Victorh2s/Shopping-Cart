import { IndividualCustomer, EnterpriseCustomer } from './customer';

const createIndividualCustomer = (
  firstName: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseCustomer = (
  name: string,
  cnpj: string,
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

describe('IndividualCustomer', () => {
  afterEach(() => jest.clearAllMocks());

  test('Should have firstname,lastnem and cpf', () => {
    const sut = createIndividualCustomer('Maria', 'joaquina', '123456789');
    expect(sut).toHaveProperty('firstName', 'Maria');
    expect(sut).toHaveProperty('lastName', 'joaquina');
    expect(sut).toHaveProperty('cpf', '123456789');
  });

  test('Should have methods to get name and idn', () => {
    const sut = createIndividualCustomer('Maria', 'joaquina', '123456789');
    expect(sut.getName()).toBe('Maria joaquina');
    expect(sut.getIDN()).toBe('123456789');
  });
});

describe('EnterpriseCustomer', () => {
  afterEach(() => jest.clearAllMocks());

  test('Should have name and cnpj', () => {
    const sut = createEnterpriseCustomer('HelpU', '123456789');
    expect(sut).toHaveProperty('name', 'HelpU');
    expect(sut).toHaveProperty('cnpj', '123456789');
  });

  test('Should have methods to get name and idn', () => {
    const sut = createEnterpriseCustomer('HelpU', '123456789');
    expect(sut.getName()).toBe('HelpU');
    expect(sut.getIDN()).toBe('123456789');
  });
});
