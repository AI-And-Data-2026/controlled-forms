// src/App.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App component', () => {
  it('should render the initial title', () => {
    render(<App />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title.textContent).toBe('The full name will appear here.');
  });

  it('should update form data on input change', () => {
    render(<App />);

    const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement;
    const lastNameInput = screen.getByLabelText(/last name/i) as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
  });

  it('should update the title and clear inputs on form submission', () => {
    render(<App />);

    const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement;
    const lastNameInput = screen.getByLabelText(/last name/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /submit your name/i });

    // First, type into the inputs
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    // Then, submit the form
    fireEvent.click(submitButton);

    // Check if the title is updated
    const title = screen.getByRole('heading', { level: 2 });
    expect(title.textContent).toBe('Your name is: Jane Doe');

    // Check if the inputs are cleared
    expect(firstNameInput.value).toBe('');
    expect(lastNameInput.value).toBe('');
  });
});