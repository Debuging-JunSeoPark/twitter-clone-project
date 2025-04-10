import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../routes/login'; // 경로는 실제 파일명에 맞게 조정
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Firebase mocking
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(() => Promise.resolve()),
}));

// Router mocking
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test('로그인 입력 후 버튼 클릭 시 Firebase 로그인 함수 호출됨', async () => {
  renderWithRouter(<LoginForm />);

  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const loginButton = screen.getByDisplayValue('Log in'); // ✅ 로그인 버튼

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });
  fireEvent.click(loginButton);

  await waitFor(() => {
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(), // auth
      'test@example.com',
      '123456'
    );
  });
});
