export const getBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "dead":
      return "error";
    case "alive":
      return "success";
    case "unknown":
      return "default";
    default:
      return "default";
  }
};
