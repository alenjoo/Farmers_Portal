import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import db from "../config/db.js";


const router = express.Router();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});


  

  router.post("/orders/:price", async (req, res) => {
    const {price} =req.params;
  try {
    const options = {
      amount: price*100, // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occurred");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post("/success", async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    // Use orderCreationId directly from the request body
    const order_id = orderCreationId;

    // Create HMAC object with SHA-256 algorithm and HMAC secret
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

    // Update HMAC object with concatenated order_id and razorpayPaymentId
    shasum.update(`${order_id}|${razorpayPaymentId}`);

    // Compute the HMAC digest as a hexadecimal string
    const digest = shasum.digest("hex");

    // Compare the computed digest with the provided signature
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    // If the signature is valid, send success response with order and payment IDs
    res.json({
      msg: "Order Placed Successfully",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    // Handle any errors and send an error response
    console.error("Error processing payment success:", error);
    res.status(500).send(error.message);
  }
});



router.get("/farmers/:loginId", (req, res) => {
  const loginId = req.params.loginId;

  // Query to fetch farmer details based on loginId
  const farmerQuery = "SELECT fullname FROM farmer WHERE login_id = ?";

  db.query(farmerQuery, [loginId], (error, farmerResults) => {
    if (error) {
      console.error("Error fetching farmer details:", error);
      return res.status(500).send("Internal server error");
    }

    if (!farmerResults || farmerResults.length === 0) {
      return res.status(404).json({ error: "Farmer not found." });
    }

    const farmerData = farmerResults[0];

    res.json(farmerData);
  });
});


export default router;