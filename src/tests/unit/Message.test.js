import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from '../../components/Message';

describe('Message component', () => {
  test('renders user message with correct styling and text', () => {
    render(<Message text="Hello!" user="user" />);

    const container = screen.getByRole('container');

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('message user');
    expect(container).toHaveTextContent('You: Hello!');
  });

  test('renders bot message with correct styling and text', () => {
    render(<Message text="Hello, how can I help you?" user="bot" />);

    const container = screen.getByRole('container');

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('message bot');
    expect(container).toHaveTextContent('Bot: Hello, how can I help you?');
  });
});
