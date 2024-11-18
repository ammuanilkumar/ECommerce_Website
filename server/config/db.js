

import mongoose from 'mongoose';

export const connectDB = async () => {
    //  const url = 'mongodb+srv://ammupa41:4pqwEdbliyL7Zry2@cluster0.zkwdf.mongodb.net/Ecommerce_website2'
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