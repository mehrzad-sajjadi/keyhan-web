import {createRouter ,createWebHistory} from "vue-router";
import AddTaskView from "@/views/AddTaskView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import AddSprintView from "@/views/AddSprintView.vue";
import EditSprintView from "@/views/EditSprintView.vue";
import EditTaskView from "@/views/EditTaskView.vue";
import AddUserView from "@/views/AddUserView.vue";


import UserView from "@/views/UserView.vue";
import SprintView from "@/views/SprintView.vue";

const routes=[
    {
        path:"/",
        component : HomeView
    },
    {
        path:"/login",
        component : LoginView
    },
    {
        path:"/add_task",
        component : AddTaskView
    },
    {
        path:"/edit_task/:id",
        component : EditTaskView
    },
    {
        path:"/edit_sprint/:id",
        component : EditSprintView
    },
    {
        path:"/add_sprint",
        component : AddSprintView
    },
    {
        path:"/add_user",
        component : AddUserView
    },
    {
        path:"/users",
        component : UserView
    },
        {
        path:"/sprints",
        component : SprintView
    }
];

const router = createRouter({
    history : createWebHistory(),
    routes
})

router.beforeEach((to,from,next)=>{
    const name = localStorage.getItem("name");
    if(!name && to.path!="/login"){
        router.push("/login");
    }else{
        next();
    }
})
export default router;