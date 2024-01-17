import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 20);

    await Promise.all([
      productRepository.create(product),
      productRepository.create(product2),
    ]);

    const { products: result } = await usecase.execute();

    expect(result).toHaveLength(2);

    expect(result[0]).toEqual({
      id: expect.any(String),
      name: product.name,
      price: product.price,
    });

    expect(result[1]).toEqual({
      id: expect.any(String),
      name: product2.name,
      price: product2.price,
    });
  });
});
