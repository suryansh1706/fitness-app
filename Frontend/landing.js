const AddBtn = document.querySelector("#addbtn");
const SaveBtn = document.querySelector("#savebtn");
const FetchMealBtn = document.querySelector("#fetchmeal");
import { addHandler } from "./addHandler.js";
import { saveHandler } from "./saveHandler.js";
import { fetchMealHandler } from "./fetchmealHandler.js";
import { windowLoadHandler } from "./windowloadHandler.js";

AddBtn.addEventListener("click", addHandler);
SaveBtn.addEventListener("click", saveHandler);
FetchMealBtn.addEventListener("click", fetchMealHandler);
window.addEventListener("load", windowLoadHandler);