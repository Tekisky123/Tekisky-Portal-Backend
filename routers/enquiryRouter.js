import express from "express"
const enquiryRouter=express.Router();
import { createRecord,updaterecord,getAllRecords ,deleteRecord} from "../controllers/enquiryController.js";

enquiryRouter.post("/create",createRecord);
enquiryRouter.post("/:id",updaterecord);
enquiryRouter.get("/getRecords",getAllRecords);
enquiryRouter.get("/:id",deleteRecord);

export default enquiryRouter;
