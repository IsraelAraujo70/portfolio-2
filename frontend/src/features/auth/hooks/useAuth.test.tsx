import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "../context/AuthProvider";
import { useAuth } from "./useAuth";

jest.mock("../services/authService", () => ({
  postLogin: jest.fn(),
  postSignup: jest.fn(),
  getProfile: jest.fn(),
}));

const { postLogin } = jest.requireMock("../services/authService");

const mockUser = {
  id: 1,
  name: "Test User",
  email: "test@example.com",
  role: "user",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

function TestHarness() {
  const { login, logout, user } = useAuth();

  return (
    <div>
      <button
        type="button"
        onClick={() => login({ email: "test@example.com", password: "secret" })}
      >
        trigger-login
      </button>
      <button type="button" onClick={() => logout()}>
        trigger-logout
      </button>
      {user ? <span>{user.email}</span> : <span>anon</span>}
    </div>
  );
}

describe("useAuth", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    window.localStorage.clear();
  });

  it("stores user data after login and clears on logout", async () => {
    postLogin.mockResolvedValue({ user: mockUser, token: "token-123" });
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestHarness />
      </AuthProvider>,
    );

    expect(screen.getByText("anon")).toBeInTheDocument();

    await user.click(screen.getByText("trigger-login"));

    expect(postLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "secret",
    });
    expect(await screen.findByText(mockUser.email)).toBeInTheDocument();

    await user.click(screen.getByText("trigger-logout"));
    expect(screen.getByText("anon")).toBeInTheDocument();
    expect(window.localStorage.getItem("portfolio-auth")).toBeNull();
  });
});
