const login = JSON.parse(localStorage.getItem('login'));

const navHTML = document.getElementById('nav');
const profileHTML = document.getElementById('profile');

const buttonImageHTML = document.createElement('button');
const iImageHTML = document.createElement('i');

buttonImageHTML.type = 'button';
buttonImageHTML.setAttribute('data-bs-toggle', 'modal');
buttonImageHTML.setAttribute('data-bs-target', '#exampleModal');

profileHTML.appendChild(buttonImageHTML);

iImageHTML.classList.add('fa-solid', 'fa-user');

buttonImageHTML.appendChild(iImageHTML);

if (login) {

    buttonImageHTML.removeChild(iImageHTML);
    buttonImageHTML.removeAttribute('data-bs-toggle');
    buttonImageHTML.removeAttribute('data-bs-target');

    const liImgHTML = document.createElement('li');
    const imgLiHTML = document.createElement('img');
    const ulImgHTML = document.createElement('ul');
    const liUlImgHTML = document.createElement('li');
    const aImgHTML = document.createElement('a');

    liImgHTML.classList.add('nav-item', 'dropdown');

    buttonImageHTML.appendChild(liImgHTML);

    imgLiHTML.src = login.image;
    imgLiHTML.classList.add('nav-link', 'dropdown-toggle');
    imgLiHTML.setAttribute('data-bs-toggle', 'dropdown');
    imgLiHTML.setAttribute('aria-expanded', 'false');

    liImgHTML.appendChild(imgLiHTML);

    ulImgHTML.classList.add('dropdown-menu');

    liImgHTML.appendChild(ulImgHTML);

    ulImgHTML.appendChild(liUlImgHTML);

    aImgHTML.classList.add('dropdown-item')
    aImgHTML.href = '#';
    aImgHTML.innerText = 'SALIR';
    aImgHTML.onclick = () => {

        localStorage.removeItem('login');

    };

    liUlImgHTML.appendChild(aImgHTML);

    if (login.role === 'ADMIN') {

        const liAdminHTML = document.createElement('li');
        const aAdminHTML = document.createElement('a');
        const ulAdminHTML = document.createElement('ul');
        const liPrimaryUlAdminHTML = document.createElement('li');
        const aPrimaryLiUlHTML = document.createElement('a');
        const liSecondaryUlAdminHTML = document.createElement('li');
        const hrSecondaryLiUlAdminHTML = document.createElement('hr');
        const liThirtyUlAdminHTML = document.createElement('li');
        const aThirtyLiUlHTML = document.createElement('a');

        liAdminHTML.classList.add('nav-item', 'dropdown');

        navHTML.appendChild(liAdminHTML);

        aAdminHTML.classList.add('nav-link', 'dropdown-toggle');
        aAdminHTML.setAttribute('href', '#');
        aAdminHTML.setAttribute('role', 'button');
        aAdminHTML.setAttribute('data-bs-toggle', 'dropdown');
        aAdminHTML.setAttribute('aria-expanded', 'false');
        aAdminHTML.innerText = 'ADMIN';

        liAdminHTML.appendChild(aAdminHTML);

        ulAdminHTML.classList.add('dropdown-menu');

        liAdminHTML.appendChild(ulAdminHTML);

        ulAdminHTML.appendChild(liPrimaryUlAdminHTML);

        aPrimaryLiUlHTML.classList.add('dropdown-item');
        aPrimaryLiUlHTML.href = '/pages/admin/admin-users.html';
        aPrimaryLiUlHTML.innerText = 'ADMINISTRAR USUARIOS';

        liPrimaryUlAdminHTML.appendChild(aPrimaryLiUlHTML);

        ulAdminHTML.appendChild(liSecondaryUlAdminHTML);

        hrSecondaryLiUlAdminHTML.classList.add('dropdown-divider');

        liSecondaryUlAdminHTML.appendChild(hrSecondaryLiUlAdminHTML);

        ulAdminHTML.appendChild(liThirtyUlAdminHTML);

        aThirtyLiUlHTML.classList.add('dropdown-item');
        aThirtyLiUlHTML.href = '/pages/admin/admin-products.html';
        aThirtyLiUlHTML.innerText = 'ADMINISTRAR PRODUCTOS';

        liThirtyUlAdminHTML.appendChild(aThirtyLiUlHTML);

    };

};