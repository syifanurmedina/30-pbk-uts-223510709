<template>
    <div id="app">
      <header>
        <nav>
          <ul>
            <button @click="showTodos">Todos</button>
            <button @click="showPosts">Posts</button>
          </ul>
        </nav>
      </header>
      <img alt="Vue Logo" src="./assets/coffe2.jpeg" height="200">
      <logos />
      <slot></slot>
    </div>
    <Todos v-if="showingTodos" :initialTodos="initialTodos" />
    <Posts v-else :users="users" />
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import Todos from './Todos.vue'
  import Posts from './post.vue'
  
  const showingTodos = ref(true)
  const users = ref([])
  
  const initialTodos = [
    { id: 0, text: 'Leton coffee', done: true },
    { id: 1, text: 'Tomoro coffee', done: true },
    { id: 2, text: 'Kaua coffee', done: true },
    { id: 3, text: 'Soe coffee', done: false },
    { id: 4, text: 'Fore coffee', done: false }
  ]
  
  const fetchUser = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      users.value = data
    } catch (error) {
      console.error('Error Fetch User:', error)
    }
  }
  
  const showTodos = () => {
    showingTodos.value = true
  }
  
  const showPosts = () => {
    showingTodos.value = false
    fetchUser()
  }
  
  onMounted(fetchUser)
  </script>
  