import React from 'react'
import todosJson from './todos.json'

const getTodosFromApi = () => {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      resolve(todosJson)
    }, 1000)
  })
}

export interface Todo {
  text: string
  done: boolean
}

interface TodoStateContextValue {
  todos: Todo[]
  pendingTodo: string
  setPendingTodo: (text: string) => void
  addTodo: () => void
  removeTodo: (text: string) => void
  toggleTodo: (text: string) => void
  state: 'initial' | 'loaded'
}

const TodoStateContext = React.createContext<TodoStateContextValue | null>(null)

const TodoStateManager = ({ children }) => {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const [pendingTodo, setPendingTodo] = React.useState('')
  const [todoState, setTodoState] = React.useState('initial')

  React.useEffect(() => {
    const getTodos = async () => {
      const result = await getTodosFromApi()
      console.log(result)
      setTodos(result)
      setTodoState('done')
    }
    getTodos()
  }, [])

  const addTodo = () => {
    setTodoState('adding todo')
    setTimeout(() => {
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: pendingTodo, done: false },
      ])
      setPendingTodo('')
      setTodoState('done')
    }, 1000)
  }

  const removeTodo = (todoMessage) => {
    setTodoState('removing todo')
    setTimeout(() => {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.text !== todoMessage),
      )
      setTodoState('done')
    }, 1000)
  }

  const toggleTodo = (todoMessage) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.text === todoMessage) {
          return {
            ...todo,
            done: !todo.done,
          }
        }
        return todo
      })
    })
  }

  const contextValue = {
    todos,
    setPendingTodo,
    addTodo,
    removeTodo,
    toggleTodo,
    state: todoState,
  }

  return (
    <TodoStateContext.Provider value={contextValue as any}>
      {children}
    </TodoStateContext.Provider>
  )
}

export const withTodoState = (Component) => {
  return () => {
    return (
      <TodoStateManager>
        <Component />
      </TodoStateManager>
    )
  }
}

export const useTodoState = () => {
  const context = React.useContext(TodoStateContext)
  if (context === null) {
    throw new Error('Context used outside of a Provider')
  }
  return context
}
