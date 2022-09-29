import React from "react";

const MenuItem = ({ menuItem, index, addToCart }) => {
  return (
    <div className="card my-4" id={menuItem.tabName}>
      <img
        src={menuItem.fnbtabs_images[0].imageurl}
        className="card-img-top"
        alt={menuItem.tabName}
      />
      <div className="accordion-item">
        <h2 className="accordion-header" id={"heading" + (index + 1)}>
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#collapse" + (index + 1)}
            aria-expanded="true"
            aria-controls={"collapse" + (index + 1)}
          >
            <b>{menuItem.tabName}</b>
          </button>
        </h2>
        <div
          id={"collapse" + (index + 1)}
          className="accordion-collapse collapse"
          aria-labelledby={"heading" + (index + 1)}
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            {menuItem &&
              menuItem.fnbtabs_items.map((item, key) => (
                <div className="my-4 menu-item " key={key}>
                  <div className="row">
                    <div className="col-3 menu-item-img">
                      <img
                        src={item.fnbs_images[0].imageurl}
                        alt=""
                        width={"150px"}
                        height={"150px"}
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                    <div className="col-9 menu-item-content d-flex flex-column justify-content-between py-1 ps-4 pe-2">
                      <div>
                        <h5 className="item-name">{item.itemName}</h5>
                        <p className="item-details">{item.itemDetails}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-end">
                        <p className="item-price">${item.valuebeforetax}</p>
                        {item.pickupAtCounter && (
                          <div className="text-end">
                            <img
                              src="/images/food-delivery.png"
                              alt=""
                              width={25}
                              className="mx-2"
                            />
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                addToCart(item);
                              }}
                            >
                              <i className="fas fa-add"></i> Add
                            </button>
                            <p className="item-delivery-type">
                              To-be Picked up
                            </p>
                          </div>
                        )}
                        {item.inSeatDelivery && (
                          <div className="text-end">
                            <img
                              src="/images/chair.png"
                              alt=""
                              width={25}
                              className="mx-2"
                            />
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                addToCart(item);
                              }}
                            >
                              <i className="fas fa-add"></i> Add
                            </button>
                            <p className="item-delivery-type">
                              Delivered in-seat
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
