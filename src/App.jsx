
import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, ExternalLink, ChevronLeft } from "lucide-react";

function SpinningWireframe() {
  const mesh = useRef();
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.15;
    mesh.current.rotation.y += delta * 0.22;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[2.2, 0]} />
        <meshBasicMaterial wireframe />
      </mesh>
    </Float>
  );
}

function Background3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} className="absolute inset-0 -z-10">
      <color attach="background" args={[0, 0, 0]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} />
      <SpinningWireframe />
      <Stars radius={60} depth={40} count={2000} factor={4} saturation={0} fade />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
}

const SKILLS = [
  { name: "XR Design", blurb: "Human-centered immersive flows, prototyping, and interaction grammar." },
  { name: "Game Development", blurb: "Unity/Unreal, gameplay systems, tooling and rapid iteration." },
  { name: "Systems Design", blurb: "Design systems that scale: components, constraints, feedback loops." },
  { name: "AI Automation", blurb: "Agentic pipelines, creative tooling, data ↔ design glue code." },
  { name: "3D Animation", blurb: "Cinematics, camera language, stylized lookdev and motion." },
  { name: "Concept Design", blurb: "Worldbuilding, mood, and the storyboard-to-sprint bridge." },
];

const PROJECTS = [
  {
    id: "transfr-vr-training",
    title: "Transfr VR Training",
    tags: ["VR Training", "Simulation", "Career Education"],
    summary:
      "Design Systems for XR interactions, proprietary Unity SDK tools, and AI workflow automations for scalable simulation production.",
    details:
      "At Transfr, I built a reusable XR interaction design system, authored proprietary Unity SDK tools to standardize interactions (grabs, dials, tool-use, haptics), and wired AI automations to parse specs → scenes. Outcome: faster time-to-prototype, higher fidelity, and fewer regressions across dozens of sims.",
  },
  {
    id: "inner-light",
    title: "Inner Light",
    tags: ["Embodied VR", "EEG", "Biofeedback"],
    summary:
      "A meditation on Light: EEG streams drive a luminous avatar that mirrors breath and attention in real-time.",
    details:
      "Inner Light couples EEG and breath cadence with a generative avatar. The more coherent your focus, the more radiant and organized the light-body becomes—turning inner state into visible form for presence training.",
  },
  {
    id: "looking-inside-cells",
    title: "Looking Inside Cells",
    tags: ["Education", "VR", "Biology"],
    summary:
      "Cell biology in VR for middle-school learners; Verizon-sponsored research at CREATE Lab & NYU FRL.",
    details:
      "A research collaboration to test learning benefits of spatial, embodied exploration. We designed guided discovery of organelles, processes like mitosis, and interactive quizzes, studying retention and affect.",
  },
  {
    id: "freehand-assistant",
    title: "Freehand Assistant",
    tags: ["Accessibility", "Voice", "Gaze"],
    summary:
      "Voice+gaze controlled XR hand interactions enabling access for users with limited hand mobility.",
    details:
      "A prototype assistant that re-maps interaction verbs to voice intents and gaze targeting. Result: hands-free object selection, manipulation, and UI control in XR, expanding accessibility without sacrificing agency.",
  },
];

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function useHashRoute(defaultHash = "#home") {
  const [hash, setHash] = useState(() => window.location.hash || defaultHash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || defaultHash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [defaultHash]);
  const push = (h) => {
    window.location.hash = h.startsWith("#") ? h : `#${h}`;
    setHash(h.startsWith("#") ? h : `#${h}`);
  };
  return { hash, push };
}

function Nav({ onNav }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <button onClick={() => onNav("home")} className="text-lg sm:text-xl font-semibold tracking-wide">
          <span className="text-white">Reality</span>
          <span className="text-cyan-300"> Architect</span>
        </button>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {[
            { k: "home", t: "Home" },
            { k: "skills", t: "Skills" },
            { k: "projects", t: "Projects" },
            { k: "contact", t: "Contact" },
          ].map((i) => (
            <button key={i.k} onClick={() => onNav(i.k)} className="text-white/80 hover:text-white transition">
              {i.t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-[88vh] flex items-center justify-center pt-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
        >
          Sounak Ghosh
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-4 text-lg md:text-2xl text-white/80"
        >
          Senior Technical Designer • <span className="text-cyan-300">Reality Architect</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 max-w-3xl mx-auto text-white/70"
        >
          I build immersive systems where intuition meets engineering—bridging human sensemaking with playful, practical tools across VR, games, and AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#projects" className="px-5 py-3 rounded-2xl bg-cyan-300/90 hover:bg-cyan-300 text-black font-semibold inline-flex items-center gap-2">
            Explore Projects <ArrowUpRight size={18} />
          </a>
          <a href="#contact" className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium">
            Get in Touch
          </a>
        </motion.div>

        <div className="mt-8 flex justify-center gap-5 text-white/70">
          <a className="hover:text-white" href="mailto:sounaktheghosh@gmail.com"><Mail size={20} /></a>
          <a className="hover:text-white" href="https://www.linkedin.com/in/beingsounak/" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
          <a className="hover:text-white" href="https://github.com/sounakivan" target="_blank" rel="noreferrer"><Github size={20} /></a>
        </div>
      </div>
      <Background3D />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12),transparent_60%)]" />
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Skills</h2>
        <p className="text-white/60 mt-2">Tools for bending reality—responsibly and with style.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((s, idx) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-300/40 hover:bg-white/10 transition backdrop-blur"
            >
              <div className="text-xl font-semibold text-white">{s.name}</div>
              <div className="text-white/70 mt-2 text-sm">{s.blurb}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-32 h-64 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.18),transparent_60%)]" />
    </section>
  );
}

