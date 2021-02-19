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
let locationOption = $('#locationContainer');
let JSONdate = [];
let shippingCost;


$(document).ready(function() {
    loadContentProducts();
    loadLocationAPI();
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

function loadLocationAPI(){
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: "https://apis.datos.gob.ar/georef/api/provincias",
        dataType: "json",
        success: function(JSONdate){
            localStorage.JSONdate = JSON.stringify(JSONdate.provincias);
            JSONdate = JSON.parse(localStorage.JSONdate);
            let div = document.createElement('div');
            let select = document.createElement('select');
            let optionSelect = document.createElement('option');
            let btn = document.createElement('button');
            btn.style = "border-left-width: 1px;margin-left: 160px;margin-top: 20px;";
            btn.classList.add('btn-primary');
            btn.textContent = 'Calcular envío';
            btn.id = 'buttonShip'
            optionSelect.textContent='Seleccione';
            btn.addEventListener('click', calculateShipping);
            select.appendChild(optionSelect);
            select.classList.add('form-control');
            select.id = 'locationForm';
            JSONdate.forEach(function(date){
                let option = document.createElement('option');
                option.value = date.nombre;
                option.textContent = date.nombre;
                select.appendChild(option)
            })
            div.appendChild(select)
            div.appendChild(btn)
            locationOption.append(div)
        },
        error: function(){
            console.log('No se encontraron los datos.');
        }
    })
}

function calculateShipping(){
    const shipLocation = $('#locationForm').val();
    if(shipLocation=='Buenos Aires' || shipLocation=='Ciudad Autónoma de Buenos Aires'){
        shippingCost = 200;
    }else if(shipLocation=='Córdoba'||shipLocation=='Santa Fe'){
        shippingCost = 400;
    }else{
        shippingCost = 500;
    }
    let spinnerShip =` <div id='spinnerShip' class="spinner-border text-primary" role="status" style="margin-left: 232px; margin-top: 30px>
    <span class="sr-only"></span>
  </div>`;
    locationOption.append(spinnerShip)
    console.log(shippingCost);
    setTimeout(()=>{
    let shipSpinner = document.getElementById('spinnerShip')
    $('#spinnerShip').hide("fast");
    },2000)
    
}

function buildFormLocation(date){
    let div = document.createElement('div');
    let select = document.createElement('select');
    select.classList.add('form-control');
    let option = document.createElement('option');
    option.value = date.nombre;
    option.textContent = date.nombre;
    select.appendChild(option)
    div.appendChild(select);
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
    // Respuesta, El total del carrito es XX desea comprarlo? si acepta, cambiar por ejemplo el cambio de cursor a ESPERA document.body.style.cursor = "progress"
    // después un setTimeOut y restituir el puntero del mouse y agradecer la compra document.body.style.cursor = "default", vaciar el carrito y localStorage y refrescar la home
    if(shippingCost>0){
        answer = confirm('El total del carrito es: $'+totalCart()+'. El costo de envío es de: $'+shippingCost+'. Desea comprarlo?')
    }else{
        alert('Atención!, no se seleccionó la ubicación para calcular el costo del envío.')
        answer = confirm('El total del carrito es: $'+totalCart()+'. Desea comprarlo?')
    }
    if(answer){
        document.body.style.cursor = "progress";
        setTimeout(()=>{
            document.body.style.cursor = "default";
            clearProducts()
            alert('Muchas gracias por comprar en ErcMax Gaming!.');
            location.reload()
        },2000)
        
    }
    
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