import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllProducts } from "../../helpers/backend_helper"
import { Link } from "react-router-dom";
import TextLoader from "../../components/textLoader";

function ProductListing() {
  const [allProducts, setAllProducts] = useState([])
  const [loader, setLoader] = useState("");

  useEffect(() => {
    getProductsList()
  }, [])

  const getProductsList = async () => {
    setLoader(true)
    try {
      const result = await getAllProducts()
      setAllProducts(result?.data?.products)
      setTotalRecords(result?.total)
      setLoader(false)

    } catch (error) {
      setLoader(false)
    }
  }

  return (
    <div
      className={
        loader
          ? "rs-product-listing-side-section rs-product-listing-section rs-product-section overlayerloader-product"
          : "rs-product-listing-side-section rs-product-listing-section rs-product-section"
      }
    >
      <section>
        <div className="rs-product-left">
          <div className="rs-product-tab">
            <div className="rs-product-left-contentbar">
              {allProducts?.map((product, index) => (
                <div className="rs-product-left-box" key={index + "child"}>
                  <img src={product?.images[0]} alt="" style={{ width: "250px", height: "250px" }} />
                  <h5>{product?.title}</h5>
                  <p className="starting-price">
                    Price <strong>
                      {product?.price} </strong>{" "}
                  </p>
                  <div className="rs-product-left-text-price">
                    <ul>
                      <li>
                        <p>Stock</p>
                        <span>{product?.stock}</span>
                      </li>
                      <li>
                        <p>Ratings</p>
                        <span>{product?.rating}</span>
                      </li>
                      <li>
                        <p>Warranty</p>
                        <span>{product?.warrantyInformation}</span>
                      </li>
                      <li>
                        <p>Return Policy</p>
                        <span>{product?.returnPolicy}</span>
                      </li>
                      <li>
                        <p>Discount</p>
                        <span>{product?.discountPercentage}%</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={
                      "rs-product-left-price-btn"
                    }
                  >

                    <Link
                      to={{
                        pathname: `/products/view-product/${product.id}`,
                        status: 0
                      }}

                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <TextLoader loading={loader} loader={loader} />
    </div>
  );
}

export default React.memo(ProductListing);
