import React from 'react'
import { Link } from 'react-router-dom'
import { PostCard } from './Post.styles'

function Post ({ post }){
	return (
		<PostCard key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.exerpt}</p>

			<p className='title'>
				Author: {post.author.first_name} {post.author.last_name}
			</p>

			<Link to={`/post/${post.id}`}>Read</Link>
		</PostCard>
	)
}

export default Post
