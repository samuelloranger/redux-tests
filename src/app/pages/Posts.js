import { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, getLoading, getPostsList } from '../reducers/posts'
import PostsList from '../components/PostsList'
import PostsPerAuthor from '../components/PostsByAuthor'
import { PostTypeSelector, PostTypeSelectorContainer } from './Posts.styles'
import { Link, useLocation } from 'react-router-dom'
import { getError } from '../reducers/posts'

export default function Posts (){
	const { hash } = useLocation()
	const posts = useSelector(getPostsList)
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

					{activeTab === 'all' ? <PostsList posts={posts} /> : <PostsPerAuthor />}
				</Fragment>
			)}
		</div>
	)
}
