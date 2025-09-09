<template>
  <div class="position-relative">
    <img
      src="@/assets/img.jpeg"
      style="object-fit: cover; object-position: center"
      alt=""
      class="position-absolute top-0 start-0 vh-100 w-100 border-bottom border-primary"
    />
    <div
      class="row d-flex flex-column bg-dark vh-100 m-0 p-0 align-items-center justify-content-center"
    >
      <h1 class="col-12 col-sm-10 text-white" style="z-index: 9999">
        Book Your Doctor’s Appointment Easily
      </h1>
      <div
        class="col-12 col-sm-11 col-md-8 col-lg-8 mb-5 mt-5 p-4 position-relative container border border-white rounded"
        style="background-color: rgba(255, 255, 255, 0.5)"
      >
        <p class="text-white">
          Find doctors, schedule appointments, and manage your bookings
          efficiently with our user-friendly system.
        </p>

        <!-- SearchBar -->
        <input
          type="text"
          id="search"
          class="border rounded-start-pill p-1"
          placeholder="Search Doctor"
          v-model="searchBar"
          @focus="dropDown = true"
          @blur="dropDown = false"
        />
        <button
          class="btn btn-light border rounded-end-pill p-1"
          @click="showCard"
        >
          🔍
        </button>

        <docs v-if="selectedDoctor" :doctor="selectedDoctor" />

        <div
          v-show="dropDown"
          class="position-absolute border bg-white rounded"
          style="left: 40%; right: 42%"
        >
          <ul class="bg-white" v-for="doc in filteredDoc" :key="doc.id">
            <li
              class="btn list-group-item ms-0 me-4"
              style="z-index: 99999"
              @mousedown="inputVal(doc.name)"
            >
              {{ doc.name || doc.specialty }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div
    class="row m-0 align-items-center justify-content-center p-5 border-top border-bottom border-white"
  >
    <h2
      class="mt-3"
      :style="{
        color: darkmode ? 'rgb(255, 255, 255)' : 'rgba(33, 37, 41, 0.8)',
      }"
    >
      About
    </h2>

    <div
      class="col-12 col-sm-10 col-md-8 col-lg-10 p-4 container border border-white rounded fs-5 mb-5 mt-3 shadow-lg"
      :style="{
        color: darkmode ? 'rgb(255, 255, 255)' : 'rgba(33, 37, 41, 0.8)',
      }"
    >
      <div>
        Welcome to EgyMed, your trusted partner in healthcare.<br />
        We are dedicated to helping patients easily find doctors, book
        appointments, and manage their medical visits without hassle.<br />

        Our mission is simple:<br />

        Connect patients with qualified doctors across various specialties.<br />

        Save time by offering a quick and reliable appointment booking
        system.<br />

        Ensure transparency with up-to-date information about doctors, clinics,
        and available time slots.<br />

        Whether you’re looking for a general practitioner, specialist, or
        dentist, our platform makes it easy to compare, choose, and schedule
        your visit—all in one place.<br />

        We believe that healthcare should be accessible, efficient, and
        stress-free, and we are here to make that a reality for you and your
        family.
      </div>
    </div>
  </div>
  <div
    class="row m-0 p-5 align-items-center justify-content-center border-primary border-top border-bottom"
    :style="{
      backgroundColor: darkmode
        ? 'rgba(33, 37, 41, 0.8)'
        : 'rgba(33, 37, 41, 0.3)',
    }"
  >
    <h2
      class="mt-5 text-white"
      :style="{
        color: darkmode ? 'rgba(33, 37, 41, 0.8)' : 'rgb(255, 255, 255)',
      }"
    >
      Our Services
    </h2>

    <div
      class="col-12 text-white col-sm-10 col-md-10 col-lg-10 p-4 container border border-white rounded fs-5 mb-0 mt-3 shadow-lg"
    >
      <p>
        At EgyMed, we provide a wide range of healthcare services designed to
        make managing your medical needs simple and efficient:<br />

        Doctor Search 🔎<br />
        Easily browse and find qualified doctors by specialty, location, or
        name.<br />

        Online Appointment Booking 📅<br />
        Book your medical appointments anytime, anywhere, with just a few
        clicks.<br />

        Specialty Care Access 🩺<br />
        Connect with doctors across various fields—Cardiology, Dermatology,
        Dentistry, Pediatrics, and more.<br />

        Appointment Reminders ⏰<br />
        Receive reminders to ensure you never miss your scheduled visit.<br />

        Medical Records Management 📂<br />
        Keep track of your appointments and basic medical history securely in
        one place.<br />

        User-Friendly Dashboard 💻<br />
        Manage your bookings, view doctor profiles, and reschedule with ease.
      </p>
    </div>
  </div>
</template>

<script>
import docs from "@/components/doctorCard.vue";

export default {
  props: ["darkmode"],
  components: {
    docs,
  },
  data() {
    return {
      doctors: [],
      searchBar: "",
      dropDown: false,
      selectedDoctor: null,
    };
  },
  methods: {
    retrieve() {
      this.doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    },
    inputVal(name) {
      this.searchBar = name;
      this.dropDown = false;
    },
    showCard() {
      let found = this.doctors.find((item) => item.name === this.searchBar);
      if (found) {
        this.selectedDoctor = found;
      }
      this.searchBar = "";
    },
  },
  computed: {
    filteredDoc() {
      return this.doctors.filter(
        (item) =>
          (item.name || "")
            .toLowerCase()
            .includes(this.searchBar.toLowerCase()) ||
          (item.specialty || "")
            .toLowerCase()
            .includes(this.searchBar.toLowerCase())
      );
    },
  },
  mounted() {
    this.retrieve();
  },
};
</script>
