import db from "../config/db.js";

export const addToCart = (req, res) => {
  const { productid, price, loginid } = req.params;

 
  const selectQuery = "SELECT * FROM cart WHERE loginid = ? AND id = ?";
  db.query(selectQuery, [loginid, productid], (selectErr, selectResult) => {
    if (selectErr) {
      console.error("Error checking existing entry in cart:", selectErr);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (selectResult.length > 0) {
     
      return res
        .status(200)
        .json({ message: "You have already bid on this product" });
    }

    
    const insertQuery =
      "INSERT INTO cart (id, price, loginid) VALUES (?, ?, ?)";
    db.query(
      insertQuery,
      [productid, price, loginid],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error adding product to cart:", insertErr);
          return res.status(500).json({ error: "Internal server error" });
        }

        console.log("Product added to cart:", insertResult);

        res.status(200).json({ message: "Product added to cart successfully" });
      }
    );
  });
};

export const updatecartPrice = (req, res) => {
  const { loginid, productid } = req.params;
  const { newPrice } = req.body;

  const sql = "UPDATE cart SET price = ? WHERE loginid = ? AND id = ?";

  db.query(sql, [newPrice, loginid, productid], (err, result) => {
    if (err) {
      console.error("Error updating product price:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Product price updated successfully" });
    }
  });
};

export const getCartProductsByUserId = (req, res) => {
  const loginid = req.params.loginid;
  const sql = `
  SELECT DISTINCT p.*
FROM products p

INNER JOIN bid b ON p.id = b.productid
WHERE b.loginid = ? AND b.interested = 1;

  `;
  db.query(sql, [loginid], (err, results) => {
    if (err) {
      console.error("Error fetching cart products:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
};


export const getProductLoginId = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT p.name, b.price, p.login_id
    FROM products p
    JOIN bid b ON p.id = b.productid
    WHERE p.id = ?
      AND b.interested = 1
    ORDER BY b.price DESC
    LIMIT 1
  `;

  db.query(query, [id], (error, rows) => {
    if (error) {
      console.error("Error fetching product details:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (rows.length > 0) {
      const { name, price,  login_id: loginId } = rows[0];
      res.status(200).json({ name, price, loginId });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
};


export const getStatus = (req,res) =>
{
  const { id } = req.params;

  const query = `
        SELECT status
        FROM cart
        WHERE id = ?
    `;

    db.query(query, [id], (error, rows) => {
        if (error) {
            console.error('Error checking bid status:', error);
            return res.status(500).json({ status: 'error' });
        }

        if (rows.length > 0) {
            const { status } = rows[0];
            res.status(200).json({ status });
        } else {
            res.status(404).json({ status: 'inactive' }); // Assuming if no record found, bid is inactive
        }
    });

};