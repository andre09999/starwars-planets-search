import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Mock from './Mock';
import userEvent from '@testing-library/user-event';
import renderWithContext from './renderWithContext';

beforeEach(() => global.fetch = jest.fn(async () => ({
  json: async () => Mock,
})));

afterEach(() => jest.clearAllMocks());

describe('Testes Input', () => {

  test('Input tests', async() => {
    await waitFor(() => renderWithContext(<App />));
    const textFilter = screen.getByRole('textbox')
    userEvent.type(textFilter, 'o');
    expect(textFilter).toBeInTheDocument();
    const column = screen.getByTestId("column-filter");
    userEvent.selectOptions(column, ['population'])
    const compare = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(compare, ['maior que'])
    const value = screen.getByTestId("value-filter");
    userEvent.type(value, '5');
    const buttonFilter = screen.getByTestId("button-filter");
    userEvent.click(buttonFilter)
    const removeFilter = screen.getByTestId("button-remove-filters");
    expect(column).toBeInTheDocument();
    expect(compare).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(removeFilter).toBeInTheDocument();
    userEvent.click(removeFilter);
  });

  test('Teste Filtro 2', async() => {
    await waitFor(() => renderWithContext(<App />));
    const buttonFilter = screen.getByTestId("button-filter");
    const column = screen.getByTestId("column-filter");
    const compare = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(compare, ['igual a'])
    const value = screen.getByTestId("value-filter");
    userEvent.selectOptions(column, ['population']);
    userEvent.type(value, '50000');
    userEvent.click(buttonFilter);
  })
  test('Teste Filtro 3', async() => {
    await waitFor(() => renderWithContext(<App />));
    const compare = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(compare, ['menor que'])
    const buttonFilter = screen.getByTestId("button-filter");
    const column = screen.getByTestId("column-filter");
    const value = screen.getByTestId("value-filter");
    userEvent.selectOptions(column, ['population']);
    userEvent.type(value, '50000');
    userEvent.click(buttonFilter);
    const deletebtn = screen.getByTestId("delete-btn");
    userEvent.click(deletebtn);
  })
})
