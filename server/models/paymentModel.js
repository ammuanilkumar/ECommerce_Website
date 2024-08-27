import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'],
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },

});

    export const Payment = mongoose.model('Payment', paymentSchema);