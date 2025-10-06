<template>
    <Header></Header>
    <div class="w-full flex justify-center py-10">
        <Table
            :header="headerTable"
            :datas="sprints"
            @dataId="removeSprint"
        >
            <template #operationBtn>
                <EditBtn :to="`/edit_task/${data}`">
                    ویرایش
                    <PencilSquareIcon class="w-5 h-5" />
                </EditBtn>

                <DeleteBtn @click="sendDataToParent(data.id)" >
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
import { CheckBadgeIcon, HandThumbDownIcon, TrashIcon, PencilSquareIcon, UserIcon } from '@heroicons/vue/24/solid'

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