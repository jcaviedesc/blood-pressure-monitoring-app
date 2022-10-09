export function buildSelfCareRequest(data: {
  professionals: string;
  patients: string;
  keywords: string;
}) {
  const splitKeywords = data.keywords
    .split(',')
    .map(keyword => keyword.trimStart().trimEnd());
  return {
    editor: {
      professional: data?.professionals,
      patient: data?.patients,
    },
    keywords: splitKeywords,
  };
}
