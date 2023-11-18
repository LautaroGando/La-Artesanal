const verifyLogin = JSON.parse(localStorage.getItem('login'));

if (!verifyLogin || verifyLogin.role !== 'ADMIN') {

    window.location.href = '/index.html';

};