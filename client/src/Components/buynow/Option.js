import axios from 'axios'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'


export default function Option({deleteData,get}) {

  async function removeData(){
    const res = await axios.delete(`/removeCart/${deleteData}`)
    if(res.status===200){
      console.log("cartItem deleted")
      toast.success("Item deleted successfully!!")
      const timer = setTimeout(() => {
        get()
      }, 3000);
      return () => clearTimeout(timer);
    }else{
      
    }
  }

  return (
    <div className='add_remove_select'>
    <select>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
    </select>
    <p style={{cursor:"pointer"}} onClick={()=>{removeData()}}>Delete</p><span>|</span>
    <p className='forremovemedia' style={{cursor:"pointer"}}>Save for Later</p><span>|</span>
    <p className='forremovemedia' style={{cursor:"pointer"}}>See more like this</p>
    <ToastContainer/>
    </div>
  )
}
