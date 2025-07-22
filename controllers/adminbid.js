// controllers/product.js

import db from "../config/db.js";

export const getPendingRequests = (req, res) => {
  const sql = `
    SELECT p.id, p.name, p.description, p.price, p.time, p.location, p.image,p.image2, l.username
    FROM products p
    INNER JOIN login l ON p.login_id = l.login_id
    WHERE p.approved = false
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching pending requests:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
};

export const approveRequest = (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE products SET approved = true WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error approving request:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Request approved successfully" });
    }
  });
};
