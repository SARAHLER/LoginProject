export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  // Add the picture property to the Product interface
  export interface ProductWithPicture extends Product {
    picture: string;
  }