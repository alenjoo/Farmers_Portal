import db from "../config/db.js";

export const getUsers = (req, res) => {
  const query = `
    SELECT 
    CASE
        WHEN l.role = 'farmer' THEN f.fullname
        WHEN l.role = 'customer' THEN cu.fullname
        ELSE NULL
    END AS name,
    CASE
        WHEN l.role = 'farmer' THEN f.email
        WHEN l.role = 'customer' THEN cu.email
        ELSE NULL
    END AS email,
    CASE
        WHEN l.role = 'farmer' THEN f.number
        WHEN l.role = 'customer' THEN cu.number
        ELSE NULL
    END AS number,
    CASE
        WHEN l.role = 'farmer' THEN f.aadhar
        WHEN l.role = 'customer' THEN cu.aadhar
        ELSE NULL
    END AS aadhar,
    l.role AS role
FROM login l
LEFT JOIN farmer f ON l.username = f.username
LEFT JOIN customer cu ON l.username = cu.username;


  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
};
