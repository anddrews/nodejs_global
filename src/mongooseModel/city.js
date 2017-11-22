import mongoose from 'mongoose';

const citySchemaMongo = new mongoose.Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat:  Number,
        long: Number
    }
});

export const City = mongoose.model('City', citySchemaMongo);