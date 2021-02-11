// Varibles

let selectedProducts = $('#selectProductsContainer');
const domBuilder = new DOMBuilder();
let cart = $('#carrito');
const cartList = document.getElementById('lista-carrito');
let clearCart = $('#vaciar-carrito');
let selectProducts = [];
let products = [];
let productContainer = $('#productContainer');
let purchaseCart = $('#comprar-carrito');
let JSONcontent = [];


$(document).ready(function() {
    loadContentProducts();
    cart.click(deleteProduct);
    clearCart.click(clearProducts);
    purchaseCart.click(purchase);
})


// CREAR LA LISTA DE PRODUCTOS
function loadContentProducts(){
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url:"Products/data.json",
        dataType: "json",
        success: function(JSONcontent){
            localStorage.JSONcontent = JSON.stringify(JSONcontent);
            $.each(JSONcontent, function(i){
                const card = buildProductCard(JSONcontent[i]);
                productContainer.append(card);
                products.push(JSONcontent[i]);
                console.log(JSONcontent[i].type);
            })
        },
        error: function(){
            const HTMLCard =`<h4>Contenido no disponible</h4>`;
            productContainer.append(HTMLCard);
        }
    })
}

function buildProductCard(product) {
    /*
    const div = document.createElement('div');
    div.className = "col-lg-3";
    const title = domBuilder.h4(product.name);
    const img = domBuilder.image(product.image);
    const price = domBuilder.price(product.price);
    */
    const div = document.createElement('div');
    div.classList.add('col-lg-3');
    const button = domBuilder.button('Seleccionar', 'btn-primary', product.id);
    const buttonDetail = domBuilder.buttonDetail('Ver detalle','btn-outline-primary',product.id);
    const card = domBuilder.buildCard(product.image)
    const cardDetail = domBuilder.buildCardBody(product.name,product.price)
    cardDetail.appendChild(button)
    cardDetail.appendChild(buttonDetail)
    card.appendChild(cardDetail)
    div.appendChild(card)
    /*
    div.append(button);
    div.append(buttonDetail);
    div.appendChild(title);
    div.appendChild(img);
    div.appendChild(price);
    */
    return div;
}

// AGREGAR PRODUCTOS
function selectedProcessors() {
    $('#productContainer').hide("fast",function(){
        clearContainer();
    });
    $('#productContainer').slideToggle("fast",function(){
        products.forEach(function(product){
            if(product.type == "processor"){
                const card = buildProductCard(product);
                productContainer.append(card);
            }
        })
    })
}


function selectVideos() {
    $('#productContainer').hide("fast",function(){
        clearContainer();
    });
    $('#productContainer').slideToggle("fast",function(){
        products.forEach(function(product){
            if(product.type == "videocard"){
                const card = buildProductCard(product);
                productContainer.append(card);
            }
        })
    })
}

function selectMemories() {
    $('#productContainer').hide("fast",function(){
        clearContainer();
    });
    $('#productContainer').slideToggle("fast",function(){
        products.forEach(function(product){
            if(product.type == "memorie"){
                const card = buildProductCard(product);
                productContainer.append(card);
            }
        })
    })
}

function selectCabinets() {
    $('#productContainer').hide("fast",function(){
        clearContainer();
    });
    $('#productContainer').slideToggle("fast",function(){
        products.forEach(function(product){
            if(product.type == "cabinet"){
                const card = buildProductCard(product);
                productContainer.append(card);
            }
        })
    })
}

function deleteProduct(event) {
    if (event.target.classList.contains('borrar-curso')) {
        const productId = event.target.getAttribute('data-id');
        selectProducts = selectProducts.filter(function(product) {
            if (product.id !== productId) {
                return true;
            }
        })
        localStorage.selectProducts = JSON.stringify(selectProducts);
        cartHTML();
    };
}




// EVENTO DE BOTON SELECCIONAR.
function onSelectedClick(event) {
    const idProduct = event.target.dataset.id;
    console.log(idProduct);
    selectProduct = products.find(function(product) {
        if (product.id == idProduct) {
            return product;
        }
    });
    readLessonData(selectProduct);
}


function readLessonData(selectProduct) {
    const infoProduct = {
        image: selectProduct.image.src,
        title: selectProduct.name,
        price: selectProduct.price,
        id: selectProduct.id,
        quantity: 1
    }

    // If element already exist in the cart
    if (localStorage.selectProducts != undefined) {
        selectProducts = JSON.parse(localStorage.selectProducts);
    }
    const exist = selectProducts.some(producto => producto.id === infoProduct.id);
    if (exist) {
        selectProducts.forEach(function(p) {
            if (p.id === infoProduct.id) {
                p.quantity++;
            }
        })
    } else {
        selectProducts.push(selectProduct);
    }
    localStorage.selectProducts = JSON.stringify(selectProducts);
    cartHTML();
}

// Show cart in HTML

function cartHTML() {
    clearHTML();
    selectProducts.forEach(function(product) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td><img src="${product.image}" width="100"></td>
        <td>${product.name}</td>
        <td>$ ${product.price}</td>
        <td>${product.quantity}</td>
        <td><a href="#" class="borrar-curso" data-id="${product.id}">X</td>
        `;
        cartList.appendChild(tr);
    })
}
function clearHTML() {
    cartList.innerHTML = `
    <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
    <tr>
    `;
}

function purchase() {
    alert('El total del carrito es de: $' + totalCart());
}

function totalCart() {
    let total = 0;
    selectProducts.forEach(function(product) {
        total += (product.price * product.quantity);
    })
    return total;
}

function clearProducts() {
    clearHTML();
    selectProducts = [];
    localStorage.selectProducts = JSON.stringify(selectProducts);
}

// Evento VER DETALLE
function lookDetail(event){
    let id = event.target.dataset.id;
    if(JSONcontent.length == 0){
        JSONcontent = JSON.parse(localStorage.JSONcontent)
        let jsonDetails = JSONcontent.find(item => item.id === id)
        console.log(jsonDetails)
        if(jsonDetails != undefined){
            console.log('se encontro')
            localStorage.contentProduct = JSON.stringify(jsonDetails)
            location.href = 'detail.html'
            console.log(jsonDetails)
        }else{
            console.error(`No se encontró el elemento: ${id}`)
        }
    }
}

function clearContainer() {
    const h1 = '';
    $('#productContainer').html(h1);
}

// Desplazamiento
function desplazarMe(titulo){
    $('html, body').animate({scrollTop: $('#'+titulo).offset().top},2000)
}

$('#link2').click(function(){
    desplazarMe('productContainer')
})

$('#link3').click(function(){
    desplazarMe('contactContainer')
})