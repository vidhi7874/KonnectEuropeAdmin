import { Suspense } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login";
import TravelAgentList from "../pages/TravelAgentList/";
import { localStorageService } from "../services/localStorge.service";
import HolidayPackage from "../pages/Holiday/HolidayPackage";
import Attraction from "../pages/Holiday/Attraction";
import AttractionLayout from "../components/Layout/AttractionLayout";
import SalesSupport from "../pages/Team/SalesSupport";
import Accounts from "../pages/Team/Accounts";
import Operations from "../pages/Team/Operations";
import Directors from "../pages/Team/Directors";
import MasterSalesReports from "../pages/Reports/MasterSalesReports";
import MasterTravelReports from "../pages/Reports/MasterTravelReports";

// let isAuth = false;

let isAuth = localStorageService.get("KE_ADMIN");

const ROLES = {
  Admin: 1001,
  Hr: 2002,
  User: 2334,
};

const GuestRoute = ({ children }) => {
  return isAuth ? (
    <Navigate to={{ pathname: "/", state: { from: "" } }} />
  ) : (
    children
  );
};

const ProtectedRoutes = ({ children }) => {
  return isAuth ? (
    children
  ) : (
    <Navigate to={{ pathname: "/login", state: { from: "" } }} />
  );
};

const RequireAuth = ({ allowedRoles, children }) => {
  // Admin: 1001,
  // Hr: 2002,
  let location = useLocation();
  const history = useNavigate();

  const auth = {
    user: "ankit",
    roles: [1001],
  };

  console.log("RequireAuth ===> ", allowedRoles);

  // only Admin can access this routes
  if (auth.roles[0] === ROLES.Admin)
    return onlyAdminCanAccess(allowedRoles, children);

  // only HR can access this routes
  if (auth.roles[0] === ROLES.Hr)
    return onlyHrCanAccess({ auth, children, allowedRoles, location, history });
};

const removeToken = (location, history) => {
  console.log("remove token call");
  isAuth = false;
  history.push("/login");
  // <Navigate to="/login" state={{ from: location }} replace />;
};

const onlyAdminCanAccess = (allowedRoles, children) => {
  console.log("only-Admin-Can-Access ---> ", allowedRoles);
  return children;
};

const onlyHrCanAccess = ({
  auth,
  children,
  allowedRoles,
  location,
  history,
}) => {
  console.log("only-HR-Can-Access ---> ", auth, allowedRoles);
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) === undefined
    ? removeToken(location, history)
    : children;
};

const PageNotFound = () => {
  return <div>404</div>;
};

const routes = [
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </GuestRoute>
    ),
  },

  {
    path: "/signup",
    element: <GuestRoute>{/* <Signup /> */}</GuestRoute>,
  },
  {
    path: "/test",
    element: (
      <RequireAuth allowedRoles={[ROLES.User]}>
        <div>dashboard test</div>
      </RequireAuth>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <RequireAuth allowedRoles={[ROLES.Admin]}>
              <Dashboard />
            </RequireAuth>
          </Suspense>
        </Layout>
      </ProtectedRoutes>
    ),
  },

  {
    path: "/travel-agent-list",
    element: (
      <ProtectedRoutes>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <RequireAuth allowedRoles={[ROLES.Admin]}>
              <TravelAgentList />
            </RequireAuth>
          </Suspense>
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/holiday-packages",

    children: [
      {
        path: "",
        element: (
          <ProtectedRoutes>
            <Layout>
              <Suspense fallback={<div>Loading...</div>}>
                <RequireAuth allowedRoles={[ROLES.Admin]}>
                  <HolidayPackage />
                </RequireAuth>
              </Suspense>
            </Layout>
          </ProtectedRoutes>
        ),
      },
      {
        path: "attraction",
        element: (
          <ProtectedRoutes>
            <AttractionLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <RequireAuth allowedRoles={[ROLES.Admin]}>
                  <Attraction />
                </RequireAuth>
              </Suspense>
            </AttractionLayout>
          </ProtectedRoutes>
        ),
      },
    ],
  },

  // Teams
  {
    path: "team",

    children: [
      {
        path: "sales-support",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <RequireAuth allowedRoles={[ROLES.Admin]}>
                <Layout>
                  <SalesSupport />
                </Layout>
              </RequireAuth>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "accounts",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <RequireAuth allowedRoles={[ROLES.Admin]}>
                <Layout>
                  <Accounts />
                </Layout>
              </RequireAuth>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "operations",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <RequireAuth allowedRoles={[ROLES.Admin]}>
                <Layout>
                  <Operations />
                </Layout>
              </RequireAuth>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "directors",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <RequireAuth allowedRoles={[ROLES.Admin]}>
                <Layout>
                  <Directors />
                </Layout>
              </RequireAuth>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },

  // Reports routes
  {
    path: "report",

    children: [
      {
        path: "Master-Sales-Report",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <RequireAuth allowedRoles={[ROLES.Admin]}>
                <Layout>
                  <MasterSalesReports />
                </Layout>
              </RequireAuth>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "Master-Travel-Report",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <RequireAuth allowedRoles={[ROLES.Admin]}>
                <Layout>
                  <MasterTravelReports />
                </Layout>
              </RequireAuth>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "Agent-Sales-Report",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <RequireAuth allowedRoles={[ROLES.Admin]}>
                <Layout>
                  <Operations />
                </Layout>
              </RequireAuth>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "Agent-Travel-Report",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <RequireAuth allowedRoles={[ROLES.Admin]}>
                <Layout>
                  <Directors />
                </Layout>
              </RequireAuth>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <ProtectedRoutes>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <PageNotFound />
          </Suspense>
        </Layout>
      </ProtectedRoutes>
    ),
  },
];

export default routes;
