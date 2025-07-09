import * as service from './service.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ status: "Error", message: "Username and password are required" });
  }

  try {
    const user = await service.login(username, password);
    res.send({ status: "OK", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", message: error.message });
  }
}

export const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ status: "Error", message: "Username and password are required" });
  }

  try {
    const newUser = await service.register(username, password);
    res.send({ status: "OK", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", message: error.message });
  }
}

export const getUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).send({ status: "Error", message: "User ID is required" });
  }

  try {
    const user = await service.getUser(userId);
    if (!user) {
      return res.status(404).send({ status: "Error", message: "User not found" });
    }
    res.send({ status: "OK", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", message: error.message });
  }
}

