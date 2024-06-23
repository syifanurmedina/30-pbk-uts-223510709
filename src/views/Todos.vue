<template>
  <div id="todos">
    <h2>COFFE SHOP YANG DI KUNJUNGI</h2>
    <h5>By: Syifa Nur Medina</h5>
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
import { ref, computed } from 'vue';
import { useTodosStore } from '../stores/todos';

const todosStore = useTodosStore();

const newTodo = ref('');
const hideCompleted = ref(false);

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todosStore.todos.filter((t) => !t.done)
    : todosStore.todos;
});

function addTodo() {
  todosStore.addTodo(newTodo.value);
  newTodo.value = '';
}

function removeTodo(todo) {
  todosStore.removeTodo(todo);
}

function toggleTodo(todo) {
  todosStore.toggleTodo(todo);
}
</script>

<style scoped>
.done {
  position: relative;
  color: black;
  text-decoration: line-through;
}

.done::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: black;
  transform: rotate(-5deg);
  top: 50%;
  margin-top: -1px;
  z-index: 1;
}

.done::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: black;
  transform: rotate(5deg);
  top: 50%;
  margin-top: -1px;
  z-index: 1;
}
</style>
