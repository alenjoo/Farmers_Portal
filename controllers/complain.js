import db from "../config/db.js";
export const submitComplaint = (req, res) => {
  const { username, productId } = req.body; // Get buyer_username and pid from request body



  // Fetch the loginid and name of the seller from the products table based on pid
  const getProductSellerQuery = `
    SELECT p.login_id AS seller_loginid, p.name AS product_name, f.username AS seller_username
    FROM products p
    INNER JOIN farmer f ON p.login_id = f.login_id
    WHERE p.id = ?
  `;

  db.query(getProductSellerQuery, [productId], (error, result) => {
    if (error) {
      console.error("Error fetching seller loginid and product name:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    

    const { product_name, seller_username } = result[0];

    // Insert the complaint into the complain table
    const insertComplaintQuery = `
      INSERT INTO complain (seller_username, buyer_username, product_name, pid)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      insertComplaintQuery,
      [seller_username, username, product_name, productId],
      (error, result) => {
        if (error) {
          console.error("Error inserting complaint:", error);
          return res.status(500).json({ error: "Internal server error" });
        }

        console.log("Complaint inserted successfully:", result);

        return res
          .status(200)
          .json({ message: "Complaint submitted successfully" });
      }
    );
  });
};


export const submitReview = (req, res) => {
  const { content, username } = req.body; // Get content and username from request body

  // Fetch the username from the customer table based on the login id
  const getUsernameQuery = `
    SELECT username FROM customer WHERE login_id = ?
  `;

  db.query(getUsernameQuery, [username], (error, result) => {
    if (error) {
      console.error("Error fetching username:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Username not found" });
    }

    const userUsername = result[0].username;

    // Insert the review into the review table
    const insertReviewQuery = `
      INSERT INTO review (content, username)
      VALUES (?, ?)
    `;

    db.query(insertReviewQuery, [content, userUsername], (error, result) => {
      if (error) {
        console.error("Error inserting review:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      return res.status(200).json({ message: "Review submitted successfully" });
    });
  });
};


export const getComplaints = (req, res) => {
  // Query to fetch complaints from the database
  const query = "SELECT * FROM complain";

  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching complaints:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Send the fetched complaints as JSON response
    res.status(200).json(results);
  });
};


export const getReviews = (req, res) => {
  // Query to fetch complaints from the database
  const query = "SELECT * FROM review";

  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching complaints:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Send the fetched complaints as JSON response
    res.status(200).json(results);
  });
};