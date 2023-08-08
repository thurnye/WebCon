import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InfoSection from './InfoSection';

describe('<InfoSection />', () => {
  test('it should mount', () => {
    render(<InfoSection />);
    
    const infoSection = screen.getByTestId('InfoSection');

    expect(infoSection).toBeInTheDocument();
  });
});