import Link from "next/link";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

type BlogSection = {
  heading: string;
  paragraphs: string[];
};

type BlogHighlight = {
  title: string;
  description: string;
};

type BlogCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  lead: string;
  metadataTitle: string;
  metadataDescription: string;
  highlights: BlogHighlight[];
  sections: BlogSection[];
  ctaLabel: string;
  backLabel: string;
};

const blogCopy: Record<Locale, BlogCopy> = {
  zh: {
    eyebrow: "免费 Web 版，保留你熟悉的启动台体验",
    title: "你熟悉的 Launchpad，已为 macOS 26 Tahoe 打磨重塑",
    subtitle: "LaunchOS 是 macOS 26 的免费 Launchpad 替代方案。",
    lead:
      "Spotlight 很好，但很多人依然需要启动台。我们需要的不只是搜索框，还需要一种更直观、更有秩序、更符合使用习惯的方式来打开应用。LaunchOS 正是为此而生。",
    metadataTitle: "LaunchOS 博客 | 免费的 Web 版 macOS Launchpad 替代方案",
    metadataDescription:
      "了解 LaunchOS 如何用免费的 Web 方式，还原 macOS Launchpad 的熟悉体验，并尊重用户长期形成的操作习惯。",
    highlights: [
      {
        title: "免费",
        description: "直接在浏览器中使用，不需要购买额外软件，也不需要复杂安装流程。",
      },
      {
        title: "方便",
        description: "打开网页就能访问，支持收藏、固定到桌面或作为 PWA 使用，进入成本更低。",
      },
      {
        title: "还原体验",
        description: "延续 Launchpad 的视觉浏览和点击启动方式，让你靠图标与位置快速找到应用。",
      },
      {
        title: "尊重习惯",
        description: "不是逼用户改变工作流，而是尽量保留他们已经熟悉的 Mac 使用方式。",
      },
    ],
    sections: [
      {
        heading: "Spotlight 很强，但它不能取代所有习惯",
        paragraphs: [
          "Spotlight 是优秀的效率工具，我们也每天都在用。但搜索并不是每个人在每个场景下都最自然的入口。很多时候，我们不是想起应用的名字再输入，而是靠图标、位置和视觉记忆完成操作。",
          "Launchpad 对不少 Mac 用户来说，不只是一个应用列表，而是一种稳定的个人秩序。工作类应用放在一页，创作类应用放在另一页，常用工具总在熟悉的位置。这种秩序感，本身就是效率的一部分。",
        ],
      },
      {
        heading: "为什么选择 Web 版",
        paragraphs: [
          "我们希望 LaunchOS 足够轻，足够快，也足够容易上手。于是我们选择了 Web 形态：打开即用，免费可访问，不要求用户先学习一套新的桌面工具逻辑。",
          "对于很多用户来说，Web 版还有一个关键优势：更方便。你可以从浏览器直接进入，可以固定标签页，也可以安装成 PWA。它不像传统替代软件那样需要额外维护，却依然能提供接近原生启动台的体验。",
        ],
      },
      {
        heading: "我们想还原的，不只是界面，而是使用感受",
        paragraphs: [
          "LaunchOS 的目标不是简单做一个图标网格，而是尽量还原用户熟悉的使用路径。你打开页面后，不需要重新理解信息架构；视觉重心、浏览方式、点击逻辑，都会尽可能贴近 Launchpad 本身。",
          "这种还原感非常重要，因为真正影响体验的往往不是功能多少，而是用户是否还能顺着原有的直觉继续使用。好的替代方案，不应该让人感觉在重新学习，而应该让人觉得一切仍然顺手。",
        ],
      },
      {
        heading: "尊重用户习惯，比教育用户更重要",
        paragraphs: [
          "软件设计里常见一种误区：默认用户应该适应新的工具逻辑。但我们更相信，优秀产品应该先理解用户已经形成的习惯，再决定如何服务它们。",
          "有些人偏爱键盘搜索，有些人更依赖图形浏览；有些人记得应用名，有些人只记得图标在哪。LaunchOS 不试图否定 Spotlight，而是承认 Launchpad 仍然有存在价值，并为这类用户提供一个免费的、方便的、足够熟悉的选择。",
        ],
      },
      {
        heading: "为我们自己做，也为和我们一样的人做",
        paragraphs: [
          "我们做 LaunchOS，首先是因为自己需要它。Spotlight 很棒，但我们仍然离不开 Launchpad 带来的秩序感和掌控感。既然这种需求真实存在，就值得被认真对待。",
          "所以这不只是一个怀旧项目，而是一个面向真实使用场景的产品尝试。如果你也在寻找 macOS 26 Tahoe 下更自由、更熟悉的 Launchpad 替代方案，那么 LaunchOS 也许正适合你。",
        ],
      },
    ],
    ctaLabel: "打开 LaunchOS",
    backLabel: "返回首页",
  },
  en: {
    eyebrow: "Free on the web, familiar on your Mac",
    title: "The Launchpad you know, refined for macOS 26 Tahoe",
    subtitle: "LaunchOS is a free Launchpad alternative for macOS 26.",
    lead:
      "Spotlight is great, but many of us still need Launchpad. We do not just need a search box. We need a more visual, more orderly, and more familiar way to open the apps that shape our daily work and life.",
    metadataTitle: "LaunchOS Blog | A free web Launchpad alternative for macOS",
    metadataDescription:
      "See how LaunchOS brings back the familiar Launchpad experience in a free web app while respecting the habits Mac users already rely on.",
    highlights: [
      {
        title: "Free",
        description: "Use it directly in the browser without paying for another desktop utility or setup process.",
      },
      {
        title: "Convenient",
        description: "Open it instantly, pin it, bookmark it, or install it as a PWA with very little friction.",
      },
      {
        title: "Familiar",
        description: "It restores the visual scanning and click-to-launch experience people expect from Launchpad.",
      },
      {
        title: "Respectful",
        description: "It does not force users into a new workflow. It respects the habits they already built on the Mac.",
      },
    ],
    sections: [
      {
        heading: "Spotlight is powerful, but it does not replace every habit",
        paragraphs: [
          "Spotlight is one of the best productivity tools on the Mac, and we use it every day. But search is not the most natural entry point in every situation. Many people navigate by icon, position, and visual memory before they think in keywords.",
          "For those users, Launchpad is more than an app list. It is a personal system of order. Work apps live on one page, creative tools on another, and favorite utilities stay where your muscle memory expects them. That sense of order is part of the experience.",
        ],
      },
      {
        heading: "Why a web version makes sense",
        paragraphs: [
          "We wanted LaunchOS to be light, fast, and easy to start using. That is why we chose the web. It is free, immediately accessible, and does not ask users to learn or maintain another complex desktop replacement.",
          "The web version is also more convenient. You can open it from any browser, keep it in a pinned tab, or install it as a PWA. It lowers the barrier while still preserving a Launchpad-like experience that feels close to home.",
        ],
      },
      {
        heading: "We are restoring more than a layout",
        paragraphs: [
          "LaunchOS is not trying to build just another icon grid. We are trying to bring back a familiar interaction model. When the page opens, the visual hierarchy, browsing pattern, and launch flow should feel intuitive if you already know Launchpad.",
          "That sense of continuity matters. The real measure of a replacement is not how many features it adds, but whether people can keep moving through their day without having to relearn everything.",
        ],
      },
      {
        heading: "Respecting user habits matters",
        paragraphs: [
          "A common design mistake is to assume users should adapt to whatever a new tool prefers. We believe the better approach is to understand existing habits first, then build around them.",
          "Some people love keyboard search. Others think spatially and visually. Some remember app names, and others remember where an icon lives. LaunchOS does not argue against Spotlight. It simply acknowledges that Launchpad still matters, and offers a free and convenient option for the people who want it.",
        ],
      },
      {
        heading: "Built for ourselves, and for people like us",
        paragraphs: [
          "We built LaunchOS because we wanted it ourselves. Spotlight is excellent, but we still rely on the order and comfort that Launchpad provides. When a need is real, it deserves a thoughtful product response.",
          "So this is not just a nostalgic experiment. It is a practical tool for real daily use on macOS 26 Tahoe. If you want a freer, simpler, and more familiar Launchpad alternative, LaunchOS was made for you too.",
        ],
      },
    ],
    ctaLabel: "Open LaunchOS",
    backLabel: "Back to home",
  },
  ja: {
    eyebrow: "無料の Web 版で、使い慣れた Launchpad 体験を",
    title: "見慣れた Launchpad を macOS 26 Tahoe 向けに磨き直しました",
    subtitle: "LaunchOS は macOS 26 向けの無料 Launchpad 代替ツールです。",
    lead:
      "Spotlight は素晴らしい存在ですが、それでも Launchpad を必要とする人は少なくありません。必要なのは検索窓だけではなく、アプリをより視覚的に、より自然に開ける方法です。LaunchOS はそのために生まれました。",
    metadataTitle: "LaunchOS ブログ | macOS 向け無料 Web Launchpad 代替ツール",
    metadataDescription:
      "LaunchOS が無料の Web アプリとして Launchpad の体験をどう再現し、Mac ユーザーの習慣をどう尊重しているかを紹介します。",
    highlights: [
      {
        title: "無料",
        description: "追加のデスクトップアプリを購入せず、ブラウザからそのまま使い始められます。",
      },
      {
        title: "便利",
        description: "すぐに開けて、ブックマークや固定表示、PWA としての利用も簡単です。",
      },
      {
        title: "体験を再現",
        description: "Launchpad らしい視覚的な一覧性とワンクリック起動の感覚を大切にしています。",
      },
      {
        title: "習慣を尊重",
        description: "新しい操作を押し付けるのではなく、Mac で培った使い方をそのまま活かします。",
      },
    ],
    sections: [
      {
        heading: "Spotlight は優秀でも、すべての習慣を置き換えられるわけではありません",
        paragraphs: [
          "Spotlight は非常に優れた生産性ツールで、私たちも毎日使っています。ただ、すべての場面で検索が最も自然とは限りません。多くの人はキーワードより先に、アイコンや位置、視覚的な記憶でアプリを見つけています。",
          "そのようなユーザーにとって Launchpad は単なるアプリ一覧ではなく、自分の生活や仕事を整理するための秩序そのものです。仕事用、制作系、日常ツールなどを自分なりに配置できることが、使いやすさにつながっています。",
        ],
      },
      {
        heading: "なぜ Web 版なのか",
        paragraphs: [
          "LaunchOS では、軽さ、速さ、始めやすさを大切にしました。そのために選んだのが Web です。無料で使え、すぐにアクセスでき、複雑なデスクトップ代替アプリを新たに管理する必要もありません。",
          "Web 版にはもう一つ大きな利点があります。それは便利さです。ブラウザですぐ開けて、タブとして固定したり、PWA としてインストールしたりできます。導入の負担を減らしながら、Launchpad に近い感覚を保てます。",
        ],
      },
      {
        heading: "再現したいのは見た目だけではありません",
        paragraphs: [
          "LaunchOS が目指しているのは、単なるアイコンの並びではありません。Launchpad を知っている人が見たときに、視線の流れ、探し方、起動までの流れが自然に感じられることを重視しています。",
          "代替ツールの価値は、機能数よりも、普段の流れを止めずに使い続けられるかどうかにあります。新しく学び直さなくても手に馴染むことこそ、大切な体験だと考えています。",
        ],
      },
      {
        heading: "ユーザーの習慣を尊重することが大切です",
        paragraphs: [
          "新しいツールは、ユーザーがそれに合わせるべきだと考えがちです。しかし私たちは、先にユーザーの習慣を理解し、それに寄り添うべきだと考えています。",
          "キーボード検索を好む人もいれば、視覚的に探す人もいます。アプリ名で覚えている人もいれば、アイコンの場所で覚えている人もいます。LaunchOS は Spotlight を否定しません。そのうえで、Launchpad を必要とする人のために、無料で便利で親しみやすい選択肢を用意します。",
        ],
      },
      {
        heading: "自分たちのために作り、同じ感覚を持つ人に届けたい",
        paragraphs: [
          "LaunchOS を作った最初の理由は、自分たち自身が必要としていたからです。Spotlight が優れていても、Launchpad がもたらす整理された感覚と安心感は、やはり代えがたいものでした。",
          "だからこれは単なる懐古的なプロジェクトではありません。macOS 26 Tahoe の日常的な利用に向けた、実用的な選択肢です。より自由で、より簡単で、より馴染みのある Launchpad 代替を探しているなら、LaunchOS はそのために作られています。",
        ],
      },
    ],
    ctaLabel: "LaunchOS を開く",
    backLabel: "ホームへ戻る",
  },
};

