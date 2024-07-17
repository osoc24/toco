<template>
    <div class="appointment">
      <div class="appointment-header">
        <span class="appointment-author">Appointment 1</span>
      </div>
      <div class="appointment-content">
        <p>Time: {{ sheduledTime }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    sheduledTime: string
  }>();
  </script>
  
  <style scoped>
  .appointment {
    background-color: #E7F9E8;
    border-radius: 0.5rem;
    padding: 3rem;
    margin-bottom: 1rem;
    width: 100%;
  }
  
  .appointment-header {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .appointment-content, .appointment-content p {
    margin-bottom: 0.5rem;
  }
  </style>
  