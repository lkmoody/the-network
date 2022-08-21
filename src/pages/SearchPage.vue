<template>
  <div class="about">
    <PostCard v-for="p in posts" :post="p" />
  </div>
</template>

<script>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { postService } from '../services/PostService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';

export default {
  name: 'Search',
  setup() {
    const route = useRoute();

    async function getPostBySearch() {
        try {
            AppState.posts = [];
            await postService.getPostBySearch(route.params.searchText);
        } catch(error) {
            logger.error('Get Posts Search', error);
            Pop.error(error);
        }
    }

    onMounted(() => {
      getPostBySearch();
    });

    watch(route, (newRoute, oldRoute) => {
        getPostBySearch();
    });

    return {
        posts: computed(() => AppState.posts),
        getPostBySearch
    }
  }
}
</script>
