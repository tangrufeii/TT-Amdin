const local: App.I18n.Schema = {
  system: {
    title: 'TT Admin',
    updateTitle: 'System Version Update Notification',
    updateContent: 'A new version of the system has been detected. Do you want to refresh the page immediately?',
    updateConfirm: 'Refresh immediately',
    updateCancel: 'Later'
  },
  common: {
    action: 'Action',
    add: 'Add',
    addSuccess: 'Add Success',
    backToHome: 'Back to home',
    batchDelete: 'Batch Delete',
    cancel: 'Cancel',
    close: 'Close',
    check: 'Check',
    checkAll: 'Check All',
    uncheckAll: 'Uncheck All',
    expandColumn: 'Expand Column',
    columnSetting: 'Column Setting',
    config: 'Config',
    confirm: 'Confirm',
    delete: 'Delete',
    deleteSuccess: 'Delete Success',
    confirmDelete: 'Are you sure you want to delete?',
    edit: 'Edit',
    warning: 'Warning',
    error: 'Error',
    index: 'Index',
    keywordSearch: 'Please enter keyword',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to log out?',
    lookForward: 'Coming soon',
    modify: 'Modify',
    modifySuccess: 'Modify Success',
    noData: 'No Data',
    operate: 'Operate',
    pleaseCheckValue: 'Please check whether the value is valid',
    refresh: 'Refresh',
    reset: 'Reset',
    search: 'Search',
    switch: 'Switch',
    tip: 'Tip',
    trigger: 'Trigger',
    update: 'Update',
    updateSuccess: 'Update Success',
    createTime: 'Create Time',
    createUser: 'Create User',
    userCenter: 'User Center',
    yesOrNo: {
      yes: 'Yes',
      no: 'No'
    }
  },
  request: {
    logout: 'Logout user after request failed',
    logoutMsg: 'User status is invalid, please log in again',
    logoutWithModal: 'Pop up modal after request failed and then log out user',
    logoutWithModalMsg: 'User status is invalid, please log in again',
    refreshToken: 'The requested token has expired, refresh the token',
    tokenExpired: 'The requested token has expired'
  },
  theme: {
    themeDrawerTitle: 'Theme Configuration',
    tabs: {
      appearance: 'Appearance',
      layout: 'Layout',
      general: 'General',
      preset: 'Preset'
    },
    appearance: {
      themeSchema: {
        title: 'Theme Schema',
        light: 'Light',
        dark: 'Dark',
        auto: 'Follow System'
      },
      grayscale: 'Grayscale',
      colourWeakness: 'Colour Weakness',
      themeColor: {
        title: 'Theme Color',
        primary: 'Primary',
        info: 'Info',
        success: 'Success',
        warning: 'Warning',
        error: 'Error',
        followPrimary: 'Follow Primary'
      },
      themeRadius: {
        title: 'Theme Radius'
      },
      recommendColor: 'Apply Recommended Color Algorithm',
      recommendColorDesc: 'The recommended color algorithm refers to',
      preset: {
        title: 'Theme Presets',
        apply: 'Apply',
        applySuccess: 'Preset applied successfully',
        default: {
          name: 'Default Preset',
          desc: 'Default theme preset with balanced settings'
        },
        dark: {
          name: 'Dark Preset',
          desc: 'Dark theme preset for night time usage'
        },
        compact: {
          name: 'Compact Preset',
          desc: 'Compact layout preset for small screens'
        },
        azir: {
          name: "Azir's Preset",
          desc: 'It is a cold and elegant preset that Azir likes'
        }
      }
    },
    layout: {
      layoutMode: {
        title: 'Layout Mode',
        vertical: 'Vertical Mode',
        horizontal: 'Horizontal Mode',
        'vertical-mix': 'Vertical Mix Mode',
        'vertical-hybrid-header-first': 'Left Hybrid Header-First',
        'top-hybrid-sidebar-first': 'Top-Hybrid Sidebar-First',
        'top-hybrid-header-first': 'Top-Hybrid Header-First',
        vertical_detail: 'Vertical menu layout, with the menu on the left and content on the right.',
        'vertical-mix_detail':
          'Vertical mix-menu layout, with the primary menu on the dark left side and the secondary menu on the lighter left side.',
        'vertical-hybrid-header-first_detail':
          'Left hybrid layout, with the primary menu at the top, the secondary menu on the dark left side, and the tertiary menu on the lighter left side.',
        horizontal_detail: 'Horizontal menu layout, with the menu at the top and content below.',
        'top-hybrid-sidebar-first_detail':
          'Top hybrid layout, with the primary menu on the left and the secondary menu at the top.',
        'top-hybrid-header-first_detail':
          'Top hybrid layout, with the primary menu at the top and the secondary menu on the left.'
      },
      tab: {
        title: 'Tab Settings',
        visible: 'Tab Visible',
        cache: 'Tag Bar Info Cache',
        cacheTip: 'One-click to open/close global keepalive',
        height: 'Tab Height',
        mode: {
          title: 'Tab Mode',
          slider: 'Slider',
          chrome: 'Chrome',
          button: 'Button'
        },
        closeByMiddleClick: 'Close Tab by Middle Click',
        closeByMiddleClickTip: 'Enable closing tabs by clicking with the middle mouse button'
      },
      header: {
        title: 'Header Settings',
        height: 'Header Height',
        breadcrumb: {
          visible: 'Breadcrumb Visible',
          showIcon: 'Breadcrumb Icon Visible'
        }
      },
      sider: {
        title: 'Sider Settings',
        inverted: 'Dark Sider',
        width: 'Sider Width',
        collapsedWidth: 'Sider Collapsed Width',
        mixWidth: 'Mix Sider Width',
        mixCollapsedWidth: 'Mix Sider Collapse Width',
        mixChildMenuWidth: 'Mix Child Menu Width'
      },
      footer: {
        title: 'Footer Settings',
        visible: 'Footer Visible',
        fixed: 'Fixed Footer',
        height: 'Footer Height',
        right: 'Right Footer'
      },
      content: {
        title: 'Content Area Settings',
        scrollMode: {
          title: 'Scroll Mode',
          tip: 'The theme scroll only scrolls the main part, the outer scroll can carry the header and footer together',
          wrapper: 'Wrapper',
          content: 'Content'
        },
        page: {
          animate: 'Page Animate',
          mode: {
            title: 'Page Animate Mode',
            fade: 'Fade',
            'fade-slide': 'Slide',
            'fade-bottom': 'Fade Zoom',
            'fade-scale': 'Fade Scale',
            'zoom-fade': 'Zoom Fade',
            'zoom-out': 'Zoom Out',
            none: 'None'
          }
        },
        fixedHeaderAndTab: 'Fixed Header And Tab'
      }
    },
    general: {
      title: 'General Settings',
      watermark: {
        title: 'Watermark Settings',
        visible: 'Watermark Full Screen Visible',
        text: 'Custom Watermark Text',
        enableUserName: 'Enable User Name Watermark',
        enableTime: 'Show Current Time',
        timeFormat: 'Time Format'
      },
      multilingual: {
        title: 'Multilingual Settings',
        visible: 'Display multilingual button'
      },
      globalSearch: {
        title: 'Global Search Settings',
        visible: 'Display GlobalSearch button'
      }
    },
    configOperation: {
      copyConfig: 'Copy Config',
      copySuccessMsg: 'Copy Success, Please replace the variable "themeSettings" in "src/theme/settings.ts"',
      resetConfig: 'Reset Config',
      resetSuccessMsg: 'Reset Success'
    }
  },
  route: {
    login: 'Login',
    403: 'No Permission',
    404: 'Page Not Found',
    500: 'Server Error',
    'iframe-page': 'Iframe',
    home: 'Home',
    pluginManagement: 'Plugin Management',
    'plugin-management': 'Plugin Management',
    docs: 'Docs',
    pluginDev: 'Plugin Development',
    projectIntro: 'Project Overview',
    systemManagement: 'System Management',
    systemDict: 'Dictionary Management',
    systemMenu: 'Menu Management',
    systemUser: 'User Management',
    systemRole: 'Role Management',
    systemNotice: 'Notice Board'
  },
  page: {
    login: {
      common: {
        loginOrRegister: 'Login / Register',
        userNamePlaceholder: 'Please enter user name',
        phonePlaceholder: 'Please enter phone number',
        codePlaceholder: 'Please enter verification code',
        passwordPlaceholder: 'Please enter password',
        confirmPasswordPlaceholder: 'Please enter password again',
        codeLogin: 'Verification code login',
        confirm: 'Confirm',
        back: 'Back',
        validateSuccess: 'Verification passed',
        loginSuccess: 'Login successfully',
        welcomeBack: 'Welcome back, {userName} !'
      },
      pwdLogin: {
        title: 'Password Login',
        rememberMe: 'Remember me',
        forgetPassword: 'Forget password?',
        register: 'Register',
        otherAccountLogin: 'Other Account Login',
        otherLoginMode: 'Other Login Mode',
        superAdmin: 'Super Admin',
        admin: 'Admin',
        user: 'User'
      },
      codeLogin: {
        title: 'Verification Code Login',
        getCode: 'Get verification code',
        reGetCode: 'Reacquire after {time}s',
        sendCodeSuccess: 'Verification code sent successfully',
        imageCodePlaceholder: 'Please enter image verification code'
      },
      register: {
        title: 'Register',
        agreement: 'I have read and agree to',
        protocol: '《User Agreement》',
        policy: '《Privacy Policy》'
      },
      resetPwd: {
        title: 'Reset Password'
      },
      bindWeChat: {
        title: 'Bind WeChat'
      }
    },
    home: {
      branchDesc:
        'TT Admin is a plugin-oriented admin framework with dynamic loading, unified menus, and permission management for multi-business growth.',
      greeting: 'Good morning, {userName}. Welcome to the TT Admin console!',
      weatherDesc: 'Plugin status, system metrics, and notices are surfaced here.',
      projectCount: 'Project Count',
      todo: 'Todo',
      message: 'Message',
      downloadCount: 'Download Count',
      registerCount: 'Register Count',
      schedule: 'Work and rest Schedule',
      study: 'Study',
      work: 'Work',
      rest: 'Rest',
      entertainment: 'Entertainment',
      visitCount: 'Visit Count',
      turnover: 'Turnover',
      dealCount: 'Deal Count',
      projectNews: {
        title: 'Project News',
        moreNews: 'More News',
        desc1: 'TT Admin completed pluginization: module build and on-demand loading.',
        desc2: 'Dynamic routes and menus are fully driven by backend data.',
        desc3: 'Plugin build supports one-click build + assembly packaging.',
        desc4: 'System management now covers dict, menu, user, role, and notices.',
        desc5: 'Plugin dev guide and project overview are now built in.'
      },
      creativity: 'Creativity'
    },
    pluginManagement: {
      title: 'Plugin Management',
      search: {
        placeholder: 'Please enter plugin name to search',
        name: 'Plugin Name',
        status: 'Plugin Status',
        statusAll: 'All',
        statusEnabled: 'Enabled',
        statusDisabled: 'Disabled',
        statusProcessing: 'Processing'
      },
      table: {
        name: 'Plugin Name',
        pluginId: 'Plugin ID',
        description: 'Description',
        version: 'Version',
        author: 'Author',
        status: 'Status',
        isDev: 'Dev Mode',
        createTime: 'Create Time',
        updateTime: 'Update Time',
        action: 'Action',
        view: 'View',
        edit: 'Edit',
        delete: 'Delete',
        enable: 'Enable',
        disable: 'Disable',
        devConfig: 'Dev Config',
        install: 'Install Plugin',
        download: 'Download'
      },
      form: {
        addTitle: 'Add Plugin',
        editTitle: 'Edit Plugin',
        devConfigTitle: 'Dev Config',
        pluginId: 'Plugin ID',
        pluginIdPlaceholder: 'Please enter plugin ID',
        name: 'Plugin Name',
        namePlaceholder: 'Please enter plugin name',
        description: 'Description',
        descriptionPlaceholder: 'Please enter plugin description',
        version: 'Version',
        versionPlaceholder: 'Please enter version',
        author: 'Author',
        authorPlaceholder: 'Please enter author',
        email: 'Email',
        emailPlaceholder: 'Please enter contact email',
        website: 'Website',
        websitePlaceholder: 'Please enter website',
        isDev: 'Dev Mode',
        frontDevAddress: 'Frontend Dev Address',
        frontDevAddressPlaceholder: 'Please enter frontend dev address',
        frontDevAddressTip: 'In dev mode, plugin modules are loaded from this address',
        frontDevAddressHint: 'Example: http://127.0.0.1:5173 (start plugin UI dev first)'
      },
      statistics: {
        title: 'Plugin Statistics',
        total: 'Total Plugins',
        enabled: 'Enabled',
        disabled: 'Disabled'
      },
      message: {
        addSuccess: 'Plugin added successfully',
        updateSuccess: 'Plugin updated successfully',
        deleteSuccess: 'Plugin deleted successfully',
        enableSuccess: 'Plugin enabled',
        disableSuccess: 'Plugin disabled',
        installSuccess: 'Plugin installed successfully',
        operationFailed: 'Plugin operation failed',
        deleteConfirm: 'Are you sure you want to delete this plugin? It cannot be recovered!',
        disableConfirm: 'Disabling the plugin will stop its execution. Confirm to disable?',
        enableConfirm: 'Enabling the plugin will load its functions. Confirm to enable?',
        selectFile: 'Please select plugin file',
        fileFormat: 'Only .jar format plugin files are supported',
        elapsed: 'Elapsed {seconds}s',
        stageElapsed: 'Stage elapsed {seconds}s'
      },
      action: {
        install: 'Install',
        enable: 'Enable',
        disable: 'Disable',
        uninstall: 'Uninstall'
      },
      stage: {
        start: 'Start',
        prepare: 'Prepare',
        validate: 'Validate',
        extract: 'Extract',
        read_config: 'Read config',
        check_version: 'Check version',
        stop_old: 'Stop old version',
        copy_files: 'Copy files',
        install_context: 'Install context',
        create_classloader: 'Create classloader',
        scan_classes: 'Scan classes',
        create_context: 'Create context',
        init_handlers: 'Init handlers',
        execute_sql: 'Execute SQL',
        lifecycle: 'Lifecycle',
        registry: 'Register components',
        registry_class: 'Register classes',
        registry_mapper: 'Register mappers',
        registry_controller: 'Register controllers',
        registry_websocket: 'Register web sockets',
        lifecycle_start: 'Start lifecycle',
        lifecycle_stop: 'Stop lifecycle',
        unregistry: 'Unregister components',
        lifecycle_uninstall: 'Uninstall lifecycle',
        remove_context: 'Remove context',
        close_classloader: 'Close classloader',
        cleanup: 'Cleanup',
        defer_context: 'Defer context initialization',
        lifecycle_install: 'Install lifecycle',
        uninstall: 'Uninstall',
        stop: 'Stop',
        complete: 'Complete'
      }
    },
    docs: {
      pluginDev: {
        title: 'Plugin Development Guide',
        goal: 'Unified development and build guide for plugin authors.',
        structure: 'Suggested structure: /ui/src/modules/<module>/index.ts + view/*.vue.',
        build: 'Build: run the plugin UI build script to generate modules output.',
        runtime: 'Runtime: dev uses /plugin-dev, prod uses /api/plugin-static.',
        i18n: 'i18n: plugin locales are loaded dynamically at runtime.',
        tipsTitle: 'Tips',
        tipsContent: 'Keep plugin id, module name, and route name unique to avoid conflicts.'
      },
      project: {
        title: 'Project Overview',
        positioning: 'Positioning: enterprise admin framework for plugin-driven growth.',
        architecture: 'Architecture: DDD + plugin system with dynamic routes and menus.',
        rbac: 'RBAC: unified menu and button permissions.',
        frontend: 'Frontend: Vite + Vue3 + Naive UI + dynamic routing.',
        backend: 'Backend: Spring Boot 3 + JDK21 + MyBatis-Plus.',
        tipsTitle: 'Recommendation',
        tipsContent: 'Prefer plugins for new modules to keep the core stable.'
      }
    },
    manage: {
      menu: {
        title: 'Menu Management',
        detail: 'Menu Detail',
        addMenu: 'Add Menu',
        addChildMenu: 'Add Sub-menu',
        editMenu: 'Edit Menu',
        selectTreeIsEmptyTip: 'Please select a node from the tree',
        menuTypeIsDirectory: 'Directory menus do not support button permissions',
        type: 'Menu Type',
        status: 'Status',
        name: 'Menu Name',
        i18nKey: 'I18n Key',
        routeName: 'Route Name',
        routePath: 'Route Path',
        hideInMenu: 'Hide In Menu',
        keepAlive: 'Keep Alive',
        href: 'External Link',
        iframeUrl: 'Iframe Url',
        layout: 'Layout',
        page: 'Page',
        sort: 'Sort',
        pathParam: 'Path Param',
        multiTab: 'Multi Tab',
        fixedIndexInTab: 'Fixed Tab Index',
        iconTypeTitle: 'Icon Type',
        icon: 'Menu Icon',
        query: 'Route Query',
        form: {
          name: 'Please enter menu name',
          routeName: 'Please enter route name',
          i18nKey: 'Please enter i18n key',
          icon: 'Please enter icon',
          routePath: 'Route path',
          layout: 'Select layout',
          page: 'Select page',
          sort: 'Enter sort value',
          pathParam: 'Enter path param',
          href: 'Enter external link',
          iframeUrl: 'Enter iframe url',
          queryKey: 'Param key',
          queryValue: 'Param value'
        }
      },
      dict: {
        title: 'Dictionary Management',
        name: 'Dictionary Name',
        code: 'Dictionary Code',
        type: 'Dictionary Type',
        description: 'Description',
        sort: 'Sort',
        status: 'Status',
        form: {
          name: 'Please enter dictionary name',
          code: 'Please enter dictionary code',
          type: 'Please select dictionary type',
          description: 'Please enter description',
          sort: 'Please enter sort',
          status: 'Please select status'
        },
        addDict: 'Add Dictionary',
        editDict: 'Edit Dictionary',
        dictType: {
          system: 'System Dictionary',
          business: 'Business Dictionary'
        },
        selectTreeIsEmptyTip: 'Please select a dictionary to view items'
      },
      dictItem: {
        title: 'Dictionary Items',
        dictCode: 'Dictionary Code',
        value: 'Value',
        zhCn: 'Chinese',
        enUs: 'English',
        sort: 'Sort',
        type: 'Type',
        status: 'Status',
        description: 'Description',
        form: {
          value: 'Please enter value',
          zhCn: 'Please enter Chinese name',
          enUs: 'Please enter English name',
          type: 'Please select type',
          sort: 'Please enter sort',
          status: 'Please select status',
          description: 'Please enter description'
        },
        addDictItem: 'Add Dictionary Item',
        editDictItem: 'Edit Dictionary Item'
      },
      user: {
        title: 'User Management',
        description: 'Create accounts, assign roles, and reset password information for end users.',
        userName: 'Username',
        nickName: 'Nickname',
        realName: 'Real Name',
        phone: 'Phone',
        email: 'Email',
        status: 'Status',
        role: 'Role',
        createTime: 'Created At',
        resetPassword: 'Reset Password',
        form: {
          userName: 'Enter username',
          password: 'Enter password',
          nickName: 'Enter nickname',
          realName: 'Enter real name',
          phone: 'Enter phone',
          email: 'Enter email',
          status: 'Select status',
          role: 'Select roles'
        }
      },
      role: {
        title: 'Role Management',
        description: 'Configure role-based access control so every persona has the right permission.',
        addRole: 'Add Role',
        editRole: 'Edit Role',
        roleName: 'Role Name',
        roleCode: 'Role Code',
        status: 'Status',
        sort: 'Sort',
        descriptionField: 'Description',
        menuAuth: 'Menu Auth',
        buttonAuth: 'Button Auth',
        form: {
          roleName: 'Enter role name',
          roleCode: 'Enter role code',
          status: 'Select status',
          sort: 'Enter sort',
          description: 'Enter description'
        }
      },
      permission: {
        title: 'Button Permissions',
        addButton: 'Add Permission',
        editButton: 'Edit Permission',
        name: 'Permission Name',
        resource: 'Resource',
        status: 'Status',
        sort: 'Sort',
        description: 'Description',
        form: {
          name: 'Enter permission name',
          resource: 'Enter permission resource',
          sort: 'Enter sort',
          description: 'Enter description',
          resourceIntroduction: 'Resources use semicolons to separate multiple values.'
        }
      },
      notice: {
        title: 'Notice Board',
        description: 'Publish announcements and keep everyone informed about product updates.',
        category: 'Category',
        content: 'Content',
        releaseTime: 'Release Time',
        remark: 'Remark',
        status: 'Status',
        form: {
          category: 'Select category',
          title: 'Enter title',
          content: 'Enter content',
          releaseTime: 'Select release time',
          remark: 'Enter remark',
          status: 'Select status'
        }
      }
    },
  },
  form: {
    required: 'Cannot be empty',
    userName: {
      required: 'Please enter user name',
      invalid: 'User name format is incorrect'
    },
    phone: {
      required: 'Please enter phone number',
      invalid: 'Phone number format is incorrect'
    },
    pwd: {
      required: 'Please enter password',
      invalid: '6-18 characters, including letters, numbers, and underscores'
    },
    confirmPwd: {
      required: 'Please enter password again',
      invalid: 'The two passwords are inconsistent'
    },
    code: {
      required: 'Please enter verification code',
      invalid: 'Verification code format is incorrect'
    },
    email: {
      required: 'Please enter email',
      invalid: 'Email format is incorrect'
    }
  },
  dropdown: {
    closeCurrent: 'Close Current',
    closeOther: 'Close Other',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeAll: 'Close All'
  },
  icon: {
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    lang: 'Switch Language',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    reload: 'Reload Page',
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    pin: 'Pin',
    unpin: 'Unpin'
  },
  datatable: {
    itemCount: 'Total {total} items'
  }
};

export default local;
