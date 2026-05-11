import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import {
  ArrowUpRight,
  BookOpen,
  CircleDot,
  Eye,
  Film,
  Globe2,
  Images,
  Languages,
  Menu,
  Network,
  Play,
  Shield,
  Sparkles,
  X
} from "lucide-react";
import * as THREE from "three";
import "./styles.css";

type Locale = "zh" | "en" | "ru" | "de" | "es" | "ja" | "ko";

const languages: Array<{ code: Locale; label: string }> = [
  { code: "zh", label: "中" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "de", label: "DE" },
  { code: "es", label: "ES" },
  { code: "ja", label: "JA" },
  { code: "ko", label: "KO" }
];

const heroCopy: Record<
  Locale,
  { title: string; line1: string; line2: string; cta: string; secondary: string }
> = {
  zh: {
    title: "模因创世・思想即文明",
    line1: "AstulJurondo 是由终极哲学、模因论、拓扑文字与视觉符号生成的文明叙事。",
    line2: "它把思想、语言、图像、漫画、展览与世界观组织成一个持续扩张的精神宇宙。",
    cta: "进入理念",
    secondary: "观看符号"
  },
  en: {
    title: "Memes Create Civilization",
    line1: "AstulJurondo is a civilization narrative shaped by philosophy, memetics, language and symbols.",
    line2: "Thought, image, comic, exhibition and worldview form one expanding spiritual universe.",
    cta: "Enter",
    secondary: "Symbols"
  },
  ru: {
    title: "Memes Create Civilization",
    line1: "AstulJurondo is a civilization narrative shaped by philosophy, memetics, language and symbols.",
    line2: "Thought, image, comic, exhibition and worldview form one expanding spiritual universe.",
    cta: "Enter",
    secondary: "Symbols"
  },
  de: {
    title: "Memes Create Civilization",
    line1: "AstulJurondo is a civilization narrative shaped by philosophy, memetics, language and symbols.",
    line2: "Thought, image, comic, exhibition and worldview form one expanding spiritual universe.",
    cta: "Enter",
    secondary: "Symbols"
  },
  es: {
    title: "Memes Create Civilization",
    line1: "AstulJurondo is a civilization narrative shaped by philosophy, memetics, language and symbols.",
    line2: "Thought, image, comic, exhibition and worldview form one expanding spiritual universe.",
    cta: "Enter",
    secondary: "Symbols"
  },
  ja: {
    title: "Memes Create Civilization",
    line1: "AstulJurondo is a civilization narrative shaped by philosophy, memetics, language and symbols.",
    line2: "Thought, image, comic, exhibition and worldview form one expanding spiritual universe.",
    cta: "Enter",
    secondary: "Symbols"
  },
  ko: {
    title: "Memes Create Civilization",
    line1: "AstulJurondo is a civilization narrative shaped by philosophy, memetics, language and symbols.",
    line2: "Thought, image, comic, exhibition and worldview form one expanding spiritual universe.",
    cta: "Enter",
    secondary: "Symbols"
  }
};

const manifestos = [
  {
    title: "思想即文明",
    body: "文明不是地域或时代的外壳，而是思想如何被保存、复制、变异与传播。居容台把思想视作可生长的结构。"
  },
  {
    title: "模因即粒子",
    body: "模因是文明的最小传播单位。语言、符号、角色、漫画、展览与仪式，都是模因在不同介质中的显影。"
  },
  {
    title: "符号即入口",
    body: "骷髅、盾牌、旗帜、拓扑字母与弗洛达语不是装饰，而是进入世界观的门、坐标与密钥。"
  },
  {
    title: "艺术即系统",
    body: "居容台的视觉不是单张图像，而是一套可延展的系统：海报、动画、漫画、装置、空间与文本相互解释。"
  }
];

const cosmos = [
  {
    id: "origin",
    title: "文明起源",
    subtitle: "The Origin",
    body: "由终极问题开始：存在为何被理解，秩序如何从混沌中出现，思想如何成为共同现实。"
  },
  {
    id: "meme",
    title: "模因网络",
    subtitle: "Meme Network",
    body: "每个概念都是节点，每次观看、转述、绘制和阅读都是连线，最终形成跨媒介传播场。"
  },
  {
    id: "language",
    title: "弗洛达语",
    subtitle: "Floda Language",
    body: "语言承担命名、分类和仪式功能；拓扑字母让抽象思想获得可识别的形体。"
  },
  {
    id: "aesthetics",
    title: "拓扑美学",
    subtitle: "Topological Aesthetics",
    body: "线、环、节点、断裂、骨架和光构成视觉母题，使哲学从文本转译为图像。"
  }
];

const glyphs = ["AJ", "FL", "MEM", "ORD", "AX", "VA", "KO", "RU", "DE", "ES", "JA", "OR"];

