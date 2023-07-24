import mongoose from "mongoose";
import 'dotenv/config'
mongoose.set('strictQuery', true);
const conn = () => {
  mongoose
    .connect(process.env.db_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected Successfuly"))
    .catch((err) => console.log(`${err}`));
};

export default conn;
