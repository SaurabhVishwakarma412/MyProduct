import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    setIsAdding(true);
    try {
      await addToCart({
        _id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        description: product.description
      });
      
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } catch (error) {
      alert("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      {showNotification && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm animate-bounce">
          Added to cart!
        </div>
      )}
      
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-48 p-4 flex items-center justify-center bg-gray-50">
          <img 
            src={product.image} 
            alt={product.title}
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200';
            }}
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-sm text-gray-600 mb-1 capitalize">{product.category}</h3>
          <h2 className="font-semibold text-lg mb-2 line-clamp-2 h-14">{product.title}</h2>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-600 ml-1">
                {product.rating?.rate || '4.5'} ({product.rating?.count || '100'})
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            isAdding 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}