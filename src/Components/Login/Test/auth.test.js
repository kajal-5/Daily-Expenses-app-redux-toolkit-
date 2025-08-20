import { loginUser } from "../../../store/auth";
import axios from "axios";

jest.mock("axios");

describe("Auth async thunks", () => {
  it("loginUser dispatches fulfilled on success", async () => {
    const fakeResponse = { idToken: "abc123", email: "abc@gmail.com" };
    axios.post.mockResolvedValueOnce({ data: fakeResponse });

    const thunkAPI = { dispatch: jest.fn(), getState: jest.fn() };

    const result = await loginUser({ email: "abc@gmail.com", password: "abc@123" })(
      thunkAPI.dispatch,
      thunkAPI.getState,
      undefined
    );

    expect(result.payload).toEqual({ email: "abc@gmail.com", token: "abc123" }); // ✅ Fix
  });
});
