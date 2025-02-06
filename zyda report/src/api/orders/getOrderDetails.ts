const createPayload = (orderId: number) => {
  return {
    operationName: "OrderDetails",
    variables: {
      storeId: "4771",
      orderId: orderId,
    },
    query:
      "query OrderDetails($storeId: String!, $orderId: Int!) {\n  order(restaurantId: $storeId, id: $orderId) {\n    id\n    customerName\n    number\n    status\n    createdAt\n    deliveryStatus\n    submittedAt\n    driverId\n    updatingStatus {\n      orderGettingUpdated\n      nextStatus\n      __typename\n    }\n    deliveryType\n    paymentStatus\n    cancellationReason\n    voucherDiscountedItems {\n      menuItemId\n      titleEn\n      titleAr\n      totalPriceBeforeVoucher\n      voucherDiscount\n      totalPriceAfterVoucher\n      __typename\n    }\n    otherReason\n    beachUmbrella {\n      number\n      specialDirections\n      __typename\n    }\n    discountedAmount\n    paidByWallet\n    typeOfRefund\n    paidByCreditCard\n    refundedAmount\n    compensation {\n      percentage\n      amount\n      __typename\n    }\n    totalRefund\n    verdFees\n    engageFees\n    feastFees\n    branchId\n    branchData {\n      titleAr\n      titleEn\n      lat\n      lng\n      externalId\n      id\n      __typename\n    }\n    isScheduled\n    firingTime\n    timeSlot\n    expectedAt\n    orderItems {\n      id\n      menuItem {\n        id\n        titleEn\n        titleAr\n        photoUrl\n        variantPhotoUrl\n        variantsTitleAr\n        variantsTitleEn\n        maxPrepTime\n        __typename\n      }\n      imageUrl\n      notes\n      orderId\n      properties {\n        id\n        titleAr\n        titleEn\n        propertyValues {\n          id\n          titleAr\n          titleEn\n          price\n          quantity\n          isFree\n          __typename\n        }\n        __typename\n      }\n      quantity\n      totalAdditionalCharge\n      totalPrice\n      unitPrice\n      variant {\n        titleAr\n        titleEn\n        prepTime\n        price\n        discountedPrice\n        barCode\n        externalId\n        __typename\n      }\n      __typename\n    }\n    deliveryZone {\n      zoneName\n      __typename\n    }\n    userData {\n      address {\n        area {\n          titleAr\n          titleEn\n          lat\n          lng\n          cityTitleEn\n          cityTitleAr\n          __typename\n        }\n        building\n        street\n        floor\n        title\n        block\n        avenue\n        unitNo\n        unitType\n        notes\n        lat\n        lng\n        cityName\n        areaName\n        __typename\n      }\n      car {\n        make\n        model\n        color\n        licenseNumber\n        __typename\n      }\n      phoneNumber\n      email\n      name\n      recipient {\n        name\n        phoneNumber\n        giftNotes\n        __typename\n      }\n      __typename\n    }\n    stateHistories {\n      state\n      createdAt\n      userType\n      entityType\n      assignee\n      assigneeAr\n      actionBy\n      partnerError\n      __typename\n    }\n    total\n    deliveryFee\n    subtotal\n    subtotalAfterVoucher\n    tax\n    taxPercentage\n    taxInclusive\n    voucherAmount\n    voucherCode\n    paidThrough\n    refundTransactionsHistory {\n      refundId\n      updatedAt\n      status\n      __typename\n    }\n    deliveryCourierId\n    deliveryCourierName\n    deliveryCourier {\n      id\n      driverName\n      hasDriverInfo\n      driverPhoneNumber\n      driverAssigned\n      deliveryOrderStatus\n      isInternalDelivery\n      supportCancellation\n      courierId\n      courierDetails {\n        id\n        name\n        nameAr\n        country\n        description\n        supportNumber\n        businessId\n        businessName\n        displayNameAr\n        displayNameEn\n        __typename\n      }\n      driverMaxCapacity\n      trackingLink\n      referenceId\n      externalOrderIdentifierLink\n      externalOrderIdentifierType\n      __typename\n    }\n    paymentTransaction {\n      id\n      status\n      chargeId\n      paymentDate\n      __typename\n    }\n    deliveryTime\n    gift\n    inBetweenTransitions\n    partnerErrors\n    cashbackAmount\n    restaurantRiderBranchOrderData {\n      status\n      restaurantRider {\n        id\n        name\n        phoneNumber\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}",
  };
};

