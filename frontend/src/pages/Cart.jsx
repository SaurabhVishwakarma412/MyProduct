import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      {cart.map((item, index) => (
        <p key={index}>{item.name} - {item.price}</p>
      ))}
    </div>
  );
}