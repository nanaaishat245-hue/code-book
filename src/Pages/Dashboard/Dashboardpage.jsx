import React, { useEffect, useState } from 'react'
import { useTitle } from '../../Hooks/useTitle';
import { getUserOrder } from '../../Services';
import { toast } from 'react-toastify';
import DashboardEmpty from './Components/DashboardEmpty';
import DashboardCard from './Components/DashboardCard';

const Dashboardpage = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false)
    useTitle("Dashboard")

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true)
                const orderData = await getUserOrder();
                setOrders(orderData);
            } catch (error) {
                toast.error(error.message || "Unable to load orders")
                setOrders(false)
            } finally{
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

  return (
    <main>
          <section >
            <p className='text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8'> 
                My Dashboard
                </p>
          </section>

          <section>
            {loading ? (
                <div className='flec justify-center itemss-center py-10'>
                    <div   className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'/>   
                </div>
            ): orders.length ? (
                <div>
                   {orders.map((order) => (
                    <DashboardCard key={order.id} order={order}/>
                   ))}
                </div>
            ): (
                <DashboardEmpty/>
            )}
          </section>
    </main>
  )
}

export default Dashboardpage
