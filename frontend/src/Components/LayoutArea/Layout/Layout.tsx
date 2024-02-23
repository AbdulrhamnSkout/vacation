import { BrowserRouter } from "react-router-dom";

import Nav from "../Nav/Nav";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <BrowserRouter>
        <div className="Layout">

			<header> 
                <Nav/>  
            </header>
            <main>
                <Routing/>
            </main>
           
        </div>
        </BrowserRouter>
    );
}

export default Layout;
