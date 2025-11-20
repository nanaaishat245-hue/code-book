import React from 'react'
import { Link } from 'react-router-dom';


const DashboardCard = ({order}) => {

    if(!order){
        return null;
    }
    const displayOrderId =
        typeof order.orderId === "string"
           ? order.orderId
              : `ORD-${order.id}`

  return (
    <div className='max-w-4xl m-auto p-4 mb-5 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700'>
        <div className='flex flex-wrap justify-between text-sm m-2 font-bold dark:text-slate-200'>
            <span>Order ID: {displayOrderId}</span>
            <span>Total: ${order.amount_paid}</span>
        </div>

        <div className='flex flex-col gap-4 max-w-4xl m-auto p-2 my-2'>
            {order.cartList?.map((product) => (
              <div key={product.id} className='flex justify-between border-b border-slate-200 dark:border-slate-700 pb-3'>
                <div className='flex'>
                    <Link to={`/products/${product.id}`}>
                        <img
                          src={product.poster}
                          alt={product.name}
                          className='w-24 h-24 object-cover rounded'
                          onError={(event) => {
                            event.currentTarget.src = "https://via.placeholder.com/96x96.png?text=eBook";
                          }}
                        />
                    </Link>

                    <div className='ml-4'>
                        <Link to={`/products/${product.id}`}>
                            <p className='text-lg dark:text-slate-200'>{product.name}</p>
                        </Link>

                        <div className='text-lg mt-1 dark:text-slate-200'>
                            <span>${product.price}</span>                    
                        </div>
                    </div>
                </div>
              </div>
            ))}
        </div>
      
    </div>
  )
}

export default DashboardCard;