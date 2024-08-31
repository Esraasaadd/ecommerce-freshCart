import React, { useEffect, useState } from "react";
import style from "./CategorieaSlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function CategorieaSlider() {
  let [categories, setCategories] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },]
  };
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((resp) => {
        setCategories(resp.data.data);
      })
      .catch((resp) => {
        console.log(resp);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <h2 className= "m-6 font-semibold text-white bg-gradient-to-l from-gray-400 to-gray-600 lg:w-1/4 text-center rounded-lg py-2 mx-auto">
        Show our popular categories
      </h2>
      <Slider {...settings} className="mb-10">
        {categories.map((category) => (
          <div key={category._id}>
            <Link to={`/ProductsWithCategory/${category.name}`}>
              <img
                src={category.image}
                className="w-full h-[300px] md:h-[200px] object-cover"
                alt=""
              />
              <h4>{category.name}</h4>
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
}
