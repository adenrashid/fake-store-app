import React, { useState, useEffect, useCallback } from 'react';
import './Home.css';

function ShowProducts() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [ids, setIds] = useState([]);

  // function to on click, sort items displayed by category clicked 
  function SortByCategory(e) {
    fetch(`https://fakestoreapi.com/products/category/${e.target.id}`)
      .then(res=>res.json())
      .then((result) => {
        setItems(result);
      })
  }

  // useEffect to set Items and display error if unable to do so
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      })
  }, [])

  // useEffect to get categories on click
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res=>res.json())
      .then((result) => {
        setCategories(result);
      })
  }, [])

  // useEffect to get user with id of 1 
  useEffect(() => {
    fetch('https://fakestoreapi.com/users/1')
    .then(res=>res.json())
    .then((result) => {
      setUser(result);
    })
  }, [])

  // hook to get products in cart for user 1 and set IDs state
  useEffect(() => {
    fetch('https://fakestoreapi.com/carts/5')
      .then(res=>res.json())
      .then((result) => {
        setCart(result);
        let arrayOfProducts = [];
          result.products.map(product => (
            arrayOfProducts.push(product.productId)
          ));
          setIds(arrayOfProducts);
      })
  }, [])

  // hook to use id of products in cart for user 1 to call api to add those products into itemsInCart array, updating the state 
  useEffect(() => {
    ids.map(id => fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res=>res.json())
      .then((result) => {
        let arrayOfCartItems = [];
        arrayOfCartItems.push(result);
        setItemsInCart(arrayOfCartItems);
      }))
  }, [ids])

  if (error) {  
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>

        <h1>Welcome to the Fake Store</h1>

        <div>
          <h3>Logged in as:</h3>
            <p>name: {user.name ? user.name.firstname : ''} {user.name ? user.name.lastname : ''}</p>
            <p>username: {user ? user.username : ''}</p>
            <p>email: {user ? user.email : ''} </p>
            <p>address: {user.address ? user.address.number : ''} {user.address ? user.address.street : ''} {user.address ? user.address.city : ''} </p>
            <p>password: {user ? user.password : ''}</p>
        </div>

        <h3>Current Cart:</h3>
          {cart.products ? cart.products.map(product => (
            <div>
              <p>Quantity: {product.quantity}</p>
            </div>
          )) : ''}

        {itemsInCart ? itemsInCart.map(item => (
          <div>
            <p>{item}</p>
            <p>{item.title}</p>
            <p>{item.image}</p>
          </div>
        )) : ''}

        <h3>Select products by category:</h3>
          {categories.map(category => (
            <button id={category} onClick={SortByCategory}>{category}</button>
          ))}

        <ul>
          <div class="product-wrap">
            {items ? items.map(item => (
              <li key={item.id}>
                <li>{item.title}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>{item.description}</li>
                <li><img src={item.image} alt=""/></li>
              </li>
            )) : ''}
          </div>
        </ul>

      </div>
    );
  }
}

export default ShowProducts