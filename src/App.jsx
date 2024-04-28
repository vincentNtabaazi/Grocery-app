import './App.css'
import Icon from "@mdi/react";
import { mdiCart, mdiTrashCan, mdiChevronDoubleRight } from "@mdi/js";

import tomato from "./assets/tomatoes.png";
import cabbage from "./assets/cabbage.png";
import cauliflower from "./assets/cauliflower.png";
import eggplant from "./assets/eggplant.png";
import garlic from "./assets/garlic.png";
import onions from "./assets/onions.png";
import { useRef, useState } from 'react';

function App() {

  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const successRef = useRef(null);

  const listings = [
    {
      id: 1,
      image: tomato,
      name: "Tomatoes",
      cost: 300
    },
    {
      id: 2,
      image: cabbage,
      name: "Cabbage",
      cost: 1000
    },
    {
      id: 3,
      image: cauliflower,
      name: "Cauliflower",
      cost: 2000
    },
    {
      id: 4,
      image: eggplant,
      name: "Eggplant",
      cost: 500
    },
    {
      id: 5,
      image: garlic,
      name: "Garlic",
      cost: 250
    },
    {
      id: 6,
      image: onions,
      name: "Onions",
      cost: 700
    },
  ];

  const addToCart = (id) => {
    var item = listings.find((item) => item.id == id);
    item.count = 1;
    setCart([...cart, item]);
    setTotal(total + item.cost);
  }

  const removeFromCart = (id) => {
    var newCart = cart.filter((item) => item.id != id
    );

    setCart(newCart);

    var item = cart.find((item) => item.id == id);
    setTotal(total - (item.cost * item.count));
  }

  const addItem = (id) => {
    var newCart = cart.map((x) => {
      if (x.id == id) {
        x.count++;
        setTotal(total + x.cost);
        return x;
      } else return x;
    });
    setCart(newCart);

  }

  const subItem = (id) => {
    var item = cart.find((x) => x.id == id);
    if (item.count > 1) {
      var newCart = cart.map((x) => {
        if (x.id == id) {
          x.count--;
          setTotal(total - x.cost);
          return x;

        } else return x;
      });
      setCart(newCart);
    } else {
      removeFromCart(id);
    }

  }

  var clearCart = () => {
    setCart([]);
    setTotal(0);
    setOpen(false);
  }

  const inCart = (id) => {
    var item = cart.find((x) => x.id == id);
    if (item) return item;
    else return false;
  }

  return (
    <>
      <div className="success" ref={successRef}>
        <p className="message">
          Checkout Successful
        </p>
      </div>
      <div className="header">
        <div className="title"><p>Grocery App</p></div>
        <div className="cart" title='Cart' onClick={() => {
          setOpen(!open);
        }}>
          {
            cart.length > 0
              ? (
                <div className="fill"></div>
              )
              : null
          }

          <Icon path={mdiCart} size={1} color="black" />
        </div>
      </div>
      <div className="contents">
        <div className="listings">
          {
            listings.map((listing, index) => {
              return (
                <div className="listing" key={index}>
                  <div className="image" style={{ backgroundImage: `url(${listing.image})` }}>
                  </div>
                  <div className="details">
                    <p className="title">{listing.name}</p>
                    <p className="cost">UGX {listing.cost}</p>
                    {
                      inCart(listing.id)
                        ? (
                          <button className="remove" onClick={() => removeFromCart(listing.id)}>
                            Remove from cart
                          </button>
                        )
                        : (
                          <button onClick={() => addToCart(listing.id)}>
                            Add to cart
                          </button>
                        )
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="cartView" style={{ display: open ? 'flex' : 'none' }}>
          <div className="total">
            <p className="header">Subtotal:</p>
            <p className="value">UGX {total}</p>
          </div>
          {
            cart.map((item, index) => {
              return (
                <div className="cartItem" key={index}>
                  <div className="top">
                    {item.name}
                  </div>
                  <div className="bottom">
                    <div className="count">
                      <button className="add" onClick={() => addItem(item.id)}>+</button>
                      {item.count}
                      <button className="sub" onClick={() => subItem(item.id)}>-</button>
                    </div>
                    <Icon path={mdiTrashCan} size={1} color="tomato" style={{ cursor: 'pointer' }} onClick={() => removeFromCart(item.id)} />
                  </div>
                </div>
              )
            })
          }
          {
            cart.length > 0
              ? (
                <div className="checkout" onClick={() => {
                  clearCart();
                  successRef.current.style.top = "50px";
                  setTimeout(() => {
                    successRef.current.style.top = "-100px";
                  }, 3000);
                }}>
                  <p>
                    Proceed to checkout
                  </p>
                  <Icon path={mdiChevronDoubleRight} size={1} color="white" />
                </div>
              ) : null
          }
        </div>
      </div>
    </>
  )
}

export default App
