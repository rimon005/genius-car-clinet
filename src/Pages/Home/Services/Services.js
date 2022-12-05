import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Service from './Service';

const Services = () => {
    
    const [services, setServices] = useState([]);

    const [isAsc , setIsAsc] = useState(true);

    const [search , setSearch] = useState('')

    const searchRef = useRef()

    useEffect(() => {
        fetch(`http://localhost:5000/services?search=${search}&order=${isAsc ? 'asc' : 'dsc'}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [isAsc , search]);

    const handleSearch = () => {
        setSearch(searchRef.current.value);
    }

    return (
        <div>
            <div className='text-center w-3/5 m-auto py-8'>
                <p className="text-2xl font-bold text-orange-600"> Services</p>
                <h1 className='text-5xl font-semibold my-4 '>Our Service Area</h1>
                <p className='text-gray-500 font-normal '>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                <input ref={searchRef} type="text" placeholder="Type here" className="input input-bordered rounded-none input-warning w-full max-w-xs mr-5" /> 
                <button onClick={handleSearch} className="btn info-btn rounded-none mr-5">Search</button>
                <button className="btn btn-outline services-btn rounded-none mt-4" onClick={() => setIsAsc(!isAsc)}>{isAsc ? 'dsc' : 'asc'}</button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map(service => <Service
                        key={service._id}
                        service={service}
                    ></Service>)
                }
            </div>
            <div className='flex justify-center my-6'>
                <button className="btn btn-outline services-btn rounded-none">More Services</button>
            </div>
        </div>
    );
};

export default Services;