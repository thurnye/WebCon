import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostFeeds from './PostFeeds';

describe('<PostFeeds />', () => {
  test('it should mount', () => {
    render(<PostFeeds />);
    
    const postFeeds = screen.getByTestId('PostFeeds');

    expect(postFeeds).toBeInTheDocument();
  });
});