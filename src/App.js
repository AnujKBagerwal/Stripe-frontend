/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Button } from '@material-ui/core';
import StripeCheckout from 'react-stripe-checkout';

const App = () => {
  const [product, setProduct] = useState({
    name: 'React from Facebook',
    price: 10,
    productBy: 'FaceBook',
  });

  // make payment method for payment and token is auto generated make sure your prop named is token
  const makePayment = (token) => {
    return axios
      .post(`http://localhost:8282/payment`, { token, product })
      .then((response) => {
        console.log('RESPONSE', response);
        const { status } = response;
        console.log('STATUS', status);
        alert('Payment Sucessfully !!! ');
      })
      .catch((err) => {
        console.log('err', err);
        alert('Error while Payment');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginBottom: '20px' }}
        >
          Learn React
        </a>

        <StripeCheckout
          // send stripe public key
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name={`Buy React cost of ${product.price} $`}
          panelLabel="Pay "
          amount={product.price * 100}
          // if you want to add shipping address and billing address in payment page
          shippingAddress
          billingAddress
          alipay
          bitcoin
        >
          <Button variant="contained" color="primary">
            Buy React in just {product.price} $
          </Button>
        </StripeCheckout>
      </header>
    </div>
  );
};

export default App;
