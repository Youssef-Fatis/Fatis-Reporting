const createPayload = (start: string, end: string, from: number) => {
  return {
    operationName: "Orders",
    variables: {
      status: null,
      paymentMethod: [],
      deliveryType: [],
      areas: [],
      deliveryZoneIn: [],
      driverId: "",
      storeId: "4771",
      branchId: "",
      submittedAt: [start, end],
      sort: {
        method: "desc",
        column: "created_at",
      },
      paginateFrom: from,
      statuses: [
        "submitted",
        "accepted",
        "ready",
        "dispatched",
        "delivered",
        "fulfilled",
      ],
    },
    query:
      "query Orders($storeId: String!, $status: OrderStatus, $paymentStatuses: [OrderPaymentStatus], $paymentMethod: [PaymentMethod], $deliveryType: [DeliveryType], $isManualOrder: Boolean, $areas: [String], $branchId: String!, $submittedAt: [String], $phone: String, $number: String, $sort: OrderSorter, $statuses: [OrderStatus], $voucherCode: String, $deliveryZoneIn: [String], $searchValue: String, $searchCustomers: String, $paginateFrom: Int, $driverId: String) {\n  orders(\n    restaurantId: $storeId\n    status: $status\n    statuses: $statuses\n    paymentStatuses: $paymentStatuses\n    paginateFrom: $paginateFrom\n    searchValue: $searchValue\n    searchCustomers: $searchCustomers\n    filters: {branch_id: $branchId, submitted_at: $submittedAt, phone_number: [$phone], number: [$number], payment_methods: $paymentMethod, delivery_type: $deliveryType, is_manual_order: $isManualOrder, areas: $areas, voucher_code: $voucherCode, delivery_zone_in: $deliveryZoneIn, driver_id: $driverId}\n    sorter: $sort\n  ) {\n    orders {\n      id\n      number\n      isScheduled\n      expectedAt\n      firingTime\n      deliveryStatus\n      isManualOrder\n      rating\n      deliveryVatInclusive\n      customerName\n      deliveryZone {\n        zoneName\n        __typename\n      }\n      areaNameEn\n      areaNameAr\n      customerPhoneNumber\n      updatingStatus {\n        orderGettingUpdated\n        nextStatus\n        __typename\n      }\n      timeSlot\n      deliveryType\n      deliveryTime\n      driverId\n      branchName\n      branchId\n      paidThrough\n      status\n      paymentStatus\n      total\n      createdAt\n      closedAt\n      deliveryRating\n      submittedAt\n      deliveryCourierId\n      deliveryCourierName\n      gift\n      inBetweenTransitions\n      partnerErrors\n      cashbackAmount\n      __typename\n    }\n    totalCount\n    pastOrdersCount\n    currentOrdersCount\n    statusCount {\n      ready\n      dispatched\n      canceled\n      accepted\n      submitted\n      delivered\n      fulfilled\n      all\n      paid\n      paymentFailed\n      paymentExpired\n      waitingForPayment\n      redirectUrl\n      iframeUrl\n      __typename\n    }\n    __typename\n  }\n}",
  };
};

export type ResponseType = {
  data: Data;
};

type Data = {
  orders: Orders;
};

type Orders = {
  orders: Order[];
  totalCount: number;
  pastOrdersCount: number;
  currentOrdersCount: number;
  statusCount: StatusCount;
  __typename: string;
};

type Order = {
  id: number;
  number: string;
  isScheduled: boolean;
  expectedAt: string;
  firingTime: string;
  deliveryStatus: string | null;
  isManualOrder: boolean;
  rating: string | null;
  deliveryVatInclusive: boolean;
  customerName: string;
  deliveryZone?: DeliveryZone | null;
  areaNameEn?: string | null;
  areaNameAr?: string | null;
  customerPhoneNumber: string;
  updatingStatus: UpdatingStatus;
  timeSlot: string;
  deliveryType: string;
  deliveryTime: number;
  driverId: string | null;
  branchName: string;
  branchId: number;
  paidThrough: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  closedAt: string | null;
  deliveryRating: string | null;
  submittedAt: string;
  deliveryCourierId: string | null;
  deliveryCourierName?: string | null;
  gift: boolean;
  inBetweenTransitions: string | null;
  partnerErrors: string | null;
  cashbackAmount: string | null;
  __typename: string;
};

type DeliveryZone = {
  zoneName: string;
  __typename: string;
};

type UpdatingStatus = {
  orderGettingUpdated: boolean;
  nextStatus: string | null;
  __typename: string;
};

type StatusCount = {
  ready: number;
  dispatched: number;
  canceled: number;
  accepted: number;
  submitted: number;
  delivered: number;
  fulfilled: number;
  all: number;
  paid: number;
  paymentFailed: number;
  paymentExpired: number;
  waitingForPayment: number;
  redirectUrl: number;
  iframeUrl: string | null;
  __typename: string;
};

export const exec = (
  zydaCookie: string,
  start: string,
  end: string,
  from: number = 0
) => {
  return fetch("https://graphql-dash-wrapper.stellate.sh/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + zydaCookie,
    },
    body: JSON.stringify(createPayload(start, end, from)),
  });
};
