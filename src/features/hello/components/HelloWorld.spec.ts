import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";

import HelloWorld from "./HelloWorld.vue";

describe("HelloWorld", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);

    wrapper = mount(HelloWorld, {
      global: {
        plugins: [pinia],
      },
      props: {
        msg: "Hello Test",
      },
    });
  });

  it("should render the passed message correctly", () => {
    const element = wrapper.find("h1");
    expect(element.text()).toBe("Hello Test");
  });

  it("should render Vite and Vue links correctly", () => {
    const links = wrapper.findAll("a");
    expect(links.length).toBe(2);

    const viteLink = links[0];
    const vueLink = links[1];

    expect(viteLink.attributes("href")).toBe("https://vite.dev/");
    expect(vueLink.attributes("href")).toBe("https://vuejs.org/");
  });

  it("should display initial counter count", () => {
    const counterText = wrapper.find("p");
    expect(counterText.text()).toContain("Current Count: 0");
  });

  it("should increment counter when button is clicked", async () => {
    const button = wrapper.find("button");
    const counterText = wrapper.find("p");

    expect(counterText.text()).toContain("Current Count: 0");

    await button.trigger("click");

    expect(counterText.text()).toContain("Current Count: 1");
  });

  it("should render the snapshot correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
