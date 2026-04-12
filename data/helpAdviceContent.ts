export type HelpAdviceItem = {
  title: string;
  body: string;
};

export const helpAdviceItems: HelpAdviceItem[] = [
  {
    title: "Pressure",
    body: "Has your boiler got enough pressure? When was the last time you checked your pressure gauge? Is at the required measurement? A lot of modern boilers are sealed systems and they need regular topping up. Your pressure gauge should indicate that the bar is between levels 1 and 2. You can add more pressure via your filling loop. Check boiler manufacturers instructions for advice on how to do so.",
  },
  {
    title: "Controls",
    body: "A lot of problems with boilers can be due to the controls. The controls can be confusing, so if you have got an instruction manual then please consult your guide on how to appropriately handle any configuration on your boiler. If you have misplaced, lost or simply cannot find your instruction manual, you can simply visit your boiler manufacturer website, just go online and you will be able to download a new updated copy of your manual. Always make sure your dial is switched on and the temperature of the room is appropriately set.",
  },
  {
    title: "Noise",
    body: "Is your boiler making unusual noises, noises which you would not usually associate with it working efficiently? Banging, loud pressurised noises or even hissing noises can be an indication of something that could be at fault. A lot of the time noises in the boiler are down to poor pump circulation or a blockage somewhere in the system. Also if there is no further pressure in the system, and your gauge is not level at the correct measurement then that also could be an indication. Check your pressure, check your vent and cover most parts of the system to check for a leak or pressure escaping. Always check manufacturers instructions before investigating, or if unsure please do not hesitate to ask for advice from a qualified technician.",
  },
  {
    title: "Power",
    body: "Is the power turned on to the boiler? Check your temperature gauge. If your radiators are not hot enough, then check boiler temperature settings and indicate whether or not the controls are set to the increased requirement you need for the temperature to rise. Turn up your thermostat on the radiator and re-check the system to see if this adjustment has altered the temperature.",
  },
  {
    title: "Cold Radiator",
    body: "Cold radiators or cold laches along your radiators are normally due to air in the system or a blockage building up inside the radiators. Vent your system and check the pressure. If cold patches are still there and there is no considerable change thereafter then the system would need to be cleaned.",
  },
];
