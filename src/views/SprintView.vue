<template>
    <Header></Header>
    <div class="w-full flex justify-center py-10">
        <Table
            :header="headerTable"
            :keys="keysTable"
            :datas="sprints"
        >
            <template #operationBtn="{ data }">
                <EditBtn :to="`/edit_sprint/${data.id}`">
                    ویرایش
                    <PencilSquareIcon class="w-5 h-5" />
                </EditBtn>

                <DeleteBtn @click="removeSprint(data.id)" >
                    <TrashIcon class="size-5 " />
                    حذف
                </DeleteBtn>
            </template>
        </Table>
    </div>
</template>

<script setup>
//components
import Table from "@/components/Table.vue";
import Header from "@/components/Header.vue";
import DeleteBtn from "@/components/Buttons/DeleteBtn.vue";
import EditBtn from "@/components/Buttons/EditBtn.vue";

//packages
import axios from "axios";
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/solid'

import { ref, onBeforeMount } from "vue";

const sprints = ref([]);
const headerTable = ["ID", "نام اسپرینت", "تاریخ شروع", "تاریخ پایان"];
const keysTable = ["id", "name", "start_date", "end_date"];

async function getSprints() {
    try {
        let response = await axios.get("http://localhost:3000/sprints");
        sprints.value = response.data;
    } catch (error) {
        throw new Error(error);
    }
}

onBeforeMount(() => {
    getSprints();
});

async function removeSprint(id) {
    if (confirm("آیا از حذف اسپرینت مطمئن هستید؟")) {
        try {
            await axios.delete(`http://localhost:3000/sprints/${id}`);
            sprints.value = sprints.value.filter(sprint => sprint.id !== id);
            console.log(`اسپرینت با شناسه ${id} حذف شد`);
        } catch (error) {
            throw new Error(error);
        }
    }
}
</script>