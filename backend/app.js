import express from "express";
import cors from "cors"
import userRoute from "./routes/userRoute.js"
import { config } from "dotenv";
import connectdb from "./config/connectdb.js"
import cookie from "cookie-parser";

const app = express();
config();
connectdb();

app.use(cors())
app.use(express.json());
app.use(cookie());

app.get('/', (req, res) => {
    res.send("Api is working..");
})

app.use('/api/v1', userRoute);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server started on port ${PORT}`));