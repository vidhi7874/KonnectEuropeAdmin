export const API = {
  SIGNUP: "/register/",
  LOGIN: "/login/",
  ADD_USER: "/create_admin_user/",
  GET_COUNTRY: "/hotel/country_data/",
  GET_CITY: "/hotel/city_data",

  DASHBOARD: {
    OVERALL_PERFORMANCE: "/booking/overall_performance/",
    PACKAGE_PERFORMANCE: "/booking/package_dashboard/",
    HOTEL_PERFORMANCE: "/booking/hotel_dashboard/",
    SIGHTSEEING_PERFORMANCE: "/booking/sightseeing_dashboard/",
  },
  TRAVEL_AGENT_LIST: {
    GET: "/admin_agent/",
    POST: "/agent_register/",
    PUT: "/admin_agent/",
    DELETE: "/admin_agent/",
  },
  HOLIDAY_PACKAGE_LIST: {
    GET: "/package/admin_packages/",
    IMG_UPLOAD: "/package/image_upload/",
    CREATE_PACKAGE: "/package/admin_packages/",
  },
  TEAM: {
    SALES_SUPPORTS: "/sales/",
    ACCOUNTS: "/accountapi/",
    OPERATION: "/operationapi/",
    DIRECTOR: "/directorapi/",
  },
  REPORTS: {
    MASTER_SALES_REPORT: "/sales_report/",
    MASTER_TRAVEL_REPORT: "/travel_report/",
  },
};
