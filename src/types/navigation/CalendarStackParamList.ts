export type CalendarStackParamList = {
  Calendar: undefined;
  CallOotd: { date: string };
  LoadOotd: {
    onSelectOotd: (image: any) => void;
  };
  OotdCreate: undefined;
};
