import styled, { css } from 'styled-components'

const LoginFormContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	label {
		margin-bottom: 8px;
	}
`

const LoginFormElement = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	max-width: 300px;
	margin-bottom: 22px;

	${(props) => props.noMaxWidth && css`max-width: unset;`};
`

export { LoginFormContainer, LoginFormElement }
