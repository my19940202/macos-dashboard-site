import appsData from "@/data/apps.json";
import type { Locale } from "@/lib/i18n";

export type AppItem = {
  name: string;
  iconUrl: string;
  deeplinks: string[];
};

type AppJsonItem = {
  name: string;
  iconFile: string;
  deeplinks: string[];
  is_system_default: boolean;
};

type AppLocalizedName = Partial<Record<Locale, string>>;

const APP_ICON_BASE_URL =
  "https://eztwwgfhrwnlyfhzqyxe.supabase.co/storage/v1/object/public/mac-dashboard/images";

const APP_NAME_TRANSLATIONS: Record<string, AppLocalizedName> = {
  "com.apple.AVB-Audio-Configuration.png": {
    zh: "AVB 音频配置",
    ja: "AVBオーディオ設定",
    es: "Configuración de audio AVB",
    fr: "Configuration audio AVB",
  },
  "com.apple.AccessibilityUIServer.png": {
    zh: "辅助功能",
    ja: "アクセシビリティ",
    es: "Accesibilidad",
    fr: "Accessibilité",
  },
  "com.apple.AddressBook.png": {
    zh: "通讯录",
    ja: "連絡先",
    es: "Contactos",
    fr: "Contacts",
  },
  "com.apple.AppStore.png": {
    zh: "App Store",
    ja: "App Store",
    es: "App Store",
    fr: "App Store",
  },
  "com.apple.AppleScriptUtility.png": {
    zh: "AppleScript 实用工具",
    ja: "AppleScriptユーティリティ",
    es: "Utilidad AppleScript",
    fr: "Utilitaire AppleScript",
  },
  "com.apple.Automator.Automator-Application-Stub.png": {
    zh: "Automator 应用模板",
    ja: "Automatorアプリケーションテンプレート",
    es: "Plantilla de app Automator",
    fr: "Modèle d’app Automator",
  },
  "com.apple.Automator.png": {
    zh: "自动操作",
    ja: "Automator",
    es: "Automator",
    fr: "Automator",
  },
  "com.apple.AutomatorInstaller.png": {
    zh: "Automator 安装器",
    ja: "Automatorインストーラ",
    es: "Instalador de Automator",
    fr: "Installateur Automator",
  },
  "com.apple.Batteries.png": {
    zh: "电池",
    ja: "バッテリー",
    es: "Batería",
    fr: "Batterie",
  },
  "com.apple.BluetoothSetupAssistant.png": {
    zh: "蓝牙设置助理",
    ja: "Bluetooth設定アシスタント",
    es: "Asistente de configuración Bluetooth",
    fr: "Assistant configuration Bluetooth",
  },
  "com.apple.BluetoothUIServer.png": {
    zh: "蓝牙",
    ja: "Bluetooth",
    es: "Bluetooth",
    fr: "Bluetooth",
  },
  "com.apple.CertificateAssistant.png": {
    zh: "证书助理",
    ja: "証明書アシスタント",
    es: "Asistente de certificados",
    fr: "Assistant certificats",
  },
  "com.apple.Chess.png": {
    zh: "国际象棋",
    ja: "チェス",
    es: "Ajedrez",
    fr: "Échecs",
  },
  "com.apple.DiagnosticsModeAssistant.png": {
    zh: "Apple 诊断",
    ja: "Apple診断",
    es: "Diagnósticos de Apple",
    fr: "Diagnostics Apple",
  },
  "com.apple.DiagnosticsReporter.png": {
    zh: "诊断报告",
    ja: "診断レポーター",
    es: "Informe de diagnóstico",
    fr: "Rapport de diagnostic",
  },
  "com.apple.Dictionary.png": {
    zh: "词典",
    ja: "辞書",
    es: "Diccionario",
    fr: "Dictionnaire",
  },
  "com.apple.EnhancedLogging.png": {
    zh: "增强日志",
    ja: "拡張ログ",
    es: "Registro mejorado",
    fr: "Journal étendu",
  },
  "com.apple.EraseAssistant.png": {
    zh: "抹掉助理",
    ja: "消去アシスタント",
    es: "Asistente de borrado",
    fr: "Assistant d’effacement",
  },
  "com.apple.FaceTime.png": {
    zh: "FaceTime 通话",
    ja: "FaceTime",
    es: "FaceTime",
    fr: "FaceTime",
  },
  "com.apple.FileProvider-Feedback.png": {
    zh: "文件提供者反馈",
    ja: "File Providerフィードバック",
    es: "Comentarios de File Provider",
    fr: "Commentaires File Provider",
  },
  "com.apple.FolderActionsDispatcher.png": {
    zh: "文件夹操作分发器",
    ja: "フォルダアクションディスパッチャ",
    es: "Despachador de acciones de carpeta",
    fr: "Répartiteur d’actions de dossier",
  },
  "com.apple.FontBook.png": {
    zh: "字体册",
    ja: "Font Book",
    es: "Libro de fuentes",
    fr: "Livre des polices",
  },
  "com.apple.GameTrampoline.png": {
    zh: "游戏启动器",
    ja: "ゲームランチャー",
    es: "Lanzador de juegos",
    fr: "Lanceur de jeux",
  },
  "com.apple.GenerativePlaygroundApp.png": {
    zh: "图乐园",
    ja: "Image Playground",
    es: "Image Playground",
    fr: "Image Playground",
  },
  "com.apple.Home.png": {
    zh: "家庭",
    ja: "ホーム",
    es: "Hogar",
    fr: "Maison",
  },
  "com.apple.Image_Capture.png": {
    zh: "图像捕捉",
    ja: "イメージキャプチャ",
    es: "Captura de imágenes",
    fr: "Capture d’images",
  },
  "com.apple.JavaLauncher.png": {
    zh: "Java 启动器",
    ja: "Javaランチャー",
    es: "Lanzador Java",
    fr: "Lanceur Java",
  },
  "com.apple.KeyboardSetupAssistant.png": {
    zh: "键盘设置助理",
    ja: "キーボード設定アシスタント",
    es: "Asistente de teclado",
    fr: "Assistant clavier",
  },
  "com.apple.ManagedClient.png": {
    zh: "受管客户端",
    ja: "管理クライアント",
    es: "Cliente administrado",
    fr: "Client géré",
  },
  "com.apple.Maps.png": {
    zh: "地图",
    ja: "マップ",
    es: "Mapas",
    fr: "Plans",
  },
  "com.apple.MedicalImagingCalibrator.png": {
    zh: "医学影像校准器",
    ja: "医用画像キャリブレータ",
    es: "Calibrador de imágenes médicas",
    fr: "Calibrateur d’imagerie médicale",
  },
  "com.apple.MobileSMS.png": {
    zh: "信息",
    ja: "メッセージ",
    es: "Mensajes",
    fr: "Messages",
  },
  "com.apple.Music.png": {
    zh: "音乐",
    ja: "ミュージック",
    es: "Música",
    fr: "Musique",
  },
  "com.apple.NetAuthAgent.png": {
    zh: "网络认证代理",
    ja: "ネットワーク認証エージェント",
    es: "Agente de autenticación de red",
    fr: "Agent d’authentification réseau",
  },
  "com.apple.Notes.png": {
    zh: "备忘录",
    ja: "メモ",
    es: "Notas",
    fr: "Notes",
  },
  "com.apple.OAHSoftwareUpdateApp.png": {
    zh: "Rosetta 2 更新器",
    ja: "Rosetta 2アップデータ",
    es: "Actualizador Rosetta 2",
    fr: "Mise à jour Rosetta 2",
  },
  "com.apple.OBEXAgent.png": {
    zh: "OBEX 代理",
    ja: "OBEXエージェント",
    es: "Agente OBEX",
    fr: "Agent OBEX",
  },
  "com.apple.ODSAgent.png": {
    zh: "ODS 代理",
    ja: "ODSエージェント",
    es: "Agente ODS",
    fr: "Agent ODS",
  },
  "com.apple.PackageUIKit.Install-in-Progress.png": {
    zh: "安装进行中",
    ja: "インストール中",
    es: "Instalando",
    fr: "Installation en cours",
  },
  "com.apple.PairedDevices.png": {
    zh: "已配对设备",
    ja: "ペアリング済みデバイス",
    es: "Dispositivos emparejados",
    fr: "Appareils associés",
  },
  "com.apple.Pass-Viewer.png": {
    zh: "卡包查看器",
    ja: "パスビューア",
    es: "Visor de tarjetas",
    fr: "Visionneuse de cartes",
  },
  "com.apple.Passwords.png": {
    zh: "密码",
    ja: "パスワード",
    es: "Contraseñas",
    fr: "Mots de passe",
  },
  "com.apple.PeopleViewService.png": {
    zh: "联系人视图服务",
    ja: "People View Service",
    es: "Servicio de vista de contactos",
    fr: "Service d’affichage des contacts",
  },
  "com.apple.Photos.png": {
    zh: "照片",
    ja: "写真",
    es: "Fotos",
    fr: "Photos",
  },
  "com.apple.Preview.png": {
    zh: "预览",
    ja: "プレビュー",
    es: "Vista previa",
    fr: "Aperçu",
  },
  "com.apple.ProblemReporter.png": {
    zh: "问题报告",
    ja: "問題レポーター",
    es: "Informe de problemas",
    fr: "Rapport de problème",
  },
  "com.apple.QuickTimePlayerX.png": {
    zh: "QuickTime Player",
    ja: "QuickTime Player",
    es: "QuickTime Player",
    fr: "QuickTime Player",
  },
  "com.apple.Safari.png": {
    zh: "Safari 浏览器",
    ja: "Safari",
    es: "Safari",
    fr: "Safari",
  },
  "com.apple.ScreenContinuity.png": {
    zh: "iPhone 镜像",
    ja: "iPhoneミラーリング",
    es: "Espejo de iPhone",
    fr: "Miroir iPhone",
  },
  "com.apple.ScreenSaver.Engine.png": {
    zh: "屏幕保护程序",
    ja: "スクリーンセーバー",
    es: "Salvapantallas",
    fr: "Écran de veille",
  },
  "com.apple.ScreenTimeWidgetApplication.png": {
    zh: "屏幕使用时间",
    ja: "スクリーンタイム",
    es: "Tiempo de uso",
    fr: "Temps d’écran",
  },
  "com.apple.Calendar.png": {
    zh: "日历",
    ja: "カレンダー",
    es: "Calendario",
    fr: "Calendrier",
  },
  "com.apple.ScriptMenuApp.png": {
    zh: "脚本菜单",
    ja: "スクリプトメニュー",
    es: "Menú de scripts",
    fr: "Menu Scripts",
  },
  "com.apple.SetupAssistant.png": {
    zh: "设置助理",
    ja: "設定アシスタント",
    es: "Asistente de configuración",
    fr: "Assistant de configuration",
  },
  "com.apple.Siri.png": {
    zh: "Siri",
    ja: "Siri",
    es: "Siri",
    fr: "Siri",
  },
  "com.apple.Stickies.png": {
    zh: "便笺",
    ja: "スティッキーズ",
    es: "Notas adhesivas",
    fr: "Notes",
  },
  "com.apple.TV.png": {
    zh: "电视",
    ja: "TV",
    es: "TV",
    fr: "TV",
  },
  "com.apple.TextEdit.png": {
    zh: "文本编辑",
    ja: "テキストエディット",
    es: "Edición de texto",
    fr: "Édition de texte",
  },
  "com.apple.VoiceMemos.png": {
    zh: "语音备忘录",
    ja: "ボイスメモ",
    es: "Grabadora de voz",
    fr: "Enregistreur vocal",
  },
  "com.apple.VoiceOver.png": {
    zh: "旁白",
    ja: "VoiceOver",
    es: "VoiceOver",
    fr: "VoiceOver",
  },
  "com.apple.accessibility.AccessibilityReader.png": {
    zh: "辅助功能阅读器",
    ja: "アクセシビリティリーダー",
    es: "Lector de accesibilidad",
    fr: "Lecteur d’accessibilité",
  },
  "com.apple.apps.launcher.png": {
    zh: "应用",
    ja: "アプリ",
    es: "Apps",
    fr: "Apps",
  },
  "com.apple.backup.launcher.png": {
    zh: "时间机器",
    ja: "Time Machine",
    es: "Máquina del tiempo",
    fr: "Machine à remonter le temps",
  },
  "com.apple.calculator.png": {
    zh: "计算器",
    ja: "計算機",
    es: "Calculadora",
    fr: "Calculatrice",
  },
  "com.apple.clock.png": {
    zh: "时钟",
    ja: "時計",
    es: "Reloj",
    fr: "Horloge",
  },
  "com.apple.controlcenter.png": {
    zh: "控制中心",
    ja: "コントロールセンター",
    es: "Centro de Control",
    fr: "Centre de contrôle",
  },
  "com.apple.displaycalibrator.png": {
    zh: "专业显示器校准器",
    ja: "Pro Displayキャリブレータ",
    es: "Calibrador de pantalla Pro",
    fr: "Calibrateur écran Pro",
  },
  "com.apple.dock.png": {
    zh: "程序坞",
    ja: "Dock",
    es: "Dock",
    fr: "Dock",
  },
  "com.apple.dt.CommandLineTools.installondemand.png": {
    zh: "安装命令行开发者工具",
    ja: "コマンドライン開発ツールをインストール",
    es: "Instalar herramientas de línea de comandos",
    fr: "Installer les outils en ligne de commande",
  },
  "com.apple.dt.Xcode.png": {
    zh: "Xcode",
    ja: "Xcode",
    es: "Xcode",
    fr: "Xcode",
  },
  "com.apple.exposelauncher.png": {
    zh: "调度中心",
    ja: "Mission Control",
    es: "Mission Control",
    fr: "Mission Control",
  },
  "com.apple.findmy.png": {
    zh: "查找",
    ja: "探す",
    es: "Buscar",
    fr: "Localiser",
  },
  "com.apple.freeform.png": {
    zh: "无边记",
    ja: "フリーボード",
    es: "Freeform",
    fr: "Freeform",
  },
  "com.apple.gamecenter.png": {
    zh: "Game Center",
    ja: "Game Center",
    es: "Game Center",
    fr: "Game Center",
  },
  "com.apple.games.png": {
    zh: "游戏",
    ja: "ゲーム",
    es: "Juegos",
    fr: "Jeux",
  },
  "com.apple.helpviewer.png": {
    zh: "提示",
    ja: "ヒント",
    es: "Sugerencias",
    fr: "Astuces",
  },
  "com.apple.iBooksX.png": {
    zh: "图书",
    ja: "ブック",
    es: "Libros",
    fr: "Livres",
  },
  "com.apple.icq.png": {
    zh: "iCloud+",
    ja: "iCloud+",
    es: "iCloud+",
    fr: "iCloud+",
  },
  "com.apple.installer.png": {
    zh: "安装器",
    ja: "インストーラ",
    es: "Instalador",
    fr: "Installateur",
  },
  "com.apple.journal.png": {
    zh: "手记",
    ja: "ジャーナル",
    es: "Diario",
    fr: "Journal",
  },
  "com.apple.mail.png": {
    zh: "邮件",
    ja: "メール",
    es: "Correo",
    fr: "Mail",
  },
  "com.apple.mobilephone.png": {
    zh: "电话",
    ja: "電話",
    es: "Teléfono",
    fr: "Téléphone",
  },
  "com.apple.musicrecognition.mac.png": {
    zh: "音乐识别",
    ja: "音楽認識",
    es: "Reconocimiento de música",
    fr: "Reconnaissance musicale",
  },
  "com.apple.news.png": {
    zh: "新闻",
    ja: "ニュース",
    es: "Noticias",
    fr: "Actualités",
  },
  "com.apple.podcasts.png": {
    zh: "播客",
    ja: "Podcast",
    es: "Podcasts",
    fr: "Podcasts",
  },
  "com.apple.print.add.png": {
    zh: "添加打印机",
    ja: "プリンタを追加",
    es: "Añadir impresora",
    fr: "Ajouter une imprimante",
  },
  "com.apple.reminders.png": {
    zh: "提醒事项",
    ja: "リマインダー",
    es: "Recordatorios",
    fr: "Rappels",
  },
  "com.apple.shortcuts.png": {
    zh: "快捷指令",
    ja: "ショートカット",
    es: "Atajos",
    fr: "Raccourcis",
  },
  "com.apple.siri.launcher.png": {
    zh: "Siri",
    ja: "Siri",
    es: "Siri",
    fr: "Siri",
  },
  "com.apple.stocks.png": {
    zh: "股市",
    ja: "株価",
    es: "Bolsa",
    fr: "Bourse",
  },
  "com.apple.systempreferences.png": {
    zh: "系统设置",
    ja: "システム設定",
    es: "Ajustes del sistema",
    fr: "Réglages Système",
  },
  "com.apple.tips.png": {
    zh: "提示聚焦处理器",
    ja: "Tips Spotlight Handler",
    es: "Procesador de sugerencias",
    fr: "Gestionnaire d’astuces",
  },
  "com.apple.universalcontrol.png": {
    zh: "通用控制",
    ja: "ユニバーサルコントロール",
    es: "Control Universal",
    fr: "Contrôle universel",
  },
  "com.apple.weather.png": {
    zh: "天气",
    ja: "天気",
    es: "El tiempo",
    fr: "Météo",
  },
  "com.apple.widgetkit.simulator.png": {
    zh: "WidgetKit 模拟器",
    ja: "WidgetKitシミュレータ",
    es: "Simulador WidgetKit",
    fr: "Simulateur WidgetKit",
  },
  "com.bot.pc.doubao.png": {
    zh: "豆包",
    ja: "Doubao",
    es: "Doubao",
    fr: "Doubao",
  },
  "com.crystalidea.macsfancontrol.png": {
    zh: "Mac 风扇控制",
    ja: "Macs Fan Control",
    es: "Macs Fan Control",
    fr: "Macs Fan Control",
  },
  "com.google.Chrome.png": {
    zh: "谷歌浏览器",
    ja: "Google Chrome",
    es: "Google Chrome",
    fr: "Google Chrome",
  },
  "com.microsoft.Excel.png": {
    zh: "Microsoft Excel",
    ja: "Microsoft Excel",
    es: "Microsoft Excel",
    fr: "Microsoft Excel",
  },
  "com.microsoft.Word.png": {
    zh: "Microsoft Word",
    ja: "Microsoft Word",
    es: "Microsoft Word",
    fr: "Microsoft Word",
  },
  "com.microsoft.Powerpoint.png": {
    zh: "Microsoft PowerPoint",
    ja: "Microsoft PowerPoint",
    es: "Microsoft PowerPoint",
    fr: "Microsoft PowerPoint",
  },
  "com.microsoft.VSCode.png": {
    zh: "Visual Studio Code",
    ja: "Visual Studio Code",
    es: "Visual Studio Code",
    fr: "Visual Studio Code",
  },
  "com.microsoft.edgemac.png": {
    zh: "Microsoft Edge",
    ja: "Microsoft Edge",
    es: "Microsoft Edge",
    fr: "Microsoft Edge",
  },
  "com.postmanlabs.mac.png": {
    zh: "Postman",
    ja: "Postman",
    es: "Postman",
    fr: "Postman",
  },
  "com.tencent.meeting.png": {
    zh: "腾讯会议",
    ja: "Tencent Meeting",
    es: "Tencent Meeting",
    fr: "Tencent Meeting",
  },
  "com.tencent.qq.png": {
    zh: "QQ",
    ja: "QQ",
    es: "QQ",
    fr: "QQ",
  },
  "com.tencent.webplusdevtools.png": {
    zh: "微信开发者工具",
    ja: "WeChat DevTools",
    es: "WeChat DevTools",
    fr: "WeChat DevTools",
  },
  "com.tencent.xinWeChat.png": {
    zh: "微信",
    ja: "WeChat",
    es: "WeChat",
    fr: "WeChat",
  },
  "com.todesktop.230313mzl4w4u92.png": {
    zh: "Cursor",
    ja: "Cursor",
    es: "Cursor",
    fr: "Cursor",
  },
  "company.thebrowser.Browser.png": {
    zh: "Arc 浏览器",
    ja: "Arc",
    es: "Arc",
    fr: "Arc",
  },
  "cx.c3.theunarchiver.png": {
    zh: "解压专家",
    ja: "The Unarchiver",
    es: "The Unarchiver",
    fr: "The Unarchiver",
  },
  "dev.kdrag0n.MacVirt.png": {
    zh: "OrbStack",
    ja: "OrbStack",
    es: "OrbStack",
    fr: "OrbStack",
  },
  "dev.warp.Warp-Stable.png": {
    zh: "Warp",
    ja: "Warp",
    es: "Warp",
    fr: "Warp",
  },
  "figma-icon.png": {
    zh: "Figma",
    ja: "Figma",
    es: "Figma",
    fr: "Figma",
  },
  "slack-icon.png": {
    zh: "Slack",
    ja: "Slack",
    es: "Slack",
    fr: "Slack",
  },
  "zoom-icon.webp": {
    zh: "Zoom",
    ja: "Zoom",
    es: "Zoom",
    fr: "Zoom",
  },
  "spotify-icon.png": {
    zh: "Spotify",
    ja: "Spotify",
    es: "Spotify",
    fr: "Spotify",
  },
  "com.fogcreek.trello.png": {
    zh: "Trello",
    ja: "Trello",
    es: "Trello",
    fr: "Trello",
  },
  "1Password-icon.png": {
    zh: "1Password",
    ja: "1Password",
    es: "1Password",
    fr: "1Password",
  },
  "com.getdropbox.dropbox.png": {
    zh: "Dropbox",
    ja: "Dropbox",
    es: "Dropbox",
    fr: "Dropbox",
  },
};

function getLocalizedAppName(item: AppJsonItem, locale: Locale): string {
  if (locale === "en") {
    return item.name;
  }

  const localizedName = APP_NAME_TRANSLATIONS[item.iconFile]?.[locale];
  return localizedName || item.name;
}

export function getApps(locale: Locale = "zh"): AppItem[] {
  const items = appsData as AppJsonItem[];

  return items
    .filter((item) => Boolean(item.deeplinks && item.deeplinks.length))
    .sort((a, b) => {
      if (a.is_system_default === b.is_system_default) {
        return 0;
      }

      return a.is_system_default ? -1 : 1;
    })
    .map((item) => ({
      name: getLocalizedAppName(item, locale),
      deeplinks: item.deeplinks,
      iconUrl: `${APP_ICON_BASE_URL}/${item.iconFile}`,
    }));
}
