import { createSlice } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, signOut, getAuth, updateProfile } from 'firebase/auth'
import { app } from '../utils/firebase'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		loading: false,
		updatingUser: false,
		error: null
	},
	reducers: {
		setUser: (state, data) => {
			state.user = data.payload
		},
		updateUser: (state, data) => {
			if (!state.user) return

			state.user = {
				...state.user,
				...data.payload
			}
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
		setLoadingUserUpdate: (state, data) => {
			state.updatingUser = true
		},
		setLoadingUserUpdateSuccess: (state) => {
			state.updatingUser = false
		},
		setLoadingUserUpdateError: (state, data) => {
			state.updatingUser = false
			state.error = data.payload
		}
	}
})

const getUser = (state) => state.auth.user
const getError = (state) => state.auth.error
const getLoading = (state) => state.auth.loading
const getLoadingUserUpdate = (state) => state.auth.updatingUser

const {
	setUser,
	updateUser,
	setError,
	setFetching,
	setFetchingError,
	setFetchingSuccess,
	setLoadingUserUpdate,
	setLoadingUserUpdateSuccess,
	setLoadingUserUpdateError
} = authSlice.actions

const setDisplayName = (name) => async (dispatch) => {
	dispatch(setLoadingUserUpdate(true))

	try {
		const auth = getAuth(app)
		await updateProfile(auth.currentUser, {
			displayName: name
		})
		dispatch(updateUser({ displayName: name }))
		dispatch(setLoadingUserUpdateSuccess(true))
	} catch (err) {
		dispatch(setLoadingUserUpdateError(true))
	}
}

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

export {
	getUser,
	getError,
	getLoading,
	getLoadingUserUpdate,
	login,
	logout,
	setDisplayName,
	setUser,
	setError,
	setLoadingUserUpdateSuccess,
	setLoadingUserUpdateError
}

export default authSlice.reducer
