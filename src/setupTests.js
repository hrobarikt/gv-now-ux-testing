import Enzyme from "enzyme";
import SnabbdomAdapter from "./@gv/gv-testing-utils/SnabbdomAdapter";

Enzyme.configure({ adapter: new SnabbdomAdapter() });

global.customElements = {
    get() {},
    define() {},
};
