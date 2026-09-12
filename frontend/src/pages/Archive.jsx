import { useEffect, useMemo, useState } from "react";
import { getArchive } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Bone, Search, X } from "lucide-react";

export default function Archive() {
  const [data, setData] = useState({ bones: [], regions: [] });
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getArchive().then(setData).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return data.bones.filter((b) => {
      const r = region === "all" || b.region_id === region;
      const q = !query || b.name.toLowerCase().includes(query.toLowerCase()) || b.specimen.toLowerCase().includes(query.toLowerCase());
      return r && q;
    });
  }, [data.bones, region, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
      <div className="max-w-3xl">
        <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// Archive</div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.05]">
          The <span className="text-[#00f0ff]">Archive</span>.
        </h1>
        <p className="mt-6 text-slate-400 text-base sm:text-lg leading-relaxed">
          Every one of the 206 bones. Filter by region, search by name, and open a specimen for details.
        </p>
      </div>

      <div className="mt-10 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            data-testid="archive-search"
            placeholder="Search specimen or bone…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-[#0d1017] border-[#1b2234] rounded-none h-12 font-mono-cyber text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setRegion("all")}
            data-testid="region-all"
            className={`px-4 py-2 border font-mono-cyber text-[11px] uppercase tracking-widest ${
              region === "all" ? "border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff]" : "border-[#1b2234] text-slate-400 hover:border-[#00f0ff]/40"
            }`}
          >
            All · {data.bones.length}
          </button>
          {data.regions.map((r) => (
            <button
              key={r.id}
              onClick={() => setRegion(r.id)}
              data-testid={`region-${r.id}`}
              className={`px-4 py-2 border font-mono-cyber text-[11px] uppercase tracking-widest ${
                region === r.id ? "border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff]" : "border-[#1b2234] text-slate-400 hover:border-[#00f0ff]/40"
              }`}
            >
              {r.name} · {r.count}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 font-mono-cyber text-[11px] uppercase tracking-widest text-slate-500">
        Showing {filtered.length} of {data.bones.length} specimens
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {filtered.map((b) => (
          <button
            key={b.specimen}
            onClick={() => setSelected(b)}
            data-testid={`bone-card-${b.number}`}
            className="text-left cyber-corners bg-[#0d1017] border border-[#1b2234] hover:border-[#00f0ff]/60 clip-terminal p-4 group card-lift"
          >
            <div className="aspect-square bg-[#07080c] border border-[#1b2234] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <Bone className="w-10 h-10 text-[#00f0ff] opacity-60 group-hover:opacity-100 relative" strokeWidth={1.2} />
              <div className="absolute top-2 left-2 font-mono-cyber text-[9px] uppercase tracking-widest text-[#00ff66]">
                {b.specimen}
              </div>
            </div>
            <div className="mt-3 font-heading text-sm font-bold uppercase tracking-wide truncate">{b.name}</div>
            <div className="font-mono-cyber text-[10px] uppercase tracking-widest text-slate-500 mt-1 truncate">{b.region}</div>
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="bg-[#0d1017] border border-[#00f0ff]/30 text-slate-100 sm:max-w-lg p-0 clip-terminal">
          {selected && (
            <div className="p-8">
              <DialogTitle className="sr-only">{selected.name}</DialogTitle>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono-cyber text-[10px] uppercase tracking-[0.35em] text-[#00ff66]">{selected.specimen}</div>
                  <div className="mt-2 font-heading text-3xl font-black uppercase">{selected.name}</div>
                </div>
              </div>
              <div className="mt-6 aspect-video bg-[#07080c] border border-[#1b2234] flex items-center justify-center relative">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <Bone className="w-20 h-20 text-[#00f0ff]" strokeWidth={1.1} />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 font-mono-cyber text-xs uppercase tracking-widest">
                <div>
                  <div className="text-slate-500">Region</div>
                  <div className="mt-1 text-slate-200">{selected.region}</div>
                </div>
                <div>
                  <div className="text-slate-500">Classification</div>
                  <div className="mt-1 text-slate-200">{selected.parent}</div>
                </div>
                <div>
                  <div className="text-slate-500">Number</div>
                  <div className="mt-1 text-[#00f0ff]">{selected.number} / 206</div>
                </div>
                <div>
                  <div className="text-slate-500">Editions</div>
                  <div className="mt-1 text-[#00ff66]">10</div>
                </div>
              </div>
              <p className="mt-6 text-sm text-slate-400 leading-relaxed">{selected.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
