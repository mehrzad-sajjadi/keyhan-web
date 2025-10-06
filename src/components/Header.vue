<template>
    <header class="w-full sticky top-0 z-50 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
        <div class="container mx-auto px-4">
            <div class="h-20 flex items-center justify-between">
                <!-- Logo -->
                <RouterLink 
                    to="/" 
                    class="flex items-center space-x-2 group"
                    aria-label="صفحه اصلی"
                >
                    <div class="bg-white/90 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span class="text-xl font-bold tracking-tight hidden sm:inline-block">مدیریت تسک کیهان وب</span>
                </RouterLink>

                <!-- Links -->
                <nav class="hidden md:flex items-center space-x-1 lg:space-x-2">
                    <NavLink to="/">
                        لیست تسکها
                    </NavLink>
                    
                    <NavLink to="/sprints" >
                        اسپرینت ها
                    </NavLink>

                    <NavLink to="/users" >
                        اعضای تیم
                    </NavLink>

                </nav>

                <div class="flex items-center space-x-3">
                    <button 
                        class="hidden md:flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition group"
                    >
                        <div class="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center text-emerald-600 font-bold">
                            <i class="fas fa-user"></i>
                        </div>
                        <span class="font-medium">{{userName}}</span>
                        <i class="fas fa-chevron-down text-xs transition-transform duration-200"></i>
                    </button>
                    <RouterLink 
                        to="/login"
                        class="hidden md:flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition group cursor-pointer"
                    >
                        <ArrowLeftEndOnRectangleIcon class="icon" />
                    </RouterLink>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/16/solid';

import NavLink from './NavLink.vue';
let userName = localStorage.getItem("name");

</script>