export type ResponseType = {
  data: Data;
};

type Data = {
  order: Order;
};

type Order = {
  id: number;
  customerName: string;
  number: string;
  status: string;
  createdAt: string;
  deliveryStatus: null;
  submittedAt: string;
  driverId: null;
  updatingStatus: UpdatingStatus;
  deliveryType: string;
  paymentStatus: string;
  cancellationReason: null;
  voucherDiscountedItems: null;
  otherReason: null;
  beachUmbrella: null;
  discountedAmount: number;
  paidByWallet: number;
  typeOfRefund: null;
  paidByCreditCard: number;
  refundedAmount: number;
  compensation: null;
  totalRefund: number;
  verdFees: number;
  engageFees: number;
  feastFees: number;
  branchId: number;
  branchData: BranchData;
  isScheduled: boolean;
  firingTime: string;
  timeSlot: string;
  expectedAt: string;
  orderItems: OrderItem[];
  deliveryZone: DeliveryZone;
  userData: UserData;
  stateHistories: StateHistory[];
  total: number;
  deliveryFee: number;
  subtotal: number;
  subtotalAfterVoucher: number;
  tax: number;
  taxPercentage: number;
  taxInclusive: boolean;
  voucherAmount: number;
  voucherCode: null;
  paidThrough: string;
  refundTransactionsHistory: null[];
  deliveryCourierId: null;
  deliveryCourierName: string;
  deliveryCourier: null;
  paymentTransaction: null;
  deliveryTime: number;
  gift: null;
  inBetweenTransitions: null;
  partnerErrors: null;
  cashbackAmount: null;
  restaurantRiderBranchOrderData: null;
  __typename: string;
};

type UpdatingStatus = {
  orderGettingUpdated: boolean;
  nextStatus: null;
  __typename: string;
};

type BranchData = {
  titleAr: string;
  titleEn: string;
  lat: number;
  lng: number;
  externalId: null;
  id: string;
  __typename: string;
};

type OrderItem = {
  id: string;
  menuItem: MenuItem;
  imageUrl: string;
  notes: string;
  orderId: number;
  properties: Property[];
  quantity: number;
  totalAdditionalCharge: number;
  totalPrice: number;
  unitPrice: number;
  variant: Variant;
  __typename: string;
};

type MenuItem = {
  id: string;
  titleEn: string;
  titleAr: string;
  photoUrl: null;
  variantPhotoUrl: string;
  variantsTitleAr: string;
  variantsTitleEn: string;
  maxPrepTime: number;
  __typename: string;
};

type Property = {
  id: string;
  titleAr: string;
  titleEn: string;
  propertyValues: PropertyValue[];
  __typename: string;
};

type PropertyValue = {
  id: string;
  titleAr: string;
  titleEn: string;
  price: number;
  quantity: number;
  isFree: boolean;
  __typename: string;
};

type Variant = {
  titleAr: string;
  titleEn: string;
  prepTime: number;
  price: number;
  discountedPrice: null;
  barCode: null;
  externalId: string;
  __typename: string;
};

type DeliveryZone = {
  zoneName: string;
  __typename: string;
};

type UserData = {
  address: Address | null;
  car: null;
  phoneNumber: string;
  email: string;
  name: string;
  recipient: null | {
    name: string;
    phoneNumber: string;
    giftNotes: string;
    __typename: string;
  };
  __typename: string;
};

type Address = {
  area: null;
  building: string;
  street: string;
  floor: string;
  title: null;
  block: string;
  avenue: null;
  unitNo: string;
  unitType: string;
  notes: null;
  lat: string;
  lng: string;
  cityName: string;
  areaName: string;
  __typename: string;
};

type StateHistory = {
  state: string;
  createdAt: string;
  userType: string;
  entityType: string;
  assignee: null;
  assigneeAr: null;
  actionBy: string;
  partnerError: null;
  __typename: string;
};

export const exec = (zydaCookie: string, orderId: number) => {
  return fetch("https://graphql-dash-wrapper.stellate.sh/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + zydaCookie,
    },
    body: JSON.stringify(createPayload(orderId)),
  });
};
