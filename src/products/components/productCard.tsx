"use client";
// https://tailwindcomponents.com/component/e-commerce-product-card
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";
import { Star } from ".";
import { RemoveProductFromCart, addProductCart } from "@/shopping-cart/actions/actions";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export const ProductCard = ({ id, image, name, price, rating }: Props) => {
  const router = useRouter()
  
  const onAddToCart = () => {
    addProductCart(id);
    router.refresh()
  };

  const onRemoveFromCart = () =>{
    RemoveProductFromCart(id)
    router.refresh();
  }
  
  return (
    <div className="shadow rounded-lg max-w-sm bg-gray-800 border-gray-100">
      {/* Product Image */}
      <div className={`p-2`} >
        <Image
          width={500}
          height={500}
          className="rounded"
          src={image}
          alt="product image"
        />
      </div>

      {/* Title */}
      <div className="px-5 pb-5">
        <Link href="#">
          <h3 className=" font-semibold text-xl tracking-tight text-white">
            {name}
          </h3>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          {/* Stars */}

          {Array(rating)
            .fill(0)
            .map((x, i) => (
              <Star key={i} />
            ))}

          {/* Rating Number */}
          <span className="  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3">
            {rating.toFixed(2)}
          </span>
          
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between overflow-hidden">
          <span className="text-base lg:text-2xl font-bold  text-white">${price.toFixed(2)}</span>
              
          <div className="flex">
            <button
              onClick={onAddToCart}
              className="text-white mr-2  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              <IoAddCircleOutline size={25} />
            </button>
            <button 
            onClick={onRemoveFromCart}
            className="text-white bg-red-700  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center  hover:bg-red-700 focus:ring-red-800">
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
