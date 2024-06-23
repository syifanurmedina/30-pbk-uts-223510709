import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([]);

  function addTodo(text) {
    todos.value.push({
      id: Date.now(),
      text,
      done: false,
    });
  }

  function removeTodo(todo) {
    todos.value = todos.value.filter((t) => t.id !== todo.id);
  }

  function toggleTodo(todo) {
    const targetTodo = todos.value.find((t) => t.id === todo.id);
    if (targetTodo) {
      targetTodo.done = !targetTodo.done;
    }
  }

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
  };
});
