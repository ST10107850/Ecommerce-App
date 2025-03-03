export interface AuthState {
  isAuthenticated: boolean;
  userInfo: {
    _id: string;
    firstName: string;
    email: string;
    address: string;
    role: string;
    status: string;
    profileImage: string;
    lastName: string;
    idNumber: number;
    phone: number;
  } | null;
}

export interface RootState {
  auth: AuthState;
}

export interface CategoriesType {
  _id: string;
  categoryName: string; // Fixed typo from 'cateogyName' to 'categoryName'
  ImageUri: string;
  createdAt: string;
  userId: string;
}

export interface ProductTypes {
  _id: string;
  categoryId: string;
  productName: string;
  ImageUri: string[];
  description: string;
  price: number;
  colours: string[];
  size: string[];
  createdAt: string;
  lastName: string;
  fistName: string;
  userId: string;
  discount: number;
  categoryName: string;
}

export interface UsersTypes {
  _id: string;
  status: string;
  firstName: string;
  email: string;
  address: ShippingAddress;
  lastName: string;
  role: string;
  createdAt: string;
  phone: number;
  idNumber: number;
  profileImage: string;
}

export interface Item {
  productId: string;
  quantity: number;
  productName: string;
}

export interface ShippingAddress {
  addressId: string;
  street: string;
  town: string;
  city: string;
  postalCode: number;
}
export interface Orders {
  _id: string;
  userId: UsersTypes;
  shippingAddress: ShippingAddress;
  items: Item[];
  deliveryOption: "delivery" | "pickup";
  paymentMethod: "card" | "cash";
  totalAmount: number;
  taxAmount: number;
  deliveryFee: number;
  discount: number;
  orderNumber: number;
  orderStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled"; // Order status
  createdAt: string;
}
