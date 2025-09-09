<template>
  <div id="app">
    <MyNavBar @toggle-dark="darkFunc"  v-if="$route.name !== 'intro'" :darkmode="darkmode" />
    <main>
    <router-view :darkmode="darkmode" />




    <div v-if="cart.length" class="border border-warning position-fixed p-4" style=" right: 70px; bottom: 50px; background-color: rgba(255, 255, 143, 0.4); width: 195px; z-index: 9999;">
    <div v-for="time in cart" :key="time.doctor.id" >
           Appointment with {{ time.doctor.name }}<br> {{timer }}<br><hr>
    </div>
</div>
    </main>
    <footer>
    <MyAppFooter v-if="$route.name !== 'intro'"/>
  </footer>
  </div>
</template>

<script>
import MyNavBar from "@/components/NavBar.vue";
import MyAppFooter from "@/components/MyAppFooter.vue";

// const text=document.querySelector("#app");

export default {
  name: "App",
  components: {
    MyNavBar,
    MyAppFooter,
  },
  data(){
    return{
       darkmode: false,
       timer: [],
       cart: [],
    }
  },
  methods: {
      darkFunc(){
        const back=document.querySelector("#app");
            if(this.darkmode === false){
                  this.darkmode = true;
                  back.style.backgroundColor= "rgba(33, 37, 41, 0.8)";
                  back.style.color= "#ffffff";
               } 
             else{
                  this.darkmode = false;
                  back.style.backgroundColor= "white";
                  back.style.color= "rgba(33, 37, 41, 0.8)";
                }
               },
      timerFun(){
        this.cart= JSON.parse(localStorage.getItem("cart"));

  
       let rep= setInterval( ()=>{
        this.cart= JSON.parse(localStorage.getItem("cart"));
          const currTime= new Date();

          this.cart.forEach((item)=> {
            let date= item.form.date;
            let time= item.form.time;
          
          const appTime= new Date(`${date}T${time}:00`);

          let diff= appTime-currTime;

          if(diff<=0){
               this.timer="Started"
               setTimeout(()=>{
                clearInterval(rep)
               }, 3000); 
          }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

        this.timer= `${days}d ${hrs}h: ${mins}m: ${secs}s`

        })},1000);

      }
    },
    mounted(){
      this.timerFun();
    }
  }
</script>

<style>

#app {
  min-height: 100vh; /* ensures full-page background */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* margin-top: 60px; */
}


</style>
