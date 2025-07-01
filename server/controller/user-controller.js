import User from "../modal/User.js";

export const addUser = async (request, response) => {
  try {
    const { sub, name } = request.body;

    if (!sub || !name) {
      return response.status(400).json({ message: "Missing sub or name" });
    }

    let exist = await User.findOne({ sub });

    if (exist) {
      return response.status(200).json("User already exists");
    }

    const newUser = new User(request.body);
    await newUser.save();
    return response.status(200).json(newUser);
  } catch (error) {
    console.error("Error in addUser:", error);
    return response
      .status(500)
      .json({ message: "Internal Server Error", error });
  }
};

export const getUser = async (request, response) => {
  try {
    const users = await User.find({});
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ message: "Error fetching users", error });
  }
};
