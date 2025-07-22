
import db from "../config/db.js";

export const updateCartStatus = (req, res) => {

  db.query("SELECT id, time FROM products", (error, products) => {
    if (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    products.forEach((product) => {
      
      db.query(
        "UPDATE cart SET status = 'inactive' WHERE id = ? AND status = 'active' AND ? >= ?",
        [product.id, new Date(), product.time],
        (updateError, result) => {
          if (updateError) {
            console.error("Error updating cart status:", updateError);
            return res.status(500).json({ error: "Internal server error" });
          }
        }
      );
    });

    res.status(200).json({ message: "Status updated successfully" });
  });
};






export const handleViewResult = (req, res) => {
  const { loginId, productId } = req.params;

  db.query(
    "SELECT status FROM cart WHERE loginid = ? AND id = ?",
    [loginId, productId],
    (error, cartResult) => {
      if (error) {
        console.error("Error fetching cart status:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (cartResult.length > 0 && cartResult[0].status === 'active') {
        return res.status(200).json({ message: "Product is live" });
      }

     
      db.query(
        "SELECT loginid FROM bid WHERE productid = ? and interested =1 ORDER BY price DESC LIMIT 1",
        [productId],
        (bidError, bidResult) => {
          if (bidError) {
            console.error("Error fetching winning login ID:", bidError);
            return res.status(500).json({ error: "Internal server error" });
          }

          if (bidResult.length > 0) {
            const winningLoginId = bidResult[0].loginid;
           
            if (winningLoginId === parseInt(loginId)) {
              return res.status(200).json({ message: "You won the bid" });
            } else {
              return res.status(200).json({ message: "You lose the bid" });
            }
          } else {
            return res.status(404).json({ error: "No bids found for this product" });
          }
        }
      );
    }
  );
};




export const updateWinner = (req, res) => {
  const { productId } = req.params;

  // Fetch username and price from the bid table where interested = 1 ordered by price desc
  const query =
    "SELECT username, price, loginid FROM bid WHERE productid = ? AND interested = 1 ORDER BY price DESC LIMIT 1";
  db.query(query, [productId], (error, result) => {
    if (error) {
      console.error("Error fetching winner details:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ error: "No interested users found for this product" });
    }

    const { username, price, loginid } = result[0];
    res.json({ username, price, loginid});
  });
};