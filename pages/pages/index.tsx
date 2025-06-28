import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Vergabe-Assistent</title>
        <meta name="description" content="Plattform für öffentliche Auftraggeber" />
      </Head>
      <main style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1>Willkommen beim Vergabe-Assistent</h1>
        <p>Bitte <a href="/login">einloggen</a>, um das Dashboard zu nutzen.</p>
      </main>
    </>
  );
}
