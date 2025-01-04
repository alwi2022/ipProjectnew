# Galaxy Com API Documentation

## Models

### User

- email : string, required, unique, isEmail
- password : string, required

### Cart

- UserId : integer, required
- ProductId : integer, required
- quantity : integer, default 0

### Product

      title : string, required
      description :string, required
      category: string, required
      price:integer, required
      discountPercentage : :integer, required
      rating:integer, required
      stock:integer, required
      images:string, required
      tags: string,required

Endpoints
List of available endpoints:

User:
POST /register
POST /login

Cart:
GET /carts
POST /carts/:productId
PUT /carts/:id
DELETE /carts/:id

Product:
router.get("/products", ProductController.GetAllProducts);
router.get("/products/:id", ProductController.GetProductById);
router.post("/products", ProductController.AddProduct);
router.delete("/products/:id",authorization ,ProductController.DeleteProduct);

# POST /register

Request:

Body:

````json

{
"email": "string",
"password": "string"
}
Response (201 - Created):

```json

{
"id": "integer",
"email": "string"
}
Response (400 - Bad Request):

```json

{
"message": "Email is required"
}
OR
{
"message": "Invalid email format"
}
OR
{
"message": "Email must be unique"
}
OR
{
"message": "Password is required"
} 2. POST /login
Request:

Body:
```json

{
"email": "string",
"password": "string"
}
Response (201 - OK):

```json

{
"access_token": "string"
}
Response (401 - Unauthorized):

```json

{
"message": "Invalid email/password"
} 3. GET /carts

Request:

Headers:
```json

{
"Authorization": "Bearer <string token>"
}
Response (200 - OK):

```json

[
{
"id": 1,
"UserId": 1,
"ProductId": 2,
"quantity": 3,
"Product": {
"name": "Eyeshadow Palette with Mirror",
"price": 50000,
"imageUrl": "https://example.com/product_a.jpg"
}
},
...
] 

4. POST /carts/:productId.

Request:

Headers:
```json

{
"Authorization": "Bearer <string token>"
}
Params:
```json

{
"productId": "integer (required)"
}
Body:
```json

{
"quantity": "integer (optional, default: 1)"
}
Response (201 - Created):

```json

{
"id": 1,
"UserId": 1,
"ProductId": 2,
"quantity": 1
}
Response (404 - Not Found):

```json

{
"message": "Product not found"

} 5. PUT /carts/:id

Request:

Headers:
```json

{
"Authorization": "Bearer <string token>"
}
Params:
```json

{
"id": "integer (required)"
}
Body:
```json

{
"quantity": "integer (required)"
}
Response (200 - OK):

```json

{
"message": "Cart updated successfully"
}
Response (404 - Not Found):

```json

{
"message": "Cart item not found"
}
Response (400 - Bad Request):

```json

 6. DELETE /carts/:id
Description:
Menghapus item dari keranjang.

Request:

Headers:
```json

{
"Authorization": "Bearer <string token>"
}
Params:
```json

{
"id": "integer (required)"
}
Response (200 - OK):

```json

{
"message": "Cart item deleted successfully"
}
Response (404 - Not Found):

```json

{
"message": "Cart item not found"
}




Global Errors
Response (401 - Unauthorized):

```json

{
"message": "Invalid token"
}
Response (500 - Internal Server Error):

```json

{
"message": "Internal server error"
}
````

