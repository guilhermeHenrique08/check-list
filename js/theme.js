const changeTheme = document.querySelector("#change-theme");

function togleTheme() {
  document.body.classList.toggle("light");
}

function loadTheme() {
  const isLightTheme = localStorage.getItem("theme");

  if (isLightTheme) {
    togleTheme();
  }
}

loadTheme();

changeTheme.addEventListener("change", () => {
  togleTheme();

  localStorage.removeItem("theme");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  }
});
