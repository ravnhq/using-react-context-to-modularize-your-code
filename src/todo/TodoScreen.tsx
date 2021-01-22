import React from 'react'
import todosJson from './todos.json'
import { Todo, useTodoState } from './withTodoState'

interface TodoListItemProps {
  todo: Todo
  onDelete: (text: string) => void
  onComplete: (text: string) => void
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  onDelete,
  onComplete,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: 5,
        border: '1px solid lightgrey',
        borderRadius: 4,
        marginBottom: 10,
      }}
      onClick={() => onComplete(todo.text)}
    >
      <div style={{ padding: 5 }} onClick={() => onDelete(todo.text)}>
        🗑
      </div>
      <div style={{ textDecoration: todo.done ? 'line-through' : undefined }}>
        {todo.text}
      </div>
      {todo.done && <div>✅</div>}
    </div>
  )
}

export const TodoScreen = () => {
  const todoState = useTodoState()
  return (
    <div>
      <div>
        <input
          onChange={(e) => todoState.setPendingTodo(e.target.value)}
          value={todoState.pendingTodo}
        />
        <button onClick={(e) => todoState.addTodo()}>Add Todo</button>
      </div>
      <div>
        State: <div>{todoState.state}</div>
      </div>
      <div
        style={{ fontFamily: 'sans-serif', fontSize: 20, padding: '10px 0px' }}
      >
        Todo:
      </div>
      <div></div>
      {todoState.todos.map((todo) => (
        <TodoListItem
          todo={todo}
          onDelete={todoState.removeTodo}
          onComplete={todoState.toggleTodo}
        />
      ))}
    </div>
  )
}
