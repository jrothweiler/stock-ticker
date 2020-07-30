import React from 'react';
import { render, cleanup, screen, prettyDOM, waitForElement, fireEvent } from '@testing-library/react'
import App from '../App';



// Tests for search bar functionality
// Done as integration tests due to the dependencies across the 
// whole experience
describe('Search bar component', () => {
    let app;

    beforeEach(async () => {
        const { container } = render(<App />);
        app = container;
        await waitForElement(() => 
            screen.getByText("Apple, Inc.")
        )
    })

    afterEach(cleanup);

    test('Clicking on the company text focuses the form', () => {
        const companyText = screen.getByText('Apple, Inc.')
        fireEvent.click(companyText);
        const input = screen.getByRole('textbox');
        expect(input === document.activeElement).toBe(true);
    })

    test('focusing on the form removes the company text', () => {
        const companyText = screen.queryByText('Apple, Inc.');
        const input = screen.queryByRole('textbox');
        expect(companyText).toBeInTheDocument();
        fireEvent.focus(input);
        expect(companyText).not.toBeInTheDocument();
    })

    test('Badly formatted symbols are stopped client side', () => {
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: "jklasjdf&^^^" }});
        fireEvent.submit(input);
        
        // submitting causes error text to show
        expect(screen.getByText('Not a valid input, searches should contain only letters')).toBeInTheDocument();
        
        // value is still in the box
        expect(input.value).toBe('jklasjdf&^^^')
    })

    test('Nonexistent symbols are stopped server side', async () => {
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: "BADSYMBOL" }});
        fireEvent.submit(input);
        
        // submitting causes error text to show
        await waitForElement(() => screen.getByText('Error in search: Symbol BADSYMBOL does not exist'))
        
        // value is removed from the box, since the search did go through
        expect(input.value).toBe('');
        // old data is still there, since the search failed
        expect(screen.queryByText('Apple, Inc.')).toBeInTheDocument();
    })

    test('Unfocusing when there is no text shows the company name again', async () => {
        const companyText = screen.queryByText('Apple, Inc.');
        const input = screen.queryByRole('textbox');
        expect(companyText).toBeInTheDocument();
        fireEvent.click(companyText);
        expect(input === document.activeElement).toBe(true);
        expect(companyText).not.toBeInTheDocument();
        input.blur();

        await waitForElement(() => companyText);
        expect(screen.queryByText('Apple, Inc.')).toBeInTheDocument()
    })
})