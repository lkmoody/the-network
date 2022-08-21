<template>
  <div>
    <img :src="profile.coverImg" />
    <img :src="profile.picture" />
    <h6>{{ profile.class}}</h6>
    <h6>Graduated: {{ (profile.graduated) ? "Yed" : "No"}}</h6>
    <h3>{{ profile.name }}</h3>
    <p>{{ profile.bio }}</p>
    <a :href="profile.github">GitHub </a>
    <a :href="profile.linkedin">LinkedIn </a>
    <a :href="profile.resume">Resume </a>
    <PostCard v-for="p in posts" :post="p" />
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from "../AppState.js";
import { profileService } from '../services/ProfileService.js';
import PostCard from '../components/PostCard.vue';

export default {
    name: "Profile",
    setup() {
        const route = useRoute();
        async function getActiveProfile() {
            try {
                await profileService.getActiveProfile(route.params.profileId);
            }
            catch (error) {
                logger.error("Getting Profile", error);
                Pop.error(error);
            }
        }
        async function getPostsForProfile() {
            try {
                await profileService.getPostsForProfile(route.params.profileId);
            }
            catch (error) {
                logger.error("Getting Profile Posts", error);
                Pop.error(error);
            }
        }
        onMounted(() => {
            getActiveProfile();
            getPostsForProfile();
        });
        return {
            profile: computed(() => AppState.activeProfile),
            posts: computed(() => AppState.posts)
        };
    },
    components: { PostCard }
}
</script>

<style scoped>

</style>
