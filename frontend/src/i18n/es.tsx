const es = {
  common: {
    or: 'o',
    cancel: 'Cancelar',
    reset: 'Reiniciar',
    save: 'Guardar',
    search: 'Buscar',
    edit: 'Editar',
    remove: 'Eliminar',
    new: 'Nuevo',
    export: 'Exportar a Excel',
    noDataToExport: 'No hay datos para exportar',
    import: 'Importar',
    discard: 'Descartar',
    yes: 'Si',
    no: 'No',
    pause: 'Pausa',
    areYouSure: '¿Estás seguro?',
    view: 'Ver',
    destroy: 'Eliminar',
    mustSelectARow: 'Debe seleccionar una fila',
    start: 'Comienzo',
    end: 'Final',
    select: 'Seleccione',
    continue: 'Continúa',
    filters: 'Filtros',
    more: 'More',
  },

  app: {
    title: 'Bio Investment',
  },

  api: {
    menu: 'API',
  },

  mui: {
    configurator: {
      title: 'Configurador de Material UI',
      description: 'Vea nuestras opciones de tablero.',
      sidenavColor: 'Colores',
      sidenavType: {
        title: 'Tipo Sidenav',
        description:
          'Elige entre diferentes tipos de sidenav.',
        dark: 'Oscuro',
        transparent: 'Transparente',
        white: 'Blanco',
      },
      navbarFixed: 'Navbar Fixed',
      sidenavMini: 'Sidenav Mini',
      sidenavDark: 'Claro / Oscuro',
    },
  },

  collapses: {
    reports: {
      menu: 'Reports',
    },
    tasks: {
      menu: 'Tasks',
    },
    vendors: {
      menu: 'Vendors',
    },
    risks: {
      menu: 'Risks',
    },
    marketplace: {
      menu: 'Marketplace',
    },
  },

  reports: {
    tasksByMonth: {
      menu: 'Tasks By Month',
    },
  },

  widgets: {
    tasksByMonth: {
      title: 'Tasks By Month',
    },
    tasksOnCalendar: {
      title: 'Calendar',
      modals: {
        recurring: {
          title: 'Recurring Task On {0}',
        },
        edit: {
          title: 'Edit Task',
        },
        new: {
          title: 'New Task On {0}',
        },
      },
    },
    tasksSummary: {
      title: 'Tasks',
    },
    upcomingTasks: {
      title: 'Upcoming Tasks',
    },
    risksSummary: {
      title: 'Risks',
    },
  },

  entities: {
    vendor: {
      name: 'vendor',
      label: 'Vendors',
      menu: 'Vendor Register',
      info: 'Vendor Information',
      exporterFileName: 'exportacion_vendor',
      list: {
        menu: 'Vendors',
        title: 'Vendors',
      },
      create: {
        success: 'Vendor guardado con éxito',
      },
      update: {
        success: 'Vendor guardado con éxito',
      },
      destroy: {
        success: 'Vendor eliminado con éxito',
      },
      destroyAll: {
        success: 'Vendor(s) eliminado con éxito',
      },
      sections: {
        about: 'About',
        business: 'Business',
        contactInformation: 'Contact Information',
        compliance: 'Compliance',
        risks: 'Risks',
        tasks: 'Tasks',
      },
      edit: {
        title: 'Editar Vendor',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        name: 'Name',
        status: 'Status',
        category: 'Category',
        rating: 'Rating',
        primaryContactName: 'Primary Contact Name',
        primaryContactEmail: 'Primary Contact Email',
        primaryContactPhoneNumber:
          'Primary Contact Phone Number',
        countryOfIncorporation: 'Country of Incorporation',
        dataProcessed: 'Data Processed',
        industry: 'Industry',
        supportEmail: 'Support Email',
        supportPhoneNumber: 'Support Phone Number',
        internalBusinessSponsor:
          'Internal Business Sponsor',
        descriptionOfServices: 'Description Of Services',
        logo: 'Logo',
        website: 'Website',
        address: 'Address',
        contract: 'Contract',
        documentation: 'Documentation',
        dpiaCompleted: 'DPIA Completed',
        dtiaCompleted: 'DTIA Completed',
        iso27001: 'ISO 27001',
        soc1: 'SOC1',
        soc2: 'SOC2',
        hippa: 'HIPPA',
        pcidss: 'PCI DSS',
        fedramp: 'FedRAMP',
        gdpr: 'GDPR',
        ccpa: 'CCPA',
        sox: 'SOX',
        cobit: 'COBIT',
        risks: 'Risks',
        tasks: 'Tasks',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {
        status: {
          Active: 'Active',
          Inactive: 'Inactive',
        },
        rating: {
          Critical: 'Critical',
          High: 'High',
          Medium: 'Medium',
          Low: 'Low',
          None: 'None',
        },
        countryOfIncorporation: {
          UK: 'UK',
          US: 'US',
        },
        dataProcessed: {
          None: 'None',
          PII: 'PII',
          'GDPR Special Categories':
            'GDPR Special Categories',
          Confidential: 'Confidential',
          'Highly Classified': 'Highly Classified',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Vendor',
      },
      view: {
        title: 'Ver Vendor',
      },
      importer: {
        title: 'Importar Vendors',
        fileName: 'vendor_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    vendorCategory: {
      name: 'vendorCategory',
      label: 'Vendor Categories',
      menu: 'Vendor Categories',
      exporterFileName: 'exportacion_vendorCategory',
      list: {
        menu: 'Vendor Categories',
        title: 'Vendor Categories',
      },
      create: {
        success: 'Vendor Category guardado con éxito',
      },
      update: {
        success: 'Vendor Category guardado con éxito',
      },
      destroy: {
        success: 'Vendor Category eliminado con éxito',
      },
      destroyAll: {
        success: 'Vendor Category(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Vendor Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Vendor Category',
      },
      view: {
        title: 'Ver Vendor Category',
      },
      importer: {
        title: 'Importar Vendor Categories',
        fileName: 'vendorCategory_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    task: {
      name: 'task',
      label: 'Tasks',
      menu: 'Task Register',
      info: 'Task Information',
      instances: 'Task Instances',
      exporterFileName: 'exportacion_task',
      list: {
        menu: 'Tasks',
        title: 'Tasks',
      },
      create: {
        success: 'Task guardado con éxito',
      },
      update: {
        success: 'Task guardado con éxito',
      },
      destroy: {
        success: 'Task eliminado con éxito',
      },
      destroyAll: {
        success: 'Task(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Task',
      },
      states: {
        created: 'Created',
        completed: 'Completed',
        overdue: 'Completed overdue',
        notCompleted: 'Not completed in time',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        title: 'Title',
        taskList: 'Task List',
        description: 'Description',
        notes: 'Notes',
        priority: 'Priority',
        repeat: 'Repeat',
        status: 'Status',
        owner: 'Owner',
        approver: 'Approver',
        dueDateRange: 'Due Date',
        dueDate: 'Due Date',
        completedDateRange: 'Completed Date',
        completedDate: 'Completed Date',
        attachments: 'Attachments',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {
        repeat: {
          Never: 'Never',
          Daily: 'Daily',
          Weekdays: 'Weekdays',
          Weekends: 'Weekends',
          Weekly: 'Weekly',
          Biweekly: 'Biweekly',
          Monthly: 'Monthly',
          'Every 3 Months': 'Every 3 Months',
          'Every 6 Months': 'Every 6 Months',
          Annually: 'Annually',
        },
        status: {
          Backlog: 'Backlog',
          ToDo: 'ToDo',
          'In progress': 'In progress',
          Complete: 'Complete',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Task',
      },
      view: {
        title: 'Ver Task',
      },
      importer: {
        title: 'Importar Tasks',
        fileName: 'task_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    taskPriority: {
      name: 'taskPriority',
      label: 'Task Priorities',
      menu: 'Task Priorities',
      exporterFileName: 'exportacion_taskPriority',
      list: {
        menu: 'Task Priorities',
        title: 'Task Priorities',
      },
      create: {
        success: 'Task Priority guardado con éxito',
      },
      update: {
        success: 'Task Priority guardado con éxito',
      },
      destroy: {
        success: 'Task Priority eliminado con éxito',
      },
      destroyAll: {
        success: 'Task Priority(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Task Priority',
      },
      fields: {
        id: 'Id',
        priority: 'Priority',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Task Priority',
      },
      view: {
        title: 'Ver Task Priority',
      },
      importer: {
        title: 'Importar Task Priorities',
        fileName: 'taskPriority_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    taskList: {
      name: 'taskList',
      label: 'Task Lists',
      menu: 'Task Lists',
      exporterFileName: 'exportacion_taskList',
      list: {
        menu: 'Task Lists',
        title: 'Task Lists',
      },
      create: {
        success: 'Task List guardado con éxito',
      },
      update: {
        success: 'Task List guardado con éxito',
      },
      destroy: {
        success: 'Task List eliminado con éxito',
      },
      destroyAll: {
        success: 'Task List(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Task List',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        taskdisplaycolor: 'Display Color',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {
        taskdisplaycolor: {
          red: 'Red',
          orange: 'Orange',
          yellow: 'Yellow',
          green: 'Green',
          blue: 'Blue',
          indigo: 'Indigo',
          violet: 'Violet',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Task List',
      },
      view: {
        title: 'Ver Task List',
      },
      importer: {
        title: 'Importar Task Lists',
        fileName: 'taskList_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    note: {
      name: 'note',
      label: 'Notes',
      menu: 'Notes',
      exporterFileName: 'exportacion_note',
      list: {
        menu: 'Notes',
        title: 'Notes',
      },
      create: {
        success: 'Note guardado con éxito',
      },
      update: {
        success: 'Note guardado con éxito',
      },
      destroy: {
        success: 'Note eliminado con éxito',
      },
      destroyAll: {
        success: 'Note(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Note',
      },
      fields: {
        id: 'Id',
        message: 'Message',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Note',
      },
      view: {
        title: 'Ver Note',
      },
      importer: {
        title: 'Importar Notes',
        fileName: 'note_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    risk: {
      name: 'risk',
      label: 'Risks',
      menu: 'Risk Register',
      info: 'Risk Information',
      exporterFileName: 'exportacion_risk',
      list: {
        menu: 'Risks',
        title: 'Risks',
      },
      create: {
        success: 'Risk guardado con éxito',
      },
      update: {
        success: 'Risk guardado con éxito',
      },
      destroy: {
        success: 'Risk eliminado con éxito',
      },
      destroyAll: {
        success: 'Risk(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Risk',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        title: 'Title',
        description: 'Description',
        category: 'Category',
        status: 'Status',
        owner: 'Owner',
        likelihood: 'Likelihood',
        impact: 'Impact',
        inherentScoreRange: 'Inherent Score',
        inherentScore: 'Inherent Score',
        residualScoreRange: 'Residual Score',
        residualScore: 'Residual Score',
        costRange: 'Cost',
        cost: 'Cost',
        tasks: 'Tasks',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {
        status: {
          Open: 'Open',
          Acceptance: 'Acceptance',
          Avoidance: 'Avoidance',
          Mitigation: 'Mitigation',
          Remediation: 'Remediation',
          Transfer: 'Transfer',
        },
        likelihood: {
          'Very Unlikely 1-10%': 'Very Unlikely 1-10%',
          'Unlikely 11-30%': 'Unlikely 11-30%',
          'Possible 31-50%': 'Possible 31-50%',
          'Likely 51-80%': 'Likely 51-80%',
          'Very Likely > 80%': 'Very Likely > 80%',
        },
        impact: {
          Negligible: 'Negligible',
          Minor: 'Minor',
          Moderate: 'Moderate',
          Significant: 'Significant',
          Severe: 'Severe',
        },
        inherentScore: {
          Low: 'Low',
          'Low Med': 'Low Medium',
          Medium: 'Medium',
          'Med Hi': 'Medium High',
          High: 'High',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Risk',
      },
      view: {
        title: 'Ver Risk',
      },
      importer: {
        title: 'Importar Risks',
        fileName: 'risk_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    riskCategory: {
      name: 'riskCategory',
      label: 'Risk Categories',
      menu: 'Risk Categories',
      exporterFileName: 'exportacion_riskCategory',
      list: {
        menu: 'Risk Categories',
        title: 'Risk Categories',
      },
      create: {
        success: 'Risk Category guardado con éxito',
      },
      update: {
        success: 'Risk Category guardado con éxito',
      },
      destroy: {
        success: 'Risk Category eliminado con éxito',
      },
      destroyAll: {
        success: 'Risk Category(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Risk Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Risk Category',
      },
      view: {
        title: 'Ver Risk Category',
      },
      importer: {
        title: 'Importar Risk Categories',
        fileName: 'riskCategory_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    product: {
      name: 'product',
      label: 'Products',
      menu: 'Products',
      info: 'Product Information',
      exporterFileName: 'exportacion_product',
      list: {
        menu: 'Products',
        title: 'Products',
      },
      create: {
        success: 'Product guardado con éxito',
      },
      update: {
        success: 'Product guardado con éxito',
      },
      destroy: {
        success: 'Product eliminado con éxito',
      },
      destroyAll: {
        success: 'Product(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Product',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        title: 'Title',
        description: 'Description',
        category: 'Category',
        website: 'Website',
        logo: 'Logo',
        ratingRange: 'Rating',
        rating: 'Rating',
        priceRange: 'Price',
        price: 'Price',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Product',
      },
      view: {
        title: 'Ver Product',
      },
      importer: {
        title: 'Importar Products',
        fileName: 'product_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    productCategory: {
      name: 'productCategory',
      label: 'Product Categories',
      menu: 'Product Categories',
      exporterFileName: 'exportacion_productCategory',
      list: {
        menu: 'Product Categories',
        title: 'Product Categories',
      },
      create: {
        success: 'Product Category guardado con éxito',
      },
      update: {
        success: 'Product Category guardado con éxito',
      },
      destroy: {
        success: 'Product Category eliminado con éxito',
      },
      destroyAll: {
        success: 'Product Category(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Product Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Product Category',
      },
      view: {
        title: 'Ver Product Category',
      },
      importer: {
        title: 'Importar Product Categories',
        fileName: 'productCategory_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    newsArticle: {
      name: 'newsArticle',
      label: 'News',
      menu: 'News',
      exporterFileName: 'exportacion_newsArticle',
      list: {
        menu: 'News',
        title: 'News',
      },
      create: {
        success: 'News guardado con éxito',
      },
      update: {
        success: 'News guardado con éxito',
      },
      destroy: {
        success: 'News eliminado con éxito',
      },
      destroyAll: {
        success: 'News(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar News',
      },
      fields: {
        id: 'Id',
        rssid: 'RSSID',
        feedURL: 'Feed URL',
        feedLink: 'Feed Link',
        feedTitle: 'Feed Title',
        feedDescription: 'Feed Description',
        feedIcon: 'Feed Icon',
        title: 'Title',
        link: 'Link',
        description: 'Description',
        image: 'Image',
        plainDescription: 'Plain Description',
        author: 'Author',
        dateRange: 'Date',
        date: 'Date',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo News',
      },
      view: {
        title: 'Ver News',
      },
      importer: {
        title: 'Importar News',
        fileName: 'newsArticle_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    newsFavorite: {
      name: 'newsFavorite',
      label: 'Favorites',
      menu: 'Favorites',
      exporterFileName: 'exportacion_newsFavorite',
      list: {
        menu: 'Favorites',
        title: 'Favorites',
      },
      create: {
        success: 'Favorite guardado con éxito',
      },
      update: {
        success: 'Favorite guardado con éxito',
      },
      destroy: {
        success: 'Favorite eliminado con éxito',
      },
      destroyAll: {
        success: 'Favorite(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Favorite',
      },
      fields: {
        id: 'Id',
        user: 'User',
        newsArticle: 'News',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Favorite',
      },
      view: {
        title: 'Ver Favorite',
      },
      importer: {
        title: 'Importar Favorites',
        fileName: 'newsFavorite_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    tag: {
      name: 'tag',
      label: 'Tags',
      menu: 'Tags',
      exporterFileName: 'exportacion_tag',
      list: {
        menu: 'Tags',
        title: 'Tags',
      },
      create: {
        success: 'Tag guardado con éxito',
      },
      update: {
        success: 'Tag guardado con éxito',
      },
      destroy: {
        success: 'Tag eliminado con éxito',
      },
      destroyAll: {
        success: 'Tag(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Tag',
      },
      fields: {
        id: 'Id',
        tag: 'Tag',
        user: 'User',
        newsArticle: 'News',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Tag',
      },
      view: {
        title: 'Ver Tag',
      },
      importer: {
        title: 'Importar Tags',
        fileName: 'tag_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    policyTemplate: {
      name: 'policyTemplate',
      label: 'Policy Templates',
      menu: 'Policy Templates',
      exporterFileName: 'exportacion_policyTemplate',
      list: {
        menu: 'Policy Templates',
        title: 'Policy Templates',
      },
      create: {
        success: 'Policy Template guardado con éxito',
      },
      update: {
        success: 'Policy Template guardado con éxito',
      },
      destroy: {
        success: 'Policy Template eliminado con éxito',
      },
      destroyAll: {
        success: 'Policy Template(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Policy Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        lastUpdatedRange: 'Last Updated',
        lastUpdated: 'Last Updated',
        attachment: 'Attachment',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Policy Template',
      },
      view: {
        title: 'Ver Policy Template',
      },
      importer: {
        title: 'Importar Policy Templates',
        fileName: 'policyTemplate_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    policy: {
      name: 'policy',
      label: 'Policies',
      menu: 'Policies',
      exporterFileName: 'exportacion_policy',
      list: {
        menu: 'Policies',
        title: 'Policies',
      },
      create: {
        success: 'Policy guardado con éxito',
      },
      update: {
        success: 'Policy guardado con éxito',
      },
      destroy: {
        success: 'Policy eliminado con éxito',
      },
      destroyAll: {
        success: 'Policy(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Policy',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        type: 'Type',
        versionRange: 'Version',
        version: 'Version',
        lastPublishedDateRange: 'Last Published Date',
        lastPublishedDate: 'Last Published Date',
        publishedBy: 'Published By',
        attachment: 'Attachment',
        link: 'Link',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {
        type: {
          Document: 'Document',
          Link: 'Link',
        },
      },
      placeholders: {},
      hints: {
        type: 'Upload your policy or link to it on your intranet',
      },
      new: {
        title: 'Nuevo Policy',
      },
      view: {
        title: 'Ver Policy',
      },
      importer: {
        title: 'Importar Policies',
        fileName: 'policy_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },
  },
  auth: {
    tenants: 'Espacios de trabajo',
    profile: {
      title: 'Perfil',
      success: 'Perfil actualizado con éxito',
    },
    createAnAccount: 'Crea una cuenta',
    rememberMe: 'Recuérdame',
    forgotPassword: 'Se te olvidó tu contraseña',
    signin: 'Iniciar Sesión',
    signup: 'Registrarse',
    signout: 'Desconectar',
    alreadyHaveAnAccount:
      '¿Ya tienes una cuenta? Registrarse.',
    social: {
      errors: {
        'auth-invalid-provider':
          'This email is already registered to another provider.',
        'auth-no-email': `The email associated with this account is private or inexistent.`,
      },
    },
    signinWithAnotherAccount:
      'Inicia sesión con otra cuenta',
    passwordChange: {
      title: 'Cambia la contraseña',
      success: 'Contraseña cambiada correctamente',
      mustMatch: 'Las contraseñas deben coincidir',
    },
    emailUnverified: {
      message:
        'Confirme su correo electrónico en <strong>{0}</strong> para continuar.',
      submit: 'Reenviar verificación de correo electrónico',
    },
    emptyPermissions: {
      message:
        'Aún no tienes permisos. Espera a que el administrador te otorgue privilegios.',
    },
    passwordResetEmail: {
      message:
        'Enviar contraseña restablecer correo electrónico',
      error: 'Correo electrónico no reconocido',
    },
    passwordReset: {
      message: 'Restablecer la contraseña',
    },
    emailAddressVerificationEmail: {
      error: 'Correo electrónico no reconocido',
    },
    verificationEmailSuccess:
      'Correo electrónico de verificación enviado con éxito',
    passwordResetEmailSuccess:
      'Correo electrónico de restablecimiento de contraseña enviado correctamente',
    passwordResetSuccess:
      'Contraseña cambiada correctamente',
    verifyEmail: {
      success: 'Correo electrónico verificado con éxito.',
      message:
        'Solo un momento, su correo electrónico está siendo verificado ...',
    },
  },
  tenant: {
    name: 'inquilino',
    label: 'Espacios de trabajo',
    menu: 'Espacios de trabajo',
    list: {
      menu: 'Espacios de trabajo',
      title: 'Espacios de trabajo',
    },
    create: {
      button: 'Crear espacio de trabajo',
      success: 'Espacio de trabajo guardado correctamente',
    },
    update: {
      success: 'Espacio de trabajo guardado correctamente',
    },
    destroy: {
      success: 'Espacio de trabajo eliminado correctamente',
    },
    destroyAll: {
      success:
        'Espacio(s) de trabajo eliminado(s) correctamente',
    },
    edit: {
      title: 'Editar espacio de trabajo',
    },
    fields: {
      id: 'Id',
      name: 'Nombre',
      url: 'URL',
      tenantName: 'Nombre del espacio de trabajo',
      tenantId: 'Espacio de trabajo',
      tenantUrl: 'URL del espacio de trabajo',
    },
    enumerators: {},
    new: {
      title: 'Nuevo espacio de trabajo',
    },
    invitation: {
      view: 'Ver invitaciones',
      invited: 'Invitado',
      accept: 'Aceptar la invitacion',
      decline: 'Rechazar invitación',
      declined: 'Invitación rechazada con éxito',
      acceptWrongEmail:
        'Aceptar invitación con este correo electrónico',
    },
    select: 'Seleccionar espacio de trabajo',
    validation: {
      url: 'La URL de su espacio de trabajo solo puede contener letras minúsculas, números y guiones (y debe comenzar con una letra o número).',
    },
  },
  roles: {
    admin: {
      label: 'Administración',
      description: 'Acceso total a todos los recursos.',
    },
    custom: {
      label: 'Rol personalizado',
      description: 'Acceso personalizado a recursos',
    },
  },
  user: {
    invite: 'Invitación',
    title: 'Usuarios',
    menu: 'Usuarios',
    fields: {
      id: 'Id',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Nombre completo',
      firstName: 'Nombre',
      lastName: 'Apellido',
      status: 'Estado',
      disabled: 'Discapacitado',
      phoneNumber: 'Número de teléfono',
      role: 'Rol',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
      roleUser: 'Rol/Usuario',
      roles: 'Roles',
      createdAtRange: 'Creado el',
      password: 'Contraseña',
      rememberMe: 'Recuérdame',
      oldPassword: 'Contraseña anterior',
      newPassword: 'Nueva contraseña',
      newPasswordConfirmation:
        'Nueva confirmación de contraseña',
    },
    enabled: 'Habilitado',
    disabled: 'Discapacitado',
    validations: {
      // eslint-disable-next-line
      email: 'El correo electrónico ${value} no es válido',
    },
    disable: 'Inhabilitar',
    enable: 'Habilitar',
    doEnableSuccess: 'Usuario habilitado con éxito',
    doDisableSuccess: 'Usuario deshabilitado con éxito',
    doDisableAllSuccess:
      'Usuario(s) deshabilitado con éxito',
    doEnableAllSuccess:
      'Usuario(s) habilitados correctamente',
    doAddSuccess: 'Usuario(s) guardado correctamente',
    doUpdateSuccess: 'Usuario guardado con éxito',
    status: {
      active: 'Activo',
      invited: 'Invitado',
      'empty-permissions': 'Esperando permisos',
    },
    exporterFileName: 'usuarios_exportacion',
    doDestroySuccess: 'Usuario eliminado con éxito',
    doDestroyAllSelectedSuccess:
      'Usuario(s) eliminado correctamente',
    edit: {
      title: 'Editar Usuario',
    },
    new: {
      title: 'Invitar Usuario(s)',
      titleModal: 'Nuevo Usuario',
      emailsHint:
        'Separe varias direcciones de correo electrónico utilizando el carácter de coma.',
    },
    view: {
      title: 'Ver Usuario',
      activity: 'Actividad',
    },
    importer: {
      title: 'Importar Usuarios',
      fileName: 'users_import_template',
      hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio. Las relaciones deben ser la ID de los registros referenciados separados por espacio. Los roles deben ser los identificadores de roles separados por espacio.',
    },
    errors: {
      userAlreadyExists:
        'El usuario con este correo electrónico ya existe',
      userNotFound: 'Usuario no encontrado',
      disablingHimself: 'No puedes inhabilitarte',
      revokingOwnPermission:
        'No puede revocar su propio permiso de administrador',
    },
  },
  auditLog: {
    menu: 'Registros de auditoría',
    title: 'Registros de auditoría',
    exporterFileName: 'audit_log_export',
    entityNamesHint:
      'Separe varias entidades con el carácter de coma.',
    fields: {
      id: 'Id',
      timestampRange: 'Período',
      entityName: 'Entidad',
      entityNames: 'Entidades',
      entityId: 'ID de entidad',
      action: 'Acción',
      values: 'Valores',
      timestamp: 'Fecha',
      createdByEmail: 'Email del usuario',
    },
  },
  settings: {
    title: 'Configuraciones',
    tenant: 'Tenant',
    menu: 'Configuraciones',
    save: {
      success:
        'Configuración guardada con éxito. La página se volverá a cargar en {0} segundos para que los cambios surtan efecto.',
    },
    fields: {
      primary: 'Color primario',
      secondary: 'Color secundario',
      logos: 'Logo',
      backgroundImages: 'Imágenes de fondo',
      shade: 'Sombra',
    },
  },
  dashboard: {
    menu: 'Tablero',
    message:
      'Esta página utiliza datos falsos solo con fines de demostración. Puede editarlo en frontend/view/dashboard/DashboardPage.ts.',
    charts: {
      day: 'Día',
      red: 'Rojo',
      green: 'Verde',
      yellow: 'Amarillo',
      grey: 'Gris',
      blue: 'Azul',
      orange: 'Naranja',
      months: {
        '1': 'Enero',
        '2': 'Febrero',
        '3': 'Marzo',
        '4': 'Abril',
        '5': 'Mayo',
        '6': 'Junio',
        '7': 'Julio',
      },
      eating: 'Comiendo',
      drinking: 'Bebiendo',
      sleeping: 'Dormiendo',
      designing: 'Diseñando',
      coding: 'Codificando',
      cycling: 'Pedalando',
      running: 'Corriendo',
      customer: 'Cliente',
    },
  },
  errors: {
    '403': 'Lo sentimos, no tienes acceso a esta página',
    '404': 'Lo sentimos, la página que visitaste no existe',
    '500': 'Lo sentimos, el servidor informa un error',
    '429':
      'Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.',
    backToHome: 'Volver a Inicio',
    forbidden: {
      message: 'Prohibido',
    },
    validation: {
      message: 'Ocurrió un error',
    },
    defaultErrorMessage: 'Ops, ocurrió un error',
  },

  preview: {
    error:
      'Lo sentimos, esta operación no está permitida en el modo de vista previa.',
  },
  fileUploader: {
    upload: 'Subir',
    image: 'Debes subir una imagen',
    size: 'El archivo es muy grande. El tamaño máximo permitido es {0}',
    formats: 'Formato inválido. Debe ser uno de: {0}.',
  },

  autocomplete: {
    loading: 'Cargando...',
    noOptions: 'Datos no encontrados',
  },
  customViewer: {
    default: 'No Data',
    noData: 'No {0}',
  },
  imagesViewer: {
    noImage: 'Sin imágen',
  },
  table: {
    noData: 'No se encontraron registros',
    loading: 'Cargando...',
  },
  pagination: {
    labelDisplayedRows: '{0}-{1} de {2}',
    labelRowsPerPage: 'Por página:',
  },
};

export default es;
