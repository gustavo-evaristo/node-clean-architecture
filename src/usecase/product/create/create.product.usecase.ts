import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import Product from "../../../domain/product/entity/product";
import { v4 } from "uuid";

export default class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute({
    name,
    price,
  }: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = new Product(v4(), name, price);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
