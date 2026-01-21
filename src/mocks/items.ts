export interface Item {
    id: number;
    name: string;
    category: string;
    detail: string;
    image: any;
}

export const ITEMS: Item[] = [
    {
        id: 1,
        name: "Thisisneverthat",
        category: "상의",
        detail: "반팔티",
        image: require("@/assets/clothes/sample1.png"),
    },
    {
        id: 2,
        name: "Ralph Lauren",
        category: "상의",
        detail: "후드티",
        image: require("@/assets/clothes/sample2.png"),
    },
    {
        id: 3,
        name: "브랜드명입니다",
        category: "하의",
        detail: "청바지",
        image: require("@/assets/clothes/sample3.png"),
    },
    {
        id: 4,
        name: "브랜드명",
        category: "아우터",
        detail: "무스탕",
        image: require("@/assets/clothes/sample4.png"),
    },
    {
        id: 5,
        name: "루이비통",
        category: "신발",
        detail: "기타",
        image: require("@/assets/clothes/sample5.png"),
    },
    {
        id: 6,
        name: "잔스포츠",
        category: "악세서리",
        detail: "가방",
        image: require("@/assets/clothes/sample6.png"),
    },
    {
        id: 7,
        name: "탑텐",
        category: "상의",
        detail: "니트",
        image: require("@/assets/clothes/sample7.png"),
    },
    {
        id: 8,
        name: "샵사이다",
        category: "상의",
        detail: "니트",
        image: require("@/assets/clothes/sample8.png"),
    },
    {
        id: 9,
        name: "샵사이다",
        category: "상의",
        detail: "크롭탑",
        image: require("@/assets/clothes/sample9.png"),
    },
    {
        id: 10,
        name: "몽글몽글",
        category: "하의",
        detail: "청바지",
        image: require("@/assets/clothes/sample10.png"),
    },
    {
        id: 11,
        name: "중고샵",
        category: "하의",
        detail: "치마",
        image: require("@/assets/clothes/sample11.png"),
    },
    {
        id: 12,
        name: "샵사이다",
        category: "악세서리",
        detail: "가방",
        image: require("@/assets/clothes/sample12.png"),
    },
    {
        id: 13,
        name: "테무",
        category: "악세서리",
        detail: "가방",
        image: require("@/assets/clothes/sample13.png"),
    },
    {
        id: 14,
        name: "테무",
        category: "악세서리",
        detail: "가방",
        image: require("@/assets/clothes/sample14.png"),
    },
    {
        id: 15,
        name: "중고샵",
        category: "악세서리",
        detail: "가방",
        image: require("@/assets/clothes/sample15.png"),
    },
];