import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product = new Product("1", "Product 1", 10);
const product2 = new Product("2", "Product 2", 20);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

let listProductUseCase: ListProductUseCase;

beforeEach(() => {
  listProductUseCase = new ListProductUseCase(MockRepository());
});

describe("Unit test list product use case", () => {
  it("should list a product", async () => {
    const { products: output } = await listProductUseCase.execute();

    expect(output).toHaveLength(2);

    expect(output[0]).toEqual({
      id: expect.any(String),
      name: product.name,
      price: product.price,
    });

    expect(output[1]).toEqual({
      id: expect.any(String),
      name: product2.name,
      price: product2.price,
    });
  });
});
