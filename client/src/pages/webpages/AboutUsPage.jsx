import React from 'react';

export const AboutUsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg mb-6">
          Welcome to our e-commerce platform! We are dedicated to providing the best products and services to our customers. Our mission is to offer quality and value through our extensive range of products. Whether you're looking for the latest trends or classic essentials, we have something for everyone.
        </p>
        <p className="text-gray-600 text-lg mb-6">
          Our team is passionate about curating a diverse selection of items that meet the needs of our community. We believe in transparency, quality, and customer satisfaction, and we strive to exceed your expectations with every interaction.
        </p>
        <p className="text-gray-600 text-lg mb-6">
          Thank you for choosing us as your trusted shopping destination. We look forward to serving you and making your experience with us a memorable one.
        </p>
        <div className="mt-8">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};


