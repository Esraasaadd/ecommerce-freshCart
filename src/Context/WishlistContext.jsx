import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {

    let [wishlist,setWishlist]=useState([])
    let headers={
        token:localStorage.getItem("userToken"),
    }

//fuction to ADD product to wishlist
 async function addToWishlist(productId) {
    await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,         
        {"productId": productId},
        {headers:headers},
    )
    .then((resp)=>{
        toast.success(resp.data.message ,{duration:2000});
        setWishlist(resp.data)        
    })  
    .catch(()=>{})      
  }
  async function removeFromWishlist(productId){
    await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,         
        {headers:headers},
    )
    .then((resp)=>{
      getWishlist()
        toast.success(resp.data.message ,{duration:2000});
    })  
    .catch(()=>{})      
  }

  async function getWishlist(){
    await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
    .then((resp)=>{setWishlist(resp.data)
      setWishlist(resp.data)
    })
    .catch(()=>{})
  }

  return (
    <WishlistContext.Provider value={{ addToWishlist , removeFromWishlist , getWishlist , wishlist}}>
      {children}
    </WishlistContext.Provider>
  );
}
