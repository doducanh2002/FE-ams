import {
  CheckCircleIcon,
  CircleIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Separator } from "../../../../components/ui/separator";

export const LoginFormSection = (): JSX.Element => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Password requirements data
  const passwordRequirements = [
    { id: "length", text: "Between 8 and 20 characters", checked: true },
    { id: "uppercase", text: "1 uppercase letter", checked: false },
    { id: "numbers", text: "1 or more numbers", checked: false },
    { id: "special", text: "1 or more special characters", checked: false },
  ];

  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-[518px] mx-auto">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-[40px] font-medium text-neutral-3 tracking-[-0.80px] leading-[60px] [font-family:'Lexend',Helvetica]">
          Welcome Back
        </h1>

        <p className="text-sm font-normal [font-family:'Lexend',Helvetica]">
          <span className="text-[#a3a5ae] font-text-sm-light">
            Already have an account?{" "}
          </span>
          <span className="text-[#ff6727] font-text-sm-medium cursor-pointer">
            Sign in
          </span>
        </p>
      </div>

      <Card className="w-full border-none shadow-none">
        <CardContent className="p-0 space-y-8">
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              {/* Username field */}
              <div className="space-y-2">
                <label className="block text-neutral-3 font-text-md-regular">
                  Username
                </label>
                <div className="flex items-center px-4 py-2.5 h-[54px] bg-[#f5f6f7] rounded-lg">
                  <UserIcon className="w-6 h-6 mr-2.5 text-neutral-2" />
                  <Input
                    className="border-none bg-transparent shadow-none h-auto p-0 placeholder:text-neutral-2 placeholder:font-text-md-light focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label className="block text-neutral-3 font-text-md-regular">
                  Email
                </label>
                <div className="flex items-center px-4 py-2.5 h-[54px] bg-[#f5f6f7] rounded-lg">
                  <MailIcon className="w-6 h-6 mr-2.5 text-neutral-2" />
                  <Input
                    className="border-none bg-transparent shadow-none h-auto p-0 placeholder:text-neutral-2 placeholder:font-text-md-light focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label className="block text-neutral-3 font-text-md-regular">
                  Password
                </label>
                <div className="flex items-center justify-between px-4 py-2.5 h-[54px] bg-[#f5f6f7] rounded-lg">
                  <div className="flex items-center flex-1">
                    <LockIcon className="w-6 h-6 mr-2.5 text-neutral-2" />
                    <Input
                      className="border-none bg-transparent shadow-none h-auto p-0 placeholder:text-neutral-2 placeholder:font-text-md-light focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-6 h-6 text-neutral-2" />
                    ) : (
                      <EyeIcon className="w-6 h-6 text-neutral-2" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm password field */}
              <div className="space-y-2">
                <label className="block text-neutral-3 font-text-md-regular">
                  Confirm password
                </label>
                <div className="flex items-center justify-between px-4 py-2.5 h-[54px] bg-[#f5f6f7] rounded-lg">
                  <div className="flex items-center flex-1">
                    <LockIcon className="w-6 h-6 mr-2.5 text-neutral-2" />
                    <Input
                      className="border-none bg-transparent shadow-none h-auto p-0 placeholder:text-neutral-2 placeholder:font-text-md-light focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter your password"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="w-6 h-6 text-neutral-2" />
                    ) : (
                      <EyeIcon className="w-6 h-6 text-neutral-2" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password requirements */}
              <div className="space-y-3">
                <p className="text-neutral-3 font-text-sm-medium">
                  Your password must contain
                </p>
                <div className="flex flex-wrap gap-[12px]">
                  {passwordRequirements.map((requirement) => (
                    <div
                      key={requirement.id}
                      className="flex items-center gap-2 w-[250px]"
                    >
                      {requirement.checked ? (
                        <CheckCircleIcon className="w-5 h-5 text-primary-2" />
                      ) : (
                        <CircleIcon className="w-5 h-5 text-neutral-4" />
                      )}
                      <span className="text-neutral-4 font-text-sm-light">
                        {requirement.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                className="w-6 h-6 rounded-[5px] border-[1.38px] border-[#e1e2e5]"
              />
              <label
                htmlFor="terms"
                className="text-sm font-normal [font-family:'Lexend',Helvetica]"
              >
                <span className="text-[#090a0b] font-light leading-[21px]">
                  By creating an account, you agree to our{" "}
                </span>
                <span className="text-[#ff6727] font-text-sm-medium cursor-pointer">
                  Term and Conditions
                </span>
              </label>
            </div>
          </div>

          {/* Sign up button */}
          <Button className="w-full h-[54px] rounded-lg shadow-[0px_4px_20px_#aa3d004c] [background:linear-gradient(180deg,rgba(254,146,43,1)_0%,rgba(255,91,37,1)_100%)] text-neutralwhite font-text-md-medium">
            Sign Up
          </Button>

          {/* Or login with section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-neutral-2 font-text-md-light whitespace-nowrap">
                Or Login with
              </span>
              <Separator className="flex-1" />
            </div>

            {/* Google login button */}
            <Button
              variant="outline"
              className="w-full h-[54px] flex items-center justify-center gap-3 rounded-lg border border-[#f1f2f3] bg-transparent text-neutral-3 font-text-md-medium"
            >
              <img className="w-[23px] h-6" alt="Google" src="/google.svg" />
              Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
