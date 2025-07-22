import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import { FarmerHome } from "./components/Home/Farmer-Home";
import { CustomerHome } from "./components/Home/Customer-Home";
import { Bid } from "./components/Bid/Bid";
import { SearchResults } from "./components/Search/SearchResults";
import { Product } from "./components/Product/Product";
import { BidRequest } from "./components/Admin/BidRequest";
import { LiveBid } from "./components/Admin/LiveBid";
import { Users } from "./components/Admin/users";
import { Cart } from "./components/Customer/cart";
import { BidHistory } from "./components/Admin/Bid-History";
import { Profile } from "./components/Profile/Profile";
import { Profile2 } from "./profile2/profile2";
import { Checkout } from "./components/checkout/checkout";
import { Status } from "./components/Status/status";
import { Winner } from "./components/Admin/winner";
import { Review } from "./components/Admin/review";
import { SchemeAdmin } from "./components/Admin/scheme-admin";
import { Complaint } from "./components/Admin/complaints";
import { Scheme } from "./components/Scheme/Scheme";
import { Apply } from "./components/apply/apply";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Farmer-Home" element={<FarmerHome />} />
        <Route path="/Customer-Home" element={<CustomerHome />} />
        <Route path="/Bid" element={<Bid />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/bid-request" element={<BidRequest />} />
        <Route path="/live-bid" element={<LiveBid />} />
        <Route path="/users" element={<Users />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/bid-history/:productId" element={<BidHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Profile2" element={<Profile2 />} />
        <Route path="/checkout/:productId" element={<Checkout />} />
        <Route path="/status/:productId" element={<Status />} />
        <Route path="/winner" element={<Winner />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/admin-scheme" element={<SchemeAdmin />} />
        <Route path="/Scheme" element={<Scheme />} />
        <Route path="/complaints" element={<Complaint />} />
        <Route path="/apply" element={<Apply />} />
        <Route index element={<Login />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
