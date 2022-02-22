import React from 'react'
import { useSelector } from 'react-redux'
import { getAuthorsList } from '../reducers/posts'
import PostByAuthor from './PostByAuthor'

function PostsByAuthor (){
	const authors = useSelector(getAuthorsList)

	return <div>{authors.map((author) => <PostByAuthor author={author} key={author.id} />)}</div>
}

export default PostsByAuthor
