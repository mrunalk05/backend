const { Router } = require("express");
const jwt = require("jsonwebtoken");
const express = require("express");
//const router= express.Router();
//const router= require('express');
const bodyparser = require("body-parser");

//require('../db/conn');
//const idpass = require("../model/idpassSchema");

const app = express();
//const ap= router();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
//const { compare } = require("bcrypt");

const DB =
  "mongodb+srv://Mrunalk:Mrunalk@cluster0.4ewsu.mongodb.net/hackathon1?retryWrites=true&w=majority";
mongoose
  .connect(
    DB
    // {
    //   useNewUrlParser: true,
    //   //useCreateIndex:true,
    //   useUnifiedTopology: true,
    //   //useFindAndModify:false
    // }
  )
  .then((res) => {
    //console.log(res.models.user)
    console.log(`connection sucessfull`);
  })
  .catch((err) => console.log(`no connection`, err));

//Middleware

// const middleware= (req, res, next)=>{
//     console.log(`Hello my middleware`);
//     next();
// }

//routes

// const ciri= require('./ciriculum');
// const ciriyr = require('./ciriculum/year');
// const ciriyrbr= require('./ciriculum/year/branch');
// const nonciri= require('./nonciriculum');
// const nonciricl= require('./nonciriculum/clubs');
// const nonciriclacm= require('./nonciriculum/clubs/acm');
// const cafeteria= require('./cafeteria');

app.get("/", (req, res) => {
  res.send(`Home page!!`);
});

app.get("/signin", (req, res) => {
  //res.cookie("test", "123456");
  res.send(`Hello signin!!`);
});

app.get("/ciriculum", (req, res) => {
  res.send(`Ciriculum page`);
});
app.get("/ciriculum/year", (req, res) => {
  res.send(`Hello World!!`);
});
app.get("/ciriculum/year/sy", (req, res) => {
  res.send(`SY page`);
});

// const lecSchema = new mongoose.Schema({
//   userId:{
//     type:String
//   },
//   cse: {
//     type: Object,
//     required: true,
//   },
//   sy: {
//     type: Object,
//     required: true,
//   },
//   mon: {
//     type: Object,
//     required: true,
//   },
//   slot1: {
//     type: String,
//     required: true,
//   },
//   slot2: {
//     type: String,
//     required: true,
//   },
//   slot3: {
//     type: String,
//     required: true,
//   },
//   slot4: {
//     type: String,
//     required: true,
//   },
//   slot5: {
//     type: String,
//     required: true,
//   },
//   slot6: {
//     type: String,
//     required: true,
//   },
// });
const verifyToken = (token,res, cb) => {
  if (token.length !== 0) {
    
    cb();
  }else{
    res.status(402).send("you are not autherised!")
  }
};
const lecSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  slots: {
    type: Object,
    required: true,
  },
  slot1: {
    type: String,
    required: true,
  },
  slot2: {
    type: String,
    required: true,
  },
  slot3: {
    type: String,
    required: true,
  },
  slot4: {
    type: String,
    required: true,
  },
  slot5: {
    type: String,
    required: true,
  },
  slot6: {
    type: String,
    required: true,
  },
});
const lecture = mongoose.model("lecture", lecSchema);

app.post("/ciriculum/timetable", async (req, res) => {
  // res.send(`sy time table`);
  // const { branch, year,day, oldslots, newSlots } = req.body;
  const cookie = req.headers.cookie;
verifyToken(cookie,res,async()=>{
  const branch = req.body.branch;
  const year = req.body.year;
  const day = req.body.day;

  const userId = req.body.userId;
  const oldSlots = req.body.oldslots;
  const newSlots = req.body.newslot;
  //const timetabletoupdate = await lecture.find({})

  // const filter = {
  //   branch:{
  //     year:{
  //       day:{
  //         oldslots
  //       }
  //     }
  //   }
  // }
  // const UpdatedData = {
  //   branch:{
  //     year:{
  //       day:{
  //         newSlots
  //       }
  //     }
  //   }
  // }

  const doc = await lecture.findOneAndUpdate(
    { branch: branch, year: year, day: day },
    { slots: newSlots }
  );
  //console.log(doc)

  // console.log("Old data:",doc.cse.sy.mon)

  // .then((data) => {
  // await doc.save();

  // lecture.findOne(filter).then((data) => {
  //   console.log(data.cse.sy.mon);
  // });

  // res.send("Data updated Successfully!");
});
 });

app.get("/ciriculum/year/sy/timetable", (req, res) => {
  res.send(`Updated time-table`);
});

app.get("/non-ciriculum", (req, res) => {
  res.send(`non-ciriculum page`);
});

app.get("/non-ciriculum/clubs", (req, res) => {
  res.send(`Club page`);
});
const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const club = mongoose.model("club", clubSchema);