export function getLaunchOsBlogCopy(locale: Locale): BlogCopy {
  return blogCopy[locale];
}

type LaunchOsBlogArticleProps = {
  locale: Locale;
};

export default function LaunchOsBlogArticle({
  locale,
}: LaunchOsBlogArticleProps) {
  const copy = getLaunchOsBlogCopy(locale);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#eef4ff_0%,_#dfe9ff_28%,_#cadcff_58%,_#c0d4ff_100%)] px-4 py-10 text-slate-900 sm:px-6">
      <article className="mx-auto flex max-w-5xl flex-col gap-8">
        <section className="rounded-[32px] border border-white/50 bg-white/70 px-6 py-8 shadow-[0_20px_60px_rgba(60,80,160,0.16)] ring-1 ring-white/60 backdrop-blur-xl sm:px-8 sm:py-10">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700 sm:text-xl">
            {copy.subtitle}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700">
            {copy.lead}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={getLocalizedPath(locale, "/")}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              {copy.ctaLabel}
            </Link>
            <Link
              href={getLocalizedPath(locale, "/")}
              className="rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-white"
            >
              {copy.backLabel}
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {copy.highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-white/50 bg-white/65 p-5 shadow-[0_16px_40px_rgba(60,80,160,0.12)] ring-1 ring-white/60 backdrop-blur-xl"
            >
              <h2 className="text-lg font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                {item.description}
              </p>
            </div>
          ))}
        </section>

        <section className="space-y-5">
          {copy.sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-[28px] border border-white/50 bg-white/68 px-6 py-6 shadow-[0_16px_40px_rgba(60,80,160,0.12)] ring-1 ring-white/60 backdrop-blur-xl sm:px-8"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </section>
      </article>
    </main>
  );
}
