export const getMenuPosition = () => {
  return localStorage.getItem("menuPosition") || "left";
};

export const setMenuPosition = (position) => {
  localStorage.setItem("menuPosition", position);
};
