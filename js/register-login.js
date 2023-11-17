const users = JSON.parse(localStorage.getItem('user'));

const formRegister = document.getElementById('formRegister');
const formLogin = document.getElementById('formLogin');

formRegister.addEventListener('submit', (e) => {

    e.preventDefault();

    const element = e.target.elements;

    if (!element.image.value.trim() || !element.name.value.trim() || !element.username.value.trim() || !element.email.value.trim() || !element.confirmEmail.value.trim() || !element.pass.value.trim() || !element.confirmPass.value.trim() || !element.location.value.trim() || !element.date.value.trim() || !element.check.checked) {
        Swal.fire({
            icon: 'error',
            title: 'Por favor, complete todos los campos requeridos.',
            showConfirmButton: false,
            timer: 2000
        });
        return;
    }

    const newUser = {
        id: crypto.randomUUID(),
        image: element.image.value,
        name: element.name.value,
        username: element.username.value,
        email: element.email.value,
        confirmEmail: element.confirmEmail.value,
        pass: element.pass.value,
        confirmPass: element.confirmPass.value,
        location: element.location.value,
        date: new Date(element.date.value + 'T00:00:00-03:00').getTime(),
        role: 'USER',
        createDate: new Date().getTime(),
    };

    for (const i of users) {
        
        if (i.username === element.username.value) {

            Swal.fire({
                icon: "error",
                title: "El usuario ya esta registrado!",
                showConfirmButton: false,
                timer: 2000
            });
    
            return;

        };

        if (i.email === element.email.value) {

            Swal.fire({
                icon: "error",
                title: "El correo ya esta registrado!",
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

    };

    Swal.fire({
        icon: 'success',
        title: 'Usuario registrado correctamente!',
        showConfirmButton: false,
        timer: 2000,
    });

    users.push(newUser);
    
    localStorage.setItem('user', JSON.stringify(users));

    formRegister.reset();

    window.location.href = 'index.html';

});