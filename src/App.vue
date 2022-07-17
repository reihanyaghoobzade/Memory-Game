<script>
import { ref, reactive, onMounted } from "vue";
import Card from "./components/Card.vue";
export default {
  components: {
    Card: Card,
  },
  setup() {
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

    const firstChoice = ref();
    const secondChoice = ref();
    const done = ref(false);
    const counter = ref(40);
    const minutes = ref("01");
    const seconds = ref("00");
    const timer = ref(minutes.value * 60 + seconds.value);

    onMounted(() => {
      images.value = [...images, ...images].map((image, index) => ({
        ...image,
        matched: false,
        id: index,
      }));

      shuffle(images);
    });

    function shuffle(img) {
      img.value.sort(() => Math.random() - 0.5);
    }

    function clickHandler(image) {
      firstChoice.value
        ? (secondChoice.value = image)
        : (firstChoice.value = image);

      if (firstChoice.value && secondChoice.value) {
        if (firstChoice.value.img === secondChoice.value.img) {
          const index1 = images.value.indexOf(image);
          const index2 = images.value.indexOf(firstChoice.value);
          images.value[index1].matched = true;
          images.value[index2].matched = true;
          resetActive();
        } else {
          resetActive();
        }
      }
      counter.value--;
      if (counter.value == 0) {
        done.value = true;
        clearInterval(timeInterval);
      }
      checkCompeleted();
    }

    function resetActive() {
      setTimeout(() => {
        firstChoice.value = null;
        secondChoice.value = null;
      }, 700);
    }

    function checkCompeleted() {
      if (images.value.every((image) => image.matched) || counter.value == 0) {
        done.value = true;
      }
    }

    function resetGame() {
      firstChoice.value = ref();
      secondChoice.value = ref();
      counter.value = 40;
      done.value = false;
      minutes.value = "01";
      seconds.value = "00";
      timer.value = 0;
      // clearInterval(timeInterval);
      setTimeout(() => shuffle(images), 1000);
    }

    function countdownTimer() {
      const timeInterval = setInterval(() => {
        if ((seconds.value == 0 && minutes.value == 0) || done.value == true) {
          clearInterval(timeInterval);
          // done.value = true;
        } else {
          if (timer.value % 60 == 0) {
            if (seconds.value == 0) minutes.value--;
            seconds.value = 0;
          }
          timer.value--;
          seconds.value = Math.floor(timer.value % 60, 10);
        }
        seconds.value = ("0" + seconds.value).slice(-2);
        minutes.value = ("0" + minutes.value).slice(-2);
      }, 1000);
    }
    return {
      images,
      counter,
      minutes,
      seconds,
      done,
      clickHandler,
      resetGame,
      firstChoice,
      secondChoice,
      countdownTimer,
    };
  },
};
</script>

<template>
  <section class="container mx-auto">
    <div
      class="flex justify-between items-center text-4xl font-semibold w-3/5 mx-auto mb-16"
    >
      <div class="pointer-events-none">
        <span id="minutes">{{ minutes }}</span
        >:<span id="seconds">{{ seconds }}</span>
      </div>
      <div>{{ counter }}</div>
    </div>
    <div
      class="grid grid-cols-4 gap-4 justify-center items-center w-2/5 mx-auto"
      @click.once="countdownTimer"
    >
      <Card
        v-for="(image, index) in images.value"
        :key="image.id"
        :image="image"
        :index="index"
        :active="
          image.matched || firstChoice === image || secondChoice === image
        "
        :class="{ 'pointer-events-none': done }"
        class="col-span-1 flex"
        @onClick="clickHandler"
      />
      <div class="col-span-4 flex justify-center items-center mt-10">
        <button
          @click="$router.go()"
          type="submit"
          class="col-span-2 py-4 px-10 bg-cyan-700 rounded-xl text-white text-xl font-semibold"
        >
          شروع مجدد
        </button>
      </div>
    </div>
  </section>
</template>

<style></style>
