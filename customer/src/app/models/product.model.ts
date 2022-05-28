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
    warranty: {
        months: number,
        description: string
    },
    createAt: string,
    updateAt: string,
    slug: string,
    __v: number
}

export interface ProductImage {
    label: string,
    url: string,
    type: string
}

export interface ProductDetailsModel {
    _id: string,
    name: string,
    description: string,
    sku: string,
    price: number,
    quantity: number,
    image: string,
    category: CategoryModel,
    galleries: ProductImage[],
    warranty: {
        months: number,
        description: string
    },
    createAt: string,
    updateAt: string,
    slug: string,
    __v: number
}