import React from 'react'

const OrderDetails = () => {

    const order ={
        id: '#123456',
    date: 'October 10, 2024',
    status: 'Delivered',
    total: '$99.99',
    shippingAddress: '1234 Elm Street, Springfield, USA',
    paymentMethod: 'Credit Card (**** **** **** 1234)',
    items: [
      {
        name: 'Product 1',
        quantity: 2,
        price: '$29.99',
      },
      {
        name: 'Product 2',
        quantity: 1,
        price: '$39.99',
      },
    ],
  };

    
  return (
//     // <div className="container mx-auto p-4 min-h-screen bg-gray-100 py-10 flex justify-center">
//     //      <div>
//     //   <h1 className="text-2xl font-bold mb-4">Order Details</h1>
//     //   {/* Display specific order details here */}
//     //   <p>Order ID: #123456</p>
//     //   <p>Status: Delivered</p>
//     //   <p>Total: $49.99</p>
//     //   {/* Additional order information */}
//     //   </div>
//     // </div>
<div className="min-h-screen bg-gray-100 py-10 flex justify-center">
<div className="container mx-auto max-w-4xl bg-white p-8 shadow-lg rounded-lg">
  {/* Order Header */}
  <h1 className="text-3xl font-bold mb-4">Order Details</h1>
  <div className="flex justify-between mb-6">
    <div>
      <p className="text-gray-700"><strong>Order ID:</strong> {order.id}</p>
      <p className="text-gray-700"><strong>Date:</strong> {order.date}</p>
      <p className="text-gray-700"><strong>Status:</strong> <span className="badge badge-success">{order.status}</span></p>
    </div>
    <div className="text-right">
      <p className="text-gray-700"><strong>Total:</strong> {order.total}</p>
      <p className="text-gray-700"><strong>Payment Method:</strong> {order.paymentMethod}</p>
    </div>
  </div>

  {/* Shipping Information */}
  <div className="bg-base-200 p-4 rounded-lg mb-6">
    <h2 className="text-xl font-semibold mb-3">Shipping Information</h2>
    <p className="text-gray-700"><strong>Shipping Address:</strong> {order.shippingAddress}</p>
  </div>

  {/* Items Purchased */}
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-3">Items Purchased</h2>
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Order Actions */}
  <div className="flex justify-end space-x-4">
    <button className="btn btn-outline btn-secondary">Reorder</button>
    <button className="btn btn-primary">Download Invoice</button>
  </div>
</div>
</div>

)
}

export default OrderDetails
