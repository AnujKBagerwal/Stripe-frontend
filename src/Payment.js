/* eslint-disable jsx-a11y/img-redundant-alt */

// not Working in this project
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import './App.css';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { ImgFood } from './image';

const CheckoutForm = () => {
  const [product, setProduct] = useState({
    name: 'React from Facebook',
    price: 10,
    productBy: 'FaceBook',
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log('Error', error);
      alert('Payment Failed');
    } else {
      console.log('paymentMethod', paymentMethod);
      try {
        const response = await axios.post(`http://localhost:8282/payment`, {
          product,
        });
        console.log('response', response);
      } catch (error) {
        console.log('Error by Backend', error);
      }
      alert('paymentMethod', paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '400px', margin: '0 auto' }}>
      <h2>MahaRaja Burger</h2>
      <h4>Price: ${product.price}</h4>
      <img
        src={ImgFood}
        alt="product image"
        style={{ maxWidth: '50%', marginBottom: '20px' }}
      />
      <div style={{ marginBottom: '20px', marginLeft: '50px' }}>
        <CardElement />
      </div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginTop: '20x' }}
      >
        Pay
      </Button>
    </form>
  );
};

const stripePromise = loadStripe(process.env.REACT_APP_KEY);

const Payment = () => {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
