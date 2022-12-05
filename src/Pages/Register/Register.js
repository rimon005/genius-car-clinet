import React from 'react';
import loginImg from '../../assets/images/login/login.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import SocialLogin from '../Shared/Social/SocialLogin';


const Register = () => {

    const {createUser} = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/"

    const handleRegister = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email , password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            navigate(from , {replace: true})
        })
        .catch(e => console.error(e))
    }
    return (
        <div className="hero w-full mb-12">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left mr-14">
                    <img className='w-4/5' src={loginImg} alt="" />
                </div>
                <form onSubmit={handleRegister} className="card login-card flex-shrink-0 w-full max-w-sm rounded-none bg-base-100">
                    <h1 className="text-3xl text-center mt-2 font-bold">Register now!</h1>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" name='name' required className="input input-bordered rounded-none" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" required name='email' className="input input-bordered rounded-none" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" required placeholder="password" name='password' className="input input-bordered rounded-none" />
                        </div>
                        <div className="form-control mt-6 mb-0">
                            <input className="btn login-btn" type="submit" value="Register" />
                        </div>
                    </div>
                    <p className='text-gray-400 font-medium text-xl text-center mb-4'>Or register with</p>
                    <SocialLogin />
                    <p className='text-gray-400 font-medium text-center mb-4'>Already have an account? <Link to='/login' className='text-orange-600 font-medium'> Login</Link></p>
                </form>

            </div>
        </div>
    );
};

export default Register;