import React, { useEffect } from 'react'
import './home.css'
import Banner from './Banner'
import Slide from './Slide'
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from '../../features/product/productSlice'



export default function Maincomp() {

    const dispatch = useDispatch()
    const product = useSelector((state) => state.product)
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    return (
        <div>
            <div className="home_section">
                <div className="banner_part">
                    <Banner />
                </div>
                <div className="slide_part">
                    <div className="left_slide">
                        <Slide title="Deal of the Day" products={product.products}/>
                    </div>
                    <div className='right_slide'>
                        <h4>Festive Latest Launches</h4>
                        <img src='https://images-eu.ssl-images-amazon.com/images/G/31/amazonservices/landing/ATFimagery_nov22_230x230._CB620157277_.jpg' alt="" />
                        <a href='/'>See more</a>
                    </div>
                </div>

                <Slide title="Today's Deal" products={product.products}/>
                <div className="center_img">
                    <img src="https://m.media-amazon.com/images/I/71g6i7uFs4L._SX3000_.jpg" alt='' />
                </div>
                <Slide title="Best Seller" products={product.products}/>
                <Slide title="Upto 80% off" products={product.products}/>

            </div>
        </div>
    )
}
