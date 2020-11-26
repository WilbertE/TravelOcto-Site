const parallax = function () {
  const items = document.querySelectorAll("*[data-parallax]");
  Array.from(items).forEach((item) => {
    let parallaxValue = Number(item.dataset.parallax);
    item.style.transform = `translateY(${0 - window.scrollY - window.scrollY * (0 - parallaxValue / 10)}px)`;
  });
};

export default parallax;
