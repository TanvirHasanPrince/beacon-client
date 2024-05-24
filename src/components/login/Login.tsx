"use client";

import { Button, Col, Row } from "antd";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "../forms/Form";
import FormInput from "../forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import BeaconLogin from "../ui/BeaconLogin";
import { getUserInfo, storeUserInfo } from "@/services/auth.service";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

const loginButtonStyle = {
  width: "100%", // Ensures buttons have the same width
  margin: "15px auto",
  padding: "0 30px",
  color: "black",
  backgroundImage: "linear-gradient(to right, #D8B4FE, #F0ABFC)", // Gradient color
  border: "none",
  borderRadius: "6px",
  fontSize: "1.1rem",
  fontWeight: "bold",
  letterSpacing: "0.5px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Box shadow for depth
  transition: "background-color 0.3s ease", // Smooth transition
  ":hover": {
    backgroundColor: "#1E40AF", // Blue color on hover
  },
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
        storeUserInfo({ token: res?.data?.token });
        const { role } = getUserInfo() as any;
        console.log(role);
        router.push(`/${role}/myProfile`);
      }
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
    <Row justify="center" align="middle" style={{ paddingTop: "" }}>
      <Col sm={12} md={16} lg={8}>
        <BeaconLogin />
      </Col>
      <Col sm={12} md={8} lg={8} style={{ textAlign: "center" }}>
        {" "}
        {/* Added justify="center" */}
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
                style={loginButtonStyle}
              >
                Checking credentials
              </Button>
            ) : (
              <div className="flex flex-col ">
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isButtonDisabled}
                  style={loginButtonStyle}
                >
                  Login
                </Button>
                <p> Don&apos;t have an account? </p>
                <Link href={"/member/signup"}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isButtonDisabled}
                    style={loginButtonStyle}
                  >
                    Sign Up
                  </Button>
                </Link>
                <p> Are you a Mental Health Professional? </p>
                <Link href={"/doctor/signup"} className="flex flex-row">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isButtonDisabled}
                    style={loginButtonStyle}
                  >
                    Sign Up Here
                  </Button>
                </Link>
              </div>
            )}
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
