import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

// Data for the language selector
const languages = [{ value: "vietnam", label: "Việt Nam" }];

export const HeroSection = (): JSX.Element => {
  return (
    <div className="relative w-full h-full rounded-[0px_48px_48px_0px] overflow-hidden border-r-[10px] [background:linear-gradient(180deg,rgba(254,249,246,1)_0%,rgba(254,237,225,1)_100%)]">
      <div className="relative w-full h-full py-12 px-6">
        {/* Logo and Language Selector */}
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-4">
            <div className="relative w-[54px] h-[54px]">
              <img
                className="w-[51px] h-[51px]"
                alt="AMS Logo"
                src="/layer-1.svg"
              />
            </div>
            <div className="font-['Bayon',Helvetica] font-normal text-neutral-3 text-[56px] tracking-[5.60px] leading-[43.2px] whitespace-nowrap">
              AMS
            </div>
          </div>

          {/* Language Selector */}
          <div className="bg-[#f8e1d1] rounded-full">
            <Select defaultValue="vietnam">
              <SelectTrigger className="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 h-10 px-2">
                <div className="flex items-center gap-2">
                  <img className="w-6 h-6" alt="Flag" src="/component-2.svg" />
                  <SelectValue
                    placeholder="Select language"
                    className="font-text-md-light text-neutral-3"
                  />
                </div>
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-16">
          <div className="flex flex-col w-full max-w-[474px] items-start gap-4">
            <div className="font-['Lexend',Helvetica] font-medium text-[#f14801] text-4xl tracking-[-0.72px] leading-9">
              <span className="tracking-[-0.26px] leading-[43.2px]">
                Airline management system{" "}
              </span>
              <span className="text-[54px] tracking-[-0.58px] leading-[64.8px]">
                (AMS)
              </span>
            </div>

            <div className="font-text-l-regular text-neutral-3">
              Airline management system (AMS) is software designed to
              comprehensively support an airline&#39;s business activities.
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="relative w-full h-full">
          <div className="w-[889px] h-[603px] absolute top-[143px] left-[-143px] rotate-90 overflow-hidden">
            <div className="relative h-[603px]">
              <img
                className="absolute w-[603px] h-[889px] top-[-143px] left-[143px] -rotate-90"
                alt="Group"
                src="/group.png"
              />

              <div className="w-[73px] h-[33px] absolute top-[531px] left-[632px] overflow-hidden">
                <div className="relative h-[33px] opacity-50">
                  <img
                    className="absolute w-[33px] h-[73px] -top-5 left-5"
                    alt="Union"
                    src="/union-1.svg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[188px] h-[54px] absolute top-[375px] left-[39px] overflow-hidden">
            <div className="relative h-[201px] opacity-40">
              <img
                className="absolute w-[188px] h-[54px] top-0 left-0"
                alt="Union"
                src="/union-3.svg"
              />
            </div>
          </div>

          <img
            className="absolute w-[484px] h-[487px] top-[426px] left-[59px]"
            alt="Frame"
            src="/frame.svg"
          />

          <div className="absolute w-[74px] h-[34px] top-[395px] left-[532px] overflow-hidden -rotate-90 opacity-30">
            <div className="relative h-[34px]">
              <img
                className="absolute w-[34px] h-[74px] -top-5 left-5"
                alt="Union"
                src="/union-2.svg"
              />
            </div>
          </div>

          <div className="w-[175px] h-[78px] absolute top-[844px] left-[485px] -rotate-90 overflow-hidden">
            <div className="relative h-[187px] opacity-40">
              <img
                className="absolute w-[78px] h-[162px] top-1.5 -left-1.5"
                alt="Union"
                src="/union.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
