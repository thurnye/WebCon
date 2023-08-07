import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CopyRight from './CopyRight';

describe('<CopyRight />', () => {
  test('it should mount', () => {
    render(<CopyRight />);
    
    const copyRight = screen.getByTestId('CopyRight');

    expect(copyRight).toBeInTheDocument();
  });
});