import React, { useState } from "react";
import Cart from "../components/Cart";
import MenuItem from "../components/MenuItem";
import TopMenu from "../components/TopMenu";
import ModifiersModal from "../components/ModifiersModal";

const data = require("../data/data.json");
console.log(data);
const Menu = () => {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [totalTax, setTax] = useState(0);
  const [modifierModalStatus, setModifierModalStatus] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modifiers, setModifiers] = useState({});
  const [itemQty, setItemQty] = useState(0);

  const getSubtotal = () => {
    let newCart = cart;
    let subT = 0;
    let tTax = 0;
    let keys = Object.keys(newCart);
    for (let i = 0; i < keys.length; i++) {
      subT += newCart[keys[i]].price * newCart[keys[i]].qty;
      tTax += newCart[keys[i]].tax * newCart[keys[i]].qty;
    }
    setSubTotal(subT.toFixed(2));
    setTax(tTax.toFixed(2));
    setCart(newCart);
    console.table(newCart);
    console.log(subT, tTax);
  };

  const addToCartModal = (item, qty) => {
    let newCart = cart;
    let modifiersPrice = 0;
    let modifiersTax = 0;
    console.log("test");
    Object.keys(modifiers).map((modi) => {
      console.log(modi);
      console.log(modifiers[modi].price, "modifier price");
      modifiersPrice += modifiers[modi].price * modifiers[modi].qty;
      modifiersTax += modifiers[modi].tax * modifiers[modi].qty;
      return {
        modifiersPrice,
        modifiersTax,
      };
    });
    if (qty) {
      newCart[item.id] = {
        name: item.itemName,
        desc: item.itemDetails,
        price: item.valuebeforetax + modifiersPrice,
        tax: item.taxValue + modifiersTax,
        qty: qty,
        maxQty: item.maximumqty,
        modifiers: modifiers,
        deliveryMedium: item.inSeatDelivery,
      };
    } else {
      newCart[item.id] = {
        name: item.itemName,
        desc: item.itemDetails,
        price: item.valuebeforetax + modifiersPrice,
        tax: item.taxValue + modifiersTax,
        qty: 1,
        maxQty: item.maximumqty,
        modifiers: modifiers,
        deliveryMedium: item.inSeatDelivery,
      };
    }

    setCart({ ...newCart });
    getSubtotal();
    setModifiers({});
    setItemQty(0);
  };

  const addToCart = (item) => {
    let newCart = cart;
    if (item.modifierGroups.length > 0) {
      setModalItem(item);
      setModifierModalStatus(true);
    } else {
      if (item.id in cart) {
        if (cart[item.id].qty < cart[item.id].maxQty) {
          newCart[item.id].qty = cart[item.id].qty + 1;
        }
      } else {
        newCart[item.id] = {
          name: item.itemName,
          desc: item.itemDetails,
          price: item.valuebeforetax,
          tax: item.taxValue,
          qty: 1,
          maxQty: item.maximumqty,
          deliveryMedium: item.inSeatDelivery,
        };
      }
    }
    setCart({ ...newCart });
    getSubtotal();
  };

  const updateCart = (item, type) => {
    let myCart = cart;
    if (item in cart) {
      if (type === "increment" && myCart[item].qty < myCart[item].maxQty) {
        myCart[item].qty = cart[item].qty + 1;
        console.table(myCart);
        setCart({ ...myCart });
        console.log(cart);
      } else if (type === "decrement" && myCart[item].qty > 0) {
        myCart[item].qty = cart[item].qty - 1;
        console.table(myCart);
        setCart({ ...myCart });
        console.log(cart);
      } else if (type === "decrement" && myCart[item].qty === 0) {
        removeFromCart(item);
      }
      getSubtotal();
    }
  };

  const removeFromCart = (item) => {
    let myCart = cart;
    delete myCart[item];
    console.table(myCart);
    setCart({ ...myCart });
    getSubtotal();
  };

  return (
    <div className="container">
      <TopMenu menuItems={data}></TopMenu>
      <div className="row">
        <div className="col-6">
          <div className="accordion" id="accordionExample">
            {data &&
              data.map((item, index) => (
                <MenuItem
                  key={index}
                  menuItem={item}
                  index={index}
                  addToCart={addToCart}
                ></MenuItem>
              ))}
            <ModifiersModal
              modalItem={modalItem}
              modifierModalStatus={modifierModalStatus}
              setModifierModalStatus={setModifierModalStatus}
              modifiers={modifiers}
              setModifiers={setModifiers}
              addToCart={addToCart}
              cart={cart}
              updateCart={updateCart}
              addToCartModal={addToCartModal}
              itemQty={itemQty}
              setItemQty={setItemQty}
            />
          </div>
        </div>
        <div className="col-6">
          <Cart
            cart={cart}
            subTotal={subTotal}
            totalTax={totalTax}
            removeFromCart={removeFromCart}
            updateCart={updateCart}
          ></Cart>
        </div>
      </div>
    </div>
  );
};

export default Menu;
