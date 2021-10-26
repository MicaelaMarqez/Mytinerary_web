import "./style.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {BrowserRouter, Redirect, Route, Switch,} from "react-router-dom";
import Cities from "./pages/Cities";
import City from "./pages/City";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./pages/Form";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { connect } from "react-redux";
import { useEffect } from "react";
import userActions from "./redux/actions/userActions";

const App = (props) => {
  
  useEffect(() => {
    if(localStorage.getItem("token")){
      props.logInLS(localStorage.getItem("token"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
    <BrowserRouter>
    <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/cities" component={Cities}/>
          <Route path="/city/:id" component={City}/>
          <Route path="/form" component={Form}/>
          {!props.token && <Route path="/sign_in" component={SignIn}/>}
          {!props.token && <Route path="/sign_up" component={SignUp}/>}
          <Route path="/notfound" component={NotFound}/>
          <Redirect to="/"/>
        </Switch>
      <Footer/>
      </BrowserRouter>
      </>
  )
}

const mapStateToProps = (state) => {
  return{
      token: state.user.token
  }
}

const mapDispatchToProps = {
  logInLS: userActions.logInLS,
}

export default connect(mapStateToProps,mapDispatchToProps)(App)