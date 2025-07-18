export type Category = {
  id: string;
  name: string;
  status: boolean;
  created_at: string;
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  stock: string; // API returns string, we'll convert to number in components
  description: string;
  price: string; // API returns string, we'll convert to number in components
  image_url: string;
  status: boolean;
  created_at: string;
  tbl_categories: Category;
};

// Transformed Product type for components (with converted types and computed fields)
export type TransformedProduct = {
  id: string;
  name: string;
  price: number;
  category: string; // Category name from tbl_categories.name
  categoryId: string; // From category_id
  stock: number;
  description: string;
  image: string; // From image_url
  createdAt: string; // From created_at
  updatedAt?: string;
};
