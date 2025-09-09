<template>

  <div class="row justify-content-center align-items-center p-0 m-0 mt-5">
  <div
      class="card col-7 col-sm-6 col-md-6 col-lg-3 shadow-lg"
    >
      <!-- <img
        v-bind:src="photo1"
        class="card-img-top mb-0"
        alt="1" 
      />

      <hr class="mb-0 mt-0" /> -->

      <div class="card-body text-center" style="height: 230px">
        <h4 class="card-title">
          <strong>{{ doctor.name }}</strong>
        </h4>
        <p class="card-text">
          <b>Speciality:</b> {{ doctor.specialty }}<br />
          Available Slots:<br>{{ doctor.available_slots[0] }}<br />
          {{ doctor.available_slots[1] }}<br>
          {{ doctor.available_slots[2] }}<br>
          <small><b>{{ doctor.location }}</b></small>
        </p>
      </div>

      <button @click="openModal(doctor)" class="btn btn-dark mb-2">
        Schedule Appointment
      </button>

      </div>
    </div>

     <div class="row">
  <div class="col-5 col-sm-6 col-md-4 col-lg-2 modal" style="background-color: rgba(0,0,0,0.5); z-index: 9999; display:block;" v-show="opened">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <div class="modal-title">Booking Appointment</div>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="opened=false"
          >
          </button>
          </div>    
          <div class="modal-body">
            <form action="">
              <div class="form-group mb-4">
                <label for="name" class="form-label mb-0">Name:</label>
                <input id="name" class="form-control m-2" name="name" v-model="form.name" placeholder="Name" type="text" />
                <div class="p-2 border border-danger text-danger" v-show="error.name" style="background-color: rgba(255, 0, 0, 0.2);">❗{{error.name }}</div>
              </div>
              <div class="form-group mb-4">
                <label for="email" class="form-label mb-0">Email:</label>
                <input id="email" class="form-control m-2" name="email" v-model="form.email" placeholder="Email" type="email" />
                <div class="p-2 border border-danger text-danger" v-show="error.email" style="background-color: rgba(255, 0, 0, 0.2);">❗{{error.email }}</div>
              </div>

              <div class="form-group mb-4">
                <label for="phone" class="form-label mb-0">Phone:</label>
                <input id="phone" class="form-control m-2" name="phone" v-model="form.phone" placeholder="Phone Number" type="tel" />
                <div class="p-2 border border-danger text-danger" v-show="error.phone" style="background-color: rgba(255, 0, 0, 0.2);">❗{{error.phone }}</div>
              </div>

              <div class="form-group mb-4">
                <label for="date" class="form-label mb-0">Appointment Date:</label>
                <input id="date" class="form-control m-2" name="date" v-model="form.date" placeholder="Date" type="date" max="2026-01-01" />
                <div class="p-2 border border-danger text-danger" v-show="error.date" style="background-color: rgba(255, 0, 0, 0.2);">❗{{error.date }}</div>
              </div>
              <div class="form-group mb-4">
                <label for="time" class="form-label mb-0">Appointment Hour:</label>
                <p>available slots: {{ selectedDoctor?.available_slots }}</p>
                <input id="time" class="form-control m-2" name="time" v-model="form.time" placeholder="Time" type="time" />
                <div class="p-2 border border-danger text-danger" v-show="error.time" style="background-color: rgba(255, 0, 0, 0.2);">❗{{error.time }}</div>
              </div>
              <button type="submit"
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

</template>

