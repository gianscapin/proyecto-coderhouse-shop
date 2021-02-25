class DOMBuilder {
    constructor() {

    }
    h4(title) {
        const h4 = document.createElement('h4');
        h4.textContent = title;
        return h4;
    }
    image(img) {
        const image = document.createElement('img');
        image.src = img;
        image.className = "imagenesProductos";
        return image;
    }
    p(word) {
        const pw = document.createElement('p');
        pw.textContent = word;
        return pw;
    }
    price(word) {
        const price = document.createElement('p');
        price.textContent = "$" + word;
        return price;
    }
    button(word, classButton, id) {
        const button = document.createElement('button');
        button.classList.add(classButton);
        button.classList.add('agregar-carrito');
        button.textContent = word;
        button.setAttribute('data-id', id);
        button.addEventListener('click', onSelectedClick);
        return button;
    }
    buttonDetail(word,classButon, id){
        const button = document.createElement('button')
        button.classList.add(classButon)
        button.textContent = word
        button.setAttribute('data-id',id)
        button.addEventListener('click',lookDetail)
        button.style = 'margin-top: 10px; margin-bottom: 15px'
        return button;
    }

    buildCard(image){
        let div = document.createElement('div');
        div.classList.add('card')
        div.classList.add('bg-dark')
        div.classList.add('border-primary')
        div.classList.add('mx-auto')
        div.style = 'width: 18rem; margin-bottom: 10px;';
        div.innerHTML = `<img src="${image}" class="card-img-top" alt="...">`
        return div;
    }

    buildCardBody(name, price){
        let div= document.createElement('div');
        div.classList.add('card-body')
        div.innerHTML = `
            <h5 class="card-title">${name}</h5>
            <p class="card-text">$ ${price}</p>`;
        return div;
    }
}