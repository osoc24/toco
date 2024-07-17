<template>
    <div class="personal-information">
        <h1>{{ name }}</h1>
        <p>Description: {{ description }}</p>
        <p>Email: {{ mbox }}</p>
        <img :src="img" alt="profile picture" />
         <p>Phone Number: {{ phone }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
    import { defineProps } from 'vue';

    const props = defineProps<{
      name: string;
      description: string;
      mbox: string;
      img: string;
      phone: string;
    }>();

  </script>
  
    
  <style scoped>
  .personal-information {
    display: flex;
    flex-direction: column;
    gap: 1rem;

  }
  img {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }
  </style>
  
    