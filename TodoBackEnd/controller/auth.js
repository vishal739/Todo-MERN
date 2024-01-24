const fs= require('fs');
const path= require('path');
const model= require("../model/user");
const User = model.userModel;
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');

const privateKey= fs.readFileSync(path.resolve(__dirname,"../private.pem"),'utf-8');
exports.signup= async (req,res)=>{
    try{
        var token = jwt.sign({ username : req.body.username }, privateKey, { algorithm: 'RS256' });
        const user= new User(req.body);
        const hash = bcrypt.hashSync(user.password, 10);
        user.token=token;
        user.password=hash;
        await user.save();
        res.status(200).send(user);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    console.log("isAuth: ", isAuth);
    if (isAuth) {
      var token = jwt.sign({ username : doc.username }, privateKey, {
        algorithm: 'RS256',
      });
      doc.token = token;
      await doc.save();
      console.log("token started ", token, "end");
      res.send({token: doc.token, username: doc.username});
    }else{
        res.sendStatus(401);
    }
  } catch (err) {
    res.status(401).json(err);
  }

};