const visualForms = [
  {
    title: "骷髅",
    body: "死亡意识、文明遗迹、反叛美学与终极问题的共同符号。"
  },
  {
    title: "盾牌",
    body: "秩序、边界、守护和体系化思想的视觉容器。"
  },
  {
    title: "旗帜",
    body: "共同体、宣言、传播事件和亚文化身份的外显形式。"
  },
  {
    title: "拓扑字母",
    body: "让人造语言拥有几何骨架，也让文字成为可被记忆的图形。"
  },
  {
    title: "模因节点",
    body: "概念之间的连接关系，构成世界观的隐藏地图。"
  },
  {
    title: "霓虹光谱",
    body: "以高对比光效表达未来、电子文明、夜间城市和精神能量。"
  }
];

const narratives = [
  {
    title: "漫画《居容台：模因论》",
    body: "漫画把哲学命题转译为角色、冲突和章节，使抽象理念进入连续阅读。"
  },
  {
    title: "首尔展览",
    body: "展览把图像、空间和跨文化合作变成现实场域，让世界观从屏幕走向现场。"
  },
  {
    title: "视频短片",
    body: "视频承担解释、传播和情绪放大功能，是模因扩散速度最快的表达形式之一。"
  }
];

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) {
          setActive(visible.target.dataset.section ?? "home");
        }
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-12% 0px -38% 0px" }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

function TopologyCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 78;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const particleCount = 650;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorA = new THREE.Color("#00ffff");
    const colorB = new THREE.Color("#ff006e");

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 22 + Math.random() * 34;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 42;
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 8;

      const mixed = colorA.clone().lerp(colorB, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.42,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const rings = new THREE.Group();
    for (let i = 0; i < 5; i += 1) {
      const curve = new THREE.EllipseCurve(0, 0, 18 + i * 7, 9 + i * 4, 0, Math.PI * 2);
      const ringPoints = curve.getPoints(160);
      const ringGeometry = new THREE.BufferGeometry().setFromPoints(
        ringPoints.map(point => new THREE.Vector3(point.x, point.y, 0))
      );
      const ring = new THREE.Line(
        ringGeometry,
        new THREE.LineBasicMaterial({
          color: i % 2 === 0 ? "#00ffff" : "#ff006e",
          transparent: true,
          opacity: 0.16
        })
      );
      ring.rotation.x = Math.PI / 2.5 + i * 0.08;
      ring.rotation.z = i * 0.38;
      rings.add(ring);
    }
    scene.add(rings);

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    mount.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);

    let frame = 0;
    let animationId = 0;
    const animate = () => {
      frame += 0.004;
      points.rotation.y += 0.0018;
      points.rotation.x += (pointerY * 0.16 - points.rotation.x) * 0.02;
      points.rotation.z += (pointerX * 0.08 - points.rotation.z) * 0.02;
      rings.rotation.y -= 0.0022;
      rings.rotation.x = Math.sin(frame) * 0.08;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      mount.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="topology-canvas" ref={mountRef} aria-hidden="true" />;
}

