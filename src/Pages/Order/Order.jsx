import React, { useEffect } from 'react'
import { useTitle } from '../../Hooks/useTitle'
import { useLocation, useNavigate } from 'react-router-dom'
import OrderSuccess from './Components/OrderSuccess'
import OrderFail from './Components/OrderFail'


const Order = () => {
    useTitle("Order-Summary")
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state;


useEffect(() => {
    if(!state) {
        navigate("/products", {replace: true})
    }
}, [])

if(!state){
    return null
}

const {status = false, orderData = null, message} = state;
return(
    <main>
       {status ? (
        <OrderSuccess orderData = {orderData}/>
       ):(
        <OrderFail message={message}/>
       )}
    </main>
)
}
export default Order
