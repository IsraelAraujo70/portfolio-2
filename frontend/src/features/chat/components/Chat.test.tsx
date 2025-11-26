import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Chat from "./Chat";
import { useAuth } from "@/features/auth/hooks/useAuth";

// Mock hooks
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("@/features/auth/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

describe("Chat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders guest view when user is not authenticated", async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    const user = userEvent.setup();

    render(<Chat />);

    expect(screen.getByText("Chat em construção")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Faça login ou crie sua conta para liberar o chat assim que estiver disponível/i,
      ),
    ).toBeInTheDocument();

    const loginBtn = screen.getByRole("button", { name: /Já tenho conta/i });
    const signupBtn = screen.getByRole("button", {
      name: /Quero me cadastrar/i,
    });

    expect(loginBtn).toBeInTheDocument();
    expect(signupBtn).toBeInTheDocument();

    await user.click(loginBtn);
    expect(mockNavigate).toHaveBeenCalledWith("/login");

    await user.click(signupBtn);
    expect(mockNavigate).toHaveBeenCalledWith("/signup");
  });

  it("renders user view when authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: "Test User" },
    });

    render(<Chat />);

    expect(screen.getByText("Chat em construção")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Olá, Test User! Em breve você poderá conversar comigo por aqui/i,
      ),
    ).toBeInTheDocument();

    const disabledBtn = screen.getByRole("button", {
      name: /Em breve disponível/i,
    });
    expect(disabledBtn).toBeInTheDocument();
    expect(disabledBtn).toBeDisabled();
  });
});