app.post("/non-ciriculum/clubs", async (req, res) => {
  // res.send(`post req page of non-ciriculum`);
  // club.findOne({ name: "acm" }).then((msg) => {
  //   club
  //     .findOneAndUpdate({ name: "acm" }, { message: msg.message })
  //     .then((msg) => {
  //       console.log(msg);
  //       res.send("ok done");
  //     });
  //console.log(msg);
  // });
  const cookie = req.headers.cookie;
verifyToken(cookie,res, async()=>{
  const clubname = req.body.clubname;
  const msg = req.body.msg;
  const doc = await club.findOneAndUpdate({ name: clubname }, { message: msg });
})
});

app.get("/cafeteria", (req, res) => {
  
  //res.cookie("token", token);
  res.send(`sagar lipton`);
});
const sagarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});


const sagar = mongoose.model("sagars", sagarSchema);
app.post("/cafeteria", (req, res) => {
  const cookie = req.headers.cookie;
verifyToken(cookie,res,()=>{
 // console.log(cookie);

 const cafe= req.body.cafe;
  sagar.findOne({ name: cafe }).then((data) => {
    sagar
      .findOneAndUpdate(
        { name: cafe },
        { status: data.status ? false : true }
      )
      .then((ans) => {
        //console.log("sagar", ans);
      });
    //console.log(data);
  });
  res.sendStatus(200);
})
});

app.listen(5500, () => {
  console.log(`server is running at port 5500`);
});

//schema

//const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("user", userSchema);
//module.exports= idpass;

//generating token

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_key);
    this.tokens = this.tokens.concat({ token: token });

    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

//login

app.post("/signin", async (req, res) => {
  //console.log(req.body);
  // res.json({message:"awesome"});

  try {
    let token;
    const { email, password } = req.body;
    console.log(email, password);
    // if(!email || !password){
    //     return res.json({error:"Plz fill the data"})

    const userlogin = await user.findOne({ email: email });
    // findone({email:"email"});
    // user
    //   .findOne({ email: "mrunalkhade35@gmail.com" })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // user.find();
    //console.log(user.find({}))

    // console.log(userlogin);
    //let token;

    if (userlogin) {
      const ismatch = await user.findOne({ password: password });
      console.log(ismatch);
      // token = await userlogin.generateAuthToken();
      let secret = "MrunalLovesNodeJS123456789";
      let token = jwt.sign({ _id: userlogin._id }, secret);

      console.log(token);

      res.cookie("jwt", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }); // 3 days

      const decoded = jwt.decode(token);
      const verify = jwt.verify(token, secret);
      console.log({ decoded, verify });

      //  res.cookie("jwtoken", token, {
      //   expires:new Date(Date.now()+25892000000),
      //   httpOnly:true
      //  });

      if (!ismatch) {
        res.status(400).json({ error: "user error!!" });
      } else {
        res.send({ message: "user signin sucefull!!" });
      }
    } else {
      res.status(400).json({ error: "user error!!" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login
//const Router = require('express').Router();
//const UserSchema = require('../../models');

//const { validatePassword } = require('../../middlewares/validatePassword')

// const jwt = require('jsonwebtoken')
// Router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     const user = await UserSchema.findOne({ email: email })
//     if (!user) {
//         res.status(404).json({ "Error": "User Not Found" })
//     }
//     else if (validatePassword(user, password)) {
//         const token = jwt.sign({ id: user.id }, process.env.SECRET_FOOKIN_KEY);
//         res.cookie('jwt', token, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true }); // 3 days
//         res.status(200).json({ "message": "Logged in successfull", token ,user })
//     } else {
//         res.status(401).json({ "Error": "Wrong Password" })
//     }

// })

//schema 2(lecture)

// const filter = {
//   branch:{
//     year:{
//       day:{
//         oldslots
//       }
//     }
//   }
// }
// const UpdatedData = {
//   branch:{
//     year:{
//       day:{
//         newSlots
//       }
//     }
//   }
// }
// lecture
//   .findOneAndUpdate(filter,UpdatedData)
//   .then((data) => {
//     console.log(data);
//   });

// lecture
//   .findOneAndUpdate({cse:{sy:{mon:{slot1:"os"}}}})
//   .then((data) => {
//     //console.log("llllll",data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// lecture
//   .findOne({cse:{}
//     // cse: {
//     //   sy: {
//     //     mon: {
// slot1: "os",
// slot2: "cn",
// slot3: "dbms",
// slot4: "",
// slot5: "os",
// slot6: "flat",
//     //     },
//     //   },
//     // },
//   })
//   .then((data) => {
//     console.log(data);
//   });
// lecture.findOne()
// const cse =  new lecture({
//   "cse": {
//     "sy": {
//       "mon": {
//         "slot1": "os",
//         "slot2": "cn",
//         "slot3": "dbms",
//         "slot4": "",
//         "slot5": "os",
//         "slot6": "flat",
//       },
//     },
//   },
// });

// cse.save((err, doc) => {
//   console.log(err?err:"Success")
// });

//club schema

// const clubSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
// });

// const club = mongoose.model("club", clubSchema);

// club.findOne({ name: "acm" }).then((msg) => {
//   club
//     .findOneAndUpdate({ name: "acm" }, { message: msg.message })
//     .then((msg) => {
//       // console.log(msg);
//     });
//   //console.log(msg);
// });
