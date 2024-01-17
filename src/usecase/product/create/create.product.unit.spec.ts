import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

let createProductUseCase: CreateProductUseCase;

beforeEach(() => {
  createProductUseCase = new CreateProductUseCase(MockRepository());
});

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    await expect(
      createProductUseCase.execute({
        ...input,
        name: "",
      })
    ).rejects.toThrow("Name is required");
  });

  it("should thrown an error when price is missing", async () => {
    await expect(
      createProductUseCase.execute({
        ...input,
        price: -1,
      })
    ).rejects.toThrow("Price must be greater than zero");
  });
});
