import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FeedsSection from './FeedsSection';

describe('<FeedsSection />', () => {
  test('it should mount', () => {
    render(<FeedsSection />);
    
    const feedsSection = screen.getByTestId('FeedsSection');

    expect(feedsSection).toBeInTheDocument();
  });
});