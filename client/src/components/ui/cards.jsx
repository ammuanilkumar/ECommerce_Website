import React from 'react'
import {Link} from 'react-router-dom'
export const ProductCards = ({product}) => {
  return (
    
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={product?.image}
      alt="product" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{product.title}</h2>
    <p>{product?.description}</p>
    <div className="card-actions justify-end">
      <Link to={`/user/product-details/${product._id}`}> <button className="btn btn-primary">Details</button>
      </Link>
    
    </div>
  </div>
</div>
  )
}

export default ProductCards;
