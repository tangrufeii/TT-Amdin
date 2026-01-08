const local: App.I18n.Schema = {
  system: {
    title: 'TT Admin 管理系统',
    updateTitle: '系统版本更新通知',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateConfirm: '立即刷新',
    updateCancel: '稍后再说'
  },
  common: {
    action: '操作',
    add: '新增',
    addSuccess: '添加成功',
    backToHome: '返回首页',
    batchDelete: '批量删除',
    cancel: '取消',
    close: '关闭',
    check: '勾选',
    checkAll: '全选',
    uncheckAll: '全取消',
    expandColumn: '展开列',
    columnSetting: '列设置',
    config: '配置',
    confirm: '确认',
    delete: '删除',
    deleteSuccess: '删除成功',
    confirmDelete: '确认删除吗？',
    edit: '编辑',
    warning: '警告',
    error: '错误',
    index: '序号',
    keywordSearch: '请输入关键词搜索',
    logout: '退出登录',
    logoutConfirm: '确认退出登录吗？',
    lookForward: '敬请期待',
    modify: '修改',
    modifySuccess: '修改成功',
    noData: '无数据',
    operate: '操作',
    pleaseCheckValue: '请检查输入的值是否合法',
    refresh: '刷新',
    reset: '重置',
    search: '搜索',
    switch: '切换',
    tip: '提示',
    trigger: '触发',
    update: '更新',
    updateSuccess: '更新成功',
    createTime: '创建时间',
    createUser: '创建人',
    userCenter: '个人中心',
    yesOrNo: {
      yes: '是',
      no: '否'
    }
  },
  request: {
    logout: '请求失败后登出用户',
    logoutMsg: '用户状态失效，请重新登录',
    logoutWithModal: '请求失败后弹出模态框再登出用户',
    logoutWithModalMsg: '用户状态失效，请重新登录',
    refreshToken: '请求的token已过期，刷新token',
    tokenExpired: 'token已过期'
  },
  theme: {
    themeDrawerTitle: '主题配置',
    tabs: {
      appearance: '外观',
      layout: '布局',
      general: '通用',
      preset: '预设'
    },
    appearance: {
      themeSchema: {
        title: '主题模式',
        light: '亮色模式',
        dark: '暗黑模式',
        auto: '跟随系统'
      },
      grayscale: '灰色模式',
      colourWeakness: '色弱模式',
      themeColor: {
        title: '主题颜色',
        primary: '主色',
        info: '信息色',
        success: '成功色',
        warning: '警告色',
        error: '错误色',
        followPrimary: '跟随主色'
      },
      themeRadius: {
        title: '主题圆角'
      },
      recommendColor: '应用推荐算法的颜色',
      recommendColorDesc: '推荐颜色的算法参照',
      preset: {
        title: '主题预设',
        apply: '应用',
        applySuccess: '预设应用成功',
        default: {
          name: '默认预设',
          desc: 'TT Admin 默认主题预设'
        },
        dark: {
          name: '暗色预设',
          desc: '适用于夜间使用的暗色主题预设'
        },
        compact: {
          name: '紧凑型',
          desc: '适用于小屏幕的紧凑布局预设'
        },
        azir: {
          name: 'Azir的预设',
          desc: '是 Azir 比较喜欢的莫兰迪色系冷淡风'
        }
      }
    },
    layout: {
      layoutMode: {
        title: '布局模式',
        vertical: '左侧菜单模式',
        'vertical-mix': '左侧菜单混合模式',
        'vertical-hybrid-header-first': '左侧混合-顶部优先',
        horizontal: '顶部菜单模式',
        'top-hybrid-sidebar-first': '顶部混合-侧边优先',
        'top-hybrid-header-first': '顶部混合-顶部优先',
        vertical_detail: '左侧菜单布局，菜单在左，内容在右。',
        'vertical-mix_detail': '左侧双菜单布局，一级菜单在左侧深色区域，二级菜单在左侧浅色区域。',
        'vertical-hybrid-header-first_detail':
          '左侧混合布局，一级菜单在顶部，二级菜单在左侧深色区域，三级菜单在左侧浅色区域。',
        horizontal_detail: '顶部菜单布局，菜单在顶部，内容在下方。',
        'top-hybrid-sidebar-first_detail': '顶部混合布局，一级菜单在左侧，二级菜单在顶部。',
        'top-hybrid-header-first_detail': '顶部混合布局，一级菜单在顶部，二级菜单在左侧。'
      },
      tab: {
        title: '标签栏设置',
        visible: '显示标签栏',
        cache: '标签栏信息缓存',
        cacheTip: '一键开启/关闭全局 keepalive',
        height: '标签栏高度',
        mode: {
          title: '标签栏风格',
          slider: '滑块风格',
          chrome: '谷歌风格',
          button: '按钮风格'
        },
        closeByMiddleClick: '鼠标中键关闭标签页',
        closeByMiddleClickTip: '启用后可以使用鼠标中键点击标签页进行关闭'
      },
      header: {
        title: '头部设置',
        height: '头部高度',
        breadcrumb: {
          visible: '显示面包屑',
          showIcon: '显示面包屑图标'
        }
      },
      sider: {
        title: '侧边栏设置',
        inverted: '深色侧边栏',
        width: '侧边栏宽度',
        collapsedWidth: '侧边栏折叠宽度',
        mixWidth: '混合布局侧边栏宽度',
        mixCollapsedWidth: '混合布局侧边栏折叠宽度',
        mixChildMenuWidth: '混合布局子菜单宽度'
      },
      footer: {
        title: '底部设置',
        visible: '显示底部',
        fixed: '固定底部',
        height: '底部高度',
        right: '底部居右'
      },
      content: {
        title: '内容区域设置',
        scrollMode: {
          title: '滚动模式',
          tip: '主题滚动仅 main 部分滚动，外层滚动可携带头部底部一起滚动',
          wrapper: '外层滚动',
          content: '主体滚动'
        },
        page: {
          animate: '页面切换动画',
          mode: {
            title: '页面切换动画类型',
            'fade-slide': '滑动',
            fade: '淡入淡出',
            'fade-bottom': '底部消退',
            'fade-scale': '缩放消退',
            'zoom-fade': '渐变',
            'zoom-out': '闪现',
            none: '无'
          }
        },
        fixedHeaderAndTab: '固定头部和标签栏'
      }
    },
    general: {
      title: '通用设置',
      watermark: {
        title: '水印设置',
        visible: '显示全屏水印',
        text: '自定义水印文本',
        enableUserName: '启用用户名水印',
        enableTime: '显示当前时间',
        timeFormat: '时间格式'
      },
      multilingual: {
        title: '多语言设置',
        visible: '显示多语言按钮'
      },
      globalSearch: {
        title: '全局搜索设置',
        visible: '显示全局搜索按钮'
      }
    },
    configOperation: {
      copyConfig: '复制配置',
      copySuccessMsg: '复制成功，请替换 src/theme/settings.ts 中的变量 themeSettings',
      resetConfig: '重置配置',
      resetSuccessMsg: '重置成功'
    }
  },
  route: {
    login: '登录',
    403: '无权限',
    404: '页面不存在',
    500: '服务器错误',
    'iframe-page': '外链页面',
    home: '首页',
    pluginManagement: '插件管理',
    'plugin-management': '插件管理',
    docs: '说明文档',
    pluginDev: '插件开发说明',
    projectIntro: '项目说明',
    systemManagement: '系统管理',
    systemDict: '字典管理',
    systemMenu: '菜单管理',
    systemUser: '用户管理',
    systemRole: '角色管理',
    systemNotice: '通知公告'
  },
  page: {
    login: {
      common: {
        loginOrRegister: '登录 / 注册',
        userNamePlaceholder: '请输入用户名',
        phonePlaceholder: '请输入手机号',
        codePlaceholder: '请输入验证码',
        passwordPlaceholder: '请输入密码',
        confirmPasswordPlaceholder: '请再次输入密码',
        codeLogin: '验证码登录',
        confirm: '确定',
        back: '返回',
        validateSuccess: '验证成功',
        loginSuccess: '登录成功',
        welcomeBack: '欢迎回来，{userName} ！'
      },
      pwdLogin: {
        title: '密码登录',
        rememberMe: '记住我',
        forgetPassword: '忘记密码？',
        register: '注册账号',
        otherAccountLogin: '其他账号登录',
        otherLoginMode: '其他登录方式',
        superAdmin: '超级管理员',
        admin: '管理员',
        user: '普通用户'
      },
      codeLogin: {
        title: '验证码登录',
        getCode: '获取验证码',
        reGetCode: '{time}秒后重新获取',
        sendCodeSuccess: '验证码发送成功',
        imageCodePlaceholder: '请输入图片验证码'
      },
      register: {
        title: '注册账号',
        agreement: '我已经仔细阅读并接受',
        protocol: '《用户协议》',
        policy: '《隐私权政策》'
      },
      resetPwd: {
        title: '重置密码'
      },
      bindWeChat: {
        title: '绑定微信'
      }
    },
    home: {
      branchDesc:
        'TT Admin 是面向插件化扩展的后台管理框架，支持前后端插件动态加载、菜单与权限统一配置，适合多业务线快速接入与持续演进。',
      greeting: '早安，{userName}，欢迎进入 TT Admin 控制台！',
      weatherDesc: '插件状态、系统指标与公告会在此实时呈现。',
      projectCount: '项目数',
      todo: '待办',
      message: '消息',
      downloadCount: '下载量',
      registerCount: '注册量',
      schedule: '作息安排',
      study: '学习',
      work: '工作',
      rest: '休息',
      entertainment: '娱乐',
      visitCount: '访问量',
      turnover: '成交额',
      dealCount: '成交量',
      projectNews: {
        title: '项目动态',
        moreNews: '更多动态',
        desc1: 'TT Admin 已完成插件化改造：支持模块级构建与按需加载。',
        desc2: '动态路由与菜单已对接后端数据，权限模型统一管理。',
        desc3: '插件打包流程稳定支持一键构建与 assembly 发布。',
        desc4: '系统管理模块补齐字典、菜单、用户、角色与公告入口。',
        desc5: '插件开发说明与项目说明已纳入内置文档菜单。'
      },
      creativity: '创意'
    },
    pluginManagement: {
      title: '插件管理',
      search: {
        placeholder: '请输入插件名称搜索',
        name: '插件名称',
        status: '插件状态',
        statusAll: '全部',
        statusEnabled: '已启用',
        statusDisabled: '已禁用',
        statusProcessing: '处理中'
      },
      table: {
        name: '插件名称',
        pluginId: '插件ID',
        description: '插件描述',
        version: '版本号',
        author: '作者',
        status: '状态',
        isDev: '开发模式',
        createTime: '创建时间',
        updateTime: '更新时间',
        action: '操作',
        view: '查看',
        edit: '编辑',
        delete: '删除',
        enable: '启用',
        disable: '禁用',
        install: '安装插件',
        download: '下载'
      },
      form: {
        addTitle: '新增插件',
        editTitle: '编辑插件',
        pluginId: '插件ID',
        pluginIdPlaceholder: '请输入插件ID',
        name: '插件名称',
        namePlaceholder: '请输入插件名称',
        description: '插件描述',
        descriptionPlaceholder: '请输入插件描述',
        version: '版本号',
        versionPlaceholder: '请输入版本号',
        author: '作者',
        authorPlaceholder: '请输入作者',
        email: '联系邮箱',
        emailPlaceholder: '请输入联系邮箱',
        website: '官方网址',
        websitePlaceholder: '请输入官方网址',
        isDev: '开发模式',
        frontDevAddress: '前端开发地址',
        frontDevAddressPlaceholder: '请输入前端开发地址'
      },
      statistics: {
        title: '插件统计',
        total: '插件总数',
        enabled: '已启用',
        disabled: '已禁用'
      },
      message: {
        addSuccess: '插件添加成功',
        updateSuccess: '插件更新成功',
        deleteSuccess: '插件删除成功',
        enableSuccess: '插件已启用',
        disableSuccess: '插件已禁用',
        installSuccess: '插件安装成功',
        operationFailed: '插件操作失败',
        deleteConfirm: '确认删除该插件吗？删除后无法恢复！',
        disableConfirm: '禁用插件会停止其运行，确认禁用吗？',
        enableConfirm: '启用插件会加载其功能，确认启用吗？',
        selectFile: '请选择插件文件',
        fileFormat: '仅支持 .jar 格式的插件文件',
        elapsed: '已耗时 {seconds}s'
      },
      stage: {
        start: '开始',
        prepare: '准备文件',
        validate: '校验插件',
        extract: '解压包',
        read_config: '读取配置',
        check_version: '检查版本',
        stop_old: '停止旧版本',
        copy_files: '复制文件',
        install_context: '安装上下文',
        create_classloader: '创建类加载器',
        scan_classes: '扫描类',
        create_context: '创建容器',
        init_handlers: '初始化处理器',
        execute_sql: '执行脚本',
        lifecycle: '执行生命周期',
        registry: '注册组件',
        lifecycle_start: '启动回调',
        lifecycle_stop: '停止回调',
        unregistry: '注销组件',
        lifecycle_uninstall: '卸载回调',
        remove_context: '移除容器',
        close_classloader: '关闭类加载器',
        cleanup: '清理资源',
        uninstall: '卸载',
        stop: '停止',
        complete: '完成'
      }
    },
    docs: {
      pluginDev: {
        title: '插件开发说明',
        goal: '面向插件作者的统一开发规范与构建流程说明。',
        structure: '目录建议：/ui/src/modules/<模块>/index.ts + view/*.vue。',
        build: '构建流程：执行插件 UI 的 build 脚本产出 modules 目录。',
        runtime: '运行方式：开发模式走 /plugin-dev，生产模式走 /api/plugin-static。',
        i18n: '多语言：插件内置 i18n 文件，主程序启动后动态加载。',
        tipsTitle: '开发提示',
        tipsContent: '插件名称、模块名、路由名建议保持唯一，避免与主程序冲突。'
      },
      project: {
        title: '项目说明',
        positioning: '定位：面向插件化与多业务扩展的企业级后台框架。',
        architecture: '架构：DDD + 插件体系，前端支持动态路由与菜单。',
        rbac: '权限：RBAC 模型，菜单与按钮权限统一管理。',
        frontend: '前端：Vite + Vue3 + Naive UI + 动态路由。',
        backend: '后端：Spring Boot 3 + JDK21 + MyBatis-Plus。',
        tipsTitle: '落地建议',
        tipsContent: '新增业务建议优先以插件方式接入，保持主程序稳定。'
      }
    },
    manage: {
      menu: {
        title: '菜单管理',
        detail: '菜单详情',
        addMenu: '新增菜单',
        addChildMenu: '新增子菜单',
        editMenu: '编辑菜单',
        selectTreeIsEmptyTip: '请选择左侧菜单节点',
        menuTypeIsDirectory: '目录类型不支持按钮权限',
        type: '菜单类型',
        status: '状态',
        name: '菜单名称',
        i18nKey: '多语言键',
        routeName: '路由名称',
        routePath: '路由路径',
        hideInMenu: '菜单中隐藏',
        keepAlive: '页面缓存',
        href: '外部链接',
        iframeUrl: 'Iframe 地址',
        layout: '布局',
        page: '页面',
        sort: '排序',
        pathParam: '路径参数',
        multiTab: '多标签',
        fixedIndexInTab: '固定标签序号',
        iconTypeTitle: '图标类型',
        icon: '菜单图标',
        query: '路由查询参数',
        form: {
          name: '请输入菜单名称',
          routeName: '请输入路由名称',
          i18nKey: '请输入多语言键',
          icon: '请输入图标',
          routePath: '路由路径',
          layout: '请选择布局',
          page: '请选择页面',
          sort: '请输入排序值',
          pathParam: '请输入路径参数',
          href: '请输入外部链接',
          iframeUrl: '请输入 iframe 地址',
          queryKey: '参数名',
          queryValue: '参数值'
        }
      },
      dict: {
        title: '字典管理',
        name: '字典名称',
        code: '字典编码',
        type: '字典类型',
        description: '字典描述',
        sort: '排序',
        status: '字典状态',
        form: {
          name: '请输入字典名称',
          code: '请输入字典编码',
          type: '请选择字典类型',
          description: '请输入字典描述',
          sort: '请输入排序',
          status: '请选择字典状态'
        },
        addDict: '新增字典',
        editDict: '编辑字典',
        dictType: {
          system: '系统字典',
          business: '业务字典'
        },
        selectTreeIsEmptyTip: '请选择字典查看子项'
      },
      dictItem: {
        title: '字典项列表',
        dictCode: '字典编码',
        value: '字典值',
        zhCn: '中文',
        enUs: '英文',
        sort: '排序',
        type: '类型',
        status: '状态',
        description: '描述',
        form: {
          value: '请输入字典值',
          zhCn: '请输入中文名称',
          enUs: '请输入英文名称',
          type: '请选择类型',
          sort: '请输入排序',
          status: '请选择状态',
          description: '请输入描述'
        },
        addDictItem: '新增字典项',
        editDictItem: '编辑字典项'
      },
      user: {
        title: '用户管理',
        description: '维护系统用户、分配角色、重置密码等操作入口。',
        userName: '用户名',
        nickName: '昵称',
        realName: '真实姓名',
        phone: '手机号',
        email: '邮箱',
        status: '状态',
        role: '角色',
        createTime: '创建时间',
        resetPassword: '重置密码',
        form: {
          userName: '请输入用户名',
          password: '请输入密码',
          nickName: '请输入昵称',
          realName: '请输入真实姓名',
          phone: '请输入手机号',
          email: '请输入邮箱',
          status: '请选择状态',
          role: '请选择角色'
        }
      },
      role: {
        addRole: '新增角色',
        editRole: '编辑角色',
        title: '角色管理',
        description: '配置角色权限范围，让不同业务身份有差异化的功能访问能力。',
        roleName: '角色名称',
        roleCode: '角色编码',
        status: '状态',
        sort: '排序',
        descriptionField: '描述',
        menuAuth: '菜单权限',
        buttonAuth: '按钮权限',
        form: {
          roleName: '请输入角色名称',
          roleCode: '请输入角色编码',
          status: '请选择状态',
          sort: '请输入排序',
          description: '请输入描述'
        }
      },
      permission: {
        title: '按钮权限',
        addButton: '新增按钮权限',
        editButton: '编辑按钮权限',
        name: '权限名称',
        resource: '权限标识',
        status: '状态',
        sort: '排序',
        description: '描述',
        form: {
          name: '请输入权限名称',
          resource: '请输入权限标识',
          sort: '请输入排序',
          description: '请输入描述',
          resourceIntroduction: '多个标识使用英文分号分隔'
        }
      },
      notice: {
        title: '通知公告',
        description: '发布或查看平台公告、上线提醒与注意事项。',
        category: '类别',
        content: '内容',
        releaseTime: '发布时间',
        remark: '备注',
        status: '状态',
        form: {
          category: '请选择类别',
          title: '请输入标题',
          content: '请输入内容',
          releaseTime: '请选择发布时间',
          remark: '请输入备注',
          status: '请选择状态'
        }
      }
    },
  },
  form: {
    required: '不能为空',
    userName: {
      required: '请输入用户名',
      invalid: '用户名格式不正确'
    },
    phone: {
      required: '请输入手机号',
      invalid: '手机号格式不正确'
    },
    pwd: {
      required: '请输入密码',
      invalid: '密码格式不正确，6-18位字符，包含字母、数字、下划线'
    },
    confirmPwd: {
      required: '请输入确认密码',
      invalid: '两次输入密码不一致'
    },
    code: {
      required: '请输入验证码',
      invalid: '验证码格式不正确'
    },
    email: {
      required: '请输入邮箱',
      invalid: '邮箱格式不正确'
    }
  },
  dropdown: {
    closeCurrent: '关闭',
    closeOther: '关闭其它',
    closeLeft: '关闭左侧',
    closeRight: '关闭右侧',
    closeAll: '关闭所有'
  },
  icon: {
    themeConfig: '主题配置',
    themeSchema: '主题模式',
    lang: '切换语言',
    fullscreen: '全屏',
    fullscreenExit: '退出全屏',
    reload: '刷新页面',
    collapse: '折叠菜单',
    expand: '展开菜单',
    pin: '固定',
    unpin: '取消固定'
  },
  datatable: {
    itemCount: '共 {total} 条'
  }
};

export default local;
