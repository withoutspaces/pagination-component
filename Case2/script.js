let items = [
  {
    nome: 'Daniel1',
    email: 'email@hotmail.com'
  },
  {
    nome: 'Teste2',
    email: 'teste@email.com'
  },
  {
    nome: 'Daniel3',
    email: 'email@hotmail.com'
  },
  {
    nome: 'Teste4',
    email: 'teste@email.com'
  },
  {
    nome: 'Daniel5',
    email: 'email@hotmail.com'
  },
  {
    nome: 'Teste6',
    email: 'teste@email.com'
  },
  {
    nome: 'Daniel7',
    email: 'email@hotmail.com'
  },
  {
    nome: 'Teste8',
    email: 'teste@email.com'
  }
]

// console.log(items[0].nome)

function showList(items, itemsPerPage) {
  console.log(items)
  let listProperties = ''
  for (let i = 0; i < itemsPerPage; i++) {
    if (i < items.length) {
      listProperties += `<div class="item"><p>${items[i].nome}</p>
                         <p>${items[i].email}</p></div>`
    }
  }
  document.querySelector('main .list').innerHTML = listProperties
}

function showNumerOfPages(numberOfPages) {
  let html = '<ul>'
  for (let i = 1; i <= numberOfPages; i++) {
    html += `<li><button>${i}</button></li>`
  }
  html += '</ul>'
  document.querySelector('header .pagination').innerHTML = html
}

function pagination(items, pageActual, limitItems) {
  let results = []
  let numberOfPages = Math.ceil(items.length / limitItems)
  let count = pageActual * limitItems - limitItems
  let delimiter = count + limitItems

  showNumerOfPages(numberOfPages)

  if (pageActual <= numberOfPages) {
    for (let i = count; i < delimiter; i++) {
      if (i < items.length) {
        results.push(items[i])
        count++
      }
    }
  }
  // console.log(results)
  showList(results, limitItems)
}

pagination(items, 2, 2)

const nav = document.querySelector('header nav')
nav.addEventListener('click', () => {})
