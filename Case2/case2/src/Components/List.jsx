import Item from './Item'
import { faker } from '@faker-js/faker'
import { useState, useEffect } from 'react'

const List = (Props) => {

  const [data, setData] = useState([])

  function generateUsers() {
    let users = []

    for (let id = 0; id < Props.amount; id++) {
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

  function callFunc() {
    const generateContent = generateUsers()
    setData(generateContent)
  }

  useEffect(() => {
    callFunc();
  }, [])

  return (
    <div>
      {data.map(item => {
        return (
          <Item
            key={item.id}
            name={item.first_name + ' ' + item.last_name}
            email={item.email}
          />
        )
      })}
    </div>
  )

}

export default List;

// o que fazer:

/*
ter todas as informações do faker
montar o componente 
*/
