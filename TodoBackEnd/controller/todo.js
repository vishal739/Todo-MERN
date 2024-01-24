const model= require("../model/todo");
const Task = model.Task;

exports.create= async (req,res)=>{
    try{
        const userId= req.params.userId;
        const todo= new Task(req.body);
        todo.userId=userId;
        await todo.save();
        res.status(200).send(todo);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
};

exports.readall= async(req,res)=>{
    try{
        const authId= req.authenticated.username;
        const reqId= req.params.userId;
        if(authId === reqId){
            const todo= await Task.find({userId: reqId});
            res.send(todo);
        } else{
            res.sendStatus(401);
        }
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

exports.replace= async (req,res)=>{
    const id= req.params.id;
    try {
        await Task.validate(req.body);

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        );

        res.status(202).json(updatedTask);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

exports.update= async (req,res)=>{
    const id= req.params.id;
    try{
        const todo= await Task.findOneAndUpdate({_id:id}, req.body, {new: true});
        res.status(202).send(todo);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}
exports.delete= async (req,res)=>{
    const id= req.params.id;
    try{
        const todo= await Task.findByIdAndDelete(id);
        res.status(202).send(todo);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

