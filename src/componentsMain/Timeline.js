import React from "react";
import styled from "styled-components";

const Timeline = (props) => {

	return (
		<React.Fragment>
			<Container>

				{/* 타임라인 제목 */}
				<Warp flex="flex" justify="space-between">
					<Text size="16px" weight="bold">
						생생 타임라인 💬
					</Text>
					<Text size= "12px" weight= "500px" color="#C4C4C4">
						+ More
					</Text>
				</Warp>

				{/* 타임라인 리스트 */}
				<TimeLineCard>
				누가 이기고있나요?
				</TimeLineCard>
				<TimeLineCard>
				누가 이기고있나요?
				</TimeLineCard>
				<TimeLineCard>
				누가 이기고있나요?
				</TimeLineCard>

			</Container>
		</React.Fragment>
	)
}

export default Timeline;

const Container = styled.div`
	width: 335px; 
	/* height: 177px; */
	margin: 20px auto;
`;

const Warp = styled.div`
	/* width: 100%; */
	display: ${(props) => props.flex};
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	margin-left: ${(props) => props.marginLeft};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
`;

const Text = styled.div`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
`;

const TimeLineCard = styled.div`
	/* width: 300px; */
	height: 50px;
	text-align: center;
	background-color: #ffdeeb;
	margin: auto;
	margin-top: 12px;
	border-radius: 10px;
`;

