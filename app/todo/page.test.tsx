import { render, screen } from "@testing-library/react";
import Page from "./page";
import { randomUUID } from "crypto";
import { act } from "react-dom/test-utils";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockResponse),
  })
);

const mockResponse = [{
  id: randomUUID(),
  name: "JEST TODO",
  completed: false,
  priority: 1,
  created_at: new Date(),
  updated_at: new Date(),
}]

it("Render page empty", async () => {
  await act(async () => {
    render(<Page />);

    // wait for fetch
    await new Promise((r) => setTimeout(r, 2000));
  })

  expect(screen.getByText("JEST TODO")).toBeDefined();
})