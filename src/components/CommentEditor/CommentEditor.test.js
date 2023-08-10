import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CommentEditor from './CommentEditor';

describe('<CommentEditor />', () => {
  test('it should mount', () => {
    render(<CommentEditor />);
    
    const commentEditor = screen.getByTestId('CommentEditor');

    expect(commentEditor).toBeInTheDocument();
  });
});