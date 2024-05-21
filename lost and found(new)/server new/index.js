const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const LostItem = require("./src/entities/LostItem");
const User = require("./src/entities/User");
const Message = require("./src/entities/Message");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://Wania12:wania123@cluster0.1wwhlem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Define routes after database connection is established
    app.post("/api/login", async (req, res) => {
      const { username, password } = req.body;
      try {
        // Check if the user exists in the database
        const user = await User.findOne({ username, password });
        if (!user) {
          return res
            .status(404)
            .json({ message: "Invalid username or password" });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Fetch all lost items
    app.get("/api/lostItems", async (req, res) => {
      try {
        const lostItems = await LostItem.find().populate("userId");
        res.json(lostItems);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Add a new lost item
    app.post("/api/lostItems", async (req, res) => {
      const lostItem = new LostItem(req.body);
      try {
        const newLostItem = await lostItem.save();
        res.status(201).json(newLostItem);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    // Fetch a specific lost item by ID
    app.get("/api/lostItems/:id", async (req, res) => {
      try {
        const lostItem = await LostItem.findById(req.params.id);
        if (!lostItem) {
          return res.status(404).json({ message: "Lost item not found" });
        }
        res.json(lostItem);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Update a specific lost item by ID
    app.patch("/api/lostItems/:id", async (req, res) => {
      try {
        const updatedLostItem = await LostItem.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!updatedLostItem) {
          return res.status(404).json({ message: "Lost item not found" });
        }
        res.json(updatedLostItem);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    // Delete a specific lost item by ID
    app.delete("/api/lostItems/:id", async (req, res) => {
      try {
        const deletedLostItem = await LostItem.findByIdAndDelete(req.params.id);
        if (!deletedLostItem) {
          return res.status(404).json({ message: "Lost item not found" });
        }
        res.json({ message: "Lost item deleted" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Fetch all users
    app.get("/api/users", async (req, res) => {
      try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Add a new user
    app.post("/api/users", async (req, res) => {
      const user = new User(req.body);
      try {
        const newUser = await user.save();
        res.status(201).json(newUser);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    // Fetch a specific user by ID
    app.get("/api/users/:id", async (req, res) => {
      try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Update a specific user by ID
    app.patch("/api/users/:id", async (req, res) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    // Delete a specific user by ID
    app.delete("/api/users/:id", async (req, res) => {
      try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.get("/api/search", async (req, res) => {
      const { itemName, category, location, date } = req.query;
      // Construct the query based on the provided parameters
      const query = {};
      if (itemName) query.itemName = { $regex: new RegExp(itemName, "i") };
      if (category) query.category = { $regex: new RegExp(category, "i") };
      if (location) query.location = { $regex: new RegExp(location, "i") };
      if (date) query.date = { $regex: new RegExp(date, "i") };
      try {
        // Find lost items that match the query
        const lostItems = await LostItem.find(query).populate("userId");
        res.json(lostItems);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.get("/api/userLostItems/:userId", async (req, res) => {
      const userId = req.params.userId;

      try {
        // Find all lost items associated with the provided user ID
        const lostItems = await LostItem.find({ userId });

        res.json(lostItems);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Fetch messages between the logged-in user and the specified userId
    app.get("/api/messages/:userId", async (req, res) => {
      const { userId } = req.params;
      const { currentUserId } = req.query; // Assume currentUserId is sent as a query parameter

      try {
        const messages = await Message.find({
          $or: [
            { from: userId, to: currentUserId },
            { from: currentUserId, to: userId },
          ],
        }).sort("createdAt");
        const populatedMessages = await Promise.all(
          messages.map(async (message) => {
            // Assuming you have a User model and can fetch user details based on user ID
            const fromUser = await User.findById(message.from);
            const toUser = await User.findById(message.to);

            // Replace user IDs with usernames in message object
            return {
              ...message.toObject(), // Convert Mongoose document to plain JavaScript object
              from: fromUser.username, // Assuming 'username' is the field containing the username
              to: toUser.username,
            };
          })
        );

        res.json(populatedMessages);
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
    });

    // Send a new message
    app.post("/api/sendmessage", async (req, res) => {
      const { userId, message, currentUserId } = req.body; // Assume currentUserId is sent in the body

      try {
        const newMessage = new Message({
          from: currentUserId,
          to: userId,
          text: message,
          createdAt: new Date(),
        });
        await newMessage.save();
        res.json(newMessage);
      } catch (error) {
        res.status(500).json(error.message);
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
