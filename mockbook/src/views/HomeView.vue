<template>
  <Header pfp-src="https://thispersondoesnotexist.com" :name="userProfile.name"></Header>
  <main>
    <div class="profile">
      <p>{{ userProfile.description }}</p>
      <p>{{ userProfile.mbox }}</p>
    </div>
    <Posts :posts="postsData" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Header from '@/components/home/Header.vue';
import Posts from '@/components/home/Posts.vue';

import { fetchUserProfile, fetchPosts, test } from '@/lib/solid';
import router from '@/router';
import { store } from '@/store';
import type { Session } from '@inrupt/solid-client-authn-browser';

const session = store.session;
const userProfile = ref({
  name: 'Default Name',
  mbox: '',
  img: '',
  description: ''
});
const postsData = ref<{name: string, image: string, text: string, video: string}[]>([]);

const podUrl = 'https://css12.onto-deside.ilabt.imec.be';

// const fetchedUserProfile = await test(session as Session, podUrl);
// console.log("fetchedUserProfile", fetchedUserProfile);

// userProfile.value = {
//   name: fetchedUserProfile.name ?? '',
//   mbox: fetchedUserProfile.mbox ?? '',
//   img: fetchedUserProfile.img ?? '',
//   description: fetchedUserProfile.description ?? ''
// };
// postsData.value = await fetchPosts(session, podUrl);

const postDataItems = [
  { name: userProfile.value.name, image: "", text: "Hi, team Inc!", video: "" },
  { name: userProfile.value.name, image: "https://via.placeholder.com/150", text: "New profile pic", video: "" }
]


postsData.value = postDataItems;
</script>

<style scoped>
main {
  padding: 4rem;
}

</style>
