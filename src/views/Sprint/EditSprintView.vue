<template>
    <Header />
    <div class="min-h-screen px-4 sm:px-6 lg:px-8">
        <form @submit.prevent="editSprint()" class="w-5/6 mx-auto my-16 border border-gray-500 rounded-lg">
            <div class="flex flex-col justify-between">
                    <div class="mb-5 px-6 py-4">
                        <h2 class="font-semibold text-xl text-gray-800 mb-6">
                            ویرایش اسپرینت
                        </h2>
                        <div class="space-y-5">
                            <div>
                                <label class="block mb-2 text-lg font-medium text-gray-900">
                                    نام اسپرینت
                                </label>
                                <input
                                    v-model="form.name"
                                    type="text"
                                    required
                                    autofocus
                                    class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-[#00bc7d] focus:border-[#00bc7d]"
                                />
                            </div>
                            <div class="flex flex-wrap gap-4">
                                <div class="flex-1">
                                    <label class="block mb-2 text-lg font-medium text-gray-900">
                                        تاریخ شروع
                                    </label>
                                    <DatePicker
                                        v-model="form.start_date"
                                        :min="currentDate"
                                        required
                                        color="#00a66c"
                                        class="block w-full p-4 border border-gray-300 rounded-lg bg-gray-50"
                                    />
                                </div>
                                <div class="flex-1">
                                    <label class="block mb-2 text-lg font-medium text-gray-900">
                                        تاریخ اتمام
                                    </label>
                                    <DatePicker
                                        v-model="form.end_date"
                                        :min="currentDate"
                                        required
                                        color="#00a66c"
                                        class="block w-full p-4 border border-gray-300 rounded-lg bg-gray-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row justify-start gap-5 mb-4 px-6">
                        <SubmitBtn
                            type="submit"
                        >
                            ویرایش
                        </SubmitBtn>
                        <CancelBtn to="/sprints">
                            انصراف
                        </CancelBtn>
                    </div>
            </div>
        </form>
    </div>
</template>

<script setup>
//package
import axios from "axios";
import DatePicker from "vue3-persian-datetime-picker";
import { useRouter, useRoute } from "vue-router";

//Components
import Header from "@/components/Header.vue";
import SubmitBtn from '@/components/Buttons/SubmitBtn.vue'
import CancelBtn from '@/components/Buttons/CancelBtn.vue'

import { ref, reactive, onBeforeMount } from "vue";

const router = useRouter();
const route = useRoute();

const form = reactive({
    id: route.params.id,
    name: "",
    start_date: "",
    end_date: ""
});

//دریافت تاریخ کنونی به فارسی
let date = Date.now();
let dateFormat = new Intl.DateTimeFormat("fa-IR-u-nu-latn").format(date);
const currentDate = ref(dateFormat);

// ویرایش اسپرینت
async function editSprint() {
    try {
        await axios.put(`http://localhost:3000/sprints/${form.id}`, {
            id: form.id,
            name: form.name,
            start_date: form.start_date,
            end_date: form.end_date
        });
        new Flash('اسپرینت با موفقیت ویرایش شد', 'success');
        router.push("/sprints");
    } catch (error) {
        throw new Error(error);
    }
    
}

// دریافت اطلاعات اسپرینت
async function getSprint() {
    try {
        let response = await axios.get(`http://localhost:3000/sprints/${form.id}`);
        const sprint = response.data;
        form.name = sprint.name;
        form.start_date = sprint.start_date;
        form.end_date = sprint.end_date;
    } catch (error) {
        console.error("خطا در دریافت اسپرینت:", error);
    }
}

onBeforeMount(() => {
    getSprint();
});
</script>