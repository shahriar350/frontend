<template>
  <div>
    <p v-if="day === 0 && hour === 0 && min === 0 && sec === 0">CountDown finish</p>
    <p v-else> <span class="font2 font-weight-600" v-if="day > 0">{{ day }} days :</span>   <span class="font2 font-weight-600" v-if="hour > 0">{{ hour }} hr : </span> <span class="font2 font-weight-600" v-if="min > 0">{{ min }} minutes : </span>  <span class="font2 font-weight-600">{{ sec }} seconds</span> </p>
  </div>
</template>

<script>
  export default {
    props: ['endtime'],
    data() {
      return {
        day: 0,
        hour: 0,
        min: 0,
        sec: 0,
        interval:null,
      }
    },
    mounted() {
      this.interval = setInterval(() => {
        this.secs();
      },1000);
      this.secs();
      this.hours();
      this.mins();
      this.days();
      // this.interval = setInterval(() => {
      //   this.time();
      // },1000);
      // this.time();
    },
    methods: {
      secs(){
        this.sec = this.$moment.duration(this.$moment(this.endtime).diff(this.$moment())).seconds()
      },
      hours(){
        this.hour = this.$moment.duration(this.$moment(this.endtime).diff(this.$moment())).hours()
      },
      mins(){
        this.min = this.$moment.duration(this.$moment(this.endtime).diff(this.$moment())).minutes()
      },
      days(){
        this.day = this.$moment.duration(this.$moment(this.endtime).diff(this.$moment())).days()
      }

    },
    watch: {
      sec(){
        this.mins();
      },
      hour(){
        this.days()
      },
      min(){
        this.hours()
      },
      day(){

      },
    },
  }
</script>
