import React from 'react';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import image from '../../assets/images/checkout/checkout.png'

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    // console.log(service);
    const { user } = useContext(AuthContext)
    const handleOrder = event => {
        event.preventDefault()
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`
        const email = user?.email || 'unregistered'
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            name,
            email,
            phone,
            message
        }

        fetch('https://genius-car-server-gamma-murex.vercel.app/orders', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.error(e))
    }
    return (
        <div>
            <div className="carousel-item relative w-full mb-12">
                <div className="carousel-img">
                    <img src={image} alt='' className="w-full rounded-xl" />
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-2/4">
                    <h1 className='text-white text-5xl font-bold banner-heading'>
                        CheckOut
                    </h1>
                </div>
            </div>
            <div className='py-12 bg-gray-200 p-6 mb-12'>
                <form onSubmit={handleOrder}>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        <input name='firstName' type="text" placeholder="First Name" required className="input input-bordered input-accent w-full rounded-none" />
                        <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered input-accent w-full rounded-none" />
                        <input name='phone' type="text" placeholder="Your Phone" required className="input input-bordered input-accent w-full rounded-none" />
                        <input name='email' type="text" placeholder="Email" defaultValue={user?.email} readOnly className="input input-bordered input-accent w-full rounded-none" />
                    </div>
                    <div className='my-5'>
                        <textarea name='message' required className="textarea textarea-warning w-full rounded-none h-48" placeholder="Message"></textarea>
                    </div>
                    <input type="submit" value="Order Confirm" className="btn info-btn rounded-none w-full" />
                </form>
            </div>
        </div>
    );
};

export default Checkout;