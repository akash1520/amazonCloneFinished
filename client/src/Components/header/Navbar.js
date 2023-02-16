import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import './navbar.css'
import { toast, ToastContainer } from 'react-toastify'
import SearchIcon from '@mui/icons-material/Search'
import Avatar from "@mui/material/Avatar"
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import { Drawer, IconButton, MenuItem, Menu } from '@mui/material'
import Rightheader from './Rightheader'
import { useSelector } from 'react-redux'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';



export default function Navbar() {



    const { account, setAccount } = useContext(LoginContext)
    const [dropen, setDropen] = useState(false)
    const navigate = useNavigate();

    // const [account,setAccount]=useState();


    async function navData() {

        const checkRes = await axios.get("/validuser")
        // console.log(checkRes.data.carts)

        if (checkRes.status !== 201) {
            alert("No data available!!")
        } else {
            setAccount(checkRes.data)
        }
    }

    async function logOutUser() {

        const checkRes2 = await axios.get("/logout")
        // console.log(checkRes.data.carts)

        if (checkRes2.status !== 201) {
            alert("No data available!!")
        } else {
            navigate("/")
            toast.success("Logged out successfully", {
                position: "top-center"
            })
            setAccount(false)
        }
    }

    useEffect(() => { navData() }, [account])

    function handleeClose() {
        setDropen(false)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [text, setText] = useState("")
    const [listOpen, setListOpen] = useState(true)

    const products = useSelector((state) => state.product.products)
    console.log(products)

    function getText(items) {
        setText(items)
        setListOpen(false)
    }

    return (
        <header>
            <nav>
                <div className="left">

                    <IconButton className='hamburger' onClick={() => { setDropen(!dropen) }}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>

                    <Drawer open={dropen} onClose={handleeClose}>
                        <Rightheader logclose={handleeClose} logoutuser={logOutUser} />
                    </Drawer>

                    <div className="navlogo">
                        <NavLink to="/"><img src='/amazon_PNG25.png' alt='' /></NavLink>
                    </div>
                    <div className="nav_searchbar">
                        <input type="text" name=""
                            placeholder='Please enter the name of the product'
                            onChange={(e) => getText(e.target.value)}
                            id="" />
                        <div className="search_icon">
                            <SearchIcon id="search" />
                        </div>


                        {/* search filter */}

                        {
                            text &&
                            <List className='extrasearch' hidden={listOpen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem><NavLink to={`getproductsone/${product.id}`} onClick={()=>setListOpen(true)}>{
                                            product.title.longTitle
                                        }</NavLink></ListItem>
                                    ))
                                }
                            </List>
                        }

                    </div>
                </div>
                <div className="right">
                    <div className="nav_btn">
                        <NavLink to="/login">Sign In</NavLink>
                    </div>
                    <div className="cart_btn">
                        {account ? <NavLink to="/buynow">
                            <Badge badgeContent={account.carts.length} color="primary">
                                <ShoppingCartIcon id="icon" />
                            </Badge>
                        </NavLink> :
                            <NavLink to="/login">
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </NavLink>
                        }

                        <ToastContainer />

                        <p>Cart</p>
                    </div>
                    {
                        account ? <Avatar className='avtar2'
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className='avtar'
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick} />
                    }
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            account ? <><MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={() => { handleClose(); logOutUser() }}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />Logout</MenuItem></> : "Login!!"
                        }

                    </Menu>
                </div>
            </nav>
        </header>
    )
}
