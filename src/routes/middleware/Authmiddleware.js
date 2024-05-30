import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const auth = JSON.parse(localStorage.getItem("authUser"))
      if (isAuthProtected && !auth?.token) {
        return (
          <Redirect
            to={{ pathname: "/login" }}
          />
        );
      } 

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default Authmiddleware;
