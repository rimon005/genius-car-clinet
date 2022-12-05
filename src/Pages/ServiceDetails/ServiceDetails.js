import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import Facility from './facility';
import './ServiceDetails.css'
import ServiceItem from './ServiceItem';
import image from '../../assets/images/checkout/checkout.png'
import logo from '../../assets/logo.svg'

const ServiceDetails = () => {

    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://genius-car-server-gamma-murex.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, []);
    const service = useLoaderData();
    const { title, _id, price, img, facility, description } = service;
    // console.log(services);
    return (
        <div>
            <div className="carousel-item relative w-full">
                <div className="carousel-img">
                    <img src={image} alt='' className="w-full rounded-xl" />
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-2/4">
                    <h1 className='text-white text-5xl font-bold banner-heading'>
                        Service Details
                    </h1>
                </div>
            </div>
            <div className='service'>
                <div className='p-6'>
                    <img src={img} className="w-full" alt="" />
                    <h1 className='text-4xl my-2 font-bold'>{title}</h1>
                    <p className='text-gray-500 leading-8'>{description}</p>
                    <div className='facility'>
                        {
                            facility.map((fa, uid) => <Facility
                                fa={fa}
                                key={uid}
                            ></Facility>)
                        }
                    </div>
                    <p className='text-gray-500 leading-8 my-4'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                    <h1 className='text-4xl my-2 font-bold'>3 Simple Steps to Process</h1>

                    <p className='text-gray-500 leading-8 my-4'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text</p>
                </div>

                <div className='pt-6'>
                    <div className='bg-gray-300 p-6'>
                        <h1 className='text-2xl font-bold my-4 text-black '>Services</h1>
                        {
                            services.map(ser => <ServiceItem
                                ser={ser}
                                key={ser._id}
                            ></ServiceItem>)
                        }
                    </div>
                    {/* Download section */}
                    <div className='bg-black text-white p-6 my-7 rounded-lg'>
                        <p className='text-2xl mb-4 '>Download</p>
                        <div>
                            <div className='flex justify-between items-center mb-6'>
                                <p>Our Brochure</p>
                                <button className='btn btn-sm bg-orange-500 hover:bg-orange-600 border-none rounded-md'>
                                    <ArrowLongRightIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p>Company Details</p>
                                <button className='btn btn-sm bg-orange-500 hover:bg-orange-600 border-none rounded-md'>
                                    <ArrowLongRightIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Offer section */}

                    <div className='bg-black p-6 rounded-lg pb-14'>
                        <div className='flex justify-center items-center mb-3'>
                            <img src={logo} alt="" />
                        </div>
                        <p className='text-xl text-white text-center mb-4'>Need Help? We Are Here To Help You</p>
                        <div className='bg-white rounded-lg p-4 mn-13 h-32'>
                            <p className='text-black font-extrabold text-center'><span className='font-bold text-orange-600 text-xl'>Car Doctor</span> Special
                                <br />
                                <span className='text-gray-400 '>Save up to</span> <span className='font-bold text-orange-600 text-xl'>60% off</span>
                            </p>

                        </div>
                        <div className='relative'>
                            <button className='btn absolute -bottom-4 left-14 text-white bg-orange-500 hover:bg-orange-600 border-none rounded-md'>
                                Get A Quote
                            </button>
                        </div>
                    </div>



                    <h1 className='text-4xl text-black font-bold my-4'>Price: ${price}</h1>
                    <Link to={`/checkout/${_id}`}>
                        <button className="btn rounded-none my-2 w-full mr-5 bg-orange-500 text-white hover:bg-orange-600 border-none">Proceed Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;