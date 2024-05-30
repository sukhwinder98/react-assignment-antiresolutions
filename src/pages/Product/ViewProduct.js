import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteProduct, getProductDetail } from "../../helpers/backend_helper";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TextLoader from "../../components/textLoader";
const ViewProduct = () => {
    const params = useParams()
    const [prodInfo, setProdInfo] = useState()
    const [loader, setLoader] = useState(false)

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

    const handleProductDelete = async (id) => {
        setLoader(true)
        try {
            const result = await deleteProduct(id)
            toast.error("Product deleted successfully", {
                position: toast.POSITION.TOP_RIGHT,
            })
            setLoader(false)

        } catch (error) {
            toast
            setLoader(false)

        }
    }

    return (
        <React.Fragment>
            <div
                className={
                    loader
                        ? "page-content  server-management overlayerloader"
                        : "page-content  server-management"
                }
            >
                <div className="container-fluid">
                    <div className="server_info">
                        <h5 className="info_heding">Product Details</h5>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="tab_content tab-data-table">
                                    {/* <h5 className="info_heding">Profile Details</h5> */}
                                    <table className="w-100">
                                        <tbody>
                                            <div>
                                                <img src={prodInfo?.images[0]} style={{ height: "100%", width: "100%" }} />
                                            </div>
                                        </tbody>
                                    </table>
                                    <br />
                                    <table className="w-100">
                                        <tbody>
                                            <tr>
                                                <React.Fragment>
                                                    <td className="text-right">
                                                        {prodInfo?.title}
                                                    </td>
                                                </React.Fragment>
                                                <><td></td><td></td><td></td></>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="tab_content tab-data-table">
                                    <table className="w-100">
                                        <tbody>
                                            <tr>
                                                <th>Brand</th>
                                                <React.Fragment>
                                                    <td className="text-right">
                                                        {prodInfo?.brand}
                                                    </td>
                                                </React.Fragment>
                                                <><td></td><td></td><td></td></>
                                            </tr>
                                            <tr></tr>
                                            <tr>
                                                <th>Price</th>
                                                <React.Fragment>
                                                    <td className="text-right">
                                                        {prodInfo?.price}
                                                    </td>
                                                </React.Fragment>
                                                <><td></td><td></td><td></td></>
                                            </tr>
                                            <tr></tr>
                                            <tr>
                                                <th>Rating</th>
                                                <React.Fragment>
                                                    <td className="text-right">
                                                        {prodInfo?.rating}
                                                    </td>
                                                </React.Fragment>
                                                <><td></td><td></td><td></td></>
                                            </tr>
                                            <tr></tr>
                                            <tr>
                                                <th>Discount</th>
                                                <React.Fragment>
                                                    <td className="text-right">
                                                        {prodInfo?.discountPercentage}%
                                                    </td>
                                                </React.Fragment>
                                                <><td></td><td></td><td></td></>
                                            </tr>
                                            <tr></tr>
                                            <tr>
                                                <th>Minimum Order Quantity</th>
                                                <React.Fragment>
                                                    <td className="text-right">
                                                        {prodInfo?.minimumOrderQuantity}
                                                    </td>
                                                </React.Fragment>
                                                <><td></td><td></td><td></td></>
                                            </tr>
                                            <tr></tr>
                                            <tr>
                                                <th>Return Policy</th>
                                                <React.Fragment>
                                                    <td className="text-right">
                                                        {prodInfo?.returnPolicy}
                                                    </td>
                                                </React.Fragment>
                                                <><td></td><td></td><td></td></>
                                            </tr>
                                            <tr></tr>
                                            <tr>
                                                <th>Shipping Information</th>
                                                <React.Fragment>
                                                    <td className="text-right">
                                                        {prodInfo?.shippingInformation}
                                                    </td>
                                                </React.Fragment>
                                                <><td></td><td></td><td></td></>
                                            </tr>
                                            <tr></tr>
                                            <tr>
                                                <th>Stock</th>
                                                <React.Fragment>
                                                    <td className="text-right">
                                                        {prodInfo?.stock}
                                                    </td>
                                                </React.Fragment>
                                                <><td></td><td></td><td></td></>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="tab_content tab-data-table">
                                    <table className="w-100">
                                        <tbody>
                                            <tr>
                                                <React.Fragment>
                                                    <th>Description</th>
                                                    <td className="text-right">
                                                        {prodInfo?.description}
                                                    </td>
                                                </React.Fragment>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="tab_content tab-data-table">
                                    <table className="w-100">
                                        <tbody>
                                            <tr>
                                                <th>Availability Status</th>
                                                <React.Fragment>
                                                    <td className="text-right">
                                                        {prodInfo?.availabilityStatus}
                                                    </td>
                                                </React.Fragment>
                                                <><td></td><td></td><td></td></>
                                            </tr>
                                            <tr></tr>
                                            <tr>
                                                <th>Category</th>
                                                <React.Fragment>
                                                    <td className="text-right">
                                                        {prodInfo?.category}
                                                    </td>
                                                </React.Fragment>
                                                <><td></td><td></td><td></td></>
                                            </tr>
                                            <tr></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn-group mt-30">
                        <Link
                            className="btn btn-primary w-100 waves-effect waves-light btn-save m-0"
                            type="button"
                            to={`/products/update-product/${params?.id}`}
                        >
                            Update Product
                        </Link>
                        <button
                            className="btn btn-danger w-100 waves-effect waves-light btn-save m-0"
                            onClick={() => { handleProductDelete(params?.id) }}
                        >
                            Delete Product
                        </button>
                    </div>
                </div>
            </div>
            <TextLoader loading={loader} loader={loader} />
        </React.Fragment>
    );
};

export default React.memo(ViewProduct);
