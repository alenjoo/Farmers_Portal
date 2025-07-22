import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./config/db.js";
import registerRoutes from "./routes/register.js";
import loginRoutes from "./routes/login.js";
import uploadRoutes from "./routes/upload.js";
import productRoutes from "./routes/product.js";
import displayRouter from "./routes/display.js";
import cartRoutes from "./routes/cartController.js"; 
import adminbidRoutes from "./routes/adminbid.js";
import adminbidacceptRoutes  from "./routes/adminbidaccept.js";
import { getUsers } from "./controllers/users.js";
import bidRoutes from "./routes/bidtable.js";
import admincart from "./routes/admincart.js";
import profileRoutes from"./routes/profile.js";
import addressRoutes from "./routes/address.js";
import paymentRoutes from "./routes/payment.js";
import accountRoutes from "./routes/account.js";
import messageRoutes from "./routes/message.js";
import winnerRoute from "./routes/winner.js";
import complainRoute from "./routes/complain.js";
import schemeRoute from "./routes/scheme.js";
import applyRoute from "./routes/apply.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.json({ extended: false }));



app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/upload", uploadRoutes);
app.use("/products", productRoutes);
app.use("/display", displayRouter);
app.use("/cart", cartRoutes); 
app.use("/pending-requests",adminbidRoutes);
app.get('/approved-products',adminbidacceptRoutes );
app.get("/users", getUsers);
app.use("/bids", bidRoutes);
app.use("/admin-cart", admincart);
app.use("/profile",profileRoutes);
app.use("/address",addressRoutes);
app.use("/payment", paymentRoutes);
app.use("/account",accountRoutes);
app.use("/message",messageRoutes);
app.use("/winner",winnerRoute);
app.use("/complain",complainRoute);
app.use("/scheme",schemeRoute);
app.use("/apply", applyRoute);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
