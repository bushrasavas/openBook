function Validation(values) {
  let error = {};
  const email_pattern = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;

  if (values.email === "") {
    error.email = "Please provide a valid email";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email didn't match";
  } else {
    error.email = "";
  }
}
