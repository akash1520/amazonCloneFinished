import axios from 'axios';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUp() {
    const initialState = {
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    }
    const [userData, setUserData] = useState(initialState)
    // console.log(userData)
    function addData(e) {
        const { name, value } = e.target;
        setUserData(() => {
            return {
                ...userData,
                [name]: value
            }
        })
    }
    const sendData = async (e) => {
        e.preventDefault();
        const res = await
            axios
                .post("/register", userData)
                .then((response)=>{
                        toast.success("Signed up successfully",{
                            position:"top-center"
                        })
                        // alert("Signed up successfully")
                        setUserData(initialState)
                })
                .catch(error=>{
                    toast.error(`${error.response.statusText} : Try again with proper details `,{
                        position:"top-center"
                    });
                })

    }



    return (
        <>
            <section>
                <div className="sign_container">
                    <div className="sign_header">
                        <img src='/blacklogoamazon.png' alt='amazonlogo' />
                    </div>
                    <ToastContainer/>
                    <div className="sign_form">
                        <form method='POST'>
                            <h1>Sign Up</h1>
                            <div className="form_data">
                                <label htmlFor='fname'>
                                    Your Name
                                </label>
                                <input type="text" onChange={addData} value={userData.fname} name='fname' id='fname' />
                            </div>
                            <div className="form_data">
                                <label htmlFor='email'>
                                    Email
                                </label>
                                <input type="email" onChange={addData} value={userData.email} name='email' id='email' />
                            </div>
                            <div className="form_data">
                                <label htmlFor='number'>
                                    Mobile Number
                                </label>
                                <input type="tel" onChange={addData} value={userData.mobile} name='mobile' id='mobile' />
                            </div>
                            <div className="form_data">
                                <label htmlFor='password'>
                                    Password
                                </label>
                                <input type="password" placeholder='At least 6 character' onChange={addData} value={userData.password} name='password' id='password' />
                            </div>
                            <div className="form_data">
                                <label htmlFor='cpassword'>
                                    Confirm Password
                                </label>
                                <input type="password" onChange={addData} value={userData.cpassword} name='cpassword' id='cpassword' />
                            </div>
                            <button className='signin_btn' onClick={sendData}>Continue</button>

                            <div className="signin_info">
                                <p>Already have an account?</p>
                                <NavLink to="/login">Sign in</NavLink>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
