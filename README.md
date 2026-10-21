# Shop Frontend (React + Vite + Tailwind)

## Run
```
npm install
npm run dev      # http://localhost:5173
```
Set backend URL in `.env`: `VITE_API_URL=http://localhost:8000`

## Structure
- `src/api/` — axios client (JWT interceptor) + one function per route
- `src/context/` — AuthContext, CartContext
- `src/pages/` — Home, ProductDetail, AuthPage, Cart, Orders
- `src/components/` — Navbar, ProductCard, ui helpers

## Backend assumptions (edit in `src/api/index.js`)
- Login: JSON `{email, password}` -> `{access_token}`. Form-encoded variant is commented in.
- Cart add: `POST /cart/items` body `{product_id, quantity}`.
- Product fields: `id, name, description, price, stock, category, image_url`.
