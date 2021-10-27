import GroupOne from "../pages/GroupOne";
import GroupTwo from "../pages/GroupTwo";
import GroupThree from "../pages/GroupThree";
import React, { useEffect } from "react"
import { ConnectedRouter } from "connected-react-router"
import { ClubChoice } from "../pages/ClubChoice"
import { Login } from "../pages/Login"
import { Signup } from "../pages/Signup"
import { history } from "../redux/configStore"
import { Route } from "react-router-dom"
import KAKAOhandle from "./SocialLogin/KAKAOhandle"
import { GlobalStyles } from "./GlobalStyles"
import Main from "../pages/Main"
import { useDispatch, useSelector } from "react-redux"
import { getCookie } from "./Cookie"
import { actionCreators as userActions } from "../redux/modules/user"

function App() {
  const dispatch = useDispatch()
  // const loginCheck = useSelector((state) => state.user.is_login)
  useEffect(() => {
    if (getCookie("is_login")) {
      dispatch(userActions.login_check_md())
    } else {
      window.alert("로그인을 해주세요")
      history.replace("/login")
    }
  }, [])

  return (
     
    <React.Fragment>
      <ConnectedRouter history={history}>
        <GlobalStyles />
        <Route path="/" exact component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/clubchoice" component={ClubChoice} />
        <Route path="/user/kakao/callback" component={KAKAOhandle} />
            <Route path="/groupone" exact component={GroupOne} />
          <Route path="/grouptwo" exact component={GroupTwo} />
          <Route path="/groupthree" exact component={GroupThree} />
      </ConnectedRouter>
    </React.Fragment>
  )

}

export default App;
