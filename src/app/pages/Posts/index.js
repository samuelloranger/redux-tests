import { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchPosts, getLoading, getPostsList, getError, getAuthorsList } from '../../reducers/posts'

import PostsList from '../../components/PostsList'
import PostByAuthor from '../../components/PostByAuthor/PostByAuthor'
import { PostTypeSelector, PostTypeSelectorContainer } from './Posts.styles'

export default function Posts (){
	const { hash } = useLocation()
	const posts = useSelector(getPostsList)
	const authors = useSelector(getAuthorsList)
	const loading = useSelector(getLoading)
	const error = useSelector(getError)
	const dispatch = useDispatch()

	const [ activeTab, setActiveTab ] = useState('all')

	useEffect(
		() => {
			if (!hash) return
			setActiveTab(hash.replace('#', ''))
		},
		[ hash ]
	)

	useEffect(() => {
		if (!posts.length) return dispatch(fetchPosts())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<h1>Posts</h1>

			{/* {posts.length && <button onClick={() => dispatch(normalizeData())}>Normalize data</button>} */}

			{loading && <p>Loading posts...</p>}

			{error && <p>Error: {error}</p>}

			{!!posts.length && (
				<Fragment>
					<PostTypeSelectorContainer>
						<PostTypeSelector active={activeTab === 'all'}>
							<Link to='/posts#all'>All posts</Link>
						</PostTypeSelector>
						<PostTypeSelector active={activeTab === 'author'}>
							<Link to='/posts#author'>Per author</Link>
						</PostTypeSelector>
					</PostTypeSelectorContainer>

					{activeTab === 'all' ? (
						<PostsList posts={posts} />
					) : (
						<div>{authors.map((author) => <PostByAuthor author={author} key={author.id} />)}</div>
					)}
				</Fragment>
			)}
		</div>
	)
}
