import { useState } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { ChevronDown, Github, ExternalLink, Code, User, BookOpen, Send, Database} from 'lucide-react';
import './App.css';

// --- TES DONNÉES PERSONNELLES (Basées sur ton CV et README) ---
const DATA = {
    profile: {
        name: "Thomas P", // Remplace par ton vrai nom
        role: "Ingénieur ESIEA - IA & Systèmes Embarqués",
        school: "ESIEA Paris (2021-2027)",
        Github: "https://github.com/K4yan0",
        slogan: "“L'intelligence artificielle au service de l'homme.”"
    },
    intro: {
        pitch: "Étudiant en 4e année d'ingénierie informatique passionné par l'intelligence artificielle et les systèmes embarqués. Je m'intéresse particulièrement à l'application de l'IA aux technologies critiques comme les drones et les systèmes spatiaux. Je recherche un stage pour mettre à profit ma rigueur technique au sein d'une équipe tournée vers l'innovation."
    },
    projects: [
        {
            id: 1,
            title: "Astro-Classifier RF",
            tags: ["Python", "Machine Learning", "Streamlit", "NASA API"],
            context: "Projet Personnel - Data Science & Espace",
            desc: "Classification d'astéroïdes potentiellement dangereux (PHA) à partir de données orbitales de la NASA.",
            details: [
                "Pipeline complet : Acquisition, Nettoyage, EDA, Entraînement.",
                "Modèle Random Forest atteignant 99.86% de précision.",
                "Développement d'une Web App interactive (Streamlit) pour simuler les risques en temps réel.",
                "Identification autonome des facteurs de risque (Taille 'H' et Proximité 'moid')."
            ],
            image: "/portfolio/app_monitor.png",
            link: "https://github.com/K4yan0/asteroid-risk-prediction"
        },
        {
            id: 2,
            title: "Exoplanet Detection",
            tags: ["Deep Learning", "CNN 1D", "TensorFlow", "Astro-Physics"],
            context: "Projet Académique - Recherche ML vs DL",
            desc: "Comparaison d'approches pour la détection d'exoplanètes via les courbes de lumière TESS/Kepler.",
            details: [
                "Traitement de +300 000 séries chronologiques de flux stellaires.",
                "Comparaison : Random Forest vs Réseau de neurones convolutif (CNN 1D).",
                "Le CNN 1D a appris automatiquement les signatures de transit sur les données brutes.",
                "Amélioration significative des scores F1 et PR-AUC par rapport aux méthodes classiques."
            ],
            image: "/portfolio/logo.png",
            link: "https://github.com/K4yan0/exoplanet-detection-ml"
        }
    ],
    skills: [
        { name: "IA & Data", icons: "TensorFlow, Keras, Scikit-learn, Pandas", desc: "Machine Learning, Deep Learning, Data Analysis" },
        { name: "Dev & Outils", icons: "Python, C, Java, SQL, Git, Docker", desc: "Développement logiciel rigoureux, CI/CD" },
        { name: "Soft Skills", icons: "Adaptabilité, Gestion, Communication", desc: "Trésorier BDE (Gestion budget), Stage HEGP (Autonomie)" }
    ]
};

// --- COMPOSANTS UI ---
interface SectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
    className?: string;
}

const Section = ({ id, title, children, className = "" }: SectionProps) => (
    <section id={id} className={`py-20 px-6 md:px-20 ${className}`}>
        <div className="max-w-5xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-12 text-slate-800 flex items-center gap-3"
            >
                <span className="w-2 h-10 bg-blue-600 rounded-full block"></span>
                {title}
            </motion.h2>
            {children}
        </div>
    </section>
);

