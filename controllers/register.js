import db from "../config/db.js";

export const registerUser = (req, res) => {
  const { fullname, username, email, phone, password, role, aadhar } = req.body;

  // First, insert into the login table
  const loginSql =
    "INSERT INTO login (username, password, role) VALUES (?, ?, ?)";
  db.query(loginSql, [username, password, role], (loginErr, loginResult) => {
    if (loginErr) {
      console.error("Error inserting into login table:", loginErr);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Get the auto-generated login_id from the login table
      const loginId = loginResult.insertId;

      // Depending on the role, insert into the appropriate table
      let table, idField;
      if (role === "farmer") {
        table = "farmer";
        idField = "f_id";
      } else if (role === "customer") {
        table = "customer";
        idField = "c_id";
      } else {
        console.error("Invalid role:", role);
        return res.status(400).json({ error: "Invalid role" });
      }

    
      const insertSql = `INSERT INTO ${table} (username, password, fullname, email, number, login_id, aadhar) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      db.query(
        insertSql,
        [username, password, fullname, email, phone, loginId, aadhar], // Adjusted order of values
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error(`Error inserting into ${table} table:`, insertErr);
            res.status(500).json({ error: "Internal server error" });
          } else {
            console.log(`User registered successfully as ${role}`);
            res.status(201).json({ message: "User registered successfully" });
          }
        }
      );
    }
  });
};
