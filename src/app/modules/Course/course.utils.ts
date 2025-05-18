import { Branch } from "../Branch/branch.model";
import { DeliveryMan } from "../Delivery Man/deliveryMan.model";
import { Merchant } from "../Merchant/Merchant.model";

type TPayload<T> = {
  title: string;
  statusDetails?: T;
  user: {
    name: string;
    email: string;
    phone: string;
  };
};

// Declare T as a generic for the function
export const generateStatus = async <T extends Record<string, unknown>>(
  payload: TPayload<T>
) => {
  if (payload.title == "Parcel Create") {
    return {
      title: payload?.title,
      ...payload.user,
      date: Date.now(),
    };
  } else if (payload.title == "Pickup Assigned") {
    const pickupMan = await DeliveryMan.findOne({
      email: payload.statusDetails?.pickupMan,
    });
    return {
      title: payload?.title,
      pickupMan: pickupMan?.name,
      pickupManPhone: pickupMan?.phone,
      pickupManEmail: pickupMan?.email,
      note: payload.statusDetails?.note,
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  } else if (payload.title == "Pickup Re-Schedule") {
    const pickupMan = await DeliveryMan.findOne({
      email: payload.statusDetails?.pickupMan,
    });
    return {
      title: payload?.title,
      pickupMan: pickupMan?.name,
      pickupManPhone: pickupMan?.phone,
      pickupManEmail: pickupMan?.email,
      note: payload.statusDetails?.note,
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  } else if (payload.title == "Received By Pickup Man") {
    const pickupMan = await DeliveryMan.findOne({
      email: payload.statusDetails?.pickupMan,
    });
    return {
      title: payload?.title,
      pickupMan: pickupMan?.name,
      pickupManPhone: pickupMan?.phone,
      pickupManEmail: pickupMan?.email,
      note: payload.statusDetails?.note,
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  } else if (payload.title == "Received By Hub") {
    return {
      title: payload?.title,
      current: "true",
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  } else if (payload.title == "Delivery Man Assigned") {
    const deliveryMan = await DeliveryMan.findOne({
      email: payload.statusDetails?.deliveryMan,
    });

    return {
      title: payload?.title,
      deliveryMan: deliveryMan?.name,
      deliveryManPhone: deliveryMan?.phone,
      deliveryManEmail: deliveryMan?.email,
      note: payload.statusDetails?.note,
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  } else if (payload.title == "Received Warehouse") {
    const Hub = await Branch.findOne({ name: payload.statusDetails?.branch });

    return {
      title: payload?.title,

      hubName: Hub?.name,
      mobile: Hub?.phone,
      address: Hub?.address,
      note: payload.statusDetails?.note,
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  } else if (payload.title == "Transfer to hub") {
    const Hub = await Branch.findOne({ name: payload.statusDetails?.branch });

    return {
      title: payload?.title,
      hubName: Hub?.name,
      mobile: Hub?.phone,
      address: Hub?.address,
      note: payload.statusDetails?.note,
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  } else if (payload.title == "Received by hub") {
    const Hub = await Branch.findOne({ name: payload.statusDetails?.branch });

    return {
      title: payload?.title,
      hubName: Hub?.name,
      mobile: Hub?.phone,
      address: Hub?.address,
      note: payload.statusDetails?.note,
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  } else if (payload.title == "Return to Courier") {
    return {
      title: payload?.title,
      note: payload.statusDetails?.note,
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  } else if (payload.title == "Partial Delivered") {
    return {
      title: payload?.title,
      note: payload.statusDetails?.note,
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  } else if (payload.title == "Delivered") {
    return {
      title: payload?.title,
      note: payload.statusDetails?.note,
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  } else if (payload.title == "Return assigned to merchant") {
    const merchant = await Merchant.findOne({
      email: payload.statusDetails?.merchant,
    });

    return {
      title: payload?.title,
      deliveryMan: merchant?.name,
      deliveryManPhone: merchant?.phone,
      deliveryManEmail: merchant?.email,
      note: payload.statusDetails?.note,
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  } else if (payload.title == "Return received by merchant") {
    return {
      title: payload?.title,
      note: payload.statusDetails?.note,
      createdBy: {
        ...payload.user,
      },
      date: Date.now(),
    };
  }
};
