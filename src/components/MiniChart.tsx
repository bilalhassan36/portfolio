/**
 * @component MiniChart
 * @description A purely decorative micro-interaction component representing a bar chart.
 * It animates height and color based on the parent element's hover state (via group-hover).
 * @architecture Server Component
 * @dependencies None
 */

export const MiniChart = () => {
  // Configuration for the bar animations to reduce JSX repetition.
  // We stagger the delays to create a "wave" effect on hover.
  const bars = [
    { height: "h-[40%]", hoverHeight: "group-hover:h-[70%]", delay: "delay-0" },
    {
      height: "h-[60%]",
      hoverHeight: "group-hover:h-[90%]",
      delay: "delay-75",
    },
    {
      height: "h-[30%]",
      hoverHeight: "group-hover:h-[50%]",
      delay: "delay-100",
    },
    {
      height: "h-[80%]",
      hoverHeight: "group-hover:h-full",
      delay: "delay-150",
    },
  ];

  return (
    <div className="flex h-4 w-8 items-end gap-0.5 opacity-60 transition-opacity duration-500 group-hover:opacity-100 md:h-5 md:w-10 md:gap-0.75">
      {bars.map((bar, index) => (
        <div
          key={index}
          // Shared base styles + dynamic height/delay props
          className={`bg-brand/30 group-hover:bg-brand w-1 rounded-t-[1px] transition-all duration-500 ease-out md:w-1.5 ${bar.height} ${bar.hoverHeight} ${bar.delay}`}
        />
      ))}
    </div>
  );
};
