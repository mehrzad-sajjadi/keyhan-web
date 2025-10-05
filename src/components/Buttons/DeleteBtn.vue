<template>
    <button
        @click="handleClick"
        type="button"
        class="btn-base btn-delete"    
    >
        <slot></slot>
    </button>
</template>
<script setup>
const emit = defineEmits(['click'])

const handleClick = () => {
    emit('click')
}

</script>