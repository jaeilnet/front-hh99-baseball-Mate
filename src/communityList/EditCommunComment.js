import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  ArrowBack,
  Buttons,
  Container,
  InputCheck,
  Inputs,
  Text,
} from "../components";
import { Picture } from "../componentsGroupAdd/Picture";
import { Preview } from "../componentsGroupAdd/Preview";
import { usePreview } from "../customHook/usePreview";
import { actionCreators as actionCr } from "../redux/modules/community";

const EditCommunComment = (props) => {
  const dispatch = useDispatch();
  //이미지 미리보기 삭제 커스텀훅
  const [imgPreview, deletePreview, preview] = usePreview("");

  // 입력창
  const [content, setCotent] = useState("");

  //입력체크
  const submitBtn = (e) => {
    if (!content) {
      window.alert("빈란을 채워주세요");
      // console.log("빈값있음")
      return;
    }

    const formData = new FormData();

    formData.append("content", content);
    formData.append("file", preview);
    formData.append("myTeam", null);

    for (const keyValue of formData) console.log(keyValue);
    dispatch(actionCr.postAddAPI(formData));
    e.target.disabled = true;
  };

  return (
    <div>
      <ArrowBack>커뮤니티 글작성</ArrowBack>
      <Border />
      {/* 글작성 */}
      <Inputs
        textarea
        width="100%"
        name="content"
        value={content}
        placeholder="내용을 입력해주세요."
        height="400px"
        onChange={(e) => setCotent(e.target.value)}
      >
        {/* 안에 내용 */}
        {content && <InputCheck />}
      </Inputs>

      <Container>
        {/* 이미지 미리 */}
        <Text margin="7px 0">
          사진
          {preview && <InputCheck />}
        </Text>

        {/* 기본이미지 */}
        <ImgBox>
          <Picture basic onChange={imgPreview} name="file">
            {preview ? 1 : 0}/1
          </Picture>
          {/* 업로드 이미지 미리 */}
          <Preview
            src={preview ? URL.createObjectURL(preview) : props.defaultImg}
            name="preview"
            onClick={deletePreview}
          />
        </ImgBox>
        <Buttons _onClick={submitBtn}>모임 수정</Buttons>
      </Container>
    </div>
  );
};

export default EditCommunComment;

const Border = styled.div`
  width: 100%;
  border: 1px solid #e7e7e7;
  margin: ${(props) => props.margin};
`;

const ImgBox = styled.div`
  display: flex;
  gap: 10px;
`;
