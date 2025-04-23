import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import { Button } from "../stories/Button";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: handleSignup, isSuccess } = useSignup();
  const isSignupBtnActive =
    !!email && !!password && password === confirmPassword;

  useEffect(() => {
    if (isSuccess) {
      alert("회원가입 성공");
      navigate("/login");
    }
  }, [isSuccess]);

  console.log("password: ", password);
  console.log("confirmPassword: ", confirmPassword);

  // 1. 회원가입 버튼 비활성화
  // 2. 이메일, 비밀번호, 비밀번호 확인 input에 입력이 되면, 입력된 값이 state에 저장되도록
  // 3. 비밀번호와 비밀번호 확인이 일치하는지 확인
  // 4. 회원가입 버튼 활성화
  // 5. 회원가입 버튼을 누르면, useSignup 훅을 사용해서 회원가입 요청
  // 6. 회원가입 요청이 성공하면, alert로 회원가입 성공 메시지를 띄우고, 로그인 페이지로 이동
  return (
    <Wrapper>
      <Input data-cy="emailInput" onChange={(e) => setEmail(e.target.value)} />
      <Input
        data-cy="passwordInput"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        data-cy="confirmPasswordInput"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        data-cy="signupButton"
        disabled={!isSignupBtnActive}
        label="회원가입"
        primary
        onClick={() => handleSignup({ username: email, password })}
      />
    </Wrapper>
  );
}

const ColumnSpaceBetween = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  ${ColumnSpaceBetween}
  height: 100%;
  background-color: var(--white);
  padding: 0 16px;

  > button {
    margin-bottom: 24px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const CloseButton = styled.button``;

const Title = styled.h1`
  color: var(--primary);
`;

const InputSection = styled.section`
  position: relative;
  margin-top: 40px;
`;

const Label = styled.label`
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 21px;
  color: var(--primary);
`;

const Input = styled.input`
  margin-bottom: 24px;

  padding-bottom: 8px;
  border-bottom: 1px solid var(--mono-300);
  color: var(--mono-300);

  &:focus {
    color: var(--secondary);
    border-bottom: 1px solid var(--secondary);
  }
`;

const ErrorMessage = styled.h6`
  font-size: 12px;
  line-height: 18px;
  color: var(--error);
  position: absolute;
  bottom: 0;
`;

const InputWrapper = styled.div`
  ${ColumnSpaceBetween}
`;
