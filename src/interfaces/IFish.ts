import { FishType } from "../types/FishType";

export interface IFish {
  id: string;
  name: string;
  image: string;
  type: FishType;
}

export interface IFishOption {
  label: string;
  image: string;
  type: FishType;
}
