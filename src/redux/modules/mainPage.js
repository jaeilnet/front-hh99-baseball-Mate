import { createAction, handleActions} from "redux-actions";
import produce from "immer";
import { instance } from "../../lib/axios";

const LOAD_GAMETIME = "LOAD_GAMETIME";
const LOAD_HOTGROUP = "LOAD_HOTGROUP";
const LOAD_MAIN_TIMELINE = "LOAD_MAIN_TIMELINE";

const load_gameTime = createAction(LOAD_GAMETIME, (gamelist) => ({ gamelist }));

const load_mainTimeline = createAction(LOAD_MAIN_TIMELINE, (mainTimeline) => ({
  mainTimeline,
}))

const initialState = {
  gamelist: [],
  hotGroup: [],
  mainTimeline: [],
}

const gameTimeMW = () => {
  return (dispatch) => {
    instance
      .get("/kbodata")
      .then((res) => {
        // console.log(res)
        const gamelist = res.data
        const today = new Date()
        // console.log(today.toLocaleDateString('en-KR').split("/")[1]) //-> 10/27, 27
        // console.log(gamelist[124].date.split(" ")[0].split(".")[1]) // -> 10/30
        // let nowDate = today.toLocaleDateString('en-KR').split("/").slice(0,2).join("-")
        // let gameDay = gamelist[124].date.split(" ")[0].split(".").join("-")
        let nowDate = today.toLocaleDateString("en-KR").split("/")[1]
        let gameDay = gamelist[124].date.split(" ")[0].split(".")[1]

        // for (let i=0; i < gamelist.length; i++) {
        // 	// let date =gamelist[i].date
        // 	let date = gamelist[i].date.split(" ")[0].split(".")[1]
        // 		// console.log(nowDate)
        // 		// console.log(date)
        // 		if(nowDate <= date) {
        // 			return console.log(date)
        // 		}
        // 	// console.log(date)
        // }
        // if(nowDate <= gameDay) {
        // 	console.log("시간비교",true)
        // } else {
        // 	console.log("시간비교",false)
        // }

        dispatch(load_gameTime(gamelist))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const loadMainTimelineMW = (number) => {
  return (dispatch, getState, { history }) => {
    instance
      .get(`/timelines?count=${number}`, number)
      .then((res) => {
        const mainTimeline = res.data
        // console.log("메인타임라인", mainTimeline)
        dispatch(load_mainTimeline(mainTimeline))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

//reducer
export default handleActions(
  {
    [LOAD_GAMETIME]: (state, action) =>
      produce(state, (draft) => {
        draft.gamelist = action.payload.gamelist
      }),

    [LOAD_MAIN_TIMELINE]: (state, action) =>
      produce(state, (draft) => {
        draft.mainTimeline = action.payload.mainTimeline
      }),
  },
  initialState
)

const mainCreators = {
  gameTimeMW,

  loadMainTimelineMW,
}

export {mainCreators};