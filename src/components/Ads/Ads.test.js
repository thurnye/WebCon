import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Ads from './Ads';

describe('<Ads />', () => {
  test('it should mount', () => {
    render(<Ads />);
    
    const ads = screen.getByTestId('Ads');

    expect(ads).toBeInTheDocument();
  });
});