
import Father from "./components/RouterComponents/Father";
import { createBrowserRouter } from "react-router-dom";
import Son from "./components/RouterComponents/Son";
import AppLayout from "./components/RouterComponents/AppLayout";

export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
               <AppLayout />
            </>
        ),
        errorElement: <>main error</>,
        children: [
            {
                path:"father",
                element: <Father/>,
                children: [
                    { path: 'son', element: <Son /> },
                ],
            }, 
        ],
    },
]);