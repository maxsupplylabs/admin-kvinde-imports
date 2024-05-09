"use client"
import Image from "next/image"
import { Button } from "../ui/button";
import { useAllOrderedProducts } from "@/hooks/useAllOrders"
import { toast } from "react-hot-toast";

const ProductsWithOrders = () => {

// Function to construct the text to be copied to clipboard
const constructCopyText = (productWithOrder) => {
  const { productId, orders } = productWithOrder;
  const min = productWithOrder.orders[0].moq ? `${productWithOrder.orders[0].moq}` : "1"
  // const min = orders.map(order => {
  //   return order.moq ? `${order.moq}` : "0";
  // })
  const orderTexts = orders.map(order => {
    // const moq = order.moq ? `${order.moq}` : "";
    const name = order.buyerName ? `${order.buyerName},` : "";
    const quantity = order.quantity ? `${order.quantity},` : "";
    const variationColor = order.variations.Color ? `${order.variations.Color},` : "";
    const variationSize = order.variations.Size ? `${order.variations.Size},` : "..."; 
    const paid = order.paid ? "Paid" : "Payment pending"
    return `${name} ${quantity} ${variationColor} ${variationSize} ${paid}`;
  }).join("\n");
  return `https://demostoreproject.vercel.app/${productId}\n\nMOQ${min}\n${orderTexts}`;
};

  // Function to handle copying text to clipboard
  const copyToClipboard = (productWithOrder) => {
    const copyText = constructCopyText(productWithOrder);
    // clipboard.writeText("hello world");
    navigator.clipboard.writeText(copyText).then(() => {
    toast.success(`Order information copied.`);
    }).catch((error) => {
      console.error("Error copying to clipboard:", error);
    toast.error(`Error occured. Refresh.`);
    });
  };

  const { orderedProducts, isLoading, isError } = useAllOrderedProducts();
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
  }

  return (
    <div>
    {/* Render products with orders */}
    {orderedProducts.map((productWithOrders) => (
      <div key={productWithOrders.productId}>
        <h3>Product ID: {productWithOrders.productId}</h3>
        {/* Render product image */}
        <Image
          className="h-16 w-20 rounded-md object-cover"
          src={productWithOrders.orders[0].image.src} // Render the first order's image
          width={60}
          height={80}
          alt={productWithOrders.orders[0].image.alt} // Use the product name from the first order
        />
        {/* Render copy button */}
        <Button onClick={() => copyToClipboard(productWithOrders)}>Copy Info</Button>
        {/* Render orders for the product */}
        <ul>
          {productWithOrders.orders.map((order, index) => (
            <li key={index}>
              <p>Order ID: {order.orderId}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Color: {order.variations.Color}, {order.variations.size}</p>
              <p>Size: {order.variations.size}</p>
              <p>Date: {order.timestamp.toDate().toLocaleDateString()}</p>
              <p>Customer: {order.buyerName}</p>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>

  );
};

export default ProductsWithOrders;