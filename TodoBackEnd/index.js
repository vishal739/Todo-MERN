const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const fs= require('fs');
const path=require('path');
const mongoose = require('mongoose');
const TodoRouter = require("./routes/todo");
const UserRouter = require("./routes/user");
const AuthRouter = require("./routes/auth");
const publicKey= fs.readFileSync(path.resolve(__dirname,"./public.pem"),'utf-8');

require('dotenv').config();

const server = express();

const auth= (req, res, next) => {
    try {
        // console.log(req.get("Authorization"));
        const token = req.get("Authorization").split("Bearer ")[1];
        console.log(token);
        var decoded = jwt.verify(token, publicKey);
        console.log(decoded)
        if (decoded.username) {
            req.authenticated= decoded;
            next();
        } else {
            res.sendStatus(401);
        }
    }catch(err){
        res.sendStatus(401);
    }
};
server.use(cors());
server.use(morgan('combined'));
server.use(express.json());
server.get('/', (req, res) => {
    res.send("API connected successfully");
});
server.use('/auth',AuthRouter.authRouter);
server.use('/tasks',auth,TodoRouter.todoRoutes);
server.use('/profile',auth, UserRouter.UserRoutes);

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.TODODB_URL);
    console.log('database connected');
}

server.listen(8000, () => {
    console.log("server Started ");
})