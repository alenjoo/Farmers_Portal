import db from "../config/db.js";

export const getProductsByUserId = (req, res) => {
  const loginId = req.params.loginId;

  const sql = "SELECT * FROM products WHERE login_id = ? ";
  db.query(sql, [loginId], (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {

      res.status(200).json(results);
    }
  });
};
