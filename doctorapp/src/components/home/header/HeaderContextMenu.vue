<template>
    <aside>
        <span>{{ store.usedPod }}</span>
        <div>
            <label for="pod">Selected Pod</label>
        <select>
            <option v-for="pod in pods" :key="pod">{{ pod }}</option>
        </select>
        </div>
        <a @click.prevent="logout">
            <PhSignOut/>
            <span>Sign out</span>
        </a>
    </aside>
</template>

<script setup lang="ts">
import router from '@/router';
import { store } from '@/store';
import type { Session } from '@inrupt/solid-client-authn-browser';
import { PhSignOut } from '@phosphor-icons/vue';
import { listPods } from 'loama-controller';
const pods = await listPods(store.session as Session);

async function logout() {
    store.session.logout();
    router.push('/'); 
}
</script>

<style lang="css" scoped>
aside {
    border-radius: 0.5rem;
    display: flex;
    flex-flow: column nowrap;
    border: 0.25rem solid #008307;
    background-color: var(--off-white);
}
aside > div {
    padding: var(--base-unit);
}
label {
    color: var(--off-black);
    font-weight: 700;
    display: block;
}
select {
    margin-bottom: var(--base-unit);
    cursor: pointer;
}
aside > span {
    background-color: #008307;
    color: var(--off-white);
    font-family: Raleway;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding: var(--base-unit);
    margin-bottom: var(--base-unit);
}

a {
    display: flex;
    flex-flow: row nowrap;
    background-color: var(--lama-gray);
    padding: var(--base-unit);
    gap: var(--base-unit);
    align-items: center;
    font-style: normal;
    font-weight: 700;
    cursor: pointer;
}
</style>