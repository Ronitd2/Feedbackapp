import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const signupfunc = async (e) => {
        e.preventDefault();
        setLoad(true);
        const user = {
            email: email,
            password: password,
            name: name
        }
        const response = await fetch("https://feedbackserver-lfek.onrender.com/signup/", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setLoad(false);

        if (data.error == 'user with this email already exists') {
            alert('user with this email already exists');
        }
        if (data.success === 'OK') {
            localStorage.setItem('token', data.token);
            navigate('/')
        }


    }

    return (
        <>
            <div className="flex items-center justify-center h-screen w-screen ">
                <div className=" bg-gray-100 shadow-xl   rounded-3xl p-10 w-[30%]">
                    <h1 className="text-2xl text-center font-semibold">Sign Up</h1>
                    <div className="mt-7">
                        <input onChange={(e) => { setName(e.target.value) }} type="text" id="input-group-1" className="bg-transparent mt-7 border-gray-400 text-gray-500 text-sm  border  border-b-1 border-t-0 border-l-0 border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-[85%] mx-auto   dark:border-gray-600 dark:placeholder-gray-500   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" />
                        <input onChange={(e) => { setEmail(e.target.value) }} type="text" id="input-group-1" className="bg-transparent mt-7 border-gray-400 text-gray-500 text-sm  border  border-b-1 border-t-0 border-l-0 border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-[85%] mx-auto   dark:border-gray-600 dark:placeholder-gray-500   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
                        <input onChange={(e) => { setPassword(e.target.value) }} type="text" id="input-group-1" className="bg-transparent mt-7 border-gray-400 text-gray-500 text-sm  border  border-b-1 border-t-0 border-l-0 border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-[85%] mx-auto   dark:border-gray-600 dark:placeholder-gray-500   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />

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
                            : <button onClick={signupfunc} className="bg-[#5755FE] w-32 h-12 rounded-md  p-2 text-white text-md  ">sign up</button>
                        }
                    </div>


                    <p className=" text-center text-md font-semibold mt-7">already have an account ?<Link to="/login"><span className="text-[#5755FE] text-md font-semibold ml-2">login</span></Link></p>

                </div>
            </div>
        </>
    )
}