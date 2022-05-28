import { CategoryModel } from './category.model';

export interface ProductModel {
    _id: string, 
    name: string,
    description: string,
    sku: string,
    price: number,
    quantity: number,
    image: string,
    category: CategoryModel,
    create_at: string,
    update_at: string,
    slug: string,
    __v: number
}