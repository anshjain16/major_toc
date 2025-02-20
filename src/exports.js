if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
	module.exports = noam; // NodeJS
}

if (typeof exports !== "undefined" && typeof exports !== "function") {
	exports.noam = noam; // CommonJs
}

if (typeof define === "function" && define.amd) {
	define("noam", [], function () {
		return noam;
	}); // AMD
}

if (typeof window !== "undefined") {
	window.noam = noam; // <script>
}
