import React from 'react'
import Navbar from '../components/Navbar'
import TodoAppp from '../components/TodoAppp'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      {/* <TodoApp></TodoApp> */}
      <TodoAppp></TodoAppp>
      <Toaster></Toaster>
    </div>
  )
}
