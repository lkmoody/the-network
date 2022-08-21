<template>
    <form @submit.prevent="handleSubmit">
        <textarea v-model="editable.body"></textarea>
        <input type="text" placeholder="Image or Video Url" v-model="editable.imgUrl" />
        <button class="btn btn-primary">{{ editable.id ? 'Save' : 'Create' }}</button>
    </form>
</template>


<script>
import { ref } from 'vue';
import { postService } from '../services/PostService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    setup() {

        const editable = ref({})

        return {
            editable,
            async handleSubmit() {
                try {
                    if (editable.value.id) {

                    } else {
                        await postService.createPost(editable.value);
                    }
                    editable.value = {}
                } catch (error) {
                    logger.error('[Create Post]', error);
                    Pop.error(error);
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>
