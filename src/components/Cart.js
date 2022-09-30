import React, { useEffect } from "react";

const Cart = ({ cart, subTotal, totalTax, removeFromCart, updateCart }) => {
  useEffect(() => {});

  return (
    <div className="card my-4 cart">
      <div className="card-body">
        {Object.keys(cart).length === 0 && (
          <div className="text-center">
            <h5 className="card-title">
              <b>Your Cart</b>
            </h5>
            <img
              src="/images/empty-cart.png"
              alt=""
              width={64}
              className="my-3"
            />
            <p className="card-text text-secondary">
              Cart is empty. Select a category <br /> to add food.
            </p>
          </div>
        )}
        {Object.keys(cart).length > 0 && (
          <div className="cart-content">
            <h5>Order Summary</h5>
            <div className="d-flex my-3">
              <img
                src="/images/food-delivery.png"
                alt=""
                width={32}
                className="me-2"
              />
              <h6>Picked up by you</h6>
            </div>
            {Object.keys(cart).map((item, index) => {
              if (cart[item].deliveryMedium === false) {
                return (
                  <>
                    <div key={index} className="mb-2">
                      <div className="d-flex justify-content-between">
                        <p> {cart[item].name} </p>
                        <div className="d-flex align-items-center">
                          <span>
                            <button
                              className="btn btn-outline-danger btn-sm rounded-circle"
                              disabled={cart[item].qty === 0}
                              onClick={() => {
                                updateCart(item, "decrement");
                              }}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <span className="mx-3">{cart[item].qty}</span>
                            <button
                              className="btn btn-outline-danger btn-sm rounded-circle"
                              disabled={cart[item].qty === cart[item].maxQty}
                              onClick={() => {
                                updateCart(item, "increment");
                              }}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </span>
                          <p className="mx-3">{cart[item].price}</p>
                          <button
                            className="btn btn-sm"
                            onClick={() => {
                              removeFromCart(item);
                            }}
                          >
                            <i className="fas fa-close"></i>
                          </button>
                        </div>
                      </div>
                      {cart[item].modifiers &&
                        Object.keys(cart[item].modifiers).map((i, key) => (
                          <p key={key}>{cart[item].modifiers[i].name}</p>
                        ))}
                    </div>
                  </>
                );
              }
            })}
            <div className="d-flex my-3">
              <img src="/images/chair.png" alt="" width={32} className="me-2" />
              <h6>In seat delivery</h6>
            </div>
            {Object.keys(cart).map((item, index) => {
              if (cart[item].deliveryMedium) {
                return (
                  <>
                    <div key={index}>
                      <div className="d-flex justify-content-between align-item-center">
                        <p> {cart[item].name} </p>
                        <div className="d-flex align-items-center">
                          <span>
                            <button
                              className="btn btn-outline-danger btn-sm rounded-circle"
                              disabled={cart[item].qty === 0}
                              onClick={() => {
                                updateCart(item, "decrement");
                              }}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <span className="mx-3">{cart[item].qty}</span>
                            <button
                              className="btn btn-outline-danger btn-sm rounded-circle"
                              disabled={cart[item].qty === cart[item].maxQty}
                              onClick={() => {
                                updateCart(item, "increment");
                              }}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </span>
                          <p className="mx-3">
                            {Number(cart[item].price).toFixed(2)}
                          </p>
                          <button
                            className="btn btn-sm"
                            onClick={() => {
                              removeFromCart(item);
                            }}
                          >
                            <i className="fas fa-close"></i>
                          </button>
                        </div>
                      </div>
                      <div className="d-flex modifiers-list">
                        {cart[item].modifiers &&
                          Object.keys(cart[item].modifiers).map((i, key) => (
                            <p key={key}>
                              <small>{cart[item].modifiers[i].name}</small>
                            </p>
                          ))}
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
        )}

        {Object.keys(cart).length > 0 && (
          <>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <p>
                <b>Subtotal</b>
              </p>
              <p>
                <b>${subTotal}</b>
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p>
                <b>Tax</b>
              </p>
              <p>
                <b>${totalTax}</b>
              </p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <p className="h5">
                <b>Total</b>
              </p>
              <p>
                <b>${(Number(subTotal) + Number(totalTax)).toFixed(2)}</b>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
