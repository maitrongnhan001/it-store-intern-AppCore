import { ProductModel } from "./product.model"

export interface WishCreateModel {
    productId: string,
    notificationMethod: {
        email: boolean,
        sms: boolean,
        pushNotification: boolean
    },
    notificationCondition: {
        minPrice: number,
        maxPrice: number,
        hasPromotion: boolean,
        hasStock: boolean
    }
}

export interface WishEditModel {
    notificationMethod: {
        email: boolean,
        sms: boolean,
        pushNotification: boolean
    },
    notificationCondition: {
        minPrice: number,
        maxPrice: number,
        hasPromotion: boolean,
        hasStock: boolean
    }
}

export interface WishModel {
    _id: string,
    product: ProductModel,
    notificationMethod: {
        email: boolean,
        sms: boolean,
        pushNotification: boolean
    },
    notificationCondition: {
        minPrice: number,
        maxPrice: number,
        hasPromotion: boolean,
        hasStock: boolean
    }
    user: string,
    create_at: string, 
    update_at: string
}