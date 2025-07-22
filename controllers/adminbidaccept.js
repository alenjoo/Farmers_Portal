// controllers/adminbidaccept.js

import db from "../config/db.js";

export const getApprovedProducts = (req, res) => {
  const sql = `
    SELECT products.id, products.*, login.username
    FROM products
    INNER JOIN login ON products.login_id = login.login_id
    WHERE products.approved = true
    AND products.id NOT IN (
      SELECT cart.id
      FROM cart
      WHERE cart.status = 'inactive'
    );
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching approved products:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
};

