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
                                    v-model="name"
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
                                        v-model="start_date"
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
                                        v-model="end_date"
                                        :min="currentDate"
                                        required
                                        color="#00a66c"
                                        class="block w-full p-4 border border-gray-300 rounded-lg bg-gray-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row justify-between mb-4 px-6">
                        <button
                            type="submit"
                            class="h-9 px-4 text-lg cursor-pointer duration-150 rounded focus:shadow-outline bg-[#00bc7d] hover:bg-[#00a66c] text-white border border-[#00bc7d] hover:border-transparent"
                        >
                            افزودن
                        </button>
                        <button
                            @click="router.push('/sprints')"
                            type="button"
                            class="h-9 px-4 text-lg cursor-pointer duration-150 rounded focus:shadow-outline bg-white text-red-500 border border-red-500 hover:bg-red-600 hover:text-white hover:border-transparent"
                        >
                            انصراف
                        </button>
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

import { ref } from "vue";

let idValue = Math.floor(Math.random() * 1000);

const id = ref(idValue);
const name = ref("");
const start_date = ref("");
const end_date = ref("");


const router = useRouter();

//دریافت تاریخ کنونی به فارسی
let date = Date.now();
let dateFormat = new Intl.DateTimeFormat("fa-IR-u-nu-latn").format(date);
const currentDate = ref(dateFormat);

function AddSprint() {
    axios.post("http://localhost:3000/sprints",{
        id:id.value,
        name : name.value,
        start_date: start_date.value,
        end_date: end_date.value
    }).catch((error)=>{
        throw new Error(error)
    })
}

</script>