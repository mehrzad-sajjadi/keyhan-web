<template>
    <button
        @click="clickHandle"
        type="button"
        class="btn-notdone"
    >
        <slot></slot>
    </button>
</template>

<script setup>
const emit = defineEmits(['click'])

function clickHandle() {
    emit('click')
}
</script>
