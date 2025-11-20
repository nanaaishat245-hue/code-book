import CartList from "../Pages/Cart/Components/CartList";
import { createId, delay, mockDatabase } from "./mockDatabase";

const generateOrderId = () => `ORD-${Math.random().toString(36).slice(2,8).toUpperCase()}`
const generatePaymentId = () => `PAY-${Math.random().toString(36).slice(2,10).toUpperCase()}`


const ensureUser = () => {
    const user = mockDatabase.getActiveUser();
    if(!user){
        throw new Error("please login to place an order")
    }
    return user;
}

const resolveCartList = (cartItems) => {
    if(Array.isArray(cartItems) && cartItems.length){

        return cartItems;
}
const ids = mockDatabase.getCartItems();
const products = mockDatabase.getProducts();

return ids 
.map((id) => products.find((item) => item.id === id))
.filter(Boolean)
}

const placeOrder = async (cartItems) => {
    const user = ensureUser();
    const cartList = resolveCartList(cartItems);
    
    if(!cartList.length) {
        throw new Error("Cart is empty")
    }

    const amountPaid = Number(
        cartList.reduce((sum, item) => sum + Number(item.price || 0), 0).toFixed(2)
    );

    const newOrder = {
        id: createId(),
        orderId: generateOrderId(),
        paymentId: generatePaymentId(),
        quantity: cartList.length,
        amount_paid: amountPaid,
        createdAt: new Date().toISOString(),
        cartList,
        user:{
        id: user.id,
        name: user.name,
        email: user.email
        },
        userId: user.id
    };

    const orders = mockDatabase.getOrders()
    mockDatabase.saveOrders([newOrder, ...orders]);
    mockDatabase.saveCartItems([]);

    return delay(newOrder);
}

const getUserOrder = async () => {
    const user = ensureUser();
    const orders = mockDatabase
    .getOrders()
    .filter((order) => order.userId === user.id);
    return delay(orders)

}

const getOrderById = async (orderId) => {
    if(!orderId){
        throw new Error("order id is required")
    }

    const orders = mockDatabase.getOrders();
    const order = orders.find(
        (entry) => entry.id === Number(orderId) || entry.orderId === orderId
    );

    if(!order) {
        throw new Error("order not found");
    }

    return delay(order)
}

const orderService = {
   placeOrder,
   getUserOrder,
   getOrderById
}

export default orderService;