import request from '../utils/request';
import requestMethods from '../utils/requestMethods';

class AttendanceApi {
  static getAttendances() {
    return request('/attendance', requestMethods.GET)
  }

  static getAttendanceById(recordId, mode) {
    return request(`/attendances/${recordId}?mode=${mode}`, requestMethods.GET)
  }

}

export default AttendanceApi;
