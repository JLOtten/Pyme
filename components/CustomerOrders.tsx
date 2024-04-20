import React from 'react'

const CustomerOrders = ({ orders }: { orders: any[] }) => {
	if (orders.length === 0) {
		return <h2>No Orders Yet</h2>
	}
	return (
		<div>
			<ul>
				{orders.map((order: any) => (
					<div key={order.id}>
						<h1>Order</h1>
						{order.items.map((item: any) => (
							<li key={item.productSlug}>
								<h2>{item.productName}</h2>
								<img src={item.productImage} alt={item.productName} />
								<p>Quantity: {item.quantity}</p>
								<p>Price: {item.price}</p>
							</li>
						))}
						<h2>Total Price: {order.totalPrice}</h2>
					</div>
				))}
			</ul>
		</div>
	)
}

export default CustomerOrders