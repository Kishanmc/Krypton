const Simulation = require('../models/Simulation');

exports.getSimulations = async (req, res) => {
  const simulations = await Simulation.find();
  res.json(simulations);
};

exports.addSimulation = async (req, res) => {
  const { title, url } = req.body;
  const sim = new Simulation({ title, url });
  await sim.save();
  res.json(sim);
};

exports.updateSimulation = async (req, res) => {
  const { id } = req.params;
  const sim = await Simulation.findByIdAndUpdate(id, req.body, { new: true });
  res.json(sim);
};

exports.deleteSimulation = async (req, res) => {
  const { id } = req.params;
  await Simulation.findByIdAndDelete(id);
  res.json({ msg: 'Simulation deleted' });
};
