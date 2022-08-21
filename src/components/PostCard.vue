<template>
  <span>
    <div>
      <router-link :to="{ name: 'Profile', params: { profileId: post.creatorProfile.id } }">
        <img :src="post.creatorProfile.picture" />
      </router-link>
      <h4>{{ post.creatorProfile.name }}</h4>
      <p>{{ post.createdAt }}</p>
      <p></p>
      <p>{{ post.body }} </p>
      <img :src="post.imgUrl" />
      <button v-if="account.id === post.creatorId" @click="deletePost(post.id)">Delete</button>
      <button v-if="user.isAuthenticated" @click="likePost(post.id)">Like</button>
      <h4>{{ post.likeIds.length }}</h4>


    </div>
  </span>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState';
import { Post } from '../models/Post';
import { postService } from '../services/PostService';
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

    async function deletePost(postId) {
      try {
        await postService.deletePost(postId)
      } catch (error) {
        logger.error('[Deleting Post]', error);
        Pop.error(error);
      }
    }

    async function likePost(postId) {
      try {
        await postService.likePost(postId);
      } catch (error) {
        logger.error('Liking Post', error);
        Pop.error(error);
      }
    }

    onMounted(() => {
      profile = getProfileForPost(props.post.creatorId);
    });

    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      deletePost,
      likePost
    }
  }
}
</script>