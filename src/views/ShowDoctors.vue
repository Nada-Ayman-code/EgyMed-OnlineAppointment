<template>
  <div>
    <div class="position-relative">
      <input
        type="text"
        id="search"
        class="border rounded-start-pill p-4 w-75 mb-5 mt-5 bg-light"
        placeholder="Search Doctor"
        v-model="searchBar"
        @focus="showSearchlist = true"
        @blur="showSearchlist = false"
      />
      <button @click="showcard" class="btn btn-light p-4 rounded-end-pill border">🔍</button>

      <div
        v-if="showSearchlist"
        class="position-absolute bg-white border rounded"
        style="z-index: 9999; left: 200px; top: 122px"
      >
        <ul class="bg-white me-3" v-for="doc in filteredSearch" :key="doc.id">
          <li class="list-group-item btn" @mousedown="BarName(doc.name)">{{ doc.name }}</li>
        </ul>
      </div>
    </div>

    <img
      src="@/assets/filter.svg"
      alt="filter"
      style="width: 20px"
      class="me-1 ms-3 mb-1"
    />
    <select
      @change="filter($event.target.value)"
      name="Filter By Specialty"
      id="specs"
    >
      <option value="All">All</option>
      <option value="Dentist">Dentist</option>
      <option value="Dermatologist">Dermatologist</option>
      <option value="Cardiologist">Cardiologist</option>
      <option value="ENT">ENT</option>
      <option value="Pediatrician">Pediatrician</option>
      <option value="Neurologist">Neurologist</option>
      <option value="Orthopedic">Orthopedic</option>
      <option value="Gynecologist">Gynecologist</option>
      <option value="Psychiatrist">Psychiatrist</option>
      <option value="Oncologist">Oncologist</option>
      <option value="Urologist">Urologist</option>
      <option value="Ophthalmologist">Ophthalmologist</option>
    </select>

    <div v-if="filterBoolean && !foundDoc">
        
      <div class="row justify-content-center align-items-center p-0 m-0 mt-5">
        <div
          class="card shadow-lg col-7 col-sm-6 col-md-5 col-lg-2 me-3 ms-4 g-3"
          v-for="card in filters"
          :key="card.id"
        >
          <img v-bind:src="photo1" class="card-img-top mb-0" alt="1" />

          <hr class="mb-0 mt-0" />

          <div class="card-body text-center" style="height: 230px">
            <h4 class="card-title">
              <strong>{{ card.name }}</strong>
            </h4>
            <p class="card-text">
              <b>Speciality:</b> {{ card.specialty }}<br />
              Available Slots:<br />{{ card.available_slots[0] }}<br />
              {{ card.available_slots[1] }}<br />
              {{ card.available_slots[2] }}<br />
              <small
                ><b>{{ card.location }}</b></small
              >
            </p>
          </div>

          <button @click="openModal(card)" class="btn btn-dark mb-2">
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="!filterBoolean && !foundDoc">
 
      <div class="row justify-content-center align-items-center p-0 m-0 mt-5">
        <div
          class="card col-7 col-sm-6 col-md-6 col-lg-2 ms-4 g-3 shadow-lg"
          v-for="card in appearedDoctors"
          :key="card.id"
        >
          <img v-bind:src="photo1" class="card-img-top mb-0" alt="1" />

          <hr class="mb-0 mt-0" />

          <div class="card-body text-center" style="height: 230px">
            <h4 class="card-title">
              <strong>{{ card.name }}</strong>
            </h4>
            <p class="card-text">
              <b>Speciality:</b> {{ card.specialty }}<br />
              Available Slots:<br />{{ card.available_slots[0] }}<br />
              {{ card.available_slots[1] }}<br />
              {{ card.available_slots[2] }}<br />
              <small
                ><b>{{ card.location }}</b></small
              >
            </p>
          </div>

          <button @click="openModal(card)" class="btn btn-dark mb-2">
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>

    <div v-if="foundDoc && filterBoolean===true">
       <div class="row justify-content-center align-items-center p-0 m-0 mt-5">
        <div
          class="card col-7 col-sm-6 col-md-6 col-lg-2 ms-4 g-3 shadow-lg"
        >
          <img v-bind:src="photo1" class="card-img-top mb-0" alt="1" />

          <hr class="mb-0 mt-0" />

          <div class="card-body text-center" style="height: 230px">
            <h4 class="card-title">
              <strong>{{ foundDoc.name }}</strong>
            </h4>
            <p class="card-text">
              <b>Speciality:</b> {{ foundDoc.specialty }}<br />
              Available Slots:<br />{{ foundDoc.available_slots[0] }}<br />
              {{ foundDoc.available_slots[1] }}<br />
              {{ foundDoc.available_slots[2] }}<br />
              <small
                ><b>{{ foundDoc.location }}</b></small
              >
            </p>
          </div>

          <button @click="openModal(card)" class="btn btn-dark mb-2">
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
      
    <div class="mb-5"></div>
    <div class="row">
      <div
        class="col-5 col-sm-6 col-md-4 col-lg-2 modal"
        style="
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999999;
          display: block;
        "
        v-show="opened"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title">Booking Appointment</div>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="opened = false"
              ></button>
            </div>
            <div class="modal-body">
              <form action="">
                <div class="form-group mb-4">
                  <label for="name" class="form-label mb-0">Name:</label>
                  <input
                    id="name"
                    class="form-control m-2"
                    name="name"
                    v-model="form.name"
                    placeholder="Name"
                    type="text"
                  />
                  <div
                    class="p-2 border border-danger text-danger"
                    v-show="error.name"
                    style="background-color: rgba(255, 0, 0, 0.2)"
                  >
                    ❗{{ error.name }}
                  </div>
                </div>
                <div class="form-group mb-4">
                  <label for="email" class="form-label mb-0">Email:</label>
                  <input
                    id="email"
                    class="form-control m-2"
                    name="email"
                    v-model="form.email"
                    placeholder="Email"
                    type="email"
                  />
                  <div
                    class="p-2 border border-danger text-danger"
                    v-show="error.email"
                    style="background-color: rgba(255, 0, 0, 0.2)"
                  >
                    ❗{{ error.email }}
                  </div>
                </div>

                <div class="form-group mb-4">
                  <label for="phone" class="form-label mb-0">Phone:</label>
                  <input
                    id="phone"
                    class="form-control m-2"
                    name="phone"
                    v-model="form.phone"
                    placeholder="Phone Number"
                    type="tel"
                  />
                  <div
                    class="p-2 border border-danger text-danger"
                    v-show="error.phone"
                    style="background-color: rgba(255, 0, 0, 0.2)"
                  >
                    ❗{{ error.phone }}
                  </div>
                </div>

                <div class="form-group mb-4">
                  <label for="date" class="form-label mb-0"
                    >Appointment Date:</label
                  >
                  <input
                    id="date"
                    class="form-control m-2"
                    name="date"
                    v-model="form.date"
                    placeholder="Date"
                    type="date"
                    max="2026-01-01"
                  />
                  <div
                    class="p-2 border border-danger text-danger"
                    v-show="error.date"
                    style="background-color: rgba(255, 0, 0, 0.2)"
                  >
                    ❗{{ error.date }}
                  </div>
                </div>
                <div class="form-group mb-4">
                  <label for="time" class="form-label mb-0"
                    >Appointment Hour:</label
                  >
                  <p>available slots: {{ selectedDoctor?.available_slots }}</p>
                  <input
                    id="time"
                    class="form-control m-2"
                    name="time"
                    v-model="form.time"
                    placeholder="Time"
                    type="time"
                  />
                  <div
                    class="p-2 border border-danger text-danger"
                    v-show="error.time"
                    style="background-color: rgba(255, 0, 0, 0.2)"
                  >
                    ❗{{ error.time }}
                  </div>
                </div>
                <button
                  type="submit"
                  @click.prevent="buttonvalidationForm(selectedDoctor)"
                  class="btn btn-dark mb-2"
                >
                  Book Appointment
                </button>
              </form>
            </div>

            <div class="modal-footer">
              <div
                class="alert alert-success"
                role="alert"
                v-show="selectedDoctor?.alert"
              >
                Appointment With {{ selectedDoctor?.name }} Scheduled
                Successfully
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="filterBoolean === false">
      <button
        v-show="currpage != 1"
        @click="currpage--"
        class="btn btn-lg btn-primary mb-5"
      >
        «
      </button>
      <button class="btn btn-lg btn-primary mb-5">{{ currpage }}</button>
      <button
        v-show="currpage < pages.length"
        @click="currpage++"
        class="btn btn-lg btn-primary mb-5"
      >
        »
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["darkmode"],
  name: "doctors-data",
  data() {
    return {
      name: "Doctors",
      showProducts: true,
      photo1: require("@/assets/no-photo.jpg"),
      opened: false,
      selectedDoctor: null,
      form: {
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
      },
      error: {
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
      },
      filters: [],
      filterBoolean: false,
      searchBar: "",
      showSearchlist: false,
      doctors: [],
      currpage: 1,
      loadPerPage: 5,
      pages: [],
      foundDoc: null,
    };
  },
  methods: {
    async getDoctors() {
      await fetch(`https://mocki.io/v1/6cb1f223-728a-4475-a559-166a23d453c0`)
        .then((res) => res.json())
        .then((data) => {
          this.doctors = data;
          localStorage.setItem("doctors", JSON.stringify(data));
          if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart", JSON.stringify([]));
          }
          this.setPages();
        });
    },
    setPages() {
      let numberOfPages = Math.ceil(this.doctors.length / this.loadPerPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    openModal(card) {

      this.error.name = "";
      this.error.email = "";
      this.error.phone = "";
      this.error.date = "";
      this.error.time = "";
      this.form.name = "";
      this.form.email = "";
      this.form.phone = "";
      this.form.date = "";
      this.form.time = "";
      this.opened = true;
      this.selectedDoctor = card;
    },
    AddToCart(doctorid) {
      let appointment = JSON.parse(localStorage.getItem("doctors")) || [];
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let doctor = appointment.find((item) => item.id === doctorid);

      let cartObject = {
        doctor: doctor,
        form: {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          date: this.form.date,
          time: this.form.time,
        },
      };

      if (cart.length === 0) {
        cart.push(cartObject);
      } else {
        let found = cart.find((item) => item.doctor.id === doctorid);
        if (found === undefined) {
          cart.push(cartObject);
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    buttonvalidationForm(card) {
      console.log("hello");

      this.error.name = "";
      this.error.email = "";
      this.error.phone = "";
      this.error.date = "";
      this.error.time = "";

      //name validation (5 validation requirements): not empty/ min/ max/ pattern/ trim
      let pattern = /^[A-Za-z\s]+$/;

      if (!this.form.name.trim()) {
        this.error.name = "name is empty";
      } else if (
        this.form.name.trim().length < 6 ||
        this.form.name.trim().length > 40
      ) {
        this.error.name =
          "name must be at least 6 characters and at most 40 characters";
      } else if (!pattern.test(this.form.name.trim())) {
        this.error.name = "name must be letters and spaces only";
      }

      //Email validation (4 validation requirements): not empty/ no spaces/ pattern/ trim
      let emailpattern = /^[^\s@]+@[^\s@]+\.com$/;
      if (!this.form.email.trim()) {
        this.error.email = "email is empty";
      } else if (!emailpattern.test(this.form.email.trim())) {
        this.error.email = "email must be of the pattern user@example.com";
      }

      //Phone validation (4 validation requirements): not empty/ no spaces/ 11 digits/ trim
      let phonepattern = /^(010|011|012|015)[0-9]{8}$/;
      if (!this.form.phone.trim()) {
        this.error.phone = "phone is empty";
      } else if (!phonepattern.test(this.form.phone.trim())) {
        this.error.phone =
          "phone must be an Egyptian number with 11 digits (010, 011, 012, or 015)";
      }

      //Date validation (4 validation requirements): not empty/ no past/ future limit/ trim
      const currDate = new Date();
      const selectedDate = new Date(this.form.date);
      const futureLimit = new Date("2026-01-01");

      currDate.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      if (!this.form.date.trim()) {
        this.error.date = "must choose appointment date is empty";
      } else if (selectedDate < currDate) {
        this.error.date = "the input date is in the past.";
      } else if (selectedDate > futureLimit) {
        this.error.date = "the input date is not applicable.";
      }

      //time validation
      if (!this.form.time) {
        this.error.time = "must choose appointment hour";
      } else if (!card.available_slots.includes(this.form.time)) {
        this.error.time = "not applicable";
      }

      if (
        !this.error.name &&
        !this.error.email &&
        !this.error.phone &&
        !this.error.date &&
        !this.error.time
      ) {
        this.addandalert(card);
      }
    },

    addandalert(card) {
      card.alert = !card.alert;
      let stop = setInterval(() => {
        card.alert = !card.alert;
        this.opened = false;
      }, 3000);

      setTimeout(() => {
        clearInterval(stop);
      }, 3000);

      this.AddToCart(card.id);
    },
    filter(specs) {
      if (specs === "All") {
        this.filterBoolean = false;
        this.foundDoc= null;
        return;
      }
      this.filters = this.doctors.filter((item) => item.specialty === specs);
      this.filterBoolean = true;
      this.foundDoc= null;
    },
    BarName(name){  
               this.searchBar= name;
               this.showSearchlist= false;
    },
    showcard(){
          let found= this.doctors.find((item)=> item.name === this.searchBar);
          if(found){
            this.foundDoc= found;
            this.filterBoolean = true;
          }
          this.searchBar="";
    },
  },
  computed: {
    filteredSearch() {
      return this.doctors.filter((item) =>
        item.name.toLowerCase().includes(this.searchBar.toLowerCase())
      );
    },
    appearedDoctors() {
      let skip = (this.currpage - 1) * this.loadPerPage;
      let appearedDoctors = this.doctors.slice(
        skip,
        this.currpage * this.loadPerPage
      );
      return appearedDoctors;
    },
  },
  mounted() {
    this.getDoctors();
  },
};
</script>
