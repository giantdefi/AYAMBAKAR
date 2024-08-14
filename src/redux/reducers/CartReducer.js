import { createSlice } from '@reduxjs/toolkit'

const initialState = {

   shoppingCart : [],
   totlaPrice : false,
   deliveryCost : false


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
        setTotlaPrice: (state, action) => {
            state.totlaPrice = action.payload
        },
        setDeliveryCost: (state, action) => {
            state.deliveryCost = action.payload
        },
       


        resetCart: () => initialState
    }

})

export const { 

    resetCart, addToCart, setTotlaPrice, deliveryCost, removeCartItem

} = CartSlice.actions

export default CartSlice.reducer
