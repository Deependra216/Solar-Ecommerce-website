//it is our main container
const initialState={
    cart:{},   
    user:{}
}

export default function RootReducer(state=initialState,actions){
    switch(actions.type)
    {
        case 'ADD_CART':
            state.cart[actions.payload[0]]=actions.payload[1]
            console.log("cart data",state.cart)
            return {cart:state.cart,user:state.user}

        case 'DELETE_CART':
            delete state.cart[actions.payload[0]]
            console.log(state.cart)
            return {cart:state.cart,user:state.user}

        case 'ADD_USER':
            state.user[actions.payload[0]]=actions.payload[1]
            console.log("userrrrrrrrr",state.user) 
            return {cart:state.cart,user:state.user}

        case 'DELETE_USER':
            delete state.cart[actions.payload[0]]
            console.log("userrrrr",state.user)
            return {cart:state.cart,user:state.user}
                
        default:
            return {cart:state.cart,user:state.user}


    }

}