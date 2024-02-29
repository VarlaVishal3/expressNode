const Razorpay = require ('razorpay');
const dotenv = require('dotenv');
dotenv.config();
   
const instance = new Razorpay ({
key_id : process.env.RAZORPAY_ID,
key_secret : process.env.RAZORPAY_SECRET
}); 

console.log("vishal1");
const orderData = await instance.orders.fetch("order_NgMCB5OQxyoJet")

console.log(orderData);

document.getElementById('rzp-button1').onclick = async function (e) {

    e.preventDefault();
     
    console.log(orderData);
    var options = {
      "key": "rzp_test_vitoydQ8gE3t8g", // Enter the Key ID generated from the Dashboard
      "amount": orderData.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": orderData.order.currency, // Currency
      "order_id": orderData.order.id, //This is a sample Order ID. Pass the id obtained in the response of Step 1
      "handler": async function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        let data = await fetch("/capturePayment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            paymentId: orderData.paymentId,
            razorpayPaymentId:response.razorpay_payment_id,
            razorpayOrderId:response.razorpay_order_id,
            razorPaySignature:response.razorpay_signature,
            amount: orderData.order.amount,
            currency: "INR"
          })
        })
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }
      