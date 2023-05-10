export interface product {
    Stock: any;
    category: any;
    uniqueId: any;
    filterValue: any;
    classData: any;
    value: any;
    image: any;
    alt: any;
    title: any;
    productName: any;
    quantity: any;
    ratingCount: any;
    reviewCount: any;
    originalAmount: any;
    discounted: any;
    offerPercentage: any;
    rating: any;
    id: any;
    uid: any
}

export interface cart {
    image: any;
    productName: any;
    productUniqueId:any;
    title:any;
    quantity: any;
    originalAmount: any;
    id: number|undefined;
    uid: any;
    productid:number;
}

export interface order {
    image: any;
    productName: any;
    quantity: any;
    originalAmount: any;
    uid: any;
    productid:number;
}