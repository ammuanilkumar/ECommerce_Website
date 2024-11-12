// import React from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { decrement, increment } from "../../redux/features/counterSlice";

// export const UserHome = () => {
//   const { value } = useSelector((state) => state.counter);
//   const dispatch = useDispatch();

//   return (
//     <div
//       className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-5 py-10"
//       style={{ backgroundImage: 'url("/images/user-home-bg.jpg")' }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
//       {/* Welcome Message */}
//       <section className="text-center mb-10 relative z-10 text-white">
//         <h1 className="text-4xl font-bold">Welcome to Our Store!</h1>
//         <p className="text-lg mt-3">
//           Discover our exclusive collection and enjoy shopping with special offers!
//         </p>
//       </section>

//       {/* Counter Section */}
//       <div className="relative z-10 bg-white shadow-md rounded-lg p-5 text-center w-full max-w-md bg-opacity-90">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-5">Exclusive Offers Counter</h2>
//         <div className="flex justify-center items-center gap-4">
//           <button
//             onClick={() => dispatch(decrement())}
//             className="btn btn-primary px-5 py-2 font-semibold text-lg"
//           >
//             -
//           </button>
//           <span className="text-2xl font-bold">{value}</span>
//           <button
//             onClick={() => dispatch(increment())}
//             className="btn btn-primary px-5 py-2 font-semibold text-lg"
//           >
//             +
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// import React from "react";
// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from "../../redux/features/counterSlice";
// export const UserHome = () => {

//   const {value} = useSelector((state) => state.counter);
//   const dispatch = useDispatch()

//   console.log('count===', value);

//   return (
//     <div className="px-20">
      
//       <h1>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sunt
//         maiores sapiente nesciunt, adipisci eum officia perferendis sequi.
//         Magnam natus omnis iste laudantium atque explicabo nobis, corrupti
//         reiciendis voluptas odit?
//       </h1>
//       <div className="flex gap-3 my-5">

//         <button onClick={()=>dispatch(decrement())} className="btn btn-primary">-</button>
//         <p>{value}</p>
//         <button onClick={()=>dispatch(increment())}className="btn btn-primary">+</button>

//       </div>
//     </div>
//   );
// // };
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from "../../redux/features/counterSlice";

export const UserHome = () => {
  const { value } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-5 py-10">
      
      {/* Welcome Message */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Store!</h1>
        <p className="text-lg text-gray-600 mt-3">
          Discover our exclusive collection and enjoy shopping with special offers!
        </p>
      </section>

      {/* Counter Section */}
      <div className="bg-white shadow-md rounded-lg p-5 text-center w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-5">Exclusive Offers Counter</h2>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => dispatch(decrement())}
            className="btn btn-primary px-5 py-2 font-semibold text-lg"
          >
            -
          </button>
          <span className="text-2xl font-bold">{value}</span>
          <button
            onClick={() => dispatch(increment())}
            className="btn btn-primary px-5 py-2 font-semibold text-lg"
          >
            +
          </button>
        </div>
      </div>

    </div>
  );
};






