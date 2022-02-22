import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../reducers/auth'
import postsReducer from '../reducers/posts'

export default configureStore({
	reducer: {
		auth: authReducer,
		posts: postsReducer
	}
})
