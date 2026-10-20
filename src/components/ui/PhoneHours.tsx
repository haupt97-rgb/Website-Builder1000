import { phoneHours } from "@/content/practice";

/** Tabelle der telefonischen Erreichbarkeit. */
export function PhoneHours({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  const dayCls = tone === "light" ? "text-white" : "text-petrol-900";
  const timeCls = tone === "light" ? "text-sage-100" : "text-ink";
  const lineCls = tone === "light" ? "border-white/12" : "border-line";
  return (
    <table className="w-full border-collapse text-[0.9375rem]">
      <caption className="sr-only">Telefonische Erreichbarkeit</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Wochentag</th>
          <th scope="col">Uhrzeit</th>
        </tr>
      </thead>
      <tbody>
        {phoneHours.map((d) => (
          <tr key={d.day} className={`border-b last:border-b-0 ${lineCls}`}>
            <th scope="row" className={`py-2.5 pr-4 text-left align-top font-semibold ${dayCls}`}>
              {compact ? <abbr title={d.day} className="no-underline">{d.short}</abbr> : d.day}
            </th>
            <td className={`py-2.5 text-right tabular-nums ${timeCls}`}>
              {d.slots.map((s, i) => (
                <span key={s.from} className="block whitespace-nowrap">
                  {i > 0 && <span className="sr-only">und </span>}
                  {s.from.replace(/^0/, "")} – {s.to} Uhr
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
