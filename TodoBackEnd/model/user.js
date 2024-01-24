const mongoose= require('mongoose');
const { Schema }= mongoose;

const userSchema = new Schema ({
    username: {type: String, required: true, unique: true},
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(v);},
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {type: String, required: true, minLength: 6},
    token: {type: String}
})

exports.userModel= mongoose.model("users",userSchema);