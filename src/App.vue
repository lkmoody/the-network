<template>
  <header>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-9">
        <Navbar />
      </div>
    </div>
  </header>
  <main>
    <div class="row">
      <div class="col-3">
        <Login />
      </div>
      <div class="col-7">
        <router-view />
      </div>
      <div class="col-2">Ads</div>
    </div>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';

export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
