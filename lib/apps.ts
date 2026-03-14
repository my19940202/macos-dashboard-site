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
  },
  "com.apple.AccessibilityUIServer.png": {
    zh: "辅助功能",
    ja: "アクセシビリティ",
  },
  "com.apple.AddressBook.png": {
    zh: "通讯录",
    ja: "連絡先",
  },
  "com.apple.AppStore.png": {
    zh: "App Store",
    ja: "App Store",
  },
  "com.apple.AppleScriptUtility.png": {
    zh: "AppleScript 实用工具",
    ja: "AppleScriptユーティリティ",
  },
  "com.apple.Automator.Automator-Application-Stub.png": {
    zh: "Automator 应用模板",
    ja: "Automatorアプリケーションテンプレート",
  },
  "com.apple.Automator.png": {
    zh: "自动操作",
    ja: "Automator",
  },
  "com.apple.AutomatorInstaller.png": {
    zh: "Automator 安装器",
    ja: "Automatorインストーラ",
  },
  "com.apple.Batteries.png": {
    zh: "电池",
    ja: "バッテリー",
  },
  "com.apple.BluetoothSetupAssistant.png": {
    zh: "蓝牙设置助理",
    ja: "Bluetooth設定アシスタント",
  },
  "com.apple.BluetoothUIServer.png": {
    zh: "蓝牙",
    ja: "Bluetooth",
  },
  "com.apple.CertificateAssistant.png": {
    zh: "证书助理",
    ja: "証明書アシスタント",
  },
  "com.apple.Chess.png": {
    zh: "国际象棋",
    ja: "チェス",
  },
  "com.apple.DiagnosticsModeAssistant.png": {
    zh: "Apple 诊断",
    ja: "Apple診断",
  },
  "com.apple.DiagnosticsReporter.png": {
    zh: "诊断报告",
    ja: "診断レポーター",
  },
  "com.apple.Dictionary.png": {
    zh: "词典",
    ja: "辞書",
  },
  "com.apple.EnhancedLogging.png": {
    zh: "增强日志",
    ja: "拡張ログ",
  },
  "com.apple.EraseAssistant.png": {
    zh: "抹掉助理",
    ja: "消去アシスタント",
  },
  "com.apple.FaceTime.png": {
    zh: "FaceTime 通话",
    ja: "FaceTime",
  },
  "com.apple.FileProvider-Feedback.png": {
    zh: "文件提供者反馈",
    ja: "File Providerフィードバック",
  },
  "com.apple.FolderActionsDispatcher.png": {
    zh: "文件夹操作分发器",
    ja: "フォルダアクションディスパッチャ",
  },
  "com.apple.FontBook.png": {
    zh: "字体册",
    ja: "Font Book",
  },
  "com.apple.GameTrampoline.png": {
    zh: "游戏启动器",
    ja: "ゲームランチャー",
  },
  "com.apple.GenerativePlaygroundApp.png": {
    zh: "图乐园",
    ja: "Image Playground",
  },
  "com.apple.Home.png": {
    zh: "家庭",
    ja: "ホーム",
  },
  "com.apple.Image_Capture.png": {
    zh: "图像捕捉",
    ja: "イメージキャプチャ",
  },
  "com.apple.JavaLauncher.png": {
    zh: "Java 启动器",
    ja: "Javaランチャー",
  },
  "com.apple.KeyboardSetupAssistant.png": {
    zh: "键盘设置助理",
    ja: "キーボード設定アシスタント",
  },
  "com.apple.ManagedClient.png": {
    zh: "受管客户端",
    ja: "管理クライアント",
  },
  "com.apple.Maps.png": {
    zh: "地图",
    ja: "マップ",
  },
  "com.apple.MedicalImagingCalibrator.png": {
    zh: "医学影像校准器",
    ja: "医用画像キャリブレータ",
  },
  "com.apple.MobileSMS.png": {
    zh: "信息",
    ja: "メッセージ",
  },
  "com.apple.Music.png": {
    zh: "音乐",
    ja: "ミュージック",
  },
  "com.apple.NetAuthAgent.png": {
    zh: "网络认证代理",
    ja: "ネットワーク認証エージェント",
  },
  "com.apple.Notes.png": {
    zh: "备忘录",
    ja: "メモ",
  },
  "com.apple.OAHSoftwareUpdateApp.png": {
    zh: "Rosetta 2 更新器",
    ja: "Rosetta 2アップデータ",
  },
  "com.apple.OBEXAgent.png": {
    zh: "OBEX 代理",
    ja: "OBEXエージェント",
  },
  "com.apple.ODSAgent.png": {
    zh: "ODS 代理",
    ja: "ODSエージェント",
  },
  "com.apple.PackageUIKit.Install-in-Progress.png": {
    zh: "安装进行中",
    ja: "インストール中",
  },
  "com.apple.PairedDevices.png": {
    zh: "已配对设备",
    ja: "ペアリング済みデバイス",
  },
  "com.apple.Pass-Viewer.png": {
    zh: "卡包查看器",
    ja: "パスビューア",
  },
  "com.apple.Passwords.png": {
    zh: "密码",
    ja: "パスワード",
  },
  "com.apple.PeopleViewService.png": {
    zh: "联系人视图服务",
    ja: "People View Service",
  },
  "com.apple.Photos.png": {
    zh: "照片",
    ja: "写真",
  },
  "com.apple.Preview.png": {
    zh: "预览",
    ja: "プレビュー",
  },
  "com.apple.ProblemReporter.png": {
    zh: "问题报告",
    ja: "問題レポーター",
  },
  "com.apple.QuickTimePlayerX.png": {
    zh: "QuickTime Player",
    ja: "QuickTime Player",
  },
  "com.apple.Safari.png": {
    zh: "Safari 浏览器",
    ja: "Safari",
  },
  "com.apple.ScreenContinuity.png": {
    zh: "iPhone 镜像",
    ja: "iPhoneミラーリング",
  },
  "com.apple.ScreenSaver.Engine.png": {
    zh: "屏幕保护程序",
    ja: "スクリーンセーバー",
  },
  "com.apple.ScreenTimeWidgetApplication.png": {
    zh: "屏幕使用时间",
    ja: "スクリーンタイム",
  },
  "com.apple.Calendar.png": {
    zh: "日历",
    ja: "カレンダー",
  },
  "com.apple.ScriptMenuApp.png": {
    zh: "脚本菜单",
    ja: "スクリプトメニュー",
  },
  "com.apple.SetupAssistant.png": {
    zh: "设置助理",
    ja: "設定アシスタント",
  },
  "com.apple.Siri.png": {
    zh: "Siri",
    ja: "Siri",
  },
  "com.apple.Stickies.png": {
    zh: "便笺",
    ja: "スティッキーズ",
  },
  "com.apple.TV.png": {
    zh: "电视",
    ja: "TV",
  },
  "com.apple.TextEdit.png": {
    zh: "文本编辑",
    ja: "テキストエディット",
  },
  "com.apple.VoiceMemos.png": {
    zh: "语音备忘录",
    ja: "ボイスメモ",
  },
  "com.apple.VoiceOver.png": {
    zh: "旁白",
    ja: "VoiceOver",
  },
  "com.apple.accessibility.AccessibilityReader.png": {
    zh: "辅助功能阅读器",
    ja: "アクセシビリティリーダー",
  },
  "com.apple.apps.launcher.png": {
    zh: "应用",
    ja: "アプリ",
  },
  "com.apple.backup.launcher.png": {
    zh: "时间机器",
    ja: "Time Machine",
  },
  "com.apple.calculator.png": {
    zh: "计算器",
    ja: "計算機",
  },
  "com.apple.clock.png": {
    zh: "时钟",
    ja: "時計",
  },
  "com.apple.controlcenter.png": {
    zh: "控制中心",
    ja: "コントロールセンター",
  },
  "com.apple.displaycalibrator.png": {
    zh: "专业显示器校准器",
    ja: "Pro Displayキャリブレータ",
  },
  "com.apple.dock.png": {
    zh: "程序坞",
    ja: "Dock",
  },
  "com.apple.dt.CommandLineTools.installondemand.png": {
    zh: "安装命令行开发者工具",
    ja: "コマンドライン開発ツールをインストール",
  },
  "com.apple.dt.Xcode.png": {
    zh: "Xcode",
    ja: "Xcode",
  },
  "com.apple.exposelauncher.png": {
    zh: "调度中心",
    ja: "Mission Control",
  },
  "com.apple.findmy.png": {
    zh: "查找",
    ja: "探す",
  },
  "com.apple.freeform.png": {
    zh: "无边记",
    ja: "フリーボード",
  },
  "com.apple.gamecenter.png": {
    zh: "Game Center",
    ja: "Game Center",
  },
  "com.apple.games.png": {
    zh: "游戏",
    ja: "ゲーム",
  },
  "com.apple.helpviewer.png": {
    zh: "提示",
    ja: "ヒント",
  },
  "com.apple.iBooksX.png": {
    zh: "图书",
    ja: "ブック",
  },
  "com.apple.icq.png": {
    zh: "iCloud+",
    ja: "iCloud+",
  },
  "com.apple.installer.png": {
    zh: "安装器",
    ja: "インストーラ",
  },
  "com.apple.journal.png": {
    zh: "手记",
    ja: "ジャーナル",
  },
  "com.apple.mail.png": {
    zh: "邮件",
    ja: "メール",
  },
  "com.apple.mobilephone.png": {
    zh: "电话",
    ja: "電話",
  },
  "com.apple.musicrecognition.mac.png": {
    zh: "音乐识别",
    ja: "音楽認識",
  },
  "com.apple.news.png": {
    zh: "新闻",
    ja: "ニュース",
  },
  "com.apple.podcasts.png": {
    zh: "播客",
    ja: "Podcast",
  },
  "com.apple.print.add.png": {
    zh: "添加打印机",
    ja: "プリンタを追加",
  },
  "com.apple.reminders.png": {
    zh: "提醒事项",
    ja: "リマインダー",
  },
  "com.apple.shortcuts.png": {
    zh: "快捷指令",
    ja: "ショートカット",
  },
  "com.apple.siri.launcher.png": {
    zh: "Siri",
    ja: "Siri",
  },
  "com.apple.stocks.png": {
    zh: "股市",
    ja: "株価",
  },
  "com.apple.systempreferences.png": {
    zh: "系统设置",
    ja: "システム設定",
  },
  "com.apple.tips.png": {
    zh: "提示聚焦处理器",
    ja: "Tips Spotlight Handler",
  },
  "com.apple.universalcontrol.png": {
    zh: "通用控制",
    ja: "ユニバーサルコントロール",
  },
  "com.apple.weather.png": {
    zh: "天气",
    ja: "天気",
  },
  "com.apple.widgetkit.simulator.png": {
    zh: "WidgetKit 模拟器",
    ja: "WidgetKitシミュレータ",
  },
  "com.bot.pc.doubao.png": {
    zh: "豆包",
    ja: "Doubao",
  },
  "com.crystalidea.macsfancontrol.png": {
    zh: "Mac 风扇控制",
    ja: "Macs Fan Control",
  },
  "com.google.Chrome.png": {
    zh: "谷歌浏览器",
    ja: "Google Chrome",
  },
  "com.microsoft.Excel.png": {
    zh: "Microsoft Excel",
    ja: "Microsoft Excel",
  },
  "com.microsoft.VSCode.png": {
    zh: "Visual Studio Code",
    ja: "Visual Studio Code",
  },
  "com.microsoft.edgemac.png": {
    zh: "Microsoft Edge",
    ja: "Microsoft Edge",
  },
  "com.postmanlabs.mac.png": {
    zh: "Postman",
    ja: "Postman",
  },
  "com.tencent.meeting.png": {
    zh: "腾讯会议",
    ja: "Tencent Meeting",
  },
  "com.tencent.qq.png": {
    zh: "QQ",
    ja: "QQ",
  },
  "com.tencent.webplusdevtools.png": {
    zh: "微信开发者工具",
    ja: "WeChat DevTools",
  },
  "com.tencent.xinWeChat.png": {
    zh: "微信",
    ja: "WeChat",
  },
  "com.todesktop.230313mzl4w4u92.png": {
    zh: "Cursor",
    ja: "Cursor",
  },
  "company.thebrowser.Browser.png": {
    zh: "Arc 浏览器",
    ja: "Arc",
  },
  "cx.c3.theunarchiver.png": {
    zh: "解压专家",
    ja: "The Unarchiver",
  },
  "dev.kdrag0n.MacVirt.png": {
    zh: "OrbStack",
    ja: "OrbStack",
  },
  "dev.warp.Warp-Stable.png": {
    zh: "Warp",
    ja: "Warp",
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
