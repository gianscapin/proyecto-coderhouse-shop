// Variables

let HTMLTabla = ''
let jsonContent = ''
let productDetail = ''
let available = ''

// Si tenemos un detalle de contenido en el localStorage lo mostramos

$(document).ready(function(){
    if(localStorage.contentProduct != undefined){
        jsonContent = JSON.parse(localStorage.contentProduct)
        if(jsonContent.type == 'processor'){
           productDetail = 
           `<tr>
           <td class="yellow-text">CANTIDAD DE NUCLEOS</td>
           <td>${jsonContent.core}</td>
           </tr>
           <tr>
           <td class="yellow-text">FRENCUENCIA</td>
           <td>${jsonContent.frecuency}</td>
           </tr>
           <tr>
           <td class="yellow-text">NANOMETROS</td>
           <td>${jsonContent.nanometters}</td>
           </tr>
           <tr>
            <td class="yellow-text">MARCA</td>
            <td><h6>${jsonContent.brand}</h6></td>
            </tr>`
        }else if(jsonContent.type == 'videocard'){
         productDetail = 
         `<tr>
         <td class="yellow-text">MANOFACTURERO</td>
         <td>${jsonContent.manufacturer}</td>
         </tr>
         <tr>
         <td class="yellow-text">MEMORIA</td>
         <td>${jsonContent.memory}</td>
         </tr>
         <tr>
         <td class="yellow-text">TIPO DE MEMORIA</td>
         <td>${jsonContent.typeMemory}</td>
         </tr>
         <tr>
         <td class="yellow-text">CONSUMO</td>
         <td>${jsonContent.consumption} watts</td>
         </tr>
         <tr>
         <td class="yellow-text">MARCA</td>
         <td><h6>${jsonContent.brand}</h6></td>
         </tr>`
        }else if(jsonContent.type == 'memorie'){
         productDetail = 
         `<tr>
         <td class="yellow-text">CAPACIDAD</td>
         <td>${jsonContent.capacity}</td>
         </tr>
         <tr>
         <td class="yellow-text">RATIO</td>
         <td>${jsonContent.rate}</td>
         </tr>
         <tr>
         <td class="yellow-text">LATENCIA</td>
         <td>${jsonContent.latency}</td>
         </tr>
         <tr>`
        }else{
         productDetail = 
         `<tr>
         <td class="yellow-text">CAPACIDAD DE COOLERS</td>
         <td>${jsonContent.coolersCapacity}</td>
         </tr>
         <tr>
         <td class="yellow-text">COOLERS INCLUIDOS</td>
         <td>${jsonContent.coolersIncluded}</td>
         </tr>
         <tr>
         <td class="yellow-text">MOTHER</td>
         <td>${jsonContent.mother}</td>
         </tr>
         <tr>`
        }
        if(jsonContent.available == true){
            available =`<tr>
            <td class="yellow-text">DISPONIBILIDAD</td>
            <td class="green-text">> DISPONIBLE </td>
            </tr>`
        }else{
         available =`<tr>
         <td class="yellow-text">DISPONIBILIDAD</td>
         <td class="red-text">> NO DISPONIBLE </td>
         </tr>`
        }
        HTMLTabla = `<div class="row center">
                     <div class="col s12 m5 l4 center-align">
                        <img src="${jsonContent.image}" width="200px">
                     </div>
                     <div class="col s12 m7 l8">
                     <table>
                        <tbody class="white-text">
                           <tr>
                           <td class="yellow-text">TÍTULO</td>
                           <td><h5>${jsonContent.name}</h5></td>
                           </tr>
                           <tr>
                           <td class="yellow-text">PRECIO</td>
                           <td>${jsonContent.price}</td>
                           </tr>
                           ${productDetail}
                           ${available}
                        </tbody>
                     </table>
                     </div>
                     </div>`
         $('#contenido').html(HTMLTabla)
    }
})

$(window).ready(function(){
   $('nav').fadeIn(800, function(){
      $('h4').fadeIn(500)
      $('#contenido').slideDown("slow")
   })
})

$('#retornar').click(function(){
   location.target = '_self'
   location.href = 'index.html'
})