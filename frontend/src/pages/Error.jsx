import { useRouteError } from "react-router-dom";
import CentreTemplate from "./CentreTemplate";

const Error = () => {
  console.log('Error Component');
  const error = useRouteError();
  console.log(error); // This will help you see the structure of `error` in the console

  const errorMessage = error.status === 404 ? '404. Oops, Page Not Found' : 'Oops, there was an error'

  return (
    <CentreTemplate>
      <h1 className="text-5xl font-bold items-center text-neutral-800">{errorMessage}</h1>
      <p>{error?.statusText || error?.message || "Something went wrong."}</p>
    </CentreTemplate>
  );
};

export default Error;
