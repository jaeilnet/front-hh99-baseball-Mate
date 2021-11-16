import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import Progress from "../components/Progress"

import colorUsers from "../shared/icon/colorUsers.svg"

const GroupCard = ({ screen_list }) => {
  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL

  const history = useHistory()

  const [close, setClose] = useState(false)

  const serverURL = IMAGES_BASE_URL

  // const date = new Date()

  // 모집중, 마감중 표시

  useEffect(() => {
    if (screen_list.dday < 0 || screen_list.canApplyNum === 0) {
      setClose(true)
    } else {
      setClose(false)
    }
  }, [])

  return (
    <Container
      onClick={() => {
        history.push("/screendetail/" + screen_list.screenId)
      }}
    >
      <Card flex="flex" >

        <ImgBox url={serverURL + screen_list.filePath} />
        <Warp flex="flex" direction="column" width="250px" marginLeft="20px">
          
          <Warp flex="flex" margin="0 0 8px 0">
            {close ? (
              <Ellipse
                borderColor="#C4C4C4"
                background="#C4C4C4"
                color="#FFFFFF"
              >
                모집완료
              </Ellipse>
            ) : (
              <Ellipse
                borderColor="#F25343"
                background="#F25343"
                color="#FFFFFF"
              >
                모집중
              </Ellipse>
            )}

            {screen_list && screen_list.dday >= 0 && screen_list.canApplyNum !== 0 ? (
              <Ellipse borderColor="#498C9A" background="#498C9A" color="#FFFFFF" marginLeft="4px">
                D - {screen_list.dday}
              </Ellipse>
            ) : (
              ""
            )}
          </Warp>

          <Warp flex="flex" marginB="4px">
            <Text size="12px" color="#777777">
              {screen_list.groupDate}
            </Text>
            {/* <Slice> &ensp;|&ensp; </Slice>
            <Text size="12px" color="#777777">
              {props.stadium}
            </Text> */}
            <Slice> &ensp;|&ensp; </Slice>
            <Text size="12px" color="#777777">
              최대 {screen_list.peopleLimit}명
            </Text>
          </Warp>

          <Text
            size="15px"
            weight="bold"
            width="250px"
            height="40px"
            lineHeight="20px"
            marginB="8px"
          >
            {screen_list.title}
          </Text>

          <Warp
            flex="flex"
            justify="space-between"
            align="center"
            margin="0 0 0 0"
          >
            <Progress {...screen_list} />
            <Warp flex="flex">
              <img src={colorUsers} alt="users" />
              <Text size="12px" color="#F25343" weight="bold" spacing="-0.03em;">
                &nbsp;{screen_list.canApplyNum}명&nbsp; 
              </Text>
              <Text size="12px" color="#F25343" spacing="-0.03em;">
                남음
              </Text>
            </Warp>
          </Warp>
          
        </Warp>  

      </Card>
    </Container>
  )
}

export default GroupCard

const Container = styled.div`
  width: 385px;
  margin: 0 10px 30px 10px;
`

const Warp = styled.div`
  /* width: 100%; */
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
  margin-bottom: ${(props) => props.marginB};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
`

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
`

const Card = styled.div`
  width: 385px;
  height: 110px;
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  background: #ffffff;
  position: relative;
`

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
`

const ImgBox = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 4px;
  background: #c4c4c4;
  border: 1px solid #e7e7e7;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`
const Circle = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 4px;
  background: #c4c4c4;
  border: 1px solid #e7e7e7;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const Slice = styled.div`
  color: rgba(196, 196, 196, 0.3);
  font-size: 12px;
`