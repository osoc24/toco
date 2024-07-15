<template>
  <div class="signin-container">
    <div class="left-panel">
      <LoginForm @no-pod-selected="toggleSidePanel" />
      <SidePanel @pod-selected="setSelectedPod" :is-open="isPanelOpen" @close="isExtraPanelOpen = false" ref="sidePanel" />
    </div>
    <div class="right-panel">
      <Logo class="bg-img"/>
      <div class="overlay"></div> 
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import Logo from '@/components/Logo.vue';
import SidePanel from '@/components/SidePanel.vue';

export default {
  name: 'login',
  components: {
    LoginForm,
    Logo,
    SidePanel
  },
  data() {
    return {
      isPanelOpen: false,
      isExtraPanelOpen: false,
      selectedPod: null,
    };
  },
  methods: {
    setSelectedPod(pod) {
      this.selectedPod = pod;
      this.isPanelOpen = false; // Close the main panel
    },
    toggleSidePanel() {
      this.isPanelOpen = !this.isPanelOpen; // Toggle main panel
      this.isExtraPanelOpen = true; // Always open extra panel when toggling main panel
      if (this.isPanelOpen) {
        this.$refs.sidePanel.closePanel(); // Close the extra panel
      }
    }
  }
};
</script>



<style scoped>
/* Example styling */
.extra-panel {
  background-color: #f0f0f0;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  overflow-y: auto;
  padding: 20px;
  margin: 0;
}

.left-panel, .right-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 30%;
}

.left-panel {
  flex: 1;
  background-color: #D9E1F0;
}

.right-panel {
  flex: 2;
  background-color: #29487D;
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
/* Styling for the extra panel */
.extra-panel {
  background-color: #f0f0f0;
  width: 30%;
  position: fixed;
  top: 0;
  left: 0; /* Position on the left */
  bottom: 0;
  z-index: 999;
  overflow-y: auto;
  padding: 20px;
}

/* Other panel styles */
.signin-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-panel, .right-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 30%;
}

.left-panel {
  flex: 1;
  background-color: #D9E1F0;
}

.right-panel {
  flex: 2;
  background-color: #29487D;
}
</style>

<style scoped>
/* Styling for the extra panel */
.extra-panel {
  background-color: #f0f0f0;
  width: 30%; /* Adjust width as needed */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999; /* Ensure it's above other content */
  overflow-y: auto; /* Enable scrolling if needed */
  padding: 20px;
}
</style>


<style scoped>
.signin-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-panel, .right-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.left-panel {
  flex: 1; /* This makes the left panel take up 1/3 of the width */
  background-color: #D9E1F0;
}

.right-panel {
  flex: 2; /* This makes the right panel take up the remaining 2/3 of the width */
  background-color: #29487D;
  object-position: center;
  object-fit: cover;
}
</style>

<style scoped>
.signin-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-panel, .right-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.left-panel {
  flex: 1;
  background-color: #D9E1F0;
}

.right-panel {
  flex: 2;
  background-color: #29487D;
  position: relative; /* Ensure relative positioning for overlay */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
  z-index: 1; /* Ensure overlay is above the logo */
}
</style>



