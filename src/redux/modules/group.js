import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis, img, instance, tokenInstance, tokenApis } from "../../lib/axios";
import axios from "axios";

// const api = axios.create(
//   {
//     baseURL: "http://localhost:3001",
//     headers: {
//       "content-type": "application/json;charset=UTF-8",
//       accept: "application/json",
//     },
//   },
//   { withCredentials: true }
// );

//액션
const SET_GROUP = "SET_GROUP";
const GET_PLAY = "GET_PLAY";
const ADD_GROUP = "ADD_GROUP";
const GET_TEAM = "GET_TEAM";
const SELECT_TEAM = "SELECT_TEAM";
const DELETE_GROUP_PAGE = "DELETE_GROUP_PAGE"

//액션함수
const setGroup = createAction(SET_GROUP, (groupList) => ({ groupList }));
const getPlay = createAction(GET_PLAY, (playList) => ({ playList }));
const addGroup = createAction(ADD_GROUP, (addList) => ({ addList }));
const getTeam = createAction(GET_TEAM, (teamList) => ({ teamList }));
const del_groupPage = createAction(DELETE_GROUP_PAGE, (groupId) => ({ groupId }));

const selectTeam = createAction(SELECT_TEAM, (team) => ({ team }));
//초기값
const initialState = {
  group_list: [],
  play_list: [],
  team_list: [],
  selectTeam_list: [],

  // addlist 시험
  ex_list: [],
};

//미들웨어
const getGroupAPI = () => {
  return function (dispatch, getState, { history }) {
    tokenInstance
      .get(`/groups`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(setGroup(res.data));
      })
      .catch((err) => {
        console.log(err, "그룹조회err");
      });
  };
};

const getPlayAPI = (team) => {
  return function (dispatch, getState, { history }) {
    // const team = 103

    instance
      .get(`/kbodatas`)
      .then((res) => {
        console.log(res.data);
        dispatch(getPlay(res.data));
      })
      .catch((err) => {
        console.log(err, "경기일정err");
      });
  };
};

const getTeamAPI = (teamname) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/groups?team=${teamname}`)
      .then((res) => {
        console.log(res.data, "구단 선택");
        dispatch(getTeam(res.data));
      })
      .catch((err) => {
        console.log("팀별조회에러", err);
      });
    // }
  };
};

const addGroupMD = (formData) => {
  return function (dispatch, getState, { history }) {
    img
      .post("/groups", formData)
      .then((res) => {
        console.log(res.data);
        dispatch(addGroup(formData));
        history.replace("/groupList");
      })
      .catch((err) => console.log(err, "모임생성 err입니다."));
  };
};

const selectTeamMD = (myteam) => {
  return function (dispatch, getState, { history }) {
    const teamname = myteam.split(" ");

    instance
      .get(`/kbodatas?team=${teamname[0]}`)
      .then((res) => {
        const _team = res.data;

        const team = _team.slice(-5);

        dispatch(selectTeam(team));
      })
      .catch((err) => console.log(err, "팀선택 err입니다."));
  };
};

// 모임삭제
const delGroupPageMW = (groupId) => {
	return (dispatch, getState, {history}) => {
		tokenApis
			.delGroupDetail(groupId)
			.then((res) => {
				console.log(res)
				dispatch(del_groupPage(groupId))
			})
			.catch((err) => {
				console.log(err)
			})
	}	
}

//리듀서
export default handleActions(
  {
    [SET_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.group_list = action.payload.groupList;
      }),
    [GET_PLAY]: (state, action) =>
      produce(state, (draft) => {
        draft.play_list = action.payload.playList;
      }),
    [GET_TEAM]: (state, action) => produce(state, (draft) => {}),
    [ADD_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.ex_list.push(action.payload.teamList);
      }),
    [SELECT_TEAM]: (state, action) =>
      produce(state, (draft) => {
        draft.selectTeam_list = action.payload.team;
      }),
    [DELETE_GROUP_PAGE]: (state, action) => 
      produce(state, (draft) => {
        const idx = draft.group_list.findIndex((p) => p.groupId=== action.payload.groupId);
        if (idx !== -1) {
          draft.group_list.splice(idx, 1);
        }
      })  
  },
  initialState
);

const actionCreators = {
  getGroupAPI,
  getPlayAPI,
  addGroup,
  addGroupMD,
  getTeamAPI,
  selectTeam,
  selectTeamMD,
  delGroupPageMW
};

export { actionCreators };
