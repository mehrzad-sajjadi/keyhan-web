<template>
    <RouterLink
        type="button"
        :to="to"
        class="btn-cancel"
    >
        <slot></slot>
    </RouterLink>

</template>
<script setup>
const props = defineProps({
    to:String
})

</script>