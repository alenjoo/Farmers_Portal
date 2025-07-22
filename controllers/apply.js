import db from "../config/db.js";

export const submitApplication = (req, res) => {
  const {
    schemeName,
    district,
    name,
    address,
    panchayath,
    gender,
    category,
    phnno,
    land,
    login_id,
  } = req.body;

  // First, insert into the scheme_applications table
  const schemeSql = `
    INSERT INTO scheme_applications 
    (scheme_name, district, name, address, panchayath, gender, category, phone_number, land_area, login_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const schemeValues = [
    schemeName,
    district,
    name,
    address,
    panchayath,
    gender,
    category,
    phnno,
    land,
    login_id,
  ];

  db.query(schemeSql, schemeValues, (schemeErr, schemeResult) => {
    if (schemeErr) {
      console.error(
        "Error inserting into scheme_applications table:",
        schemeErr
      );
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("Scheme application submitted successfully");
      res
        .status(201)
        .json({ message: "Scheme application submitted successfully" });
    }
  });
};

export const getUsersAppliedForSchemes = (req, res) => {
  // Query to fetch user details who have applied for schemes
  const query = "SELECT * FROM scheme_applications";
  db.query(query, (error, rows) => {
    if (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Send the retrieved user details as a response
      res.json(rows);
    }
  });
};
