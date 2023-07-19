export const useCharacterStatusColor = (
  status: "Alive" | "Dead" | "unknown" | undefined
) => {
  if (status === "unknown") {
    return "text.secondary";
  }
  return status === "Alive" ? "green" : "red";
};
