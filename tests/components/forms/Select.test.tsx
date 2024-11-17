import { render } from "@testing-library/react";
import { SelectInput } from "../../../src/components/forms/select";

// Tests
describe("Forms", () => {
  it("Should render the dropdown with type single", async () => {
    const items = [
      {
        label: "Item 1",
        value: "item1",
      },
    ];
    // const user = userEvent.setup();
    const wrapper = render(
      <SelectInput
        mode="single"
        placeholder="Select item"
        items={items}
        value={"item1"}
        handleChange={(e) => console.log(e)}
      />
    );

    // Assertions
    expect(wrapper.container).toBeInTheDocument();
  });
});
