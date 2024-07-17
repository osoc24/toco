<template>
    <div class="appointments">
      <h1>Appointments</h1>
      <Appointment v-for="appointment in appointments" :key="appointment.sheduledTime" :sheduledTime="appointment.sheduledTime" >
      </Appointment>
    </div>
  </template>
  
  <script setup lang="ts">
 import Appointment from "./Appointment.vue";
  const props = defineProps<{
    appointments: { sheduledTime: string }[]
  }>();
  </script>
  
  <style scoped>
  .appointments {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 4rem;
    /* overflow-y: scroll; */
  }
  </style>
  