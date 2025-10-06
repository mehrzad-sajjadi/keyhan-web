<template>
    <Header />
    <div class="min-h-screen px-4 sm:px-6 lg:px-8">
        <form @submit.prevent="AddSprint()" class="w-5/6 mx-auto my-16 border border-gray-500 rounded-lg">
            <div class="flex flex-col justify-between">
                    <div class="mb-5 px-6 py-4">
                        <h2 class=" font-semibold text-xl text-gray-800 mb-6">
                            افزودن اسپرینت جدید
                        </h2>
                        <div class="space-y-5">
                            <div>
                                <label class="block mb-2 text-lg font-medium text-gray-900">
                                    نام اسپرینت
                                </label>
                                <input
                                    v-model="form.name"
                                    type="text"
                                    autofocus
                                    class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-[#00bc7d] focus:border-[#00bc7d]"
                                />
                                <p v-if="isSubmitted && !form.name" class="error-box">
                                    نام اسپرینت الزامی است
                                </p>

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
                                    <p v-if="isSubmitted && !form.start_date" class="error-box">
                                        تاریخ شروع الزامی است
                                    </p>

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
                                    <p v-if="isSubmitted && !form.end_date" class="error-box">
                                        تاریخ پایان است
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row justify-start gap-5 mb-4 px-6">
                        <SubmitBtn
                            type="submit"
                        >
                            افزودن
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
import { useRouter } from "vue-router";

//Components
import Header from "@/components/Header.vue";
import SubmitBtn from '@/components/Buttons/SubmitBtn.vue'
import CancelBtn from '@/components/Buttons/CancelBtn.vue'

import { ref, reactive } from "vue";

const router = useRouter();

const form = reactive({
    id: Math.floor(Math.random() * 1000),
    name: "",
    start_date: "",
    end_date: ""
});

//دریافت تاریخ کنونی به فارسی
let date = Date.now();
let dateFormat = new Intl.DateTimeFormat("fa-IR-u-nu-latn").format(date);
const currentDate = ref(dateFormat);

const isSubmitted = ref(false);
// اضافه کردن اسپرینت
async function AddSprint() {
    isSubmitted.value= true;
    if(!form.name || !form.start_date || !form.end_date ){
        return ;
    }
    try {
        await axios.post("http://localhost:3000/sprints", {
            id: form.id,
            name: form.name,
            start_date: form.start_date,
            end_date: form.end_date
        });
        resetForm();
    } catch (error) {
        throw new Error(error);
    }
    router.push("/sprints");
}

// تابع برای ریست کردن فرم
function resetForm() {
    form.id = Math.floor(Math.random() * 1000);
    form.name = "";
    form.start_date = "";
    form.end_date = "";
}
</script>