const Card = ({ children, className="" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 ${className}`}>
        {children}
    </div>
);

// --- APPLICATION PRINCIPALE ---

function App() {
    const [active, setActive] = useState('home');

    return (
        <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">

            {/* HEADER / NAVIGATION */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                <div className="font-bold text-xl tracking-tight text-slate-900">
                    {DATA.profile.name.split(' ')[0]}<span className="text-blue-600">.Portfolio</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
                    {['home', 'about', 'projects', 'skills'].map((item) => (
                        <Link
                            key={item}
                            to={item}
                            smooth={true}
                            spy={true}
                            offset={-80}
                            onSetActive={setActive}
                            className={`cursor-pointer hover:text-blue-600 capitalize ${active === item ? 'text-blue-600' : ''}`}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* HERO SECTION */}
            <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-50">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
                        Ingénieur ESIEA 2027
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 tracking-tight">
                        {DATA.profile.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-8 font-light">
                        {DATA.profile.role}
                    </p>
                    <p className="italic text-slate-500 mb-12 border-l-4 border-blue-500 pl-4 inline-block text-lg">
                        {DATA.profile.slogan}
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link to="projects" smooth={true} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer shadow-lg hover:shadow-blue-500/30">
                            Voir mes projets
                        </Link>
                        <a href="https://github.com/K4yan0" target="_blank" className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition cursor-pointer">
                            <Github size={20}/> GitHub
                        </a>
                    </div>
                </motion.div>

                <Link to="about" smooth={true} className="absolute bottom-10 cursor-pointer animate-bounce text-slate-400">
                    <ChevronDown size={32} />
                </Link>
            </section>

            {/* A PROPOS */}
            <Section id="about" title="À Propos">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/3">
                        {/* Tu pourras mettre ta photo ici plus tard */}
                        <div className="w-64 h-64 bg-slate-200 rounded-2xl mx-auto flex items-center justify-center text-slate-400 shadow-inner">
                            <User size={64} />
                        </div>
                    </div>
                    <div className="md:w-2/3 text-lg text-slate-600 leading-relaxed">
                        <p className="mb-6">{DATA.intro.pitch}</p>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-bold text-blue-900 flex items-center gap-2"><BookOpen size={18}/> Formation</h4>
                                <p className="text-sm text-blue-700">{DATA.profile.school}</p>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                                <h4 className="font-bold text-emerald-900 flex items-center gap-2"><Send size={18}/> Objectif</h4>
                                <p className="text-sm text-emerald-700">Stage Ingénieur (IA/Embarqué)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* PROJETS */}
            <Section id="projects" title="Réalisations Clés" className="bg-slate-100/50">
                <div className="grid gap-8">
                    {DATA.projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="flex flex-col gap-6 p-0 overflow-hidden">
                                {/* Image du projet */}
                                <div className="h-64 overflow-hidden group">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Contenu texte */}
                                <div className="p-8 flex flex-col md:flex-row gap-8">
                                    <div className="md:w-1/3 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h3>
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-4 font-mono">
                        {project.context}
                      </span>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.tags.map((tag: string) => (
                                                    <span key={tag} className="text-xs font-semibold text-slate-500 border border-slate-200 px-2 py-1 rounded">
                            {tag}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                        <a href={project.link} target="_blank" className="flex items-center gap-2 text-blue-600 font-bold hover:underline mt-4 md:mt-0">
                                            Voir le code <ExternalLink size={16} />
                                        </a>
                                    </div>

                                    <div className="md:w-2/3 border-l border-slate-100 md:pl-8">
                                        <p className="text-slate-700 mb-4 font-medium">{project.desc}</p>
                                        <ul className="space-y-2">
                                            {project.details.map((detail: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* SKILLS */}
            <Section id="skills" title="Compétences & Vision">
                <div className="grid md:grid-cols-3 gap-6">
                    {DATA.skills.map((skill, index) => (
                        <Card key={index} className="hover:-translate-y-2">
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center mb-6">
                                {index === 0 && <Database size={24} />}
                                {index === 1 && <Code size={24} />}
                                {index === 2 && <User size={24} />}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{skill.name}</h3>
                            <p className="text-sm font-mono text-blue-600 mb-3">{skill.icons}</p>
                            <p className="text-slate-600 text-sm">{skill.desc}</p>
                        </Card>
                    ))}
                </div>

                <div className="mt-20 bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    <h3 className="text-2xl font-bold mb-4">Vision Professionnelle</h3>
                    <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
                        "Je souhaite devenir un ingénieur capable de faire le pont entre la recherche en IA et les contraintes physiques des systèmes embarqués, pour contribuer à des projets aérospatiaux innovants et sûrs."
                    </p>
                </div>
            </Section>

            <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
                <p>© 2025 {DATA.profile.name}. Créé avec React, Vite & Tailwind CSS.</p>
            </footer>

        </div>
    );
}

export default App;