<template>
  <div class="dashboard">
    <Header pfp-src="https://thispersondoesnotexist.com" name="victor" title="DOCTORAPP"></Header>
    <main>
      <Appointments :appointments="appointmentsData" class="appointments"/>
      <Sidebar :name="personalData.name" :description="personalData.description" :mbox="personalData.mbox" :img="personalData.img" :phone="personalData.phone" class="personal-information"/>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/home/Header.vue';
import Appointments from '@/components/home/Appointments.vue';
import Sidebar from '@/components/home/Sidebar.vue';

import router from "@/router";
import { store } from "@/store";

const session = store.session;

const appointmentsData = [
  { sheduledTime: "10:00" },
  { sheduledTime: "11:00" },
  { sheduledTime: "12:00" },
  { sheduledTime: "13:00" },
  { sheduledTime: "14:00" },
  { sheduledTime: "15:00" },
  { sheduledTime: "16:00" },
  { sheduledTime: "17:00" },
  { sheduledTime: "18:00" },
  { sheduledTime: "19:00" },
  { sheduledTime: "20:00" },
  { sheduledTime: "21:00" },
  { sheduledTime: "22:00" },
  { sheduledTime: "23:00" },
  { sheduledTime: "24:00" },
];

const personalData = {
  name: "Victor",
  description: "Doctor",
  mbox: "victor.barra@live.be",
  img: "https://thispersondoesnotexist.com",
  phone: "0487 12 34 56",
};
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
  width: 33.33%; /* 1/3 of the width */
  height: 100%; /* Ensure it takes the full height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff; /* Optional: Add a background color for clarity */
}
</style>
