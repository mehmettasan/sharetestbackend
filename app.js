import express from "express";
import dotenv from 'dotenv';
import conn from "./db.js"
import authRoute from "./routers/userRoute.js"


const app = express();
dotenv.config();
conn()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);

const port = 3000;
app.listen(port,()=>{
    console.log(`App started On ${port} Port`)
})