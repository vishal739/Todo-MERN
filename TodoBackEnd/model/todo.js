const mongoose= require('mongoose');
const { Schema }= mongoose;

const taskSchema = new Schema({
    task : {type: String, required: true},
    status :{type: String, required: true},
    date: {type: Date, default: Date.now},
    userId: {type: String,required: true}
});

exports.Task= mongoose.model('tasks',taskSchema);
