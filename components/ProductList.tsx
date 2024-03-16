import React from 'react'
import { getStoreProducts } from '@/utils/actions/productActions'
import EditProductInvForm from './EditProductInvForm'
import Image from 'next/image'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const ProductList = async ({ myStore }: any) => {
	const products = await getStoreProducts(myStore)

	if (products.length === 0) {
		return (
			<h2 className='mt-8 font-medium text-lg'>
				Currently you do not have any active products
			</h2>
		)
	}
	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
						<TableCell style={{ fontWeight: 'bold' }}>Details</TableCell>
						<TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
						<TableCell style={{ fontWeight: 'bold' }}>Inventory</TableCell>
						<TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{products.map((product) => (
						<TableRow key={product.id}>
							<TableCell>{product.productName}</TableCell>
							<TableCell>{product.productDetails}</TableCell>
							<TableCell>{product.price}</TableCell>
							<TableCell>
								<EditProductInvForm product={product} myStore={myStore} />
							</TableCell>
							<TableCell>
								{product.productImage && (
									<img
										loading='lazy'
										src={product.productImage}
										alt={product.productName}
										className='max-w-xs max-h-24'
										width={100}
										height={100}
									/>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
export default ProductList
