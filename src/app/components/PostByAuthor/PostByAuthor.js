import React from 'react'
import { useSelector } from 'react-redux'
import { getPostsByAuthor } from '../../reducers/posts'
import { AuthorTitle } from './PostByAuthor.styles'
import PostsList from '../PostsList'

function PostByAuthor ({ author }){
	const posts = useSelector(getPostsByAuthor(author.id))

	return (
		<div>
			<AuthorTitle>
				{author.first_name} {author.last_name} <span>({posts.length} posts)</span>
			</AuthorTitle>

			{posts.length ? <PostsList posts={posts} /> : <p>No post for this author</p>}
		</div>
	)
}

export default PostByAuthor
