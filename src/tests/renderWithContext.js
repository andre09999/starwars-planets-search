import { render } from "@testing-library/react";
import React from "react";
import Provider from "../context/Provider"

function renderWithContext(component) {
  return(
    render(
      <Provider>
        {component}
      </Provider>
    )
  )
}

export default renderWithContext;
