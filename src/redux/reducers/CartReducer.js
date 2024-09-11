import { createSlice } from '@reduxjs/toolkit'

const initialState = {

   shoppingCart : [],
   totlaPrice : false,
   deliveryCost : false,

   selectedItem : false,


}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {

           const itemIndex = state.shoppingCart.findIndex((item) => item.pid === action.payload.pid)
           
           if(itemIndex >= 0 ){
            state.shoppingCart[itemIndex].quantity += 1
           }else{
            const temPCart = {...action.payload, quantity : 1}
            state.shoppingCart.push(temPCart)
           }
        },
        removeCartItem (state, action) {
         const newshoppingCart = state.shoppingCart.filter(
            (elm) => elm.pid !== action.payload.pid
         )
         state.shoppingCart = newshoppingCart

        },
        decreaseQuantity(state, action) {
            const itemIndex = state.shoppingCart.findIndex((item) => item.pid === action.payload.pid)

            if(state.shoppingCart[itemIndex].quantity >= 1 ){
                state.shoppingCart[itemIndex].quantity -= 1
               }else if(state.shoppingCart[itemIndex].quantity === 0){                const newshoppingCart = state.shoppingCart.filter(
                    (elm) => elm.pid !== action.payload.pid
                 )
                 state.shoppingCart = newshoppingCart
               }

        },
        increaseQuantity(state, action) {
            const itemIndex = state.shoppingCart.findIndex((item) => item.pid === action.payload.pid)
           
            if(itemIndex >= 0 ){
             state.shoppingCart[itemIndex].quantity += 1
            }else{
             const temPCart = {...action.payload, quantity : 1}
             state.shoppingCart.push(temPCart)
            }

        },
        setTotlaPrice: (state, action) => {
            state.totlaPrice = action.payload
        },
        setDeliveryCost: (state, action) => {
            state.deliveryCost = action.payload
        },
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload
        },
       


        resetCart: () => initialState
    }

})

export const { 

    resetCart, addToCart, setTotlaPrice, deliveryCost, removeCartItem, decreaseQuantity, increaseQuantity, setSelectedItem

} = CartSlice.actions

export default CartSlice.reducer
