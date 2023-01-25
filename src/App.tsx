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

  const [todos, setTodos] = useState<ITodos[]>([{ id: 1, title: '', content: '', date: '', color: '#f8f845' }])
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
      .catch(err => setErrorMessage(err))

  }

  const deleteTodo = async (id: number) => await axios.delete(apiUrl + id)

  const colors = ['#f8f556', '#f87845', '#45c5f8', '#9cf845']

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        {todos ?
          todos.map(({ id, title, color, content, date }) => {
            return (
              <Todo color={color} key={id}>
                <div>
                  <div style={{ display: 'flex' }}>
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
                    <div style={{ display: 'flex', position: 'absolute', right: '10px' }}>
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
                      <Delete onClick={() => deleteTodo(id)}> x </Delete>
                    </div>
                  </div>
                </div>
                <Content
                  color={color}
                  name="content"
                  cols={30}
                  rows={14}
                  maxLength={400}
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
          <p>{errorMessage}</p>}
        <DefaultTodo onClick={newTodo}> + </DefaultTodo>
      </div>
    </div>
  )
}

const Delete = styled.button`

  transition: background-color 0.3s;

  &:hover { background-color: #b4b4b437 }

  cursor: pointer;
  border: none;
  text-align: center;
  background-color: transparent;
  padding-bottom: 1px;
  border-radius: 100%;
  width: 15px;
  height: 15px;
`

const Title = styled.input`
  margin-bottom: 5px;
  background-color: transparent;
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
  background-color: transparent;
  border: none;
  resize: none;
  outline: none;
`

const Todo = styled.div`
  padding-top: 12px;
  padding-inline: 5px;
  margin-inline: 5px;
  width: 250px;
  height: 250px;
  transform: perspective(15rem);
  background: ${props => `linear-gradient(-50deg, ${props.color + 'ac'}, ${props.color} 100%) `};
  box-shadow: 10px 12px 10px -10px black;
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
