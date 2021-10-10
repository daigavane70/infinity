import React, { useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";

const razorInitialData = {
  amount: 60,
  name: "",
  email: "",
  phone: "",
  sessionId: "",
  pcId: null,
  userId: null,
  duration: 0,
  date: new Date(),
};

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const _DEV_ = document.domain === "localhost";

function RazorpayFrontend() {
  const [name, setName] = useState("Chirag");

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:3001/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        amount: razorInitialData.amount,
        currency: 'INR',
        sessionId: razorInitialData.sessionId,
        pcId: razorInitialData.pcId,
        userId: razorInitialData.userId,
        duration: razorInitialData.duration,
        date: razorInitialData.date,
      }),
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: _DEV_ ? "rzp_test_So7WXNub73SKMW" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Gaming Charges",
      description: "Gamify Game Parlour",
      image: "http://localhost:3001/logo.svg",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: razorInitialData.name,
        email: razorInitialData.email,
        phone_number: razorInitialData.phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <a
      onClick={displayRazorpay}
      //   target="_blank"
      rel="noopener noreferrer"
    >
      Pay &#8377; {razorInitialData.amount}
    </a>
  );
}

export default RazorpayFrontend;