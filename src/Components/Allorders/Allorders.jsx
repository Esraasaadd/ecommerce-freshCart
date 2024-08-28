import React, { useEffect, useState } from "react";
import style from "./Allorders.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Loading from "../Loading/Loading";
import image from '../../assets/images/no-orders2.webp'
import { Link } from "react-router-dom";

export default function Allorders() {
  const token = localStorage.getItem("userToken");
  const { id } = jwtDecode(token);
  let [loading, setLoading] = useState(false);

  let [orders, setOrders] = useState([]);

  async function getOrders(id) {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((resp) => {
        console.log(resp.data);
        setOrders(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    document.title = "My Orders";
  }, []);

  useEffect(() => {
    getOrders(id);
  }, []);
  return (
    <>
      {orders.length > 0 ? (
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="flex items-center w-full justify-center">
                <h1 className="text-3xl text-center font-semibold py-10">
                  Orders History
                </h1>
                <i className="fa-solid fa-cart-shopping fa-2x text-green-600 ms-2"></i>
              </div>
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="lg:m-5 my-10 p-3 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 lg:relative"
                >
                  <h1 className="mb-5 text-green-600 text-xl">
                    Order#{order.id}
                  </h1>
                  {order.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <img
                        src={item.product.imageCover}
                        className="w-36 mx-6"
                        alt=""
                      />
                      <div>
                        <h2 className="lg:text-xl">{item.product.title}</h2>
                        <h2>
                          <span className="font-semibold">count</span> :{" "}
                          {item.count}
                        </h2>
                        <h2>
                          <span className="font-semibold">price</span>:{" "}
                          {item.price}
                        </h2>
                      </div>
                    </div>
                  ))}

                  <div className="lg:flex items-center lg:gap-x-5 lg:absolute end-3 bottom-2">
                    <h2 className="my-2">
                      is Paid :{" "}
                      <span className="bg-green-600 rounded-lg px-2 py-1 text-white">
                        {order.isPaid ? "Yes" : "No"}
                      </span>{" "}
                    </h2>
                    <h2 className="my-2">
                      is Delivered:{" "}
                      <span className="bg-red-600 rounded-lg px-2 py-1 text-white">
                        {" "}
                        {order.isDelivered ? "Yes" : "No"}
                      </span>
                    </h2>
                    <h2>
                      Payment Method Type :{" "}
                      <span className="text-green-700">
                        {order.paymentMethodType}
                      </span>{" "}
                    </h2>
                    <h2>
                      Total Order Price :{" "}
                      <span className="text-green-700">
                        {" "}
                        {order.totalOrderPrice} EGP
                      </span>
                    </h2>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      ) : (
        <>
        <div className="flex-col justify-center items-center mb-10">
          <img src={image} className="w-80 m-auto" alt="" />
          <h2 className="text-center mt-10 text-red-600 font-semibold text-3xl me-10">No orders found</h2>
          <div className="flex gap-x-2 items-center justify-center mt-3">
          <h2 className="text-center text-xl">Start Shopping and discover our great offers</h2>
          <Link to={"/"} className="text-green-500">
                click here
              </Link>
          </div>
        </div>
        
        </>
      )}
    </>
  );
}
