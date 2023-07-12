import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductFormValues, Product, Category } from '../types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const productSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  value: yup.number().required('Value is required'),
  category_id: yup.number().required('Category is required'),
});

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/app/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/app/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const category = categories.find((c) => c.id === product.category_id);
            const categoryName = category ? category.name : '';

            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.value}</td>
                <td>{categoryName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const CreateProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormValues>({
    resolver: yupResolver(productSchema),
  });
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/app/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      // Make API call to create a new product
      const response = await axios.post(
        'http://localhost:8000/app/api/products',
        data
      );

      if (response.status === 200) {
        console.log('Product created successfully');
        navigate('/products');
      }
    } catch (error) {
      console.error('Product creation error:', error);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label>Value:</label>
          <input type="number" step="0.01" {...register('value')} />
          {errors.value && <span>{errors.value.message}</span>}
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select {...register('category_id')}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && <span>{errors.category_id.message}</span>}
        </div>
        <div className="form-group">
          <button type="submit">Create Product</button>
        </div>
      </form>
    </div>
  );
};

const ProductPage = () => {
    const navigate = useNavigate();

    const goToWelcome = () => {
      navigate('/welcome');
    };
  return (
    <div>
      <ProductList />
      <CreateProductForm />
      <button onClick={goToWelcome}>Go to Welcome Page</button>
    </div>
  );
};

export default ProductPage;
