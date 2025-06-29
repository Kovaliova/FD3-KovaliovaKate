import React from 'react';
import ReactDOM from 'react-dom';

import Shop from './components/Shop';

const products = [
  {
    id: 1,
    name: "Кофемашина DeLonghi Magnifica Start ECAM220.22.GB",
    price: 600,
    imageUrl: "https://img.5element.by/import/images/ut/goods/good_2e36e7fe-9e20-11ed-bb92-005056012465/ecam220-22-gb-kofemashina-delonghi-1_600.jpg",
    stock: 5
  },
  {
    id: 2,
    name: "Чайник электрический RED SOLUTION AM120D COLORSENSE",
    price: 200,
    imageUrl: "https://img.5element.by/import/images/ut/goods/good_08fc4fd7-190d-11ef-8db4-005056012b6d/am120d-colorsense-elektrochaynik-red-solution-1_600.jpg",
    stock: 10
  },
  {
    id: 3,
    name: "Тостер HiTT HT-5305",
    price: 120,
    imageUrl: "https://img.5element.by/import/images/ut/goods/good_4528fd3e-162e-11ec-bb93-0050560120e8/ht-5305-toster-hit-1_600.jpg",
    stock: 3
  }
];

ReactDOM.render(
  <Shop name="iMy" address="1234 Sunset Blvd Los Angeles, CA 90026 USA" products={products}/>, 
  document.getElementById('container') 
);
