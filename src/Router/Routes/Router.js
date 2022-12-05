import LoginLayouts from "../../Layouts/LoginLayouts";
import Main from "../../Layouts/Main";
import Checkout from "../../Pages/Checkout/Checkout";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Orders from "../../Pages/Orders/Orders";
import Register from "../../Pages/Register/Register";
import ServiceDetails from "../../Pages/ServiceDetails/ServiceDetails";
import PrivetRoute from "../PrivetRoute/PrivetRoute";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path:'/',
        element: <Main />,
        children: [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/serviceDetails/:id',
                element: <ServiceDetails />,
                loader: ({params}) => fetch(`https://genius-car-server-gamma-murex.vercel.app/services/${params.id}`)
            },
            {
                path:'/checkout/:id',
                element:<PrivetRoute><Checkout /></PrivetRoute>,
                loader: ({params}) => fetch(`https://genius-car-server-gamma-murex.vercel.app/services/${params.id}`)
            },
            {
                path:'/orders',
                element: <PrivetRoute><Orders /></PrivetRoute>
            }
        ]
    },
    {
        path:'/',
        element:<LoginLayouts></LoginLayouts>,
        children:[
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            }
        ]
    }
])

export default router;