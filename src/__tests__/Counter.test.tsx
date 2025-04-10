import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../components/Counter';

test('카운터가 +1 버튼 클릭 시 증가해야 한다', () => {
  render(<Counter />);

  const countText = screen.getByTestId('count');
  const button = screen.getByText('+1');

  expect(countText.textContent).toBe('0');

  fireEvent.click(button);

  expect(countText.textContent).toBe('1');
});
