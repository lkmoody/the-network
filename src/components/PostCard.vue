<template>
  <span>
    <div>
      <img :src="post.creatorProfile.picture" />
      <h4>{{ post.creatorProfile.name }}</h4>
      <p>{{ post.createdAt }}</p>
      <p>{{ post.likeIds.length }}</p>
      <p>{{ post.body }} </p>
      <img :src="post.imgUrl" />
    </div>
  </span>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { Post } from '../models/Post';
import { profileService } from '../services/ProfileService.js';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
  props: {
    post: { type: Post, required: true }
  },

  setup(props) {
    let profile = {};
    async function getProfileForPost(creatorId) {
      try {
        await profileService.getProfileForPost(creatorId)
      } catch (error) {
        logger.error('[GettingProfile]', error);
        Pop.error(error);
      }
    }

    onMounted(() => {
      profile = getProfileForPost(props.post.creatorId);
    });


    return {}
  }
}
</script>