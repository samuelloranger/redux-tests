import { createSlice } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth'
import { app } from '../utils/firebase'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		loading: false,
		error: null
	},
	reducers: {
		setUser: (state, data) => {
			state.user = data.payload
		},
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
		setDisplayName: (state, data) => {
			if (!state.user) return

			// redux sans reselect de redux toolkit
			// return {
			// 	...state,
			// 	user: {
			// 		...state.user,
			// 		displayName: data.payload
			// 	}
			// }

			// On peut faire ceci car en arrière, c'est reselect qui va mettre le data à la bonne place
			state.user.displayName = data.payload
		}
	}
})

const getUser = (state) => state.auth.user
const getError = (state) => state.auth.error
const getLoading = (state) => state.auth.loading

const { setUser, setError, setDisplayName, setFetching, setFetchingError, setFetchingSuccess } = authSlice.actions

const login = (email, password) => async (dispatch) => {
	dispatch(setFetching())
	try {
		await signInWithEmailAndPassword(getAuth(app), email, password)
		dispatch(setFetchingSuccess())
	} catch (err) {
		dispatch(setFetchingError(err.message))
	}
}

const logout = () => async () => await signOut(getAuth(app))

export { getUser, getError, getLoading, login, logout, setUser, setError, setDisplayName }

export default authSlice.reducer
