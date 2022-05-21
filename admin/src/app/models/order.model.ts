import { ProductModel } from "./product.model"

export interface OrderModel {
    _id: string,
    user: {
        _id: string,
        email: string,
        phone: string,
        hashPassword: string,
        isEmailVerified: boolean,
        isPhoneVerified: boolean,
        firstName: string,
        lastName: string,
        role: string,
        dob: string,
        gender: string,
        status: string,
        createdAt: string,
        updatedAt: string,
        __v: number,
        customerId: string,
        avatar: string,
        cover: string,
        resetPasswordToken: null
    },
    status: string,
    totalPrice: number,
    paymentMethod: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
    __v: 0
}

export interface OrderDetailsModel {
    _id: string,
    user: {
        _id: string,
        email: string,
        phone: string,
        hashPassword: string,
        isEmailVerified: boolean,
        isPhoneVerified: boolean,
        firstName: string,
        lastName: string,
        role: string,
        dob: string,
        gender: string,
        status: string,
        createdAt: string,
        updatedAt: string,
        __v: number,
        customerId: string,
        avatar: string,
        cover: string,
        resetPasswordToken: null
    },
    items: {
        product: ProductModel,
        quantity: number,
        discount: number,
        totalPrice: number,
        totalPriceWithDiscount: number,
        _id: string,
        createdAt: string,
        updatedAt: string
    }[],
    status: string,
    totalPrice: number,
    paymentMethod: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}
