export const validateBankForm = (
  accounNumber,
  accounNumber2,
  Ifsc,
  iban,
  bankName,
  branch,
  setErrors
) => {
  let errors = "";
    setErrors(errors);
  // Account Number validation
  if (!accounNumber) {
    errors = "Account number is required";
    setErrors(errors);
    return false;
  } else if (!/^\d+$/.test(accounNumber)) {
    errors = "Account number should only contain digits";
    setErrors(errors);
    return false;
  }

  // Re-entered Account Number validation
  if (!accounNumber2) {
    errors = "Please re-enter the account number";
    setErrors(errors);
    return false;
  } else if (accounNumber !== accounNumber2) {
    errors = "Account numbers do not match";
    setErrors(errors);
    return false;
  }

  // IFSC validation
  if (!Ifsc) {
    errors = "IFSC is required";
    setErrors(errors);
    return false;
  } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(Ifsc)) {
    errors = "Invalid IFSC format";
    setErrors(errors);
    return false;
  }

  // IBAN validation (basic check, might need to be adjusted based on specific country requirements)
  if (!iban) {
    console.log(iban);
    errors = "IBAN is required";
    setErrors(errors);
    return false;
  }

  // Bank Name validation
  if (!bankName) {
    errors = "Bank name is required";
    setErrors(errors);
    return false;
  }

  // Branch validation
  if (!branch) {
    errors = "Branch name is required";
    setErrors(errors);
    return false;
  }
  setErrors(errors);
  return true;
};
