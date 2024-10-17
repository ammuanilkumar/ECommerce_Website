import mongoose from 'mongoose';


 export const connectDB= async() => {

    try {
        await mongoose.connect(process.env.MONGO_URI),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 4500,

            
        }
        console.log('DB connected successfully')

    } catch (error) {
        console.log(error);
        
    }
    
}



//mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })