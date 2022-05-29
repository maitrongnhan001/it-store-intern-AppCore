import { Injectable } from "@angular/core";
import { CartItemModel } from "../models/cart.model";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart: CartItemModel[] = []

    constructor() {
        const cartTemp = localStorage.getItem('cart')
        
        if (cartTemp) {
            this.cart = JSON.parse(cartTemp)
        }
    }

    addCartItem(cartItem: CartItemModel) {
        const cartArrTemp = [...this.cart]

        const indexCartItemExist = cartArrTemp.findIndex(element => element.productId === cartItem.productId)

        if (indexCartItemExist != -1) {
            cartArrTemp[indexCartItemExist].quantity++
        } else {
            cartArrTemp.push(cartItem)
        }

        this.cart = cartArrTemp

        this.storeCart()
    }

    subQuantityCartItem(productId: String) {
        const index = this.cart.findIndex(element => element.productId === productId)

        if (index != -1) {
            if (this.cart[index].quantity == 1) 
                return {
                    status: false,
                    msg: 'Quantity must gather than 0'
                }
            this.cart[index].quantity--
            this.storeCart()
            return {
                status: true,
                msg: "Success"
            }
        }

        return {
            status: false,
            msg: "Don't find object"
        }
    }

    removeCartItem(productId: String) {
        const start = this.cart.findIndex(element => element.productId === productId)
        
        this.cart.splice(start, 1)

        this.storeCart()
    } 

    getAll(): CartItemModel[] {
        return this.cart
    }

    storeCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }
}