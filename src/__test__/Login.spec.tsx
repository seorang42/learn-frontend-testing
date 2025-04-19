import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { createMemoryRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "../pages/LoginPage";
import useLogin from "../hooks/useLogin";
import * as nock from "nock";

const queryClient = new QueryClient({});

describe("로그인 테스트", () => {
  // 테스트 중 에러 발생 시 빨간 텍스트 표시 방지
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  // 테스트 종료 후 원상복귀
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("로그인에 실패하면 에러메세지가 나타난다", async () => {
    // given - 로그인 화면이 그려진다
    const routes = [
      {
        path: "/signup",
        element: <LoginPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    // when - 사용자가 로그인에 실패한다
    nock("https://inflearn.byeongjinkang.com")
      .post("/user/login", {
        username: "wrong@email.com",
        password: "wrongPassword",
      })
      .reply(400, { msg: "NO_SUCH_USER" });

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");

    fireEvent.change(emailInput, { target: { value: "wrong@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });

    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);

    const { result } = renderHook(() => useLogin(), { wrapper });

    // then - 에러메세지가 나타남
    await waitFor(() => result.current.isError);
    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });
});
