import styled, { css } from 'styled-components'

const HeaderContainer = styled.header`
	padding: 25px 0;
	box-shadow: 0px 2px 4px gray;
	margin-bottom: 20;
`

const HeaderFlexContainer = styled.div`
	max-width: 70%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
`
const HeaderMenu = styled.ul`
	display: flex;
	align-items: center;
	list-style-type: none;
	padding: 0;
	margin: 0;
`
const HeaderMenuItem = styled.li`
	margin-right: 12px;

	a {
		text-decoration: none;

		${(props) => props.active && css`font-weight: 700;`};
	}
`

export { HeaderContainer, HeaderFlexContainer, HeaderMenu, HeaderMenuItem }
