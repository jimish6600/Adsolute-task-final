const Event = require('../models/Event');

const createEvent = async (req, res) => {
  const {
    title,
    description,
    location,
    date,
    time,
    category,
    ticketsAvailable,
    price,
  } = req.body;

  try {
    const event = new Event({
      title,
      description,
      location,
      date,
      time,
      category,
      ticketsAvailable,
      price,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: "Error creating event", error });
  }
};

const searchevent = async (req, res) => {
  const { title, minPrice, date, time } = req.query;

  let query = {};
  if (title) {
    query.title = new RegExp(title, "i");
  }
  if (minPrice) {
    query.price = { $gte: minPrice };
  }
  if (date) {
    query.date = { $gte: new Date(date) };
  }
  if (time) {
    query.time = time;
  }
  console.log("jim");
  try {
    const events = await Event.find(query);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error searching events", error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

module.exports = { createEvent, searchevent, deleteEvent };
