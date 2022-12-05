import React from 'react';
import './Service.css'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';

const Service = ({ service }) => {
    // console.log(service);
    const { img, price, title , _id } = service
    return (
        <div className="card card-compact bg-base-100 shadow-xl rounded-none p-5">
            <figure className='service-img'><img src={img} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className='flex items-center'>
                    <p className='text-xl font-bold text-orange-600'>Price: $ {price}</p>
                    <Link to={`/serviceDetails/${_id}`}>
                        <button>
                            <ArrowLongRightIcon className="h-6 w-6 text-orange-600" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Service;