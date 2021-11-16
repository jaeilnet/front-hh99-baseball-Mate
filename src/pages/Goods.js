import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  Container,
  Header,
  MoreContainer,
  Text,
  MarginBottom,
  NaviBar,
} from "../components"
import { Card } from "../componentsGoods/Card"
import goodBanner from "../shared/icon/goodBanner.png"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as goodsActions } from "../redux/modules/goods"
import { history } from "../redux/configStore"
import { Banner } from "../components/Banner"

export const Goods = () => {
  const dispatch = useDispatch()

  const goods_list = useSelector((state) => state.goods.goods_list)

  const [sortDate, setSortDate] = useState(false)
  const [sortItem, setSortItem] = useState(false)

  const goodsAddBtn = () => {
    history.push("/goods/goodsadd")
  }
  // 최신순
  const DateList = () => {
    setSortDate(!sortDate)
    setSortItem(false)
  }

  // 인기순
  const HotList = () => {
    setSortItem(!sortItem)
    setSortDate(false)
  }

  console.log(goods_list)

  useEffect(() => {
    // window.alert("준비 중입니다.")
    dispatch(goodsActions.getGoodsMD())
  }, [])

  return (
    <>
      <Header goods />
      <Banner bg>
        <GoodsBannerBox>
          <Logo src={goodBanner} />
          <TextBox>
            <Text color="#fff" bold size="16px">
              나의 굿즈를 뽐내봐
            </Text>
            <Text color="#FFAFA7" margin="6px 0">
              싸인볼은 물론! 모자 싸인까지!
            </Text>
          </TextBox>
        </GoodsBannerBox>
      </Banner>

      <Container>
        {/* <Position> */}
        <MoreContainer>
          <Text size="16px" bold>
            굿즈 목록
          </Text>
          <BtnGroup>
            <MoreBtn onClick={HotList}>
              <Text color={sortItem ? "#498C9A" : "#C4C4C4"}>인기순</Text>
            </MoreBtn>
            <MoreBtn onClick={DateList}>
              <Text color={sortDate ? "#498C9A" : "#C4C4C4"}>최신순</Text>
            </MoreBtn>
          </BtnGroup>
        </MoreContainer>

        {/* 굿즈 카드 */}

        <CardContainer>
          {goods_list && goods_list.length > 0 ? (
            goods_list.map((e) => {
              return <Card key={e.goodsId} {...e} />
            })
          ) : (
            <div>없음</div>
          )}
        </CardContainer>
        {/* </Position> */}
      </Container>

      <MarginBottom />
      <NaviBar writeBtn onClick={goodsAddBtn} />
    </>
  )
}

const TextBox = styled.div``

const GoodsBannerBox = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  margin: 20px 10px 20px 20px;
  width: 64px;
  height: 64px;
`
const BtnGroup = styled.div``

const MoreBtn = styled.button`
  margin-left: 10px;
  cursor: pointer;
  color: #498c9a;
  border: none;
  background-color: transparent;
`

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
`
