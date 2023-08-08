import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Friend from './Friend';

describe('<Friend />', () => {
  test('it should mount', () => {
    render(<Friend />);
    
    const friend = screen.getByTestId('Friend');

    expect(friend).toBeInTheDocument();
  });
});