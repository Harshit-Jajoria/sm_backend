import User from '../models/User.js'; // user model

/* READ */

export const getUsers = async (req, res) => { 
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUser = async (req, res) => { 
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const updateLinks = async (req, res) => {
  const { id } = req.params;
  const {linkedIn,github} = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { linkedIn, github }, { new: true });
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(404).json(err);
  }
};
// export const updateLinks = async (req, res) => { // CHAT GPT
//   const { id } = req.params;
//   const { linkedIn, github } = req.body;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(id, { linkedIn, github }, { new: true });
//     console.log('PUT request -- updated user:', updatedUser);
//     return res.status(200).json(updatedUser);
//   } catch (err) {
//     console.error('PUT request -- error updating user:', err);
//     return res.status(500).json({ error: 'Error updating user' });
//   }
// };
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
