<template>
    <div class="w-[70%] p-4 rounded-lg text-md shadow-md text-white flex">
        <table class="w-full text-center min-h-min rounded-lg overflow-hidden border border-[#00b477]/20">
            <thead class="text-center bg-gradient-to-r from-[#00b477] to-[#008a5e]">
                <tr>
                    <th v-for="(headerData, index) in header" 
                        :key="index"
                        class="px-4 py-3 min-w-min text-center text-white text-md"
                    >
                        {{ headerData }}
                    </th>
                    <th>
                        عملیات
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white">
                <tr v-for="(data, index) in datas" 
                    :key="index"
                    class="hover:bg-[#00b477]/10 transition-colors duration-200"
                >
                    <td v-for="(text, index) in data"
                        :key="index"
                        class="px-4 py-3 border-t border-[#00b477]/10 text-gray-700 text-md"
                    >
                        {{ text }}
                    </td>
                    <td
                        class="px-4 py-3 border-t border-[#00b477]/10 text-gray-700 text-md"
                    >
                        <DeleteBtn @click="sendDataToParent(data.id)" >
                            <slot name="deleteBtn"></slot>
                        </DeleteBtn>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
//components
import DeleteBtn from '@/components/Buttons/DeleteBtn.vue';


const emit = defineEmits(["dataId"]);

function sendDataToParent(idParam){
    emit("dataId",idParam);
}
const props = defineProps({
    header: Object,
    datas: Object
});

</script>