import React from 'react'
import { useCart } from '../../context'
import { useTitle } from '../../Hooks/useTitle'
import CartEmpty from './Components/CartEmpty'
import CartList from './Components/CartList'


const CartPage = () => {
    const {cartList} = useCart()
    useTitle (`cart (${cartList?.length || 0})`)
  return (
    <div>
      {(cartList?.length || 0) > 0 ? <CartList/> : <CartEmpty/>}
    </div>
  )
}

export default CartPage
