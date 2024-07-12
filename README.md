<!DOCTYPE html>
<html lang="en">
<head>
    
</head>
<body>

<h1>Online Store</h1>

<p>This is an online store application built with Node.js, Express, and Mongoose. The application supports three types of users: Admin, Private, and Commercial. Each account is authorized, and users can perform various operations depending on their role.</p>

<h2>Features</h2>
<ul>
    <li><strong>User Authentication</strong>: Signup, login, logout, update, and delete operations.</li>
    <li><strong>Product Management</strong>: CRUD operations for products, with restrictions based on user roles.</li>
    <li><strong>Cart Management</strong>: Add to cart and purchase options, with quantity management.</li>
    <li><strong>Public Access</strong>: Endpoint to display all products.</li>
</ul>

<h2>User Roles</h2>
<ol>
    <li><strong>Admin</strong>:
        <ul>
            <li>Can perform CRUD operations on users.</li>
            <li>Can read, update and delete products but cannot create them.</li>
        </ul>
    </li>
    <li><strong>Private</strong> and <strong>Commercial</strong>:
        <ul>
            <li>Can perform CRUD operations on products.</li>
            <li>Can add products to cart and purchase them.</li>
            <li>Can only update and delete their own accounts and products.</li>
        </ul>
    </li>
</ol>

<h2>Installation</h2>
<ol>
    <li>Clone the repository:
        <pre><code>git clone https://github.com/mdshyk/online-store.git
cd online-store</code></pre>
    </li>
    <li>Install dependencies:
        <pre><code>npm install</code></pre>
    </li>
    <li>Set up environment variables:
        <ul>
            <li>Create a <code>.env</code> file in the root directory.</li>
            <li>Add the following environment variables:
                <pre><code>PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret</code></pre>
            </li>
        </ul>
    </li>
    <li>Start the application:
        <pre><code>npm start</code></pre>
    </li>
</ol>

<h2>API Endpoints</h2>

<h3>Product Endpoints</h3>
<ul>
    <li><strong>Get All Products</strong>: <code>GET /api/products/all</code></li>
    <li><strong>Get User Products</strong>: <code>GET /api/products</code> (requires authentication)</li>
    <li><strong>Create Product</strong>: <code>POST /api/products</code> (requires authentication and admin role)</li>
    <li><strong>Get Product by ID</strong>: <code>GET /api/products/:id</code> (requires authentication)</li>
    <li><strong>Update Product</strong>: <code>PATCH /api/products/:id</code> (requires authentication)</li>
    <li><strong>Delete Product</strong>: <code>DELETE /api/products/:id</code> (requires authentication)</li>
</ul>

<h3>Cart Endpoints</h3>
<ul>
    <li><strong>Add to Cart</strong>: <code>POST /api/products/addtocart/:id</code> (requires authentication)</li>
    <li><strong>Purchase Product</strong>: <code>POST /api/products/purchase/:id</code> (requires authentication)</li>
</ul>

<h3>User Endpoints</h3>
<ul>
    <li><strong>Signup</strong>: <code>POST /api/users/signup</code></li>
    <li><strong>Login</strong>: <code>POST /api/users/login</code></li>
    <li><strong>Logout</strong>: <code>POST /api/users/logout</code></li>
    <li><strong>Get All Users</strong>: <code>GET /api/users</code> (requires authentication and admin role)</li>
    <li><strong>Get User by ID</strong>: <code>GET /api/users/:id</code> (requires authentication)</li>
    <li><strong>Update User</strong>: <code>PATCH /api/users/:id</code> (requires authentication)</li>
    <li><strong>Delete User</strong>: <code>DELETE /api/users/:id</code> (requires authentication)</li>
</ul>

<h2>Authorization</h2>
<p>A token is generated upon login and must be included in the header of all requests for authorized actions. Example:</p>
<pre><code>Authorization: Bearer your_token</code></pre>

<h2>Usage</h2>
<ol>
    <li><strong>Signup and Login</strong>:
        <ul>
            <li>Users can signup and login to get a token for authorized actions.</li>
        </ul>
    </li>
    <li><strong>Logout</strong>:
        <ul>
            <li>Users can log out, which invalidates their token. Any further attempts to perform CRUD operations will result in an error indicating the token is invalid or expired.</li>
        </ul>
    </li>
    <li><strong>Product Management</strong>:
        <ul>
            <li>Users can create, read, update, and delete their own products.</li>
            <li>Admins can read and update all products but cannot create them.</li>
        </ul>
    </li>
    <li><strong>Cart and Purchase</strong>:
        <ul>
            <li>Users can add products to their cart specifying the quantity.</li>
            <li>Users can purchase products, reducing the quantity by 1 each time.</li>
        </ul>
    </li>
    <li><strong>Public Access</strong>:
        <ul>
            <li>All products can be viewed publicly without authorization.</li>
        </ul>
    </li>
</ol>

<h2>Contributing</h2>
<p>Contributions are welcome! Please fork the repository and create a pull request with your changes.</p>

<h2>License</h2>
<p>This project is licensed under the MIT License.</p>

</body>
</html>
