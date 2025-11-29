export const analyzeCode = async (code: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    throw new Error("Failed to analyze code");
  }

  return res.json();
};
