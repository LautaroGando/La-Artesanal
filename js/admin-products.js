const productsStart = [
    {
        id: crypto.randomUUID(),
        image: '/assets/images/logo.png',
        name: 'Alfajores de maicena',
        description: 'Estos alfajores son los peores que probe en mi vida, la verdad una tremenda cagada y un desperdicio de plata.',
        category: 'Panaderia',
        price: 400,
        createDate: new Date().getTime(),
    },
    {
        id: crypto.randomUUID(),
        image: '/assets/images/logo.png',
        name: 'Budin de banana',
        description: 'Este budin parece que lo hacen con bananas podridas, el sabor te dan ganas de vomitar, yo no se si primero cagan y se limpian con la mano y lo hacen asi nomas porque tiene un sabor a mierda increible.',
        category: 'Postres',
        price: 800,
        createDate: new Date().getTime(),
    },
    {
        id: crypto.randomUUID(),
        image: '/assets/images/logo.png',
        name: 'Chees Cake de arandanos',
        description: 'Por empezar el precio un robo, la textura de por si fea, y el sabor una mierda, nada mas que decir.',
        category: 'Postres',
        price: 1000,
        createDate: new Date().getTime(),
    },
    {
        id: crypto.randomUUID(),
        image: '/assets/images/logo.png',
        name: 'Empanadas de carne',
        description: 'Todavia no salieron a la venta, espero que nunca lo hagan, todo lo que hacen estas dos fracasadas es una mierda.',
        category: 'Comidas',
        price: 500,
        createDate: new Date().getTime(),
    },
];

const formHTML = document.getElementById('form');
const tableHTML = document.getElementById('tbody');
const searchHTML = document.getElementById('search');

if (JSON.parse(localStorage.getItem('product')) === null) {

    localStorage.setItem('product', JSON.stringify(productsStart));

};

const products = JSON.parse(localStorage.getItem('product'));

function paintProducts(array) {

    tableHTML.innerHTML = '';

    array.forEach(product => {
        
        tableHTML.innerHTML += `<tr>
                                    <td>
                                        <img src="${product.image}" alt="">
                                    </td>
                                    <td>${product.name}</td>
                                    <td>${product.description}</td>
                                    <td>${product.category}</td>
                                    <td>$${product.price}</td>
                                    <td>${formatDate(product.createDate)}</td>
                                    <td>
                                        <button onclick="editProduct('${product.id}')">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button onclick="deleteProduct('${product.id}')">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </td>
                                </tr>`;

    });

};

paintProducts(products);

function formatDate(date) {

    const objectIntl = new Intl.DateTimeFormat('es-AR', {

        day: '2-digit',
        month: '2-digit',
        year: 'numeric',

    });

    const formatIntl = objectIntl.format(date);

    return formatIntl;

};

function formatInputDate(date) {

    const objectDate = new Date(date);

    const year = objectDate.getFullYear();

    let month = objectDate.getMonth() + 1;

    if (month < 10) {

        month = `0${month}`;

    };

    const day = objectDate.getDate().toString().padStart(2, '0');

    date = `${year}-${month}-${day}`;

    return date;

};

function deleteProduct(id) {

    const findIndexProduct = products.findIndex(product => product.id === id);

    products.splice(findIndexProduct, 1);

    paintProducts(products);

    searchHTML.value = '';

    updateStorage();

};

function editProduct(id) {

    const findIndexProduct = products.find(products => products.id === id);

    const element = formHTML.elements;

    element.id.value = findIndexProduct.id;
    element.image.value = findIndexProduct.image;
    element.name.value = findIndexProduct.name;
    element.description.value = findIndexProduct.description;
    element.category.value = findIndexProduct.category;
    element.price.value = findIndexProduct.price;
    element.createDate.value = formatInputDate(findIndexProduct.createDate);

    document.querySelector('button[type="submit"]').innerHTML = 'EDITAR';
    document.querySelector('h2').innerHTML = 'EDITAR PRODUCTO';

};

function resetForm() {
    
    formHTML.reset();

    formHTML.elements.id.value = '';

};

function updateStorage() {

    localStorage.setItem('product', JSON.stringify(products));

};

formHTML.addEventListener('submit', (e) => {

    e.preventDefault();

    const element = e.target.elements;

    const id = element.id.value ? element.id.value : crypto.randomUUID();

    const newProduct = {
        id: id,
        image: element.image.value,
        name: element.name.value,
        description: element.description.value,
        category: element.category.value,
        price: element.price.value,
        createDate: new Date().getTime(),
    };

    if (element.id.value) {

        const index = products.findIndex(product => product.id === element.id.value);

        products[index] = newProduct;

        document.querySelector('button[type="submit"]').innerHTML = 'AGREGAR';
        document.querySelector('h2').innerHTML = 'AGREGAR PRODUCTO';

    } else {

        products.push(newProduct);

    };

    paintProducts(products);

    resetForm();

    updateStorage();

});

searchHTML.addEventListener('keyup', (e) => {

    const element = e.target.value.toLowerCase();

    const findProductArray = products.filter(product => {

        const name = product.name.toLowerCase();

        if (name.includes(element)) {

            return true;

        };

        return;

    });

    paintProducts(findProductArray);

});