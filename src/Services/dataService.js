import { delay, mockDatabase } from "./mockDatabase";

const getUser = async () => {
  const activeUser = mockDatabase.getActiveUser();

  if (activeUser) {
    return delay(activeUser);
  }

  if (typeof window === "undefined"){
    return null;
  }

  const email = window.localStorage.getItem("email");
  if (!email) {
    return delay(null);
  }

  console.log(email)

  return delay({ email: JSON.parse(email) });
};

const checkLoggingStatus = async () => {
  const activeUser = mockDatabase.getActiveUser();
  if (activeUser) {
    return delay(true);
  }

  if (typeof window === "undefined") {
    return delay(false);
  }

  const token = window.localStorage.getItem("token");
  return delay(Boolean(token));
};

const dataService = {
  getUser,
  checkLoggingStatus
};

export default dataService;