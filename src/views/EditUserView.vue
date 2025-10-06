<template>
    <Header />
    <div class="min-h-screen px-4 sm:px-6 lg:px-8 ">
        <form @submit.prevent="editUser()" >
            <div class="w-5/6 mx-auto py-5 my-16 border border-gray-500 rounded-lg ">
                <div class="flex flex-col justify-between">
                    <!-- inputs -->
                    <div class="mb-5 px-6">
                        <h2 class="font-semibold text-xl text-gray-800 mb-6">
                            ویرایش کاربر
                        </h2>
                        <div class="space-y-5">
                            <!-- row 1: name and age -->
                            <div class="flex flex-wrap gap-3">
                                <div class="flex-1">
                                    <label class="block mb-2 text-lg font-medium text-gray-900">
                                        نام کاربر
                                    </label>
                                    <input
                                        v-model="form.name"
                                        type="text"
                                        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-[#00bc7d] focus:border-[#00bc7d]"
                                        autofocus
                                    />
                                    <p v-if="isSubmitted && !form.name" class="error-box">
                                        نام کاربر الزامی است
                                    </p>
                                </div>
                                <div class="flex-1">
                                    <label class="block mb-2 text-lg font-medium text-gray-900">
                                        سن
                                    </label>
                                    <input
                                        v-model.number="form.age"
                                        type="number"
                                        min="0"
                                        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-[#00bc7d] focus:border-[#00bc7d]"
                                        placeholder="0"
                                    />
                                    <p v-if="isSubmitted && !form.age" class="error-box">
                                        سن الزامی است
                                    </p>
                                </div>
                            </div>
                            <!-- row 2: country and job -->
                            <div class="flex flex-wrap gap-3">
                                <div class="flex-1">
                                    <label class="block mb-2 text-lg font-medium text-gray-900">
                                        کشور
                                    </label>
                                    <input
                                        v-model="form.country"
                                        type="text"
                                        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-[#00bc7d] focus:border-[#00bc7d]"
                                        placeholder="نام کشور"
                                    />
                                    <p v-if="isSubmitted && !form.country" class="error-box">
                                        کشور الزامی است
                                    </p>
                                </div>
                                <div class="flex-1">
                                    <label class="block mb-2 text-lg font-medium text-gray-900">
                                        شغل
                                    </label>
                                    <input
                                        v-model="form.job"
                                        type="text"
                                        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-[#00bc7d] focus:border-[#00bc7d]"
                                        placeholder="نام شغل"
                                    />
                                    <p v-if="isSubmitted && !form.job" class="error-box">
                                        شغل الزامی است
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- دکمه -->
                    <div class="flex flex-row justify-start gap-5 mb-4 px-6">
                        <SubmitBtn>
                            ویرایش کاربر
                        </SubmitBtn>
                        <CancelBtn to="/users" >
                            انصراف
                        </CancelBtn>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
//components
import Header from "@/components/Header.vue";
import SubmitBtn from '@/components/Buttons/SubmitBtn.vue';
import CancelBtn from '@/components/Buttons/CancelBtn.vue';

//packages
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

import { ref, reactive, onBeforeMount } from "vue";

const router = useRouter();
const route = useRoute();

const isSubmitted = ref(false);

const form = reactive({
    id: "",
    name: "",
    age: "",
    country: "",
    job: ""
});


onBeforeMount(() => {
    form.id = route.params.id;
    getUser();
});

// دریافت اطلاعات کاربر
async function getUser() {
    try {
        const response = await axios.get(`http://localhost:3000/users/${form.id}`);
        const user = response.data;
        form.name = user.name;
        form.age = user.age;
        form.country = user.country;
        form.job = user.job; 
    } catch (error) {
        console.error('Error fetching user:', error);

    }
}

// ویرایش کاربر
async function editUser() { // نام تابع را به editUser تغییر دادم برای consistency
    isSubmitted.value = true;
    if (!form.name || !form.age || !form.country || !form.job) {
        return;
    }
    try {
        await axios.put(`http://localhost:3000/users/${form.id}`, {
            id: form.id,
            name: form.name,
            age: form.age,
            country: form.country,
            job: form.job
        });
        new Flash('کاربر با موفقیت ویرایش شد', 'success'); 
        router.push("/users");
    } catch (error) {
        throw new Error(error);
    }
}

</script>