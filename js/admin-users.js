const formUserHTML = document.getElementById('formUser');
const tableHTML = document.getElementById('tbody');
const searchHTML = document.getElementById('search');

const users = JSON.parse(localStorage.getItem('user'));

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

            updateStorage();

            searchHTML.value = '';

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

function resetForm() {

    formUserHTML.reset();

    formUserHTML.elements.id.value = '';

};

function updateStorage() {

    localStorage.setItem('user', JSON.stringify(users));

};

searchHTML.addEventListener('keyup', (e) => {

    const element = e.target.value.toLowerCase();

    const findUserArray = users.filter(user => {

        const name = user.name.toLowerCase();

        if (name.includes(element)) {

            return true;

        };

        return;

    });

    paintUsers(findUserArray);



});

formUserHTML.addEventListener('submit', (e) => {

    e.preventDefault();

    const element = e.target.elements;

    const id = element.id.value ? element.id.value : crypto.randomUUID();

    const newUser = {
        id: id,
        image: element.image.value,
        name: element.name.value,
        username: element.username.value,
        email: element.email.value,
        confirmEmail: element.confirmEmail.value,
        pass: element.pass.value,
        confirmPass: element.confirmPass.value,
        location: element.location.value,
        date: new Date(element.date.value + 'T00:00:00-03:00').getTime(),
        role: element.role.value,
        createDate: new Date().getTime(),
    };

    const findUser = users.find(user => user.username === element.username.value);

    if (findUser && findUser.id !== element.id.value) {

        Swal.fire({
            icon: "error",
            title: "El usuario ya esta registrado!",
            showConfirmButton: false,
            timer: 2000
        });

        return;

    };

    if (element.email.value !== element.confirmEmail.value) {

        Swal.fire({
            icon: "error",
            title: "Los correos deben coincidir!",
            showConfirmButton: false,
            timer: 2000
        });

        return;

    };

    if (element.pass.value !== element.confirmPass.value) {

        Swal.fire({
            icon: "error",
            title: "Las claves deben coincidir!",
            showConfirmButton: false,
            timer: 2000
        });

        return;

    };

    if (element.role.value !== 'ADMIN' && element.role.value !== 'USER') {

        Swal.fire({
            icon: "error",
            title: "El rol debe ser USER o ADMIN!",
            showConfirmButton: false,
            timer: 2000
        });

        return;

    };

    const findEmail = users.find(user => user.email === element.email.value);

    if (findEmail && findEmail.id !== element.id.value) {

        Swal.fire({
            icon: "error",
            title: "El correo ya se encuentra registrado!",
            showConfirmButton: false,
            timer: 2000
        });

        return;

    };

    if (element.id.value) {

        const index = users.findIndex(user => user.id === element.id.value);

        users[index] = newUser;

        Swal.fire({
            icon: "success",
            title: "Usuario editado exitosamente!",
            showConfirmButton: false,
            timer: 1500
        });

        formUserHTML.querySelector('button[type="submit"]').innerHTML = 'AGREGAR';
        formUserHTML.querySelector('h2').innerHTML = 'AGREGAR PRODUCTO';

    } else {

        Swal.fire({
            icon: "success",
            title: "Usuario agregado exitosamente!",
            showConfirmButton: false,
            timer: 1500
        });

        users.push(newUser);

    };

    paintUsers(users);

    resetForm();

    updateStorage();

});