const productsContent = document.getElementById('products')
const filter = document.querySelector('.filter')
const countItems = document.querySelector('.navbar__cart-count')
const countItemsFilter = document.querySelectorAll('.filter__button-count')
const filterCheckbox = document.querySelectorAll('.filter__checkbox')

let listPrint = []
let filterproduts = []
let filterIds = []
let cart = 0

//Consumir api

const fetchData = async () => {
  try {
    const response = await fetch('products.json')
    const data = await response.json()
    data.products.map(producto => {
      listPrint.push(producto);
    })
    printProducts(listPrint)
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchData()
})

//Imprimir items

const printProducts = data => {
  data.forEach(product => {
    const itemProducts = document.createElement('div')
    itemProducts.className = "products__item";
    itemProducts.innerHTML = `
      <div class="products__image">
        <img src="assets/img/${product.img}"
          class="products__img"
          alt="">
      </div>
      <div class="products__info">
        <p class="products__name">${product.name}</p>
        <p class="products__description">${product.description}</p>
        <p class="products__price">$${product.price}</p>
      </div>
      <button class="products__button">Agregar</button>
    `

    productsContent.appendChild(itemProducts)
  })
}

// Agregar item a Carrito

products.addEventListener('click', e => {
  addCart(e);
})

const addCart = (e) => {
  if (e.target.classList.contains('products__button')) {
    cart += 1
    countItems.style.display = 'flex'
    countItems.innerHTML = cart
  }
  e.stopPropagation()
}

// Filtrar

filter.addEventListener('click', e => {
  if (e.target.classList.contains('filter__close') ||
    e.target.classList.contains('filter__button--fixed')) {
    filter.classList.toggle('filter--active')
  }

  if (e.target.classList.contains('filter__button--inner')) {
    e.preventDefault()
    printfilterproduts(filterIds)
    filter.classList.toggle('filter--active')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (e.target.classList.contains('filter__checkbox')) {
    if (e.target.checked) {
      filterIds.push(e.target.getAttribute('id'))
      console.log(filterIds);
    } else {
      var newFilterIds = []
      filterIds.filter(item => {
        if (item !== e.target.getAttribute('id')) {
          newFilterIds.push(item)
        }
        filterIds = newFilterIds
      })
      console.log(filterIds);
    }
  }

  if (e.target.classList.contains('filter__button--reset')) {
    resetProducts()
    filterCheckbox.forEach(e => { e.checked = false })
    printProducts(listPrint)
  }

  countItemsFilter.forEach(e => {
    if (filterIds.length !== 0) {
      e.style.display = 'flex'
    } else {
      e.style.display = 'none'
    }
    e.innerHTML = filterIds.length
  })
})

const printfilterproduts = (ids) => {
  if (ids.length) {
    resetProducts()
    ids.map(id => {
      listPrint.filter(item => {
        if (item.filterId == id) {
          filterproduts.push(item)
        }
      })
    })
    console.log(filterproduts);
    printProducts(filterproduts)
  }
}

const resetProducts = () => {
  productsContent.innerHTML = ''
  filterproduts = []
}
