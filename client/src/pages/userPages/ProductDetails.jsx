import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
export const ProductDetails = () => {

const [ProductDetails, setProductDetails] = useState ({})
  const {id}= useParams();

  //console.log(id,'====id')
  const fetchProductDetails = async ()=> {
    try {
      const response = await axiosInstance ({
        url: `/product/details/${id}`,
        method: "GET",
        withCredentials: true,
      });
      setProductDetails(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(() => {
  //   fetchProductDetails();
  // }, [])
  useEffect(() => {
    fetchProductDetails();
  }, []);
  return(
    <div>
      ProductDetails
    </div>
  )
}


