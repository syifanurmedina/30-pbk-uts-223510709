<template>
  <div id="posts" class="app">
    <h2>User Posts</h2>
    <select v-model="selectedUser" @change="fetchPosts" class="user-select">
      <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
    </select>
    <div v-if="isLoading">
      <span class="loading-message">Loading posts...</span>
    </div>
    <div v-else class="posts-container">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <h3 class="post-title">{{ post.title }}</h3>
        <p class="post-body">{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';

const selectedUser = ref(null);
const isLoading = ref(false);
const users = ref([]);
const posts = ref([]);

const fetchUser = async () => {
  try {
    isLoading.value = true;
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
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
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + selectedUser.value);
    const data = await response.json();
    posts.value = data;
  } catch (error) {
    console.error('Error Fetch Post:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUser();
});

watch(selectedUser, () => {
  posts.value = [];
  fetchPosts();
}, { immediate: true });
</script>
<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.user-select {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
}

.loading-message {
  display: block;
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.post-title {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.post-body {
  font-size: 16px;
  color: #666;
}
</style>
