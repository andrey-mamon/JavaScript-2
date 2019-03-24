const goods = [{
        name: 'Shirt',
        price: 150,
        image: 'img/product1.jpg'
            },
    {
        name: 'Socks',
        price: 50,
        image: 'img/product2.jpg'
            },
    {
        name: 'Jacket',
        price: 350,
        image: 'img/product3.jpg'
            },
    {
        name: 'Shoes',
        price: 250,
        image: 'img/product4.jpg'
            },
        ];

const renderItem = ({
    name,
    price,
    image
} = {
    name: 'Item',
    price: 0,
    image: 'img/product1.jpg'
}) => `<div class="products-item">
    <img src=${image} class="product-image" alt="product image">
    <h2>${name}</h2>
    <span>${price}</span></div>`;

const renderList = items => document.querySelector('.goods').innerHTML = items.map(renderItem).join('');

renderList(goods);
