import React, { useEffect, useState } from 'react'

export default function Right({data}) {

    const [price,setPrice]=useState(0);
    
    useEffect(()=>{
        totalAmount();
        return ()=>totalAmount()
    },[data])

    function totalAmount(){
        let p=0
        data.map((e)=>{
            p=p+e.price.cost
        })
        setPrice(p)
    }

  return (
    <div className='right_buy'>
            <img src='https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png' alt="rightimg" />
            <div className="cost_right">
                <p>Your order is eligible for FREE Delivery.</p><br />
                <span style={{ color: "#565959" }}>Select this option at checkout. Details</span>
                <h3>Subtotal ({data.length} items):<span style={{ fontWeight: 700 }}>₹{price}.00</span></h3>
                <button className='rightbuy_btn'>Process to Buy</button>
                <div className="emi">EMI Available</div>
            </div>
        </div>
  )
}
