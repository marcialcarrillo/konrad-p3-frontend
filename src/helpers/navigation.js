import { v4 as uuidv4 } from "uuid";

//create objects with both the name and navigation link they must follow
const linkHelper = {};

//links for when the user is authenticated
const authenticatedLinks = [
  // {key:uuidv4(), link: "/add-money", name: "Add Money" },
  // {key:uuidv4(), link: "/money-transfer", name: "Transfer Money" },
  // {key:uuidv4(), link: "/pay-services", name: "Pay Bills" },
  // {key:uuidv4(), link: "/account-history", name: "Account History" },
  {key:uuidv4(), link: "/dashboard", name: "Dashboard" },
  // {key:uuidv4(), link: "/profile", name: "Profile" },
  {key:uuidv4(), link: "/log-out", name: "Log Out" },
  //TODO:  dashboard navigation should be handled by the logo instead
];

//links for when the user is not authenticated
const notAuthenticatedLinks = [
  //TODO:  home navigation should be handled by the logo instead
  // {key:uuidv4(), link: "/home", name: "Home" },
  {key:uuidv4(), link: "/sign-up", name: "Register" },
  {key:uuidv4(), link: "/sign-in", name: "Log In" },
];

//Inject links
linkHelper.authLinks = authenticatedLinks;
linkHelper.nonAuthLinks = notAuthenticatedLinks;

export default linkHelper;
