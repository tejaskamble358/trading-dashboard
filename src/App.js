import { useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/analyze");
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return (
    <div style={{ background:"#050505", color:"#fff", minHeight:"100vh", padding:20 }}>
      
      <h2 style={{ color:"#4ade80" }}>Trading Dashboard</h2>

      <button onClick={fetchData} style={{
        background:"#0b2010",
        color:"#4ade80",
        padding:"8px 12px",
        border:"1px solid #1a4d24",
        marginBottom:20
      }}>
        {loading ? "Loading..." : "Fetch Signals"}
      </button>

      {data && (
        <pre style={{ background:"#111", padding:10 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
