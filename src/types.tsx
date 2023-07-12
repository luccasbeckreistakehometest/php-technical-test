export interface FormValues {
    name: string;
    password: string;
  }
  
  export interface User {
    id: number;
    name: string;
  }

  export interface CategoryFormValues {
    name: string;
    tax_value: number;
  }
  
  export interface Category {
    id: number;
    name: string;
    tax_value: number;
  }
export interface ProductFormValues {
  name: string;
  value: number;
  category_id: number;
}

export interface Product {
  id: number;
  name: string;
  value: number;
  category_id: number;
}

export type SaleItem = {
  productId: number | string;
  quantity: number;
  taxValue: number;
  subtotal: number;
};

export interface Sale {
  id: number;
  totalValue: number;
  items: SaleItem[];
}