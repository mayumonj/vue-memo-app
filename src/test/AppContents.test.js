import { render } from "@testing-library/vue";
import AppContents from "../components/AppContents.vue";

test("it should work", () => {
  const { getByText } = render(AppContents, {
    props: {
      /* ... */
    },
  });

  // assert output
  getByText("Add");
});
