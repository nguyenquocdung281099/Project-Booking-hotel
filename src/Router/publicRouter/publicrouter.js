import { Route } from "react-router-dom";
import Footer from "../../page/layout/footer";
import Header from "../../page/layout/header";
export default function RouterPublic({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Header />
          <Component {...props} />
          <Footer />
        </>
      )}
    />
  );
}