<script>
export default{
    props: {
        doctor: {type:Object,  required: true }
    },
    data(){
         return{
            doctors: [],
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
         }
    },
    methods:{
          getDoctors(){
            this.doctors= JSON.parse(localStorage.getItem("doctors"));
          },
    openModal(card) {
   
  if (!this.doctors.length) {
    console.warn("Doctors not loaded yet!");
    return;
  }
  // ... rest of your code

      this.error.name= "";
      this.error.email= "";
      this.error.phone= "";
      this.error.date= "";
      this.error.time= "";
      this.form.name= "";
      this.form.email= "";
      this.form.phone= "";
      this.form.date= "";
      this.form.time= "";
      this.opened = true;
      this.selectedDoctor = card;
    },
   AddToCart(doctorid){
  let appointment = JSON.parse(localStorage.getItem("doctors")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  

        let doctor= appointment.find((item)=> item.id === doctorid);

        let cartObject= {
          doctor: doctor,
          form: {
            name: this.form.name,
            email: this.form.email,
            phone: this.form.phone,
            date: this.form.date,
            time: this.form.time,
      },
        }

        if(cart.length === 0){
           cart.push(cartObject);
        }
        else{
            let found= cart.find((item)=> item.doctor.id === doctorid);
            if(found === undefined){
                cart.push(cartObject);
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    },
  buttonvalidationForm(card){
      console.log("hello");

      
      this.error.name= "";
      this.error.email= "";
      this.error.phone= "";
      this.error.date= "";
      this.error.time= "";

//name validation (5 validation requirements): not empty/ min/ max/ pattern/ trim
    let pattern= /^[A-Za-z\s]+$/;

      if(!this.form.name.trim()){
        this.error.name= "name is empty";
      }
      else if(this.form.name.trim().length <6 || this.form.name.trim().length  > 40){
        this.error.name= "name must be at least 6 characters and at most 40 characters";
      }
      else if(!pattern.test(this.form.name.trim())){
        this.error.name= "name must be letters and spaces only";
      }

//Email validation (4 validation requirements): not empty/ no spaces/ pattern/ trim
    let emailpattern= /^[^\s@]+@[^\s@]+\.com$/;
      if(!this.form.email.trim()){
        this.error.email= "email is empty";
      }else if(!emailpattern.test(this.form.email.trim())){
        this.error.email= "email must be of the pattern user@example.com";
      }

//Phone validation (4 validation requirements): not empty/ no spaces/ 11 digits/ trim
 let phonepattern= /^(010|011|012|015)[0-9]{8}$/ ; 
      if(!this.form.phone.trim()){
        this.error.phone= "phone is empty";
      }
      else if(!phonepattern.test(this.form.phone.trim())){
        this.error.phone= "phone must be an Egyptian number with 11 digits (010, 011, 012, or 015)";
      }

//Date validation (4 validation requirements): not empty/ no past/ future limit/ trim
const currDate= new Date();
const selectedDate= new Date(this.form.date);
const futureLimit= new Date('2026-01-01');

currDate.setHours(0, 0, 0, 0);
selectedDate.setHours(0, 0, 0, 0);

      if(!this.form.date.trim()){
        this.error.date= "must choose appointment date is empty";
      }else if(selectedDate < currDate){
        this.error.date= "the input date is in the past.";
      }
      else if(selectedDate > futureLimit){
        this.error.date= "the input date is not applicable.";
      }
 
//time validation
      if(!this.form.time){
        this.error.time= "must choose appointment hour";
      }else if(!card.available_slots.includes(this.form.time )){
        this.error.time= "not applicable";
      }

      if(!(this.error.name) && !(this.error.email) && !(this.error.phone) && !(this.error.date) && !(this.error.time)){
         this.addandalert(card);
      }
 
    }, 
    
  addandalert(card){
      let filt = this.doctors.find((item) => item.id === card.id);

      filt.alert = !filt.alert;
      let stop = setInterval(() => {
        filt.alert = !filt.alert;
        this.opened = false;
      }, 3000);

      setTimeout(() => {
        clearInterval(stop);
      }, 3000);

      this.AddToCart(card.id);
    },
  filter(specs){
    this.filterBoolean= false;
    if(specs=="All"){
      return this.filterBoolean;
    }
      this.filters= this.doctors.filter((item)=> item.specialty === specs);
      this.filterBoolean=true;
    },
},
}
</script>
