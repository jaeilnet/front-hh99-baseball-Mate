import { createAction, handleAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis, img, instance } from "../../lib/axios";
import { AiOutlineConsoleSql } from "react-icons/ai";

//액션
const GET_WITH = "GET_WITH";
const GET_WRITE = "GET_WRITE";
const DELETE_GROUP = "DELETE_GROUP";
const DELETE_ATTEND = "DELETE_ATTEND";
const WISH_GROUP = "WISH_GROUP";
//스크린 참가
const GET_SCREEN = "GET_SCREEN";
const DELETE_SCREEN = "DELETE_SCREEN";

//액션함수
const getWith = createAction(GET_WITH, (withList) => ({ withList }));
const getWrite = createAction(GET_WRITE, (writeList) => ({ writeList }));
const deleteGroup = createAction(DELETE_GROUP, (deleteList) => ({
  deleteList,
}));

//찜하기
const wishGroup = createAction(WISH_GROUP, (wishList) => ({ wishList }));
//내모임 참여취소
const deleteAttend = createAction(DELETE_ATTEND, (attendList) => ({
  attendList,
}));
const getScreen = createAction(GET_SCREEN, (ScreenList) => ({ ScreenList }));
const deleteScreen = createAction(DELETE_SCREEN, (screenId) => ({ screenId }));

//초기값
const initialState = {
  //참여취소와 함께
  with_list: [],
  // 삭제와 함께
  write_list: [],
  //찜하기
  wish_list: [],
  // 스야모임
  screen_list: [],
};

//미들웨어
const getWithAPI = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/my/groups/applications`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(getWith(res.data));
      })
      .catch((err) => {
        console.log(err, "참여에러");
      });
  };
};

const getWriteAPI = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/my/groups/write`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(getWrite(res.data));
      })
      .catch((err) => {
        console.log(err, "작성에러");
      });
  };
};

//delete
const deleteGroupAPI = (groupId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/groups/${groupId}`)
      .then((res) => {
        console.log(res);
        dispatch(deleteGroup(groupId));
      })
      .catch((err) => {
        console.log(err, "삭제에러");
      });
  };
};

//참여취소
const deleteAttendAPI = (groupId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/groups/${groupId}/applications`)
      .then((res) => {
        console.log(res);
        dispatch(deleteAttend(groupId));
      })
      .catch((err) => {
        console.log(err, "참여신청이다");
      });
  };
};

//스크린 참여
const getScreenAPI = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`my/screen/applications`)
      .then((res) => {
        console.log(res);
        dispatch(getScreen(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deleteScreenAPI = (screenId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/screen/${screenId}/applications`)
      .then((res) => {
        console.log(res);
        dispatch(deleteScreen(screenId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//찜하기
const getWishGroupAPI = (props) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/my/groups/like`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => [console.log(err, "찜하기")]);
  };
};

//리듀서
export default handleActions(
  {
    [GET_WITH]: (state, action) =>
      produce(state, (draft) => {
        draft.with_list = action.payload.withList;
      }),
    [GET_WRITE]: (state, action) =>
      produce(state, (draft) => {
        draft.write_list = action.payload.writeList;
      }),
    [DELETE_GROUP]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.write_list.find(
          (c) => c.groupId === action.payload.deleteList
        );
        console.log(idx, "qweqweqwe");
        draft.write_list.splice(idx, 1);
      }),
    [DELETE_ATTEND]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.with_list.find(
          (c) => c.groupId === action.payload.attendList
        );
        draft.with_list.splice(idx, 1);
      }),
    [GET_SCREEN]: (state, action) =>
      produce(state, (draft) => {
        draft.screen_list = action.payload.ScreenList;
      }),
    [DELETE_SCREEN]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.screen_list.find(
          (c) => c.screenId === action.payload.screenId
        );
        draft.screen_list.splice(idx, 1);
      }),
    [WISH_GROUP]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  getWithAPI,
  getWriteAPI,
  deleteGroupAPI,
  deleteAttendAPI,
  getScreenAPI,
  deleteScreenAPI,
  deleteScreen,
  getWishGroupAPI,
};

export { actionCreators };
