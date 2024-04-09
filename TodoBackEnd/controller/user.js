const model= require("../model/user");
const User = model.userModel;


exports.read= async(req,res)=>{
    try{
        const id= req.params.id;
        const user= await User.findOne({ username : id});
        res.send(user);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

exports.replace= async (req,res)=>{
    const id= req.params.id;
    try {
        await User.validate(req.body);

        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        );

        res.status(202).json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

exports.update= async (req,res)=>{
    const id= req.params.id;
    try{
        const user= await User.findOneAndUpdate({_id:id}, req.body, {new: true});
        res.status(202).send(user);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}
exports.delete= async (req,res)=>{
    const id= req.params.id;
    try{
        const user= await User.findByIdAndDelete(id);
        res.status(202).send(user);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

