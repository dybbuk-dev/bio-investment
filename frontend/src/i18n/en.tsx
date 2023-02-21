const en = {
  common: {
    areYouSure: 'Are you sure?',
    back: 'Back',
    boolean: {
      false: 'No',
      true: 'Yes',
    },
    cancel: 'Cancel',
    continue: 'Continue',
    createdAt: 'Created At',
    createdBy: 'Created By',
    destroy: 'Delete',
    discard: 'Discard',
    edit: 'Edit',
    end: 'End',
    export: 'Export to Excel',
    filters: 'Filters',
    grid: 'Grid',
    import: 'Import',
    list: 'List',
    more: 'More',
    mustSelectARow: 'Must select a row',
    new: 'New',
    next: 'Next',
    no: 'No',
    noDataToExport: 'No data to export',
    or: 'or',
    outOf: ' out of ',
    pause: 'Pause',
    reset: 'Reset',
    save: 'Save',
    search: 'Search',
    select: 'Select',
    start: 'Start',
    view: 'View',
    yes: 'Yes',
    verify: 'Verify',
    accept: 'Accept',
    reject: 'Reject',
    request: 'Request',
    help: 'Help',
  },

  app: {
    title: 'Bio Investment',
  },

  api: {
    menu: 'API',
  },

  mui: {
    configurator: {
      title: 'UI Style Configurator',
      description: 'See our dashboard options.',
      sidenavColor: 'Colors',
      sidenavType: {
        title: 'Sidenav Type',
        description:
          'Choose between different sidenav types.',
        dark: 'Dark',
        transparent: 'Transparent',
        white: 'white',
      },
      navbarFixed: 'Navbar Fixed',
      sidenavMini: 'Sidenav Mini',
      sidenavDark: 'Light / Dark',
    },
  },

  auth: {
    tenants: 'Settings',
    profile: {
      title: 'Profile',
      success: 'Profile successfully updated',
    },
    createAnAccount: 'Create an account',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password',
    signin: 'Sign in',
    signup: 'Sign up',
    signout: 'Sign out',
    alreadyHaveAnAccount:
      'Already have an account? Sign in.',
    social: {
      errors: {
        'auth-invalid-provider':
          'This email is already registered to another provider.',
        'auth-no-email': `The email associated with this account is private or inexistent.`,
      },
    },
    signinWithAnotherAccount:
      'Sign in with another account',
    emailUnverified: {
      message: `Please confirm your email at <strong>{0}</strong> to continue.`,
      submit: `Resend email verification`,
    },
    emptyPermissions: {
      message: `You have no permissions yet. Wait for the admin to grant you privileges.`,
    },
    passwordResetEmail: {
      message: 'Send password reset email',
      error: `Email not recognized`,
    },
    passwordReset: {
      message: 'Reset password',
    },
    passwordChange: {
      title: 'Change Password',
      success: 'Password successfully changed',
      mustMatch: 'Passwords must match',
    },
    requestVerification: {
      success:
        'Identity Verification successfully requested',
    },
    emailAddressVerificationEmail: {
      error: `Email not recognized`,
    },
    verificationEmailSuccess: `Verification email successfully sent`,
    passwordResetEmailSuccess: `Password reset email successfully sent`,
    passwordResetSuccess: `Password successfully changed`,
    verifyEmail: {
      success: 'Email successfully verified.',
      message:
        'Just a moment, your email is being verified...',
    },
  },

  roles: {
    admin: {
      label: 'Admin',
      description: 'Full access to all resources',
    },
    manager: {
      label: 'Manager',
      description: 'Manager access',
    },
    customer: {
      label: 'Customer',
      description: 'Customer access',
    },
  },

  user: {
    fields: {
      id: 'Id',
      avatars: 'Avatar',
      email: 'Email',
      name: 'Name',
      emails: 'Email(s)',
      fullName: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      status: 'Status',
      address: 'Address',
      birthday: 'Birthday',
      country: 'Country',
      state: 'State',
      city: 'City',
      nationality: 'Nationality',
      phoneNumber: 'Phone Number',
      role: 'Role',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      roleUser: 'Role/User',
      roles: 'Roles',
      createdAtRange: 'Created at',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      newPasswordConfirmation: 'New Password Confirmation',
      rememberMe: 'Remember me',
      identityType: {
        title: 'Identity Document Type',
        idCard: 'ID Card',
        passport: 'Passport',
        driverLicense: 'Driver License',
        label: 'Identity Type',
      },
      identityImages: 'Identity Document Images',
    },
    status: {
      active: 'Active',
      invited: 'Invited',
      pending: 'Pending',
      requested: 'Requested',
      rejected: 'Rejected',
    },
    invite: 'Invite',
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
    title: 'Users',
    menu: 'Users',
    doAddSuccess: 'User(s) successfully saved',
    doUpdateSuccess: 'User successfully saved',
    exporterFileName: 'users_export',
    doDestroySuccess: 'User successfully deleted',
    doDestroyAllSelectedSuccess:
      'Users successfully deleted',
    edit: {
      title: 'Edit User',
    },
    new: {
      title: 'Invite User(s)',
      titleModal: 'Invite User',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View User',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Users',
      fileName: 'users_import_template',
      hint: 'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
  },

  customer: {
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
    title: 'Customers',
    subTitle: {
      generalInfo: 'General Information',
      profileData: 'Profile Data',
      schedules: 'Schedules',
      identityDocument: 'Identity Document',
    },
    menu: 'Customers',
    doAddSuccess: 'Customer(s) successfully saved',
    doUpdateSuccess: 'Customer successfully saved',
    doAcceptSuccess: 'Customer successfully verified',
    doRejectSuccess: 'Customer successfully rejected',
    exporterFileName: 'customers_export',
    doDestroySuccess: 'Customer successfully deleted',
    doDestroyAllSelectedSuccess:
      'Customers successfully deleted',
    edit: {
      title: 'Edit Customer',
    },
    new: {
      title: 'Add Customer',
      titleModal: 'Add Customer',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View Customer',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Customers',
      fileName: 'customers_import_data',
      hint: 'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'Customer with this email already exists',
      userNotFound: 'Customer not found',
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
    investment: {
      menu: 'Investments',
    },
    transaction: {
      menu: 'Transactions',
      title: 'Transactions',
      fields: {
        transactionType: 'Operation Type',
        date: 'Date',
        amount: 'Amount',
        account: 'Account',
        state: 'State',
      },
    },
    property: {
      menu: 'Properties',
    },
    marketplace: {
      menu: 'Marketplace',
    },
    contact: {
      menu: 'Contact',
    },
    verification: {
      menu: 'Verification',
      title: 'Verification',
      pending: {
        title: 'Please verify your identity',
        description: `You Wasn't verified on this platform. You need to have an identity verification to invest. Please verify your identity.`,
        button: 'Verify',
      },
      rejected: {
        title: 'Please verify, again',
        description:
          'The verification was rejected. Please confirm documentation and send a verification request, again.',
        button: 'Verify',
      },
      requested: {
        title: 'Confirming',
        description:
          'The verification request was successfully submitted. It will take about 2 business days to review it.',
      },
    },
  },

  property: {
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
    title: 'Properties',
    subTitle: {
      generalInfo: 'General Information',
      profileData: 'Profile Data',
      schedules: 'Schedules',
    },
    menu: 'Properties',
    doAddSuccess: 'Property(s) successfully saved',
    doUpdateSuccess: 'Property successfully saved',
    exporterFileName: 'properties_export',
    doDestroySuccess: 'Property successfully deleted',
    doDestroyAllSelectedSuccess:
      'Properties successfully deleted',
    edit: {
      title: 'Edit Property',
    },
    new: {
      title: 'Add Property',
      titleModal: 'Add Property',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View Property',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Properties',
      fileName: 'properties_import_data',
      hint: 'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'Property with this email already exists',
      userNotFound: 'Property not found',
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
    fields: {
      name: 'Name',
      createdAt: 'Created At',
      updatedAt: 'Updated At',
      propertyNumber: 'Property ID',
      country: 'Country',
      city: 'City',
      propertyType: 'Property Type',
      address: 'Address',
      coordinateX: 'Latitude',
      coordinateY: 'Longitude',
      tokenName: 'Token Name',
      description: 'Description',
      initialRentDate: 'Initial Date for Renting',
      durationProjectInMonth: 'Project Duration in Month',
      status: 'Status',
      tokenAddress: 'Token Smart Contract Address',
      initialDateSTO: 'Initial Date for STO',
      endDateSTO: 'End Date for STO',
      suppliedTokensNumber: 'Total Tokens for supplying',
      investorsNumber: 'Amount of Investors',
      tokenPrice: 'Token Price',
      tokenizedCostAmount: 'Total Cost to be tokenized',
      softcap: 'Softcap',
      hardcap: 'Hardcap',
      photographs: 'Photographs',
      TIR: 'TIR',
      accumulatedAndDistributedProfits:
        'Accumulated and Distributed Profits',
      APY: 'APY',
      minAmountOnSelling: 'Minimal Amount on Selling',
      investorsNumberRange: 'Investors Number Range',
      createdAtRange: 'Created At Range',
    },
  },

  tenant: {
    name: 'tenant',
    label: 'Settings',
    menu: 'Settings',
    title: 'Settings',
    create: {
      button: 'Create School',
      success: 'School successfully saved',
    },
    update: {
      success: 'School successfully saved',
    },
    destroy: {
      success: 'School successfully deleted',
    },
    destroyAll: {
      success: 'School(s) successfully deleted',
    },
    edit: {
      title: 'Edit School',
    },
    fields: {
      id: 'Id',
      name: 'Name',
      url: 'URL',
      tenantName: 'School Name',
      tenantId: 'School',
      tenantUrl: 'School URL',
      plan: 'Plan',
    },
    enumerators: {},
    new: {
      title: 'New School',
    },
    invitation: {
      view: 'View Invitations',
      invited: 'Invited',
      accept: 'Accept Invitation',
      decline: 'Decline Invitation',
      declined: 'Invitation successfully declined',
      acceptWrongEmail: 'Accept Invitation With This Email',
    },
    select: 'Select School',
    validation: {
      url: 'Your school URL can only contain lowercase letters, numbers and dashes (and must start with a letter or number).',
    },
  },

  plan: {
    menu: 'Subscriptions',
    title: 'Subscriptions',

    free: {
      label: 'Free',
      price: '0',
      unit: '$',
    },
    growth: {
      label: 'Growth',
      price: '10',
      unit: '$',
    },
    enterprise: {
      label: 'Enterprise',
      price: '50',
      unit: '$',
    },

    pricingPeriod: 'month',
    current: 'Current Subscription',
    subscribe: 'Subscribe',
    manage: 'Manage Subscription',
    cancelAtPeriodEnd:
      'This plan will be canceled at the end of the period.',
    somethingWrong:
      'There is something wrong with your subscription. Please go to manage subscription for more details.',
    notPlanUser: `You are not the manager of this subscription.`,
  },

  auditLog: {
    menu: 'Audit Logs',
    title: 'Audit Logs',
    exporterFileName: 'audit_log_export',
    entityNamesHint:
      'Separate multiple entities using the comma character.',
    fields: {
      id: 'Id',
      timestampRange: 'Period',
      entityName: 'Entity',
      entityNames: 'Entities',
      entityId: 'Entity ID',
      action: 'Action',
      values: 'Values',
      timestamp: 'Date',
      createdByEmail: 'User Email',
    },
  },
  settings: {
    title: 'Settings',
    tenant: 'School',
    menu: 'Settings',
    save: {
      success:
        'Settings successfully saved. The page will reload in {0} seconds for changes to take effect.',
    },
    fields: {
      primary: 'Primary Color',
      secondary: 'Secondary Color',
      logos: 'Logo',
      backgroundImages: 'Background Images',
      shade: 'Shade',
    },
  },
  dashboard: {
    menu: 'Dashboard',
    totalCustomer: 'Number of Customers',
    verifiedCustomer: 'KYC Total Completed',
    requestedCustomer: 'KYC pending to approve',
    country: 'Number of Countries',
    totalInvested: 'Total Invested',
    property: 'Number of Properties',
    dividendsReceived: 'Dividends Received',
    profit: 'Profit',
    investmentLocations: 'Investment Locations',
    message: `This page uses fake data for demonstration purposes only. You can edit it at frontend/view/dashboard/DashboardPage.ts.`,
    charts: {
      day: 'Day',
      red: 'Red',
      green: 'Green',
      yellow: 'Yellow',
      grey: 'Grey',
      blue: 'Blue',
      orange: 'Orange',
      months: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
      },
      eating: 'Eating',
      drinking: 'Drinking',
      sleeping: 'Sleeping',
      designing: 'Designing',
      coding: 'Coding',
      cycling: 'Cycling',
      running: 'Running',
      customer: 'Customer',
    },
  },
  errors: {
    backToHome: 'Back to home',
    403: `Sorry, you don't have access to this page`,
    404: 'Sorry, the page you visited does not exist',
    500: 'Sorry, the server is reporting an error',
    429: 'Too many requests. Please try again later.',
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
    defaultErrorMessage: 'Ops, an error occurred',
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} is invalid',
      required: '${path} is required',
      oneOf:
        '${path} must be one of the following values: ${values}',
      notOneOf:
        '${path} must not be one of the following values: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} must be a ${type}`;
      },
    },
    string: {
      length:
        '${path} must be exactly ${length} characters',
      min: '${path} must be at least ${min} characters',
      max: '${path} must be at most ${max} characters',
      matches:
        '${path} must match the following: "${regex}"',
      email: '${path} must be a valid email',
      url: '${path} must be a valid URL',
      trim: '${path} must be a trimmed string',
      lowercase: '${path} must be a lowercase string',
      uppercase: '${path} must be a upper case string',
      selected: '${path} must be selected',
    },
    number: {
      min: '${path} must be greater than or equal to ${min}',
      max: '${path} must be less than or equal to ${max}',
      lessThan: '${path} must be less than ${less}',
      moreThan: '${path} must be greater than ${more}',
      notEqual: '${path} must be not equal to ${notEqual}',
      positive: '${path} must be a positive number',
      negative: '${path} must be a negative number',
      integer: '${path} must be an integer',
    },
    date: {
      min: '${path} field must be later than ${min}',
      max: '${path} field must be at earlier than ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} field cannot have keys not specified in the object shape',
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} is required`
          : `${path} field must have at least ${min} items`,
      max: '${path} field must have less than or equal to ${max} items',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'You must upload an image',
    size: 'File is too big. Max allowed size is {0}',
    formats: `Invalid format. Must be one of: {0}.`,
    placeholder: {
      title: 'Click or drag and drop files here',
      size: '(Max {0})',
    },
    title: 'Title',
    file: 'File',
    uploadedBy: 'Uploaded by',
    uploadedAt: 'Uploaded at',
  },
  importer: {
    line: 'Line',
    status: 'Status',
    pending: 'Pending',
    imported: 'Imported',
    error: 'Error',
    total: `{0} imported, {1} pending and {2} with error`,
    importedMessage: `Processed {0} of {1}.`,
    noNavigateAwayMessage:
      'Do not navigate away from this page or import will be stopped.',
    completed: {
      success:
        'Import completed. All rows were successfully imported.',
      someErrors:
        'Processing completed, but some rows were unable to be imported.',
      allErrors: 'Import failed. There are no valid rows.',
    },
    form: {
      downloadTemplate: 'Download the template',
      hint: 'Click or drag the file to this area to continue',
    },
    list: {
      discardConfirm:
        'Are you sure? Non-imported data will be lost.',
    },
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  autocomplete: {
    loading: 'Loading...',
    noOptions: 'No data found',
  },

  customViewer: {
    default: 'No Data',
    noData: 'No {0}',
  },

  imagesViewer: {
    noImage: 'No image',
  },

  table: {
    noData: 'No records found',
    loading: 'Loading...',
  },

  pagination: {
    labelDisplayedRows: '{0}-{1} of {2}',
    labelRowsPerPage: 'Per page:',
  },
};

export default en;
