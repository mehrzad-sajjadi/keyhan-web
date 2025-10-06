import {createRouter ,createWebHistory} from "vue-router";
import LoginView from "@/views/LoginView.vue";
//Task Pages
import AddTaskView from "@/views/Task/AddTaskView.vue";
import TaskView from "@/views/Task/TaskView.vue";
import EditTaskView from "@/views/Task/EditTaskView.vue";
//Sprint Pages
import SprintView from "@/views/Sprint/SprintView.vue";
import AddSprintView from "@/views/Sprint/AddSprintView.vue";
import EditSprintView from "@/views/Sprint/EditSprintView.vue";
//User Pages
import AddUserView from "@/views/User/AddUserView.vue";
import EditUserView from "@/views/User/EditUserView.vue";
import UserView from "@/views/User/UserView.vue";

const routes=[
    {
        path:"/",
        component : TaskView
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
        path:"/edit_user/:id",
        component : EditUserView
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