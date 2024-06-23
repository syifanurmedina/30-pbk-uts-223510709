<template>
  <h2>This is My Albums</h2>
  <q-page class="q-pa-md">
    <q-spinner v-if="isLoading" size="lg" color="primary" />
    <div v-else class="photo-grid">
      <q-card
        v-for="photo in photos"
        :key="photo.id"
        class="photo-card cursor-pointer"
        flat
        bordered
        @click="selectPhoto(photo.id)"
      >
        <q-img
          :src="photo.thumbnailUrl"
          :alt="photo.title"
          class="photo-thumbnail"
        >
          <q-card-section>
            <div class="photo-title">{{ photo.title }}</div>
          </q-card-section>
        </q-img>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const photos = ref([]);
const isLoading = ref(false);

const fetchPhotos = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/photos?albumId=1"
    );
    const data = await response.json();
    photos.value = data.map((photo) => ({
      id: photo.id,
      thumbnailUrl: photo.thumbnailUrl,
      url: photo.url,
      title: photo.title,
    }));
  } catch (error) {
    console.error("Error fetching photos:", error);
  } finally {
    isLoading.value = false;
  }
};

const selectPhoto = (id) => {
  router.push(`/albums/${id}`);
};

onMounted(() => {
  fetchPhotos();
});
</script>

<style scoped>
.q-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

.photo-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  position: relative;
}

.photo-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.photo-thumbnail {
  height: 200px;
  width: 100%;
  object-fit: cover;
}

.photo-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
}
</style>
