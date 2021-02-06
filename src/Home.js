import React, { useState, useEffect } from 'react';
import './Home.css';

function ShowProducts() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Welcome to the Fake Store</h1>
        {categories.map(category => (
          <button id={category}>
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

// const sortByCategory = (e) => {

//   useEffect(() => {
//     fetch(`https://fakestoreapi.com/products/category/${e.target.id}`)
//       .then(res=>res.json())
//       .then((result) => {
//         setItems(result);
//       }
//     )
//   }, [])

//   return (
//     <div>
//       <ul>
//       <div class="product-wrap">
//         {x.map(item => (
//             <li key={item.id}>
//               {item.title}
//             <li>
//               {item.price}
//             </li>
//             <li>
//               {item.category}
//             </li>
//             <li>
//             {item.description}
//             </li>
//             <li>
//               <img src={item.image} alt=""/>
//             </li>
//           </li>
//         ))}
//       </div>
//       </ul>
//     </div>
//   );

// }

export default ShowProducts