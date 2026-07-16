import api from "./axios";

export async function getAuditLogs() {
  const { data } = await api.get("/audit");
  return data;
}