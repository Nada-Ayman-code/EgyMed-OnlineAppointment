import { createRouter, createWebHistory } from "vue-router";
import MyIntro from "@/views/MyIntro.vue";
import ThePatientSide from "@/views/ThePatientSide.vue";
import TheDoctorSide from "@/views/TheDoctorSide.vue";
import ContactPage from "@/views/ContactPage.vue";
import ShowDoctors from "@/views/ShowDoctors.vue";
import MyAppointmentPage from "@/views/MyAppointmentPage.vue";

const routes = [
  { path: "/", name: "intro", component: MyIntro },
  { path: "/patient", name: "Patient", component: ThePatientSide, props: true },
  { path: "/doctor", name: "Doctor", component: TheDoctorSide },
  { path: "/doctors", name: "Doctors", component: ShowDoctors },
  {
    path: "/myappointment",
    name: "MyAppointment",
    component: MyAppointmentPage,
  },
  { path: "/contact", name: "Contact", component: ContactPage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
