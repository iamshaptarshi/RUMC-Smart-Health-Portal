import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <div className="flex gap-1 my-auto">
        <input
          onClick={toggleTheme}
          type="checkbox"
          checked={theme === "dark"}
          className="toggle bg-white toggle-secondary"
        />
        <div className="text-sm  mt-0.5">
          {theme === "light" ? "Light" : "Dark"}
        </div>
      </div>
      
    </div>
  );
};

export default ThemeToggle;
