const User = require("../models/userModel");
const Messages = require("../models/msgModel");
const bcrypt = require("bcryptjs");

// register
module.exports.register = async (req, res, next) => {
   try {
      const { username, email, password } = req.body;

      const emailCheck = await User.findOne({ email });
      if (emailCheck) {
         return res.json({ message: "Email already used", status: false });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
         email,
         username,
         password: hashedPassword,
      });
      await user.save();
      delete user.password;
      return res.json({
         user,
         status: true,
      });
   } catch (ex) {
      next(ex);
   }
};

// login
module.exports.login = async (req, res, next) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
         return res.json({
            message: "Incorrect Username or Password",
            status: false,
         });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      // if (user.password !== password) {
      //    return res.json({
      //       message: "Incorrect Username or Password",
      //       status: false,
      //    });
      // }
      if (!isPasswordValid) {
         return res.json({
            message: "Incorrect Username or Password",
            status: false,
         });
      }
      delete user.password;
      return res.json({ status: true, user });
   } catch (ex) {
      next(ex);
   }
};

// allUsers
module.exports.allUsers = async (req, res, next) => {
   try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      const userss = await User.find({ _id: { $ne: req.params.id } }).select([
         "_id",
         "email",
         "username",
         // "createdAt",
         // "updatedAt",
      ]);

      const messages = await Messages.find({
         users: {
            $in: req.params.id,
         },
      });

      // const Users = [];
      // userss.forEach((user) => {
      //    const index = messages.findIndex(item => item.users[0] === user._id.toString() || item.users[1] === user._id.toString())
      //    console.log(index);

         // if(index > -1) {

         //    const Max = messages.map((item, i) => {
         //       if(index === i) {
         //          return {
         //             ...user, 
         //             lastTime: item.createdAt.toString().substring(16, 21),
         //             lastMessage: item.message.text,
         //          };
         //       }

         //       return user
         //    })
         // }

      //       const lastMessage = messages?.filter((item) => item.users[0] === user._id.toString() || item.users[1] === user._id.toString())
      //       console.log(lastMessage);
      //       const recent = lastMessage.map((item) => {
               
      //          if(index === -1) {
      //             return {
      //                _id: user._id
      //             }
      //          }
      //          return {
      //             _id: user._id,
      //             email: user.email,
      //             username: user.username,
      //             lastTime: item?.createdAt.toString().substring(16, 21),
      //             lastMessage: item?.message.text,
      //          };
      //       });

      //       Users.push(recent.pop());

      // });

      const Users = userss.map(user => {
         const lastMessage = messages.filter((item) => item.users[0] === user._id.toString() || item.users[1] === user._id.toString()).pop()
      
         if(!lastMessage) {
            return {
               ...user._doc
            }
         }

         return {
            ...user._doc,
            lastTime: lastMessage?.createdAt.toString().substring(16, 21),
            lastMessage: lastMessage?.message.text,
         }
      })

      return res.json(Users);
   } catch (ex) {
      next(ex);
   }
};

// logOut
module.exports.logOut = (req, res, next) => {
   try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
   } catch (ex) {
      next(ex);
   }
};
