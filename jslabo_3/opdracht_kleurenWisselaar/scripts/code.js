const setup = () => {
	document.querySelectorAll("input[type='button']").forEach(button =>
		button.addEventListener("click", () => button.classList.toggle("active"))
	);
};

window.addEventListener("load", setup);

