"use client";
import { Button, Col, Row } from "antd";
import { SubmitHandler } from "react-hook-form";
import { isLoggedIn, storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "../forms/Form";
import FormInput from "../forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import BeaconLogin from "../ui/BeaconLogin";

type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const [userLogin, isLoading] = useUserLoginMutation();

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      setButtonDisabled(true);
      const res = await userLogin({ ...data }).unwrap();
      console.log(res);

      if (res?.success) {
        router.push("/");
      }
      storeUserInfo({ token: res?.data?.token });
    } catch (err: any) {
      if (err) {
        console.log(err);
        setLoginError(true);
        setButtonDisabled(false);
      }
      setErrorMessage(err.data.message);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ paddingTop: "100px" }}>
      <Col sm={12} md={16} lg={8}>
        <BeaconLogin></BeaconLogin>
      </Col>
      <Col sm={12} md={8} lg={8}>
        <div>
          {loginError && (
            <p style={{ margin: "0 auto", textAlign: "center", color: "red" }}>
              {errorMessage}
            </p>
          )}

          <Form submitHandler={onSubmit}>
            <div
              style={{
                marginTop: "15px",
              }}
            >
              <FormInput
                name="email"
                type="text"
                size="large"
                label="Email"
                placeholder="email@gmail.com"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
                placeholder="Type your password"
              />
            </div>
            {isButtonDisabled ? (
              <Button
                type="primary"
                htmlType="submit"
                disabled={isButtonDisabled}
              >
                Checking credentials
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                disabled={isButtonDisabled}
              >
                Login
              </Button>
            )}
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
