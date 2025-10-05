<template>
    <Header></Header>
    <div class="w-full flex justify-center py-10">
        <Table
            :header="headerTable"
            :datas="sprints"
            @dataId="removeSprint"
        >
            <template #deleteBtn>
                <TrashIcon class="size-5 " />
                حذف
            </template>
        </Table>
    </div>
</template>
<script setup>
//components
import Table from "@/components/Table.vue";
import Header from "@/components/Header.vue";


//packages
import axios from "axios";
import { TrashIcon,} from "@heroicons/vue/16/solid";

import { ref, onBeforeMount, reactive } from "vue";


const sprints = ref([]);
const headerTable = reactive(["ID","نام اسپرینت","تاریخ شروع","تاریخ پایان"])

async function getSprints(){
    try{
        let response = await axios.get("http://localhost:3000/sprints");
        sprints.value = response.data ;
    }catch(error){
        throw new Error(error)
    }
}
onBeforeMount(()=>{
    getSprints();
})

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