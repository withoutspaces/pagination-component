import { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'

import './App.css'
import List from './Components/List.jsx'
import Pagination from './Components/Pagination'
import Item from './Components/Item'


const ITEMS_PER_PAGE = 10
const TOTAL_ITEMS = 230

export default function App() {
  const [data, setData] = useState([])
  const [currentItems, setCurrentItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  function generateUsers(items) {
    let users = []

    for (let id = 0; id < items; id++) {
      let firstName = faker.name.firstName()
      let lastName = faker.name.lastName()
      let email = faker.internet.email()

      users.push({
        id: id,
        first_name: firstName,
        last_name: lastName,
        email: email
      })
    }
    setData(users)
  }

  useEffect(() => {
    generateUsers(TOTAL_ITEMS)
  }, [])

  const onPageChanged = () => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    setCurrentItems(data.slice(offset, offset + ITEMS_PER_PAGE))
  }


  console.log(currentItems)


  return (
    <section className='section'>
      <div className='container'>
        <Pagination
          limit={ITEMS_PER_PAGE}
          total={TOTAL_ITEMS}
          onPageChanged={onPageChanged}
        />
        {currentItems.map(item => {
          return (
            <Item
              name={item.first_name + ' ' + item.last_name}
              email={item.email}
            />
          )
        })}
      </div>
    </section>
  )
}

