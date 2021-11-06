import React from "react";
import styled from "styled-components";

import Progress from "../components/Progress";

import calendar from "../shared/icon/calendar.svg"
import location from "../shared/icon/location.svg"
import colorUsers from "../shared/icon/colorUsers.svg"
import users from "../shared/icon/users.svg"


const Info = (props) => {

	// 사진 ip주소 + 사진이름 조합
	const ip = "http://54.180.148.132/images/";
	const img = props.filePath;
	const imageUrl = ip + img

	const leftPeople = props.peopleLimit - props.nowAppliedNum

	return (
		<Container>
			<Img src={imageUrl} alt="" />

			{/* 타이틀 */}
			<TitleBox>
				<Warp margin="0 0 11px 0">
					<Ellipse borderColor="#F25343" background="#F25343" color="#FFFFFF">
						모집중
					</Ellipse>
					<Ellipse borderColor="#498C9A" color="#498C9A" marginLeft="6px">
						D-10
					</Ellipse>
				</Warp>
				
				<Text
          size="16px"
          weight="bold"
          width="295px"
          height="46px"
          lineHeight="23px"
        >
					{props.title}
				</Text>

				<Warp justify="space-between" align="center" marginT="11px" >
					<Progress group={props}/>
					<Warp flex="flex">
						<img src={colorUsers} alt="users"/>
						<Text size="12px" color="#F25343" weight="bold" spacing="-0.03em;">
							&nbsp;{leftPeople}명&nbsp;
						</Text>
						<Text size="12px" color="#F25343" spacing="-0.03em;">
							남음
						</Text>
					</Warp>
				</Warp>
			</TitleBox>

			{/* 모임 정보 */}
			<Box height="163px" background="rgba(247, 247, 247, 0.5)" position="relative" margin="20px">
				<Warp width="100%" justify="space-around" align="center" position="absolute" padding="0 40px 0 40px" style={{top:"78%"}}>
					<img src={calendar} alt="calendar" />
					<Text color="#777777" size="12px">{props.groupDate}</Text>
					<Slice> &ensp;|&ensp; </Slice> 
					<img src={location} alt="location" />
					<Text color="#777777" size="12px">{props.stadium}</Text>
					<Slice> &ensp;|&ensp; </Slice> 
					<img src={users} alt="users" />
					<Text color="#777777" size="12px">최대 {props.peopleLimit}명</Text>
				</Warp>
			</Box>

			{/* 유저정보 */}
			<Box height="80px" background="#fff" flex="flex" align="center" padding="18px">
				<Warp width="55px" height="55px">
					<Circle width="48px" height="48px" radius="50px" background="#C4C4C4"/>
				</Warp>
				<Warp direction="column" marginLeft="12px">
					<Text size="14px" weight="bold"  margin="1px">{props.createdUserName}</Text>
					<Text size="12px" color="#C4C4C4" margin="1px">서울시 강서구</Text>
				</Warp>
			</Box>

			{/* 모임소개 */}
			<Box height="121px" background="#F2FAFC" padding="20px">
				<Text size="16px" weight="bold" margin="0 0 15px 0 ">모임소개</Text>
				<Text size="14px" color="#333333">{props.content}</Text>
			</Box>

			<Rectangle/>
		</Container>
	)
}

export default Info;

const Container = styled.div`
  width: 375px;
  /* background-size: cover; */
  /* height: auto; */
  margin: 0 auto;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 375px;
  background-color: #c4c4c4;
`;

const TitleBox = styled.div`
  position: absolute;
  left: 50%;
  top: 345px;
  transform: translateX(-50%);
  width: 335px;
  height: 139px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 16px;
  z-index: 1;
`;

const Warp = styled.div`
  display: flex;
  width: ${(props) => props.width};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
  margin-top: ${(props) => props.marginT};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
`;

const Ellipse = styled.div`
  width: 55px;
  height: 24px;
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1px;
  margin-left: ${(props) => props.marginLeft};
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => props.color};
`;

const Text = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
  line-height: ${(props) => props.lineHeight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Box = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  padding: ${(props) => props.padding};
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  position: ${(props) => props.position};
`;

const Circle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  background: #c4c4c4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Slice = styled.div`
  color: #d8d8d8;
  font-size: 12px;
`;

const Rectangle = styled.div`
	background: #E7E7E7;
	width: 100%;
	height: 6px;
`;