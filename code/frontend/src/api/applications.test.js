// @flow

jest.mock("../utils/request");

import { API_URL } from "./index";
import * as applications from "./applications";

describe("applications api", () => {
  describe("getApplications", () => {
    it("should return a list of applications", done => {
      const expectedResult = `${API_URL}/applications`;

      applications.getApplications().then(applications => {
        expect(applications.size).toBe(2);
        expect(applications.get(0).get("name")).toBe("123 Application");
        done();
      });
    });
  });
});
