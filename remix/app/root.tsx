import styles from "./styles/app.css"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

import { NavLink, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "remix";
import type { MetaFunction } from "remix";

let link_style = "text-lg p-2 cursor-pointer"

export const meta: MetaFunction = () => {
  return { title: "SSO" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-[#000000] dark:text-white">
        
        <div className="grid grid-rows-2">
          <div>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </div>
          <footer className="fixed bottom-0 grid grid-cols-2 text-center bg-gray-300 dark:bg-gray-800 w-full">
            <NavLink to="" className={link_style}>
              Skema
            </NavLink>
            <NavLink to="add" className={link_style}>
              Tilføj
            </NavLink>
          </footer>
        </div>


      </body>
    </html>
  );
}
