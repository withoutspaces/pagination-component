import { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'

import './App.css'
import Pagination from './Components/Pagination'
import Item from './Components/Item'


const ITEMS_PER_PAGE = 10
const TOTAL_ITEMS = 230

export default function App() {
  const [data, setData] = useState([])
  const [currentItems, setCurrentItems] = useState([])

  function generateData(items) {
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
    generateData(TOTAL_ITEMS)
  }, [])

  const onPageChanged = ({ currentPage }) => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    console.log('offset = ', offset, 'curr ==', currentPage, currentItems)
    setCurrentItems(data.slice(offset, offset + ITEMS_PER_PAGE))
  }

  return (
    <section className='section'>
      <nav className='container'>
        <Pagination
          limit={ITEMS_PER_PAGE}
          total={TOTAL_ITEMS}
          onPageChanged={onPageChanged}
        />
      </nav>
      {currentItems.map(item => {
        return (
          <Item
            key={item.key}
            name={item.first_name + ' ' + item.last_name}
            email={item.email}
          />
        )
      })}
    </section>
  )
}

