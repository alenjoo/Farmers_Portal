import db from "../config/db.js";

export const addBankAccount = (req, res) => {
  const { holder_name, account_number, ifsc_code, branch_name, loginid } =
    req.body;
  
  const sql =
    "INSERT INTO Account (holder_name, account_number, ifsc_code, bank_name, loginid) VALUES (?, ?, ?, ?, ?)";
  const values = [holder_name, account_number, ifsc_code, branch_name, loginid];

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into Account table:", err);
      res.status(500).json({
        error: "An error occurred while inserting data into Account table",
      });
      return;
    }
    console.log("Inserted into Account table:", result);
    res
      .status(200)
      .json({ message: "Bank account information inserted successfully" });
  });
};


export const getAccountByLoginId = (req, res) => {
  const loginId = req.query.loginId;

  // Fetch address data by loginId from the database
  const sql = "SELECT * FROM Account WHERE loginid = ?";
  db.query(sql, [loginId], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      res.status(500).json({ error: "Error fetching Bank data" });
    } else {
      if (result.length > 0) {
        const bankData = result[0]; // Assuming there's only one address per loginId
        res.status(200).json(bankData);
      } else {
        res.status(404).json({ error: "Bank data not found" });
      }
    }
  });
};