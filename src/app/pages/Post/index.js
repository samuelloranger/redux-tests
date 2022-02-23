import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, getLoading, getPostsList, getPostById } from '../../reducers/posts'

function Post (){
	let { post_id } = useParams()
	const dispatch = useDispatch()
	const loading = useSelector(getLoading)
	const posts = useSelector(getPostsList)
	const post = useSelector(getPostById(parseInt(post_id)))

	useEffect(() => {
		if (!posts.length) return dispatch(fetchPosts())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	console.log('loading', loading)

	return !!loading ? (
		<p>Loading post...</p>
	) : !!post ? (
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
