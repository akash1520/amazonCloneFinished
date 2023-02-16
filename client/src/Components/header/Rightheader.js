import React, { useContext, useState } from 'react'
import "./rightheader.css"
import  Avatar from '@mui/material/Avatar'
import { LoginContext } from '../context/ContextProvider'
import { NavLink } from 'react-router-dom'
import { Divider } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';


export default function Rightheader({logclose,logoutuser}) {

  const  {account,setAccount} = useContext(LoginContext)

  return (
    <div>
          <div className="rightheader">
            <div className="right_nav">
              {
                account ? <Avatar className='avtar2'>{account.fname[0].toUpperCase()}</Avatar>:
                  <Avatar className='avtar'></Avatar>
              }
              {
                account?<h3>Hellooo, {account.fname.toUpperCase()}</h3>:
                ""
              }
            </div>
            <div className='nav_btn' onClick={()=>logclose()}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">Shop By category</NavLink>

                <Divider style={{width:"100%",marginLeft:"-20px"}}/>

                <NavLink to="/">Today's Deal</NavLink>
                {
                  account?  <NavLink to="/buynow">Your orders</NavLink> : <NavLink to="/login">Your orders</NavLink>
                }
                <Divider style={{width:"100%",marginLeft:"-20px"}}/>
                <div className='flag'>
                  <NavLink to="/">Settings</NavLink>
                  <img src='/india.png' style={{width:"35px", height:"30px", marginLeft:"5px"}} alt=''/>
                </div>

                {
                  account?
                  (<div className="flag">
                  <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />
                  <h3 onClick={()=>logoutuser()} style={{cursor:"pointer",fontWeight:500}}>Logout</h3>
                  </div>):(<div className="flag">
                        <NavLink to="/login">Sign In</NavLink>
                    </div>)
                }
            </div>
          </div>
    </div>
  )
}
