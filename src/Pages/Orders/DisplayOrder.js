import React, { useEffect } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

const DisplayOrder = ({ order , handleDelete , handleUpdate}) => {
    const { name, _id, price, serviceName, phone, service , status } = order;
    const [orderService, setOrderService] = useState({})
    useEffect(() => {
        fetch(`https://genius-car-server-gamma-murex.vercel.app/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))
    }, [service]);



    return (
        <tr>
            <th>
                <label onClick={() => handleDelete(_id)}>
                    <XCircleIcon />
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className=" w-16 h-16">
                            {
                                orderService?.img &&
                                <img src={orderService.img} alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />
                <span>Price${price}</span>
            </td>
            <td>Purple</td>
            <th>
                <button 
                onClick={()=> handleUpdate(_id)}
                className="btn btn-ghost btn-xs">{status ? status : 'pending'}</button>
            </th>
        </tr>
    );
};

export default DisplayOrder;