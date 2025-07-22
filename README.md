# 🚜 Farmers Portal

A full-stack Farmers Portal web application designed to bridge the gap between farmers, customers, and administrators. This platform enables user registration, product uploads, bidding, shopping cart, Razorpay payments, complaints, and scheme application systems.






📁 **Project Structure**

```bash
farmers-portal/
├── config/             # Database configuration
├── controllers/        # Express route handlers
├── routes/             # Backend API routes
├── uploads/            # Product image uploads
├── server.js           # Express server entry point
├── .env                # Environment variables
├── package.json        # Backend dependencies
├── client/             # React frontend app
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.js
│       └── index.js
```
## ⚙️ Technologies Used

### 🔧 Backend
- Node.js
- Express.js
- MySQL (via `mysql2`)
- Razorpay Integration
- dotenv

### 🌐 Frontend
- React.js
- Axios
- React Router DOM
- React Icons
- Bootstrap or Tailwind (optional)

---

## 🚀 Features

- 👨‍🌾 **Farmer Login & Product Upload**
- 🛒 **Customer Shopping & Bidding**
- 🧑‍💻 **Admin Approval & Bid Management**
- 💳 **Payment via Razorpay**
- 🧾 **User Profiles & Address Storage**
- 📩 **Messaging & Complaints**
- 📄 **Scheme Display & Apply**

---

## 🛠️ Setup Instructions
---

```bash
git clone https://github.com/your-username/farmers-portal.git
cd farmers-portal
```
```bash
### 2.Install dependencies
npm install
```
```bash
# 3.Add .env file


PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=farmers_portal

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```
```bash
cd client
npm install
npm start
```
```bash
# In root folder
node server.js

