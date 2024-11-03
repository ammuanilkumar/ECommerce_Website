// import mongoose from 'mongoose';


//  export const connectDB= async() => {

//     try {
//         await mongoose.connect(process.env.MONGO_URI),{
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             serverSelectionTimeoutMS: 4500,

            
//         }
//         console.log('DB connected successfully')

//     } catch (error) {
//         console.log(error);
        
//     }
    
// }
// import mongoose from 'mongoose';

// export const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             serverSelectionTimeoutMS: 4500,
//         });
//         console.log('DB connected successfully');
//     } catch (error) {
//         console.log('Error connecting to DB:', error);
//     }
// };

import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 4500,   
        });
        console.log('DB connected successfully');
    } catch (error) {
        console.log('Error connecting to DB:', error);
    }
};


//mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })