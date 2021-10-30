import React from "react"
import { history } from "../redux/configStore"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { Text } from "../componentsLogin/"
import styled from "styled-components"

export const Header = (props) => {
  const { children, onClick } = props

  const styles = { onClick }

  return (
    <Headers>
      <AiOutlineArrowLeft
        style={{ position: "absolute", left: "0px", top: "5px" }}
        {...styles}
      />
      <Text size="16px" center>
        {children}
      </Text>
    </Headers>
  )
}

Header.defaultProps = {
  children: null,
  _onClick: () => {},
}

const Headers = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
`