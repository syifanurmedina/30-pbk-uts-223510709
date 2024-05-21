<template>
    <div id="todos">
      <h2>COFFE SHOP YANG DI KUNJUNGI</h2>
      <h3>By: Syifa Nur Medina</h3>
      <form @submit.prevent="addTodo">
        <input v-model="newTodo" required placeholder="isi disini">
        <button>Tambah +</button>
      </form>
      <ul>
        <li v-for="todo in filteredTodos" :key="todo.id">
          <input type="checkbox" v-model="todo.done">
          <span :class="{ done: todo.done }">{{ todo.text }}</span>
          <button @click="removeTodo(todo)">X</button>
        </li>
      </ul>
      <button @click="hideCompleted = !hideCompleted">
        {{ hideCompleted ? 'Tampilkan' : 'Sembunyikan' }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  let id = 0
  const props = defineProps(['initialTodos'])
  const todos = ref([...props.initialTodos])
  const newTodo = ref('')
  const hideCompleted = ref(false)
  
  const filteredTodos = computed(() => {
    return hideCompleted.value
      ? todos.value.filter((t) => !t.done)
      : todos.value
  })
  
  function addTodo() {
    todos.value.push({ id: id++, text: newTodo.value, done: false })
    newTodo.value = ''
  }
  
  function removeTodo(todo) {
    todos.value = todos.value.filter((t) => t !== todo)
  }
  </script>
  
  <style scoped>
  .done {
    text-decoration: line-through;
  }
  </style>
  