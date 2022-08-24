
const carrito = document.getElementById('carrito')
const pedido = document.getElementById('listaPedido')
const listaCarrito = document.querySelector('#listaCarrito tbody')
const vaciarCarritoBtn = document.getElementById('vaciarCarrito')

cargarEventListeners()

function cargarEventListeners(){
    pedido.addEventListener('click', comprarPedido)
    carrito.addEventListener('click', eliminarPedido)
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

function comprarPedido(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const pedido = e.target.parentElement.parentElement;
        leerDatosPedidos(pedido);
    }
}

function leerDatosPedidos(pedido){
    const infoPedido = {
        imagen: pedido.querySelector('img').src,
        titulo: pedido.querySelector('h4').textContent,
        precio: pedido.querySelector('.precio').textContent,
        id: pedido.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoPedido)
}

function insertarCarrito(pedido){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${pedido.imagen}" width=100>
        </td>
        <td>${pedido.titulo}</td>
        <td>${pedido.precio}</td>
        <td>
            <a href="#" class="borrar-pedido" data-id="${pedido.id}">X</a>
        </td>
    
    `;
    listaPedido.appendChild(row)
    guardarPedidoLocalStorage(pedido)
}

function eliminarPedido(e){
    e.preventDefault()

    let pedido,
        pedidoId;
    
    if(e.target.classList.contains('borrar-pedido')){
        e.target.parentElement.parentElement.remove()
        pedido = e.target.parentElement.parentElement
        pedidoId = pedido.querySelector('a').getAttribute('data-id')
    }
    eliminarPedidoLocalStorage(pedidoId)
}

function vaciarCarrito(){
    while(listaPedido.firstChild){
        listaPedido.removeChild(listaPedido.firstChild)
    }

    vaciarLocalStorage()

    return false;
}

function guardarPedidoLocalStorage(pedido){
    let pedidos ;
    pedidos = obtenerPedidoLocalStorage()
    pedidos.push(pedido)

    localStorage.setItem('pedidos', JSON.stringify(pedidos))
}

function obtenerPedidoLocalStorage(){
    let pedidosLS;

    if(localStorage.getItem('pedidos')=== null){
        pedidosLS = []
    } else{
        pedidosLS = JSON.parse(localStorage.getItem('pedidos'))
    }
    return pedidosLS
}

function leerLocalStorage(){
    let pedidosLS

    pedidosLS = obtenerPedidoLocalStorage()

    pedidosLS.forEach(function(pedido){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${pedido.imagen}" width=100>
            </td>
            <td>${pedido.titulo}</td>
            <td>${pedido.precio}</td>
            <td>
                <a hreft="#" class="borrar-pedido" data-id="${pedido.id}">X</a>
            </td>
        
        `
        listaPedido.appendChild(row)
    })
}

function eliminarPedidoLocalStorage(pedido){
    let pedidosLS

    pedidosLS = obtenerPedidoLocalStorage()

    pedidosLS.forEach(function(pedidosLS, index){
        if(pedidosLS.id === pedido){
            pedidosLS.splice(index, 1)
        }
    })

    localStorage.setItem('pedidos', JSON.stringify(pedidosLS))
}

function vaciarLocalStorage(){
    localStorage.clear()
}

const sweetAlert = document.querySelector('.agregar-carrito')

sweetAlert.onclick = (e) => {
    swal({
        title: "Movido al Carrito",
        text: "Felicidades",
        icon: "success",
        button: "Salir"
    });
}