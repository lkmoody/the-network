<template>
  <div class="about text-center">
    <AccountForm />
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import AccountForm from '../components/AccountForm.vue';
export default {
    name: "Account",
    setup() {
        return {
            name: "Account",
            account: computed(() => AppState.account)
        };
    },
    components: { AccountForm }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
