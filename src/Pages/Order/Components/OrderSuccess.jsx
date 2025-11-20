import { BiCart, BiCheckCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'


const OrderSuccess = ({orderData}) => {

    const userName = orderData?.user?.name;
const userEmail = orderData?.user?.email;
const orderId = orderData?.orderId;
const displayOrderId = typeof orderId === "string" ? orderId.slice(-8) : "N/A";
const totalAmount = orderData?.amount_paid;
const quantity = orderData?.quantity || 0;

  return (
    <section className='text-xl text-center max-w-4xl m-auto my-10 py-5 dark:text-slate-100 border dark:border-slate-700'>
      <div className='my-5'>
        <p className='text-green-600 text-7xl mb-5'>
            <BiCheckCircle/>
        </p>

        <p>
            Thank You {userName} for the Successful Order!
        </p>
        <p>
            Your Order ID: {displayOrderId}
        </p>
      </div>

      <div className='my-5'>
        <p>Your order is confirmed</p>
         <p className='my-5'>
            items Ordered: {quantity} | total amount: ${totalAmount}
        </p>

        <p>
            please check your email ({userEmail}) for the eBook{quantity > 1 ? `s` : ``} you ordered.
        </p>

        <p className='my-5'>
           payment ID: {orderData?.paymentId || "N/A"}
          </p>
       
      </div>

      <Link
            to="/products"
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5 mb-2 dark:hover:bg-blue-700 dark:bg-blue-600 focus:outline-none inline-flex items-center gap-2'
      >
        Continue Shopping 
        <BiCart/>
      </Link>
    </section>
  )
}

export default OrderSuccess