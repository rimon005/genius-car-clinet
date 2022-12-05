import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import DisplayOrder from './DisplayOrder';

const Orders = () => {
    const { user , logOut} = useContext(AuthContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`https://genius-car-server-gamma-murex.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization : `Bearer ${localStorage.getItem("genius-token")}`
            }
        })
            .then(res => {
                if(res.status === 401 || res.status === 403){
                    return logOut()
                }
                return res.json()

            })
            .then(data => {
                // console.log(data);
                setOrders(data)
            })
            .catch(e => console.error(e))
    }, [user?.email , logOut]);

    const handleDelete = id => {
        const proceed = window.confirm("Are you sure, you want to cancel this order")
        if (proceed) {
            fetch(`https://genius-car-server-gamma-murex.vercel.app/orders/${id}`, {
                method:"DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert("Successfully deleted the order.");
                        const remaining = orders.filter(odr => odr._id !== id);
                        setOrders(remaining)
                      } 
                })
        }
    }

    const handleUpdate = id => {
        fetch(`https://genius-car-server-gamma-murex.vercel.app/orders/${id}`, {
                method:"PATCH", 
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify({status : "Approved"})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.modifiedCount > 0){
                    const remaining = orders.filter( odr => odr._id !== id);
                    const approving = orders.find( odr => odr._id === id);
                    approving.status = "Approved";
                    const updatedItem = [...remaining , approving];
                    setOrders(updatedItem)
                }
            })
    }


    return (
        <div className="overflow-x-auto w-full py-16">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map( order => <DisplayOrder
                        key={order._id}
                        order={order}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                        ></DisplayOrder>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Orders;