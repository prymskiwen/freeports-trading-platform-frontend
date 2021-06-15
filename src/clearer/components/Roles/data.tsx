const rolesArray = [
  {
    id: 1,
    roleName: "Administrative Lead",
    numCoworkers: 1,
    permissions: {
      investors: {
        create: true,
        edit: true,
        disable: true,
      },
      accounts: {
        create: true,
        read: true,
      },
      coworkers: {
        create: true,
        edit: true,
        disabled: true,
      },
      transfers: {
        read: true,
        validate: true,
        mark: true,
      },
      trades: {
        create: true,
        validate: true,
      },
      whitelists: {
        create: true,
        validate: true,
      },
      rules: {
        create: true,
        validate: true,
      },
    },
  },
  {
    id: 2,
    roleName: "Legal Officer",
    numCoworkers: 1,
    permissions: {
      investors: {
        create: true,
        edit: false,
        disable: false,
      },
      accounts: {
        create: true,
        read: false,
      },
      coworkers: {
        create: true,
        edit: false,
        disabled: false,
      },
      transfers: {
        read: true,
        validate: false,
        mark: false,
      },
      trades: {
        create: true,
        validate: false,
      },
      whitelists: {
        create: true,
        validate: false,
      },
      rules: {
        create: true,
        validate: false,
      },
    },
  },
  {
    id: 3,
    roleName: "Quality Manager",
    numCoworkers: 0,
    permissions: {
      investors: {
        create: true,
        edit: false,
        disable: false,
      },
      accounts: {
        create: true,
        read: false,
      },
      coworkers: {
        create: true,
        edit: false,
        disabled: false,
      },
      transfers: {
        read: true,
        validate: false,
        mark: false,
      },
      trades: {
        create: true,
        validate: false,
      },
      whitelists: {
        create: true,
        validate: false,
      },
      rules: {
        create: true,
        validate: false,
      },
    },
  },
  {
    id: 4,
    roleName: "Security Officer",
    numCoworkers: 2,
    permissions: {
      investors: {
        create: true,
        edit: false,
        disable: false,
      },
      accounts: {
        create: true,
        read: false,
      },
      coworkers: {
        create: true,
        edit: false,
        disabled: false,
      },
      transfers: {
        read: true,
        validate: false,
        mark: false,
      },
      trades: {
        create: true,
        validate: false,
      },
      whitelists: {
        create: true,
        validate: false,
      },
      rules: {
        create: true,
        validate: false,
      },
    },
  },
  {
    id: 5,
    roleName: "Permission Manager",
    numCoworkers: 12,
    permissions: {
      investors: {
        create: true,
        edit: false,
        disable: false,
      },
      accounts: {
        create: true,
        read: false,
      },
      coworkers: {
        create: true,
        edit: false,
        disabled: false,
      },
      transfers: {
        read: true,
        validate: false,
        mark: false,
      },
      trades: {
        create: true,
        validate: false,
      },
      whitelists: {
        create: true,
        validate: false,
      },
      rules: {
        create: true,
        validate: false,
      },
    },
  },
];
const permissionsArray = [
  {
    name: "Investors",
    value: "investors",
    availabilities: [
      { title: "Create investors", value: "create" },
      { title: "Edit investors", value: "edit" },
      { title: "Disable investors", value: "disable" },
    ],
  },
  {
    name: "Accounts",
    value: "accounts",
    availabilities: [
      { title: "Create crypto accounts", value: "create" },
      { title: "Read accounts", value: "edit" },
    ],
  },
  {
    name: "Co-workers",
    value: "coworkers",
    availabilities: [
      { title: "Create and eroll co-workers", value: "create" },
      { title: "Edit co-workers", value: "edit" },
      { title: "Disable co-workers", value: "disable" },
    ],
  },
  {
    name: "Transfers",
    value: "transfers",
    availabilities: [
      { title: "Read transfer requests", value: "read" },
      { title: "Validate transfer requests", value: "validate" },
      { title: "Mark transfer requests as done", value: "mark" },
    ],
  },
  {
    name: "Trades",
    value: "trades",
    availabilities: [
      { title: "Create trade requests", value: "create" },
      { title: "Validate trade requests", value: "validate" },
    ],
  },
  {
    name: "White lists",
    value: "whitelists",
    availabilities: [
      { title: "Create white lists", value: "create" },
      { title: "Validate white lists", value: "validate" },
    ],
  },
  {
    name: "Rules",
    value: "rules",
    availabilities: [
      { title: "Create rules", value: "create" },
      { title: "Validate rules", value: "validate" },
    ],
  },
];

export { rolesArray as default, rolesArray, permissionsArray };
