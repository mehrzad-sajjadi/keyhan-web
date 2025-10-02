<template>
    <RouterLink :to="to" v-slot="{ isActive }">
        <span 
            :class="[
                baseClass,
                isActive ? activeClass : inactiveClass
            ]"
        >
            <slot />
        </span>
    </RouterLink>
</template>

<script setup>
defineProps({
    to: { type: String, required: true },
    baseClass: {
        type: String,
        default: "px-4 py-2 rounded-full flex items-center transition-all duration-200"
    },
    activeClass: {
        type: String,
        default: "bg-white text-emerald-600 shadow-md font-semibold"
    },
    inactiveClass: {
        type: String,
        default: "hover:bg-white/10 hover:shadow-sm"
    }
});
</script>
