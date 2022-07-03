//create objects with both the name and navigation link they must follow
const linkHelper = {};

//links for when the user is authenticated
const authenticatedLinks = [
  { link: "/add-money", name: "Add Money" },
  { link: "/money-transfer", name: "Transfer Money" },
  { link: "/pay-services", name: "Pay Services" },
  { link: "/account-history", name: "Account History" },
  //TODO:  dashboard navigation should be handled by the logo instead
  { link: "/dashboard", name: "Dashboard" },
  { link: "/profile", name: "Profile" },
  { link: "/log-out", name: "Log Out" },
];

//links for when the user is not authenticated
const notAuthenticatedLinks = [
  //TODO:  home navigation should be handled by the logo instead
  { link: "/home", name: "Home" },
  { link: "/sign-up", name: "Register" },
  { link: "/sign-in", name: "Log In" },
];

//Inject links
linkHelper.authLinks = authenticatedLinks;
linkHelper.nonAuthLinks = notAuthenticatedLinks;

export default linkHelper;