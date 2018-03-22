export default (text = "Hello worl") => {
	const element = document.createElement("div");
	element.innerHTML = text;
	return element;
};