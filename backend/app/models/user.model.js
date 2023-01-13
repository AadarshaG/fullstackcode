const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ['Male','Female','Other']
    },
    nationality:{
        type: String,
        default: "Nepali"
    },
    date_of_birth: Date,
    is_admin: Boolean,
    image: String
    
},{
    timestamps: true
});

const User = mongoose.model('User', UserSchema);


module.exports = User;