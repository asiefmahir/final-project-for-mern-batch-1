import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../contexts/Cart";

import { getProductById } from "../services/product";
import { ADD_TO_CART } from "../actions/action-types/cart";
import Header from "../components/Header";

const ProductDetails = () => {
    const { dispatchCartAction } = useContext(CartContext);

    const { id } = useParams();

    const { data } = useQuery([`products/${id}`, id], () => getProductById(id));

    return (
        <div>
            <Header />
            {data !== null && (
                <div className="details-box d-flex">
                    <div className="image-section">
                        <img
                            className="details-box__image"
                            src={data?.image}
                            alt={data?.title}
                        />
                    </div>
                    <div className="details-section">
                        <h1 className="details-section__product-tile">
                            Product title: {data?.title}
                        </h1>
                        <br />
                        <br />
                        <h2 className="details-section__product-tile">
                            Details About The product:{" "}
                        </h2>
                        <p>{data?.description}</p>
                        <br />
                        <br />
                        <h3 className="details-section__product-tile">
                            The Price of the product is -
                        </h3>
                        <p>{data?.price} TK</p>
                        <div className="ingredient__btn">
                            <button
                                onClick={() =>
                                    dispatchCartAction({
                                        type: ADD_TO_CART,
                                        payload: data,
                                    })
                                }
                                className="btn-white"
                            >
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
                // <>
                //     <p>Product Details for {data?.title}</p>
                //     <img src={data?.image} alt={data?.title} />
                //     <p>The Price of the product is {data?.price}</p>

                //     <div className="ingredient__btn">
                //         <button
                //             onClick={() =>
                //                 dispatchCartAction({
                //                     type: ADD_TO_CART,
                //                     payload: data,
                //                 })
                //             }
                //             className="btn-white"
                //         >
                //             ADD TO CART
                //         </button>
                //     </div>
                // </>
            )}
        </div>
    );
};

export default ProductDetails;
