import { ImageSourcePropType } from "react-native";
import {
  SampleOOTD2Image,
  SampleOOTD3Image,
  SampleOOTD4Image,
  Item1Image,
  Item2Image,
  Item3Image,
} from "@/assets/images";

export interface MatchingItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

export interface PairingRecommendation {
  id: string;
  baseItemId: number;
  recommendedOotds: ImageSourcePropType[];
  matchingItems: MatchingItem[];
}

export const MOCK_PAIRING_DATA: Record<number, PairingRecommendation> = {
  1: {
    id: "rec_1",
    baseItemId: 1,
    recommendedOotds: [SampleOOTD2Image, SampleOOTD3Image],
    matchingItems: [
      { id: "m1", name: "H&M", image: Item1Image },
      { id: "m2", name: "허그유어스킨", image: Item2Image },
      { id: "m3", name: "미세키서울", image: Item3Image },
    ],
  },
  2: {
    id: "rec_2",
    baseItemId: 2,
    recommendedOotds: [SampleOOTD3Image, SampleOOTD4Image],
    matchingItems: [
      { id: "m1", name: "H&M", image: Item1Image },
      { id: "m2", name: "허그유어스킨", image: Item2Image },
      { id: "m3", name: "미세키서울", image: Item3Image },
    ],
  },
};
