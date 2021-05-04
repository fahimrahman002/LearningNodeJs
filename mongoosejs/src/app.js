const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/amarischooldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  })
  .then(() => {
    console.log("Connection successful..");
  })
  .catch((err) => {
    console.log(err);
  });
const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Error message: Min len=2"],
    maxlength: 20,
  },
  ctype: { type: String, enum: ["Front End", "Back End"] },
  videos: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Videos count should not negative");
      }
    },
  },
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});
const Playlist = new mongoose.model("Playlist", PlaylistSchema);

const createDocument = async () => {
  try {
    const jsPlaylist = new Playlist({
      name: "Javascript",
      ctype: "Front End",
      videos: 80,
      author: "Fahim",
      active: true,
    });
    const expressPlaylist = new Playlist({
      name: "Express Js",
      ctype: "Back End",
      videos: 80,
      author: "Fahim",
      active: true,
    });
    const result = await Playlist.insertMany([jsPlaylist, expressPlaylist]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
createDocument();

const getDocument = async () => {
  try {
    const result = await Playlist.find({ author: "Fahim" })
      // .find({videos:{$gte:50}})
      // .find({ctype:{$in:["Back End","Front End"]}})
      // .find({$and:[{ctype:"Back End"},{author:"Fahim"}]})
      .select({ name: 1, _id: 0 })
      .sort({ videos: -1 });
    // .countDocuments();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// getDocument();

const updateDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndUpdate(
      { _id },
      //    .updateOne({_id},
      {
        $set: {
          videos: 110,
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// updateDocument("60911f69d898422b9c55492c");

const deleteDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndDelete({ _id });
    //    .deleteOne({_id})

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// deleteDocument("609121763deeda0a58f7e4db");
