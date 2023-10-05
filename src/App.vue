<script setup lang="ts">
import { ref } from "vue";
import Aquarium from "./Aquarium.vue";
import FishForm from "./FishForm.vue";
import { IFish } from "./interfaces/IFish";
import Fish from "./Fish.vue";

// import guppie from "../public/guppie.png";

const fishes = ref<IFish[]>([]);

const addFish = (fish: IFish) => {
  fishes.value.push(fish);
};
</script>
<template>
  <div class="flex items-center h-screen w-screen">
    <FishForm
      class="flex-1 h-[1080px] text-white bg-blue-900"
      @add-fish="addFish"
    ></FishForm>
    <Aquarium class="h-[1080px] w-[1720px] relative">
      <template #fish>
        <Fish v-if="fishes.length" v-for="fish in fishes" v-bind="fish"></Fish>
      </template>
    </Aquarium>
  </div>
</template>
<style>
body {
  background-color: #203d7f;
}
</style>
