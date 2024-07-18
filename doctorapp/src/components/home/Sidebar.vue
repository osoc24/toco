<template>
  <div class="personal-information">
    <img :src="img" alt="profile picture" />
    <h1>{{ name }}</h1>
    <p><strong>Description:</strong> {{ description.slice(0, 150) }} ...</p>
    <p><strong>Email:</strong> <a :href="'mailto:' + mbox">{{ mbox.replace('mailto:', '') }}</a></p>
    <p><strong>Phone Number:</strong> <a :href="'tel:' + phone">{{ phone.replace('tel:', '') }}</a></p>
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
  gap: 3rem;
  justify-content: start;
  align-items: start;
  padding: 4rem;
}

img {
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
}
</style>
