import React, { useEffect, useState } from "react"
import {
  Inputs,
  Text,
  InputCheck,
  Container,
  ArrowBack,
  Buttons,
} from "../components"
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineDown,
} from "react-icons/ai"
import { Picture } from "../componentsGroupAdd/Picture"
import styled from "styled-components"
import { clubImageSrc } from "../shared/clubImage"
import { Preview } from "../componentsGroupAdd/Preview"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as groupActions } from "../redux/modules/group"
import { GroupAddModal } from "../componentsGroupAdd/GroupAddModal"
import { groupDetailCreators } from "../redux/modules/groupDetail"
import { useParams } from "react-router"

export const GroupEdit = (props) => {

  const params = useParams();
  const groupId = params.groupId

  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL;
  const ip = IMAGES_BASE_URL;
  const dispatch = useDispatch()

  const selectTeam_list = useSelector((state) => state.group.selectTeam_list)

  const loadDetail = useSelector((state) => state.groupDetail.groupPage)
  const mylist = useSelector((state) => state.groupDetail.mylist)

  const img = ip + loadDetail.filePath

  // loadDetail ? ip + loadDetail.filePath : props.defaultImg
  console.log("모임수정",loadDetail)
  
  // 구단선택
  const team = loadDetail.groupDate.split("vs")[1];
  // console.log("팀",team);

  // console.log(selectTeam_list)
  // 인풋 값 state
  const [inputValue, setInputValue] = useState({
    title: loadDetail?.title,
    // selectTeam: team,
    peopleLimit: loadDetail?.peopleLimit,
    content: loadDetail?.content,
    src: loadDetail ? ip + loadDetail.filePath : props.defaultImg,
  })

  // 이미지 미리보기 state
  const [preview, setPreview] = useState(img)

  // 모달 보기 state
  const [showModal, setShowModal] = useState(false)

  const [groupDate, setGroupDate] = useState(loadDetail.groupDate)

  const { content, peopleLimit, title, selectTeam, src } = inputValue

  useEffect(() => {
    dispatch(groupDetailCreators.loadGroupPageMW(groupId))
  }, [inputValue])

  // 이미지 업로드 / 미리보기

  const imgPreview = (e) => {
    console.log("이미지업로드",e.target.files[0])
    setPreview(e.target.files[0])
  }

  // 미리보기 삭제,

  const deletePreview = () => {
    if (!preview) {
      window.alert("삭제 할 사진이 없어요")
      return
    }

    setPreview("")
    console.log("삭제를 해야되는데..")
  }

  const showModalBtn = () => {
    // if (selectTeam) setShowModal(!showModal)
    window.alert("수정에서는 변경할 수 없습니다.")
  }

  // 인풋 입력 값 추적 e.target.value 대행

  const onChange = (e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  useEffect(() => {
    if (selectTeam) {
      console.log(selectTeam, "asdasd")
      dispatch(groupActions.selectTeamMD(selectTeam))
    }
  }, [selectTeam])

  //  인원수 + 버튼
  const plusBtn = () => {
    if (peopleLimit < 8) {
      setInputValue({
        ...inputValue,
        peopleLimit: peopleLimit + 1,
      })
    } else {
      window.alert("8명 이상은 안됩니다")
      return
    }
  }

  // 인원수 - 버튼
  const minusBtn = () => {
    if (peopleLimit !== 0) {
      setInputValue({
        ...inputValue,
        peopleLimit: peopleLimit - 1,
      })
    } else {
      window.alert("0이하는 선택불가")
    }
  }

  // 입력체크
  const submitBtn = (e) => {
    // const _emptyValue = Object.values(inputValue).map((e) => {
    //   if (!e) {
    //     return false
    //   }
    // })

    // const emptyValue = _emptyValue.includes(false)

    // if (emptyValue) {
    //   window.alert("빈란을 채워주세요")
    //   console.log("빈값있음")
    //   return
    // }

    const formData = new FormData()

    formData.append("title", inputValue.title)
    formData.append("groupDate", groupDate)
    formData.append("content", inputValue.content)
    formData.append("peopleLimit", inputValue.peopleLimit)
    // formData.append("selectTeam", inputValue.selectTeam)
    formData.append("file", preview)

    dispatch(groupDetailCreators.editGroupPageMW(groupId, formData))
    e.target.disabled = true
    for (const keyValue of formData) console.log(keyValue)
  }

  return (
    <Container>
      <ArrowBack>모임 수정</ArrowBack>

      {/* 모임 타이틀 */}
      <div style={{ marginTop: "15px" }}>
        <Inputs
          value={ title }
          name="title"
          onChange={onChange}
          placeholder="모임명을 입력해주세요"
        >
          모임명
          {title && <InputCheck />}
        </Inputs>

        {/* 구단선택 */}
        <Grid>
          <Text>
            구단선택
            {selectTeam && <InputCheck />}
          </Text>
          <Inputs
            name="selectTeam"
            value={selectTeam}
            dropdown
            onChange={onChange}
            disabled
          >
            <Option value="">구단선택</Option>
            {clubImageSrc.map((e) => (
              <Option key={e.id} value={e.name}>
                {e.name}
              </Option>
            ))}
          </Inputs>
        </Grid>

        {/* 일정 선택 */}
        <Grid>
          <TextBox>
            <Text>일정선택</Text>

            {/* 일정 정보 */}
            <GameDate>
              {loadDetail ? <Text margin="0 10px">{loadDetail.groupDate}</Text> : "" }
              <AiOutlineDown color="777777" onClick={showModalBtn} />
            </GameDate>
          </TextBox>

          {/* 일정선택 모달창 props 전달 */}
          {showModal ? (
            <GroupAddModal
              selectTeam_list={ selectTeam_list }
              setGroupDate={setGroupDate}
              setShowModal={setShowModal}
            ></GroupAddModal>
          ) : (
            ""
          )}
        </Grid>

        {/* <div>인원수 선택</div> */}
        <PeopleSelectContainer>
          <Text>인원수 선택</Text>
          {peopleLimit > 0 ? <InputCheck /> : null}

          {/* 인원수 + - 버튼 */}
          <PeopleSelect>
            <AiOutlineMinusCircle color="#498C9A" onClick={minusBtn} />
            <PeopleCount>
              <Text center size="18px" name="peopleLimit" onChange={onChange}>
                {peopleLimit}
              </Text>
            </PeopleCount>
            <AiOutlinePlusCircle color="#498C9A" onClick={plusBtn} />
          </PeopleSelect>
        </PeopleSelectContainer>

        {/* 모임소개 글 */}
        <Inputs
          textarea
          name="content"
          value={ content }
          placeholder="모임소개를 해주세요 (최대길이 500자)"
          onChange={onChange}
          maxLength="500"
          height="147px"
        >
          모임소개
          {content && <InputCheck />}
        </Inputs>

        {/* 이미지 미리보기 */}
        <Text margin="20px 0">
          사진
          {preview && <InputCheck />}
        </Text>

        <ImgBox>
          {/* 기본이미지 */}
          <Picture basic onChange={imgPreview} name="file">
            {preview ? 1 : 0} / 1
          </Picture>

          {/* 업로드 이미지 미리보기 */}
          <Preview
            src={ 
              // 이미지가 받아온 이미지와 같으면 받아온 이미지
              preview === img ? 
              preview 
              : 
              // 프리뷰가 빈값이면 빈이미지, 아니면 새로운 이미지
              preview === "" ?
              props.defaultImg : URL.createObjectURL(preview)
            }
            name="preview"
            onClick={deletePreview}
          />
        </ImgBox>
      </div>

      <ButtonBox>
        <Buttons complete _onClick={submitBtn}>
          모임 수정
        </Buttons>
      </ButtonBox>
    </Container>
  )
}

GroupEdit.defaultProps = {
  defaultImg:
    "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
}

const Grid = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e7e7e7;
`

const ButtonBox = styled.div`
  position: fixed;
  width: 335px;
  bottom: 20px;
`

const PeopleCount = styled.div`
  width: 50px;
`

const PeopleSelectContainer = styled.div`
  margin: 24px 0 40px;
  display: flex;
  position: relative;
  align-items: center;
`

const PeopleSelect = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0px;
`

const Option = styled.option`
  text-align: center;
`

const ImgBox = styled.div`
  display: flex;
  gap: 10px;
`
const TextBox = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  cursor: pointer;
  justify-content: space-between;
`

const GameDate = styled.div`
  display: flex;
`