<template>
    <RouterLink
        :to="to"
        class="btn-edit"
    >
        <slot></slot>
    </RouterLink>

</template>
<script setup>
const props = defineProps({
    to:String
})

</script>