<template>
  <div class="row g-0 p-0 m-0 align-items-center">
    <div class="col-12 col-md-4 col-lg-4">
      <img
        class="p-0 m-0 w-100 vh-sm-50"
        style="object-fit: cover; object-position: bottom"
        src="@/assets/doctor-stethoscope.jpg"
        alt="doc"
      />
    </div>

    <div
      class="col-12 col-md-8 col-lg-8 d-flex flex-column align-items-center justify-content-center vh-100"
      style="background-color: rgba(128, 128, 128, 0.2)"
    >
      <h1 class="mb-5">👋 Welcome to Our Healthcare Platform</h1>
      <p>Please choose how you’d like to continue:</p>
      <!-- Doctor page is still under construction  btn btn-lg -->
      <button
        to="/doctor"
        class="btn btn-lg p-3 btn-dark bg-black"
        @click.prevent
        >👨‍⚕️ I’m a Doctor (Coming Soon)</button
      >
      <button
        @click="$router.push('/patient')"
        class="btn btn-lg mt-3 p-3 btn-dark bg-black"
      >
        🧑‍💼 I’m a Patient
      </button>
    </div>
  </div>
</template>

<script></script>

<style>
/* Custom viewport height utilities */
.vh-sm-50 {
  height: 100vh; /* default (desktop) */
}

@media (max-width: 576px) {
  .vh-sm-50 {
    height: 60vh; /* small screens */
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .vh-sm-50 {
    height: 60vh; /* small screens */
  }
}
</style>
