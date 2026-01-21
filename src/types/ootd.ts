export type OotdCategory =
    | "상의"
    | "하의"
    | "한벌 옷"
    | "아우터"
    | "신발";

export interface OotdItem {
    id: number;
    name: string;
    image: any;
    category: OotdCategory;
}