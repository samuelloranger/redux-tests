import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Hooks
import { useDispatch } from 'react-redux'

// Utils
import { app } from './app/utils/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Components
import Posts from './app/pages/Posts'

// Contexts/Reducers
import { setUser } from './app/reducers/auth'
import Auth from './app/pages/Auth'
import Home from './app/pages/Home'
import Header from './app/components/Header'
import Post from './app/pages/Post'

function App (){
	const dispatch = useDispatch()

	// Listener for firebase auth
	useEffect(
		() => {
			onAuthStateChanged(getAuth(app), (user) => {
				if (!user) return dispatch(setUser(null))

				const { email, phone, emailVerified, uid, displayName } = user

				dispatch(setUser({ email, phone, emailVerified, uid, displayName }))
			})
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	return (
		<div className='App'>
			<BrowserRouter>
				<Header />

				<div style={{ maxWidth: '70%', margin: '0 auto' }}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='auth' element={<Auth />} />
						<Route path='posts' element={<Posts />} />
						<Route path='post/:post_id' element={<Post />} />
						<Route
							path='*'
							element={
								<main style={{ padding: '1rem' }}>
									<p>404!</p>
								</main>
							}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App
