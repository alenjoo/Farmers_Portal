

import db from "../config/db.js"; // Assuming you have a module to handle database connections

export const insertAddress = (req, res) => {
  const { homeaddress, district, pincode, panchayath, loginid } = req.body;
   console.log("Request Body:", req.body);

  const sql =
    "INSERT INTO address(homeaddress, district, pincode, panchayath, loginid) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [homeaddress, district, pincode, panchayath, loginid],
    (err, result) => {
      if (err) {
        console.error("Error inserting address:", err);
        res.status(500).json({ error: "Error inserting address" });
      } else {
        console.log("Address inserted successfully");
        res.status(200).json({ message: "Address inserted successfully" });
      }
    }
  );
};

export const getAddressByLoginId = (req, res) => {
  const loginId = req.query.loginId;

  // Fetch address data by loginId from the database
  const sql = "SELECT * FROM address WHERE loginid = ?";
  db.query(sql, [loginId], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      res.status(500).json({ error: "Error fetching address data" });
    } else {
      if (result.length > 0) {
        const addressData = result[0]; // Assuming there's only one address per loginId
        res.status(200).json(addressData);
      } else {
        res.status(404).json({ error: "Address data not found" });
      }
    }
  });
};

export const getAddressByloginId = (req, res) => {
  const { loginId } = req.params;
 


  const sql = "SELECT * FROM address WHERE loginid = ?";
  db.query(sql, [loginId], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      res.status(500).json({ error: "Error fetching address data" });
    } else {
      if (result.length > 0) {
        const addressData = result[0]; // Assuming there's only one address per loginId
        res.status(200).json(addressData);
      } else {
        res.status(404).json({ error: "Address data not found" });
      }
    }
  });
};