import mongoose from 'mongoose';

const userSchemaMongo = new mongoose.Schema({
    userName: String,
    lastName: String,
    password: String
    
});

export const User = mongoose.model('User', userSchemaMongo);