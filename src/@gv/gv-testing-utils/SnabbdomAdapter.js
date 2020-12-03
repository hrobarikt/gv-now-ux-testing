/**
 * Copyright (c) 2020 ServiceNow, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import toHTML from "snabbdom-to-html";
import { createElement } from "@servicenow/ui-renderer-snabbdom";
import { patch } from "@servicenow/ui-renderer-snabbdom/lib/utils";
import { EnzymeAdapter } from "enzyme";
import { isPlainObject } from "@servicenow/ui-internal";
const TEXT_NODE = 3;

function _extends() {
	_extends =
		Object.assign ||
		function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}
			return target;
		};
	return _extends.apply(this, arguments);
}

function toTree(vnode) {
	if (!vnode) return;
	if (vnode.elm.nodeType === TEXT_NODE) return vnode.elm.nodeValue;
	return {
		nodeType: "host",
		ref: vnode.data.ref,
		key: vnode.key,
		type: vnode.elm.nodeName.toLowerCase(),
		props: {
			...vnode.data,
			className: vnode.elm.className,
		},
		instance: vnode.elm,
		rendered: vnode.children.map(toTree),
	};
}

function patch2(vnode) {
	if (!vnode) {
		return;
	}
	let className = vnode.elm.className || "";
	if (className) {
		className = `.${className}`;
		if (className.indexOf(' ') > -1) {
			className = className.split(' ').filter(cn => !!cn).join('.')
		}
	}
	return {
		...vnode,
		sel: vnode.sel + className,
		children: vnode.children ? vnode.children.map(patch2) : undefined,
	};
}

function createMountRenderer(options) {
	assertDomAvailable("mount");
	const node = options.attachTo || global.document.createElement("div");
	let vnode;
	return {
		render(component, context, callback) {
			vnode = patch(node, component);
			vnode = patch2(vnode);
			if (typeof callback === "function") callback();
		},

		unmount() {
			vnode = patch(vnode, {});
		},

		getNode() {
			const tree = toTree(vnode);
			return node ? tree : null;
		},

		simulateEvent(node, event) {
			node.instance.dispatchEvent(new Event(event));
		},

		batchedUpdates(fn) {
			return fn;
		},
	};
}

function createShallowRenderer() {
	throw new Error(
		"Shallow renderer is not implemented in the Now Experience UI Framework Enzyme Adapter"
	);
}

function createStringRenderer() {
	return {
		render(component) {
			const node = global.document.createElement("div");
			const vnode = patch(node, component);
			return toHTML(vnode);
		},
	};
}

function assertDomAvailable(feature) {
	if (!global || !global.document || !global.document.createElement)
		throw new Error(
			`Enzyme's ${feature} expects a DOM environment to be loaded, but found none`
		);
}

function propsWithKeysAndRef(node) {
	if (node.ref !== null || node.key !== null) {
		return _extends({}, node.props, {
			ref: node.ref,
			key: node.key,
		});
	}

	return node.props;
}

export default class SnabbdomAdapter extends EnzymeAdapter {
	createRenderer(options) {
		switch (options.mode) {
			case EnzymeAdapter.MODES.MOUNT:
				return createMountRenderer(options);

			case EnzymeAdapter.MODES.SHALLOW:
				return createShallowRenderer();

			case EnzymeAdapter.MODES.STRING:
				return createStringRenderer();

			default:
				throw new Error(
					`Enzyme Internal Error: Unrecognized mode: ${options.mode}`
				);
		}
	}

	nodeToHostNode(node) {
		return (node.instance && node.instance.base) || node.instance;
	}

	nodeToElement(node) {
		if (!isPlainObject(node) || !Object.keys(node).length) return null;
		return createElement(node.type, propsWithKeysAndRef(node));
	}

	isValidElement(element) {
		return (
			isPlainObject(element) &&
			element.hasOwnProperty("sel") &&
			element.hasOwnProperty("data") &&
			element.hasOwnProperty("children")
		);
	}

	createElement(...args) {
		console.log({ args });
		return createElement(...args);
	}
}
