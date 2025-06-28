import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error || !user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Dashboard</h1>
      {user && (
        <>
          <p>Angemeldet als: {user.email}</p>
          <button onClick={logout}>Abmelden</button>
          <hr />
          <p>Hier entsteht dein Vergabe-Assistent – z. B. mit:</p>
          <ul>
            <li>📁 Beschaffungsprojekte</li>
            <li>🔍 Markterkundung starten</li>
            <li>📄 Unterlagen vorbereiten</li>
          </ul>
        </>
      )}
    </main>
  );
}
