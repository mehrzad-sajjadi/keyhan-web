<template>
    <div
        class='relative my-4 w-full md:w-3/4 mx-auto rounded-xl border bg-white transition-all duration-200 overflow-hidden'
    >
        <div class="p-5 flex justify-between">
            <div class="flex items-start justify-between gap-4">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                        <h3 class="text-lg md:text-xl font-bold text-gray-900 truncate">
                            {{ item.title }}
                        </h3>
                        <p
                            class="px-2 py-0.5 rounded-full border text-[1000px] md:text-xs font-semibold bg-blue-50 border-blue-200 text-blue-700"
                        >
                            {{ item.sprint_name }}
                        </p>
                    </div>

                    <!-- کاربر و تگ‌ها -->
                    <div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        <span class="text-lg inline-flex items-center gap-2 text-gray-600">
                            <UserIcon class="size-5" />
                            <span class="font-medium text-gray-700">{{ item.user_name }}</span>
                        </span>

                        <!-- امتیاز -->
                        <span class="text-gray-600 text-lg">
                            امتیاز: <span class="font-medium text-gray-700">{{ item.points }}</span>
                        </span>

                        <!-- تگ‌ها -->
                        <div v-if="item.tags && item.tags.length" class="flex items-center gap-1 flex-wrap">
                            <span class="text-gray-400">تگ‌ها:</span>
                            <span
                                v-for="(tag, index) in item.tags"
                                :key="index"
                                class="px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 text-[11px]"
                            >
                                #{{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- دکمه‌ها -->
            <div class="mt-3 flex items-center justify-end gap-2">
                <DoneBtn
                    v-if="item.is_done"
                    @click="toggleDone"
                >
                    انجام‌شده
                    <CheckBadgeIcon class="w-5 h-5 text-white" />
                </DoneBtn>

                <NotDoneBtn
                    v-else
                    @click="toggleDone"
                >
                    انجام‌نشده
                    <HandThumbDownIcon class="w-5 h-5" />
                </NotDoneBtn>

                <EditBtn :to="`/edit_task/${item.id}`">
                    ویرایش
                    <PencilSquareIcon class="w-5 h-5" />
                </EditBtn>

                <DeleteBtn @click="deleteTask">
                    حذف
                    <TrashIcon class="w-5 h-5" />
                </DeleteBtn>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CheckBadgeIcon, HandThumbDownIcon, TrashIcon, PencilSquareIcon, UserIcon } from '@heroicons/vue/24/solid'
import { useRouter, RouterLink } from 'vue-router'
import axios from 'axios'
//components
import DeleteBtn from '@/components/Buttons/DeleteBtn.vue'
import EditBtn from '@/components/Buttons/EditBtn.vue'
import NotDoneBtn from '@/components/Buttons/NotDoneBtn.vue'
import DoneBtn from './Buttons/DoneBtn.vue'


const props = defineProps({
    item: { type: Object, required: true }
})

const emit = defineEmits(['task-deleted'])

const router = useRouter()

// تابع تغییر وضعیت انجام‌شده/انجام‌نشده
const toggleDone = async () => {
    try {
        props.item.is_done = !props.item.is_done
        await axios.put(`http://localhost:3000/tasks/${props.item.id}`, props.item)
    } catch (error) {
        console.error('خطا در به‌روزرسانی وضعیت تسک:', error)
        throw new Error(error)
    }
}

// تابع حذف
const deleteTask = async () => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این تسک را حذف کنید؟')) {
        try {
            await axios.delete(`http://localhost:3000/tasks/${props.item.id}`)
            emit('task-deleted', props.item.id)
        } catch (error) {
            console.error('خطا در حذف تسک:', error)
            throw new Error(error)
        }
    }
}
</script>