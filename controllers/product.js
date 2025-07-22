// controllers/product.js

import db from "../config/db.js";


export const updateProductPrice = (req, res) => {
  const { id } = req.params;
  const { newPrice } = req.body;

  const sql = "UPDATE products SET price = ? WHERE id = ?";

  db.query(sql, [newPrice, id], (err, result) => {
    if (err) {
      console.error("Error updating product price:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Product price updated successfully" });
    }
  });
};


export const searchProducts = (req, res) => {
  const query = req.query.query;
  

  const sql = `
    SELECT * 
    FROM products 
    WHERE approved = true 
    AND name LIKE ? and time > now(); 
    
    `; // Add condition for expiration_time

  db.query(sql, [`%${query}%`], (err, results) => {
    if (err) {
      console.error("Error searching products:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
};


export const searchProductsByLocation = (req, res) => {
  const { location } = req.params;
  const { name } = req.params;

  const sql =
    "SELECT * FROM products WHERE approved = true AND location = ? and name =? and time>now()";

  db.query(sql, [location, name], (err, results) => {
    if (err) {
      console.error("Error searching products by location:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
};



export const getProductLoginId = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT name, price, login_id
    FROM products
    WHERE id = ?
  `;

  db.query(query, [id], (error, rows) => {
    if (error) {
      console.error("Error fetching product details:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (rows.length > 0) {
      const { name, price, login_id: loginId } = rows[0];
      res.status(200).json({ name, price, loginId });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
};