import React from 'react';
import './Login.css'
import loginImg from '../../assets/images/login/login.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import SocialLogin from '../Shared/Social/SocialLogin';





const Login = () => {

    const {login} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()
    const from = location?.state?.from?.pathname || '/'

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;


        login(email , password )
        .then(result =>{
            const user = result.user;
            console.log(user); 

            const currentUser = {
                email : user?.email
            }
            

            fetch('https://genius-car-server-gamma-murex.vercel.app/jwt' , {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(currentUser)
            })
            .then(res => res.json())
            .then( data => {
                console.log(data);
                localStorage.setItem("genius-token" , data.token);
                navigate(from , {replace : true})
            })
        })
        .catch(e => console.error(e))
    }

    return (
        <div className="hero w-full mb-12">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left mr-14">
                    <img className='w-4/5' src={loginImg} alt="" />
                </div>
                <form onSubmit={handleLogin} className="card login-card flex-shrink-0 w-full max-w-sm rounded-none bg-base-100">
                    <h1 className="text-3xl text-center mt-2 font-bold">Login now!</h1>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" name='email' required className="input input-bordered rounded-none" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="password" name='password' required className="input input-bordered rounded-none" />
                            <label className="label">
                                <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6 mb-0">
                            <input className="btn login-btn" type="submit" value="Login" />
                        </div>
                    </div>
                    <p className='text-gray-400 font-medium text-xl text-center mb-4'>Or Sign In with</p>
                    <SocialLogin></SocialLogin>
                    <p className='text-gray-400 font-medium text-center mb-4'>Have an account? <Link to='/register' className='text-orange-600 font-medium'>Sign In</Link></p>
                </form>

            </div>
        </div>
    );
};

export default Login;