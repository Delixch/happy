import { forwardRef, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sandwich, Check, Sparkles, ArrowRight, CalendarDays, Clock, Smartphone, RotateCcw, Shuffle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/contact';

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function formatDateDe(iso: string) {
  if (!iso) return '';
  return new Date(`${iso}T00:00:00`).toLocaleDateString('de-CH', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
}

type Option = { id: string; label: string; price: number; emoji: string; color: string };

const BREADS: Option[] = [
  { id: 'weizen', label: 'Weizenbrötchen', price: 3.5, emoji: '🥖', color: '#E8C468' },
  { id: 'vollkorn', label: 'Vollkorn-Baguette', price: 3.8, emoji: '🍞', color: '#B9803F' },
  { id: 'ciabatta', label: 'Ciabatta', price: 4.0, emoji: '🥯', color: '#EFD9A0' },
  { id: 'wrap', label: 'Wrap', price: 3.6, emoji: '🌯', color: '#F2E4BE' },
];

const PROTEINS: Option[] = [
  { id: 'poulet', label: 'Pouletbrust', price: 4.5, emoji: '🍗', color: '#E4B074' },
  { id: 'salami', label: 'Salami', price: 3.8, emoji: '🥓', color: '#C1483A' },
  { id: 'truthahn', label: 'Truthahn', price: 4.2, emoji: '🦃', color: '#D69B62' },
  { id: 'thunfisch', label: 'Thunfisch', price: 4.3, emoji: '🐟', color: '#8FA7C2' },
  { id: 'falafel', label: 'Falafel (vegi)', price: 3.9, emoji: '🧆', color: '#7E9B54' },
];

const CHEESES: Option[] = [
  { id: 'cheddar', label: 'Cheddar', price: 1.5, emoji: '🧀', color: '#F4B93E' },
  { id: 'gouda', label: 'Gouda', price: 1.3, emoji: '🧀', color: '#F2C562' },
  { id: 'mozzarella', label: 'Mozzarella', price: 1.6, emoji: '🧀', color: '#FBF4DD' },
];

const VEGGIES: Option[] = [
  { id: 'tomaten', label: 'Tomaten', price: 0, emoji: '🍅', color: '#D6483F' },
  { id: 'gurken', label: 'Gurken', price: 0, emoji: '🥒', color: '#8FBF6B' },
  { id: 'rucola', label: 'Rucola', price: 0, emoji: '🌿', color: '#6B8E4E' },
  { id: 'zwiebeln', label: 'Röstzwiebeln', price: 0.5, emoji: '🧅', color: '#C98A3B' },
  { id: 'peperoni', label: 'Peperoni', price: 0, emoji: '🫑', color: '#5FA65A' },
  { id: 'mais', label: 'Mais', price: 0, emoji: '🌽', color: '#F4D35E' },
];

const SAUCES: Option[] = [
  { id: 'aioli', label: 'Aioli', price: 0, emoji: '🧄', color: '#F3EAD3' },
  { id: 'chilimayo', label: 'Chili-Mayo', price: 0, emoji: '🌶️', color: '#E4572E' },
  { id: 'senf', label: 'Senf', price: 0, emoji: '💛', color: '#F2C230' },
  { id: 'pesto', label: 'Pesto', price: 0, emoji: '🌱', color: '#5B7B3A' },
  { id: 'joghurt', label: 'Joghurt-Kräuter', price: 0, emoji: '🥣', color: '#F5F1E6' },
];

const DEFAULT_BREAD_ID = 'ciabatta';

type Preset = {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  breadId: string;
  proteinIds: string[];
  cheeseIds: string[];
  veggieIds: string[];
  sauceIds: string[];
};

/** Ready-made combinations for anyone who would rather not start from a blank roll. */
const PRESETS: Preset[] = [
  {
    id: 'klassiker',
    name: 'Der Klassiker',
    tagline: 'Geht immer, enttäuscht nie',
    emoji: '🥪',
    breadId: 'ciabatta',
    proteinIds: ['poulet'],
    cheeseIds: ['cheddar'],
    veggieIds: ['tomaten', 'rucola'],
    sauceIds: ['aioli'],
  },
  {
    id: 'scharf',
    name: 'Der Scharfe',
    tagline: 'Für alle, die es würzig mögen',
    emoji: '🌶️',
    breadId: 'weizen',
    proteinIds: ['salami'],
    cheeseIds: ['gouda'],
    veggieIds: ['peperoni', 'zwiebeln'],
    sauceIds: ['chilimayo'],
  },
  {
    id: 'gruen',
    name: 'Ganz in Grün',
    tagline: 'Vegetarisch und richtig sättigend',
    emoji: '🌿',
    breadId: 'vollkorn',
    proteinIds: ['falafel'],
    cheeseIds: ['mozzarella'],
    veggieIds: ['gurken', 'tomaten', 'rucola'],
    sauceIds: ['joghurt'],
  },
];

function randomFrom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function randomSome(list: Option[], min: number, max: number): string[] {
  const count = min + Math.floor(Math.random() * (max - min + 1));
  return [...list]
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((o) => o.id);
}

function formatChf(value: number) {
  return `CHF ${value.toFixed(2)}`;
}

function summarizeList(options: Option[], emptyLabel: string) {
  return options.length ? options.map((o) => `${o.emoji} ${o.label}`).join(', ') : emptyLabel;
}

function StepHeading({ step, title, sub }: { step: number; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <span className="w-8 h-8 rounded-full bg-[#FFFFCC] text-[#1A1A00] font-sans font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md">
        {step}
      </span>
      <div>
        <h3 className="font-serif text-lg md:text-xl font-black text-[#FFFFCC]">{title}</h3>
        <p className="text-white/60 font-sans text-xs md:text-sm">{sub}</p>
      </div>
    </div>
  );
}

function OptionGrid({
  options,
  selected,
  onToggle,
  multi,
}: {
  options: Option[];
  selected: string[];
  onToggle: (id: string) => void;
  multi: boolean;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
      {options.map((opt) => {
        const isActive = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onToggle(opt.id)}
            className={`relative text-left px-4 py-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-[#FFFFCC] border-[#FFFFCC] text-[#1A1A00] shadow-xl scale-[1.03]'
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {isActive && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#1A1A00] text-[#FFFFCC] flex items-center justify-center shadow-md">
                <Check className="w-3 h-3" />
              </span>
            )}
            <div className="text-xl mb-1">{opt.emoji}</div>
            <div className="font-sans font-bold text-xs leading-tight">{opt.label}</div>
            {opt.price > 0 && (
              <div className={`font-sans text-[10px] mt-1 font-semibold ${isActive ? 'text-[#1A1A00]/70' : 'text-white/50'}`}>
                +{formatChf(opt.price)}
              </div>
            )}
          </button>
        );
      })}
      {multi && (
        <p className="col-span-full text-white/40 font-sans text-[11px] -mt-2">Mehrfachauswahl – nochmal tippen zum Entfernen</p>
      )}
    </div>
  );
}

const Layer = forwardRef<HTMLDivElement, {
  layoutId: string;
  height: string;
  radius?: string;
  bg: string;
  border?: string;
  children?: React.ReactNode;
}>(function Layer({ layoutId, height, radius, bg, border, children }, ref) {
  return (
    <motion.div
      ref={ref}
      layout
      layoutId={layoutId}
      initial={{ opacity: 0, y: -16, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      className={`relative w-full flex items-center justify-center shadow-md ${height} ${radius ?? 'rounded-xl'}`}
      style={{ background: bg, border: border ?? '1px solid rgba(0,0,0,0.12)', marginTop: '-6px' }}
    >
      {children}
    </motion.div>
  );
});

function SandwichVisual({
  bread,
  proteins,
  cheeses,
  veggies,
  sauces,
}: {
  bread: Option;
  proteins: Option[];
  cheeses: Option[];
  veggies: Option[];
  sauces: Option[];
}) {
  const isEmpty = !proteins.length && !cheeses.length && !veggies.length && !sauces.length;

  return (
    <div className="flex flex-col items-center py-4">
      <div className="w-44 flex flex-col items-center" style={{ marginTop: '6px' }}>
        <AnimatePresence mode="popLayout">
          {/* Top bun */}
          <Layer key="bun-top" layoutId="bun-top" height="h-9" radius="rounded-t-[50%] rounded-b-md" bg={bread.color}>
            <span className="text-lg -mt-1">{bread.emoji}</span>
          </Layer>

          {/* Sauces */}
          {sauces.map((s) => (
            <Layer key={`sauce-${s.id}`} layoutId={`sauce-${s.id}`} height="h-2.5" radius="rounded-full" bg={s.color} border="1px dashed rgba(0,0,0,0.15)" />
          ))}

          {/* Veggies, each its own animated layer */}
          {veggies.map((v, i) => (
            <Layer key={`veg-${v.id}`} layoutId={`veg-${v.id}`} height="h-6" radius="rounded-full" bg={v.color}>
              <span className="text-xs" style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (4 + i)}deg)` }}>
                {v.emoji}
              </span>
            </Layer>
          ))}

          {/* Cheeses */}
          {cheeses.map((c) => (
            <Layer key={`cheese-${c.id}`} layoutId={`cheese-${c.id}`} height="h-4" radius="rounded-sm" bg={c.color}>
              <span className="text-[10px]">{c.emoji}</span>
            </Layer>
          ))}

          {/* Proteins */}
          {proteins.map((p) => (
            <Layer key={`protein-${p.id}`} layoutId={`protein-${p.id}`} height="h-10" radius="rounded-2xl" bg={p.color}>
              <span className="text-lg">{p.emoji}</span>
            </Layer>
          ))}

          {/* Bottom bun */}
          <Layer key="bun-bottom" layoutId="bun-bottom" height="h-8" radius="rounded-b-[50%] rounded-t-md" bg={bread.color} />
        </AnimatePresence>
      </div>
      <p className="text-white/40 font-sans text-[11px] mt-4 italic">
        {isEmpty ? 'Wähl los – dein Sandwich wächst mit jeder Zutat' : 'Dein Sandwich wächst mit jeder Zutat'}
      </p>
    </div>
  );
}

