import styled, { css } from 'styled-components'

export default styled.button`
	border-radius: 6px;
	background-color: #fa8500;
	border: 2px solid #fa8500;
	font-size: 16px;
	font-weight: 600;
	color: #fff;
	padding: 8px 20px;
	min-width: 100px;
	max-width: unset;

	${(props) =>
		props.secondary &&
		css`
			background-color: #fff;
			color: #fa8500;
		`};
`
