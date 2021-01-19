const defaultIfBlockProps = {
  selectedCondition: 0,
  data: [
    {
      label: "Nieuw conditioneel blok",
      conditions: [],
      children: [],
    },
  ],
};

const defaultIfBlockData = {
  label: "Nieuw conditioneel blok",
  conditions: [],
  children: [],
};

const defaultIfConditionData = {
  variable: "",
  condition: "==",
  value: "",
};

export {defaultIfBlockProps, defaultIfBlockData, defaultIfConditionData};
