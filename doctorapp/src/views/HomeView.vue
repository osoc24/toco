<template>
  <div class="dashboard">
    <Header :pfp-src="userProfile.img" :name="userProfile.name" title="DOCTORAPP"></Header>
    <main>
      <Appointments :appointments="appointmentsData" class="appointments"/>
      <Sidebar :name="userProfile.name" :description="userProfile.description" :mbox="userProfile.mbox" :img="userProfile.img" :phone="userProfile.phone" class="personal-information"/>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Header from '@/components/home/Header.vue';
import Appointments from '@/components/home/Appointments.vue';
import Sidebar from '@/components/home/Sidebar.vue';
import { getPosts, getProfileInfo, getAppointments } from '@/lib/solid';
import type { Session } from '@inrupt/solid-client-authn-browser';

import router from "@/router";
import { store } from "@/store";

const session = store.session;
const userProfile = ref({
  name: 'Default Name',
  mbox: '',
  img: '',
  description: '',
  phone: ''
});
const appointmentsData = ref();

const podUrl = 'https://css12.onto-deside.ilabt.imec.be/osoc1';

onMounted(async () => {
  try {
    const fetchedUserProfile = await getProfileInfo(session as Session, podUrl);
    console.log("fetchedUserProfile", fetchedUserProfile);
    userProfile.value = fetchedUserProfile;

    const appointments = await getAppointments(session as Session, podUrl);
    console.log("fetchappointments", appointments);
    appointmentsData.value = appointments;

    const posts = await getPosts(session as Session, podUrl);
    console.log("fetchposts", posts);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;

}
main {
  display: flex;
  height: 100%;
  overflow: hidden; /* Prevent the main page from scrolling */
}

.appointments {
  width: 66.67%; /* 2/3 of the width */
  height: 100%; /* Ensure it takes the full height */
  overflow-y: auto; /* Make the appointments section scrollable */
  margin-bottom: 1rem;
}

.personal-information {
  width: 33.33%;
  height: 100%; 
  justify-content: start;
  align-items: start;
  background-color: #ffffff; 
}
</style>
