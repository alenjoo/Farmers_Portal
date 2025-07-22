import db from "../config/db.js";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "productImages", maxCount: 1 },
  { name: "productImage2", maxCount: 1 },
]);

export const uploadProduct = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      return res.status(400).json({ error: "Error uploading image" });
    }

    if (!req.files || !req.files.productImages || !req.files.productImage2) {
      console.log("One or both files not uploaded");
      return res.status(400).json({ error: "One or both files not uploaded" });
    }

    console.log("Files uploaded:", req.files);

    const imagePath = req.files.productImages[0].path;
    const image2Path = req.files.productImage2[0].path;
    const { name, description, price, time, location, login_id } = req.body;

    console.log("Request body:", req.body);

    if (!login_id) {
      console.log("User ID not provided");
      return res.status(400).json({ error: "User ID not provided" });
    }

    const sql =
      "INSERT INTO products (name, description, price, image, time, location, login_id, approved, image2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        name,
        description,
        price,
        imagePath,

        time,
        location,
        login_id,
        false,
        image2Path,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting product:", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          console.log("Product uploaded successfully");
          res.status(200).json({ message: "Product uploaded successfully" });
        }
      }
    );
  });
};
