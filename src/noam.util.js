var noam = {};

noam.util = {};


noam.util.areEquivalent = function (object1, object2) {
	if (object1 === object2) {
		return true;
	}

	if (object1 instanceof Date && object2 instanceof Date) {
		return object1.getTime() === object2.getTime();
	}

	if (object1 instanceof RegExp && object2 instanceof RegExp) {
		return (
			object1.source === object2.source &&
			object1.global === object2.global &&
			object1.multiline === object2.multiline &&
			object1.lastIndex === object2.lastIndex &&
			object1.ignoreCase === object2.ignoreCase
		);
	}

	if (!(object1 instanceof Object) || !(object2 instanceof Object)) {
		return false;
	}

	if (typeof object1 === "undefined" || typeof object2 === "undefined") {
		return false;
	}

	if (object1.constructor !== object2.constructor) {
		return false;
	}

	for (var p in object1) {
		if (!(p in object2)) {
			return false;
		}

		if (object1[p] === object2[p]) {
			continue;
		}

		if (typeof object1[p] !== "object") {
			return false;
		}

		if (!noam.util.areEquivalent(object1[p], object2[p])) {
			return false;
		}
	}

	for (p in object2) {
		if (!(p in object1)) {
			return false;
		}
	}

	return true;
};

noam.util.contains = function (arr, obj, startIndex) {
	startIndex = startIndex ? startIndex : 0;

	for (var i = startIndex; i < arr.length; i++) {
		if (noam.util.areEquivalent(arr[i], obj)) {
			return true;
		}
	}

	return false;
};


noam.util.index = function (arr, obj, startIndex) {
	var i = startIndex || 0;
	while (i < arr.length) {
		if (noam.util.areEquivalent(arr[i], obj)) {
			return i;
		}
		i++;
	}
	return -1;
};


noam.util.containsAll = function (arr1, arr2) {
	for (var i = 0; i < arr2.length; i++) {
		if (!noam.util.contains(arr1, arr2[i])) {
			return false;
		}
	}

	return true;
};


noam.util.containsAny = function (arr1, arr2) {
	for (var i = 0; i < arr2.length; i++) {
		if (noam.util.contains(arr1, arr2[i])) {
			return true;
		}
	}

	return false;
};


noam.util.areEqualSets = function (arr1, arr2) {
	if (arr1.length !== arr2.length) {
		return false;
	}

	for (var i = 0; i < arr1.length; i++) {
		if (!noam.util.contains(arr2, arr1[i])) {
			return false;
		}
	}

	return true;
};

noam.util.containsSet = function (arr1, obj) {
	for (var i = 0; i < arr1.length; i++) {
		if (noam.util.areEqualSets(arr1[i], obj)) {
			return true;
		}
	}

	return false;
};


noam.util.setUnion = function (arr1, arr2) {
	var res = [];
	var i;
	for (i = 0; i < arr1.length; i++) {
		
		if (!noam.util.contains(res, arr1[i])) {
			res.push(arr1[i]);
		}
	}
	for (i = 0; i < arr2.length; i++) {
		if (!noam.util.contains(res, arr2[i])) {
			res.push(arr2[i]);
		}
	}
	return res;
};

noam.util.setIntersection = function (arr1, arr2) {
	var res = [];
	var i;
	for (i = 0; i < arr1.length; i++) {
		if (noam.util.contains(arr2, arr1[i])) {
			res.push(arr1[i]);
		}
	}

	return res;
};


noam.util.clone = function (obj) {
	return JSON.parse(JSON.stringify(obj));
};


noam.util.makeCounter = (function () {
	function getAndAdvance() {
		return this.value++;
	}

	function makeCounter(init) {
		return {
			value: init,
			getAndAdvance: getAndAdvance,
		};
	}

	return makeCounter;
})();

// Returns a random integer from the interval [from, to].
noam.util.randint = function (from, to) {
	return Math.floor(Math.random() * (to - from + 1)) + from;
};
