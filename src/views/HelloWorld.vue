<!-- src/components/ToDoList.vue -->
<template>
  <div>
    <h2>To-Do List</h2>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Tambah tugas...">
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo }}
        <button @click="deleteTodo(index)">Hapus</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: []
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push(this.newTodo);
        this.newTodo = '';
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>

<style scoped>
/* Styling komponen ToDoList */
</style>
