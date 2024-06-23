<template>
  <q-layout view="lHr lpR lfr">
    <q-header class="text-white header-gradient" height-hint="98">
      <q-toolbar>
        <q-toolbar-title> Syifa Nur Medina | 4B </q-toolbar-title>
        <q-tabs align="left">
          <q-route-tab to="/" label="Start" />
          <q-route-tab to="/todos" label="TodoList" />
          <q-route-tab to="/posts" label="Post" />
          <q-route-tab to="/albums" label="Albums" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-white footer-gradient" height-hint="100">
      <q-toolbar>
        <q-toolbar-title>
          UAS Pemrograman Berbasis Komponen | Teknik Informatika 2023-2024
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style>
.header-gradient {
  background: linear-gradient(45deg, #fbd098, #8b133b); 
  font-family: 'Times New Roman', Times, serif;
}

.footer-gradient {
  background: linear-gradient(45deg, #fbd098, #8b133b); 
  font-family: 'Times New Roman', Times, serif;
}

.q-page-container, .q-toolbar-title, .q-tab {
  font-family: 'Times New Roman', Times, serif;
}

.q-toolbar {
  padding: 0 75px !important;
}

.q-toolbar__title:first-child {
  padding-left: 0 80px !important;
}

.q-tab {
  padding: 0 75px !important;
  min-height: 0 75px !important;
}
</style>

<script setup>
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const yOffset = -50;
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
</script>
