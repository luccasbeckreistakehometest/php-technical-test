import { useEffect, useState } from 'react';
import axios from 'axios';
import { CategoryFormValues, Category } from '../types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../styles/CategoryPage.css'

const categorySchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    tax_value: yup.number().required('Tax value is required'),
  });

const CategoryList = ({ refreshCategories }) => {
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

  return (
    <div>
    <h2 className="title">Categories</h2>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Tax Value</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.tax_value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

const CreateCategoryForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CategoryFormValues>({
    resolver: yupResolver(categorySchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      // Make API call to create a new category
      const response = await axios.post(
        'http://localhost:8000/app/api/categories',
        data
      );

      if (response.status === 200) {
        console.log('Category created successfully');
        navigate('/categories');
      }
    } catch (error) {
      console.error('Category creation error:', error);
    }
  };

  return (
    <div className="form">
      <h2 className="title">Create Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="label">Name:</label>
          <input type="text" className="input" {...register('name')} />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label className="label">Tax Value:</label>
          <input type="number" step="0.01" className="input" {...register('tax_value')} />
          {errors.tax_value && <span className="error-message">{errors.tax_value.message}</span>}
        </div>
        <div className="form-group">
          <button type="submit" className="button">Create Category</button>
        </div>
      </form>
    </div>
  );
};

const CategoryPage = () => {
    const navigate = useNavigate();

    const goToWelcome = () => {
      navigate('/welcome');
    };
  return (
    <div className="category-page">
      <CategoryList />
      <CreateCategoryForm />
      <button className="go-to-welcome" onClick={goToWelcome}>Go to Welcome Page</button>
    </div>
  );
};

export default CategoryPage;