import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const pageSchema = new mongoose.Schema(
  {
    pageId: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
    },
    pagename: {
      type: String,
      default: "Untitled",
      trim: true,
    },
    pagecontent: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    userId: {
      type: String,
      required: [true, "userId is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Page = mongoose.model("Page", pageSchema);

export default Page;
