import { mount } from "enzyme";

export const mouthWithState = (view, state = {}) => {
    const properties = {
        ...view.defaultProps,
        ...(state.properties || {}),
    };
    return mount(view({ ...state, properties }, { updateState: () => {} }));
};