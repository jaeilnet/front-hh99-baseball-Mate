import React from "react";
import styled from "styled-components";

const Progress = (props) => {
	const peopleLimit = props.group.peopleLimit;
	const canApplyNum = props.group.canApplyNum;

	console.log((canApplyNum/peopleLimit)*100 + "%")

	return (
		<ProgresBar>
			<HighLight width={(canApplyNum/peopleLimit)*100 + "%"}/>
		</ProgresBar>
	)
}

export default Progress;

const ProgresBar = styled.div`
	background: #E7E7E7;
	width: 230px;
	height: 1.6px;
`;

const HighLight = styled.div`
	background: #FF4B38;
	width: ${(props) => props.width};
	height: inherit;
`;