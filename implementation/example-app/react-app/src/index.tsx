import r2wc from "@r2wc/react-to-web-component";
import App from "./App";

const reactElement = r2wc(App, {
  props: { message: "string" },
});

customElements.define("react-element", reactElement);
