import { createRoot } from "react-dom/client"; // 1er archivo de que va cargar en mi app
import App from "./src/App";
import './main.css'

const root = createRoot(document.getElementById("app")); // selecciono donde quiero renderizar mi app

root.render(<App />); // dentro de esta rama es donde quiero renderizar mi app
