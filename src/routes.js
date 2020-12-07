import Index from "./pages/index/index";
import addJob from "./pages/jobs/jobs";
import editJob from "./pages/jobs/jobs-edit";
import signUp from "./pages/users/signup";
import signIn from "./pages/users/signin";
import profile from "./pages/users/profile";
import jobdetails from "./pages/job-details/job-details";
import jobtags from "./pages/job-tags/job-tags";
import healthcarecompanies from "./pages/healthcare-companies/healthcare-companies";
import about from "./pages/about/about";
import support from "./pages/support/support";
const routes = [
  { path: "/employer/new/job", component: addJob },
  { path: "/employer/edit/:editlink", component: editJob},
  { path: "/jobs/tag/:tag", component: jobtags },
  { path: "/jobs/healthcare-companies/:co", component: healthcarecompanies },
  { path: "/users/new", component: signUp },
  { path: "/users/returning", component: signIn },
  { path: "/users/profile", component: profile },
  { path: "/jobs/job/:id", component: jobdetails },
  { path: "/about-us", component: about },
  { path: "/support", component: support },
  { path: "/", component: Index },
];

export default routes;
