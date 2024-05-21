<template>
    <div id="posts">
      <h1>Postingan Pengguna</h1>
      <select v-model="selectedUser">
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
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  
  const props = defineProps(['users'])
  const selectedUser = ref(null)
  const isLoading = ref(false)
  const posts = ref([])
  
  const fetchPosts = async () => {
    if (!selectedUser.value) return;
    isLoading.value = true;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
      const data = await response.json();
      posts.value = data;
    } catch (error) {
      console.error('Error Fetch Post:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  watch(selectedUser, fetchPosts, { immediate: true });
  </script>
  
  <style scoped>
  .loading-message {
    font-style: italic;
  }
  </style>
  