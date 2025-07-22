import db from "../config/db.js";

export const createMessage = (req, res) => {
  const { loginid, product_id } = req.body;
  const bid_message = "Congratulation you have won the bid"; // Manually provided message

  // Insert the new message into the database
  const sql = `INSERT INTO message (bid_message, loginid, product_id) VALUES (?, ?, ?)`;
  db.query(sql, [bid_message, loginid, product_id], (error, results) => {
    if (error) {
      console.error('Error creating message:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Message created successfully' });
  });
};



export const getMessageByLoginId = (req, res) => {
  const { loginId } = req.params;

  // Query to fetch all bid messages and product ids based on the login ID
  const sql = "SELECT bid_message, product_id FROM message WHERE loginid = ?";
  db.query(sql, [loginId], (error, results) => {
    if (error) {
      console.error("Error fetching messages by login ID:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No messages found for this login ID" });
    }

    // Extract bid messages and product IDs from the query results
    const messages = results.map((result) => ({
      message: result.bid_message,
      productId: result.product_id,
    }));

    // For each product ID, fetch the product name and construct the response
    Promise.all(
      messages.map(async (message) => {
        const { message: bidMessage, productId } = message;

        // Query to fetch the product name based on the product ID
        const getProductSql = "SELECT name FROM products WHERE id = ?";
        const productResult = await new Promise((resolve, reject) => {
          db.query(
            getProductSql,
            [productId],
            (productError, productResult) => {
              if (productError) {
                reject(productError);
              } else {
                resolve(productResult);
              }
            }
          );
        });

        if (productResult.length === 0) {
          // If product not found, return null for product name
          return { bidMessage, productName: null };
        } else {
          const productName = productResult[0].name;
          return { bidMessage, productName };
        }
      })
    )
      .then((messageData) => {
        // Return the message data along with product names
        res.json(messageData);
      })
      .catch((err) => {
        console.error("Error fetching product names:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  });
};


export const createPayment = (req, res) => {
  try {
    const { mode, status, loginId, productId } = req.body;

    // Insert payment details into the payment table
    db.query(
      "INSERT INTO payment (mode, status, loginid, productid) VALUES (?, ?, ?, ?)",
      [mode, status, loginId, productId],
      (error) => {
        if (error) {
          console.error("Error inserting payment details:", error);
          return res.status(500).json({ error: "Internal server error" });
        }

        // Once the payment details are inserted, send a success response
        res
          .status(201)
          .json({ message: "Payment details inserted successfully" });
      }
    );
  } catch (error) {
    console.error("Error inserting payment details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPaymentDetails = (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch payment mode and status from the payment table based on the product ID
    db.query(
      "SELECT mode, status FROM payment WHERE productid = ?",
      [productId],
      (error, results) => {
        if (error) {
          console.error("Error fetching payment details:", error);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length === 0) {
          return res
            .status(404)
            .json({ error: "Payment details not found for this product" });
        }

        const { mode, status } = results[0];

        // Check if status is 1
        if (status === 1) {
          // If status is 1, return success
          res.status(200).json({ mode, status, message: "Payment success" });
        } else {
          // If status is not 1, return failure
          res.status(400).json({ mode, status, error: "Payment failed" });
        }
      }
    );
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};