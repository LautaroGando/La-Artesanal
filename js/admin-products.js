const formProductHTML = document.getElementById('formProduct');
const tableHTML = document.getElementById('tbody');
const searchHTML = document.getElementById('search');

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
                                        <button onclick="editProduct('${product.id}', '${product.name}')">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button onclick="deleteProduct('${product.id}', '${product.name}')">
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

function deleteProduct(id, name) {

    const findIndexProduct = products.findIndex(product => product.id === id);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: `Desea eliminar el producto: ${name}?`,
        text: "Los cambios no seran reversibles!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            swalWithBootstrapButtons.fire({
                title: "Eliminado!",
                text: "El articulo ha sido eliminado.",
                icon: "success"
            });

            products.splice(findIndexProduct, 1);

            paintProducts(products);

            searchHTML.value = '';

            updateStorage();

        } else if (

            result.dismiss === Swal.DismissReason.cancel

        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado!",
                text: "El articulo no ha sido eliminado.",
                icon: "error"
            });
        };

    });

};

function editProduct(id, name) {

    const findIndexProduct = products.find(products => products.id === id);

    const element = formHTML.elements;

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: `Desea editar el producto: ${name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, editar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            element.id.value = findIndexProduct.id;
            element.image.value = findIndexProduct.image;
            element.name.value = findIndexProduct.name;
            element.description.value = findIndexProduct.description;
            element.category.value = findIndexProduct.category;
            element.price.value = findIndexProduct.price;
            element.createDate.value = formatInputDate(findIndexProduct.createDate);

            formHTML.querySelector('button[type="submit"]').innerHTML = 'EDITAR';
            formHTML.querySelector('h2').innerHTML = 'EDITAR PRODUCTO';

        } else if (

            result.dismiss === Swal.DismissReason.cancel

        );

    });

};

function resetForm() {

    formProductHTML.reset();

    formProductHTML.elements.id.value = '';

};

function updateStorage() {

    localStorage.setItem('product', JSON.stringify(products));

};

formProductHTML.addEventListener('submit', (e) => {

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

        Swal.fire({
            icon: "success",
            title: "Producto editado exitosamente!",
            showConfirmButton: false,
            timer: 1500
        });

        formProductHTML.querySelector('button[type="submit"]').innerHTML = 'AGREGAR';
        formProductHTML.querySelector('h2').innerHTML = 'AGREGAR PRODUCTO';

    } else {

        products.push(newProduct);

        Swal.fire({
            icon: "success",
            title: "Producto agregado exitosamente!",
            showConfirmButton: false,
            timer: 1500
        });

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