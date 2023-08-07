import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NoMatch from './NoMatch';

describe('<NoMatch />', () => {
  test('it should mount', () => {
    render(<NoMatch />);
    
    const noMatch = screen.getByTestId('NoMatch');

    expect(noMatch).toBeInTheDocument();
  });
});