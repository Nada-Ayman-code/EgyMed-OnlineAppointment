<template>
  <nav
    class="navbar navbar-expand-lg position-sticky top-0 sticky-top"
    :style="{
      backgroundColor: darkmode ? 'rgba(33, 37, 41, 0.4)' : 'rgba(255, 255, 255,0.4)',
      zIndex: 10000
    }"
  >
    <div class="container-fluid bg-transparent">
      <a
        href="/patient"
        class="navbar-brand fs-1 ms-5 rounded p-2"
        style="
          color: white;
          font-family: poppins;
          background-color: rgba(100, 149, 237, 0.6);
        "
      >
        EgyMed
      </a>
      <button
        class="navbar-toggler"
        data-bs-target="#collapsetoggler"
        data-bs-toggle="collapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsetoggler">
        <ul class="navbar-nav ms-auto w-50 justify-content-between">
          <li class="nav-item">
            <a
              class="nav-link fs-5 border-end me-0 ms-0 p-4"
              :style="{
                color: darkmode
                  ? 'rgb(255, 255, 255)'
                  : 'rgba(33, 37, 41, 0.8)',
              }"
              href="/patient"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link fs-5 border-end me-0 ms-0 p-4"
              :style="{
                color: darkmode
                  ? 'rgb(255, 255, 255)'
                  : 'rgba(33, 37, 41, 0.8)',
              }"
              href="/doctors"
              >Doctors</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link fs-5 border-end me-0 ms-0 p-4"
              :style="{
                color: darkmode
                  ? 'rgb(255, 255, 255)'
                  : 'rgba(33, 37, 41, 0.8)',
              }"
              href="/myappointment"
              >My Appointments</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link fs-5 border-end me-0 ms-0 p-4"
              :style="{
                color: darkmode
                  ? 'rgb(255, 255, 255)'
                  : 'rgba(33, 37, 41, 0.8)',
              }"
              href="/contact"
              >Contact</a
            >
          </li>
          <li class="nav-item">
            <button class="fs-5 me-0 ms-0 p-2 ms-2 mt-3" @click="$emit('toggle-dark'); clicked = !clicked" >
              {{clicked? "Bright Mode🔆" : "Dark Mode🌙"}}
            </button>

          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['darkmode'],
  data() {
    return {
      name: "NavBar",
      clicked: false,
    };
  },
};
</script>
