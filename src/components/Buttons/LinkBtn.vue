<template>
    <div class="flex justify-end ">
        <RouterLink :to="to" class="btn-link">
            <slot></slot>
        </RouterLink>
    </div>
</template>
<script setup>
const props = defineProps({
    to:String
})
</script>