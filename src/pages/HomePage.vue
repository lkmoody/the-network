<template>
  <div class="col-md-10">
    <PostCard v-for="p in posts" :post="p" />
    <button @click="handlePrev()">Prev</button>
    {{ postPage }}
    <button @click="handleNext()">Next</button>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { postService } from '../services/PostService.js';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import PostCard from '../components/PostCard.vue';

export default {
  setup() {
    const postPage = ref(1);

    async function getPosts(page) {
      try {
        await postService.getPosts(page);
        window.scrollTo({top: 0, behavior: "smooth"});
      }
      catch (error) {
        logger.error("Getting Posts", error);
        Pop.error(error);
      }
    }

    async function handlePrev() {
      if (postPage.value > 1) {
        postPage.value--;
        getPosts(postPage.value);
      }
    }

    async function handleNext() {
      postPage.value++;
      console.log(postPage.value)
      getPosts(postPage.value);
    }

    onMounted(() => {
      getPosts(postPage.value);
    });

    return {
      name: "Home",
      posts: computed(() => AppState.posts),
      postPage,
      handlePrev,
      handleNext
    };
  },
  components: { PostCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
