import styled, { css } from 'styled-components'

const PostTypeSelectorContainer = styled.div`
	display: flex;
	margin-bottom: 24px;
`

const PostTypeSelector = styled.div`
	font-weight: 600;
	margin-right: 2px;
	border-radius: 4px;
	background-color: #ccc;
	padding: 8px 16px;
	cursor: pointer;
	transition: 0.2s ease-out;

	a {
		color: #000;
		text-decoration: none;
	}

	${(props) =>
		props.active &&
		css`
			background-color: #fa8500;

			a {
				color: #fff;
			}
		`};
`

export { PostTypeSelectorContainer, PostTypeSelector }
