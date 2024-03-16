import React from 'react'
import CreateStoreStoryForm from '@/components/CreateStoreStoryForm'

const createStoreStoryPage = ({ params }) => {
	return <CreateStoreStoryForm myStore={params.slug} />
}

export default createStoreStoryPage
