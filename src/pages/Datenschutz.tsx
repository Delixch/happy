type Section = {
  title: string;
  body: string[];
};

const SECTIONS: Section[] = [
  {
    title: '1. Verantwortliche Stelle',
    body: [
      'Verantwortlich für die Datenbearbeitung im Zusammenhang mit dieser Website ist:',
      'Happy Beck, Langstrasse 120, 8004 Zürich, Schweiz. E-Mail: info@happybeck.ch, Telefon: 043 243 97 80.',
    ],
  },
  {
    title: '2. Geltungsbereich',
    body: [
      'Diese Datenschutzerklärung informiert Sie darüber, welche Personendaten wir auf happybeck.ch bearbeiten, zu welchem Zweck dies geschieht und welche Rechte Ihnen dabei zustehen. Sie gilt für alle öffentlichen Seiten dieser Website.',
    ],
  },
  {
    title: '3. Datenerhebung beim Besuch der Website',
    body: [
      'Beim Aufruf unserer Website werden durch unseren Hosting-Anbieter (Vercel Inc.) automatisch technische Zugriffsdaten verarbeitet, z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, verwendeter Browser und aufgerufene Seite. Diese Daten dienen ausschliesslich der technischen Bereitstellung, Sicherheit und Stabilität der Website und werden nicht zu Profiling- oder Marketingzwecken ausgewertet.',
    ],
  },
  {
    title: '4. Kontaktformular & Vorbestellungen',
    body: [
      'Wenn Sie über das Formular auf der Seite «Kontakt & Bestellung» eine Nachricht senden oder eine Vorbestellung aufgeben, verarbeiten wir die von Ihnen angegebenen Daten (z. B. Name, E-Mail-Adresse, Nachricht) ausschliesslich zur Bearbeitung Ihres Anliegens.',
      'Der Versand erfolgt technisch über den E-Mail-Dienstleister Resend. Ihre Angaben werden nicht für Werbezwecke genutzt und nur so lange aufbewahrt, wie es für die Bearbeitung Ihrer Anfrage erforderlich ist.',
    ],
  },
  {
    title: '5. Hosting & Datenbank',
    body: [
      'Für den Betrieb unserer Website und die Speicherung von Inhalten (z. B. Speisekarte, Team, Aktuelles) nutzen wir die Dienste von Vercel Inc. (Hosting) und Supabase Inc. (Datenbank-Infrastruktur). Beide Anbieter verarbeiten Daten in unserem Auftrag und sind vertraglich zur Einhaltung des Datenschutzes verpflichtet. Es findet keine Erfassung von Besucherprofilen durch diese Dienste im Rahmen unserer Nutzung statt.',
    ],
  },
  {
    title: '6. Bildmaterial',
    body: [
      'Bilder auf dieser Website werden über den Dienst Cloudinary Inc. ausgeliefert. Beim Laden einer Bilddatei wird technisch eine Verbindung zu Servern von Cloudinary hergestellt, wobei die dabei anfallenden Zugriffsdaten (z. B. IP-Adresse) verarbeitet werden können.',
    ],
  },
  {
    title: '7. Cookies & lokaler Speicher',
    body: [
      'Unser Cookie-Banner speichert Ihre Auswahl («Alle akzeptieren» oder «Nur notwendige») lokal in Ihrem Browser (localStorage), damit der Hinweis nicht bei jedem Besuch erneut erscheint. Diese Angabe wird nicht an uns übermittelt oder ausgewertet.',
      'Derzeit setzen wir selbst keine Analyse- oder Marketing-Cookies ein. Sollte sich dies künftig ändern, passen wir diese Erklärung entsprechend an und holen wo nötig Ihre Einwilligung ein.',
    ],
  },
  {
    title: '8. Eingebettete Inhalte Dritter (YouTube)',
    body: [
      'Auf der Seite «Medien» können Sie TV-Beiträge über eingebettete YouTube-Videos abspielen. Wird ein Video gestartet, baut Ihr Browser eine Verbindung zu Servern von Google/YouTube auf. Dabei können Cookies gesetzt und Daten gemäss den Datenschutzbestimmungen von Google verarbeitet werden. Wir haben darauf keinen Einfluss.',
    ],
  },
  {
    title: '9. Externe Links & Social Media',
    body: [
      'Unsere Website verweist auf externe Plattformen wie Instagram, Uber Eats, Just Eat und Too Good To Go. Sobald Sie einen solchen Link anklicken, verlassen Sie unsere Seite und es gelten die Datenschutzbestimmungen des jeweiligen Anbieters.',
    ],
  },
  {
    title: '10. Ihre Rechte',
    body: [
      'Nach dem Schweizer Datenschutzgesetz (DSG) haben Sie das Recht auf Auskunft über die von uns über Sie bearbeiteten Personendaten sowie auf Berichtigung, Löschung oder Einschränkung der Bearbeitung, sofern die gesetzlichen Voraussetzungen erfüllt sind. Möchten Sie von diesen Rechten Gebrauch machen, kontaktieren Sie uns unter info@happybeck.ch.',
    ],
  },
  {
    title: '11. Datensicherheit',
    body: [
      'Diese Website wird ausschliesslich über eine verschlüsselte Verbindung (HTTPS/TLS) ausgeliefert. Der Zugriff auf Verwaltungsfunktionen (Supervisor-Bereich) ist durch eine Anmeldung geschützt und auf berechtigte Personen beschränkt.',
    ],
  },
  {
    title: '12. Änderungen dieser Erklärung',
    body: [
      'Wir passen diese Datenschutzerklärung an, sobald sich unsere Website oder die rechtlichen Vorgaben ändern. Es gilt jeweils die zum Zeitpunkt Ihres Besuchs aktuelle Fassung.',
    ],
  },
];

export default function Datenschutz() {
  return (
    <div className="pt-14 md:pt-16 min-h-screen bg-[#FFFFCC] pb-24">
      {/* Brand header */}
      <div className="bg-[#1A1A00] pt-10 pb-14">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFFFCC]/10 text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Rechtliches
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight">
            Datenschutz<span className="text-[#FFFFCC]">erklärung</span>
          </h1>
          <p className="text-white/60 font-sans text-sm mt-3">Stand: Juli 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl space-y-6">
        {SECTIONS.map((section) => {
          return (
            <div
              key={section.title}
              className="bg-[#1A1A00] rounded-3xl p-7 md:p-9 shadow-xl border-2 border-[#FFFFCC]/20"
            >
              <h2 className="text-xl md:text-2xl font-serif font-black text-[#FFFFCC] mb-3">
                {section.title}
              </h2>
              <div className="text-white/90 font-sans text-sm md:text-base leading-relaxed space-y-3 font-medium">
                {section.body.map((paragraph, pi) => (
                  <p key={pi}>{paragraph}</p>
                ))}
              </div>
            </div>
          );
        })}

        <div className="text-center pt-4">
          <p className="text-[#1A1A00]/80 font-sans text-sm font-semibold">
            Fragen zum Datenschutz? Schreiben Sie uns an{' '}
            <a href="mailto:info@happybeck.ch" className="font-black text-[#1A1A00] underline">
              info@happybeck.ch
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
