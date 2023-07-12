import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../components/Login';

describe('Login component', () => {
  let axiosMock: MockAdapter;

  beforeAll(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  afterAll(() => {
    axiosMock.restore();
  });

  it('should render login form', () => {
    render(<Login />);
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  
    it('should display validation error for empty username', async () => {
      // Click the login button without entering a username
      fireEvent.click(screen.getByText('Login'));
  
      // Wait for the validation error message to appear
      await waitFor(() => {
        expect(screen.getByText('Username is required')).toBeInTheDocument();
      });
    });
  
    it('should display validation error for empty password', async () => {
      // Enter a username but leave the password field empty
      fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'john' } });
      fireEvent.click(screen.getByText('Login'));
  
      // Wait for the validation error message to appear
      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });
  
    it('should handle successful login', async () => {
      // Mock successful API response
      const mockResponse = { id: 1, name: 'John Doe' };
      axiosMock.onPost('http://localhost:8000/app/api/users/login').reply(200, mockResponse);
  
      fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'john' } });
      fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
      fireEvent.click(screen.getByText('Login'));
  
      // Wait for the login process to complete
      await waitFor(() => {
        expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
      });
    });
  
    it('should handle failed login due to incorrect credentials', async () => {
      // Mock failed API response (401 Unauthorized)
      axiosMock.onPost('http://localhost:8000/app/api/users/login').reply(401);
  
      fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'john' } });
      fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'wrongpassword' } });
      fireEvent.click(screen.getByText('Login'));
  
      // Wait for the error message to appear
      await waitFor(() => {
        expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
      });
    });
  
    it('should handle other API error responses', async () => {
      // Mock failed API response with a custom error message
      const errorResponse = { error: 'API error' };
      axiosMock.onPost('http://localhost:8000/app/api/users/login').reply(500, errorResponse);
  
      fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'john' } });
      fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
      fireEvent.click(screen.getByText('Login'));
  
      // Wait for the error message to appear
      await waitFor(() => {
        expect(screen.getByText('API error')).toBeInTheDocument();
      });
    });
  });