function ProjectCard({ p, onOpen }) {
  return (
    <motion.button
      onClick={() => onOpen(p.id)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group p-5 rounded-2xl bg-white/5 border border-white/10 text-left hover:border-cyan-300/40 hover:bg-white/10 transition"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{p.title}</h3>
        <ExternalLink className="text-white/50 group-hover:text-cyan-300" size={18} />
      </div>
      <p className="text-white/70 mt-2 text-sm">{p.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-full bg-cyan-300/10 border border-cyan-300/20 text-cyan-200">
            {t}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

function Projects({ onOpen }) {
  return (
    <section id="projects" className="relative py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Projects</h2>
        <p className="text-white/60 mt-2">Selected reality hacks and human-first systems.</p>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={onOpen} />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-32 h-64 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.18),transparent_60%)]" />
    </section>
  );
}

function ProjectPage({ projectId, onBack }) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return null;
  return (
    <div className="min-h-[80vh] pt-28 pb-16 max-w-4xl mx-auto px-6">
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-white/70 hover:text-white">
        <ChevronLeft size={18} /> Back to Projects
      </button>
      <h1 className="text-3xl md:text-5xl font-bold text-white">{project.title}</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-full bg-cyan-300/10 border border-cyan-300/20 text-cyan-200">
            {t}
          </span>
        ))}
      </div>
      <p className="text-white/70 mt-6 leading-relaxed">{project.details}</p>
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10" />
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || "Unknown"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:sounaktheghosh@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Contact</h2>
        <p className="text-white/60 mt-2">Let’s architect a new corner of reality.</p>
        <form onSubmit={onSubmit} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="name" required placeholder="Your name" className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300/60" />
          <input name="email" required type="email" placeholder="Your email" className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300/60" />
          <textarea name="message" required placeholder="Tell me about your project..." rows={6} className="md:col-span-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-300/60" />
          <div className="md:col-span-2 flex items-center justify-between">
            <div className="text-white/50 text-sm">This opens your email client and pre-fills the message.</div>
            <button type="submit" className="px-6 py-3 rounded-2xl bg-cyan-300/90 hover:bg-cyan-300 text-black font-semibold">Send</button>
          </div>
        </form>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-32 h-64 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.18),transparent_60%)]" />
    </section>
  );
}

export default function App() {
  const { hash, push } = useHashRoute();
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const h = (hash || "").replace("#", "");
    if (PROJECTS.some((p) => p.id === h)) {
      setActiveProject(h);
      scrollToId("top");
    } else {
      setActiveProject(null);
    }
  }, [hash]);

  const openProject = (id) => {
    push(`#${id}`);
  };
  const backToProjects = () => {
    push("#projects");
  };
  const onNav = (key) => {
    push(`#${key}`);
    scrollToId(key);
  };

  return (
    <div id="top" className="min-h-screen bg-gradient-to-b from-black via-black to-slate-950 text-white font-[ui-sans-serif]">
      <Nav onNav={onNav} />
      <Hero />
      <Skills />
      <Projects onOpen={openProject} />

      <AnimatePresence>
        {activeProject && (
          <motion.div
            key={activeProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="relative m-auto w-[92%] max-w-4xl rounded-3xl bg-gradient-to-b from-slate-900/95 to-black border border-white/10"
            >
              <div className="absolute left-4 top-4">
                <button onClick={backToProjects} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white">
                  <ChevronLeft size={16} /> Close
                </button>
              </div>
              <ProjectPage projectId={activeProject} onBack={backToProjects} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Contact />

      <footer className="py-10 text-center text-white/50 text-sm border-t border-white/10">
        © {new Date().getFullYear()} Sounak Ghosh — Reality Architect
      </footer>

      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.7))]" />
    </div>
  );
}
