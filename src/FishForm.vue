<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { IFish, IFishOption } from "./interfaces/IFish";

import goldAndPurple from "./../public/golden-purple-fish.png";
import goldfish from "./../public/goldfish.png";
import guppie from "./../public/guppie.png";
import tropicalFish from "./../public/tropical-fish.png";
import tuna from "./../public/tuna.png";

import { FISH_TYPE, FishType } from "./types/FishType";

import { v4 as uuidv4 } from "uuid";

const emits = defineEmits<{
  (event: "add-fish", fish: IFish): void;
}>();

const fishTypeOptions = ref<IFishOption[]>([
  {
    label: "Gold and purple",
    image: goldAndPurple,
    type: FISH_TYPE.GOLDEN_PURPLE,
  },
  {
    label: "Goldfish",
    image: goldfish,
    type: FISH_TYPE.GOLDFISH,
  },
  {
    label: "Guppie",
    image: guppie,
    type: FISH_TYPE.GUPPIE,
  },
  {
    label: "Tropical fish",
    image: tropicalFish,
    type: FISH_TYPE.TROPICAL,
  },
  {
    label: "Tuna",
    image: tuna,
    type: FISH_TYPE.TUNA,
  },
]);

const selectedFish = reactive({
  type: null as null | FishType,
  image: null as null | string,
  name: null as null | string,
});

const selectFish = (option: IFishOption) => {
  selectedFish.type = option.type;
  selectedFish.image = option.image;
};

const addFish = () => {
  if (selectedFish.name && selectedFish.type && selectedFish.image) {
    let fish: IFish = {
      id: uuidv4(),
      name: selectedFish.name,
      image: selectedFish.image,
      type: selectedFish.type,
    };

    emits("add-fish", fish);

    selectedFish.name = null;
    selectedFish.type = null;
    selectedFish.image = null;
  }
};

const canAddFish = computed(() => {
  return selectedFish.type && selectedFish.name;
});
</script>
<template>
  <div class="flex flex-col p-12 items-center">
    <div class="max-w-lg mb-12">
      <h1 class="text-2xl font-semibold mb-2">Fish type</h1>
      <div class="grid grid-cols-2 gap-10">
        <div
          v-for="option in fishTypeOptions"
          class="flex justify-center items-center cursor-pointer"
          @click="selectFish(option)"
        >
          <img
            :src="option.image"
            :alt="option.label"
            class="h-3/4"
            :class="
              option.type === selectedFish.type
                ? 'border-blue-400 border-2'
                : ''
            "
          />
        </div>
      </div>
    </div>
    <div class="w-full">
      <h1 class="text-2xl font-semibold mb-2">Name</h1>
      <input
        type="text"
        v-model="selectedFish.name"
        class="w-full h-12 mb-6 rounded text-black p-2 weight-semibold text-xl"
      />
      <button
        class="text-white w-full bg-red-700 h-14 font-semibold text-2xl rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-red-800 hover:cursor-pointer"
        :disabled="!canAddFish"
        @click="addFish"
      >
        Add fish
      </button>
    </div>
  </div>
</template>
<style scoped></style>
