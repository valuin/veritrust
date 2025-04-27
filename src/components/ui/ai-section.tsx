export default function AiSection() {
  return (
    <section className="mt-16 text-center">
      <h2
        className="w-[1006px] mx-auto font-semibold text-5xl leading-[57.6px] font-['Geist',Helvetica] bg-gradient-to-r from-blue-600 via-neutral-800 to-blue-900 bg-clip-text text-transparent"
        style={{
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        Connect your data to
        <br />
        AI-Powered Assistance
      </h2>
      <div className="relative mt-16">
        <div className="relative w-full">
          {/* Background and Main Images */}
          <img
            className="w-[1352px] h-auto mx-auto"
            alt="Vector Background"
            src="/vector-16.svg"
          />
          <img
            className="absolute w-[1392px] h-auto top-[296px] left-[57px] object-cover"
            alt="Robot Hand"
            src="/robot-hand-background-presenting-technology-gesture-1.png"
          />

          {/* Decorative Vectors */}
          <img
            className="absolute w-[129px] h-32 top-[198px] left-[183px]"
            alt="Vector"
            src="/vector-1.svg"
          />
          <img
            className="absolute w-[145px] h-[145px] top-[512px] right-[300px]"
            alt="Vector"
            src="/vector-5.svg"
          />
          <img
            className="absolute w-[72px] h-[74px] top-[657px] left-[367px]"
            alt="Vector"
            src="/vector-6.svg"
          />

          {/* Ellipses */}
          <img
            className="absolute w-[381px] h-[381px] top-[310px] left-[502px]"
            alt="Ellipse"
            src="/ellipse-2357--stroke-.svg"
          />
          <img
            className="absolute w-[357px] h-[357px] top-[322px] left-[514px]"
            alt="Ellipse"
            src="/ellipse-2360--stroke-.svg"
          />
          <img
            className="absolute w-44 h-44 top-[412px] left-[604px]"
            alt="Ellipse"
            src="/ellipse-2360--stroke-.svg"
          />

          {/* Family Number Card */}
          <div className="absolute  border border-gray-200  px-4 w-[264px] h-[140px] top-[618px] left-[538px] rounded-[20px] backdrop-blur-[5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(5px)_brightness(100%)]">
            <h4 className="mt-5 font-semibold text-white text-base text-center tracking-[0.16px] leading-[25.6px] font-['Geist',Helvetica]">
              Number of Family
            </h4>
            <div className="flex justify-around mt-4 gap-2">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-[10px] bg-white flex items-center justify-center"
                >
                  <img
                    className="w-[41px] h-[41px]"
                    alt="Person Icon"
                    src="/fluent-person-12-filled.svg"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-[10px] bg-white flex items-center justify-center">
                <span className="font-bold text-black text-5xl tracking-[0.48px] leading-[76.8px] font-['Geist',Helvetica]">
                  +
                </span>
              </div>
            </div>
          </div>

          {/* Personal Identity Card */}
          <div className="absolute w-[191px]  border border-gray-200  h-[158px] top-[388px] left-[437px] rounded-[20px] backdrop-blur-[5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(5px)_brightness(100%)]">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-[49px] h-[49px]rounded-[10px] flex items-center justify-center">
                <img
                  className="w-[35px] h-[35px]"
                  alt="Identity Card"
                  src="/hugeicons-identity-card.svg"
                />
              </div>
              <h4 className="mt-6 font-semibold text-white text-base text-center tracking-[0.16px] leading-[25.6px]  font-['Geist',Helvetica]">
                Personal Identity
              </h4>
            </div>
          </div>

          {/* Monthly Income Card */}
          <div className="absolute w-54 h-40 top-[348px] left-[694px] rounded-[20px]">
            <div className="flex flex-col  border border-gray-200 rounded-xl items-center justify-center h-full  backdrop-blur-[5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(5px)_brightness(100%)]">
              <div className="w-[58px] h-[46px] rounded-[10px] flex items-center justify-center">
                <img
                  className="w-[31px] h-[31px]"
                  alt="Payments Icon"
                  src="/material-symbols-payments-outline.svg"
                />
              </div>
              <h4 className="mt-4 font-semibold text-white text-base tracking-[0] leading-[20.8px] font-['Poppins',Helvetica]">
                Monthly Income
              </h4>
            </div>
          </div>
        </div>
        <p className="mt-8 font-semibold text-black text-base tracking-[0] leading-[20.8px] font-['Poppins',Helvetica]">
          "You don't need to search, apply, or wait—our AI agent does it all for
          you."
        </p>
      </div>
    </section>
  );
}