function App() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const copy = heroCopy[locale];

  const nav = useMemo(
    () => [
      { id: "home", label: "首页" },
      { id: "manifesto", label: "理念" },
      { id: "cosmos", label: "宇宙" },
      { id: "meme", label: "模因" },
      { id: "language", label: "文字" },
      { id: "visual", label: "图像" },
      { id: "narrative", label: "叙事" }
    ],
    []
  );

  useEffect(() => {
    gsap.fromTo(
      ".reveal",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: undefined
      }
    );
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <main>
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo("home")} aria-label="返回首页">
          <span className="brand-mark">AJ</span>
          <span>
            <strong>AstulJurondo</strong>
            <em>居容台</em>
          </span>
        </button>

        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="主导航">
          {nav.map(item => (
            <button
              key={item.id}
              className={active === item.id ? "nav-link active" : "nav-link"}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language-switcher" aria-label="语言切换">
            {languages.map(item => (
              <button
                key={item.code}
                className={locale === item.code ? "language active" : "language"}
                onClick={() => setLocale(item.code)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="icon-button" onClick={() => setMenuOpen(value => !value)} aria-label="打开菜单">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <section className="hero" id="home" data-section="home">
        <TopologyCanvas />
        <div className="scanlines" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow reveal">AstulJurondo｜Meme Punk Civilization</p>
            <h1 className="reveal">AstulJurondo</h1>
            <h2 className="reveal">{copy.title}</h2>
            <p className="hero-lines reveal">
              {copy.line1}
              <span>{copy.line2}</span>
            </p>
            <div className="proof-chips reveal" aria-label="世界观关键词">
              <span>Ultimate Philosophy</span>
              <span>Meme Theory</span>
              <span>Floda Language</span>
              <span>Topological Alphabet</span>
            </div>
            <div className="hero-actions reveal">
              <button className="primary-button" onClick={() => scrollTo("manifesto")}>
                <Play size={18} />
                {copy.cta}
              </button>
              <button className="secondary-button" onClick={() => scrollTo("visual")}>
                <ArrowUpRight size={18} />
                {copy.secondary}
              </button>
            </div>
          </div>
          <aside className="hero-panel visual-panel reveal" aria-label="居容台视觉符号">
            <span>Symbol Core</span>
            <strong>AJ</strong>
            <p>骷髅、盾牌、旗帜、拓扑字母、模因节点与霓虹光谱，构成 AstulJurondo 的第一视觉识别。</p>
          </aside>
        </div>
      </section>

      <section className="section manifesto-section" id="manifesto" data-section="manifesto">
        <div className="section-heading">
          <p>Manifesto</p>
          <h2>居容台理念</h2>
        </div>
        <div className="proof-grid manifesto-grid">
          {manifestos.map(item => (
            <article className="proof-card manifesto-card" key={item.title}>
              <span>Concept</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section worldview" id="cosmos" data-section="cosmos">
        <div className="section-heading">
          <p>Cosmos Map</p>
          <h2>世界观宇宙</h2>
        </div>
        <div className="worldview-layout">
          <div className="worldview-text">
            <p>
              AstulJurondo 的世界不是单一故事线，而是一组彼此连接的思想结构。哲学提供问题，模因提供传播，语言提供命名，图像提供记忆。
            </p>
            <div className="search-bar">
              <Eye size={18} />
              <span>观看方式：从理念进入文字，从文字进入图像，从图像进入模因网络。</span>
            </div>
          </div>
          <div className="node-map" aria-label="世界观结构示意">
            {cosmos.map((item, index) => (
              <button
                key={item.id}
                className={`node node-${index + 1}`}
                onClick={() => scrollTo(item.id === "aesthetics" ? "visual" : item.id)}
              >
                <CircleDot size={16} />
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section split" id="meme" data-section="meme">
        <div>
          <div className="section-heading compact">
            <p>Meme Network</p>
            <h2>模因网络</h2>
          </div>
          <p className="section-copy">
            模因不是口号，而是思想在不同介质中的复制方式。一个字母、一张漫画、一件展览作品、一段视频，都可以成为新的传播节点。
          </p>
        </div>
        <div className="network-card" aria-label="模因网络动效">
          {Array.from({ length: 14 }).map((_, index) => (
            <span key={index} style={{ "--i": index } as React.CSSProperties} />
          ))}
        </div>
      </section>

      <section className="section language-section" id="language" data-section="language">
        <div className="section-heading">
          <p>Language System</p>
          <h2>弗洛达语・拓扑文字</h2>
        </div>
        <div className="glyph-board">
          {glyphs.map(glyph => (
            <button className="glyph" key={glyph}>
              {glyph}
            </button>
          ))}
        </div>
        <div className="archive-note">
          <Languages size={22} />
          <p>语言在居容台中承担命名、分类、仪式和身份识别。拓扑字母让抽象思想拥有几何骨架，也让文字成为可被观看的图像。</p>
        </div>
      </section>

      <section className="section visual-section" id="visual" data-section="visual">
        <div className="section-heading">
          <p>Visual Forms</p>
          <h2>图像表达形式</h2>
        </div>
        <div className="gallery-grid">
          {visualForms.map((item, index) => (
            <article className="gallery-card symbol-card" key={item.title}>
              {index % 3 === 0 ? <Shield size={22} /> : index % 3 === 1 ? <Sparkles size={22} /> : <Network size={22} />}
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section media-section" id="narrative" data-section="narrative">
        <div className="section-heading">
          <p>Narrative Media</p>
          <h2>漫画・展览・视频</h2>
        </div>
        <div className="media-grid">
          {narratives.map((item, index) => (
            <article className="media-card" key={item.title}>
              {index === 0 ? <BookOpen size={24} /> : index === 1 ? <Images size={24} /> : <Film size={24} />}
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="event-feature art-feature">
          <div>
            <p>AstulJurondo Expression</p>
            <h3>从哲学文本到视觉文明</h3>
            <span>理念、字母、符号、角色、漫画、展览与影像共同构成居容台的图文表达系统。</span>
          </div>
          <div className="feature-icons" aria-hidden="true">
            <BookOpen size={22} />
            <Languages size={22} />
            <Images size={22} />
            <Globe2 size={22} />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>AstulJurondo 居容台</strong>
          <p>模因创世・思想即文明 © 2026 AstulJurondo</p>
        </div>
        <div className="footer-links">
          <BookOpen size={18} />
          <Languages size={18} />
          <Images size={18} />
          <Globe2 size={18} />
        </div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
