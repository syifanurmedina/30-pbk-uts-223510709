import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Start from "../views/start.vue";
import Todos from "../views/Todos.vue"
import Post from '../views/Post.vue'
import Album from '../views/Album.vue'
import AlbumDetail from "../views/AlbumDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "mainLayout",
      component: MainLayout,
      children: [
        {
          path: "/",
          component: Start,
        },
        {
          path: "/todos",
          component: Todos,
        },
        {
          path: "/posts",
          component: Post,
        },
        {
          path: "/albums",
          component: Album,
        },
        {
          path: "/albums/:photoId",
          component: AlbumDetail,
        },
      ],
    },
  ],
});
export default router;