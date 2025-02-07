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

const Z_LIST = [
  ["5th Settelment", "Tagammoa"],
  ["5th Settlement", "Tagammoa"],
  ["Tagammoa 5", "Tagammoa"],
  ["Tagammoa5", "Tagammoa"],
  ["Tagammoa 3", "Tagammoa"],
  ["El Rehab City", "Rehab"],
  ["Tagammoa 1", "Tagammoa"],
  ["Tagamm", "Tagammoa"],
  ["Nasr City", "Nasr City"],
  ["Pickup", "Pickup"],
  ["Zamalek", "Dokki"],
  ["Dokki", "Dokki"],
  ["Maadi Old", "Maadi-Mokkatam"],
  ["Madinaty", "October"],
  ["El Sheikh Zayed", "October"],
  ["Zahraa El Maadi", "Maadi-Mokkatam"],
  ["6th of October", "October"],
  ["Masaken Sheraton", "Sheraton"],
  ["New Maadi", "Maadi-Mokkatam"],
  ["Heliopolis", "Nasr City"],
  ["El Shorouk", "Obour-Sherouk"],
  ["Mohandeseen", "Mohandeseen"],
  ["Mohandesen", "Mohandeseen"],
  ["Mokattam", "Maadi-Mokkatam"],
  ["El Obour", "Obour-Sherouk"],
  ["Hadayeq El Maadi", "Maadi-Mokkatam"],
  ["Zahraa Nasr City ", "Nasr City"],
  ["Taj City New Cairo", "Nasr City"],
];

type OrderData = { revenue: number; totalOrders: number };

type ZoneData = Record<string, OrderData>;

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [start, end] = formatToIso(getDateFromOneWeekEarlierToDate(date!));
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ordersData, setOrdersData] = useState<OrderData>({
    revenue: 0,
    totalOrders: 0,
  });
  const [zonesData, setZonesData] = useState<ZoneData>({});
  useEffect(() => {
    getToken().then((t) => setToken(t));
  }, []);
  const getZonesDataList = () => {
    const zoneFomrat: { [k: string]: OrderData } = {};
    for (const key in zonesData) {
      let name = key;
      const mergedName = Z_LIST.find((zone) =>
        key.toLowerCase().includes(zone[0].toLowerCase())
      );
      if (mergedName) name = mergedName[1];
      if (zoneFomrat[name]) {
        zoneFomrat[name] = {
          revenue: zoneFomrat[name].revenue + zonesData[key].revenue,
          totalOrders:
            zoneFomrat[name].totalOrders + zonesData[key].totalOrders,
        };
      } else {
        zoneFomrat[name] = {
          revenue: zonesData[key].revenue,
          totalOrders: zonesData[key].totalOrders,
        };
      }
    }
    const zoneFinal: (OrderData & { zoneName: string })[] = [];
    for (const k in zoneFomrat) {
      zoneFinal.push({ zoneName: k, ...zoneFomrat[k] });
    }
    return zoneFinal;
  };
  if (!token) return <p className=" ">Loading...</p>;
  return (
    <div className="m-10 flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="flex flex-col w-1/4 justify-center gap-4">
          <DatePickerDemo date={date} setDate={setDate} />
          <Button
            disabled={isLoading}
            onClick={() => {
              setOrdersData({
                revenue: 0,
                totalOrders: 0,
              });
              setZonesData(() => ({}));
              setIsLoading(true);
              getData(token, start, end)
                .then((data) => {
                  setOrdersData({
                    revenue: data.reduce((acc, order) => acc + order.total, 0),
                    totalOrders: data.length,
                  });
                  data.forEach((o) => {
                    const order = structuredClone(o);
                    if (!order.deliveryZone) {
                      order.deliveryZone = {
                        __typename: "Pickup",
                        zoneName: "Pickup",
                      };
                    }

                    if (zonesData[order.deliveryZone.zoneName]) {
                      const zone = zonesData[order.deliveryZone.zoneName];
                      setZonesData((prev) => ({
                        ...prev,
                        [order.deliveryZone!.zoneName]: {
                          revenue: zone.revenue + order.total,
                          totalOrders: zone.totalOrders + 1,
                        },
                      }));
                    } else {
                      setZonesData((prev) => ({
                        ...prev,
                        [order.deliveryZone!.zoneName]: {
                          revenue: order.total,
                          totalOrders: 1,
                        },
                      }));
                    }
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
          <p>AOV: {ordersData.revenue / ordersData.totalOrders}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {getZonesDataList().map((zone) => (
          <div key={zone.zoneName + zone.revenue + zone.totalOrders}>
            <p className=" font-bold">{zone.zoneName}</p>
            <p>Total Orders: {zone.totalOrders}</p>
            <p>Total Revenue: {zone.revenue}</p>
            <p>AOV: {zone.revenue / zone.totalOrders}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
