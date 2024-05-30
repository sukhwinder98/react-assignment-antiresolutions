import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { useState } from "react"
import { Row, Col, Container, Form, Input, FormFeedback } from "reactstrap"

import { withRouter, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import * as Yup from "yup"
import { useFormik } from "formik"

import {
  loginUser,
} from "../../store/actions"

// import showeye from "../../assets/images/showeye.svg"
// import hideeye from "../../assets/images/hideeye.svg"

import TextLoader from "../../components/textLoader"

const Login = props => {
  const [passwordInputType, setPasswordInputType] = useState(true)
  const [loader, setLoader] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [action, setAction] = useState("")
  const dispatch = useDispatch()

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password:  "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Username is required."),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Enter Valid Password"),
    }),

    onSubmit: async values => {
      dispatch(loginUser(values, props.history))
    },
  })


  const reduxData = useSelector(state => state?.Login)

  useEffect(() => {
    setLoader(reduxData?.loading)
    setSpinner(reduxData?.spinner)

    if (reduxData?.error || reduxData?.user) {
      reduxData?.loading === false ? setAction(false) : null
      reduxData?.spinner === false ? setAction(false) : null
    }
  }, [reduxData])

  return (
    <React.Fragment>
      <div
        className={loader ? "account-pages overlayerloader" : "account-pages"}
      >
        <Container fluid>
          <Row>
            <Col lg={6}>
              <div className="right_content">
                <div className="text-center mt-2">
                  <h5 className="m-0">Login</h5>
                </div>

                <div className="p-2 mt-4">
                  <Form
                    className="form-horizontal"
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <div className="mb-3 form-g position-relative">
                      <Input
                        name="email"
                        className="form-control input-outline"
                        placeholder="Username/Email"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <>
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        </>
                      ) : null}
                    </div>

                    <div className="mb-3 form-g position-relative">
                      <Input
                        name="password"
                        autoComplete="on"
                        className="input-outline"
                        value={validation.values.password || ""}
                        type={passwordInputType ? "password" : "text"}
                        placeholder="**********"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched.password &&
                            validation.errors.password
                            ? true
                            : false
                        }
                      />
                      <div
                        onClick={() => setPasswordInputType(!passwordInputType)}
                      >
                        {/* <img
                          className="pw-icon"
                          height={18}
                          src={passwordInputType ? showeye : hideeye}
                          alt=""
                        /> */}
                      </div>

                      {validation.touched.password &&
                        validation.errors.password ? (
                        <>
                          <FormFeedback type="invalid">
                           
                            {validation.errors.password}
                          </FormFeedback>
                        </>
                      ) : null}

                    </div>


                    <div className="mt-3">
                      <button
                        className="btn btn-primary w-100 waves-effect waves-light"
                        type="submit"
                        disabled={reduxData?.loading || spinner}
                      >
                        {spinner ? <div className="ui active inline loader"></div> : "Sign In"}
                      </button>
                    </div>

                    <div className="mt-4 text-center"></div>

                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <TextLoader loader={loader} loading={action} />
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
}
