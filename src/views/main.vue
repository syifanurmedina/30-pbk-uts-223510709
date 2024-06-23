<script setup>
import { ref, computed, onMounted, watch } from 'vue'

let id = 0
const showingTodos = ref(true);
const selectedUser = ref(null);
const isLoading = ref(false); 
const users = ref([]);
const posts = ref([]);
const newTodo = ref('')
const hideCompleted = ref(false)
const todos = ref([
  { id: id++, text: 'Leton coffee', done: true },
  { id: id++, text: 'Tomoro coffee', done: true },
  { id: id++, text: 'Kaua coffee', done: true },
  { id: id++, text: 'Soe coffee', done: false },
  { id: id++, text: 'Fore coffee', done: false }
])

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

const fetchUser = async () => {
  try {
    isLoading.value = true; 
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    console.log('User yang di fetch:', data); 
    users.value = data;
  } catch (error) {
    console.error('Error Fetch User:', error);
  } finally {
    isLoading.value = false; 
  }
};
const fetchPosts = async () => {
  if (!selectedUser.value) return;
  isLoading.value = true;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
    const data = await response.json();
    console.log('Post yang di fetch:', data); 
    posts.value = data;
  } catch (error) {
    console.error('Error Fetch Post:', error);
  } finally {
    isLoading.value = false; 
  }
};
watch(selectedUser, () => {
  posts.value = []; 
  fetchPosts();
}, { immediate: true }); 
const showPosts = () => {
  showingTodos.value = false;
  fetchUser();
};
onMounted(() => {
  fetchUser();
});
</script>

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
  </div>
  <div v-if="showingTodos" id="todos">
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
<div v-else id="posts">
      <h1>Postingan Pengguna</h1>
      <select v-model="selectedUser" @change="fetchPosts">
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
      <div v-if="isLoading">
        <span class="loading-message">Loading posts...</span>
      </div>
      <div v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>