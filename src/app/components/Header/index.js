import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getUser } from '../../reducers/auth'
import { HeaderContainer, HeaderFlexContainer, HeaderMenu, HeaderMenuItem } from './Header.styles'

const getPages = (isLogged) => [
	{
		path: '/',
		title: 'Home'
	},
	{
		path: '/posts',
		title: 'Posts'
	},
	{
		path: '/auth',
		title: isLogged ? 'Profile' : 'Login'
	}
]

function Header (){
	const { pathname } = useLocation()
	const user = useSelector(getUser)

	return (
		<HeaderContainer>
			<HeaderFlexContainer>
				<HeaderMenu>
					{getPages(!!user).map(({ path, title }, key) => (
						<HeaderMenuItem active={pathname === path} key={`link-${key}`}>
							<Link to={path}>{title}</Link>
						</HeaderMenuItem>
					))}
				</HeaderMenu>

				<p style={{ margin: 0, padding: 0 }}>
					{!!user ? `Logged in as ${user.displayName ? user.displayName : user.email}` : 'Not logged in'}
				</p>
			</HeaderFlexContainer>
		</HeaderContainer>
	)
}

export default Header
