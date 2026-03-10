import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Cart } from "@/types/cart";
import { createCart, updateCart, getCartsByUser } from "@/services/cart";

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  isHydrated: boolean;
}

interface CartActions {
  initializeCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => void;
  setHydrated: () => void;
}

export type CartStore = CartState & CartActions;

const USER_ID = 1;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      isHydrated: false,

      setHydrated: () => {
        set({ isHydrated: true });
      },

      initializeCart: async () => {
        const { cart } = get();
        if (cart) return;

        set({ isLoading: true });
        try {
          const response = await getCartsByUser(USER_ID);
          if (response.carts && response.carts.length > 0) {
            set({ cart: response.carts[0] });
          }
        } catch (error) {
          console.error("Failed to load cart:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      addToCart: async (productId: number, quantity: number = 1) => {
        const { cart } = get();

        try {
          if (!cart) {
            const newCart = await createCart({
              userId: USER_ID,
              products: [{ id: productId, quantity }],
            });
            set({ cart: newCart });
          } else {
            const existingProduct = cart.products.find((p) => p.id === productId);
            const products = existingProduct
              ? cart.products.map((p) =>
                  p.id === productId
                    ? { id: p.id, quantity: p.quantity + quantity }
                    : { id: p.id, quantity: p.quantity }
                )
              : [
                  ...cart.products.map((p) => ({ id: p.id, quantity: p.quantity })),
                  { id: productId, quantity },
                ];

            const updatedCart = await updateCart(cart.id, { products });
            set({ cart: updatedCart });
          }
        } catch (error) {
          console.error("Failed to add to cart:", error);
          throw error;
        }
      },

      updateQuantity: async (productId: number, quantity: number) => {
        const { cart } = get();
        console.log("Store updateQuantity called:", { productId, quantity, cart });

        if (!cart) {
          console.log("No cart found");
          return;
        }

        const updatedProducts = cart.products.map((p) => {
          if (p.id === productId) {
            const newQuantity = quantity;
            const newTotal = p.price * newQuantity;
            const newDiscountedTotal = newTotal * (1 - p.discountPercentage / 100);
            return {
              ...p,
              quantity: newQuantity,
              total: newTotal,
              discountedTotal: newDiscountedTotal,
            };
          }
          return p;
        });

        const newTotal = updatedProducts.reduce((sum, p) => sum + (p.total || p.price * p.quantity), 0);
        const newDiscountedTotal = updatedProducts.reduce(
          (sum, p) => sum + (p.discountedTotal || p.total || p.price * p.quantity),
          0
        );

        const updatedCart: Cart = {
          ...cart,
          products: updatedProducts,
          total: newTotal,
          discountedTotal: newDiscountedTotal,
          totalQuantity: updatedProducts.reduce((sum, p) => sum + p.quantity, 0),
        };

        console.log("Updated cart (client-side):", updatedCart);
        set({ cart: updatedCart });
      },

      removeFromCart: async (productId: number) => {
        const { cart } = get();
        if (!cart) return;

        const updatedProducts = cart.products.filter((p) => p.id !== productId);

        if (updatedProducts.length === 0) {
          get().clearCart();
          return;
        }

        const newTotal = updatedProducts.reduce((sum, p) => sum + (p.total || p.price * p.quantity), 0);
        const newDiscountedTotal = updatedProducts.reduce(
          (sum, p) => sum + (p.discountedTotal || p.total || p.price * p.quantity),
          0
        );

        const updatedCart: Cart = {
          ...cart,
          products: updatedProducts,
          total: newTotal,
          discountedTotal: newDiscountedTotal,
          totalProducts: updatedProducts.length,
          totalQuantity: updatedProducts.reduce((sum, p) => sum + p.quantity, 0),
        };

        set({ cart: updatedCart });
      },

      clearCart: () => {
        set({ cart: null });
      },
    }),
    {
      name: "luna-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

export const getCartItemsCount = (state: CartStore) => state.cart?.totalQuantity || 0;
