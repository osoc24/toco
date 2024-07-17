<template>
    <header>
        <h1>{{ title }}</h1>
        <div class="profile">
            <p>{{ name }}</p>
            <ProfilePicture :src="pfpSrc" @click="showContextMenu"/>
        </div>
    </header>
    <aside :class="{visible: isContextMenuOpen}" class="context-menu">
        <div class="pod-info">
            <strong>Current Pod</strong>
            <p>https://css12.onto-deside.ilabt.imec.be/osoc1/</p>
        </div>
        <div class="pod-selection">
            <label for="pod">Selected Pod</label>
            <select id="pod">
                <option selected>https://css12.onto-deside.ilabt.imec.be/osoc1/</option>
                <option>https://css12.onto-deside.ilabt.imec.be/osoc1/</option>
            </select>
        </div>
        <button @click="logout" class="logout-button">Sign out</button>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProfilePicture from './ProfilePicture.vue';
import { store } from '@/store';
import router from '@/router';

const props = defineProps<{
    pfpSrc: string,
    name: string,
    title: string
}>()

const isContextMenuOpen = ref(false)

async function logout() {
    store.session.logout();
    router.push('/'); 
}
function showContextMenu() {
    isContextMenuOpen.value = !isContextMenuOpen.value
}
</script>

<style scoped>
    header {
        width: 100%;	
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        background-color: #008307;
        color: #ffffff;
        padding: 15px 30px;
    }

    header h1 {
        font-family: "raleway", sans-serif;
        font-size: 1.5rem;
    }

    .profile {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    nav {
        flex-grow: 1;
        align-items: end;
    }

    aside {
        background-color: #008307 ;
        display: none;
        position: absolute;
        top: 5rem;
        right: 0;
        color: #ffffff;
        padding: 15px 30px;
        border: 1px solid #ffffff;
    }
    
    .visible {
        display: block;
    }
</style>

<style>
.context-menu {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    padding: 20px;
    max-width: 300px;
}

.pod-info {
    margin-bottom: 20px;
}

.pod-info strong {
    display: block;
    font-size: 1.2em;
    margin-bottom: 5px;
}

.pod-info p {
    font-size: 0.9em;
    color: #ffffff;
}

.pod-selection {
    margin-bottom: 20px;
}

.pod-selection label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.pod-selection select {
    width: 100%;
    padding: 5px;
    font-size: 1em;
    border: 1px solid #ced4da;
    border-radius: 5px;
}

.logout-button {
    display: inline-block;
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
}

.logout-button:hover {
    background-color: #c82333;
}

</style>