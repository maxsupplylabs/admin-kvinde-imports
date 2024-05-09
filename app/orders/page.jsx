"use client"
import ProductsWithOrders from "@/components/admin/productsWithOrders"
const ProductOrders = () => {
/**
 https://demostoreproject.vercel.app/9lelectriccookingpot_5122

MOQ20
Quin, 5,  ... Paid
Jimmy, 1,  ... Payment pending

https://demostoreproject.vercel.app/totebagshoppingbag_1939

MOQ1
Jimmy, 1, Yellow, ... Payment pending
Quin, 1, Blue, ... Payment pending
Quin, 2, Blue, ... Paid
Jimmy, 2, Blue, ... Payment pending
 */
  return (
    <div>
      <h1 className="text-2xl font-semibold">Ordered products</h1>
      <ProductsWithOrders />
    </div>
  );
};
export default ProductOrders;