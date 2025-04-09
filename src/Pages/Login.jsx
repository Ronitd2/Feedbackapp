import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginfunc = async (e) => {
        e.preventDefault();
        setLoad(true);
        const user = {
            email: email,
            password: password
        }
        const response = await fetch("https://feedbackserver-lfek.onrender.com/login/", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setLoad(false);

        if (data.error == 'invalid credentials') {
            alert('invalid credentials');
        }

        if (data.success === 'OK') {
            localStorage.setItem('token', data.token);
            navigate('/')
        }


    }

    return (
        <>
            <div className="flex items-center justify-center h-screen w-screen ">
                <div className="  bg-gray-100 rounded-3xl p-10 w-[25%] shadow-xl  ">
                    <h1 className="text-2xl text-center text-gray-400 font-semibold">Log In</h1>
                    <div className="mt-7">
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="bg-transparent  border-gray-400 text-gray-500 text-sm  border  border-b-1 border-t-0 border-l-0 border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-[100%] mx-auto  " placeholder="Email" />
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="bg-transparent mt-5 border-gray-400 text-gray-500 text-sm  border  border-b-1 border-t-0 border-l-0 border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-[100%] mx-auto  " placeholder="Password" />

                    </div>
                    <div className="flex items-center justify-center mt-7">
                        {load ? <Loader
                            type="Circles"
                            color="#8576FF"
                            height={40}
                            width={40}
                            radius={30}
                            timeout={4000}
                        />
                            : <button onClick={loginfunc} className="bg-[#5755FE] w-32 h-12 rounded-md  p-2 text-white text-md  ">log in</button>
                        }</div>

                    <p className=" text-center text-gray-400 text-md font-semibold mt-7">don't have an account ?<Link to="/signup"><span className="text-[#5755FE] text-md font-semibold ml-2">sign up</span></Link></p>
                </div>



            </div>

        </>
    )
}