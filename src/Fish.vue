<script setup lang="ts">
// import { ref } from "vue";
import { computed, onMounted, reactive, ref } from "vue";
import { FISH_TYPE, FishType } from "./types/FishType";

import fishSkeleton from "./../public/dead.png";

const props = defineProps<{
  id: string;
  name: string;
  image: string;
  type: FishType;
}>();

const fish = reactive({
  id: "",
  name: "",
  image: "",
  type: "",
  food: 0,
  velocityX: 0,
  velocityY: 0,
  positionX: 0,
  positionY: 0,
  width: 0,
  fishAlive: true,
  direction: true,
});

const initialFood = ref(0);
const fishRef = ref<null | HTMLDivElement>(null);

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const renderFish = () => {
  changePosition();
  increaseHunger();
  if (checkCollisionX()) {
    fish.velocityX = -fish.velocityX;
    fish.direction = !fish.direction;
  }
  if (checkCollisionY()) {
    if (fish.fishAlive) {
      fish.velocityY = -fish.velocityY;
    } else {
      fish.velocityY = 0;
    }
  }
  if (!isAlive.value) {
    killFish();
  }
};

const changePosition = () => {
  fish.positionX += fish.velocityX;
  fish.positionY += fish.velocityY;
};

const checkCollisionX = () => {
  if (fishRef.value) {
    return (
      fish.positionX < 0 || fish.positionX + fishRef.value.clientWidth > 1720
    );
  } else {
    return false;
  }
};

const checkCollisionY = () => {
  if (fishRef.value) {
    return (
      fish.positionY < 0 || fish.positionY + fishRef.value.clientHeight > 1080
    );
  } else {
    return false;
  }
};

const feed = () => {
  if (fish.fishAlive) {
    fish.food = initialFood.value;
  }
};

const fishDirectionInverted = computed(() => {
  return fish.direction;
});

const increaseHunger = () => {
  if (fish.fishAlive) {
    fish.food -= 1;
  }
};

const killFish = () => {
  if (fish.fishAlive) {
    fish.velocityX = 0;
    fish.velocityY = 1;
    fish.fishAlive = false;
  }
};

const isAlive = computed(() => {
  return fish.food > 0;
});

const hungerPercentage = computed(() => {
  return (fish.food / initialFood.value) * 100;
});

const hungerColor = computed(() => {
  if (hungerPercentage.value < 0) {
    return "bg-black";
  } else if (hungerPercentage.value < 20) {
    return "bg-red-600";
  } else if (hungerPercentage.value < 40) {
    return "bg-red-500";
  } else if (hungerPercentage.value < 60) {
    return "bg-yellow-500";
  } else if (hungerPercentage.value < 80) {
    return "bg-yellow-400";
  } else {
    return "bg-green-500";
  }
});

const FEEDME = computed(() => {
  return hungerPercentage.value < 20;
});

onMounted(() => {
  initialFood.value = getRandomInt(1000, 1500);

  fish.id = props.id;
  fish.name = props.name;
  fish.image = props.image;
  fish.type = props.type;
  fish.food = initialFood.value;
  fish.positionX = getRandomInt(100, 1620);
  fish.positionY = getRandomInt(100, 980);
  fish.velocityX = getRandomInt(-100, 100) / 10;
  fish.velocityY = getRandomInt(-100, 100) / 10;
  fish.width = getRandomInt(10, 15);

  setInterval(() => {
    renderFish();
  }, 1000 / 60);
});
</script>

<template>
  <div
    class="absolute"
    :style="{
      width: `${fish.width}rem`,
      left: `${fish.positionX}px`,
      top: `${fish.positionY}px`,
    }"
  >
    <div class="flex flex-col hover:cursor-pointer" ref="fishRef" @click="feed">
      <div v-if="FEEDME" class="relative mb-3">
        <div
          class="flex justify-center text-2xl weight-bold rounded-full p-3 bg-white text-black"
        >
          <div v-if="fish.fishAlive">Feed me!</div>
          <div v-else>💀💀💀</div>
        </div>
        <div
          class="absolute -bottom-3 left-1/2 -translate-x-1/2 h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-white rotate-180"
        ></div>
      </div>
      <img
        v-if="fish.fishAlive"
        :src="image"
        alt=""
        class="h-full"
        :class="fishDirectionInverted ? '-scale-x-[1]' : ''"
      />
      <img
        v-else
        :src="fishSkeleton"
        alt=""
        class="h-full"
        :class="fishDirectionInverted ? '-scale-x-[1]' : ''"
      />
      <div
        class="inline p-2 bg-black text-white ml-auto mr-auto rounded bg-opacity-70 text-xl weight-bold"
      >
        {{ name }}
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          class="h-2.5 rounded-full"
          :class="hungerColor"
          :style="{ width: `${hungerPercentage}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
