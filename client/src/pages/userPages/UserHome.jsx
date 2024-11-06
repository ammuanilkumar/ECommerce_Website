import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from "../../redux/features/counterSlice";
export const UserHome = () => {

  const {value} = useSelector((state) => state.counter);
  const dispatch = useDispatch()

  console.log('count===', value);

  return (
    <div className="px-20">
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sunt
        maiores sapiente nesciunt, adipisci eum officia perferendis sequi.
        Magnam natus omnis iste laudantium atque explicabo nobis, corrupti
        reiciendis voluptas odit?
      </h1>
      <div className="flex gap-3 my-5">

        <button onClick={()=>dispatch(decrement())} className="btn btn-primary">-</button>
        <p>{value}</p>
        <button onClick={()=>dispatch(increment())}className="btn btn-primary">+</button>

      </div>
    </div>
  );
};






