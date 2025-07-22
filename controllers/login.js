import db from "../config/db.js";

export const checkLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT login_id FROM login WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length > 0);
      }
    });
  });
};
export const loginUser = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  try {
    const sql =
      "SELECT login_id, role FROM login WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
      if (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (results.length > 0) {
          const loginId = results[0].login_id;
          const role = results[0].role;
          res
            .status(200)
            .json({
              message: "Login successful",
              loginId: loginId,
              role: role,
            });
        } else {
          res.status(401).json({ error: "Invalid username or password" });
        }
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
