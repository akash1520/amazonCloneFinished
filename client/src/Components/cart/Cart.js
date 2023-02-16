import { Divider } from '@mui/material'
// import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProduct } from '../../features/product/prodSlice'
// import { LoginContext } from '../context/ContextProvider'
import './cart.css'
export default function Cart() {

    const { id } = useParams()
    // console.log(id);

    const navigate=useNavigate("")

    const { product, loading, error } = useSelector((state) => state.productx);
    const dispatch = useDispatch();
    const [prod] = product
    console.log(prod);
    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [dispatch, id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!prod || !Object.keys(prod).length) return (<h3 style={{ paddingTop: "50px" }}>not product info available</h3>)

    //add to cart function
    const addtocart = async (id) => {
        const checkRes = await fetch(`/addcart/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify(prod),
            credentials: "include"
        })
        console.log(checkRes)
        // const data1 = await checkRes.json();
        // console.log((data1 + "front-end data"));

        if (checkRes.status !== 201) {
            alert("No data available!!")
            navigate("/login")
        } else {
            navigate("/buynow")
            alert("Successfully added to the cart!!")
        }
    }

    return (
        <div className='cart_section'>
            <div className="cart_container">
                <div className="left_cart">
                    <img src={prod.detailUrl} alt='cart_image' />
                    <div className="cart_btn">
                        <button className='cart_btn1' onClick={() => addtocart(prod.id)}>Add to Cart</button>
                        <button className='cart_btn2'>Buy Now</button>
                    </div>
                </div>
                <div className="right_cart">
                    <h3>{prod.title.shortTitle}</h3>
                    <h4>{prod.title.longTitle}</h4>
                    <Divider />
                    <p className="mrp">M.R.P.: ₹{prod.price.mrp}</p>
                    <p>Deal of the Day: <span style={{ color: '#B12704' }}>₹{prod.price.cost}</span></p>
                    <p>You Save: <span style={{ color: '#B12704' }}>{prod.price.mrp - prod.price.cost} ({prod.price.discount})</span></p>

                    <div className="discount_box">
                        <h5>Discount: <span style={{ color: '#111' }}>{prod.discount}</span></h5>
                        <h4>Free Delivery: <span style={{ color: '#111', fontWeight: 600 }}>Oct 10-20</span> Details</h4>
                        <p>Fastest Delivery: <span style={{ color: "#111", fontWeight: 600 }}>Tommorow 4 P.M.</span></p>
                    </div>
                    <p className="description">
                        About the Item: <span style={{ color: "#565959", fontSize: 14, fontWeight: 500, letterSpacing: ".5px" }}>{prod.description}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
