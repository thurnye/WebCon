import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchContainer from './SearchContainer';

describe('<SearchContainer />', () => {
  test('it should mount', () => {
    render(<SearchContainer />);
    
    const searchContainer = screen.getByTestId('SearchContainer');

    expect(searchContainer).toBeInTheDocument();
  });
});