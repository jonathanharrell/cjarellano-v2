export const getCategoryColor = (category) => {
  switch(category) {
    case "directing":
      return "cyan";

    case "editing":
      return "yellow";

    case "motion graphics":
      return "red";

    case "writing":
    default:
      return "magenta";
  }
}
