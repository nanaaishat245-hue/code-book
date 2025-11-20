
const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case "LOAD_CART":
            return {...state, cartList: payload.products, total: payload.total, loading: false};    


        case "ADD_TO_CART":
            return{...state, cartList: payload.products, total:payload.total, loading: false};
    
        case "REMOVE_FROM_CART":
            return {...state, cartList: payload.products, total:payload.total, loading: false};
        
        case "CLEAR_CART":
            return {...state, cartList: payload.products, total:payload.total, loading: false};

        case "SET_LOADING":
            return {...state, loading:payload};
            
        default:
            throw new Error(`No case found for action type : ${type}`);
    }
}

export {cartReducer}
export default cartReducer;
