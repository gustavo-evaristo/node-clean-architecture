import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<OutputListProductDto> {
    const data = await this.productRepository.findAll();

    const products = data.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
    }));

    return { products };
  }
}
