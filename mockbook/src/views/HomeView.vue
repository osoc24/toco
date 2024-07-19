<template>
  <Header pfp-src="https://thispersondoesnotexist.com" :name="userProfile.name"></Header>
  <main>
    <div class="profile">
      <!-- <p>{{ userProfile.description }}</p> -->
      <!-- <p>{{ userProfile.mbox }}</p> -->
    </div>
    <Posts :posts="postsData" :name="userProfile.name"/>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Header from '@/components/home/Header.vue';
import Posts from '@/components/home/Posts.vue';

// import { getPosts, getProfileInfo, getAppointments } from '@/lib/solid';
import {getPosts, getProfileInfo} from 'loama-controller';
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
const postsData = ref();

const podUrl = 'https://css12.onto-deside.ilabt.imec.be/osoc1';

onMounted(async () => {
  try {
    const fetchedUserProfile = await getProfileInfo(session as Session, podUrl);
    console.log("fetchedUserProfile", fetchedUserProfile);
    userProfile.value = fetchedUserProfile;

    const posts = await getPosts(session as Session, podUrl);
    console.log("fetchPosts", posts);
    postsData.value = posts;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style scoped>
main {
  padding: 4rem;
}

</style>
