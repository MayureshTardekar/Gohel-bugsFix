import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { completeTasks } from "@/lib/api";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Twitter, Repeat2, Heart } from "lucide-react";

const TASKS = [
  { id: "follow", label: "Follow @OsteonNFT", icon: Twitter, url: "https://twitter.com/intent/follow?screen_name=OsteonNFT" },
  { id: "retweet", label: "Retweet pinned drop", icon: Repeat2, url: "https://twitter.com" },
  { id: "like", label: "Like announcement", icon: Heart, url: "https://twitter.com" },
];

export default function Tasks({ onOpenAuth }) {
  const { user, refresh } = useUser();
  const [state, setState] = useState({ follow: false, retweet: false, like: false });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.tasks) setState(user.tasks);
  }, [user]);

  const toggle = (id) => setState((s) => ({ ...s, [id]: !s[id] }));

  const save = async () => {
    if (!user) {
      onOpenAuth();
      return;
    }
    setSaving(true);
    try {
      await completeTasks(user.wallet_address, state);
      await refresh();
      toast.success("Tasks synced");
    } catch (e) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const completed = Object.values(state).filter(Boolean).length;

  return (
    <section id="tasks" className="relative py-24 border-t border-[#1b2234]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 02 — Social Tasks</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight">
              Amplify the <span className="text-[#00f0ff]">signal</span>.
            </h2>
            <p className="mt-5 text-slate-400 text-base leading-relaxed">
              Complete Twitter tasks to boost the drop. These are self-declared and don't affect points, but you must
              complete them to be considered for whitelist review.
            </p>
            <div className="mt-8 cyber-corners p-5 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
              <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">Progress</div>
              <div className="mt-2 font-heading text-3xl font-bold">{completed} / 3</div>
              <div className="mt-3 h-1.5 bg-[#1b2234]">
                <div className="progress-fill h-full" style={{ width: `${(completed / 3) * 100}%` }} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {TASKS.map((t) => {
              const Icon = t.icon;
              const done = state[t.id];
              return (
                <div
                  key={t.id}
                  data-testid={`task-${t.id}`}
                  className={`cyber-corners p-6 border ${
                    done ? "border-[#00ff66]/40 bg-[#00ff66]/5" : "border-[#1b2234] bg-[#0d1017]/70"
                  } clip-terminal flex items-center gap-5`}
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center border ${
                      done ? "border-[#00ff66]/50 text-[#00ff66]" : "border-[#1b2234] text-slate-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="font-heading text-lg font-semibold uppercase tracking-wide">{t.label}</div>
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono-cyber text-[11px] uppercase tracking-widest text-[#00f0ff] hover:underline"
                    >
                      Open task ↗
                    </a>
                  </div>
                  <Checkbox
                    data-testid={`task-check-${t.id}`}
                    checked={done}
                    onCheckedChange={() => toggle(t.id)}
                    className="w-6 h-6 border-[#00f0ff]/60 data-[state=checked]:bg-[#00ff66] data-[state=checked]:border-[#00ff66]"
                  />
                </div>
              );
            })}
            <Button
              onClick={save}
              disabled={saving}
              data-testid="tasks-save-btn"
              className="rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs h-12 px-8"
            >
              {user ? "Sync Tasks" : "Link Wallet to Sync"}
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
