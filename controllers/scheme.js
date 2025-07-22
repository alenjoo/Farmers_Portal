// controllers/schemeController.js

import db from "../config/db.js";

// Controller function to insert a new scheme into the scheme table
export const createScheme = (req, res) => {
  // Retrieve data from request body
  const { name, description, area } = req.body;

  // SQL query to insert a new scheme
  const sql = `INSERT INTO scheme (scheme_name, description, area) VALUES (?, ?, ?)`;

  // Execute the query
  db.query(sql, [name, description, area], (err, result) => {
    if (err) {
      console.error("Error inserting scheme:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("Scheme inserted successfully");
      res
        .status(201)
        .json({
          message: "Scheme inserted successfully",
          schemeId: result.insertId,
        });
    }
  });
};



export const getSchemesByLand = async (req, res) => {
  try {
    const { land } = req.query;

    // Check if land parameter is provided
    if (!land) {
      return res.status(400).json({ error: "Land parameter is missing" });
    }

    // Execute SQL query
    const query = `SELECT * FROM scheme WHERE area > ?`;
    const [rows] = await db.promise().query(query, [land]);

    // Send the retrieved schemes as a response
    res.json(rows);
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllSchemes = (req, res) => {
  try {
    // Execute SQL query to fetch all schemes
    const query = `SELECT * FROM scheme`;
    db.query(query, (error, rows) => {
      if (error) {
        console.error("Error fetching schemes:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Send the retrieved schemes as a response
        res.json(rows);
      }
    });
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

