import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, Sparkles, BookOpen, Users, ArrowRight, Plus, Check,
  Clock3, Star, X, LayoutDashboard, UserRound, LogOut
} from "lucide-react";
import "./styles.css";

const initialSkills = [
  { id: 1, name: "React Development", category: "Technology", person: "Ananya", mode: "Teaching", level: "Intermediate", rating: 4.9, avatar: "A" },
  { id: 2, name: "UI/UX Design", category: "Design", person: "Meera", mode: "Teaching", level: "Advanced", rating: 4.8, avatar: "M" },
  { id: 3, name: "Python Programming", category: "Technology", person: "Rahul", mode: "Teaching", level: "Beginner", rating: 4.7, avatar: "R" },
  { id: 4, name: "Digital Marketing", category: "Business", person: "Nisha", mode: "Teaching", level: "Intermediate", rating: 4.9, avatar: "N" },
  { id: 5, name: "Public Speaking", category: "Communication", person: "Arjun", mode: "Teaching", level: "Advanced", rating: 4.6, avatar: "A" },
  { id: 6, name: "Photography", category: "Creative", person: "Diya", mode: "Teaching", level: "Intermediate", rating: 4.8, avatar: "D" }
];

function App() {
  const [page, setPage] = useState("home");
  const [skills, setSkills] = useState(initialSkills);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [requests, setRequests] = useState([]);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => skills.filter(s =>
    (category === "All" || s.category === category) &&
    `${s.name} ${s.person} ${s.category}`.toLowerCase().includes(search.toLowerCase())
  ), [skills, search, category]);

  const categories = ["All", ...new Set(skills.map(s => s.category))];

  function notify(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  }

  function sendRequest(skill) {
    if (!requests.includes(skill.id)) {
      setRequests([...requests, skill.id]);
      notify(`Connection request sent to ${skill.person}!`);
    }
  }

  function addSkill(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const skill = {
      id: Date.now(),
      name: form.get("name"),
      category: form.get("category"),
      person: "You",
      mode: "Teaching",
      level: form.get("level"),
      rating: 5.0,
      avatar: "Y"
    };
    setSkills([skill, ...skills]);
    setModal(false);
    notify("Your skill was added successfully!");
    setPage("skills");
  }

  return (
    <div className="app">
      <header className="nav">
        <button className="brand" onClick={() => setPage("home")}>
          <span className="brandIcon"><Sparkles size={18}/></span>
          Skill<span>Swap</span>
        </button>
        <nav>
          <button className={page === "home" ? "active" : ""} onClick={() => setPage("home")}>Home</button>
          <button className={page === "skills" ? "active" : ""} onClick={() => setPage("skills")}>Explore Skills</button>
          <button className={page === "dashboard" ? "active" : ""} onClick={() => setPage("dashboard")}>Dashboard</button>
        </nav>
        <div className="navRight">
          <button className="profileBtn" onClick={() => setPage("dashboard")}><UserRound size={17}/> My Profile</button>
        </div>
      </header>

      {page === "home" && (
        <main>
          <section className="hero">
            <div className="heroCopy">
              <div className="pill"><Sparkles size={15}/> Learn. Teach. Grow together.</div>
              <h1>Trade skills,<br/><em>not money.</em></h1>
              <p>SkillSwap connects people who want to learn with people who are ready to teach. Share what you know and discover what you want to learn.</p>
              <div className="heroActions">
                <button className="primary" onClick={() => setPage("skills")}>Explore skills <ArrowRight size={18}/></button>
                <button className="secondary" onClick={() => setModal(true)}><Plus size={18}/> Offer a skill</button>
              </div>
              <div className="miniStats">
                <div><strong>1,200+</strong><span>Skills shared</span></div>
                <div><strong>850+</strong><span>Active learners</span></div>
                <div><strong>94%</strong><span>Successful matches</span></div>
              </div>
            </div>
            <div className="heroCard">
              <div className="orbit orbit1"></div><div className="orbit orbit2"></div>
              <div className="floatingCard c1"><span className="avatar purple">A</span><div><b>React Development</b><small>Ananya · 4.9 ★</small></div></div>
              <div className="floatingCard c2"><span className="avatar orange">M</span><div><b>UI/UX Design</b><small>Meera · 4.8 ★</small></div></div>
              <div className="centerIcon"><Users size={42}/></div>
              <div className="match">✦ Perfect match found</div>
            </div>
          </section>

          <section className="section">
            <div className="sectionHead"><div><span className="eyebrow">HOW IT WORKS</span><h2>Learn something. Teach something.</h2></div><button className="textBtn" onClick={() => setPage("skills")}>View all skills <ArrowRight size={16}/></button></div>
            <div className="steps">
              <div className="step"><span>01</span><BookOpen size={28}/><h3>Tell us your skills</h3><p>Add what you can teach and what you'd like to learn.</p></div>
              <div className="step"><span>02</span><Search size={28}/><h3>Find your match</h3><p>Browse people with the skills you're looking for.</p></div>
              <div className="step"><Users size={28}/><h3>Connect & exchange</h3><p>Send a request and start learning together.</p></div>
            </div>
          </section>
        </main>
      )}

      {page === "skills" && (
        <main className="page">
          <div className="pageTitle"><div><span className="eyebrow">DISCOVER</span><h1>Explore skills</h1><p>Find someone who can teach what you want to learn.</p></div><button className="primary" onClick={() => setModal(true)}><Plus size={18}/> Offer a skill</button></div>
          <div className="toolbar">
            <div className="search"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search skills, people..." /></div>
            <div className="chips">{categories.map(c => <button key={c} className={category === c ? "chip activeChip" : "chip"} onClick={() => setCategory(c)}>{c}</button>)}</div>
          </div>
          <div className="grid">{filtered.map(skill => (
            <article className="skillCard" key={skill.id}>
              <div className="cardTop"><span className={`avatar ${skill.avatar === "M" ? "orange" : "purple"}`}>{skill.avatar}</span><span className="level">{skill.level}</span></div>
              <span className="category">{skill.category}</span><h3>{skill.name}</h3><p>Learn from <b>{skill.person}</b></p>
              <div className="cardBottom"><span><Star size={15} fill="currentColor"/> {skill.rating}</span><button className={requests.includes(skill.id) ? "requested" : "connect"} onClick={() => sendRequest(skill)}>{requests.includes(skill.id) ? <><Check size={15}/> Requested</> : <>Connect <ArrowRight size={15}/></>}</button></div>
            </article>
          ))}</div>
          {filtered.length === 0 && <div className="empty">No skills found. Try another search.</div>}
        </main>
      )}

      {page === "dashboard" && (
        <main className="page">
          <div className="dashHero"><div className="bigAvatar">Y</div><div><span className="eyebrow">MY PROFILE</span><h1>Your SkillSwap dashboard</h1><p>Manage your skills and connections.</p></div></div>
          <div className="dashGrid">
            <div className="panel"><h3><BookOpen size={18}/> Skills I offer</h3><div className="mySkill"><span>React Development</span><b>Intermediate</b></div><div className="mySkill"><span>Web Development</span><b>Advanced</b></div><button className="addLine" onClick={() => setModal(true)}><Plus size={16}/> Add a skill</button></div>
            <div className="panel"><h3><Clock3 size={18}/> Connection requests</h3><div className="requestBox"><span className="avatar orange">S</span><div><b>Sarah wants to learn React</b><small>2 hours ago</small></div><button className="accept" onClick={() => notify("Request accepted!")}>Accept</button></div><div className="requestBox"><span className="avatar purple">K</span><div><b>Kiran wants to learn Web Design</b><small>Yesterday</small></div><button className="accept" onClick={() => notify("Request accepted!")}>Accept</button></div></div>
          </div>
          <button className="logout" onClick={() => { setPage("home"); notify("See you soon!"); }}><LogOut size={16}/> Back to home</button>
        </main>
      )}

      {modal && <div className="overlay" onClick={() => setModal(false)}><div className="modal" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setModal(false)}><X/></button><span className="eyebrow">SHARE YOUR KNOWLEDGE</span><h2>Offer a skill</h2><p>Add something you can teach to the SkillSwap community.</p><form onSubmit={addSkill}><label>Skill name<input name="name" required placeholder="e.g. JavaScript"/></label><label>Category<select name="category"><option>Technology</option><option>Design</option><option>Business</option><option>Communication</option><option>Creative</option></select></label><label>Level<select name="level"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><button className="primary full">Add skill <ArrowRight size={17}/></button></form></div></div>}

      {toast && <div className="toast"><Check size={17}/> {toast}</div>}
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
