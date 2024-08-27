import mongoose from "mongoose";
const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      image: {
        type: String,
        default:
          "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
      },
      brand: {
        type: String,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      category: {
        type: String,
        trim: true,
      },
      
      rating: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Rating",
        },
      ],
    },
    {
      timestamps: true,
    });




























//     title: {

//         typeof: 'string',
        
//         trim: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//         min: 0,
//     },
//     category: {
//         type: String,
//         trim: true,
//     },
//     brand: {
//         type: String,
//         trim: true,
//     },
//     rating:  [
//         {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Rating",
//         },
//       ],
    
//     image:  {
//         type: String,
//         default:
//           "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
//       },
 //});
    export const Product = mongoose.model('Product', productSchema);


    
    
