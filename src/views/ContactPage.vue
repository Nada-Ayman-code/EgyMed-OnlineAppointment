<template>
  <div class="row mb-4 justify-content-center m-0 mt-5 mb-5">
    <div
      class="col-12 col-sm-10 col-md-6 col-lg-4 border rounded shadow-lg"
      :style="{backgroundColor: darkmode? 'rgba(33, 37, 41, 0.8)':'rgb(255, 255, 255)'}"
    >
      <form action="https://api.web3forms.com/submit" method="POST" class="p-3">
        <input
          type="hidden"
          name="access_key"
          value="f6785770-d73b-4cb0-8bf0-41516260370e"
        />
        <div class="form-group mb-4">
          <label for="name" class="form-label text-secondary">Name:</label>
          <input
            id="name"
            class="form-control mb-2"
            style="background-color: rgb(211, 211, 211)"
            name="name"
            placeholder="enter your name"
            v-model="form.name"
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
          <label for="email" class="form-label text-secondary">Email:</label>
          <input
            id="email"
            class="form-control mb-2"
            name="email"
            style="background-color: rgb(211, 211, 211)"
            placeholder="enter your email"
            v-model="form.email"
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
          <label for="text" class="form-label text-secondary">Message:</label>
          <textarea
            id="text"
            rows="10"
            class="form-control mb-2"
            name="text"
            style="background-color: rgb(211, 211, 211)"
            v-model="form.text"
            placeholder="Type Your Message Here"
            type="textarea"
          ></textarea>
          <div
            class="p-2 border border-danger text-danger"
            v-show="error.text"
            style="background-color: rgba(255, 0, 0, 0.2)"
          >
            ❗{{ error.text }}
          </div>
        </div>

        <button
          type="submit"
          @click.prevent="buttonvalidationForm"
          class="btn btn-secondary mb-2"
        >
          Send Message
        </button>
        <div class="alert alert-success" role="alert" v-show="alerts">
          Message Sent Successfully
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['darkmode'],
  data() {
    return {
      form: {
        name: "",
        email: "",
        text: "",
      },
      error: {
        name: "",
        email: "",
        text: "",
      },
      alerts: false,
    };
  },
  methods: {
    buttonvalidationForm() {
      console.log("hello");

      this.error.name = "";
      this.error.email = "";
      this.error.text = "";

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

      //Massage validation (4 validation requirements): not empty/ no spaces/ min/ max/ trim
      if (!this.form.text.trim()) {
        this.error.text = "message is empty";
      } else if (
        this.form.text.trim().length < 20 ||
        this.form.text.trim().length > 1000
      ) {
        this.error.text =
          "message must be at least 20 characters and at most 1000 characters";
      }

      this.alerts = !this.alerts;
      let stop = setInterval(() => {
        this.alerts = false;
      }, 3000);

      setTimeout(() => {
        clearInterval(stop);
      }, 3000);
      console.log(this.error);
    },
  },
};
</script>
