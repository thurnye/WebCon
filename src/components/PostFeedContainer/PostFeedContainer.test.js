import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostFeedContainer from './PostFeedContainer';

describe('<PostFeedContainer />', () => {
  test('it should mount', () => {
    render(<PostFeedContainer />);
    
    const postFeedContainer = screen.getByTestId('PostFeedContainer');

    expect(postFeedContainer).toBeInTheDocument();
  });
});