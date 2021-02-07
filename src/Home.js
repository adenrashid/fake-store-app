import React, { useState, useEffect } from 'react';
import './Home.css';

function ShowProducts() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);

  function SortByCategory(e) {
    fetch(`https://fakestoreapi.com/products/category/${e.target.id}`)
        .then(res=>res.json())
        .then((result) => {
          setItems(result);
        }
      )
  }

  function FindProductById(id) {
    useEffect(() => {
      fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res=>res.json())
      .then((result) => {
        setItemsInCart(oldArray => [...oldArray,result])
      })
    }, [])
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res=>res.json())
      .then(
        (result) => {
          setCategories(result);
        }
      )
  }, [])

  useEffect(() => {
    fetch('https://fakestoreapi.com/users/1')
    .then(res=>res.json())
    .then(
      (result) => {
        setUser(result);
      }
    )
  }, [])

  useEffect(() => {
    fetch('https://fakestoreapi.com/carts/5')
      .then(res=>res.json())
      .then((result) => {
        setCart(result);
      }
    )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Welcome to the Fake Store</h1>
        <p>Logged in as: name: {user.name.firstname} {user.name.lastname} username: {user.username} email: {user.email} address: {user.address.number} {user.address.street} {user.address.city} password: {user.password}</p>
        <p>Current Cart: {cart.products.map(product => (
          <div>
            {FindProductById(product.productId)}
            {console.log(itemsInCart)}
            {/* {FindProductById(product.productId)}
            {itemsInCart.map(item => (
              <div>
                <p>Item Title: {item.title}</p>
                <img src={item.image} alt=""/>
              </div>
            ))}
                <p>Quantity: {product.quantity}</p> */}
          </div>
        ))}</p>
        {categories.map(category => (
          <button id={category} onClick={SortByCategory}>
            {category}
          </button>
        ))}
        <ul>
        <div class="product-wrap">
          {items.map(item => (
              <li key={item.id}>
                {item.title}
              <li>
                {item.price}
              </li>
              <li>
                {item.category}
              </li>
              <li>
              {item.description}
              </li>
              <li>
                <img src={item.image} alt=""/>
              </li>
            </li>
          ))}
        </div>
        </ul>
      </div>
    );
  }
}

export default ShowProducts