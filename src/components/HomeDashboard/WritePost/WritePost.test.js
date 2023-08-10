import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WritePost from './WritePost';

describe('<WritePost />', () => {
  test('it should mount', () => {
    render(<WritePost />);
    
    const writePost = screen.getByTestId('WritePost');

    expect(writePost).toBeInTheDocument();
  });
});