import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { getError, getLoading, getUser, login, logout, setDisplayName, getLoadingUserUpdate } from '../../reducers/auth'
import { LoginFormContainer, LoginFormElement } from './Auth.styles'

export default function Auth (){
	const user = useSelector(getUser)
	const error = useSelector(getError)
	const loading = useSelector(getLoading)
	const loadingUserUpdate = useSelector(getLoadingUserUpdate)
	const dispatch = useDispatch()

	const [ authForm, setAuthForm ] = useState({ email: '', password: '' })
	const [ userForm, setUserForm ] = useState({ displayName: '' })

	useEffect(
		() => {
			if (!user) return setUserForm({ displayName: '' })

			setUserForm((prevState) => ({ ...prevState, displayName: user.displayName }))
		},
		[ user ]
	)

	const handleChangeName = (e) => {
		const input = e.currentTarget

		setUserForm((prevState) => ({ ...prevState, displayName: input.value }))
	}

	const handleChangeEmail = (e) => {
		const input = e.currentTarget

		setAuthForm((prevState) => ({ ...prevState, email: input.value }))
	}

	const handleChangePassword = (e) => {
		const input = e.currentTarget

		setAuthForm((prevState) => ({ ...prevState, password: input.value }))
	}

	return (
		<div>
			{!!user ? (
				<Fragment>
					<h1>Profile</h1>

					<LoginFormElement>
						<label htmlFor='displayName'>Display name</label>
						<Input
							id='displayName'
							name='displayName'
							value={userForm.displayName}
							onChange={handleChangeName}
							style={{ marginBottom: 12 }}
						/>
					</LoginFormElement>

					<LoginFormElement noMaxWidth>
						<Button
							aria-label='Logout'
							disabled={loadingUserUpdate}
							onClick={() => {
								console.log('userForm.displayName', userForm.displayName)
								dispatch(setDisplayName(userForm.displayName))
							}}
							style={{ marginBottom: 24 }}>
							{loadingUserUpdate ? 'Setting display name...' : 'Change display name'}
						</Button>
					</LoginFormElement>

					<Button aria-label='Logout' secondary onClick={() => dispatch(logout())}>
						Logout
					</Button>
				</Fragment>
			) : (
				<Fragment>
					<h1>Login</h1>
					<LoginFormContainer>
						<LoginFormElement>
							<label htmlFor='email'>Email</label>
							<Input
								name='email'
								id='email'
								value={authForm.email}
								onChange={handleChangeEmail}
								required
							/>
						</LoginFormElement>

						<LoginFormElement>
							<label htmlFor='password'>Password</label>
							<Input
								name='password'
								id='password'
								value={authForm.password}
								type='password'
								required
								onChange={handleChangePassword}
								style={{ marginBottom: 24 }}
							/>
						</LoginFormElement>

						{error && <p>Error: {error}</p>}

						<LoginFormElement>
							<Button
								aria-label='Login'
								disabled={loading}
								onClick={() => dispatch(login(authForm.email, authForm.password))}>
								{loading ? 'Logging in...' : 'Login'}
							</Button>
						</LoginFormElement>
					</LoginFormContainer>
				</Fragment>
			)}
		</div>
	)
}
