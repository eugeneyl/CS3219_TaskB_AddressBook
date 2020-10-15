<template>
  <div>
    <b-navbar id="header" variant="faded" type="light">
      <b-navbar-brand href="/home" class="mb-0">Address Book</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/addContact">Add Contact</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
      <b-container id="app">
        <router-view/>
      </b-container>
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#header {
  background-color: #7D82B8;
}

</style>
