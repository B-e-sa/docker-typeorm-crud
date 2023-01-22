import axios from "axios"
import { useEffect, useState } from "react"
import styled from 'styled-components'
import getCurrentDate from "./utils/getCurrentDate"

interface ITodos {
  id: number
  title: string
  content: string
  date: string
  color: string
}

const App = () => {

  const [todos, setTodos] = useState<ITodos[]>()
  const [errorMessage, setErrorMessage] = useState<string>()

  const apiUrl = 'http://localhost:3000/api/notes/'

  const getTodos = async () => {
    await axios.get(apiUrl)
      .then(({ data }) => setTodos(data))
      .catch(err => setErrorMessage(err))
  }

  useEffect(() => {

    getTodos()

  })

  const newTodo = async () => {

    const defaultTodo = {
      title: 'Title',
      content: 'Content',
      date: getCurrentDate(),
      color: '#f8f845'
    }

    await axios.post(apiUrl, defaultTodo)
      .catch(err => console.log(err))

  }

  const deleteTodo = async (id: number) => {

    await axios.delete(apiUrl + id)

  }

  const changeTodo = (field: string) => {

  }

  const colors = ['#f8f545', '#f87845', '#45c5f8', '#9cf845']

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        {
          todos ?
            todos.map(({ id, title, color, content, date }) => {
              return (
                <Todo color={color} key={id}>
                  <div>
                    <div style={{ display: 'flex' }}>
                      {colors.map((clickedColor, index) => {
                        return (
                          <ColorButton
                            color={clickedColor}
                            key={id + index}
                            onClick={() => {

                              color = clickedColor

                              axios.put(apiUrl + id, {
                                id,
                                color,
                                field: 'color'
                              })

                            }}
                          />
                        )
                      })}
                    </div>
                    <Title
                      color={color}
                      type="text"
                      name="title"
                      defaultValue={title}
                      onChange={(e) => {

                        title = e.target.value

                        axios.put(apiUrl + id, {
                          id,
                          title,
                          field: 'title'
                        })

                      }}
                    />
                    <span onClick={() => deleteTodo(id)}> X </span>
                    <span style={{ border: 'none', outline: 'none' }}> {date} </span>
                  </div>
                  <Content
                    color={color}
                    name="content"
                    cols={30}
                    rows={10}
                    defaultValue={content}
                    onChange={(e) => {

                      content = e.target.value

                      axios.put(apiUrl + id, {
                        id,
                        content,
                        field: 'content'
                      })

                    }}></Content>
                </Todo>
              )
            })
            :
            <p>{errorMessage}</p>
        }
        <DefaultTodo onClick={newTodo}> + </DefaultTodo>
      </div>
    </div>
  )
}

const Title = styled.input`
  background-color: ${props => props.color}; 
  outline: none; 
  border: none;
`

const ColorButton = styled.div`
  background-color: ${props => props.color};
  border-radius: 100%;
  width: 15px;
  height: 15px;
  border: 1px solid gray;
`

const Content = styled.textarea`
  background-color: ${props => props.color};
  border: none;
  resize: none;
  outline: none;
`

const Todo = styled.div`
  margin-inline: 5px;
  width: 250px;
  height: 250px;
  background: ${props => props.color};
`

const DefaultTodo = styled.div`
  margin-left: 5px;
  width: 250px;
  height: 250px;
  background: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default App
