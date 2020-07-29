import React from 'react';
import { render, screen, prettyDOM, waitForElement, fireEvent } from '@testing-library/react'
import App from '../App';



// Tests for search bar functionality
// Done as integration tests due to the dependencies across the 
// whole experience
describe('Search bar component', () => {
    let app;
    let searchBar;

    beforeEach(async () => {
        let { container } = render(<App />);
        await waitForElement(() => 
            screen.getByText("Apple, Inc.")
        )
    })

    test('Clicking on the company text focuses the form', () => {
        const companyText = screen.getByText('Apple, Inc.')
        fireEvent.click(companyText);
        const input = screen.getByRole('textbox');
        expect(input === document.activeElement).toBeTruthy();
    })

    test('focusing on the form removes the company text', () => {
        const companyText = screen.queryByText('Apple, Inc.');
        const input = screen.queryByRole('textbox');
        expect(companyText).toBeInTheDocument();
        fireEvent.focus(input);
        expect(companyText).not.toBeInTheDocument();
    })

    test('Badly formatted symbols are stopped client side', async () => {
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: "jklasjdf&^^^" }});
        fireEvent.submit(input);
        await waitForElement(() => screen.getByText('Not a valid input, searches should contain only letters'))
        
        // value is still in the box
        expect(input.value).toBe('jklasjdf&^^^')
    })
})