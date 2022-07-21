<template>
    <div
      class="relative cursor-pointer"
      :class="{ flipped: active }"
      @click="clickHandler(this.image)"
    >
      <img :src="image.img" alt="" class="rounded-md front absolute w-full h-20 sm:h-24 md:h-28 lg:h-auto object-cover" />
      <div
        class="back rounded-md flex items-center justify-center w-full h-20 sm:h-24 md:h-28 lg:h-auto md:p-12 bg-cyan-800 font-seemibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white"
      >
        {{ index + 1 }}
      </div>
    </div>
</template>

<script setup>
const props = defineProps({
  image: Object,
  index: Number,
  active: Boolean 
});
const emit = defineEmits(["onClick"]);

function clickHandler(image) {
  if (!props.active) {
    // console.log(props.active)
    emit("onClick", image);
  }
}
</script>

<style scoped>
.front {
  transform: rotateY(90deg);
  transition: all ease-in 0.2s;
}
.flipped .front {
  transform: rotateY(0deg);
  transition-delay: 0.2s;
}
.back {
  transition: all ease-in 0.2s;
  transition-delay: 0.2s;
}
.flipped .back {
  transform: rotateY(90deg);
  transition-delay: 0s;
}
</style>
