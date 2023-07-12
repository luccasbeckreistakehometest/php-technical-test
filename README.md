# php-technical-test

Introduction:
This project focuses on building a web application that manages categories and products, with an emphasis on complex features. While the core functionality is implemented, there are a few areas that can be further enhanced to improve the overall user experience and security.

Key Features Implemented:

Categories: The application allows users to view, create, and list categories. Each category contains a name and tax value.

Products: Users can manage products by adding new products and associating them with specific categories. Each product has a name, value, and category.

Sales: The application supports creating sales with multiple items. Users can add items to the sale, including the product, quantity, and tax value. The subtotal and total value of the sale is calculated dynamically.

Areas for Further Improvement:

Real-time Table Refresh: Currently, the categories and product tables do not refresh in real-time. To see the latest changes, the page needs to be manually refreshed. Implementing real-time updates would provide a more seamless user experience.

Styled Components: The application currently uses CSS files for styling. A recommended improvement is to migrate to styled-components, a popular CSS-in-JS library. Styled components offer better component encapsulation, readability, and maintainability.

Authorization Header: Enhancing the backend by implementing an authorization header would add an extra layer of security. This would involve verifying user authentication and authorizing access to protected routes, ensuring data privacy, and preventing unauthorized actions.

Conclusion:
The project successfully implements the core features of managing categories, products, and sales. However, there are opportunities for further improvements, such as implementing real-time table refresh, migrating to styled-components for improved styling, and enhancing backend security with authorization headers. By addressing these areas, the application can provide a more seamless user experience and better security measures.

## Getting Started

To get started with the Sales Management Application, you can use Docker to set up and run both the backend and frontend components easily.

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

git clone https://github.com/luccasbeckreistakehometest/php-technical-test.git

2. Navigate to the project directory:

cd php-technical-test

3. Build and run the Docker containers:

docker-compose up --build

4. Access the application in your browser at `http://localhost:3000`.

### Login Credentials

To log in to the Sales Management Application, use the following credentials:

- Username: admin
- Password: password

### What comes next

I focused on having the main features implemented to make 
