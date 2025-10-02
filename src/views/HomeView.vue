<template>
    <Header />
    <TodoItem v-for="(task,index) in tasksItem" :item="task" :key="index" @task-deleted="handleDelete" />
</template>
<script setup>
//components
import Header from "@/components/Header.vue";
import TodoItem from "@/components/TodoItem.vue";
//package
import axios from "axios";
import { ref, onBeforeMount } from "vue";

const tasksItem = ref([]);

async function getTasks(){
    try {
        let response = await axios.get("http://localhost:3000/tasks");
        tasksItem.value = response.data;
    } catch (error) {
        console.error("خطا در دریافت تسک‌ها:", error);
    }
}

const handleDelete = (deletedId) => {
    tasksItem.value = tasksItem.value.filter(task => task.id !== deletedId);
}

onBeforeMount(() => {
    getTasks();
})
</script>