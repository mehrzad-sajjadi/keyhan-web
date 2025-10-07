<template>
    <div class="min-h-screen flex items-center justify-center bg-[var(--color-neutral-50)]">
        <form
            @submit.prevent="register(userName,password)"
            class="flex flex-col bg-white text-[var(--color-neutral-800)] w-full max-w-[540px] p-10 border border-[var(--color-primary)] rounded-lg shadow-lg"
        >
            <h1 class="text-xl font-bold mb-6 text-[var(--color-accent)]">ورود به حساب کاربری کیهان وب</h1>
            <hr class="border-[var(--color-neutral-200)] mb-6">
            <label class="text-md font-medium mb-2">نام کاربری</label>
            <input 
                v-model="userName"
                type="text" 
                placeholder="نام کاربری خود را وارد کنید" 
                class="bg-white text-sm border border-[var(--color-neutral-300)] rounded-md p-3 mb-4 text-[var(--color-neutral-800)] placeholder-[var(--color-neutral-400)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            >
            <label class="text-md font-medium mb-2">رمز عبور</label>
            <div class="relative">
                <input 
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'" 
                    placeholder="رمز عبور خود را وارد کنید"
                    class="bg-white border border-[var(--color-neutral-300)] rounded-md p-3 w-full text-[var(--color-neutral-800)] placeholder-[var(--color-neutral-400)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                >
                <button
                    type="button"
                    class="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 text-[var(--color-neutral-400)] hover:text-[var(--color-primary)]"
                    @click="showPassword = !showPassword"
                >
                    <div class="w-5">
                        <EyeIcon v-if="showPassword" />
                        <EyeSlashIcon v-else />
                    </div>
                </button>
            </div>
            <button 
                type="submit" 
                :disabled="userName==='' || password===''"
                class="bg-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-primary-hover)] text-white font-semibold py-3 rounded-md transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                ورود به مدیریت تسک کیهان وب
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router'

onBeforeMount(() => {
    localStorage.clear();
})

const showPassword = ref(false);
const userName = ref('');
const password = ref('');
const router = useRouter();

function register(name, password) {
    localStorage.setItem("name", name);
    localStorage.setItem("password", password);
    router.push("/");
}
</script>