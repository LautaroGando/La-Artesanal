(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})();

const usersStart = [
    {
        id: crypto.randomUUID(),
        image: '/assets/images/logo.png',
        name: 'Abril Gando',
        username: 'Abrilucha',
        email: 'abrilgando10@gmail.com',
        confirmEmail: 'abrilgando10@gmail.com',
        pass: 'abrilucha',
        confirmPass: 'abrilucha',
        location: 'Liniers',
        date: new Date('2005-03-29' + 'T00:00:00-03:00').getTime(),
        role: 'ADMIN',
        createDate: new Date().getTime(),
    },
    {
        id: crypto.randomUUID(),
        image: '/assets/images/logo.png',
        name: 'Valentina Molina',
        username: 'Valen',
        email: 'valenmolina@gmail.com',
        confirmEmail: 'valenmolina@gmail.com',
        pass: 'valenmolina03',
        confirmPass: 'valenmolina03',
        location: 'Liniers',
        date: new Date('2005-02-19' + 'T00:00:00-03:00').getTime(),
        role: 'ADMIN',
        createDate: new Date().getTime(),
    },
    {
        id: crypto.randomUUID(),
        image: '/assets/images/logo.png',
        name: 'Lautaro Gando',
        username: 'Gandito',
        email: 'lauticapo1910cavs@gmail.com',
        confirmEmail: 'lauticapo1910cavs@gmail.com',
        pass: 'Ganditocapogaso.3',
        confirmPass: 'Ganditocapogaso.3',
        location: 'Liniers',
        date: new Date('2001-05-22' + 'T00:00:00-03:00').getTime(),
        role: 'USER',
        createDate: new Date().getTime(),
    },
];

if (JSON.parse(localStorage.getItem('user')) === null) {

    localStorage.setItem('user', JSON.stringify(usersStart));

};

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

if (JSON.parse(localStorage.getItem('product')) === null) {

    localStorage.setItem('product', JSON.stringify(productsStart));

};

const cardsHTML = document.querySelector('.container-cards');

const cards = [
    {
        image: 'https://imag.bonviveur.com/bizcochitos-de-grasa.jpg',
        title: 'Bizcochitos',
        description: 'Estos son una mierda',
        price: 500,
    },
    {
        image: 'https://imag.bonviveur.com/bizcochitos-de-grasa.jpg',
        title: 'Bizcochitos',
        description: 'Estos son una mierda',
        price: 500,
    },
    {
        image: 'https://imag.bonviveur.com/bizcochitos-de-grasa.jpg',
        title: 'Bizcochitos',
        description: 'Estos son una mierda',
        price: 500,
    },
];

function paintCard(array) {
    
    cardsHTML.innerHTML = '';

    array.forEach(card => {
        
        cardsHTML.innerHTML += `<div class="card">
                                    <img src="${card.image}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${card.title}</h5>
                                        <p class="card-text">${card.description}</p>
                                        <div class="d-flex justify-content-between">
                                            <a href="#" class="btn btn-primary">Agregar</a>
                                            <a href="#" class="btn disabled">$${card.price}</a>
                                        </div>
                                    </div>
                                </div>`;

    });

};

paintCard(cards);