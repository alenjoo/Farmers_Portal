import React ,{useEffect,useState }from 'react'
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { Link } from 'react-router-dom';
import "./status.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Status = () => {
    const { productId } = useParams();
    const [winnerDetails, setWinnerDetails] = useState({});
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        // Make the endpoint call to fetch winner details
        const fetchWinnerDetails = async () => {
            try {
                const winnerResponse = await axios.get(`http://localhost:3001/bids/winner/${productId}`);
                setWinnerDetails(winnerResponse.data);
            } catch (error) {
                console.error('Error fetching winner details:', error);
            }
        };

        const fetchPaymentStatus = async () => {
            try {
                const paymentResponse = await axios.get(`http://localhost:3001/message/payment/${ productId }`);
                setPaymentStatus(paymentResponse.data);
            } catch (error) {
                console.error('Error fetching payment status:', error);
            }
        };

        // Call both functions when the component mounts
        fetchWinnerDetails();
        fetchPaymentStatus();
    }, [productId]);

     
  return (
    <div className="view-container3">
     <div className="blue-container3">
      <div className="cart-icon-wrapper3">
      <Link to="/Bid">
        <IoBagOutline className="bag-icon3" />
        </Link>
      </div>
      <div className="cart-green1-line"></div> 
      <div className="cart-icon-wrapper-shopping3">
     
    <MdOutlineShoppingCart className="cart-icon3" />
     
      </div>
        
      <div className="cart-green3-line"></div> 
      <div className="card-icon-wrapper-shopping3">
        < CiCreditCard1 className="card-icon3" />
      </div>
     
      <h2 className="cart-bid-heading3">Sell</h2>
      <h2 className="blue-cart-heading3">Status</h2>
      <h2 className="blue-review-heading3">Review</h2>
      <h2 className="blue-checkout-heading3">Status</h2>
      </div>
    <div className="marblecontainer">
      <div className="address-box-checkout">
        <h3 className="address-details-checkout">Winner Details</h3>
        <div className="address-input-box-checkout">
           < label className='address-label-checkout'> Name</label>
            <input type="text" className="input-checkout" value={winnerDetails.name}/>

        </div>
        <div className="address-input-box-checkout">
           < label className='address-label-checkout'> Mobile Number</label>
            <input type="text" className="input-checkout" value={winnerDetails.number}/>

        </div>
       

        
      </div>
      <div className="order-box-checkout3">
  <h3 className="order-details-checkout">Payment Status</h3>
  <div className="label-checkout">
    <div className="product-label">
      <label className='order-label-checkout'>Method of payment : </label>
      <div className="product-name-checkout1">{paymentStatus.mode}</div>
    </div>
    <div className="price-label">
      <label className='address-label-checkout'>Payment Status : </label>
      <div className="product-name-checkout2">{paymentStatus.status === 1 ? 'Success' : 'Failure'}</div>
    </div>
  </div>
</div>



        </div>


   
    
</div>
  )
}

