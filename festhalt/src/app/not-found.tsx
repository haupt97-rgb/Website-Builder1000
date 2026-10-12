import { LegalPage } from "@/components/LegalPage";

export default function NotFound() {
  return (
    <LegalPage title="Seite nicht gefunden" draft={false}>
      <p>Diese Seite gibt es leider nicht (mehr). Über den Link oben kommst du zurück zur Startseite.</p>
    </LegalPage>
  );
}
