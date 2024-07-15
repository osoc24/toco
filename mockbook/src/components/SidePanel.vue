<template>
    <div class="extra-panel" v-if="isOpen">
      <div>
        <h2>No Pod yet?</h2>
        <p>No worries, you can create a pod with a pod provider or even host one yourself! We’ll give you some recommendations of hosts you can use:</p>
        <!-- <button v-for="pod in podList" :key="pod.name" @click="selectPod(pod)">{{ pod.name }}</button> -->
        <button v-for="pod in podList" :key="pod.name" @click="openPodUrl(pod)">{{ pod.name }}</button>

    </div>
      <button id="close-btn" @click="selectPod(null)">Close Panel</button>
    </div>
  </template>
  
  <script>
  import PodList from '@/utils/podlist.json'
  
  export default {
    props: {
      isOpen: Boolean
    },
    data() {
      return {
        podList: PodList.podList
      };
    },
    methods: {
        openPodUrl(pod) {
        if (pod && pod.url) {
            window.open(pod.url, '_blank');
        }
        this.$emit('pod-selected', null);
        this.closePanel();
        },

        selectPod(pod) {
        // Handle pod selection logic here if needed
        console.log('Selected Pod:', pod);
        this.$emit('pod-selected', pod); // Emit selected pod to parent component
        this.closePanel(); // Close the panel after selection
        }
    }
  };
  </script>
  
  
  <style scoped>

  .extra-panel{
    width: 100%	;
  }

  .extra-panel h2{
    font-size: 30px;
    margin-bottom: 20px;
  }

  .extra-panel p{
    margin-bottom: 30px;
  }

  .extra-panel > div {
    margin-bottom: 20px;
  }
  
  .extra-panel button {
    display: block;
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    background-color: #1D172F;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .extra-panel button:hover {
    background-color: #29487D;
  }
  
  .extra-panel{
    margin-top: 10px;
  }
  
  #close-btn {
    background-color: #FF4C4C;
    color: white;
  }
  </style>
  