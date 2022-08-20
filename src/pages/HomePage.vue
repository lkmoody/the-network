<template>
  <div class="col-md-10" v-for="p in posts" :key="p.id">
    <PostCard :post="p" />
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState';
import { postService } from '../services/PostService.js';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import PostCard from '../components/PostCard.vue';

export default {
    setup() {
        async function getPosts() {
            try {
                await postService.getPosts();
            }
            catch (error) {
                logger.error("Getting Posts", error);
                Pop.error(error);
            }
        }
        onMounted(() => {
            getPosts();
        });
        return {
            posts: computed(() => AppState.posts)
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
