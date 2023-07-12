import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../context/AuthContext';
import { FormValues } from '../types';
// import '../styles/Login.css';

const schema = yup.object().shape({
  name: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: FormValues) => {
    try {
      // Make API call to the login endpoint
      const response = await axios.post('http://localhost:8000/app/api/users/login', data);

      // Redirect to the welcome page if login is successful
      if (response.status === 200) {
        login({ id: 1, name: data.name });
        navigate('/welcome');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" {...register('password')} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;