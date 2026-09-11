import { useEffect, useState } from "react";
import { adminLogin, adminGetUsers, adminGetQuestions, adminAddQuestion, adminDeleteQuestion } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { LogIn, Trash2, Download, Bone, Plus } from "lucide-react";

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("osteon_admin_token") || "");
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newQ, setNewQ] = useState({
    type: "quiz",
    question: "",
    options: ["", "", "", ""],
    correct_index: 0,
    image_url: "",
    points: 5,
  });

  useEffect(() => {
    if (token) load();
    // eslint-disable-next-line
  }, [token]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const { token } = await adminLogin(u, p);
      localStorage.setItem("osteon_admin_token", token);
      setToken(token);
      toast.success("Access granted");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  const load = async () => {
    try {
      const [uData, qData] = await Promise.all([adminGetUsers(token), adminGetQuestions(token)]);
      setUsers(uData.users);
      setQuestions(qData.questions);
    } catch {
      toast.error("Session expired");
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("osteon_admin_token");
    setToken("");
  };

  const exportCsv = () => {
    const header = "wallet,twitter,score,referrals,qualified,attempts_used\n";
    const rows = users
      .map((u) => `${u.wallet_address},${u.twitter_username},${u.best_score},${u.referral_count},${u.qualified_wl},${u.attempts_used}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "osteon_participants.csv";
    a.click();
  };

  const addQuestion = async () => {
    if (!newQ.question || newQ.options.some((o) => !o)) {
      toast.error("Fill all fields");
      return;
    }
    try {
      await adminAddQuestion(token, { ...newQ, points: newQ.type === "quiz" ? 5 : 10 });
      toast.success("Question added");
      setNewQ({ type: "quiz", question: "", options: ["", "", "", ""], correct_index: 0, image_url: "", points: 5 });
      load();
    } catch {
      toast.error("Failed");
    }
  };

  const removeQ = async (id) => {
    try {
      await adminDeleteQuestion(token, id);
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Failed");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#07080c] grid-bg flex items-center justify-center p-6">
        <Toaster theme="dark" />
        <form
          onSubmit={login}
          className="w-full max-w-md cyber-corners bg-[#0d1017]/80 border border-[#1b2234] p-8 clip-terminal"
        >
          <div className="flex items-center gap-3 mb-6">
            <Bone className="w-6 h-6 text-[#00f0ff]" />
            <div>
              <div className="font-mono-cyber text-[10px] uppercase tracking-[0.35em] text-[#00f0ff]">// Admin Access</div>
              <div className="font-heading text-2xl font-bold uppercase">Osteon Control</div>
            </div>
          </div>
          <Label className="font-mono-cyber text-[10px] uppercase tracking-widest text-[#00f0ff]">Username</Label>
          <Input
            data-testid="admin-username"
            value={u}
            onChange={(e) => setU(e.target.value)}
            className="mt-2 bg-[#07080c] border-[#1b2234] rounded-none h-12"
          />
          <Label className="mt-4 block font-mono-cyber text-[10px] uppercase tracking-widest text-[#00f0ff]">Password</Label>
          <Input
            data-testid="admin-password"
            type="password"
            value={p}
            onChange={(e) => setP(e.target.value)}
            className="mt-2 bg-[#07080c] border-[#1b2234] rounded-none h-12"
          />
          <Button
            data-testid="admin-login-btn"
            type="submit"
            className="mt-6 w-full rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black h-12 font-mono-cyber uppercase tracking-widest text-xs"
          >
            <LogIn className="w-4 h-4 mr-2" /> Enter
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080c] grid-bg text-slate-100">
      <Toaster theme="dark" />
      <header className="sticky top-0 backdrop-blur-xl bg-[#07080c]/80 border-b border-[#1b2234] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bone className="w-5 h-5 text-[#00f0ff]" />
          <div className="font-heading text-lg font-bold tracking-widest">OSTEON // ADMIN</div>
        </div>
        <div className="flex gap-3">
          <Button onClick={exportCsv} data-testid="admin-export-btn" className="rounded-none clip-notch bg-[#00ff66] hover:bg-[#00ff66]/90 text-black font-mono-cyber uppercase tracking-widest text-xs">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Button onClick={logout} variant="outline" className="rounded-none clip-notch bg-transparent border-[#1b2234] font-mono-cyber uppercase tracking-widest text-xs">
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="users">
          <TabsList className="bg-[#0d1017] border border-[#1b2234] rounded-none">
            <TabsTrigger value="users" data-testid="tab-users" className="rounded-none font-mono-cyber uppercase tracking-widest text-xs data-[state=active]:bg-[#00f0ff] data-[state=active]:text-black">
              Users ({users.length})
            </TabsTrigger>
            <TabsTrigger value="questions" data-testid="tab-questions" className="rounded-none font-mono-cyber uppercase tracking-widest text-xs data-[state=active]:bg-[#00f0ff] data-[state=active]:text-black">
              Questions ({questions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-6">
            <div className="overflow-x-auto cyber-corners border border-[#1b2234] bg-[#0d1017]/70 clip-terminal">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff] border-b border-[#1b2234]">
                    <th className="p-4">Wallet</th>
                    <th className="p-4">Twitter</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Refs</th>
                    <th className="p-4">WL</th>
                    <th className="p-4">Attempts</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.wallet_address} className="border-b border-[#1b2234]/60 hover:bg-[#131824]">
                      <td className="p-4 font-mono-cyber text-xs">{u.wallet_address}</td>
                      <td className="p-4 font-mono-cyber text-xs text-slate-400">@{u.twitter_username}</td>
                      <td className="p-4 text-[#00ff66] font-bold">{u.best_score}</td>
                      <td className="p-4 text-[#00f0ff] font-bold">{u.referral_count}</td>
                      <td className="p-4">{u.qualified_wl ? <span className="text-[#00ff66]">✓</span> : <span className="text-slate-500">—</span>}</td>
                      <td className="p-4 text-slate-300">{u.attempts_used}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="mt-6 space-y-6">
            <div className="cyber-corners bg-[#0d1017]/70 border border-[#1b2234] p-6 clip-terminal">
              <div className="font-heading text-lg font-bold uppercase mb-4">Add Question</div>
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={newQ.type}
                  onChange={(e) => setNewQ({ ...newQ, type: e.target.value })}
                  className="bg-[#07080c] border border-[#1b2234] p-3 h-12 rounded-none font-mono-cyber text-sm"
                  data-testid="new-q-type"
                >
                  <option value="quiz">Quiz (5 pts)</option>
                  <option value="bone">Bone Guess (10 pts)</option>
                </select>
                <Input
                  placeholder="Image URL (optional)"
                  value={newQ.image_url}
                  onChange={(e) => setNewQ({ ...newQ, image_url: e.target.value })}
                  className="bg-[#07080c] border-[#1b2234] rounded-none h-12"
                />
              </div>
              <Input
                placeholder="Question"
                value={newQ.question}
                onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
                className="mt-4 bg-[#07080c] border-[#1b2234] rounded-none h-12"
                data-testid="new-q-text"
              />
              <div className="mt-4 grid grid-cols-2 gap-3">
                {newQ.options.map((o, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct"
                      checked={newQ.correct_index === i}
                      onChange={() => setNewQ({ ...newQ, correct_index: i })}
                      className="accent-[#00f0ff]"
                    />
                    <Input
                      placeholder={`Option ${i + 1}`}
                      value={o}
                      onChange={(e) => {
                        const opts = [...newQ.options];
                        opts[i] = e.target.value;
                        setNewQ({ ...newQ, options: opts });
                      }}
                      className="bg-[#07080c] border-[#1b2234] rounded-none h-11"
                    />
                  </div>
                ))}
              </div>
              <Button
                onClick={addQuestion}
                data-testid="new-q-submit"
                className="mt-4 rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs"
              >
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </div>

            <div className="space-y-3">
              {questions.map((q) => (
                <div key={q.id} className="p-5 border border-[#1b2234] bg-[#0d1017]/70 flex items-start justify-between gap-4 clip-notch">
                  <div className="flex-1">
                    <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">
                      {q.type} · {q.points} pts
                    </div>
                    <div className="mt-2 font-heading font-semibold">{q.question}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {q.options.map((o, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs font-mono-cyber ${
                            i === q.correct_index ? "bg-[#00ff66]/20 text-[#00ff66]" : "bg-[#1b2234] text-slate-400"
                          }`}
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => removeQ(q.id)}
                    className="p-2 border border-[#ff2a5f]/40 text-[#ff2a5f] hover:bg-[#ff2a5f]/10"
                    data-testid={`delete-q-${q.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
