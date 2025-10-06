<template>
    <Header></Header>
    <LinkBtn to="add_user">
        <UserPlusIcon class="size-5 mx-1" />
        افزودن کاربر 
    </LinkBtn>

    <div class="w-full flex justify-center py-10">
        <Table
            :header="headerTable"
            :keys="keysTable"
            :datas="users"
        >
            <template #operationBtn="{ data }">
                <EditBtn :to="`/edit_user/${data.id}`">
                    ویرایش
                    <PencilSquareIcon class="w-5 h-5" />
                </EditBtn>

                <DeleteBtn @click="removeUser(data.id)" >
                    <UserMinusIcon class="size-5 " />
                    حذف کاربر   
                </DeleteBtn>
            </template>
        </Table>
    </div>
</template>

<script setup>
//components
import Header from "@/components/Header.vue" ;
import Table from "@/components/Table.vue" ;
import DeleteBtn from "@/components/Buttons/DeleteBtn.vue";
import EditBtn from "@/components/Buttons/EditBtn.vue";
import LinkBtn from "@/components/Buttons/LinkBtn.vue";

//package
import { UserPlusIcon, UserMinusIcon, PencilSquareIcon } from "@heroicons/vue/24/solid";
import axios from "axios";

import { ref, onBeforeMount } from "vue" ;

const users = ref([]);
const headerTable = ["ID", "نام کاربر", "سن", "کشور", "شغل"];
const keysTable = ["id", "name", "age", "country", "job"];


async function removeUser(id) {
    if (confirm("آیا از حذف کاربر مطمئن هستید؟")) {
        try {
            await axios.delete(`http://localhost:3000/users/${id}`);
            users.value = users.value.filter(user => user.id !== id);
            new Flash('کاربر مورد نظر حذف شد ', 'warning');
        } catch (error) {
            throw new Error(error);
        }
    }
}


async function getUsers() {
    try {
        let response = await axios.get("http://localhost:3000/users");
        users.value = response.data;
        console.log(users.value);
    } catch (error) {
        throw new Error(error);
    }
}

onBeforeMount(() => {
    getUsers();
});
</script>