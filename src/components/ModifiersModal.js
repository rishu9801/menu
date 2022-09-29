import React, { useState, useEffect } from "react";

const ModifiersModal = ({
  modalItem,
  modifierModalStatus,
  setModifierModalStatus,
  modifiers,
  setModifiers,
  cart,
  updateCart,
  addToCartModal,
}) => {
  const [itemQty, setItemQty] = useState(0);

  const add = (item) => {
    addToCartModal(item, itemQty);
  };

  const handleModifierQuantity = (modifier, type) => {
    let existingMod = modifiers;

    if (modifier.id in existingMod) {
      if (type === "decrement" && existingMod[modifier.id].qty >= 0) {
        existingMod[modifier.id].qty = existingMod[modifier.id].qty - 1;
        setModifiers({ ...existingMod });
      } else if (
        type === "increment" &&
        existingMod[modifier.id].qty < existingMod[modifier.id].maxQty
      ) {
        console.log(existingMod[modifier.id]);
        existingMod[modifier.id].qty = existingMod[modifier.id].qty + 1;
        setModifiers({ ...existingMod });
      }
    } else {
      console.log(existingMod, modifier.id);
      existingMod[modifier.id] = {
        name: modifier.itemName,
        price: modifier.valuebeforetax,
        tax: modifier.taxValue,
        qty: 1,
        maxQty: modifier.maximumqty,
      };
      setModifiers({ ...existingMod });
    }
  };

  return (
    <>
      {modalItem && modifierModalStatus && (
        <>
          <div className="backdrop"></div>

          <div className="card modifier-modal">
            <div className="card-img-top">
              <img src={modalItem.fnbs_images[0].imageurl} alt="" />
              <button
                type="button"
                class="btn btn-sm close-btn"
                aria-label="Close"
                onClick={() => {
                  setModifierModalStatus(false);
                }}
              >
                <i className="fas fa-close"></i>
              </button>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="item-title">{modalItem.itemName}</h5>
                <h5 className="item-price">${modalItem.valuebeforetax}</h5>
              </div>
              <p className="item-desc">{modalItem.itemDetails}</p>
              {modalItem.modifierGroups.map((item, key) => (
                <div className="modifiers" key={key}>
                  <h6 className="modifiers-title">
                    <b>{item.tabName}(optional)</b>
                  </h6>
                  {item.modifier_items.map((subItem, subKey) => {
                    return (
                      <div className="my-2" key={subKey}>
                        <div className="d-flex justify-content-between">
                          <p>{subItem.itemName}</p>
                          <span>
                            <button
                              className="btn btn-outline-danger btn-sm rounded-circle"
                              onClick={() => {
                                handleModifierQuantity(subItem, "decrement");
                              }}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <span className="mx-3">
                              {subItem.id in modifiers
                                ? modifiers[subItem.id].qty
                                : 0}
                            </span>
                            <button
                              className="btn btn-outline-danger btn-sm rounded-circle"
                              onClick={() => {
                                handleModifierQuantity(subItem, "increment");
                              }}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </span>
                        </div>
                        <p className="text-secondary">
                          <small>+ ${subItem.valuebeforetax}</small>
                        </p>
                      </div>
                    );
                  })}
                  <hr />
                </div>
              ))}
              <div className="d-flex justify-content-between">
                <p>
                  <b>Optional</b>
                </p>
                <span className="smart-modifiers">
                  <small>
                    <b>Remove</b>
                  </small>
                  <small>
                    <b>Add as side</b>
                  </small>
                </span>
              </div>
              {modalItem.smartModifiers.map((subItem, subKey) => (
                <div className="d-flex justify-content-between" key={subKey}>
                  <p>{subItem.itemName}</p>
                  <span className="smart-modifiers">
                    <input
                      class="form-check-input me-3"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                    />
                  </span>
                </div>
              ))}
            </div>
            <div className="card-footer d-flex flex-column">
              <div className="d-flex justify-content-between my-2">
                <h6>
                  <b>Quantity</b>
                </h6>
                <div>
                  <button
                    className="btn btn-outline-danger btn-sm rounded-circle"
                    onClick={() => {
                      setItemQty(itemQty - 1);
                    }}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="mx-3">{itemQty}</span>
                  <button
                    className="btn btn-outline-danger btn-sm rounded-circle"
                    onClick={() => {
                      setItemQty(itemQty + 1);
                    }}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <button
                className="btn btn-danger full-width"
                onClick={() => {
                  add(modalItem);
                  setModifierModalStatus(false);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModifiersModal;
