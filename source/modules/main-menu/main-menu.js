import scrollTo from "@/modules/_utils/scrollTo";
import getOffsetTop from "@/modules/_utils/dom/getOffsetTop";
import { $ } from "@/modules/_utils/dom/select";

export default () => {
  const mainMenu = $(".main-menu");
  if (mainMenu) {
    const links = mainMenu.querySelectorAll('a[href*="#"]');
    const headerHeight = parseInt(
      document.querySelector(".header").offsetHeight
    );
    const duration = 700;
    const offset = headerHeight + 20;

    Array.prototype.forEach.call(links, link => {
      link.addEventListener("click", event => {
        event.preventDefault();

        const title = link.innerText;
        const url = link.getAttribute("href");
        const page = url.split("#")[0];
        const hash = url.split("#")[1];
        const target = document.querySelector(`a[name="${hash}"], #${hash}`);

        if (window.location.pathname !== `/${page}`) {
          window.location = url;
        }

        if (target) {
          let options = { duration };
          const to = getOffsetTop(target) - offset;

          scrollTo({ to, options });

          if (window.history.pushState) {
            window.history.pushState(null, title, url);
          } else {
            window.location = url;
          }
        }
      });
    });
  }
};
