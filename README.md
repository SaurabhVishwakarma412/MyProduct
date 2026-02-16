#E-Commerce Website

# Front-End
```
frontend/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Checkout.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── .env
```
Back-End
```
backend/
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── orderController.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── server.js
├── package.json
└── .env
```
