import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

const input = {
  id: "1",
};

const product = new Product(input.id, "Product 1", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

let findProductUseCase: FindProductUseCase;

beforeEach(() => {
  findProductUseCase = new FindProductUseCase(MockRepository());
});

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const output = await findProductUseCase.execute(input);

    expect(output).toEqual({
      id: input.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should thrown an error when product not found", async () => {
    const productRepository = MockRepository();

    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const usecase = new FindProductUseCase(productRepository);

    await expect(
      usecase.execute({
        id: "2",
      })
    ).rejects.toThrow("Product not found");
  });
});
