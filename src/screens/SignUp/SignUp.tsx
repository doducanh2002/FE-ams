import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { LoginFormSection } from "./sections/LoginFormSection";

export const SignUp = (): JSX.Element => {
  return (
    <main className="bg-white flex flex-col md:flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1440px] relative flex flex-col md:flex-row">
        <HeroSection />
        <LoginFormSection />
      </div>
    </main>
  );
};