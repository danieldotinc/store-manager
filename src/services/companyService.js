import http from "./httpService";

export async function getCompanies() {
  return http.get(`/companies`);
}

export async function getCompany(id) {
  return http.get(`/companies/${id}`);
}

export async function saveCompany(item) {
  return http.post(`/companies`, item);
}

export async function deleteCompany(id) {
  return http.delete(`/companies/${id}`);
}
