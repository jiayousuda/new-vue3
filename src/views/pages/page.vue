<template>
  page
  <div>
    <div id="nav">
      <router-link to="/home">home</router-link> |
      <router-link to="/about">about</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    
  },
};
</script>

<style></style>
