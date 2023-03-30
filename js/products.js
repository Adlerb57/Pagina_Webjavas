



// contenedor para la lista de productos
const elContainer = $('#products-list')

// esta funcion refresca el carrito de compras
const refreshCartList = () => {
    const ids = JSON.parse(localStorage.getItem('cart')) || []
    // agrega lista de productos a #cart-list-container
    const elCartList = $('#cart-list-container')
    const products = window._products || []

    const grupo = {}
    // agrupar productos
    ids.forEach((id) => {
        const product = products.find((product) => {
            return product.id === id
        })
        console.log(product)
        if (grupo[id]) {
            grupo[id]['quantity'] = grupo[id]['quantity'] + 1
        } else {
            grupo[id] = product
            grupo[id]['quantity'] = 1
        }
    })

    const grupoArray = Object.values(grupo)

    elCartList.html('')

    grupoArray.forEach((product) => {
        const listItem = `
        <li class="list-group-item">
            ${product.name}
            <span class="badge badge-success">
                ${product.quantity}
            </span>
            <span class="badge badge-primary">
                S/ ${product.price * product.quantity}
            </span>
            <span class="float-right">
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">
                    eliminar
                </button>
            </span>
        </li>
        `
        elCartList.append(listItem)
    })

    let precioTotal = 0
    grupoArray.forEach((product) => {
        precioTotal = precioTotal + product.price * product.quantity
    })

    $('#cart-total-modal').html(`S/ ${precioTotal}`)
}

addEventListener('cart', () => {
    console.log('addToCart')
})

// devuelve un string (codigo html) de un producto
const getTemplate = (product) => {
    var cantidad_columnas = 4;
    return `
    <div class="col-12 col-md-${12/cantidad_columnas}">
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <div>
                    <div style='text-decoration: line-through;'>Precio: S/ ${product.price + 50}</div>
                    <div class='py-2' style='font-size: 1.2em;'>Precio Actual: S/ ${product.price}</div>
                </div>
                <div>
                    <h5 class="card-title">
                        ${product.name}
                    </h5>
                    <p class="card-text">
                        ${product.description}
                    </p>
                    <a href="#" class="btn btn-primary" onclick="addToCart(${product.id})">
                        Añadir al carrito
                    </a>
                </div>
            </div>
        </div>
    </div>
    `
}

// obtiene los productos
const getProducts = () => {
	productos.forEach((product) => {
		const card = getTemplate(product)
                elContainer.append(card)
		})
		window._products = productos
}

// muestra el pedido en la pagina de pedido
// esta funcion se llama en la pagina de pedido
const showPedido = () => {

    // obtenemos los items del carrito
    const ids = JSON.parse(localStorage.getItem('cart')) || []
    // agrega lista de productos a #pedido-productos
    const elCartList = $('#pedido-productos')
    const products = window._products || []

    const grupo = {}
    // agrupar productos
    ids.forEach((id) => {
        const product = products.find((product) => {
            return product.id === id
        })
        console.log(product)
        if (grupo[id]) {
            grupo[id]['quantity'] = grupo[id]['quantity'] + 1
        } else {
            grupo[id] = product
            grupo[id]['quantity'] = 1
        }
    })

    const grupoArray = Object.values(grupo)

    elCartList.html('')

    grupoArray.forEach((product) => {
        const listItem = `
        <tr>
            <td><img src="${product.image}" style="max-width:100px"></td>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>S/ ${product.price * product.quantity}</td>
        </tr>
        `
        elCartList.append(listItem)
    })

    let precioTotal = 0
    grupoArray.forEach((product) => {
        precioTotal = precioTotal + product.price * product.quantity
    })

    // establece el precio en el inputo #pedido-total (formulario de pedido)
    $('#pedido-total').val(`S/ ${precioTotal}`)

}




getProducts()

// cuando se tipea algo en el buscador, filtra los productos
$('#search').on('keyup', (e) => {
    const search = e.target.value.toLowerCase()
    const products = window._products

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(search)
    })

    elContainer.html('')

    filteredProducts.forEach((product) => {
        const card = getTemplate(product)

        elContainer.append(card)
    })
})





const addToCart = (id) => {
    
            /*Utilizo libreria de agregar carrito  */
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Agregado Correctamente'
          })


        const cart = JSON.parse(localStorage.getItem('cart')) || []
        cart.push(id)
        localStorage.setItem('cart', JSON.stringify(cart))
        changeCart()
        refreshCartList()
    
}

const changeCart = () => {
    const ids = JSON.parse(localStorage.getItem('cart')) || []
    // sumar todos
    const total = ids.length
    const elCart = $('#cart-number')
    elCart.html(total)
}

const deleteProduct = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const newCart = cart.filter((productId) => {
        return productId !== id
    })

    localStorage.setItem('cart', JSON.stringify(newCart))
    changeCart()
    refreshCartList()
}

changeCart()

const openCartModal = () => {
    refreshCartList()
    $('#cart-modal').modal('show')
}

const comprar = () => {
    const username = $('#pedido-nombre').val()
    const useraddr = $('#pedido-direccion').val()


    


    alert(`Gracias ${username} por su compra, su pedido esta siendo procesado y lo recibirá en ${useraddr}`)


   
    // resetear carrito
    localStorage.setItem('cart', JSON.stringify([]))
    changeCart()
    refreshCartList()


    
    location.reload();



    return false;
}



