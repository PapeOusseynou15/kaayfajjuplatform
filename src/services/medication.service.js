import http from "../http-common";

class MedicationDataService {
  getAll() {
    return http.get("/medications");
  }

  get(id) {
    return http.get(`/medicationss/${id}`);
  }
  getByEmail(email) {
    return http.get(`/medications/email/${email}`);
  }

  create(data) {
    return http.post("/medications", data);
  }

  update(id, data) {
    return http.put(`/medications/${id}`, data);
  }

  delete(id) {
    return http.delete(`/medications/${id}`);
  }

  deleteAll() {
    return http.delete(`/medications`);
  }

}

export default new MedicationDataService();