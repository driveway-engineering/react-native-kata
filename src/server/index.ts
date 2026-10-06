import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.set("json spaces", 2);

type Service = {
  id: number;
  name: string;
  duration: number;
};

type Appointment = {
  id: string;
  serviceName: string;
  serviceId: number;
  start: string;
  duration: number;
  booked: boolean;
  email?: string;
  customerName?: string;
  modelYear?: string | number;
  make?: string;
  model?: string;
};

const services: Service[] = [
  { id: 1, name: "Synthetic Oil Change", duration: 1800 },
  { id: 2, name: "Brake Inspection", duration: 1800 },
  { id: 3, name: "Tire Rotation & Inspection", duration: 3600 },
  { id: 4, name: "Express Auto Detailing", duration: 5400 },
];

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * max) + min;
};

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const randomDate = () => {
  const start = new Date();
  const end = new Date(Date.now() + 12096e5);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

let appointments: Appointment[] = [];
services.forEach((service) => {
  for (let i = 0; i < getRandom(2, 4); ++i) {
    appointments.push({
      id: uuid(),
      serviceName: service.name,
      serviceId: service.id,
      start: randomDate().toISOString(),
      duration: service.duration,
      booked: false,
    });
  }
});

app.get("/services", (_req, res) => res.send(services));

app.get("/appointments", (_req, res) => res.send(appointments));

app.get("/appointments/:serviceId", (req, res) => {
  if (Math.random() < 0.2) {
    return res.status(500).send("Unable to load appointments. Please try again.");
  } else {
    const serviceId = parseInt(req.params.serviceId);
    if (serviceId) {
      res.send(
        appointments.filter(
          (appt) => appt.serviceId === serviceId && !appt.booked
        )
      );
    } else {
      res.status(400).send("invalid serviceId");
    }
  }
  res.end();
});

app.patch("/appointments/book/:id", (req, res) => {
  const { email, customerName, modelYear, make, model } = req.body;
  const appt = appointments.find((appt) => appt.id === req.params.id);

  if (!appt) {
    return res.status(400).send("Invalid appointment id");
  } else if (appt.booked) {
    return res.status(400).send("This appointment is already booked.");
  } else if (!email) {
    return res.status(400).send("invalid email address");
  } else if (!customerName) {
    return res.status(400).send("invalid customer name");
  } else if (!modelYear || !make || !model) {
    return res.status(400).send("invalid make/model/modelYear");
  } else {
    Object.assign(appt, {
      booked: true,
      email,
      customerName,
      make,
      model,
      modelYear,
    });
    res.send({
      id: appt.id,
      serviceName: appt.serviceName,
      start: appt.start,
      duration: appt.duration,
      booked: appt.booked,
      email: appt.email,
      customerName: appt.customerName,
      modelYear: appt.modelYear,
      make: appt.make,
      model: appt.model,
    });
  }
  res.end();
});

const port = Number(process.env.SERVERPORT || 2000);

app.listen(port, "0.0.0.0", () => {
  console.log(
    `Scheduling server listening on port ${process.env.SERVERPORT || 2000}...`
  );
});
