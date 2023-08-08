import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Friends from './Friends';

describe('<Friends />', () => {
  test('it should mount', () => {
    render(<Friends />);
    
    const friends = screen.getByTestId('Friends');

    expect(friends).toBeInTheDocument();
  });
});