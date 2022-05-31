import { addressModel } from "./address.model"
import { ProductModel } from "./product.model"

export interface orderTempModel {
    items:
    {
        productId: string,
        quantity: number
    }[]
    ,
    address: {
        fullName: string,
        phone: string,
        address: string,
        ward: string,
        district: string,
        city: string,
        country: string,
        latitude: number,
        longitude: number,
        isDefault: boolean,
        fullAddress: string
    },
    total: number
}

export interface OrderCreateModel {
    items:
    {
        productId: string,
        quantity: number
    }[]
    ,
    address: {
        fullName: string,
        phone: string,
        address: string,
        ward: string,
        district: string,
        city: string,
        country: string,
        latitude: number,
        longitude: number,
        isDefault: boolean,
        fullAddress: string
    },
    paymentMethodId: string,
    notes: string
}

export interface orderModel {
    _id: string,
    user: string,
    status: string,
    totalPrice: number,
    paymentMethod: string,
    address: {
        fullName: string,
        phone: string,
        address: string,
        ward: string,
        district: string,
        city: string,
        country: string,
        latitude: number,
        longitude: number,
        isDefault: boolean,
        fullAddress: string
    },
    notes: number,
    createdAt: string,
    updatedAt: string
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
    address: addressModel,
    status: string,
    totalPrice: number,
    paymentMethod: string,
    notes: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}
