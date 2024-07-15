<template>
  <div class="form-container">
    <h1>MockBook</h1>
    <form @submit.prevent="login">
      <div class="input-group">
        <label for="solid-pod-url">Solid Pod URL:</label>
        <input type="url" id="solid-pod-url" v-model="solidPodUrl" required>
        <p v-if="showWarning" class="warning">Invalid Solid Pod URL. Please check and try again.</p>
      </div>
      <div class="btn-group">
        <button @click.prevent="setDefaultIdp" :disabled="isLoading">No Pod?</button>
        <button type="submit" :disabled="isLoading">
          <span v-if="isLoading">Loading...</span>
          <span v-else>Login</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { store } from '@/store';

export default {
  setup(props, { emit }) {
    const solidPodUrl = ref('');
    const idp = ref("https://css12.onto-deside.ilabt.imec.be/");
    const showWarning = ref(false);
    const isLoading = ref(false);

    const login = async () => {
      isLoading.value = true;
      try {
        const issuer = solidPodUrl.value.trim() !== '' ? solidPodUrl.value.trim() : idp.value;

        // Attempt login
        await store.session.login({
          oidcIssuer: issuer,
          redirectUrl: new URL('/home', window.location.href).toString(),
          clientName: 'MOCKBOOK'
        });

        // Reset warning on successful login
        showWarning.value = false;
      } catch (error) {
        // Show warning on failed login
        showWarning.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    const setDefaultIdp = () => {
      idp.value = "https://css12.onto-deside.ilabt.imec.be/";
      emit('no-pod-selected');
    };

    return {
      solidPodUrl,
      login,
      setDefaultIdp,
      showWarning,
      isLoading
    };
  }
};
</script>

<style scoped>
.warning {
  color: red;
}

.loading {
  color: blue;
}

.form-container {
  text-align: center;
  width: 70%;
}

.form-container h1 {
  font-size: 2rem;
  margin-bottom: 50px;
}

.input-group {
  margin: 15px 0;
  text-align: left;
}

input[type="url"] {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
}

button {
  display: block;
  padding: 10px;
}

.btn-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

button {
  width: 45%;
  background-color: #1D172F;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button[disabled] {
  background-color: grey;
  cursor: not-allowed;
}

button:hover:not([disabled]) {
  background-color: #29487D;
}
</style>
