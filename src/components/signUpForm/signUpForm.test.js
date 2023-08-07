import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUpForm from './SignUpForm';

describe('<SignUpForm />', () => {
  test('it should mount', () => {
    render(<SignUpForm />);
    
    const signUpForm = screen.getByTestId('SignUpForm');

    expect(signUpForm).toBeInTheDocument();
  });
});