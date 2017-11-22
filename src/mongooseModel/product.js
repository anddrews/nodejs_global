import mongoose from 'mongoose';

const productSchemaMongo = new mongoose.Schema({
    id: Number,
    name: String,
    brand: String,
    price: {
        type: Number,
        validate: {
            validator: v => !!parseInt(v),
            message: `{VALUE} is not a valid size value`
        },
        required: true
    },
    options: {
        color: String,
        size: String
        }
});

export const Product = mongoose.model('Product', productSchemaMongo);