import { connectToDB } from "../admin/mongoose";
import User from "../models/model";

export const createOrUpdateUser = async (userData: {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePhoto: string;
  emailAddresses: string[];
}) => {
  try {
    await connectToDB();

    const emailAddresses = userData.emailAddresses.map((email) => {
      return { email };
    });

    const user = await User.findOneAndUpdate(
      { clerkId: userData.clerkId },
      {
        $set: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          profilePhoto: userData.profilePhoto,
          emailAddresses,
        },
      },
      { upsert: true, new: true }
    );

    await user.save();
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDB();
    await User.findOneAndDelete({ clerkId: id });
    return "User deleted successfully!";
  } catch (error) {
    console.error(error);
  }
};
