export function buildSelfcareRequest(data: {
  professionals: string;
  patients: string;
  keywords: string[];
}) {
  return {
    editor: {
      professional: data?.professionals,
      patient: data?.patients,
    },
    keywords: data?.keywords,
  };
}
