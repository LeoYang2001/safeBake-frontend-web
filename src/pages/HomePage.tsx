import { useState } from "react";
import OvenDialProp from "../components/common/OvenDialProp";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";

function HomePage() {
  const [dialAValue, setDialAValue] = useState(170);
  const [dialARange, setDialARange] = useState<[number, number]>([100, 200]);
  return (
    <div className=" w-full flex-1 flex flex-col ">
      <div className=" flex flex-row items-center justify-between">
        <TextGenerateEffect
          fontSize={36}
          words="SafeBake - Your Smart Baking Companion"
          className="font-normal"
        />
        <span className="   font-normal opacity-70">Currently: 79 °F</span>
      </div>
      <div className=" flex-1 w-full  flex flex-row items-center justify-between">
        <OvenDialProp
          setCurrentValue={setDialAValue}
          currentValue={dialAValue}
          range={dialARange}
          valueLabel={`${dialAValue} °F`}
          size={250}
        />
        <div>
          <div
            className=" flex flex-row items-center gap-2 text-sm select-none
          "
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            />
            Locked
          </div>
        </div>
        <OvenDialProp size={250} setCurrentValue={() => {}} direction="right" />
      </div>
      <div>FOOTER</div>
    </div>
  );
}

export default HomePage;
