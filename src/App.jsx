import { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'

import './App.css'
import Pagination from './Components/Pagination'
import Item from './Components/Item'


const ITEMS_PER_PAGE = 3
const TOTAL_ITEMS = 230


export default function App() {

  const [data, setData] = useState([])
  const [currentItems, setCurrentItems] = useState([])
  const [loaded, setLoaded] = useState(false)

  function generateData() {
    let users = []

    for (let id = 0; id < TOTAL_ITEMS; id++) {
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
    return users
  }

  const onPageChanged = ({ currentPage }) => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    setCurrentItems(data.slice(offset, offset + ITEMS_PER_PAGE))
  }

  function verifyFirstRender() {
    const getData = generateData()
    setData(getData)
    setLoaded(!data.length && !currentItems.length)
  }

  useEffect(() => {
    verifyFirstRender()
  }, [])

  return (
    <>
      {loaded ?
        <section className='section'>
          <nav className='container'>
            <Pagination
              limit={ITEMS_PER_PAGE}
              total={TOTAL_ITEMS}
              onPageChanged={onPageChanged}
            />
          </nav>

          <main className="container-items">
            {currentItems.map((item, key) => {
              return (
                <Item
                  key={key}
                  name={item.first_name + ' ' + item.last_name}
                  email={item.email}
                />
              )
            })}
          </main>
        </section>
        :
        <p>Carregando...</p>
      }
    </>
  )
}

