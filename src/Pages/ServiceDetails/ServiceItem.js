import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

const ServiceItem = ({ ser }) => {
    console.log(ser);
    const { title, _id } = ser;
    return (
        <Link to={`/serviceDetails/${_id}`}>
            <div className='flex items-center btn rounded-none justify-between mb-3  bg-orange-500 text-white hover:bg-orange-600 border-none text-white'>
                <p className='font-bold '>{title}</p>
                <button>
                    <ArrowLongRightIcon className="h-6 w-6" />
                </button>
            </div>
        </Link>
    );
};

export default ServiceItem;