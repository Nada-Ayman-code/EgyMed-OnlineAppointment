<template>

<div class="row justify-content-center align-items-center m-0 mt-5 mb-5">
  <p style="color:rgba(100, 149, 237, 0.9);" >Booked Appointments: {{cart.length}}</p>
       <div class="col-7 col-sm-6 col-md-4 col-lg-8 border border-secondary rounded p-5" v-if="cart.length===0" style="background-color: rgb(211,211,211);">
            <p>No Appointments Booked Yet.</p>
       </div>
      <div class="col-7 col-sm-6 col-md-4 col-lg-8 border-secondary rounded p-5 " v-else-if="cart.length!==0" style="background-color: rgb(211,211,211);">
        <div class="row justify-content-center align-items-center">
            <div class="card col-12 col-sm-12 col-md-10 col-lg-4 ms-4 g-3" v-for="card in cart" :key="card.id">
                              <img v-bind:src="photo1"
              style="height: 280px;"
              class="card-img-top mb-0"
              alt="1"/>

              <hr class="mb-0 mt-0" />

              <div class="card-body text-center" style="height: 230px">
                <h4 class="card-title">
                  <strong>{{ card.doctor.name }}</strong>
                </h4>
                <p class="card-text">
                  <b>Speciality:</b> {{ card.doctor.specialty }}<br />
                  <b>Choosed date:</b> {{ card.form.date}}<br />
                  <b>Choosed time Slot:</b> {{ card.form.time }}<br />
                  <small>{{ card.doctor.location }}</small>
                </p>
              </div>
              <button @click.prevent="removeFromCart(card.doctor.id)" class="btn btn-secondary mb-3 me-2 ms-2">Cancel Appointment
              </button>
              </div>
            </div>
      </div>
</div>

</template>

<script>
export default{
  props:["darkmode"],
  data(){
    return{
      photo1: require("@/assets/no-photo.jpg"),
      cart: [],
  }
  },
  methods:{
    retreiveElements(){
         this.cart= JSON.parse(localStorage.getItem("cart")) || [];
    },
    removeFromCart(cardid){

        let fil= this.cart.filter((item)=> item.doctor.id !== cardid);
        localStorage.setItem("cart", JSON.stringify(fil));
        this.cart= JSON.parse(localStorage.getItem("cart")) || [];
    },
  },
  mounted(){
    this.retreiveElements();
  },
}
</script>
