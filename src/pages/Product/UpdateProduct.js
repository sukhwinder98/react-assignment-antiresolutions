import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Input, FormFeedback, Form } from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"
import { withRouter } from "react-router-dom"

import TextLoader from "../../components/textLoader"
import { toast } from "react-toastify"
import { FocusError } from 'focus-formik-error'
import { useParams } from "react-router-dom";
import { getProductDetail, handleUpdateProduct } from "../../helpers/backend_helper";

const UpdateProduct = props => {
    const params = useParams()
    const [loader, setLoader] = useState("")
    const [inputKey, setInputKey] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedFile, setSelectedFile] = useState([]);
    const [prodInfo, setProdInfo] = useState()

    useEffect(() => {
        if (params?.id) {
            handleProductDetail(params?.id)
        }
    }, [])

    const handleProductDetail = async (id) => {
        setLoader(true)
        try {
            const result = await getProductDetail(id)
            setProdInfo(result?.data)
            setLoader(false)

        } catch (error) {
            setLoader(false)
        }
    }

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues: {
            title: prodInfo?.title || "",
            brand: prodInfo?.brand || "",
            category: prodInfo?.category || "",
            availabilityStatus: prodInfo?.availabilityStatus || "",
            description: prodInfo?.description || "",
            discountPercentage: prodInfo?.discountPercentage || "",
            minimumOrderQuantity: prodInfo?.minimumOrderQuantity || "",
            price: prodInfo?.price || "",
            returnPolicy: prodInfo?.returnPolicy || "",
            shippingInformation: prodInfo?.shippingInformation || "",
            warrantyInformation: prodInfo?.warrantyInformation || "",
            stock: prodInfo?.stock || "",
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required("Title is required."),
            brand: Yup.string()
                .required("Brand name is required."),
            category: Yup.string()
                .required("Category is required."),
            availabilityStatus: Yup.string()
                .required("Availability status is required."),
            description: Yup.string()
                .required("Description is required."),
            discountPercentage: Yup.string()
                .required("Discount Percentage is required."),
            minimumOrderQuantity: Yup.string()
                .required("Minimum Order Quantity is required."),
            returnPolicy: Yup.string()
                .required("Return Policy is required."),
            shippingInformation: Yup.string()
                .required("Shipping Information is required."),
            warrantyInformation: Yup.string()
                .required("Warranty Information is required."),
            stock: Yup.string()
                .required("Stock is required."),
        }),
        onSubmit: async values => {
            let data = new URLSearchParams({
                title: values.title,
                brand: values.brand,
                category: values.category,
                availabilityStatus: values.availabilityStatus,
                description: values.description,
                discountPercentage: values.discountPercentage,
                minimumOrderQuantity: values.minimumOrderQuantity,
                returnPolicy: values.returnPolicy,
                shippingInformation: values.shippingInformation,
                warrantyInformation: values?.warrantyInformation,
                stock: values.stock,
                image: selectedFile
            })

            try {
                setLoader(true)
                let res = await handleUpdateProduct(params?.id, data)
                if (res) {
                    setLoader(false)
                    toast.success("Product updtated succefully", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }

            } catch (error) {
                setLoader(false)
                toast.error(error?.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
            }

        },
    })

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileSize = file.size / 1024 / 1024; // in MB
            const fileType = file.type.split("/")[1]; // get file extension

            if (fileSize > 20) {
                setErrorMsg("File size should be less than 20 MB");
            } else {
                if (
                    fileType === "jpg" ||
                    fileType === "jpeg" ||
                    fileType === "png"
                ) {
                    setSelectedFile([...selectedFile, file]);
                    setErrorMsg("");
                } else {
                    setErrorMsg(
                        "Only JPG, PNG, JPEG files are allowed"
                    );
                }
            }
        }
    };
    return (
        <React.Fragment>
            <div
                className={
                    loader
                        ? "page-content my-account overlayerloader"
                        : "page-content my-account"
                }
            >
                <Form
                    className="form-horizontal floating-form my-account"
                    onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                    }}
                >
                    <Card>
                        <CardBody>
                            <div className="my-account-header">
                                <h3 className="font16  font-semibold">
                                    Update Product
                                </h3>
                            </div>
                            <Row>
                                <Col lg="6">
                                    <FocusError formik={validation} />
                                    <Input
                                        name="title"
                                        className="mt-3 input-outline"
                                        placeholder="Title"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.title || ""}
                                        invalid={
                                            validation.touched.title &&
                                                validation.errors.title
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.title &&
                                        validation.errors.title ? (
                                        <>
                                            <FormFeedback type="invalid">
                                               
                                                {validation.errors.title}
                                            </FormFeedback>
                                        </>
                                    ) : null}
                                </Col>
                                <Col lg="6">
                                    <Input
                                        name="brand"
                                        className="mt-3 input-outline"
                                        placeholder="Brand name"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.brand || ""}
                                        invalid={
                                            validation.touched.brand &&
                                                validation.errors.brand
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.brand &&
                                        validation.errors.brand ? (
                                        <>
                                            <FormFeedback type="invalid">
                                               
                                                {validation.errors.brand}
                                            </FormFeedback>
                                        </>
                                    ) : null}
                                </Col>
                                <Col lg="6">
                                    <Input
                                        name="category"
                                        className="mt-3 input-outline"
                                        placeholder="Category"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.category || ""}
                                        invalid={
                                            validation.touched.category &&
                                                validation.errors.category
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.category &&
                                        validation.errors.category ? (
                                        <>
                                            <FormFeedback type="invalid">
                                               
                                                {validation.errors.category}
                                            </FormFeedback>
                                        </>
                                    ) : null}
                                </Col>
                                <Col lg="6">
                                    <Input
                                        name="availabilityStatus"
                                        className="mt-3 input-outline"
                                        placeholder="Availability Status"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.availabilityStatus || ""}
                                        invalid={
                                            validation.touched.availabilityStatus &&
                                                validation.errors.availabilityStatus
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.availabilityStatus &&
                                        validation.errors.availabilityStatus ? (
                                        <>
                                            <FormFeedback type="invalid">
                                               
                                                {validation.errors.availabilityStatus}
                                            </FormFeedback>
                                        </>
                                    ) : null}
                                </Col>
                                <Col lg="6">
                                    <Input
                                        name="description"
                                        className="mt-3 input-outline"
                                        placeholder="Description"
                                        type="textarea"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.description || ""}
                                        invalid={
                                            validation.touched.description &&
                                                validation.errors.description
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.description &&
                                        validation.errors.description ? (
                                        <>
                                            <FormFeedback type="invalid">
                                               
                                                {validation.errors.description}
                                            </FormFeedback>
                                        </>
                                    ) : null}
                                </Col>
                                <Col lg="6">
                                    <Input
                                        name="discountPercentage"
                                        className="mt-3 input-outline"
                                        placeholder="Discount Percentage"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.discountPercentage || ""}
                                        invalid={
                                            validation.touched.discountPercentage &&
                                                validation.errors.discountPercentage
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.discountPercentage &&
                                        validation.errors.discountPercentage ? (
                                        <>
                                            <FormFeedback type="invalid">
                                               
                                                {validation.errors.discountPercentage}
                                            </FormFeedback>
                                        </>
                                    ) : null}
                                </Col>
                                <Col lg="6">
                                    <Input
                                        name="minimumOrderQuantity"
                                        value={validation.values.minimumOrderQuantity}
                                        className="mt-3 input-outline"
                                        type="number"
                                        placeholder="Minimum Order Quantity"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                            validation.touched.minimumOrderQuantity &&
                                                validation.errors.minimumOrderQuantity
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.minimumOrderQuantity &&
                                        validation.errors.minimumOrderQuantity ? (
                                        <>
                                            <FormFeedback type="invalid">
                                               
                                                {validation.errors.minimumOrderQuantity}
                                            </FormFeedback>
                                        </>
                                    ) : null}
                                </Col>
                                <Col lg="6">
                                    <Input
                                        name="returnPolicy"
                                        value={validation.values.returnPolicy}
                                        className="mt-3 input-outline"
                                        placeholder="Return Policy"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                            validation.touched.returnPolicy && validation.errors.returnPolicy
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.returnPolicy && validation.errors.returnPolicy ? (
                                        <>
                                            <FormFeedback type="invalid">
                                               
                                                {validation.errors.returnPolicy}
                                            </FormFeedback>
                                        </>
                                    ) : null}
                                </Col>
                                <Col lg="6">
                                    <Input
                                        name="shippingInformation"
                                        value={validation.values.shippingInformation}
                                        className="mt-3 input-outline"
                                        placeholder="Shipping Information"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                            validation.touched.shippingInformation && validation.errors.shippingInformation
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.shippingInformation && validation.errors.shippingInformation ? (
                                        <>
                                            <FormFeedback type="invalid">
                                               
                                                {validation.errors.shippingInformation}
                                            </FormFeedback>
                                        </>
                                    ) : null}
                                </Col>
                                <Col lg="6">
                                    <Input
                                        name="warrantyInformation"
                                        value={validation.values.warrantyInformation}
                                        className="mt-3 input-outline"
                                        placeholder="Warranty Information"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                            validation.touched.warrantyInformation && validation.errors.warrantyInformation
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.warrantyInformation && validation.errors.warrantyInformation ? (
                                        <>
                                            <FormFeedback type="invalid">
                                               
                                                {validation.errors.warrantyInformation}
                                            </FormFeedback>
                                        </>
                                    ) : null}
                                </Col>
                                <Col lg="6">
                                    <Input
                                        name="stock"
                                        value={validation.values.stock}
                                        className="mt-3 input-outline"
                                        placeholder="Stock"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        invalid={
                                            validation.touched.stock && validation.errors.stock
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.stock && validation.errors.stock ? (
                                        <>
                                            <FormFeedback type="invalid">
                                               
                                                {validation.errors.stock}
                                            </FormFeedback>
                                        </>
                                    ) : null}
                                </Col>
                                <br />
                                <br />
                                <br />
                                <Col lg="6">
                                    <input
                                        key={inputKey}
                                        id="file-upload"
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf,.doc,.xls,.zip"
                                        onChange={handleFileChange}
                                        onClick={(event) => {
                                            if (
                                                event.target.files.length === 1 &&
                                                event.target.files[0].name ===
                                                selectedFile[selectedFile.length - 1]
                                                    ?.name
                                            ) {
                                                event.target.value = null;
                                            }
                                        }}
                                        multiple
                                    />
                                    {errorMsg && (
                                        <span className="ticket-validaton-error">
                                            {" "}
                                          
                                            {errorMsg}
                                        </span>
                                    )}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <div className="btn-group mt-30">
                        <button
                            className="btn btn-primary w-100 waves-effect waves-light btn-cancel m-0"
                            type="button"
                            onClick={() => validation.resetForm({ values: "" })}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary w-100 waves-effect waves-light btn-save m-0"
                            type="submit"
                        >
                            Update Product
                        </button>
                    </div>
                </Form>
                <TextLoader loading={loader} loader={loader} />
            </div>
        </React.Fragment>
    )
}
export default withRouter(UpdateProduct)
