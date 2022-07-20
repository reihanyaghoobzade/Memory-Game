<template>
  <div
    class="flex justify-center items-center bg-white rounded-xl absolute top-0 w-full h-full z-20"
  >
    <div class="container mx-auto">
      <div class="w-3/5 mx-auto py-8 px-6 rounded-lg bg-stone-400">
        <div class="flex flex-col justify-center items-center gap-8">
          <div
            class="flex flex-col justify-end items-center gap-4 w-full"
          >
            <div class="flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
              <div
                :class="{
                  'opacity-100': error.counter,
                  'opacity-0': !error.counter,
                }"
                class="text-red-700 lg:text-lg font-semibold text-end lg:w-1/2 transition-all order-3 lg:order-1"
              >
                تعداد حرکات باید بین 20 و 60 باشد
              </div>
              <div class="flex flex-col lg:flex-row gap-4 order-2">
                <input
                  class="bg-stone-400 border-b-2 border-stone-700 outline-0 text-lg font-semibold order-2"
                  type="text"
                  v-model="info.counter"
                  required
                />
                <label class="lg:w-28 text-end text-lg font-semibold order-1 lg:order-3"
                  >تعداد کلیک‌ها</label
                >
              </div>
            </div>

            <div class="flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
              <div
                :class="{
                  'opacity-100': error.minutes,
                  'opacity-0': !error.minutes,
                }"
                class="text-red-700 lg:text-lg font-semibold text-end lg:w-1/2 transition-all order-3 lg:order-1"
              >
                تعداد دقایق باید بین 1 و 3 باشد
              </div>
              <div class="flex flex-col lg:flex-row gap-4 order-2">
                <input
                  class="bg-stone-400 border-b-2 border-stone-700 outline-0 text-lg font-semibold order-2"
                  type="text"
                  v-model="info.minutes"
                  required
                />
                <label class="lg:w-28 text-end text-lg font-semibold order-1 lg:order-3">دقیقه</label>
              </div>
            </div>
            <div class="flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
              <div
                :class="{
                  'opacity-100': error.seconds,
                  'opacity-0': !error.seconds,
                }"
                class="text-red-700 lg:text-lg font-semibold text-end lg:w-1/2 transition-all order-3 lg:order-1"
              >
                تعداد ثانیه‌ها باید بین 0 و 59 باشد
              </div>

              <div class="flex flex-col lg:flex-row gap-4 order-2">
                <input
                  class="bg-stone-400 border-b-2 border-stone-700 outline-0 text-lg font-semibold order-2"
                  type="text"
                  v-model="info.seconds"
                  required
                />
                <label class="lg:w-28 text-end text-lg font-semibold order-1 lg:order-3">ثانیه</label>
              </div>
            </div>
          </div>
          <div class="flex justify-end items-center w-full">
            <button
              @click="clickHandler"
              class="py-2 px-6 lg:px-8 text-xl text-white bg-stone-700 rounded-xl"
            >
              ادامه
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const info = reactive({ counter: 40, minutes: 2, seconds: 0 });
const error = reactive({counter:false, minutes:false, seconds:false});
const emit = defineEmits("configInfo");


function clickHandler() {
  error.counter = false;
  error.minutes = false;
  error.seconds = false;
  if (  
    info.counter >= 20 &&
    info.counter <= 60 &&
    info.minutes >= 1 &&
    info.minutes <= 3 &&
    info.seconds >= 0 &&
    info.seconds <= 59
  ) {
    info.minutes = ("0" + info.minutes).slice(-2);
    info.seconds = ("0" + info.seconds).slice(-2);
    emit("configInfo", info);
  } else {
    if (!(info.counter >= 20 && info.counter <= 60))
      error.counter = true;
    if (!(info.minutes >= 1 && info.minutes <= 3))
      error.minutes = true;
    if (!(info.seconds >= 0 && info.seconds <= 59))
      error.seconds = true;
  }
}
</script>

<style></style>
