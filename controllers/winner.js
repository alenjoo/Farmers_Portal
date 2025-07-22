// In your backend route handler file (e.g., winner.js)

import db from "../config/db.js";

export const winnerproduct = (req, res) => {
  const loginId = req.params.loginid;

  const query = `
    SELECT winner.*, products.name, products.image
    FROM winner
    INNER JOIN products ON winner.productid = products.id
    WHERE winner.loginid = ? ;
  `;
  db.query(query, [loginId], (error, results) => {
    if (error) {
      console.error("Error fetching winner data:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("Fetched winner data:", results); // Add this line to log the fetched data
      res.json(results);
    }
  });
};


export const getWinnersDetails = (req, res) => {
  const query = `
    SELECT customer.fullname, customer.username, products.name, products.price
    FROM winner
    INNER JOIN products ON winner.productid = products.id
    INNER JOIN customer ON winner.loginid = customer.login_id;
  `;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching winners details:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
};

export const updateReceivedStatus = (req, res) => {
  const { winnerId } = req.params; 

  
  const query = `
    UPDATE winner
    SET received = 1
    WHERE winnerid = ?
  `;
  db.query(query, [winnerId], (error, result) => {
    if (error) {
      console.error("Error updating received status:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
   
    return res
      .status(200)
      .json({ message: "Received status updated successfully" });
  });
};