import request from '../utils/request';
import requestMethods from '../utils/requestMethods';

class ServicesApi {
  static async getServices() {
    const res = await request('/services', requestMethods.GET);
    return res;
  }
}

export default ServicesApi;
