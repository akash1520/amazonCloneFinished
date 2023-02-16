import { Divider } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './buynow.css'
import Option from './Option'
import Right from './Right'
import Subtotal from './Subtotal'

export default function Buynow() {

  const [cartData, setCartData] = useState("")
  console.log(cartData)

  const getBuyData = async () => {
    const res = (await axios.get("/cartdetails")).data
    console.log(res)
    setCartData(res.carts)
  }

  useEffect(() => { getBuyData() }, [])



  if (cartData.length) {
    return (
      <div className='buynow_section'>
        <div className="buynow_container">
          <div className="left_buy">
            <h1>Shopping Cart</h1>
            <p>Select all items</p>
            <span className="leftbuyprice">Price</span>
            <Divider />

            {/* mapping cart data */}

            {
              cartData.map((e, k) => {
                {/* console.log(e._id) */}
                return (
                  <>
                    <div className="item_container">
                      <img src={e.detailUrl} alt='' />
                      <div className="item_details">
                        <h3>{e.title.longTitle}</h3>
                        <h3>{e.title.shortTitle}</h3>
                        <h3 className='differentprice'>{e.price.cost}₹</h3>
                        <p className='unusuall'>Usually dispatched in 5 days</p>
                        <p>Eligble for free Shipping</p>
                        <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt='' />
                        <Option deleteData={e._id} get={getBuyData} />
                      </div>
                      <h3 className="item_price">{e.price.cost}₹</h3>
                    </div>
                    <Divider />

                  </>
                )
              })
            }

            <Divider />
            <Subtotal data={cartData} />
          </div>
          <Right data={cartData}/>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <div className='buynow_section'>
          <div className="buynow_container">
            <h1>No items in the cart!!!</h1>
          </div>
        </div>
      </>
    )
  }
}
