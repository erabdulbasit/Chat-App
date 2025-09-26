import messageModel from "../model/messageModel.js";

const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ message: "message saved.....", data });
    }
    return res.json({ message: "message not saved ", data });
  } catch (error) {
    console.log("some error in saving message to database,");
  }
};

const getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    next(error);
  }
};

export { addMessage, getAllMessages };
