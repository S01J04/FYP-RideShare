import { Server as socketIo } from "socket.io";  
import userModel from "../models/user.model.js";

let io
export const setupSocketHandlers = (server) => {  
  io = new socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.log("User connected:", socket.id);

    // Listen for a 'register_user' event to link the socket to a user
    socket.on("register_user", async (data) => {
      const { userId } = data;

      if (!userId) {
        console.error("User ID not provided!");
        return;
      }

      try {
        // Update user's socketId in the database
        const updatedUser = await userModel.findByIdAndUpdate(
          userId,
          { socketId: socket.id },
          { new: true }
        );

        if (updatedUser) {
          console.log(`Updated socket ID for user: ${userId}`);
        } else {
          console.error(`User not found for ID: ${userId}`);
        }
      } catch (error) {
        console.error("Error updating user socket ID:", error.message);
      }
    });

    // Handle disconnection
    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.id);

      try {
        // Optionally, remove the socketId from the database on disconnection
        await userModel.findOneAndUpdate(
          { socketId: socket.id },
          { $unset: { socketId: "" } }
        );
      } catch (error) {
        console.error("Error removing socket ID on disconnect:", error.message);
      }
    });

    // Other event handlers (e.g., chat, live location, etc.)
    socket.on("join_room", (chatRoomId) => {
      socket.join(chatRoomId);
    });

    socket.on("leave_room", (chatRoomId) => {
      socket.leave(chatRoomId);
    });

    socket.on("update_location", (data) => {
      const { rideId, location } = data;
      io.to(rideId).emit("location_updated", {
        rideId,
        location,
      });
    });
  });
};
export const sendMessageToSocketId = (socketId, messageObject) => {

  console.log(messageObject);
  
      if (io) {
          io.to(socketId).emit(messageObject.event, messageObject.data);
      } else {
          console.log('Socket.io not initialized.');
      }
  }
  
  
