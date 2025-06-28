import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage('Erfolgreich! Bitte prüfe deine E-Mails.');
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial", maxWidth: "400px", margin: "auto" }}>
      <h1>{isLogin ? 'Login' : 'Registrieren'}</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} required />
        <br /><br />
        <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} required />
        <br /><br />
        <button type="submit">{isLogin ? 'Einloggen' : 'Registrieren'}</button>
      </form>
      <br />
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Noch kein Konto? Registrieren' : 'Schon registriert? Login'}
      </button>
      <p>{message}</p>
    </main>
  );
}
