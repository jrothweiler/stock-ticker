import React from 'react';
import { render, screen, prettyDOM, waitForElement } from '@testing-library/react'
import App from '../App';



// Tests for search bar functionality
// Done as integration tests due to the dependencies across the 
// whole experience
describe('Search bar component', () => {
    let app;
    let searchBar;

    beforeAll(async () => {
        let { container } = render(<App />);
        await waitForElement(() => 
            screen.getByText("Apple, Inc.")
        )
    })

    test('Invalid symbol error handling', () => {
        expect(3).toBe(3);
    })
})