'use client';
import { Product } from '@/lib/models/ProductModel';
import { Card, CardContent } from '@mui/material';
import { Button } from '@mui/material';
import { createCartItem } from '@/utils/actions/cartItemActions';
import toast from 'react-hot-toast';

export default function ShopProductDetails({ product }: { product: Product }) {
  const addToCartHandler = async () => {
    await createCartItem(product.productSlug, 1);
    toast.success('Added to cart', {
      position: 'bottom-center',
    });
  };

  return (
    <>
      <div className="my-2"></div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Card style={{ backgroundColor: 'white', borderRadius: '15px' }}>
            <CardContent>
              <img
                src={product?.productImage}
                alt={product?.productName}
                width={640}
                height={640}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl">{product.productName}</h1>
            </li>
            <div className="divider"></div>
            <li>
              Description: <p>{product.productDetails}</p>
            </li>
          </ul>
        </div>
        <div>
          <Card style={{ backgroundColor: 'white', borderRadius: '15px' }}>
            <CardContent>
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>${product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>{product.inInv > 0 ? 'In Stock' : 'Unavailable'}</div>
              </div>
              {product.inInv > 0 && (
                <div className="card-actions justify-center">
                  <Button
                    aria-label="Add to Cart"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={addToCartHandler}
                    style={{
                      borderRadius: '20px',
                      backgroundColor: 'oklch(76.172% 0.089459 200.026556 /1)',
                      color: 'black',
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
