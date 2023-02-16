import React, { useEffect, useState } from 'react'

export default function Subtotal ({data}) { 
       const [price, setPrice] = useState(0)

        useEffect(() => {
            totalAmount()
        }, [])

        function totalAmount(){
            let price = 0;
            data.forEach(element => {
                price+=element.price.cost
            });
            console.log(price)
            setPrice(price)
        }
    
  return (
    <div className="sub_item">
        <h3>Subtotal ({data.length} items):<strong style={{fontWeight:700, color:"#111"}}>{price}₹</strong></h3>
    </div>
  )
}
