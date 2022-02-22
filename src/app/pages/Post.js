import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getPostById } from '../reducers/posts'

function Post (){
	let { post_id } = useParams()
	const post = useSelector(getPostById(parseInt(post_id)))

	return !!post ? (
		<div>
			<h1>{post.title}</h1>
			<p>
				Text by {post.author.first_name} {post.author.last_name}
			</p>

			<p>{post.text}</p>
		</div>
	) : (
		<p>Post not found</p>
	)
}

export default Post
