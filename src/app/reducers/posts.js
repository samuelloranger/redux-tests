import { createSelector, createSlice } from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

import { posts, users } from '../utils/__mock__'

export const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		list: [],
		loading: false,
		error: null,
		authors: []
	},
	reducers: {
		setFetching: (state) => {
			state.loading = true
			state.error = null
		},
		setFetchingSuccess: (state) => {
			state.loading = false
		},
		setFetchingError: (state, data) => {
			state.loading = false
			state.error = data.payload
		},
		generate: (state) => {
			state.list = posts.map((post) => {
				const randomAuthorId = Math.floor(Math.random() * users.length + 1)

				return {
					...post,
					exerpt: `${post.text.slice(0, 75)}...`,
					author: users.find((u) => u.id === randomAuthorId)
				}
			})

			state.authors = users
		},
		normalizeData: (state) => {
			// Define a users schema
			const author = new schema.Entity('authors')

			// Define your article
			const article = new schema.Entity('articles', {
				author: author
			})

			console.log('state', state)

			const normalizedData = normalize(state.list, article)
			console.log('normalizedData', normalizedData)
		}
	}
})

const getPostsList = (state) => state.posts.list
const getAuthorsList = (state) => state.posts.authors
const getLoading = (state) => state.posts.loading
const getError = (state) => state.posts.error

const { generate, normalizeData, setFetching, setFetchingSuccess, setFetchingError } = postsSlice.actions

const fetchPosts = () => async (dispatch) => {
	console.log('allo')
	dispatch(setFetching())
	try {
		await new Promise((resolve) => setTimeout(resolve, 2500))
		// throw new Error('Could not call api')

		dispatch(generate())

		dispatch(setFetchingSuccess())
	} catch (err) {
		dispatch(setFetchingError(err.message))
	}
}

const getPostsByAuthor = (authorId) =>
	createSelector(getPostsList, (posts) => posts.filter(({ author }) => author.id === authorId))

const getPostById = (postId) => createSelector(getPostsList, (posts) => posts.find((post) => post.id === postId))

export {
	generate,
	normalizeData,
	fetchPosts,
	getPostsList,
	getAuthorsList,
	getPostsByAuthor,
	getPostById,
	getLoading,
	getError
}

export default postsSlice.reducer
