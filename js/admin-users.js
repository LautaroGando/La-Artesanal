const users = [
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

const formHTML = document.getElementById('form');
const tableHTML = document.getElementById('tbody');
const searchHTML = document.getElementById('search');

function paintUsers(array) {

    tableHTML.innerHTML = '';

    array.forEach(user => {

        tableHTML.innerHTML += `<tr>
                                    <td>
                                        <img src="${user.image}" alt="">
                                    </td>
                                    <td>${user.name}</td>
                                    <td>${user.username}</td>
                                    <td>${user.email}</td>
                                    <td>${user.location}</td>
                                    <td>${formatDate(user.date)}</td>
                                    <td>${user.role}</td>
                                    <td>${formatDate(user.createDate)}</td>
                                    <td>
                                        <button onclick="editUser('${user.id}', '${user.username}')">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button onclick="deleteUser('${user.id}', '${user.username}')">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </td>
                                </tr>`;

    });

};

paintUsers(users);

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

function deleteUser(id, name) {

    const findIndexUser = users.findIndex(user => user.id === id);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: `Desea eliminar el usuario: ${name}?`,
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
                text: "El usuario ha sido eliminado.",
                icon: "success"
            });

            users.splice(findIndexUser, 1);

            paintUsers(users);

        } else if (

            result.dismiss === Swal.DismissReason.cancel

        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado!",
                text: "El usuario no ha sido eliminado.",
                icon: "error"
            });
        };

    });

};

function editUser(id, name) {

    const findIndexUser = users.find(user => user.id === id);

    const element = formHTML.elements;

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: `Desea editar el usuario: ${name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, editar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            element.id.value = findIndexUser.id;
            element.image.value = findIndexUser.image;
            element.name.value = findIndexUser.name;
            element.username.value = findIndexUser.username;
            element.email.value = findIndexUser.email;
            element.confirmEmail.value = findIndexUser.confirmEmail;
            element.pass.value = findIndexUser.pass;
            element.confirmPass.value = findIndexUser.confirmPass;
            element.location.value = findIndexUser.location;
            element.date.value = formatInputDate(findIndexUser.date);
            element.role.value = findIndexUser.role;
            element.createDate.value = formatInputDate(findIndexUser.createDate);

            formHTML.querySelector('button[type="submit"]').innerHTML = 'EDITAR';
            formHTML.querySelector('h2').innerHTML = 'EDITAR USUARIO';

        } else if (

            result.dismiss === Swal.DismissReason.cancel

        );

    });

};