// controllers/bidController.js

import db from "../config/db.js";

export const insertBid = (req, res) => {
  try {
    const { loginId, amount } = req.body;
    const productId = req.params.productId; // Get productId from URL parameters

    // Fetch username based on login_id from the login table using a subquery
    db.query(
      "INSERT INTO Bid (loginid, username, productid, price) VALUES (?, (SELECT username FROM login WHERE login_id = ?), ?, ?)",
      [loginId, loginId, productId, amount], // Pass loginId twice to match the subquery
      (error) => {
        if (error) {
          console.error("Error inserting bid details:", error);
          return res.status(500).json({ error: "Internal server error" });
        }

        // Once the bid details are inserted, send a success response
        res.status(201).json({ message: "Bid details inserted successfully" });
      }
    );
  } catch (error) {
    console.error("Error inserting bid details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductBidHistory = (req, res) => {
  try {
    const productId = req.params.productId;

    db.query(
      "SELECT *  FROM Bid WHERE productid = ? order by price desc",
      [productId],
      (error, results) => {
        if (error) {
          console.error("Error fetching product bid history:", error);
          return res.status(500).json({ error: "Internal server error" });
        }

        res.status(200).json(results); // Send bid history as response
      }
    );
  } catch (error) {
    console.error("Error fetching product bid history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





export const updateBidInterestedStatus = (req, res) => {
  const { productId } = req.params;
  const { loginId, interested } = req.body;

  const query = `
    UPDATE bid
    SET interested = ?
    WHERE productid = ? AND loginid = ?
  `;

  db.query(query, [interested, productId, loginId], (error, result) => {
    if (error) {
      console.error("Error updating interested status in bids table:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    res
      .status(200)
      .json({
        message: "Interested status updated successfully in bids table",
      });
  });
};

export const setWinner = (req, res) => {
  const { loginId, productId } = req.body;

  // Check if login ID and product ID are provided
  if (!loginId || !productId) {
    return res
      .status(400)
      .json({ error: "Login ID and Product ID are required" });
  }

  // Fetch username based on login_id from the customer table
  db.query(
    "SELECT username FROM customer WHERE login_id = ?",
    [loginId],
    (error, result) => {
      if (error) {
        console.error("Error fetching username from customer table:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.length === 0) {
        return res
          .status(404)
          .json({ error: "Username not found for this login ID" });
      }

      const username = result[0].username;

      // Insert winner details into the winner table
      db.query(
        "INSERT INTO winner (loginid, productid, username, interested) VALUES (?, ?, ?, 1)",
        [loginId, productId, username],
        (insertError) => {
          if (insertError) {
            console.error("Error inserting winner details:", insertError);
            return res.status(500).json({ error: "Internal server error" });
          }

          // Send success response
          res
            .status(201)
            .json({ message: "Winner details inserted successfully" });
        }
      );
    }
  );
};




export const getWinnerDetails = (req, res) => {
  try {
    const productId = req.params.productId;

    // Fetch the winner's login ID from the winner table based on the product ID
    db.query(
      "SELECT loginid FROM winner WHERE productid = ?",
      [productId],
      async (error, winnerResult) => {
        if (error) {
          console.error("Error fetching winner details:", error);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (winnerResult.length === 0) {
          return res.status(404).json({ error: "Winner not found for this product" });
        }

        const winnerLoginId = winnerResult[0].loginid;

        // Fetch the name and phone number from the customer table based on the login ID
        db.query(
          "SELECT fullname, number FROM customer WHERE login_id = ?",
          [winnerLoginId],
          (error, customerResult) => {
            if (error) {
              console.error("Error fetching customer details:", error);
              return res.status(500).json({ error: "Internal server error" });
            }

            if (customerResult.length === 0) {
              return res.status(404).json({ error: "Customer not found" });
            }

            // Send the winner's details in the response
            const winnerDetails = {
              name: customerResult[0].fullname,
              number: customerResult[0].number
            };

            res.status(200).json(winnerDetails);
          }
        );
      }
    );
  } catch (error) {
    console.error("Error fetching winner details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
