/**
 * @description Create an HTML element in a one-liner.
 * @param {string} tag The HTML tag to create.
 * @param {object} [attrs] An object of [valid attributes](https://dom.spec.whatwg.org/#concept-attribute) to assign to the node.
 * @param {string} [inner] The innerHTML to set on the node.
 * @param {string|HTMLElement} [parent] The parent element or query selector to append the node to.
 * @returns {HTMLElement}
 */
function createNode(tag, attrs, inner, parent) {
	const node = document.createElement(tag);
	if (attrs) {
		for (let attrname in attrs) {
			node.setAttribute(attrname, attrs[attrname]);
		};
	};
	if (inner) node.innerHTML = inner;
	parent instanceof HTMLElement ? parent?.appendChild(node) : document.querySelector(parent)?.appendChild(node);
	return node;
};

/**
 * @param {Number} num The number to round.
 * @param {Number} multiple The multiple to round from.
 * @returns {Number}
 */
function roundToMultiple(num, multiple) {
	if (num >= 100) {
		return 100;
	};
	if (num <= 0) {
		return 0;
	};
	if (num % multiple === 0) {
		return Math.floor((Math.floor(num / multiple)) * multiple);
	} else {
		return Math.floor((Math.floor(num / multiple)) * multiple + multiple);
	};
};

/**
 * Modified from the W3Schools implementation, tailored for this specific situation.
 * @param {HTMLElement} elmnt The element to be dragged.
 */
function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	elmnt.titlebar.onmousedown = windowDragMouseDown;

	function windowDragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = windowCloseDragElement;
		document.onmousemove = windowElementDrag;
	}

	function windowElementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function windowCloseDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

/**
 * Mirror a number across a midpoint.
 * @param {Number} num The input to mirror.
 * @param {Number} min The minimum number.
 * @param {Number} max The maximum number.
 * @returns {Number}
 */
function mirror(num, min, max) {
	return Math.abs(num - max - min);
};