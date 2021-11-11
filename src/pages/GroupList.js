import React, { useEffect, useRef, useState } from "react"
import { Card, Carousel, Image } from "react-bootstrap"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
//swiper
import Swipers from "../components/Swipers"
import GroupCard from "../componentsGroupList/GroupCard"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as groupCr } from "../redux/modules/group"
import { baseUrl, clubImageSrc } from "../shared/clubImage"
import { SwiperSlide } from "swiper/react"
import {
  Container,
  Header,
  MoreContainer,
  Text,
  MarginBottom,
  NaviBar,
} from "../components"
// import Pancil from "../shared/icon/Pancil.png";
import PancilBtn from "../components/PancilBtn"
import { InfinityScroll } from "../components/InfinityScroll"

const GroupList = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const group_list = useSelector((state) => state.group.group_list)
  // console.log(group_list);
  //팀별
  const team_list = useSelector((state) => state.group.team_list)

  const [infinity, setInfinity] = useState({
    start: 0,
    next: 3,
  })

  console.log(team_list)
  let team = ""
  function newPeople() {
    history.push("/grouplist/groupadd")
  }

  function choose() {
    history.push("/groupdate")
  }

  useEffect(() => {
    dispatch(groupCr.getGroupAPI(infinity))
    dispatch(groupCr.getTeamAPI(team))
  }, [team, infinity])

  return (
    <>
      <InfinityScroll
        callNext={() => {
          setInfinity({
            start: infinity.start,
            next: (infinity.next += 3),
          })
        }}
        is_next={group_list > infinity.next}
        // loading={is_loading}
      >
        <Header nowBtn2 />
        <Container>
          <Broder />
          {/* 
        {team_list.map((e) => ( */}
          <div>
            <Swipers>
              <div style={{ marginRight: "10px" }}>
                <Image
                  style={{ width: "68px", height: "68px" }}
                  roundedCircle
                  src="https://blog.kakaocdn.net/dn/bvJWww/btqF1bBafWG/VwoCNfWLEUCmC2iPTrivj0/img.jpg"
                ></Image>
                <Text size="11px" center>
                  전체
                </Text>
              </div>

              {clubImageSrc.map((e) => (
                <SwiperSlide
                  style={{ width: "68px", marginRight: "15px" }}
                  onClick={() => {
                    console.log(e.name)
                    // dispatch(groupCr.getTeamAPI(e.short_name));
                    team = e.name

                    // history.push(`/${e.name}`);
                  }}
                >
                  <Image
                    src={baseUrl + e.img}
                    style={{ width: "100%" }}
                    roundedCircle
                  />
                  <Text size="11px" center>
                    {team}
                  </Text>
                </SwiperSlide>
              ))}
            </Swipers>
          </div>
          {/* ))} */}
          <MoreContainer>
            <div style={{ display: "block" }}>
              <strong>모임 목록</strong>
            </div>
            <div
              onClick={choose}
              style={{
                cursor: "pointer",
                fontSize: "13px",
                color: "#C4C4C4",
              }}
            >
              일정선택
            </div>
          </MoreContainer>
          <Broder />
          {group_list.map((e, idx) => {
            // console.log(e)
            team = e.name
            return <GroupCard key={idx} {...e} />
          })}
          <PancilBtn onClick={newPeople} />
        </Container>

        <MarginBottom />
        <NaviBar />
      </InfinityScroll>
    </>
  )
}
export default GroupList

const Broder = styled.div`
  border: 1px solid #e7e7e7;
  margin-top: 9px;
  margin-bottom: 20px;
`
