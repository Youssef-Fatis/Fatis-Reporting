import { useEffect, useState } from "react";
import { signIn } from "./api";
import { getOrders } from "./api/orders";
import {
  batchRequestHandler,
  createIncrementIterator,
} from "./utils/BatchHandler";
import { Button } from "./components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const getToken = async () => {
  const body: signIn.PayloadType = {
    email: "core@fatis-eg.com",
    password: "d6121835b31994b1",
  };
  const response = await signIn.exec(body);
  const responseBody: signIn.ResponseType = await response.json();
  const token = responseBody.data.signIn.accessToken;
  return token;
};

const getData = async (token: string, start: string, end: string) => {
  const batch = await batchRequestHandler<number, getOrders.ResponseType>(
    5,
    createIncrementIterator(100, 0),
    async (param) => {
      const response = await getOrders.exec(token, start, end, param);
      return await response.json();
    },
    (response) =>
      response.data === null || response.data.orders.orders.length === 0
  );
  const result = batch
    .map((response) => response.data.orders.orders)
    .flat()
    .filter(
      (order) =>
        new Date(order.expectedAt).toDateString() ===
        new Date(end).toDateString()
    );
  return result;
};

function getDateFromOneWeekEarlierToDate(date: Date): [Date, Date] {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get the current date in the user's timezone
  const target_date = new Date(date.toLocaleString("en-US", { timeZone }));

  // Calculate the start of the day
  const startOfDay = new Date(
    target_date.getFullYear(),
    target_date.getMonth(),
    target_date.getDate(),
    0,
    0,
    0,
    0
  );

  startOfDay.setDate(startOfDay.getDate() - 8);

  // Calculate the end of the day
  const endOfDay = new Date(
    target_date.getFullYear(),
    target_date.getMonth(),
    target_date.getDate(),
    23,
    59,
    59,
    999
  );
  // Convert to ISO strings
  return [startOfDay, endOfDay];
}

const formatToIso = ([start, end]: [Date, Date]) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const startIso = new Date(
    start.toLocaleString("en-US", { timeZone })
  ).toISOString();
  const endIso = new Date(
    end.toLocaleString("en-US", { timeZone })
  ).toISOString();
  return [startIso, endIso];
};

function DatePickerDemo({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [start, end] = formatToIso(getDateFromOneWeekEarlierToDate(date!));
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ordersData, setOrdersData] = useState<{
    totalOrders: number;
    aov: number;
    revenue: number;
  }>({ aov: 0, revenue: 0, totalOrders: 0 });
  useEffect(() => {
    getToken().then((t) => setToken(t));
  }, []);

  if (!token) return <p className=" ">Loading...</p>;
  return (
    <div className="flex gap-8  m-10">
      <div className="flex flex-col w-1/4 justify-center gap-4">
        <DatePickerDemo date={date} setDate={setDate} />
        <Button
          disabled={isLoading}
          onClick={() => {
            setOrdersData({
              aov: 0,
              revenue: 0,
              totalOrders: 0,
            });
            setIsLoading(true);
            getData(token, start, end)
              .then((data) => {
                setOrdersData({
                  aov:
                    data.reduce((acc, order) => acc + order.total, 0) /
                    data.length,
                  revenue: data.reduce((acc, order) => acc + order.total, 0),
                  totalOrders: data.length,
                });
              })
              .finally(() => setIsLoading(false));
          }}
        >
          Get Orders Data
        </Button>
      </div>
      <div>
        <p>Total Orders: {ordersData.totalOrders}</p>
        <p>Total Revenue: {ordersData.revenue}</p>
        <p>AOV: {ordersData.aov}</p>
      </div>
    </div>
  );
}

export default App;
