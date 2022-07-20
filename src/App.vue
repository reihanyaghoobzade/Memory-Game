<template>
  <section class="container mx-auto">
    <div class="px-4 lg:px-0 relative">
      <div class="flex justify-center items center">
        <Modal @configInfo="setConfiguration" v-show="info.showModal" />
      </div>
      <div
        class="flex justify-between items-center text-2xl md:text-3xl lg:text-4xl font-semibold lg:w-3/5 mx-auto mb-16"
      >
        <div class="pointer-events-none">
          {{ timer }}
        </div>
        <div>{{ info.counter }}</div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <div
          class="grid grid-cols-4 gap-8 justify-center items-center w-full md:w-fit"
          @click="checkClickOnce"
        >
          <Card
            v-for="(image, index) in images.value"
            :key="index"
            :image="image"
            :index="index"
            :active="
              !!image.matched ||
              info.firstChoice === image ||
              info.secondChoice === image
            "
            :class="{ 'pointer-events-none': info.done }"
            class="col-span-1 flex"
            @onClick="clickHandler"
          />
        </div>

        <div class="flex justify-center items-center mt-10">
          <button
            type="button"
            @click="resetGame"
            class="col-span-2 py-2 md:py-4 px-6 md:px-10 bg-cyan-700 rounded-xl text-white md:text-xl md:font-semibold"
          >
            شروع مجدد
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import Card from "./components/Card.vue";
import Modal from "./components/Modal.vue";
const images = reactive([
  { img: "./src/assets/images/product-1.jpg" },
  { img: "./src/assets/images/product-2.jpg" },
  { img: "./src/assets/images/product-3.jpg" },
  { img: "./src/assets/images/product-4.jpg" },
  { img: "./src/assets/images/product-5.jpg" },
  { img: "./src/assets/images/product-6.jpg" },
  { img: "./src/assets/images/product-7.jpg" },
  { img: "./src/assets/images/product-8.jpg" },
]);

const timer = computed(() => {
  info.minutes = info.minutes < 10 ? ("0" + info.minutes).slice(-2) : info.minutes;
  info.seconds = info.seconds < 10 ? ("0" + info.seconds).slice(-2) : info.seconds;
  return `${info.minutes}:${info.seconds}`;
});

const info = reactive({
  counter: null,
  minutes: null,
  seconds: null,
  done: false,
  firstChoice: null,
  secondChoice: null,
  showModal: true,
  activeTimer: true
});

onMounted(() => {
  images.value = [...images, ...images].map((image) => ({
    ...image,
    matched: true,
  }));

  shuffle(images.value);
});

function shuffle(img) {
  img.sort(() => Math.random() - 0.5);
}

function clickHandler(image) {
  info.firstChoice ? (info.secondChoice = image) : (info.firstChoice = image);

  if (info.firstChoice && info.secondChoice) {
    if (info.firstChoice.img === info.secondChoice.img) {
      const index1 = images.value.indexOf(image);
      const index2 = images.value.indexOf(info.firstChoice);
      images.value[index1].matched = true;
      images.value[index2].matched = true;
      resetActive();
    } else {
      resetActive();
    }
  }
  info.counter--;
  if (info.counter == 0) {
    info.done = true;
    clearInterval(timeInterval.value);
  }
  checkCompeleted();
}

function resetActive() {
  setTimeout(() => {
    info.firstChoice = null;
    info.secondChoice = null;
  }, 700);
}

function checkCompeleted() {
  if (images.value.every((image) => image.matched) || info.counter == 0) {
    info.done = true;
  }
}

function resetGame() {
  info.firstChoice = null;
  info.secondChoice = null;
  info.done = false;
  info.counter = null;
  info.minutes = null;
  info.seconds = null;
  info.showModal = true;
  clearInterval(timeInterval.value);
  shuffle(images.value);
  images.value.map((image) => {
    image.matched = true;
  });
}

const timeInterval = ref();

function checkClickOnce(){
  if(info.activeTimer){
    countdownTimer();
    info.activeTimer = false;
  }
}

function countdownTimer() {
  const timer = ref(info.minutes * 60 + info.seconds);

  timeInterval.value = setInterval(() => {
    if ((info.minutes ==0 && info.seconds ==0) || info.done == true) {
      clearInterval(timeInterval.value);
      info.done = true;
    } else {
      if (timer.value % 60 == 0) {
        if (info.seconds == 0) info.minutes--;
        info.seconds = 0;
      }
      timer.value--;
      info.seconds = Math.floor(timer.value % 60, 10);
    }
  }, 1000);
}

function setConfiguration(configInfo) {
  info.showModal = false;
  info.counter = configInfo.counter;
  info.minutes = configInfo.minutes;
  info.seconds = configInfo.seconds;
  info.activeTimer = true;
  setTimeout(() => {
    images.value.forEach((image) => (image.matched = false));
  }, 1500);
}
</script>

<style></style>
