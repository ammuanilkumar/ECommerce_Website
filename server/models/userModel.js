
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
    },
   
    profile: {
      type: String,
      default:
        "https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png",
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist",
      },
    ],
    productId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", userSchema);





// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//     {
//         name:{
//             type: String,
//             required: true,
            
//         },
//         email:{
//             type: String,
//             required: true,
//             unique: true,
//             lowercase: true
            
//         },
//         password:{
//             type: String,
//             required: true,
//             minlength: 8
            
//         },
//         phone:{
//             type: String,
//             required: true,
//         },
//         // address: {
//         //     street: { type: String, required: true },
//         //     city: { type: String, required: true },
//         //     state: { type: String, required: true },
//         //     country: { type: String, required: true },
//         // },
//         cart: [
//             {
//                 productId: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: 'Product',
//                     required: true,
//                 },
//                 quantity: {
//                     type: Number,
//                     required: true,
//                     default: 1,
//                 },
//             },
//         ],
//         wishlist: [
//             {
//               type: mongoose.Schema.Types.ObjectId,
//               ref: "Wishlist",
//             },
//           ],
//           profile: {
//             type: String,
//             default:
//               "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
//           },



//         orders: [
//             {
//                 orderId: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: 'Order',
//                     required: true,
//                 },
//                 status: {
//                     type: String,
//                     required: true,
//                     default: 'Pending',
//                 },
//                 amount: {
//                     type: Number,
//                     required: true,
//                 },
//                 date: {
//                     type: Date,
//                     default: Date.now,
//                 },
//             },
//         ],
//     });


//     export const User = mongoose.model('User', userSchema);


        

        


