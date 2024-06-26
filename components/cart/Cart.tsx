'use client';

import React, { useState } from 'react';
import { checkOut } from '@/utils/actions/cartActions';
import { loadStripe } from '@stripe/stripe-js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Tooltip, Box } from '@mui/material';
import Link from 'next/link';
import {
  CartItemDetail,
  deleteCartItem,
} from '@/utils/actions/cartItemActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { createCartItem } from '@/utils/actions/cartItemActions';
import AddIcon from '@mui/icons-material/Add';
import QtyDropDown from './QtyDropDown';
import { editCartItemQuantity } from '@/utils/actions/cartItemActions';

import { Card, CardContent, Typography } from '@mui/material';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function Cart({
  initialCartItems,
}: {
  initialCartItems: CartItemDetail[];
}) {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const _deleteCartItem = (productSlug: string) => {
    deleteCartItem(productSlug);
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.productSlug !== productSlug)
    );
  };

  const _editCartItemQuantity = async (
    productSlug: string,
    newQuantity: number
  ) => {
    if (newQuantity === 0) {
      _deleteCartItem(productSlug);
      return;
    }
    await editCartItemQuantity(productSlug, newQuantity);
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productSlug === productSlug
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <h2 className="mt-8 font-medium text-lg">
          Currently you do not have any products in your cart.
        </h2>
      </>
    );
  }

  const handleCheckout = async (event: any) => {
    event.preventDefault();
    const stripe = await stripePromise;
    const { id }: any = await checkOut();
    const result = await stripe!.redirectToCheckout({
      sessionId: id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TableContainer component={Paper}>
          <Table aria-label="Shopping Cart">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Item</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Price Per Item
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((product) => (
                <TableRow key={product.productSlug}>
                  <TableCell>
                    {product.productSlug}
                    {product.productImage && (
                      <img
                        loading="lazy"
                        src={product.productImage}
                        alt={product.productName}
                        className="max-w-xs max-h-24"
                        width={100}
                        height={100}
                      />
                    )}{' '}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                    <QtyDropDown
                      slug={product.productSlug}
                      quantity={product.quantity}
                      editQuantity={_editCartItemQuantity}
                      aria-label="Quantity dropdown"
                    />
                    <Tooltip title="Delete">
                      <Button
                        onClick={() => _deleteCartItem(product.productSlug)}
                        aria-label={`Delete ${product.productSlug}`}
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>${product.priceAtTime.toFixed(2)}</TableCell>
                  <TableCell>
                    ${(product.priceAtTime * product.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Card
          style={{
            width: '300px',
            height: '100%',
            marginLeft: '20px',
            marginTop: '20px',
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Subtotal: $
              {cartItems
                .reduce(
                  (total, item) => total + item.priceAtTime * item.quantity,
                  0
                )
                .toFixed(2)}
            </Typography>
            <Button
              onClick={handleCheckout}
              variant="contained"
              color="primary"
              style={{
                marginTop: '20px',
                backgroundColor: 'oklch(79.3811% 0.146032 78.618794 /1)',
                borderRadius: '20px',
                color: 'black',
              }}
              aria-label='Submit Payment'
            >
              Submit Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
