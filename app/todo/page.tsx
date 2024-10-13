"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

function AddTodo({ addTodo, todo, setTodo }) {
  return (
    <div className="flex space-x-2 mb-4">
      <Input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <Button onClick={addTodo}>Add</Button>
    </div>
  )
}

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className="flex items-center space-x-2 mb-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <span className={todo.completed ? 'line-through' : ''}>
        {todo.name}
      </span>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => deleteTodo(todo)}
      >
        Delete
      </Button>
    </li>
  )
}

export default function Todo() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  async function fetchTodos() {
    const data = await fetch("todo/api").then((res) => res.json());

    setTodos(data)
  }

  const addTodo = async () => {
    if (newTodo.trim() === '') return

    await fetch('todo/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newTodo }),
    }).then((res) => res.json())

    setNewTodo('')
    fetchTodos()
  }

  const toggleTodo = async (todo) => {
    await fetch('todo/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todo.id, completed: !todo.completed }),
    })

    fetchTodos()
  }

  const deleteTodo = async (todo) => {
    await fetch('todo/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todo.id }),
    })

    fetchTodos()
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <AddTodo addTodo={addTodo} todo={newTodo} setTodo={setNewTodo} />
          <ul>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
