import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Root,
  Invoices,
  InvoiceDetails,
  InvoiceEdit,
  NewInvoice,
  ErrorPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Invoices />,
      },
      { path: "/:id", element: <InvoiceDetails /> },
      { path: "/new", element: <NewInvoice /> },
      { path: "/edit/:id", element: <InvoiceEdit /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
