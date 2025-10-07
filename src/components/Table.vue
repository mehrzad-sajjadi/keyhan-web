<template>
    <div class="w-[70%] p-4 rounded-lg text-md shadow-md text-white flex">
        <table class="w-full text-center min-h-min rounded-lg overflow-hidden border border-accent/20">
            <thead class="text-center bg-gradient-primary">
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
                    class="hover:bg-accent/10 transition-colors duration-200"
                >
                    <td v-for="(key, keyIndex) in keys"
                        :key="keyIndex"
                        class="table-data text-md"
                    >
                        {{ data[key] }}
                    </td>
                    <td class="table-data text-md flex justify-center gap-2">
                        <slot name="operationBtn" :data="data"></slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
defineProps({
    header: {
        type: Array,
        required: true
    },
    keys: {
        type: Array,
        required: true
    },
    datas: {
        type: Array,
        required: true
    }
});
</script>