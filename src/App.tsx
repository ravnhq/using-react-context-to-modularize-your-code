import React from 'react'
import { TodoScreen } from './todo/TodoScreen'
import { withTodoState } from './todo/withTodoState'

function App() {
  return <TodoScreen />
}

export default withTodoState(App)
