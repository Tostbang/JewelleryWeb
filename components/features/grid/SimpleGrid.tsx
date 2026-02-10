import { IconType } from "@/lib/types";
import { Calendar01, Cloud, Dollar02, Moon02, Tick02, Watch01 } from "asem-icons";

export const SimpleGrid = () => (
  <div className="relative z-10 bg-white grid grid-cols-2 gap-9 px-3 md:grid-cols-3 md:gap-12 md:px-6">
    <Item
      Icon={Calendar01}
      title="Clear your calendar"
      subtitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, dolorem."
    />
    <Item
      Icon={Watch01}
      title="Save tens of hours"
      subtitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, dolorem."
    />
    <Item
      Icon={Moon02}
      title="Rest easy"
      subtitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, dolorem."
    />
    <Item
      Icon={Dollar02}
      title="Save thousands"
      subtitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, dolorem."
    />
    <Item
      Icon={Cloud}
      title="Simple hosting"
      subtitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, dolorem."
    />
    <Item
      Icon={Tick02}
      title="Everything you need"
      subtitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, dolorem."
    />
  </div>
);

const Item = ({
  Icon,
  title,
  subtitle,
}: {
  Icon: IconType;
  title: string;
  subtitle: string;
}) => {
  return (
    <div>
      <h4 className="mb-1.5 flex items-start text-lg font-medium md:text-xl">
        <Icon className="mr-1.5 size-8 text-black" />
        {title}
      </h4>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 md:text-base">{subtitle}</p>
    </div>
  );
};
