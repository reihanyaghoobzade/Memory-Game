<template>
  <div
    class="flex justify-center items-center bg-transparent rounded-xl absolute top-0 w-full h-full z-20"
  >
    <div class="container mx-auto">
      <div class="w-3/5 mx-auto py-8 px-6 rounded-lg bg-stone-400">
        <div class="flex flex-col justify-center items-end gap-8">
          <p class="text-lg font-semibold text-end">
            تنظیمات را انجام نداده‌اید، با تنظیمات پیش‌فرض یا قبل ادامه می‌دهید؟
          </p>
          <div class="flex justify-end items-center gap-8 w-full">
            <button
              @click="clickHandler"
              class="py-2 px-6 lg:px-8 text-xl text-white bg-stone-700 rounded-xl"
            >
              ادامه
            </button>
            <button
              @click="router.replace({ path: '/' })"
              class="py-2 px-6 lg:px-8 text-xl text-white bg-stone-700 rounded-xl"
            >
              تغییر
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const emit = defineEmits();

function clickHandler() {
  emit("continue");
}
</script>

<style></style>