export default function SandwichBuilder() {
  const navigate = useNavigate();
  const [breadId, setBreadId] = useState<string>(DEFAULT_BREAD_ID);
  const [proteinIds, setProteinIds] = useState<string[]>(['poulet']);
  const [cheeseIds, setCheeseIds] = useState<string[]>(['cheddar']);
  const [veggieIds, setVeggieIds] = useState<string[]>(['tomaten', 'rucola']);
  const [sauceIds, setSauceIds] = useState<string[]>(['aioli']);
  const [pickupDate, setPickupDate] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('');

  const bread = BREADS.find((b) => b.id === breadId)!;
  const proteins = PROTEINS.filter((p) => proteinIds.includes(p.id));
  const cheeses = CHEESES.filter((c) => cheeseIds.includes(c.id));
  const veggies = VEGGIES.filter((v) => veggieIds.includes(v.id));
  const sauces = SAUCES.filter((s) => sauceIds.includes(s.id));

  const total = useMemo(
    () =>
      bread.price +
      [...proteins, ...cheeses, ...veggies, ...sauces].reduce((sum, o) => sum + o.price, 0),
    [bread, proteins, cheeses, veggies, sauces]
  );

  const makeToggler = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) => {
    setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const toggleProtein = makeToggler(setProteinIds);
  const toggleCheese = makeToggler(setCheeseIds);
  const toggleVeggie = makeToggler(setVeggieIds);
  const toggleSauce = makeToggler(setSauceIds);

  const resetAll = () => {
    setBreadId(DEFAULT_BREAD_ID);
    setProteinIds([]);
    setCheeseIds([]);
    setVeggieIds([]);
    setSauceIds([]);
    setPickupDate('');
    setPickupTime('');
  };

  const applyPreset = (preset: Preset) => {
    setBreadId(preset.breadId);
    setProteinIds(preset.proteinIds);
    setCheeseIds(preset.cheeseIds);
    setVeggieIds(preset.veggieIds);
    setSauceIds(preset.sauceIds);
  };

  const surpriseMe = () => {
    setBreadId(randomFrom(BREADS).id);
    setProteinIds(randomSome(PROTEINS, 1, 2));
    setCheeseIds(randomSome(CHEESES, 0, 1));
    setVeggieIds(randomSome(VEGGIES, 2, 4));
    setSauceIds(randomSome(SAUCES, 1, 1));
  };

  const activePresetId = PRESETS.find(
    (p) =>
      p.breadId === breadId &&
      p.proteinIds.length === proteinIds.length &&
      p.proteinIds.every((id) => proteinIds.includes(id)) &&
      p.cheeseIds.length === cheeseIds.length &&
      p.cheeseIds.every((id) => cheeseIds.includes(id)) &&
      p.veggieIds.length === veggieIds.length &&
      p.veggieIds.every((id) => veggieIds.includes(id)) &&
      p.sauceIds.length === sauceIds.length &&
      p.sauceIds.every((id) => sauceIds.includes(id))
  )?.id;

  // A roll on its own is not an order — ask for at least one filling.
  const hasFilling = proteins.length + cheeses.length + veggies.length > 0;
  const canOrder = hasFilling && pickupDate !== '' && pickupTime !== '';

  const orderNow = () => {
    if (!canOrder) return;
    const lines = [
      'Ich möchte mir gerne folgendes Wunsch-Sandwich zusammenstellen lassen:',
      '',
      `Brot: ${bread.emoji} ${bread.label}`,
      `Hauptzutaten: ${summarizeList(proteins, 'keine')}`,
      `Käse: ${summarizeList(cheeses, 'ohne')}`,
      `Gemüse: ${summarizeList(veggies, 'keins')}`,
      `Sauce: ${summarizeList(sauces, 'ohne')}`,
      '',
      `Abholung: ${formatDateDe(pickupDate)} um ${pickupTime} Uhr`,
      '',
      `Geschätzter Preis: ${formatChf(total)}`,
      `Zahlung: per TWINT an ${PHONE_DISPLAY} (wird vor Abholung überwiesen)`,
    ];
    navigate('/kontakt', { state: { prefillMessage: lines.join('\n') } });
  };

  return (
    <div className="mt-16 md:mt-20">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          Ganz nach deinem Geschmack
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-black text-[#1A1A00] mb-3">
          Bau dir dein <span className="text-[#2C2C00]">Traum-Sandwich</span>
        </h2>
        <p className="text-[#1E293B]/80 font-sans font-bold text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Kein Sandwich von der Stange – deines. Kombiniere so viel du willst, aus Versehen angetippt?
          Einfach nochmal drauf und weg damit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Builder Steps */}
        <div className="lg:col-span-2 rounded-3xl p-6 md:p-8 bg-[#1A1A00] shadow-2xl border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/50 font-sans text-xs">Alles frei kombinierbar, so wie du magst</p>
            <button
              type="button"
              onClick={resetAll}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/15 text-white/70 font-sans font-bold text-[11px] uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all cursor-pointer flex-shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Von vorne beginnen
            </button>
          </div>

          {/* Shortcut for anyone who does not want to decide seven times */}
          <div className="mb-8">
            <p className="font-sans font-bold text-[11px] text-white/60 uppercase tracking-wider mb-3">
              Keine Lust zu tüfteln? Nimm eine unserer Lieblingskombis
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRESETS.map((preset) => {
                const isActive = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`text-left px-4 py-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#FFFFCC] border-[#FFFFCC] text-[#1A1A00] shadow-xl'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="text-xl mb-1">{preset.emoji}</div>
                    <div className="font-sans font-black text-sm leading-tight">{preset.name}</div>
                    <div className={`font-sans text-[11px] mt-0.5 ${isActive ? 'text-[#1A1A00]/70' : 'text-white/50'}`}>
                      {preset.tagline}
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={surpriseMe}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#FFFFCC]/30 text-[#FFFFCC] font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#FFFFCC]/10 transition-all cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Überrasch mich
            </button>
          </div>

          <StepHeading step={1} title="Wähle dein Brot" sub="Die Basis für alles Gute" />
          <OptionGrid options={BREADS} selected={[breadId]} onToggle={setBreadId} multi={false} />

          <StepHeading step={2} title="Und jetzt der Star der Show" sub="Deine Hauptzutaten – gerne auch mehrere" />
          <OptionGrid options={PROTEINS} selected={proteinIds} onToggle={toggleProtein} multi />

          <StepHeading step={3} title="Etwas Käse dazu?" sub="Schmilzt einfach perfekt" />
          <OptionGrid options={CHEESES} selected={cheeseIds} onToggle={toggleCheese} multi />

          <StepHeading step={4} title="Frisches Grün und Knackiges" sub="So viel du willst" />
          <OptionGrid options={VEGGIES} selected={veggieIds} onToggle={toggleVeggie} multi />

          <StepHeading step={5} title="Die Krönung: deine Sauce" sub="Macht jedes Sandwich unwiderstehlich" />
          <OptionGrid options={SAUCES} selected={sauceIds} onToggle={toggleSauce} multi />

          <StepHeading step={6} title="Wann darf's fertig sein?" sub="Wähle Tag und Uhrzeit für die Abholung" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <label className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-white/10 bg-white/5">
              <CalendarDays className="w-5 h-5 text-[#FFFFCC] flex-shrink-0" />
              <div className="w-full">
                <span className="block font-sans font-bold text-[11px] text-white/60 uppercase tracking-wider mb-1">Abholtag</span>
                <input
                  type="date"
                  min={todayIso()}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-transparent text-white font-sans text-sm outline-none [color-scheme:dark]"
                />
              </div>
            </label>
            <label className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-white/10 bg-white/5">
              <Clock className="w-5 h-5 text-[#FFFFCC] flex-shrink-0" />
              <div className="w-full">
                <span className="block font-sans font-bold text-[11px] text-white/60 uppercase tracking-wider mb-1">Uhrzeit</span>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-transparent text-white font-sans text-sm outline-none [color-scheme:dark]"
                />
              </div>
            </label>
          </div>

          <StepHeading step={7} title="Bezahlung" sub="Schnell, sicher, ganz ohne Bargeld" />
          <div className="flex items-start gap-3 px-4 py-4 rounded-2xl border border-[#FFFFCC]/20 bg-white/5 mb-2">
            <Smartphone className="w-5 h-5 text-[#FFFFCC] flex-shrink-0 mt-0.5" />
            <p className="text-white/80 font-sans text-xs md:text-sm leading-relaxed">
              Vorbestellungen zahlst du aktuell bequem per <strong className="text-[#FFFFCC]">TWINT</strong> im Voraus –
              schick den Betrag einfach an <a href={`tel:${PHONE_TEL}`} className="text-[#FFFFCC] underline underline-offset-2">{PHONE_DISPLAY}</a>, sobald du bestellt hast.
              Dein Sandwich wartet frisch und fertig auf dich, wenn du eintrudelst.
            </p>
          </div>
        </div>

        {/* Live Summary */}
        <div className="lg:sticky lg:top-24 h-fit rounded-3xl p-6 md:p-8 bg-[#2C2C00] shadow-2xl border border-[#FFFFCC]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-full bg-[#FFFFCC] text-[#1A1A00] flex items-center justify-center shadow-md flex-shrink-0">
              <Sandwich className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-black text-[#FFFFCC]">Dein Sandwich</h3>
              <p className="text-white/50 font-sans text-[11px]">Sieht schon jetzt gut aus</p>
            </div>
          </div>

          <SandwichVisual bread={bread} proteins={proteins} cheeses={cheeses} veggies={veggies} sauces={sauces} />

          <ul className="space-y-2.5 mb-6 font-sans text-sm">
            <li className="flex justify-between text-white/90">
              <span>{bread.emoji} {bread.label}</span>
              <span className="text-white/50">{formatChf(bread.price)}</span>
            </li>
            <li className="flex justify-between text-white/90">
              <span>🍗 {summarizeList(proteins, 'keine Hauptzutat')}</span>
            </li>
            <li className="flex justify-between text-white/90">
              <span>🧀 {summarizeList(cheeses, 'ohne Käse')}</span>
            </li>
            <li className="flex justify-between text-white/90">
              <span>🥗 {summarizeList(veggies, 'ohne Gemüse')}</span>
            </li>
            <li className="flex justify-between text-white/90">
              <span>🥣 {summarizeList(sauces, 'ohne Sauce')}</span>
            </li>
          </ul>

          <div className="pt-4 border-t border-white/10 mb-4 space-y-1.5 font-sans text-xs">
            <div className="flex items-center gap-2 text-white/70">
              <CalendarDays className="w-3.5 h-3.5 text-[#FFFFCC]" />
              <span>{pickupDate ? formatDateDe(pickupDate) : 'Abholtag noch offen'}</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Clock className="w-3.5 h-3.5 text-[#FFFFCC]" />
              <span>{pickupTime ? `${pickupTime} Uhr` : 'Uhrzeit noch offen'}</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Smartphone className="w-3.5 h-3.5 text-[#FFFFCC]" />
              <span>Zahlung per TWINT</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 mb-6">
            <span className="text-white/70 font-sans text-xs uppercase tracking-wider font-bold">Total</span>
            <span className="text-[#FFFFCC] font-serif text-2xl font-black">{formatChf(total)}</span>
          </div>

          <button
            type="button"
            onClick={orderNow}
            disabled={!canOrder}
            className="w-full py-4 rounded-2xl bg-[#FFFFCC] text-[#1A1A00] font-sans font-black text-sm uppercase tracking-wider shadow-xl hover:scale-[1.03] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Jetzt Wunsch-Sandwich bestellen
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-center text-white/40 font-sans text-[11px] mt-3">
            {canOrder
              ? 'Du landest im Bestellformular – deine Auswahl ist schon drin.'
              : !hasFilling
                ? 'Leg noch etwas auf dein Brot, dann kann es losgehen.'
                : 'Fehlt nur noch: wann du es abholen möchtest.'}
          </p>
        </div>
      </div>
    </div>
  );
}
