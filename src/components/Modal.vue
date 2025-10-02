<template>
    <div
        class="fixed top-0 right-0 left-0 bottom-0 bg-[#141211c3] p-10 content-center"
    >
        <div 
            ref="checkOut" 
            class="rounded-md m-auto max-h-max my-20 text-[#014329] bg-white w-[450px] h-[600px] px-3"
        >
            <div class="flex flex-row ">
                <XMarkIcon
                    @click="emit('closeModal')"
                    as="button"
                    type="button"
                    class="size-5 cursor-pointer my-2"
                />
                <h2
                    class="font-semibold text-xl m-2"
                >
                    <slot name="header_title"></slot>
                </h2>
            </div>
            <hr class="text-[#7E848E]">
            <div class="flex justify-center py-4 ">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import {XMarkIcon,} from "@heroicons/vue/24/solid";

const emit = defineEmits("closeModal");
const checkOut = ref(null);
onClickOutside(checkOut, () => {
    emit("closeModal");
});
</script>
