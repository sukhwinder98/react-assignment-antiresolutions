import PropTypes from "prop-types"
import React from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import { connect } from "react-redux"

import { userRoutes, authRoutes } from "./routes/allRoutes"

import Authmiddleware from "./routes/middleware/Authmiddleware"

import VerticalLayout from "./components/VerticalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

import "./assets/scss/theme.scss"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PageNotFound from "./pages/Authentication/PageNotFound"

const App = props => {
  // function getLayout() {
  //   let layoutCls = VerticalLayout

  //   switch (props?.layout?.layoutType) {
  //     case "horizontal":
  //       layoutCls = HorizontalLayout
  //       break
  //     default:
  //       layoutCls = VerticalLayout
  //       break
  //   }
  //   return layoutCls
  // }

  const Layout = VerticalLayout

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes?.map((route, idx) => (
            <Authmiddleware
              path={route?.path}
              layout={NonAuthLayout}
              component={route?.component}
              key={idx}
              isAuthProtected={false}
            />
          ))}
          {userRoutes?.map((route, idx) => (
            <Authmiddleware
              path={route?.path}
              layout={Layout}
              component={route?.component}
              key={idx}
              isAuthProtected={true}
              exact={true}
            />
          ))}
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer closeButton={false} position="bottom-right" />
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
