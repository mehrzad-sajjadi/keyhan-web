<template>
    <Header />
    <div class="min-h-screen px-4 sm:px-6 lg:px-8 ">
        <form @submit.prevent="AddTask()" >
            <div class="w-5/6 mx-auto py-5 my-16 border border-gray-500 rounded-lg ">
                <div class="flex flex-col justify-between">
                    <!-- inputs -->
                    <div class="mb-5 px-6">
                        <h2 class="font-semibold text-xl text-gray-800 mb-6">
                            افزودن تسک جدید
                        </h2>
                        <div class="space-y-5">
                            <!-- title -->
                            <div>
                                <label class="block mb-2 text-lg font-medium text-gray-900">
                                    عنوان تسک
                                </label>
                                <input
                                    v-model="title"
                                    type="text"
                                    class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-[#00bc7d] focus:border-[#00bc7d]"
                                    required
                                    autofocus
                                />
                            </div>
                            <div class="flex flex-wrap gap-3">
                                <!-- sprint -->
                                <div class="flex-1">
                                    <label class="block mb-2 text-lg font-medium text-gray-900">
                                        نوع اسپرینت
                                    </label>
                                    <select
                                        v-model="sprintName"
                                        class="block w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-[#00bc7d] focus:border-[#00bc7d]"
                                    >
                                        <option value="" disabled>انتخاب اسپرینت</option>
                                        <option v-for="sprint in sprints" :key="sprint.id" :value="sprint.name">
                                            {{ sprint.name }}
                                        </option>
                                    </select>
                                </div>
                                <!-- sprints -->
                                <div class="flex-1">
                                    <label class="block mb-2 text-lg font-medium text-gray-900">
                                        تخصیص به کاربر
                                    </label>
                                    <select
                                        v-model="userId"
                                        class="block w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-[#00bc7d] focus:border-[#00bc7d]"
                                    >
                                        <option value="" disabled>انتخاب کاربر</option>
                                        <option v-for="member in teamMembers" :key="member.id" :value="member.name">
                                            {{ member.name }}
                                        </option>
                                    </select>
                                </div>
                                <!-- tags -->
                                <div class="flex-1">
                                    <label class="block mb-2 text-lg font-medium text-gray-900">
                                        تگ‌ها
                                    </label>
                                    <div class="flex gap-4">
                                        <input
                                            v-model="newTag"
                                            type="text"
                                            class="block w-full p-4 border  border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-[#00bc7d] focus:border-[#00bc7d]"
                                            placeholder="افزودن تگ"
                                        />
                                        <button
                                            type="button"
                                            class="bg-[#00bc7d] cursor-pointer text-white px-5 rounded-lg hover:bg-[#00a66c] transition duration-150"
                                            @click="addTag"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div class="flex flex-wrap gap-2 mt-3">
                                        <span
                                            v-for="(tag, index) in tags"
                                            :key="index"
                                            class="bg-[#00bc7d]/10 text-[#00bc7d] px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                        >
                                            {{ tag }}
                                            <button
                                                type="button"
                                                class="text-red-500 hover:text-red-700 cursor-pointer"
                                                @click="removeTag(index)"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <!-- points -->
                                <div class="flex-1">
                                    <label class="block mb-2 text-lg font-medium text-gray-900">
                                        امتیاز تسک 
                                    </label>
                                    <input
                                        v-model.number="points"
                                        type="number"
                                        min="0"
                                        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-[#00bc7d] focus:border-[#00bc7d]"
                                        placeholder="0"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- دکمه -->
                    <div class="flex flex-row justify-between mb-4 px-6">
                        <SubmitBtn>
                            افزودن تسک
                        </SubmitBtn>
                        <CancelBtn to="/" >
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
import { useRouter } from "vue-router";

import { ref, reactive, onBeforeMount } from "vue";

const router = useRouter();

const teamMembers = ref([]);
const sprints = ref([]);

const idValue = Math.floor(Math.random() * 1000);

const id = ref(idValue);
const title = ref("");
const userId = ref(); 
const sprintName = ref();
const isDone = ref(false);
const tags = reactive([]);
const newTag = ref("");
const points = ref(0);


// اضافه کردن تسک
async function AddTask() {
    try {
        await axios.post("http://localhost:3000/tasks",{
            id: id.value ,
            title : title.value,
            sprint_name: sprintName.value,
            user_name : userId.value,
            tags : tags,
            is_done:isDone.value,
            points: points.value
        })
        
    } catch (error) {
        throw new Error(error);
    }
    router.push("/");
}


//دریافت لیست افراد تیم
async function getUsers() {
    try {
        let response = await axios.get("http://localhost:3000/users");
        teamMembers.value = response.data;
    } catch (error) {
        throw Error(error)
    }
}

// دریافت لیست اسپرینت ها
async function getSprints() {
    try {
        let response = await axios.get("http://localhost:3000/sprints");
        sprints.value = response.data;
    } catch (error) {
        throw Error(error)
    }
}
onBeforeMount(()=>{
    getUsers(),
    getSprints()
})


// اضافه کردن تگ به تسک
function addTag() {
    if (newTag.value.trim() !== "") {
        tags.push(newTag.value.trim());
        newTag.value = "";
    }
}

function removeTag(index) {
    tags.splice(index, 1);
}
</script>