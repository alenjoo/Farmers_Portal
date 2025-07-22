import db from "../config/db.js";

export const getProfileData = (req, res) => {
  const loginId = req.params.loginid;
  const sql = `
    SELECT username, fullname, number, email
    FROM customer
    WHERE login_id = ?
  `;
  db.query(sql, [loginId], (err, results) => {
    if (err) {
      console.error("Error fetching profile data:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  });
};

export const getProfileDataFarmer = (req, res) => {
  const loginId = req.params.loginid;
  const sql = `
    SELECT username, fullname, number, email
    FROM farmer
    WHERE login_id = ?
  `;
  db.query(sql, [loginId], (err, results) => {
    if (err) {
      console.error("Error fetching profile data:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  });
};
