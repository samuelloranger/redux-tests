import React from 'react'

import Post from './Post'
import { PostListContainer } from './PostsList.styles'

export default function PostsList ({ posts }){
	return (
		<PostListContainer>
			{posts.map((post) => {
				return <Post post={post} key={post.id} />
			})}
		</PostListContainer>
	)
}
