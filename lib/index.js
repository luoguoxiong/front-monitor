import per from "./performance";

window.onload = () => {
  per.getPerformanceTiming();
  per._show();
};
