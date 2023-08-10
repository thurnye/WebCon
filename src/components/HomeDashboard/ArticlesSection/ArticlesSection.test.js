import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ArticlesSection from './ArticlesSection';

describe('<ArticlesSection />', () => {
  test('it should mount', () => {
    render(<ArticlesSection />);
    
    const articlesSection = screen.getByTestId('ArticlesSection');

    expect(articlesSection).toBeInTheDocument();
  });
});